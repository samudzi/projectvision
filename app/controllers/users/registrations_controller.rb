class Users::RegistrationsController < Devise::RegistrationsController
  # GET /resource/sign_up
  def new
    super
  end

  # POST /resource/sign_up
  def create
    build_resource
    if resource.save
      if resource.active?
        set_flash_message :notice, :signed_up
        
        render :json => { :success => true }
        #sign_in_and_redirect(resource_name, resource)
      else
        set_flash_message :notice, :inactive_signed_up, :reason => resource.inactive_message.to_s
        expire_session_data_after_sign_in!
        render :json => { :success => false }
        #redirect_to after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords(resource)
      render_with_scope :new
    end
  end
  
  # GET /resource/edit
  def edit
    render_with_scope :edit
  end

  # PUT /resource
  def update
    super
  end

  # DELETE /resource
  def destroy
    resource.destroy
    sign_out_and_redirect(self.resource)
    set_flash_message :notice, :destroyed
  end

  # GET /resource/cancel
  # Forces the session data which is usually expired after sign
  # in to be expired now. This is useful if the user wants to
  # cancel oauth signing in/up in the middle of the process,
  # removing all OAuth session data.
  def cancel
    expire_session_data_after_sign_in!
    redirect_to new_registration_path(resource_name)
  end

end
