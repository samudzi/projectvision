class AddColumnToImapSettings < ActiveRecord::Migration
  def self.up
    add_column :imap_settings, :password_digest, :string
  end

  def self.down
  end
end
