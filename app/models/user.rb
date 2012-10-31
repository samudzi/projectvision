# encoding: utf-8
class User < ActiveRecord::Base
  has_many :assigned_thoughts, :class_name=>'Thought', :foreign_key=>'assignee_id'
  # Include default devise modules. Others available are:
  # :token_authenticatable, :encryptable, :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  # Setup accessible (or protected) attributes for your model
  attr_accessible :email, :password, :password_confirmation, :remember_me, :synchronization_date, :user_name, :is_admin
  
  has_many :thoughts
  has_many :teams , :through => :team_roles
  has_many :team_roles, :dependent => :destroy
  has_many :action_logs
  has_many :imap_addresses
 
  after_create :initial_thoughts
  def initial_thoughts  
      @thoughts = Thought.new
      @thoughts.user_id = User.last.id 
      @thoughts.scope = "private"
      @thoughts.actionable = false
      @thoughts.status = 0
      @thoughts.category = "Welcome"
      @thoughts.brief = "Welcome to the Thought Engine!"
      @thoughts.detail ="The ThoughtEngine is an interactive tool that your group can leverage to collaboratively evolve your
  ideas into actionable plans, manage team tasks and activities, and share documentation in order to more
  effectively achieve your business goals. For help getting started, check out the item “Getting Started”
  in your Inbox."
      @thoughts.save
      @thoughts = Thought.new
      @thoughts.user_id = User.last.id 
      @thoughts.scope = "private"
      @thoughts.actionable = false
      @thoughts.status = 0
      @thoughts.category = "Welcome"
      @thoughts.brief = "Getting Started"
      @thoughts.detail ="Congratulations! You have taken the first step in transforming your thoughts and ideas into reality!
  Here is a brief guide to help you start navigating and using the ThoughtEngine:

  Dashboard – this is the first screen that you see when you log on. It gives you a quick, at-a-glance
  update of your individual activity, as well as the activities of other members of teams that you are a part
  of

  Inbox – this is where you interact with your personal thoughts, as well as where you can share
  thoughts, calendars with your teammates. The My Space tab houses your private thoughts – these
  aren't shared. Here you can evolve them at your own pace, and push them into the Organize section
  when you are ready to develop the thought further. You will see other tabs based on the teams that
  you are a part of. Within each team section, you will see four windows – one with unevolved thoughts
  shared by your teammates, one with a team roster, one with a list of Outstanding tasks, and a team
  calendar

  Organize – this is where you transform your raw thoughts into actionable items. A thought can become
  an actionable To-Do, a reminder that you can come back to later, or a reference item that becomes part
  of your own reference library

  Actions – this is where you can track your organized thoughts and update them as you do your work"
  @thoughts.save
  
  end
  
  
  
  
  
end
