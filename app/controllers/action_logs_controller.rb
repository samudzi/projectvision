class ActionLogsController < ApplicationController
  def index
    @action_logs = ActionLog.all
    render :json => @action_logs.to_json
  end
  
  def recent_team_logs
    params[:days] = params[:days] || 6
    @action_logs = ActionLog.where(["updated_at > ?", Time.now - params[:days].days])
    @recent_action_logs = @action_logs.select{|action_log| action_log.model.class == Thought and action_log.model.scope == "public" and current_user.teams.include?(action_log.model.team)}
    render :json => { :data => @recent_action_logs.collect{|al| al.attributes}, :totalRows => @recent_action_logs.length, :success => true }
  end
end
