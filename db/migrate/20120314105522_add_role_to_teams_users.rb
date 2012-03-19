class AddRoleToTeamsUsers < ActiveRecord::Migration
  def self.up
    add_column :teams_users, :role, :integer
  end

  def self.down
    remove_column :teams_users, :role
  end
end
