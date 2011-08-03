class AddTeamIdToThoughts < ActiveRecord::Migration
  def self.up
    add_column :thoughts, :team_id, :integer
  end

  def self.down
    remove_column :thoughts, :team_id
  end
end
