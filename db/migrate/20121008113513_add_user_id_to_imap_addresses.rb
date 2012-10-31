class AddUserIdToImapAddresses < ActiveRecord::Migration
  def self.up
    add_column :imap_addresses, :user_id, :integer
  end

  def self.down
    remove_column :imap_addresses, :user_id
  end
end
