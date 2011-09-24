class ThoughtsController < ApplicationController
 after_filter :log_thought, :only =>[:create, :update, :destroy]
  
  def index
    params[:user_id] = current_user.id
    thoughts, row_count = Thought.list(params)
    render :json => {
        :success => true,
        :totalRows => row_count,
        :data => thoughts.collect { |t| t.to_record}
    }
  end

  def create
    params[:actionable] = false;
    params[:action_type] = 1 if params[:action_type] == "To Do"
    params[:action_type] = 2 if params[:action_type] == "Reference"
    params[:action_type] = 3 if params[:action_type] == "Reminder"
    
    if params[:thought]
      @thought = Thought.new(params[:thought])
    else
      @thought = Thought.new(params)
    end
    
    #@thought.team_id = 1 if @thought.scope == 'public'
    if params[:team] and @thought.scope == 'public'
      team = Team.find_by_name params[:team]
      @thought.team_id = team.id
    end
    
    @thought.user_id = current_user.id
    @success = @thought.save
    if @success
      render :json => {
          :notice => 'Saved',
          :success => true,
          :data => @thought.id
      }
    else
      render :json => { :success => false }
    end
  end

  def show
    thought = Thought.find(params[:id])

    render :json => {
      :success => true,
      :data => thought.to_record
    }
  end

  def update
    @thought = Thought.find(params[:id])
    
    if params[:thought]
      @success = @thought.update_attributes(params[:thought])
    else
      if params[:team] and @thought.scope == 'public'
        team = Team.find_by_name params[:team]
        params[:team_id] = team.id
       
      end
      @thought.team_id = nil if @thought.scope == 'private'
      
      @success = @thought.update_attributes(params)
    end
    
    if @success
      render :json => { :success => true}
    else
      render :json => { :success => false}
    end
  end

  def destroy
    params
    id = params[:id]
    @thought= Thought.find(params[:id])
    @success = Thought.destroy(id)
    render :json => { :success => true }
  end

  def log_thought
    if @success
      @action_logs = ActionLog.create :model_id => @thought.id, :model_type => "Thought", 
                                    :user_id =>current_user.id, :action_type => action_name,
                                    :message => current_user.email + " " + action_name + " " + "Thought" + " " + "#{@thought.brief}"
    end
  end
end
