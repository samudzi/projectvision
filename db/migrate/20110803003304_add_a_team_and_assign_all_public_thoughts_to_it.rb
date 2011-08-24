class AddATeamAndAssignAllPublicThoughtsToIt < ActiveRecord::Migration
  def self.up
    team = Team.new :name => "Team Space", :status => "public"
    team.save!
    Thought.where(:scope=>"public").each do |t|
      t.team_id = team.id
      t.save!
    end
  end

  def self.down
    team = Team.find_by_name('Team Space')
    team.destroy if team
    Thought.update_all :team_id => nil
  end
end
