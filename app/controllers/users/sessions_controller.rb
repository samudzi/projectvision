class Users::SessionsController < ApplicationController
  #prepend_before_filter :require_no_authentication, :only => [ :new, :create ]
  include Devise::Controllers::InternalHelpers

  # GET /resource/sign_in
  def new
    clean_up_passwords(build_resource)
    render_with_scope :new
  end

  # POST /resource/sign_in
  def create
    logger.debug "Trying to create a new session..." 
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
    #set_flash_message :notice, :signed_in
    sign_in_and_redirect(resource_name, resource)
    
    #if (current_user != nil)
    #  @response = { :success => true, :data => current_user }
    #else
    #  @response = { :success => false, :text => "Username or Password wrong !"}
    #end
    
  end

  # GET /resource/sign_out
  def destroy
    signed_in = signed_in?(resource_name)
    sign_out_and_redirect(resource_name)
    set_flash_message :notice, :signed_out if signed_in
  end
  
  # JSON response
  def sign_in_and_redirect(resource_or_scope, resource=nil)
    scope      = Devise::Mapping.find_scope!(resource_or_scope)     
    resource ||= resource_or_scope
    sign_in(scope, resource) unless warden.user(scope) == resource
    
    error_message = Hash.new
#    error_message[:suspended] = "Account suspended" unless current_user.status
#    unless (current_user.active_date.nil? or current_user.inactive_date.nil?)
#        error_message[:expired] = "Account expired" if ((Time.now < current_user.active_date) or (Time.now > current_user.inactive_date))
#    end
      
    if (error_message == {})
      render :json => { :success => true, :redirect  => stored_location_for(scope) || after_sign_in_path_for(resource) } 
    else
      sign_out(resource_name)
      render :json => { :success => false, :errors => error_message.values.join(', ') }
    end
  end
            
  # JSON login failure message                                                            
  def failure
    render :json => {:success => false, :errors => {:reason => "Login failed. Try again"}} 
  end  
end
