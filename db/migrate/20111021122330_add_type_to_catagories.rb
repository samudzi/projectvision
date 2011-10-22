class AddTypeToCatagories < ActiveRecord::Migration
  def self.up
    add_column :catagories, :type, :string
  end

  def self.down
    remove_column :catagories, :type
  end
end
