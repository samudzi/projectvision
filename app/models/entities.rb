module Entity
  class ImapAddress < Grape::Entity
    expose :id
    expose :user_id
    expose :server
    expose :port
    expose :ssl
    expose :email
    expose :status
    expose :status_message
    expose :created_at
    expose :updated_at
  end
end

