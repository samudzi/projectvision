class AddStartDateToThoughts < ActiveRecord::Migration
  def self.up
    add_column :thoughts, :start_date, :datetime
  end

  def self.down
    remove_column :thoughts, :start_date
  end
end
