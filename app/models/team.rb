class Team < ActiveRecord::Base
  has_and_belongs_to_many :users
  has_many :thoughts, :dependent => :destroy
  
  attr_accessible :name
end
