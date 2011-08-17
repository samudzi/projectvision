class HomeController < ApplicationController

#  include ExtJS::Controller
#  helper ExtJS::Helpers::Store
#  helper ExtJS::Helpers::Component
  
  def index
    
    if(current_user.nil?)
      render :action => 'login'
    else
      #logger.debug(current_user.id);  
      if current_user.teams.length == 0
        team = Team.find(1)
        current_user.teams << team
        current_user.save!
      end
    end
  end

  def login
    
  end

end
