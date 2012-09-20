class AssignRoleToAlreadyExstingTeam < ActiveRecord::Migration
  def self.up
    team = Team.first
    if team && !team.roles.empty?
      team_roles = team.team_roles
      team_roles.each do |tr|
        tr.role = 2
        tr.save
      end
    end
  end

  def self.down
  end
end
