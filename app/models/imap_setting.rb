class ImapSetting < ActiveRecord::Base
  attr_encrypted :password, :key => "goodlogics",:attribute=>"password_digest"
  belongs_to :user
end
