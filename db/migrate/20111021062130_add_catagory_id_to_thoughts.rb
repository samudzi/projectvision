class AddCatagoryIdToThoughts < ActiveRecord::Migration
  def self.up
    add_column :thoughts, :catagory_id, :int
  end

  def self.down
    remove_column :thoughts, :catagory_id
  end
end
