class ApplicationController < ActionController::Base
  protect_from_forgery
#
#  include ExtJS::Controller
#  helper ExtJS::Helpers::Component
#  helper ExtJS::Helpers::Store
	# def after_sign_in_path_for(resource)
	# 		# logger.debug("Signed In")
	#     "/home/"
	# end
	
	def is_admin?
	  return current_user ? current_user.is_admin : false 
	end
end
