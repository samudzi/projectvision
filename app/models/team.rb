class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :thoughts
  
  attr_accessible :name
end
