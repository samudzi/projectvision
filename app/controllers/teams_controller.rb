class TeamsController < ApplicationController
  before_filter :is_admin?, :only => [:add_user]
  
  def index
    @teams = Team.all
    users = []
    @teams.each do |team|
      if team.users.length == 0
        users << {:id => team.id.to_s+'_0', :user_id => team.id, :user => "no users", :tasks => "", :team_id => team.id, :team => team.name} 
      end
      team.users.each do |user|
        users << {:id => team.id.to_s+'_'+user.id.to_s, :user_id => user.id, :user => user.email, :tasks => user.assigned_thoughts.length.to_s, :team_id => team.id, :team => team.name} 
      end  
    end   
    render :json =>  {:data => users, :success => true, :totalRows => users.count }.to_json
   
  end
  
  def add_user
    team = Team.find_by_name params[:team]
    user = User.find_by_email params[:user]
    team.users << user
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
