class AddCtypeToCatagories < ActiveRecord::Migration
  def self.up
    add_column :catagories, :ctype, :string
  end

  def self.down
    remove_column :catagories, :ctype
  end
end
