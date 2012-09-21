class Catagory < ActiveRecord::Base
  attr_accessible :name, :ctype , :id
  has_one :thought
end
