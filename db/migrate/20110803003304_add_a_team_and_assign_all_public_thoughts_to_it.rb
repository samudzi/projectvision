class AddATeamAndAssignAllPublicThoughtsToIt < ActiveRecord::Migration
  def self.up
    # team = Team.new :name => "Team Space", :status => "public"
    #     team.save!
    #     Thought.where(:scope=>"public").each do |t|
    #       team.thoughts << t
    #     end
    #     team.save!
  end

  def self.down
    team = Team.find_by_name('Team Space')
    team.destroy if team
    Thought.update_all :team_id => nil
  end
end
