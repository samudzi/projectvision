class CreateImapAddresses < ActiveRecord::Migration
  def self.up
    create_table :imap_addresses do |t|
      t.string :server
      t.integer :port
      t.boolean :ssl
      t.string :email
      t.binary :password
      t.binary :password_key
      t.binary :password_iv
      t.timestamps
    end
  end

  def self.down
    drop_table :imap_addresses
  end
end
