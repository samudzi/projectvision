class AddTeamToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :team_id, :integer, :default=>1
  end

  def self.down
    remove_column :users, :team_id
  end
end
