class AddStatusMessageToImapAddress < ActiveRecord::Migration
  def self.up
    add_column :imap_addresses, :status_message, :text
  end

  def self.down
    remove_column :imap_addresses, :status_message
  end
end
