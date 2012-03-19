class MyUsersController < ApplicationController
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
    @user.teams << team if team
    if @user.save
      render :json => {
          :notice => 'Saved',
          :success => true,
          :data => @user.id
      }
    else
      render :json => { :success => false }
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
