class HomeController < ApplicationController

#  include ExtJS::Controller
#  helper ExtJS::Helpers::Store
#  helper ExtJS::Helpers::Component
 
   def initial_thoughts
      @thought = Thought.new
      @thought.detail ="best one"
      @thought.save
  end
  def index  
    if(User.find(:all).count == 0)
      @user = User.new
      render :action => 'setup', :layout => nil
    else   
		  if(current_user.nil?)
		    render :action => 'login'
		  else
		    #logger.debug(current_user.id);
		    if current_user.teams.length == 0
          team = Team.first
          current_user.teams << team
          current_user.save!
        end
		  end
		end
  end

  def login

  end
  
  def setup   
    if request.get?
      #debugger   
      if(User.find(:all).count > 0)     
        redirect_to '/'
      else 
        @user = User.new 
        render :layout => nil
      end
    elsif request.post?
     #debugger
      if params[:team] 
        @team = Team.new params[:team]
        @team.status = "Active"
        @team.save
        params[:category].values.each do |cate|
        Catagory.create cate
        end
      end
      if params[:user]       
        @user = User.new params[:user]
        team = Team.find(:all)
        team = team[0]
        @user.save
        #@user.teams << team
        @user_team_role = TeamRole.new
        @user_team_role.team_id = team.id
        @user_team_role.user_id = @user.id
        @user_team_role.role = 2
        @user_team_role.save

        params[:users].values.each do |u|         
          user = User.new u
          #user.teams << team
          user.save
          @user_team_role = TeamRole.new
          @user_team_role.team_id = team.id
          @user_team_role.user_id = user.id
          @user_team_role.role = 2
          @user_team_role.save
        end
        params[:teams].values.each do |t|
          Team.create t
        end
       
        #@category = Catagory.new params[:category]
        #@category.save
        #@team = Team.new params[:team]
        #@teams = Team.new params[:teams]
       # @category = Catagory.new params[:category]
        
     
        #@team.save
        #@teams.save
        #@category.save
      end
      redirect_to '/'
     #logger.info("rashid");
    end  
  end
  def appsetup
    
  end

end
