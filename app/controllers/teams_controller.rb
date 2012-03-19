class TeamsController < ApplicationController
  before_filter :is_admin?
  def index
    @teams = Team.find(:all,:order=>"created_at")
    users = []
    team_role_name ='Admin'
    @teams.each do |team|
      if team.users.length == 0
        users << {:id => team.id.to_s+'_0', :user_id => "", :user => "no users", :tasks => "", :team_id => team.id, :team => team.name} 
      end
      team.team_roles.each do |team_role|
        user = team_role.user
        user_team_role = team_role.role
        if(user_team_role == 1)
          team_role_name ="Admin"
        elsif(user_team_role == 2)
          team_role_name = "Read/Write"
        else
          team_role_name = "ReadOnly"
        end
        users << {:id => team.id.to_s+'_'+user.id.to_s, :user_id => user.id, :team_role=>team_role.role, :user => user.email, :tasks => user.assigned_thoughts.find(:all,:conditions=>["team_id=?",team.id]).length.to_s, :team_id => team.id, :team => team.name,:last_sign_in_at => user.last_sign_in_at,:user_name => user.user_name, :team_role_name => team_role_name}
      end  
    end   
    render :json =>  {:data => users, :success => true, :totalRows => users.count }.to_json
  end
  
  def list
    if(current_user.is_admin)
      @teams =  Team.find(:all, :order=>"created_at")       
    else
      @teams =   current_user.teams#Team.find(:all,:order=>"created_at")
    end
    render :json => {:data =>@teams, :success =>true, :totalRows => @teams.count}.to_json
  end
  
  def show
    @team = Team.find params[:id]
    render :json => {
      :success => true,
      :data => @team.attributes
    }
  end
  
  
  def create
    if params[:name]
      @team = Team.new params
    else
      @team = Team.new params[:name]
    end
    if @team.save
      render :json => {
          :notice => 'Saved',
          :success => true,
          :data => @team.id
      }
    else
      render :json => { :success => false }
    end
  end
  
  def update
    @team = Team.find(params[:id])
    if @team.update_attributes params
      render :json => { :success => true}
    else
      render :json => { :success => false}
    end
  end

  def destroy
    
    @team = Team.find(params[:id])
    if @team.id!=1 and @team.destroy
      render :json => { :success => true }
    else
      render :json => { :success => false }
    end
  end
  
  def add_user
    debugger
    team = Team.find_by_name params[:name]
    user = User.find_by_user_name params[:user]
    team_role= params[:team_role]
    team_role_val= 3;
    if(team_role == 'Admin')
       team_role_val = 1;
    elsif(team_role == 'Read/Write')
       team_role_val= 2;
    else
      team_role_val= 3;
    end
    team_role = user.team_roles.find_by_team_id(team.id)
    if team_role
      team_role.role = team_role_val
      team_role.save
    else
      TeamRole.create :user_id => user.id, :team_id=> team.id, :role => team_role_val      #team.users << user
    end
    team.save
    render :json => {:success => true, :message => "user successfully added"}  
  end
  
  def remove_user
    team_id = params[:team_id].split('_')[0]
    user_id = params[:team_id].split('_')[1]
    if(user_id == "0")
      render :json => {:success => true, :message => "no users to remove"}
      return  
    end
    team = Team.find team_id
    user = User.find user_id
    team.users.delete user
    render :json => {:success => true, :message => "user successfully removed"}
  end
  
  
end
