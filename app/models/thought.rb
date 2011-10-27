class Thought < ActiveRecord::Base
  has_many :replies, :class_name => 'Thought', :foreign_key => "parent_id", :dependent => :destroy
  belongs_to :parent, :class_name => 'Thought'
  belongs_to :assigned_to, :class_name => 'User', :foreign_key => "assignee_id"
  belongs_to :catagory
#  include ExtJS::Model

  attr_accessible :brief, :detail, :category, :type, :status, :actionable, :context, :next, :outcome, :action_status, :due_date,:start_date, :action_type, :catagory_id, :scope, :parent_id, :assignee_id, :team_id

#  extjs_fields :id, :brief, :detail, :category, :type, :status, :actionable, :context, :next, :outcome, :action_status, :due_date, :action_type
  belongs_to :user
  belongs_to :team
  has_many :action_logs, :as => :model


  def self.list(params=nil)
    row_count = 0;
    start = params[:start] ?  params[:start].to_i : 0
    if(!params[:action_type])
      thoughts = Thought.where(:status => params[:status], :user_id => params[:user_id]).limit(2).offset(start)
    else
      if(!params[:action_status])
        thoughts = Thought.where(:status => params[:status], :action_type => params[:action_type], :user_id => params[:user_id]).limit(2).offset(start)
      else
        thoughts = Thought.where(:status => params[:status], :action_type => params[:action_type], :action_status => params[:action_status], :user_id => params[:user_id]).limit(2).offset(start)
      end
    end
    if(params[:ttype] == "all")
      thoughts = Thought.where(:user_id => params[:user_id]).limit(2).offset(start)
    else
      if(params[:ttype] == "teamThought")
        thoughts = Thought.where(:scope => 'public');
      end
    end
    row_count = Thought.count
    [thoughts, row_count]
  end

  def to_record

#    logger.debug(self.inspect);
#    array_name = []
#    array_value = []
#
#      array_name.push(name)
#      array_value.push(value)
#      thought_data += ":" + name + "=>" + '"' + value.to_s + '"'
#
#    thought_data += "}"
#    thought_data = {array_name => array_value}

#    thought_data = "";
#    thoughts.each do |t|
#      thought_data += "{"
#      t.attributes.each_pair do |name,value|
#        thought_data += "" + name + " :  " + value.to_s
#        logger.debug(value)
#      end
#      thought_data = thought_data.chop
#      thought_data += "},"
#    end
#    thought_data = thought_data.chop
    thought_data = {}
    self.attributes.each_pair do |name,value|
      thought_data[name] = value
    end
    thought_data['team'] = self.team ? self.team.name : ''    
    thought_data['action_type_str'] = "Todo" if thought_data['action_type'].to_i == 1
    thought_data['action_type_str'] = "Reference" if thought_data['action_type'].to_i == 2
    thought_data['action_type_str'] = "Reminder" if thought_data['action_type'].to_i == 3
     
    thought_data['assigned_to'] = self.assigned_to ? self.assigned_to.email : ''
    #thought_data['replies'] = self.replies.collect{|reply| reply.detail}.join('<br/>')
    thought_data['replies'] = self.replies.collect{|reply| {:detail=>reply.detail,:user => reply.user.email, :thought_id => reply.id, :user_id =>reply.user.id}}
    thought_data
  end
  
end
