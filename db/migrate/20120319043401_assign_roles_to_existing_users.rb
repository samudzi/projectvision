class AssignRolesToExistingUsers < ActiveRecord::Migration
  def self.up
    add_column :teams_users, :id, :primary_key
    TeamRole.update_all(:role =>2)
    Team.all.each do |team|
      r = team.team_roles.first
      if r
       r.role = 1
       r.save
     end
    end
  end

  def self.down
    remove_column :teams_users, :id
  end
end
