class AddUidTrackingToImapAddress < ActiveRecord::Migration
  def self.up
    add_column :imap_addresses, :last_uid, :integer
  end

  def self.down
    remove_column :imap_addresses, :last_uid
  end
end

