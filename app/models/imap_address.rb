class ImapAddress < ActiveRecord::Base
  encrypt_with_public_key :password, key_pair: File.join(Rails.root,"config/keypair.pem")

  validates_presence_of :server, :port, :ssl, :email, :password
  validates_presence_of :user_id

  validates_uniqueness_of :email

  belongs_to :user

  def plain_password
    password.decrypt(Pv.config.public_key_passphrase)
  end

  def log_status(message,status)
    self.status_message = message
    self.status = status
    self.save
    self
  end
end

