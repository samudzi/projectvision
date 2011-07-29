class AddParentIdToThoughts < ActiveRecord::Migration
  def self.up
    add_column :thoughts, :parent_id, :integer
  end

  def self.down
    remove_column :thoughts, :parent_id
  end
end
