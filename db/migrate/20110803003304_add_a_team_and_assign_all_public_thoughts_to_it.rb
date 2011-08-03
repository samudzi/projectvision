class AddATeamAndAssignAllPublicThoughtsToIt < ActiveRecord::Migration
  def self.up
    team = Team.create :name => "Team Space", :status => "public"
    Thought.where(:scope=>"public").each do |t|
      team.thoughts << t
    end
    team.save!
  end

  def self.down
    Team.find_by_name('Team Space').destroy
    Thought.update_all :team_id => nil
  end
end
