class ActionLog < ActiveRecord::Base
belongs_to :users
belongs_to :model, :polymorphic => true
end
