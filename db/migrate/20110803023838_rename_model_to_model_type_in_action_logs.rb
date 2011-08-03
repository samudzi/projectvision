class RenameModelToModelTypeInActionLogs < ActiveRecord::Migration
  def self.up
    rename_column :action_logs, :model, :model_type
  end

  def self.down
    rename_column :action_logs, :model_type, :model
  end
end
