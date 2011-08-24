class AddATeamAndAssignAllPublicThoughtsToIt < ActiveRecord::Migration
  def self.up
    team = Team.create :name => "Team Space", :status => "public"
    # Thought.where(:scope=>"public").each do |t|
    #       t.team_id = team.id
    #       t.save!
    #     end
  end

  def self.down
    team = Team.find_by_name('Team Space')
    team.destroy if team
  end
end
