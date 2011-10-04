class AddSynchronizationDateToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :synchronization_date, :datetime
  end

  def self.down
    remove_column :users, :synchronization_date
  end
end
