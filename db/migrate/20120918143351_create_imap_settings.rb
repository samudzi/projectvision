class CreateImapSettings < ActiveRecord::Migration
  def self.up
    create_table :imap_settings do |t|
      t.string :server
      t.string :login
      t.string :password
      t.integer :user_id

      t.timestamps
    end
  end

  def self.down
    drop_table :imap_settings
  end
end
