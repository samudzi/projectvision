class ApplicationController < ActionController::Base
  protect_from_forgery
  def is_admin?
    return current_user ? current_user.is_admin : false
  end

  private
  def present(api_response, options = {})
    body_hash = options[:with].represent(api_response)
    render json: body_hash, status: options[:status]
  end

  def present_error(messages, options = {})
    body_hash = { error: Array(messages) }
    render json: body_hash.to_json, status: options[:status]
  end
end
