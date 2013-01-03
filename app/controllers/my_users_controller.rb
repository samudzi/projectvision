class MyUsersController < ApplicationController
  require 'net/http'
  require 'net/https'
  require 'net/imap'
  require 'uri'
  require 'open-uri'
  before_filter :is_admin?
  def index
    @users = User.all   
     
    render :json =>  {:data => @users.collect{|u| u.attributes}, :success => true }.to_json
  end
  def currentUser
    users = []
   #current_user.thoughts
    users << {:current_id => current_user.id, 
      :current_user_name => current_user.user_name,
      :alltask => current_user.thoughts.find(:all, :conditions=>["action_type = ?","1"]).length.to_s, 
      :completedtodo => current_user.thoughts.find(:all, :conditions=>["status = '2' AND action_status = 'Completed' AND action_type = '1'"]).length.to_s,
      :overdue => current_user.thoughts.find(:all, :conditions=>["due_date < ? AND action_type = '1' ",Time.now]).length.to_s
    } 
    render :json =>  {:data => users, :success => true }.to_json
  end
  def create
    if params[:user]
      @user = User.new params[:user]
    else
      @user = User.new params
    end
    team = Team.first
    if @user.save
      if team
        @user_team_role  = TeamRole.new
        @user_team_role.team_id = team.id
        @user_team_role.user_id = @user.id
        @user_team_role.role = 2
        @user_team_role.save
      end
      render :json => {
          :notice => 'Saved',
          :success => true,
          :data => @user.id
      }
    else
      render :json => { :success => false }
    end
  end
  def imap_setting
    user_imap = []
    imap_setting = ImapSetting.find_by_user_id(current_user.id)
    imap_setting = ImapSetting.create(:server=>'server',:login=>'login',:user_id=>current_user.id,:password=>'password',:thoughts_created_at=>Time.now.strftime("%d-%b-%Y")) if !imap_setting
    user_imap << {:server => imap_setting.server,
      :login => imap_setting.login,:password=>'password'}
    render :json =>  {:data => user_imap, :success => true }.to_json
  end

  def get_imap_form
    render :json =>  {:data => {:server => current_user.imap_setting.server,:login => current_user.imap_setting.login,:password => current_user.imap_setting.password}, :success => true }
  end

  def update_imap_setting
    imap_setting = current_user.imap_setting
    imap_setting.server = params[:server]
    imap_setting.login = params[:login]
    imap_setting.password = params[:password]
    if imap_setting.save
      render :json => {:success => true}
    else
      render :json => {:success => false}
    end
  end

  def email_thoughts
    if current_user.imap_setting
      begin
        imap = Net::IMAP.new(current_user.imap_setting.server,993,true)
        imap.login(current_user.imap_setting.login, current_user.imap_setting.password)
      rescue
        render :text => 'false'
        return false
      end
      imap.select('INBOX')
      #now = Time.now.localtime - 1.day #days before
      #since = now.day.to_s() + "-" + Date::MONTHNAMES[now.month] + "-" + now.year.to_s()
      #puts "since"
      since = current_user.imap_setting.thoughts_created_at
      #imap.search(['ALL']).each do |message_id|
      imap.search("SINCE #{since}").each do |message_id|
        #sub_data = imap.fetch(message_id, "BODY[HEADER.FIELDS (SUBJECT)]")
        #subject = sub_data[0].attr["BODY[HEADER.FIELDS (SUBJECT)]"].gsub('Subject:','') if sub_data[0]
        #body_data = imap.uid_fetch(message_id, "BODY[1]")
        #body = body_data[0].attr['BODY[1]'] if body_data[0]
        msg = imap.fetch(message_id,'RFC822')[0].attr['RFC822']
        mail = Mail.new(msg)
        body = mail.text_part ? mail.text_part.decode_body : mail.body.decoded
        subject = mail.subject
        Thought.create(:user_id=>current_user.id,:brief=>subject,:detail=>body,:scope=>'private')
      end
      current_user.imap_setting.thoughts_created_at=Time.now.strftime("%d-%b-%Y")
      current_user.imap_setting.save
      render :json => {:success => true}
    else
      render :json => {:success => false}
    end
  end
 
  def show
    @user = User.find(params[:id])
    render :json => {:data => @user.attributes, :success => true}
  end
  def update_sync
    @user = current_user 
    @user.synchronization_date = Time.now
    @user.save
    render :text => {}
  end
  #newpass123
  def update
    @user = User.find(params[:id])   
    #debugger
    if params[:password]== "" and params[:password_confirmation]== ""
      params.delete("password")
      params.delete("password_confirmation")
    end
    if @user.update_attributes params
      render :json => { :success => true}
    else
      render :json => { :success => false}
     
    end
  end

  def destroy
    @user = User.find(params[:id])
    if @user.id != 1 and @user.destroy
      render :json => { :success => true }
    else
      render :json => { :success => false }
    end
  end
  
end
