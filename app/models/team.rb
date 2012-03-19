
class Team < ActiveRecord::Base
  has_many :users , :through => :team_roles
  has_many :team_roles
  has_many :thoughts, :dependent => :destroy
  
  attr_accessible :name
end
