class AddImapUidToThoughts < ActiveRecord::Migration
  def self.up
    add_column :thoughts, :imap_uid, :integer
  end

  def self.down
    remove_column :thoughts, :imap_uid
  end
end
