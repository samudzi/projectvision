class CreateThoughts < ActiveRecord::Migration
  def self.up
    create_table :thoughts do |t|
      t.string :brief
      t.text :detail
      t.string :category
      t.string :scope
      t.string :status
      t.boolean :actionable
      t.string :context
      t.text :next
      t.text :outcome
      t.string :action_status
      t.datetime :due_date
      t.string :action_type

      t.timestamps
    end
  end

  def self.down
    drop_table :thoughts
  end
end
