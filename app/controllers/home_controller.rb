class HomeController < ApplicationController

#  include ExtJS::Controller
#  helper ExtJS::Helpers::Store
#  helper ExtJS::Helpers::Component
  
  def index
		if(current_user.nil?)
		  render :action => 'login'
		else
		  #logger.debug(current_user.id);
		end
  end

  def login
    
  end

end
