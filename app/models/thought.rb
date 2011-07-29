class Thought < ActiveRecord::Base
  has_many :replies, :class_name => 'Thought', :foreign_key => "parent_id", :dependent => :destroy
  belongs_to :parent, :class_name => 'Thought'
  belongs_to :assigned_to, :class_name => 'User', :foreign_key => "assignee_id"
#  include ExtJS::Model

  attr_accessible :brief, :detail, :category, :type, :status, :actionable, :context, :next, :outcome, :action_status, :due_date, :action_type, :scope, :parent_id, :assignee_id

#  extjs_fields :id, :brief, :detail, :category, :type, :status, :actionable, :context, :next, :outcome, :action_status, :due_date, :action_type
  belongs_to :user

  def self.list(params=nil)
    row_count = 0;
    if(!params[:action_type])
      thoughts = Thought.where(:status => params[:status], :user_id => params[:user_id]).limit(20)
    else
      if(!params[:action_status])
        thoughts = Thought.where(:status => params[:status], :action_type => params[:action_type], :user_id => params[:user_id]).limit(20)
      else
        thoughts = Thought.where(:status => params[:status], :action_type => params[:action_type], :action_status => params[:action_status], :user_id => params[:user_id]).limit(20)
      end
    end
    if(params[:ttype] == "all")
      thoughts = Thought.where(:user_id => params[:user_id])
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
    thought_data = []
    self.attributes.each_pair do |name,value|
      thought_data.push(name => value);
    end
    thought_data.push('assigned_to' => self.assigned_to ? self.assigned_to.email : '') if
    thought_data.push('replies' => self.replies.collect{|reply| reply.to_record})
  end
  
end
