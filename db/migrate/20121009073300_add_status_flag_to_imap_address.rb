class AddStatusFlagToImapAddress < ActiveRecord::Migration
  def self.up
    add_column :imap_addresses, :status, :string
  end

  def self.down
    remove_column :imap_addresses, :status
  end
end
