class Users::SessionsController < Devise::SessionsController
  # POST /resource/sign_in
  def create
    resource = warden.authenticate!(:scope => resource_name, :recall => "#{controller_path}#new")
    set_flash_message :notice, :signed_in
    sign_in(resource_name, resource)
    
    respond_to do |format|
      format.html{
        #incase of html requests, fall back to default functionality
        respond_with resource, :location => redirect_location(resource_name, resource)
      }
      format.json{
        if warden.errors.values.empty?
          render :json => { :success => true, :redirect  => stored_location_for(resource_name) || after_sign_in_path_for(resource) } 
        else
          # will never reach here because rack layer renders back the response, but just in case :)
          render :json => { :success => false, :errors => warden.errors.values.join(', ') }
        end
      }
    end
  end
end
