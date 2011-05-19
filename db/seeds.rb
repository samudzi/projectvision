# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ :name => 'Chicago' }, { :name => 'Copenhagen' }])
#   Mayor.create(:name => 'Daley', :city => cities.first)

Thought.create(:brief => 'A Thought', :detail => 'Some Details', :status => 0)
Thought.create(:brief => 'Organizing a Thought', :detail => 'More details', :status => 1)
Thought.create(:brief => 'TODO', :detail => 'Details', :status => 2, :action_type => 1, :next => 'Draft Up a Document', :outcome => 'A Document', :context => 'Context1', :due_date => '2011-01-01', :action_status => "Active")
Thought.create(:brief => 'Reference', :detail => 'Reference Details', :status => 2, :action_type => 2, :context => 'Context1', :scope => 'Private')
Thought.create(:brief => 'Reminder', :detail => 'Reminder Details', :status => 2, :action_type => 3, :context => 'Context1', :due_date => '2011-01-01')
