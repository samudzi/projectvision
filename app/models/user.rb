class User < ActiveRecord::Base
  has_many :assigned_thoughts, :class_name=>'Thought', :foreign_key=>'assignee_id'
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :synchronization_date, :user_name
  
  has_many :thoughts
  has_and_belongs_to_many :teams
  has_many :action_logs
end
