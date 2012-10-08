class ImapAddress < ActiveRecord::Base
  encrypt_with_public_key :password, key_pair: File.join(Rails.root,"config/keypair.pem")

  validates_presence_of :server, :port, :ssl, :email, :password
  validates_uniqueness_of :email

  belongs_to :user

  def plain_password
    password.decrypt(Pv.config.public_key_passphrase)
  end
end

