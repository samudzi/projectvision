class AssignRoleToAlreadyExstingTeam < ActiveRecord::Migration
  def self.up
    t = Team.first
    team_roles = t.team_roles
    team_roles.each do |tr|
      tr.role = 2
      tr.save
    end
  end

  def self.down
  end
end
