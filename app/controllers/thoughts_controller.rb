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
    parser

    @thought = Thought.new(params[:thought])
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
    parser
    @thought = Thought.find(params[:id])

    @success = @thought.update_attributes(params[:thought])
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

  def parser
    id = params[:id]
    params.delete "id"
    params.delete "action"
    params.delete "controller"
    params.delete "format"
#    params.delete "utf8"
#    params.delete "_method"
#    params.delete "commit"
#    params.delete "authenticity_token"
    thought = params.dup
    params.clear
    params[:id] = id
    params[:thought] = thought

    logger.debug "=========================="
    logger.debug "parser: #{params}"
  end
  
  def log_thought
    if @success
      @action_logs = ActionLog.create :model_id => @thought.id, :model => "Thought", 
                                    :user_id =>current_user.id, :action_type => action_name,
                                    :message => current_user.email + " " + action_name + " " + "Thought" + " " + @thought.brief
    end
  end
end
