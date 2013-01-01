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

  def self.list(params=nil)
    row_count = 0;
    start = params[:start] ? params[:start].to_i : 0
    emails = ImapAddress.where(:user_id => params[:user_id])
    row_count = ImapAddress.count
    [emails, row_count]
  end

  def to_record
    email_data = {}
    self.attributes.each_pair do |name, value|
      email_data[name] = value
    end
    email_data
  end
end

