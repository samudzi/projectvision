class AddColumnThoughtsCreatedAtImapSettings < ActiveRecord::Migration
  def self.up
    add_column :imap_settings, :thoughts_created_at, :string
  end

  def self.down
  end
end
