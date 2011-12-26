var globalThoughtStore = Ext.StoreMgr.get('global_thought_store');
var teamThoughtStore = Ext.StoreMgr.get('team_thought_store');
var recentTeamStore = Ext.StoreMgr.get('recent_team_activity_store');
var userStore = Ext.StoreMgr.get('users_store');
var teamUserStore = Ext.StoreMgr.get('team_store');
var myTeamStore = Ext.StoreMgr.get('my_team_store');
var currentUserStore = Ext.StoreMgr.get('current_users_store');
var catagoryStore = Ext.StoreMgr.get('catagories');

setTimeout("Ext.select('.notice').remove()",5000)
//teamThoughtStore.load();
recentTeamStore.load();
currentUserStore.load();
userStore.load();
//myTeamStore.load();
teamUserStore.load();
catagoryStore.load();
Ext.ns('Ext.ux.data');
/*var fieldsArray = ['id', 'brief', 'detail', 'category', 'type', 'status', 'actionable', 'context', 'next', 'outcome', 'action_status', 'due_date', 'action_type', 'scope'];*/
var fieldsArray = [ 
    {name: 'action_status', type: 'string'},
    {name: 'action_type', type: 'string'},
    {name: 'actionable', type: 'string'}, 
    {name: 'assignee_id', type: 'int'},   
    {name: 'brief', type: 'string'},  
    {name: 'category', type: 'string'},  
    {name: 'context', type: 'string'}, 
    {name: 'created_at', type: 'date'},
    {name: 'detail', type: 'string'},  
    {name: 'due_date', type: 'date'},
		{name: 'id', type: 'int'},   
    {name: 'next', type: 'string'}, 
    {name: 'outcome', type: 'string'}, 
    {name: 'parent_id', type: 'int'},   
    {name: 'scope', type: 'string'},
    {name: 'status', type: 'string'},
    {name: 'updated_at', type: 'date'},
    {name: 'start_date', type: 'datetime'},
    {name: 'user_id', type: 'int'}, 
    {name: 'assigned_to', type: 'string'},
		//{name: 'replies', type: 'string'},
    {name: 'type', type: 'string'},
		{name: 'replies', type: 'array'}, 
		{name: 'action_type_str', type: 'string'},
		{name: 'catagory_id', type: 'string'},
    {name: 'myteam', type: 'string'},
];

var replyFieldsArray = [{name:'reply', type:'text'},{name:'user', type:'string'},{name:'thought_id', type:'int'},{name:'user_id', type:'int'},];

var inboxJsonStore = new Ext.data.JsonStore({
			root: 'inbox',
			fields: fieldsArray
});
var organizeJsonStore = new Ext.data.JsonStore({
			root: 'organize',
			fields: fieldsArray
});
/*var todoArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'next', type: 'string'}, 
           {name: 'outcome', type: 'string'},
		   {name: 'due_date', type: 'string'},
		   {name: 'context', type: 'string'},
		   {name: 'action_status', type: 'string'}   
        ]
});*/

var todoJsonStore = new Ext.data.JsonStore({
			root: 'todo',
			fields: fieldsArray
});
var referenceJsonStore = new Ext.data.JsonStore({
			root: 'reference',
			fields: fieldsArray
});
var reminderJsonStore = new Ext.data.JsonStore({
			root: 'reminder',
			fields: fieldsArray
});
var upcomingJsonStore = new Ext.data.JsonStore({
			root: 'upcoming',
			fields: fieldsArray
});
var recentCompletedJsonStore = new Ext.data.JsonStore({
			root: 'recent_completed',
			fields: fieldsArray
});
var thoughtGridJsonStore = new Ext.data.JsonStore({
			root: 'thought_grid',
			fields: fieldsArray
});


var outstandingTasksJsonStore = [];
var teamThoughtsJsonStore = [];

var teamUsersJsonStore = [];
var teamEventsJsonStore = [];

var todoStatusComboStore = new Ext.data.SimpleStore({
	id: 0,
	fields: ['action_status', 'action_status'],
	data : [
		['Pending', 'Pending'],
		['Active', 'Active'],
		['Completed', 'Completed'],		
		['Inactive', 'Inactive']
	]
});

var eventStore = new Ext.ensible.sample.MemoryEventStore({
  // defined in events.js
  data: Ext.ensible.sample.EventData
});


/*var todoStatusComboStore = new Ext.data.JsonStore({
	root: 'actionstatus',
	fields: ['value', 'action_status']
});*/

/*var teamOptions=new Ext.data.SimpleStore({
      fields: ['team','id'],

    });
*/
var catagoryOptions=new Ext.data.SimpleStore({
      fields: ['catagory_name','id']
    });
var contextOptions=new Ext.data.SimpleStore({
  fields: ['catagory_name','id']
});
function addCatagoryOptions()
{
  catagoryOptions.removeAll(silent=false);
  contextOptions.removeAll(silent=false);
  catagoryStore.each(function(record){
    var ctype = record.get('ctype');   
    var catagory_name = record.get('name');
    var catagory_id = record.get('id');
    var recordData = {
      catagory_name: catagory_name, 
      id: catagory_id
      };   
    if (ctype == 'Catagory')
    {
      var catagoryOptionsRecord = new catagoryOptions.recordType(recordData)   
      catagoryOptions.add(catagoryOptionsRecord); 
    }
    if(ctype == 'Context')
    {    
      var contextOptionsRecord = new contextOptions.recordType(recordData)   
      contextOptions.add(contextOptionsRecord); 
    }
  });   
}
var emailOptions=new Ext.data.SimpleStore({
      fields: ['user_name','id']
    });
/*var teamOptions=new Ext.data.SimpleStore({
      fields: ['team','id'],
    });
*/
function addUserAndTeamSelectOptions()
{
  emailOptions.removeAll(silent=false);
  userStore.each(function(record){
    var user_name = record.get('user_name');
    var user_id = record.get('id');
    var recordData = {
      user_name: user_name, 
      id: user_id
      };    
    var emailOptionsRecord = new emailOptions.recordType(recordData)   
    emailOptions.add(emailOptionsRecord);  
   });   
}
/*



/
/*
function  editTeamThought(selectedThoughtID,selectedUserID)
{
             
}
*/
function  deleteTeamThought(selected_thoughtID,selected_userID)
{
 var user_id= selected_userID;
 var thought_id = selected_thoughtID;

  if(is_admin == true || currentUser == user_id)
  {
    Ext.Ajax.request({
      url: '/thoughts/'+thought_id,
      scope:this,
      params: {
        id: thought_id
      },
      waitMsg:'Deleting...',
      method: 'delete',
      success: function(f,a){
        globalThoughtStore.reload({callback : function(records,option,success){
          globalThoughtStoreCallbackFn(records);		
          }
        });
        teamThoughtStore.load({callback : function(records,option,success){
          teamThoughtStoreCallbackFn(records);
          }
        });
      }
    });
  //        myData.splice(rowIndex,1);
  //        thoughtStore.loadData(myData);
  }
  else
  {
  Ext.Msg.alert("Access violation","You don't have access to delete it");
  }
}


function new_entry(){ 
  var token = google.accounts.user.login(EVENT_FEED_URL);
  console.log(token);
  if (token){
  count = 0;
   // records.each(function(rec){
    for(i=0;i<globalThoughtStore.getCount();i++)
    { 
      rec = globalThoughtStore.getAt(i);
      var status = rec.get('status');
      var team_id = rec.get('team_id');
      var title = rec.get('brief');
       start_date = rec.get('start_date');
      var due_date = rec.get('due_date');
      updated_date = rec.get('updated_at');
      created_at = rec.get('created_at');
      var description = rec.get('detail');
      var team = rec.get('myteam');

      //updatedDate = new Date(updated_date);
      //createdAt = new Date(created_at);
      //console.log(updated_date);
      //syncDate =new Date(sync_date);
      
      if((updated_date > sync_date) || (created_at > sync_date))        
      {
      //console.log(updated_date);
      //console.log(created_at);
      //console.log(sync_date);
        if(status == '5'){
          count++;
          // creat a single event
          // Create the calendar service object
          var calendarService = new google.gdata.calendar.CalendarService('GoogleInc-jsguide-1.0');

          // The default "private/full" feed is used to insert event to the
          // primary calendar of the authenticated user
          var feedUri = 'https://www.google.com/calendar/feeds/default/private/full';

          // Create an instance of CalendarEventEntry representing the new event
          var entry = new google.gdata.calendar.CalendarEventEntry();
          var ttl = new google.gdata.calendar.CalendarEntry();

          //var titleText = google.("afd");
          // Set the title of the event
          title = team +":"+title;
          etitle = google.gdata.atom.Text.create(title);
          edes = google.gdata.atom.Text.create(description);
          entry.setTitle(etitle);
          entry.setContent(edes);
         //alert("created");
          // Create a When object that will be attached to the event
          var when = new google.gdata.When();
          var startDate = new Date(start_date);
          //start_date = start_date.replace("Z",".000");
          //due_date = due_date.replace("Z",".000");
          var dueDate = new Date(due_date);
          //console.log(dueDate);
          // Set the start and end time of the When object
          when.setStartTime(startDate);
          when.setEndTime(dueDate);
          // Add the When object to the event
          entry.addTime(when);
          // The callback method that will be called after a successful insertion from insertEntry()
          var callback = function(result) {
            console.log('event created!');           
          }
          // Error handler will be invoked if there is an error from insertEntry()
          var handleError = function(error) {
            console.log(error);
          }
          // Submit the request using the calendar service object
          calendarService.insertEntry(feedUri, entry, callback, handleError, google.gdata.calendar.CalendarEventEntry);
      }
          
    }
  
      
  }
 

    Ext.Ajax.request({
      url: '/my_users/update_sync/',
      scope:this,
      params: {
        //'user[synchronization_date]': ''             
      },
      waitMsg:'saving...',
      method: 'post',
      success: function(f,a){
        sync_date = new Date()                   
      }
    });
    
     if(count>0)
  {
      Ext.Msg.alert('Google Calendar Sync',count +' '+'Events have been synchronized to Google Calendar ');
  }
  else
      Ext.Msg.alert('Google Calendar Sync','No events to synchronize to Google calendar!');
    
  }
}

var finalJsonEventData = new Array();

function globalThoughtStoreCallbackFn(records){
		var tempJsonInbox = new Array();
		var finalJsonInbox = new Array();	
		var tempJsonOrganize = new Array();
		var finalJsonOrganize = new Array();	
		var tempJsonTodo = new Array();
		var finalJsonTodo = new Array();	
		var tempJsonReference = new Array();
		var finalJsonReference = new Array();	
		var tempJsonReminder = new Array();
		var finalJsonReminder = new Array();		
		var tempJsonUpcoming = new Array();
		var finalJsonUpcoming = new Array();
		var tempJsonRecentCompleted = new Array();
		var finalJsonRecentCompleted = new Array();
	  var tempJsonEventCompleted = new Array();
		var finalJsonEventCompleted = new Array();
	  
	  var tempJsonEvent = new Array();
	  var finalJsonEvent = new Array();	
		
		records.each(function(rec){
			var action_status = rec.get('action_status');
			var action_type = rec.get('action_type');
			var status = rec.get('status');
			var scope = rec.get('scope');
			
			var tempArray = [];
			rec.fields.keys.each(function(key) 
			{ 
        var fieldValue = rec.get(key); 
        tempArray[key] = fieldValue;
			});
			if(status==0) // inbox store
				tempJsonInbox.push(tempArray);	
			if(status==1) // organize store
				tempJsonOrganize.push(tempArray);	
		  if(status==2 && action_type=='1') // todo store
				tempJsonTodo.push(tempArray);							
			if(status==2 && action_type=='2') // reference store
				tempJsonReference.push(tempArray);	
			if(status==2 && action_type=='3') // reminder store
				tempJsonReminder.push(tempArray);		
		//	if(action_type== '5') // event store
			//  tempJsonEvent.push(tempArray);	
			if(status==2 && action_status=='Active' && action_type=='1') // upcoming store
				tempJsonUpcoming.push(tempArray);
			if(status==2 && action_status=='Completed' && action_type=='1') // recentCompleted store
				tempJsonRecentCompleted.push(tempArray);		
			
		});		// records.each
		/*todoStatusComboStoreData["actionstatus"] = todoStatusComboStoreTemp;
		todoStatusComboStore.loadData(todoStatusComboStoreData,false); */
		
		//Inbox
		finalJsonInbox["inbox"] = tempJsonInbox;
		inboxJsonStore.loadData(finalJsonInbox,false);
		
		//Organize
		finalJsonOrganize["organize"] = tempJsonOrganize;
		organizeJsonStore.loadData(finalJsonOrganize,false);
		
		//Action
		finalJsonTodo["todo"] = tempJsonTodo;
		todoJsonStore.loadData(finalJsonTodo,false);
		
		finalJsonReference["reference"] = tempJsonReference;
		referenceJsonStore.loadData(finalJsonReference,false);
		
		//Calendar?
		finalJsonReminder["reminder"] = tempJsonReminder;
		reminderJsonStore.loadData(finalJsonReminder,false);	
		//finalJsonEventData["evts"] = tempJsonEvent;
		//Ext.ensible.sample.EventData = finalJsonEventData;
		//eventStore.loadData(Ext.ensible.sample.EventData);
		//Ext.ensible.sample.EventData = finalJsonEventData;
		//EventDataJsonStore.loadData(finalJsonEventData,false);	
		
		//Dashboard
		finalJsonUpcoming["upcoming"] = tempJsonUpcoming;
		upcomingJsonStore.loadData(finalJsonUpcoming,false);
		finalJsonRecentCompleted["recent_completed"] = tempJsonRecentCompleted;
		recentCompletedJsonStore.loadData(finalJsonRecentCompleted,false);
					
}  // globalThoughtStoreCallbackFn


function replyThoughtDeleteHandler(selectedThoughtID, userId)
{
  var selected_ThoughtID = selectedThoughtID;
  var selectedUserID = userId;
  if(is_admin == true || currentUser == selectedUserID)
  {
  
    Ext.Ajax.request({
      url: '/thoughts/'+selected_ThoughtID,
      scope:this,
      params: {
        id: selectedThoughtID
      },
      waitMsg:'Deleting...',
      method: 'delete',
      success: function(f,a){
        globalThoughtStore.reload({callback : function(records,option,success){
		      globalThoughtStoreCallbackFn(records);		
	        }
        });
        teamThoughtStore.load({callback : function(records,option,success){
          teamThoughtStoreCallbackFn(records);
          }
        });
      }
    });
    //      myData.splice(rowIndex,1);
  //        thoughtStore.loadData(myData);
  }
 else

  {
  Ext.Msg.alert("Access violation","You don't have access to delete it");
  }
}

function getExpander(){
  return new Ext.ux.grid.RowExpander({
   //tpl : new Ext.Template('<p><b>Replies:</b><br> {replies}</p><br>')
    tpl: '<div class="ux-row-expander-box"></div>',
    actAsTree: true,
    treeLeafProperty: 'is_leaf',
    listeners: {
  	  expand: function( expander, record, body, rowIndex){
  		  var tempData = new Array();
  		  var replies = record.get('replies');
		  
  		  for(var i=0;i<replies.length;i++){
  		    tempData[i] = [];
  		    tempData[i]['user'] = replies[i].user;
  		    tempData[i]['reply'] = replies[i].detail.replace(/\n/g,'<br>');
  		    tempData[i]['thought_id'] = replies[i].thought_id;
  		    tempData[i]['user_id'] = replies[i].user_id;
  		  }
		  
  		  var replyStore = new Ext.data.JsonStore({
          root: 'replies',
          fields: replyFieldsArray
        });
      
        var newArray = new Array();
        newArray["replies"] = tempData;
        replyStore.loadData(newArray,false);
      
        var element = Ext.get(this.grid.getView().getRow(rowIndex)).child('.ux-row-expander-box');
      
        var childGrid = new Ext.list.ListView({
          title : 'Replies',
          store : replyStore,   // Store
          autoHeight: true,
          emptyText: 'No replies to display',
          reserveScrollOffset: true,
          width : '100%',
          //bodyStyle : 'margin-right:20px',
          columns:[
            {
              id: 'reply',
              header: 'Replies',
              dataIndex: 'reply',
              width: '1',
              tpl: '<div style="padding:5px; border:1px solid #CCCCCC; background-color:#FFFFFF;"><b>{user}:</b> {reply}<a href="#" onclick="replyThoughtDeleteHandler({thought_id},{user_id})">:delete</a><div>'
            }
          ]
        });
        element && childGrid.render(element);
        //if(this.actAsTree) {
          //childGrid.getGridEl().swallowEvent(['mouseover', 'mouseout', 'mousedown', 'click', 'dblclick']);
        //}
  	  }
    }
  });
}

  var thoughtStoreReader = new Ext.data.JsonReader(
  {
    idProperty:"id",
    successProperty:"success",
    root:"team_tasks",
    messageProperty:"message",
    fields:fieldsArray
  });

function teamThoughtStoreCallbackFn(records){
  var tempJsonTeamTasks = new Array();
  var tempJsonTeamThoughts = new Array();
  var tempJsonTeamUsers = new Array();
  var tempJsonTeamEvents = new Array(); 
  var numberOfTeams = myTeamStore.getCount();
  //console.log(numberOfTeams);
  teams = [];
  for(var i=0;i<numberOfTeams;i++)
  {
      //console.log({id:myTeamStore.getAt(i).get('id'),team:myTeamStore.getAt(i).get('team')})
    teams.push({id:myTeamStore.getAt(i).get('id'),team:myTeamStore.getAt(i).get('name')})
  }
    
  teams.sort(function(a,b){
    return parseInt(a['id'])>parseInt(b['id']);
  });
    
  for(var i=0;i<numberOfTeams;i++)
  {
    var tmp_arr = new Array();
    tmp_arr["team_thoughts"] = new Array();
    tempJsonTeamThoughts.push(tmp_arr);
    
    var tmp_arr = new Array();
    tmp_arr["team_tasks"] = new Array();
    tempJsonTeamTasks.push(tmp_arr);
    
    var temp_arr = new Array();
    temp_arr["users"] = new Array();
    tempJsonTeamUsers.push(temp_arr);
    
   var temp_arr = new Array();
    temp_arr["evts"] = new Array();
    tempJsonTeamEvents.push(temp_arr);                       
  }
  
  records.each(function(rec){
    var action_status = rec.get('action_status');
    var action_type = rec.get('action_type');
    var status = rec.get('status');
    var scope = rec.get('scope');
    var team_id = rec.get('team_id');
    var action_status_str = rec.get('action_status_str');
    var tempArray = [];
    rec.fields.keys.each(function(key) 
    { 
      tempArray[key] = rec.get(key); 
      
    });
    
    if(scope=='public' && action_status!='Completed' && status==2){ // outstandingTasks store
	    for(var i=0;i<numberOfTeams;i++){
		    if(teams[i]['id']== team_id){
		      tempJsonTeamTasks[i]["team_tasks"].push(tempArray);
		      break;
		    }
		  }	
    }
    if(scope=='public' && status==0){
	    for(var i=0;i<numberOfTeams;i++){
		    if(teams[i]['id']== team_id){
		      tempJsonTeamThoughts[i]["team_thoughts"].push(tempArray);
		      break;
		    }
		  }
		}
    if(status == '5') // event store
		{
		  for(var i=0;i<numberOfTeams;i++){
		      if(teams[i]['id']== team_id){
            tempJsonTeamEvents[i]["evts"].push(tempArray);
		        //tempJsonTeamThoughts[i]["team_thoughts"].push(tempArray);
		        break;
		      }
		  }
		  				  
		}
    //if(scope=='public' && action_status!='Completed' && status==2 && action_type=='1') // outstandingTasks store
      //tempJsonTeamTasks.push(tempArray); 
    
  });
  

 
  for(var i=0;i<numberOfTeams;i++){    
    
    teamUserStore.each(function(record){
      var team_id = record.get('id').split('_')[0];
      var user = record.get('user');
      var user_id = record.get('id').split('_')[1];
      var last_sign_in_at =record.get('last_sign_in_at');      
      var tempArray = [];
      record.fields.keys.each(function(key) 
      { 
        tempArray[key] =  record.get(key);        
      });        
      if(teams[i]['id'] == team_id && user_id != 0){
        tempJsonTeamUsers[i]["users"].push(tempArray);        
      }             
   }); 
  }              setTimeout("Ext.select('.notice').remove()",5000)
  for(var i=0;i<numberOfTeams;i++){
    var cond = i>=teamThoughtsJsonStore.length;
    if(cond){
      teamThoughtsJsonStore.push(new Ext.ux.data.PagingJsonStore({
          root: 'team_thoughts',
          fields: fieldsArray,
          lastOptions: {params: {start: 0, limit: 10}}
        }));
        
      teamEventsJsonStore.push(new Ext.ensible.sample.MemoryEventStore({
        // defined in events.js
        data: Ext.ensible.sample.EventData
      }));
             
      outstandingTasksJsonStore.push(new Ext.data.GroupingStore({
            root: 'team_tasks',
           
            reader:thoughtStoreReader,
           // "url":"/thoughts.json",
            groupField: 'action_type_str',
           
            format:"json",
            writer:new Ext.data.JsonWriter({encode:false})
      }));
      
      teamUsersJsonStore.push(new Ext.data.JsonStore({
      root: 'users',
      fields: [{name:'user_id', type:'int'},{name:'user', type:'string'},{name:'last_sign_in_at', type:'datetime'},{name:'user_name', type:'string'},]                          
      }));                                                              
    }      
    teamThoughtsJsonStore[i].loadData(tempJsonTeamThoughts[i],false);
    outstandingTasksJsonStore[i].loadData(tempJsonTeamTasks[i],false);
    teamUsersJsonStore[i].loadData(tempJsonTeamUsers[i],false);
	  //teamEventsJsonStore[i].loadData(tempJsonTeamEvents[i],false);
		Ext.ensible.sample.EventData = tempJsonTeamEvents[i];
		teamEventsJsonStore[i].loadData(Ext.ensible.sample.EventData,false);			      
    
   // console.log(cond);  
    if(cond){
      var expander = getExpander();
      var teamThoughtColModel = new Ext.grid.ColumnModel({
        columns : [expander, {
      		id : 'brief',
      		header : 'Thought',
      		width : 389,
      		//    sortable : true,
      		dataIndex : 'brief'
      	}, {
      		header : 'Category',
      		width : 75,
      		//    sortable : true,
      		dataIndex : 'category'
      	},{
            header: 'Actions',
            xtype: 'actioncolumn',
            width: 70,
            items: [{
        			icon : '../images/icons/arrow_undo.gif',
        			tooltip : 'Reply Thought',
        			handler : function(grid, rowIndex, colIndex) {
        				selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
        			  var expander = grid.getColumnModel().getColumnAt(0);
        			  //console.log(expander);
        			  //expander.collapse(rowIndex);
        				Ext.MessageBox.buttonText.ok = "Save";
        				Ext.MessageBox.show({
        					title : 'Reply',
        					msg : 'Enter reply to thought:',
        					width : 300,
        					buttons : Ext.MessageBox.OKCANCEL,
        					multiline : true,
        					fn : showResultText//,
        					//fn: FshowResultText.createDelegate(scopeHere, ['your', 'custom' 'parameters'], true)
        					//animateTarget: 'mb3'
        				});
        			}
        		},{
              icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
              tooltip: 'Edit Thought',
              handler: function(grid, rowIndex, colIndex) {
                selectedUserID = grid.getStore().getAt(rowIndex).data.user_id;
                selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;   
              //editTeamThought(selectedThoughtID,selectedUserID);
          
                if(is_admin == true || currentUser == selectedUserID){                                    
                  if(!addWindow) addWindow = new Ext.Window({
                    title: 'Edit Thought',
                    width: 380,
                    applyTo:'hello-win',
                    closeAction:'hide',
                    height: 500,
                    layout: 'fit',
                    plain:true,
                    bodyStyle:'padding:5px;',
                    buttonAlign:'center',
                    //resizable:false,
                    items: addPanel
                  });
                  else
                    addWindow.setTitle('Edit Thought');                  

                  console.log("selcted id");      
                  addPanel.getForm().reset();         
                  addPanel.getForm().load({
                    url: '/thoughts/' + inboxJsonStore.getAt(rowIndex).data.id + '.json',
                    params: {
                      id: inboxJsonStore.getAt(rowIndex).data.id
                    },
                    waitMsg: 'Loading...',
                    method: 'get',
                    success: function(f,a){
                    },
                    failure: function(form, action){
                      Ext.Msg.alert("Load failed", action.result.errorMessage);
                    }
                  
                  });
                  //addUserAndTeamSelectOptions();
                  myTeamStore.load();
                  addWindow.show();
                  addPanel.brief.focus();
                
                }
                else{
                  Ext.Msg.alert("Access violation","You don't have access to edit ");
                }                                                                                                                
              }                
            },
            {
              icon   : '../images/icons/delete.gif',
              tooltip: 'Delete Thought',
              handler: function(grid,rowIndex, colIndex)
              {
                selectedUserID = grid.getStore().getAt(rowIndex).data.user_id;
                selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;                  
                deleteTeamThought(selectedThoughtID,selectedUserID);                                   
              }
            }]
          }                	
      	]
      });
        
      var expander1 = getExpander();
      
      var outstandingTaskColModel = new Ext.grid.ColumnModel({
      	columns : [expander1, {
      		id : 'brief',
      		header : 'Task',
      		width : 280,
      		//sortable : true,
      		dataIndex : 'brief'
      	},{
      		header : 'Type',
      		width : 70,
      		dataIndex : 'action_type_str'
      		//hidden: true
      	},{
      		header : 'Assigned',
      		width : 75,
      		//xtype: 'button',
      		//width: 50,
      		//items: [assigned_button
      		/*{
      		icon   : '../images/icons/blue1.png',
      		tooltip: 'Assigned',
      		handler: function(grid,rowIndex, colIndex)
      		{
      		selectedThoughtID = thoughtGridJsonStore.getAt(rowIndex).data.id;
      		alert(colIndex);
      		}
      		}*///]
      		//renderer: function(value, id, r){ return assigned_button; }
      		renderer : extjsAssignRenderer
      	},{
      		header : 'Due Date',
      		width : 100,
      		//    sortable : true,
      	  dataIndex : 'due_date',
      	  renderer: function(date) { if(date) return date.format("d-m-Y H:i:s"); }
      	},{
          header: 'Actions',
          xtype: 'actioncolumn',
          width: 70,
          items: [{
      			icon : '../images/icons/arrow_undo.gif',
      			tooltip : 'Reply Thought',
      			handler : function(grid, rowIndex, colIndex) {
      				selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
      			  var expander = grid.getColumnModel().getColumnAt(0);
      			  //console.log(expander);
      			  //expander.collapse(rowIndex);
      				Ext.MessageBox.buttonText.ok = "Save";
      				Ext.MessageBox.show({
      					title : 'Reply',
      					msg : 'Enter reply to thought:',
      					width : 300,
      					buttons : Ext.MessageBox.OKCANCEL,
      					multiline : true,
      					fn : showResultText//,
      					//fn: FshowResultText.createDelegate(scopeHere, ['your', 'custom' 'parameters'], true)
      					//animateTarget: 'mb3'
      				});
      			}
      		},{
            icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
            tooltip: 'Edit To Do',
            handler: function(grid, rowIndex, colIndex) {
              selectedUserID = grid.getStore().getAt(rowIndex).data.user_id;
              selectedActionType = grid.getStore().getAt(rowIndex).data.action_type;
              //alert(selectedActionType);
              if(is_admin== true || currentUser == selectedUserID)
              {
                newTask=false;
                taskType = selectedActionType;
                if(taskType == 1)
                {
                  if(!todoEditWindow) todoEditWindow = new Ext.Window({
                  title: 'Edit Thought',
                  closeAction:'hide',
                  width: 380,
                  height: 610,
                  layout: 'fit',
                  plain:true,
                  bodyStyle:'padding:5px;',
                  buttonAlign:'center',
                  //resizable:false,
                  items: todoEditPanel
                });
                else
                  todoEditWindow.setTitle("Edit To Do");
                selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
                todoEditPanel.getForm().reset();
                todoEditPanel.thoughtType.setValue('public').setVisible(false);
                todoEditPanel.status.setValue(2); 
                //todoEditPanel.team.setValue(tabTeamId); 
                todoEditPanel.team.setVisible(true);
                todoEditPanel.action_type.setVisible(true);  
                todoEditPanel.actionable.setValue('t'); 
                
                //todoEditPanel.action_status.setValue('Active');
                //todoEditPanel.action_status.setVisible(false);  
                todoEditPanel.getForm().load({
                  url: '/thoughts/' + grid.getStore().getAt(rowIndex).data.id + '.json',
                  params: {
                    id: grid.getStore().getAt(rowIndex).data.id
                  },
                  waitMsg: 'Loading...',
                  method: 'get',
                  success: function(f,a){
                  var resp = eval('('+a.response.responseText+')');
                  var dat= new Date(resp.data.due_date);
                  todoEditPanel.due_date.setValue(dat);
                  //console.log(f);

                  }
                });

                todoEditWindow.show();
                 }
                if(taskType == 2)
                {
                  if(!refEditWindow) refEditWindow = new Ext.Window({
                    title: 'Edit Thought',
                    closeAction:'hide',
                    width: 380,
                    height: 500,
                    layout: 'fit',
                    plain:true,
                    bodyStyle:'padding:5px;',
                    buttonAlign:'center',
                    //resizable:false,
                    items: refEditPanel
                  });
                  else
                    refEditWindow.setTitle("Edit Reference");
                  selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
                  refEditPanel.getForm().reset();
                  refEditPanel.context.setVisible(false);
                  refEditPanel.action_type.setVisible(false);
                  refEditPanel.getForm().load({
                    url: '/thoughts/' + grid.getStore().getAt(rowIndex).data.id + '.json',
                    params: {
                      id: grid.getStore().getAt(rowIndex).data.id
                    },
                    waitMsg: 'Loading...',
                    method: 'get',
                    success: function(f,a){

                    }
                  });

                  refEditWindow.show();                                                                                          
                }
                if(taskType == 3)
                {
                
                  if(!remindEditWindow) remindEditWindow = new Ext.Window({
                    title: 'Edit Thought',
                    closeAction:'hide',
                    width: 380,
                    height: 550,
                    plain:true,
                    bodyStyle:'padding:5px;',
                    buttonAlign:'center',
                    //resizable:false,
                    items: remindEditPanel
                  });
                  else
                    remindEditWindow.setTitle("Edit Reminder");
                  selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
                  remindEditPanel.getForm().reset();
                  remindEditPanel.action_type.setVisible(false);
                  remindEditPanel.getForm().load({
                    url: '/thoughts/' + grid.getStore().getAt(rowIndex).data.id + '.json',
                    params: {
                      id: grid.getStore().getAt(rowIndex).data.id
                    },
                    waitMsg: 'Loading...',
                    method: 'get',
                    success: function(f,a){
                    var resp = eval('('+a.response.responseText+')');
                    var dat= new Date(resp.data.due_date);
                    remindEditPanel.due_date.setValue(dat);

                    }
                  });

                  remindEditWindow.show();
                }

              }
              else{
                Ext.Msg.alert("Access violation","You dont have access to edit");
              }
            }

          },
          {
            icon   : '../images/icons/delete.gif',
            tooltip: 'Delete Thought',
            handler: function(grid,rowIndex, colIndex)
            {		  
      		    selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
      		    selectedUserID = grid.getStore().getAt(rowIndex).data.user_id;
              if(is_admin==true || currentUser == selectedUserID)
              {
                Ext.Ajax.request({
                  url: '/thoughts/'+selectedThoughtID,
                  scope:this,
                  params: {
                    id: selectedThoughtID
                  },
                  waitMsg:'Deleting...',
                  method: 'delete',
                  success: function(f,a){
                    //todoStore.reload();
      		          globalThoughtStore.reload({callback : function(records,option,success){
      				        globalThoughtStoreCallbackFn(records);		
      			          }
      		          });
      		          teamThoughtStore.reload({callback: function(records, option, success){
      		            teamThoughtStoreCallbackFn(records);
      		            }
      		          });
                  }
                });
                }
              else
              {
                Ext.Msg.alert("Access violation","You dont have access to delete it");
              }
            }
          }]
        }]
      });  
      var myPageSize =10;
      var teamThoughtGrid = new Ext.grid.GridPanel({
        title : 'Shared Team Thoughts',
        store : teamThoughtsJsonStore[i],   // Store
        height : 300,
        bodyStyle : 'margin-right:20px',
        plugins : expander,
        colModel: teamThoughtColModel,
        tbar: [
          {
            text: 'New Thought',
            iconCls: 'add-prop',
            handler: myTeamThoughtHandler
          }],
        bbar: new Ext.PagingToolbar({
          store: teamThoughtsJsonStore[i],       // grid and PagingToolbar using same store
          displayInfo: true,
          pageSize: myPageSize,
          prependButtons: true,
          items: [
              'text 1'
          ],
          refresh: function(){
            delete this.store.lastParams;
            this.doLoad(this.cursor);    
          }
         
        }),
      });
     
      var outstandingTaskGrid = new Ext.grid.GridPanel({
        title : 'Outstanding Tasks',
        store : outstandingTasksJsonStore[i],   //Dummy Store
        height : 300,
        stripeRows : true,
        plugins : expander1,
        colModel: outstandingTaskColModel,
        view: new Ext.grid.GroupingView({
          forceFit:true,
          groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
        tbar: [
          {
            text: 'New To Do',
            iconCls: 'add-prop',
            handler: todoTaskAsignHandler
        },{
            text: 'New Reference',
            iconCls: 'add-prop',
            handler: referenceTaskAsignHandler
        },{
            text: 'New Reminder',
            iconCls: 'add-prop',
            handler: reminderTaskAsignHandler
        }],
      });
      
        
      var calendar = new Ext.ensible.cal.CalendarPanel({
        //eventStore : eventStore[i],
        eventStore: teamEventsJsonStore[i],
        //title : 'Shared Calendar',
        width : 568,
        height : 420,
    
        listeners: {
          eventclick: function(calendar, record, el){
            //console.log(record.id);
            selectedId = record.id;                                   
            newTask=false;
            if(!eventEditWindow) eventEditWindow = new Ext.Window({
              title: 'Edit Event',
              closeAction:'hide',
              width: 380,
              height: 580,
              layout: 'fit',
              plain:true,
              bodyStyle:'padding:5px;',
              buttonAlign:'center',
              //resizable:false,
              items: eventEditPanel
              });
              else
                eventEditWindow.setTitle("Edit Event");
              selectedThoughtID = selectedId;
              eventEditPanel.getForm().reset();
              eventEditPanel.thoughtType.setValue('public').setVisible(false);
              eventEditPanel.status.setVisible(false);
              eventEditPanel.status.setValue(5); 
              eventEditPanel.team.setValue(tabTeamId); 
              eventEditPanel.team.setVisible(false);             
              eventEditPanel.getForm().load({
                url: '/thoughts/' + selectedId + '.json',
                params: {
                  id: selectedId
                },
                waitMsg: 'Loading...',
                method: 'get',
                success: function(f,a){
                  //console.log(f);
                  var startDate = new Date(a.result.data.start_date);
                  var dueDate = new Date(a.result.data.due_date);
                  /*start_utc_date = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(),  startDate.getUTCHours(), startDate.getUTCMinutes(), startDate.getUTCSeconds());
                  due_utc_date = new Date(dueDate.getUTCFullYear(), dueDate.getUTCMonth(), dueDate.getUTCDate(),  dueDate.getUTCHours(), dueDate.getUTCMinutes(), dueDate.getUTCSeconds()); */    
                  var start_date = eventEditPanel.start_date_date.setValue(startDate);
                  start_date = eventEditPanel.start_date_date.getValue();   
                  var due_date = eventEditPanel.due_date_date.setValue(dueDate); 
                  due_date = eventEditPanel.due_date_date.getValue();
                                                                    
                  eventEditPanel.start_date_time.setValue(startDate);                   
                  eventEditPanel.start_date.setValue(start_date);                    
                  eventEditPanel.due_date_time.setValue(dueDate);
                  eventEditPanel.due_date.setValue(due_date);

                }
              });

            eventEditWindow.show();                                                                                                             
          }                                                                                    
        }
      });
      
        
      var calandar = new Ext.Panel({
       // layout: 'absolute',
        width : 710,
        height : 510,            
        title:'Shared Calendar',
        tbar:[{
          text: 'New Event',
          iconCls: 'add-prop',
          handler: calendarEventHandler
        },{
          text: 'Synchronize',
          //iconCls: 'add-prop',
          handler: new_entry
        }],
          items:[calendar]        
      });
        
     /*   var tb = new Ext.Toolbar({
        renderTo: document.body,
        width: 600,
        height: 100,
        items: [
            {
                // xtype: 'button', // default for Toolbars, same as 'tbbutton'
                text: 'Button'
            }],
         calendar.getTopToolBa().tb.add({
         text:'new Event'
         });
         tb.dolayout();
       */         
      var teamUsersGrid = new Ext.grid.GridPanel({
        title: "Users",
        store: teamUsersJsonStore[i],
        height: 320,

        columns: [
            {
              id       : 'user_id',
              header   : 'ID',
              width    : 60,
              //    sortable : true,
              dataIndex: 'user_id',
              hidden: false
            },{
              header: 'User Name',
              width    : 250,
              dataIndex: 'user_name'
            },{
	            header : 'Last Sing In',
	            width : 125,
	            dataIndex :'last_sign_in_at'

            },{
              header : 'Remove User',
              width : 70,
              renderer : newextjsRenderer
            }
        ],
        tbar: [
        
        {
          text: 'Asign User',
          iconCls: 'add-prop',
          handler: userAsignHandler
        }],
        listeners: {
        },
        //region:'center' 	
      });                                
     // console.log("inboxbeforedo layout");                
      inboxPanel.add({
        title: teams[i]['team'],
        ref:'teamspace'+i,
        layout:'table',
        itemId : teams[i]['id'],
        layoutConfig: {
          columns:2
          
        },
        defaults: {
          frame:true,
          width:580,
          height:500,
          bodyStyle:'vertical-align:top'
        },
        items: [teamThoughtGrid,teamUsersGrid,outstandingTaskGrid,calandar]
      });
    inboxPanel.doLayout();
   // console.log("inboxafterdo layout");
    }
  }
        
}

globalThoughtStore.load({callback : function(records,option,success){
  		globalThoughtStoreCallbackFn(records);		
  	}
  });  // globalThoughtStore.load
  /*globalThoughtStore.reload({callback : function(records,option,success){


  		globalThoughtStoreCallbackFn(records);		
  	}
  });*/
  
myTeamStore.load({callback : function(records,option,success){
  //// grid.getView().refresh();
  teamThoughtStore.load({callback : function(records,option,success){
      teamThoughtStoreCallbackFn(records);
    }
  });
}});

 function eventDelete()
{
  selectedEventID = selectedId
  console.log(selectedId);
  Ext.Ajax.request({
  url: '/thoughts/'+selectedId,
  scope:this,
  params: {
    id: selectedId
    },
  waitMsg:'Deleting...',
  method: 'delete',
  success: function(f,a){
    teamUserStore.reload();
    myTeamStore.load();     
    
    teamThoughtStore.load({callback : function(records,option,success){
      teamThoughtStoreCallbackFn(records);
      }
    });

  }
  });
  eventEditWindow.hide();
}
//my local handlers
function newextjsRenderer(value, id, r) {
  var id = Ext.id();
  var user_id = r.get('user_id');
  (function(){
    var remove_button = new Ext.Button({
      renderTo: id,
      text: 'Remove',
      handler: function(btn, e){
       if(is_admin == true)
       {
        var teamID = tabTeamId;
        Ext.Ajax.request({
          url: '/teams/remove_user.json',
          params: {
            team_id: tabTeamId+'_'+user_id,           
          },
          method: 'post',
          waitMsg: 'Saving...',
          success: function(f,a) {
            teamUserStore.reload();
            globalThoughtStore.load({callback : function(records,option,success){
		        globalThoughtStoreCallbackFn(records);		
	            }
            });
           teamThoughtStore.load({callback : function(records,option,success){
            teamThoughtStoreCallbackFn(records);
              }
           });                        
          }
        });
        }
      else
      {
      Ext.Msg.alert("Access violation","Only admin have access ");
      }
        
      }
    });
  }).defer(25);
  return (String.format('<div id="{0}"></div>', id));
  
}

function myTeamThoughtHandler(){
  newThought = true;
  if(!addWindow) addWindow = new Ext.Window({
    title: 'Add New Thought',
    width: 380,
    applyTo:'hello-win',
    closeAction:'hide',
    height: 500,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: addPanel
  });
  else
    addWindow.setTitle('Add New Thought');

  console.log("new");
  addPanel.getForm().reset();
  addPanel.brief.setValue('');
  addPanel.detail.setValue('');
  //addPanel.category.setValue('General');
  addPanel.thoughtType.setValue('public').setVisible(false);
  addPanel.status.setValue(0); 
  addPanel.getForm().findField('team').setVisible(false);
  addPanel.team.setValue(tabTeamId);
  addWindow.show();
  //addUserAndTeamSelectOptions();
  addCatagoryOptions();
  myTeamStore.load();
  //userStore.load();  
}

function userAsignHandler(){
  if(is_admin == true)
  {
    if(!teamWindow) teamWindow = new Ext.Window({
    title: 'Assing Team to User',
    width: 380,
    applyTo:'team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: teamAsignPanel
  });
  else
    teamWindow.setTitle('Assing Team to User');
        
  //teamAsignPanel.thoughtType.setValue('private');
  teamAsignPanel.getForm().reset();
  teamAsignPanel.getForm().findField('name').setVisible(false); 
  teamAsignPanel.team.setValue(tabTeamId);   
  addUserAndTeamSelectOptions();
  myTeamStore.load();
  teamWindow.show();
  }
  else{
    Ext.Msg.alert("Access violation","You don't have access");
  }
}

//new button task handlers for main panel//

function btnTodoTaskHandler()
{
  newTask= true;
  //newButtonTask = false;
  if(!todoEditWindow) todoEditWindow = new Ext.Window({
    title: 'Add New To do',
    closeAction:'hide',
    width: 380,
    height: 610,
    layout: 'fit',

    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: todoEditPanel
  });
  else
    todoEditWindow.setTitle("Add New To do");    
  todoEditPanel.getForm().reset();
  todoEditPanel.thoughtType.setValue('public').setVisible(true);
  todoEditPanel.status.setValue(2); 
  		
  todoEditPanel.team.setVisible(true);
  //todoEditPanel.team.setValue(tabTeamId); 
  
  todoEditPanel.action_type.setValue(1);
  todoEditPanel.action_type.setVisible(false);     
  todoEditPanel.actionable.setValue('t');  
  //todoEditPanel.action_status.setValue('Active');
  //todoEditPanel.action_status.setVisible(false); 
    addCatagoryOptions();
   
  todoEditWindow.show();
}

function btnReferenceTaskHandler()
{
  newTask= true;
  if(!refEditWindow) refEditWindow = new Ext.Window({
    title: 'Add New Reference',
    closeAction:'hide',
    width: 380,
    height: 580,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: refEditPanel
  });
  else
    refEditWindow.setTitle("Add New Reference");    
  refEditPanel.getForm().reset();
  
  refEditPanel.thoughtType.setValue('public').setVisible(true);
  refEditPanel.status.setValue(2); 
  //refEditPanel.team.setValue(tabTeamId); 
  refEditPanel.team.setVisible(true);
  refEditPanel.action_type.setVisible(false);   
  refEditPanel.action_type.setValue(2);
  //refEditPanel.context.setVisible(false);
        
  refEditWindow.show();
}
function btnReminderTaskHandler()
{
  newTask= true;
  if(!remindEditWindow) remindEditWindow = new Ext.Window({
    title: 'Add New Reminder',
    closeAction:'hide',
    width: 380,
    height: 600,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: remindEditPanel
  });
  else
    remindEditWindow.setTitle("Add New Reminder");    
  remindEditPanel.getForm().reset();
  
  remindEditPanel.thoughtType.setValue('public').setVisible(true);
  remindEditPanel.status.setValue(2); 
  //remindEditPanel.team.setValue(tabTeamId); 
  remindEditPanel.team.setVisible(true);
  remindEditPanel.action_type.setVisible(false);
  remindEditPanel.action_type.setValue(3);
       
  remindEditWindow.show();
}



//ends of new button task handlers 
// new calendar event handler


function calendarEventHandler()
{
  newTask= true;


  //newButtonTask = false;
  if(!eventEditWindow) eventEditWindow = new Ext.Window({
    title: 'Add New Event',
    closeAction:'hide',
    width: 380,
    height: 580,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: eventEditPanel
  });
  else
    eventEditWindow.setTitle("Add New Event");    
  eventEditPanel.getForm().reset();
  eventEditPanel.thoughtType.setVisible(false);
  eventEditPanel.status.setValue(5); 
  eventEditPanel.status.setVisible(false);
  eventEditPanel.thoughtType.setValue("public");
  eventEditPanel.team.setVisible(true);
  eventEditPanel.team.setValue(tabTeamId); 
  eventEditWindow.show();
}

//end of new event calendar event handler
function todoTaskAsignHandler()
{
  newTask= true;
  //newButtonTask = false;
  if(!todoEditWindow) todoEditWindow = new Ext.Window({
    title: 'Add New To do',
    closeAction:'hide',
    width: 380,
    height: 610,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: todoEditPanel
  });
  else
    todoEditWindow.setTitle("Add New To do");    
  todoEditPanel.getForm().reset();
  todoEditPanel.thoughtType.setValue('public').setVisible(false);
  todoEditPanel.status.setValue(2); 

  todoEditPanel.team.setVisible(false);
  todoEditPanel.team.setValue(tabTeamId); 
  
  todoEditPanel.action_type.setValue(1);
  todoEditPanel.action_type.setVisible(false);     
  todoEditPanel.actionable.setValue('t');  
  //todoEditPanel.action_status.setValue('Active');
  //todoEditPanel.action_status.setVisible(false);  
  addCatagoryOptions();
  todoEditWindow.show();
}

function referenceTaskAsignHandler()
{
  newTask= true;
  if(!refEditWindow) refEditWindow = new Ext.Window({
    title: 'Add New Reference',
    closeAction:'hide',
    width: 380,
    height: 580,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: refEditPanel
  });
  else
    refEditWindow.setTitle("Add New Reference");    
  refEditPanel.getForm().reset();
  
  refEditPanel.thoughtType.setValue('public').setVisible(true);
  refEditPanel.status.setValue(2); 
  refEditPanel.team.setValue(tabTeamId); 
  refEditPanel.team.setVisible(true);
  refEditPanel.action_type.setVisible(false);   
  refEditPanel.action_type.setValue(2);
  //refEditPanel.context.setVisible(false);
    
  
  
  refEditWindow.show();
}
function reminderTaskAsignHandler()
{
  newTask= true;
  if(!remindEditWindow) remindEditWindow = new Ext.Window({
    title: 'Add New Reminder',
    closeAction:'hide',
    width: 380,
    height: 600,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: remindEditPanel
  });
  else
    remindEditWindow.setTitle("Add New Reminder");    
  remindEditPanel.getForm().reset();
  
  remindEditPanel.thoughtType.setValue('public').setVisible(true);
  remindEditPanel.status.setValue(2); 
  remindEditPanel.team.setValue(tabTeamId); 
  remindEditPanel.team.setVisible(true);
  remindEditPanel.action_type.setVisible(false);
  remindEditPanel.action_type.setValue(3);
     
  
  remindEditWindow.show();
}


//my handlers ends


function teamAsignHandler()
{
  teamAsignPanel.getForm().submit({
    url: '/teams/add_user.json',
    method: 'post',
    waitmsg: 'Saving...',
    success: function(f,a) {
      teamUserStore.reload();
      addUserAndTeamSelectOptions();
      myTeamStore.load();
      globalThoughtStore.reload({callback : function(records,option,success){
				globalThoughtStoreCallbackFn(records);		
			  }
		  });
		  teamThoughtStore.reload({
        callback : function(records, option, success) {
          teamThoughtStoreCallbackFn(records);
        }
      });
    }
    
  });
    teamWindow.hide();
}

function teamDeleteHandler()
{
  selectedTeamID = deleteTeamPanel.getForm().findField('name').getValue();
  console.log(selectedTeamID);
  Ext.Ajax.request({
    url: '/teams/'+selectedTeamID,
    scope:this,
    params: {
      id: selectedTeamID
      },
    waitMsg:'Deleting...',
    method: 'delete',
    success: function(f,a){
       myTeamStore.reload();
		   teamUserStore.reload();	
		   teamThoughtStore.load({callback : function(records,option,success){
	        teamThoughtStoreCallbackFn(records);
		      }
	      });	  
	     inboxPanel.remove(selectedTeamID,true);  
	     inboxPanel.doLayout();
    }
  });
    deleteTeamWindow.hide();
}

function thoughtSaveHandler()
{
  if(newThought)
  {
    addPanel.getForm().submit({
      url: '/thoughts.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
        //inboxStore.reload();
        addWindow.hide();
		    globalThoughtStore.reload({callback : function(records,option,success){
				    globalThoughtStoreCallbackFn(records);		
			     }
		    });
		    teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
        myTeamStore.load();
        newThought = false;
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }

    });
  }
  else
  {
 
    addPanel.getForm().submit({
      url: '/thoughts/'+selectedThoughtID+'.json',
      params: {
        id: selectedThoughtID
      },//here
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
        //inboxStore.reload();
        addWindow.hide();
		    globalThoughtStore.reload({callback : function(records,option,success){
				  globalThoughtStoreCallbackFn(records);		
			     }
		    });
		    teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
      }
    });
  }
//  addWindow.hide();
  // if(addWindow) addWindow.hide();
}




function teamEditHandler()
{
  selectedTeamID = editTeamPanel.getForm().findField('name').getValue();
  
  if(!newTeamWindow) newTeamWindow = new Ext.Window({
    title: 'Edit Team',
    width: 380,
    applyTo:'new-team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: teamAddPanel
  });
  else
    newTeamWindow.setTitle('Edit Team');
   
  teamAddPanel.getForm().reset();
  teamAddPanel.getForm().load({
          url: '/teams/' + selectedTeamID + '.json',
          params: {

            id: selectedTeamID
          },
          waitMsg: 'Loading...',
          method: 'get',
          success: function(f,a){
            teamThoughtStore.load({callback : function(records,option,success){
            teamThoughtStoreCallbackFn(records);
        }
      });
          },
          failure: function(form, action){
            Ext.Msg.alert("Load failed", action.result.errorMessage);
          }
        });
              
  editTeamWindow.hide();
  newTeam = false;
  newTeamWindow.show();
}


function userSaveHandler()
{
  if(newUser)
  {
    userAddPanel.getForm().submit({
      url: '/my_users.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    userStore.reload();
		    teamUserStore.reload();
		  }
    });
    newUser = false;
  }
  else
  {
    userAddPanel.getForm().submit({
      url: '/my_users/'+selectedUserID+'.json',
      params: {
        id: selectedUserID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    userStore.reload();
      }
    });
  }
  if(userWindow) userWindow.hide();
}

function teamSaveHandler()
{
  if(newTeam)
  {
    teamAddPanel.getForm().submit({
      url: '/teams.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    myTeamStore.reload();
		    teamUserStore.reload();
		    teamThoughtStore.load({callback : function(records,option,success){
	        teamThoughtStoreCallbackFn(records);
		      }
	      });
		  }
    });
    newTeam = false;
  }
  else
  {
    teamAddPanel.getForm().submit({
      url: '/teams/'+selectedTeamID+'.json',
      params: {
        id: selectedTeamID

      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    myTeamStore.reload();
		    teamUserStore.reload();
		    teamThoughtStore.load({callback : function(records,option,success){
	        teamThoughtStoreCallbackFn(records);
		      }
	      });
		    
      }
    });
  }
 
  if(newTeamWindow) newTeamWindow.hide();
 
}

function catagorySaveHandler()
{
  if(newCatagory)
  {
    catagoryAddPanel.getForm().submit({
      url: '/catagories.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    catagoryStore.reload();		    		    	      
	    }
	      
	  });
		
  
    newCatagory = false;  
  }
  else
  {
    catagoryAddPanel.getForm().submit({
      url: '/catagories/'+selectedCatagoryID+'.json',
      params: {
        id: selectedCatagoryID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    catagoryStore.reload();
		    
		    
      }
    });
  }
 
  if(catagoryWindow) catagoryWindow.hide();
 
}






/*
function contextSaveHandler()
{
 // if()
  //{
    contextAddPanel.getForm().submit({
      url: '/thoughts.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    myTeamStore.reload();
		    contextStore.reload();
		    teamUserStore.reload();
		    teamThoughtStore.load({callback : function(records,option,success){
	        teamThoughtStoreCallbackFn(records);
		      }
	      });
		  }
    });
    //newTeam = false;
  //}
  /*else
  {
    teamAddPanel.getForm().submit({
      url: '/teams/'+selectedTeamID+'.json',
      params: {
        id: selectedTeamID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
		    myTeamStore.reload();
		    teamUserStore.reload();
		    
      }
    });
  }
 
  if(newTeamWindow) newTeamWindow.hide();
 
}
*/

function eventSaveHandler()
{
  //console.log(todoEditPanel.action_type.getValue());
 
  var startDate = eventEditPanel.start_date_date.getValue();    
  var startDateTime = eventEditPanel.start_date_time.getValue().split(':');
  var hours = startDateTime[0]; 
  var minutes = startDateTime[1];    
  /*var new_minutes = minutes.split(' ');
  minutes = new_minutes[0];
  var am_pm = new_minutes[1];
     
  if (am_pm == 'PM')
  {
    hours = parseInt(hours)+12;
  }
   */
  finalStartDate = new Date(startDate.getYear(), startDate.getMonth(), startDate.getDate());  
  finalStartDate.setHours(hours,minutes);  
  
  eventEditPanel.start_date.setValue(finalStartDate.toUTCString());
  //console.log(finalStartDate.toUTCString()+'start date');
  var dueDate = eventEditPanel.due_date_date.getValue();
  var dueDateTime = eventEditPanel.due_date_time.getValue();
  dueDateTime = dueDateTime.split(':');
  hours = dueDateTime[0]; 
  minutes = dueDateTime[1];
  /*new_minutes = minutes.split(' ');
  minutes = new_minutes[0];
  var am_pm = new_minutes[1];  
  if (am_pm == 'PM')
  {
    hours = parseInt(hours) + 12;
  }  */
  finalDueDate = new Date(dueDate.getYear(), dueDate.getMonth(), dueDate.getDate());
  finalDueDate.setHours(hours,minutes);
  eventEditPanel.due_date.setValue(finalDueDate.toUTCString());
  //console.log(finalDueDate.toUTCString()+'due date');

 /* start_utc_date = new Date(startDate.getUTCFullYear(), startDate.getUTCMonth(), startDate.getUTCDate(),  startDate.getUTCHours(),    startDate.getUTCMinutes(), startDate.getUTCSeconds());

  due_utc_date = new Date(dueDate.getUTCFullYear(), dueDate.getUTCMonth(), dueDate.getUTCDate(),  dueDate.getUTCHours(), dueDate.getUTCMinutes(), dueDate.getUTCSeconds());

  */
   
  if(newTask)
  {                                       
    eventEditPanel.getForm().submit({  
      url: '/thoughts.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {       
        //inboxStore.reload();
	      globalThoughtStore.reload({callback : function(records,option,success){
			    globalThoughtStoreCallbackFn(records);		
		      }
	      });
	
	      teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });

        myTeamStore.load();
        newTask = false;
      }
    });
  }
  else{

    eventEditPanel.getForm().submit({
      url: '/thoughts/'+selectedThoughtID+'.json',
      params: {
        id: selectedThoughtID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
        //todoStore.reload();
      globalThoughtStore.reload({callback : function(records,option,success){
			    globalThoughtStoreCallbackFn(records);		
		    }
	    });
	    teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
      }
    });
  }
  eventEditWindow.hide();
}

function todoSaveHandler()
{

 // console.log(todoEditPanel.action_type.getValue());
  if(newTask)
  {
    todoEditPanel.getForm().submit({
      url: '/thoughts.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
        todoEditWindow.hide();
        //inboxStore.reload();
    	  globalThoughtStore.reload({callback : function(records,option,success){
    			  globalThoughtStoreCallbackFn(records);		
    		  }
    	  });
    	  teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
        myTeamStore.load();
        newTask = false;
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }
    });
  }
  else{

    todoEditPanel.getForm().submit({
      url: '/thoughts/'+selectedThoughtID+'.json',
      params: {
        id: selectedThoughtID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
        //todoStore.reload();
        todoEditWindow.hide();
        globalThoughtStore.reload({callback : function(records,option,success){
  			    globalThoughtStoreCallbackFn(records);		
  		    }
  	    });
  	    teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }
    });
  }
}

function refSaveHandler()
{
  //console.log(refEditPanel.action_type.getValue());
  if(newTask)
  {
    refEditPanel.getForm().submit({
      url: '/thoughts.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
          refEditWindow.hide();
        //inboxStore.reload();
      	  globalThoughtStore.reload({callback : function(records,option,success){
      			  globalThoughtStoreCallbackFn(records);		
      		  }
      	  });
      	  teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
        myTeamStore.load();
        newTask = false;
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }
    });
  }
  else
  {
    refEditPanel.getForm().submit({
      url: '/thoughts/'+selectedThoughtID+'.json',
      params: {
        id: selectedThoughtID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
        refEditWindow.hide();
        //referenceStore.reload();
  	    globalThoughtStore.reload({callback : function(records,option,success){
  				  globalThoughtStoreCallbackFn(records);		
  			  }
  		  });
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }
    });
  }
}

function remindSaveHandler()
{

  if(newTask)
  {
    remindEditPanel.getForm().submit({
      url: '/thoughts.json',
      method: 'post',
      waitMsg: 'Saving...',
      success: function(f,a) {
        remindEditWindow.hide();
        //inboxStore.reload();
	      globalThoughtStore.reload({callback : function(records,option,success){
			    globalThoughtStoreCallbackFn(records);		
		      }
	      });
	      teamThoughtStore.reload({
        	callback : function(records, option, success) {
            teamThoughtStoreCallbackFn(records);
          }
        });
        myTeamStore.load();
        newTask = false;
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }
    });
  }

  else
  {
    remindEditPanel.getForm().submit({
      url: '/thoughts/'+selectedThoughtID+'.json',
      params: {
        id: selectedThoughtID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
        remindEditWindow.hide();
        //reminderStore.reload();
	      globalThoughtStore.reload({callback : function(records,option,success){
				    globalThoughtStoreCallbackFn(records);		
			    }
		    });
		    teamThoughtStore.reload({
          	callback : function(records, option, success) {
              teamThoughtStoreCallbackFn(records);
            }
        });		  
      },
      failure: function (f,a)
      {
        Ext.Msg.show({
             title:'Error'
            ,msg:'Values are incorrect'
            ,modal:true
            ,icon:Ext.Msg.ERROR
            ,buttons:Ext.Msg.OK
        });
      }
    });
  }
  
}

var addPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'addPanel',
  defaults: {
    width: 350
  },
  items:[{
    fieldLabel:"Briefly, what's on your mind?",
    name:'brief',
    ref:'brief',
    allowBlank:false
  },{
    name: 'category',
    ref: 'category',
    id: 'category',
    xtype: 'combo',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Catagory',
    triggerAction: 'all',
    store: catagoryOptions,
    displayField: 'catagory_name',
    valueField: 'catagory_name',
    emptyText: 'Select Catagory',
    forceSelection: true,
    // valueNotFoundText: 'Value Not Found',
    // listeners: {
    //     afterrender: function(combo) {
    //       combo.setValue('General');
    //     }
    // }
  },{
    xtype:'textarea',
    ref:'detail',
    fieldLabel:"More Details",
    name:'detail',
    height: 200
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    ref: 'thoughtType',
    name: 'scope',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
           
      inputValue: 'private',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            addPanel.getForm().findField('team').setVisible(false);
            //addPanel.getForm().findField('team').setValue('');
          }
        }
      
      }
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
            if(checked) {
               addPanel.getForm().findField('team').setVisible(true);
            }
        }
      }
    }]
  },{
    
      xtype: 'combo',
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      fieldLabel: 'Teams',
      name: 'team',
      ref:'team',
      triggerAction: 'all',
      store: myTeamStore,
      displayField: 'name',
      valueField: 'id',
      hidden: true
  },{
    ref: 'status',
    name: 'status',
    hidden: true
  }],
  buttons:[{
    text: "Save",
    handler: thoughtSaveHandler
  },{
    text: 'Close',
    handler: function(){
      addWindow.hide();
    }
    }]
});


var teamAsignPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'teamAsignPanel',
  defaults: {
    width: 350
  },
  items:[{
    name: 'user',
    xtype: 'combo',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Users',
    triggerAction: 'all',
    store: emailOptions,
    displayField: 'user_name',
    valueField: 'id',
    emptyText: 'Select User'
  },{
    name: 'name',
    xtype: 'combo',
    mode: 'local',
    ref: 'team',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Teams',
    triggerAction: 'all',
    store: myTeamStore,
    displayField: 'name',
    valueField: 'id',
    emptyText: 'Select Team'
  }],
  buttons:[{
    text: "Asign",
    handler: teamAsignHandler
  },{
    text: 'Close',
    handler: function(){
      teamWindow.hide();
    }
  }]
});

var userAddPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'userAddPanel',

  defaults: {
    width: 350
  },
  items:[{
    fieldLabel:"Email",
    name:'email',
    ref:'email',
    allowBlank:false
  },{
    fieldLabel:"Name",
    name:'user_name',
    ref:'user_name',
    allowBlank:false
  },{
    fieldLabel:"Password",
    name:'password',
    ref:'password'
  
  },{
    fieldLabel:"Confirm Password",
    name:'password_confirmation',
    ref:'password_confirmation'
  
  }],
  buttons:[{
    text: "Save",
    handler: userSaveHandler
  },{
    text: 'Close',
    handler: function(){
      userWindow.hide();
    }
  }]
});


var teamAddPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'teamAddPanel',
  defaults: {
    width: 250
  },
  items:[{
    fieldLabel:"Team Name",
    name:'name',
    ref:'name',
    allowBlank:false
  }],
  buttons:[{
    text: "Save",
    handler: teamSaveHandler
  },{
    text: 'Close',
    handler: function(){
      newTeamWindow.hide();
    }
  }]
});

var catagoryAddPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'catagoryAddPanel',
  defaults: {
    width: 250
  },
  items:[{
    fieldLabel:"Name",
    name:'name',
    ref:'name',
    allowBlank:false
  },{
    xtype: 'combo',
    ref:'category',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Type',
    name: 'ctype',
    triggerAction: 'all',
    displayField: 'name',
    valueField: 'value',
    emptyText: 'Select Category',
    store: new Ext.data.SimpleStore({
      fields: ['name','value'],
      data: [
      ['Catagory','Catagory'],
      ['Context','Context'],      
      ]
    }),
    value: 'Catagory'
  }],
  buttons:[{
    text: "Save",
    handler: catagorySaveHandler
  },{
    text: 'Close',
    handler: function(){
      catagoryWindow.hide();
    }
  }]
});

/*

var contextAddPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'contextAddPanel',
  defaults: {
    width: 250
  },
  items:[{
    fieldLabel:"Context Name",
    name:'context',
    ref:'context',
    allowBlank:false
  }],
  buttons:[{
    text: "Save",
    handler: contextSaveHandler
  },{
    text: 'Close',
    handler: function(){
      newTeamWindow.hide();
    }
  }]
});


*/
var editTeamPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'editTeamPanel',
  defaults: {
    width: 350
  },
  items:[{
    name: 'name',
    xtype: 'combo',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Teams',
    triggerAction: 'all',
    store: myTeamStore,
    displayField: 'name',
    valueField: 'id',
    emptyText: 'Select Team'

  }],
  buttons:[{
    text: "Edit",
    handler: teamEditHandler
  },{
    text: 'Cancel',
    handler: function(){
      editTeamWindow.hide();
    }
  }]
});


var deleteTeamPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'deleteTeamPanel',
  defaults: {
    width: 350
  },
  items:[{
    name: 'name',
    xtype: 'combo',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Teams',
    triggerAction: 'all',
    store: myTeamStore,
    displayField: 'name',
    valueField: 'id',
    emptyText: 'Select Team'

  }],
  buttons:[{
    text: "delete",
    handler: teamDeleteHandler
  },{
    text: 'Cancel',
    handler: function(){
      deleteTeamWindow.hide();
    }
  }]
});

var eventEditPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'eventEditPanel',
  defaults: {
    width: 350
  },
  items:[
    {
    fieldLabel:"Brief Event",
    name:'brief',
    ref:'brief',
    allowBlank:false
  },{
     
      fieldLabel: 'Start Date',
      ref:'start_date',
      name: 'start_date',
      format: 'c',
      hidden: true,
      editable: true
  },{
      xtype: 'datefield',
      fieldLabel: 'Start Date',
      ref:'start_date_date',
      name: 'start_date_date',
     // format: 'c',

      editable: false
  },{
      xtype: 'timefield',
      fieldLabel: 'Start Time',
      ref:'start_date_time',
      name: 'start_date_time',
      format: 'H:i',
      editable: false
  },{
      xtype: 'timefield',
      fieldLabel: 'End Time',
      ref:'due_date_time',
      name: 'due_date_time',
      format: 'H:i',
      editable: false
  },{
      
      fieldLabel: 'Due Date',
      ref:'due_date',

      name: 'due_date',
      format: 'c',
      hidden: true,
      editable: true
  },{
      xtype: 'datefield',
      fieldLabel: 'Due Date',
      ref:'due_date_date',
      name: 'due_date_date',
      //format: 'c',
      editable: false
  },{
    xtype:'textarea',
    ref:'detail',
    fieldLabel:"Details",
    name:'detail',
    height: 150
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
      inputValue: 'private',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            eventEditPanel.getForm().findField('team').setVisible(false);
          }
        }
      }
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked && newThought) {
            eventEditPanel.getForm().findField('team').setVisible(true);
          }
        }
      }
    }]  
  },{
     name: 'team',
     ref: 'team',
     xtype: 'combo',
     mode: 'local',
     typeAhead: true,
     forceSelection: true,
     fieldLabel: 'Teams',
     triggerAction: 'all',
     store: myTeamStore,
     displayField: 'name',
     valueField: 'id',
     hidden: true
  },{
    ref: 'status',
    name: 'status',
    hidden: true,
    Value: 5
  }
  ],
  buttons:[{
    text: "Save",
    handler: eventSaveHandler
  },{
    text: "Delete",
    handler: eventDelete
  },{
    text: 'Close',
    handler: function(){
      eventEditWindow.hide();
    },
  }]
});


var todoEditPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'todoEditPanel',
  defaults: {
    width: 350
  },
  items:[
    {
    xtype: 'combo',
    ref:'action_type',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Action Type',
    name: 'action_type',
    triggerAction: 'all',
    emptyText: 'Select Action',
    store: new Ext.data.ArrayStore({
      id:0,
      fields: ['val','name'],
      data: [ [1,'To Do'], [2,'Reference'],[3,'Reminder']]
    }),
    displayField: 'name',
    valueField: 'val'
  },{
    fieldLabel:"Brief Thought",
    name:'brief',
    ref:'brief',
    allowBlank:false
  },{
    fieldLabel:"Next Action",
    name:'next',
    ref:'next',
    allowBlank:false
  },{
    fieldLabel:"Outcome",
    name:'outcome',
    ref:'outcome',
    allowBlank:false
  },{
    xtype: 'combo',
    ref:'action_status',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Action Status',
    name: 'action_status',
    triggerAction: 'all',
    displayField: 'name',
    valueField: 'value',
    emptyText: 'Select Status',
    store: new Ext.data.SimpleStore({
      fields: ['name','value'],
      data: [
        ['Pending','Pending'],
        ['Active','Active'],
        ['Completed','Completed'],
        ['Inactive','Inactive']
      ]
    }),
    width: 100,
    value: 'Active'

  },{
      xtype: 'datefield',
      fieldLabel: 'Due Date',
      ref:'due_date',
      name: 'due_date',
      format: 'c', //'d-m-Y H:i:s',
      //caltFormats: 'c',
      editable: false
  },{
      xtype:'textarea',
      ref:'detail',
      fieldLabel:"Details",
      name:'detail',
      height: 80
  },{ 
  /*
      xtype: 'combo',
      ref:'category',
      id:'category',
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      fieldLabel: 'Category',
      name: 'category',
      triggerAction: 'all',
      displayField: 'name',
      valueField: 'value',
      emptyText: 'Select Category',
      store: new Ext.data.SimpleStore({
      fields: ['name','value'],
      data: [
      ['General','General'],
      ['To Do','To Do'],
      ['Reference','Reference']
      ]
    }),
    value: 'General'
    
*/    
      xtype: 'combo',  
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      name: 'category',
      ref: 'category',
      //id: 'category',     
      fieldLabel: 'Catagory',
      triggerAction: 'all',
      store: catagoryOptions,
      displayField: 'catagory_name',
      valueField: 'catagory_name',
      emptyText: 'Select Catagory'
  },{    
      xtype: 'combo',
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      name: 'context',
      ref: 'context',
            
      fieldLabel: 'context',
      triggerAction: 'all',
      store: contextOptions,
      displayField: 'catagory_name',
      valueField: 'catagory_name',
      emptyText: 'Select context'
      /*
      xtype: 'combo',
      ref:'context',
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      fieldLabel: 'Context',
      name: 'context',
      triggerAction: 'all',
      displayField: 'name',
      valueField: 'value',
      emptyText: 'Select Context',
      store: new Ext.data.SimpleStore({
        fields: ['name','value'],
        data: [
        ['Context1','Context1'],
        ['Context2','Context2'],
        ['Context3','Context3']
        ]
      })*/
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
      inputValue: 'private',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            todoEditPanel.getForm().findField('team').setVisible(false);
          }
        }
      }
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked || newThought) {
            todoEditPanel.getForm().findField('team').setVisible(true);
          }
        }
      }
    }]  
  },{
     name: 'team',
     ref: 'team',
     xtype: 'combo',
     mode: 'local',
     typeAhead: true,
     forceSelection: true,
     fieldLabel: 'Teams',
     triggerAction: 'all',
     store: myTeamStore,

     displayField: 'name',
     valueField: 'id',
     hidden: true
  },{
    ref: 'status',
    name: 'status',
    hidden: true
  },{
    ref: 'actionable',
    name: 'actionable',
    hidden: true,
    value:'t'
  }
  ],
  buttons:[{
    text: "Save",
    handler: todoSaveHandler
  },{
    text: 'Close',
    handler: function(){
      todoEditWindow.hide();
    }
  }]
});

var refEditPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'refEditPanel',
  defaults: {
    width: 350
  },
  items:[{
    xtype: 'combo',
    ref:'action_type',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Action Type',
    name: 'action_type',
    triggerAction: 'all',
    emptyText: 'Select Action',
    store: new Ext.data.ArrayStore({
      id:0,
      fields: ['val','name'],
      data: [ [1,'To Do'], [2,'Reference'],[3,'Reminder']]
    }),
    displayField: 'name',
    valueField: 'val'
  },{
    fieldLabel:"Brief Thought",
    name:'brief',
    ref:'brief',
    allowBlank:false
  },{
    xtype:'textarea',
    ref:'detail',
    fieldLabel:"Details",
    name:'detail',
    height: 200
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    name: 'scope',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
      inputValue: 'private',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            refEditPanel.getForm().findField('team').setVisible(false);
          }
        }
      }
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            refEditPanel.getForm().findField('team').setVisible(true);
          }
        }
      }
    }]
  },{
     name: 'team',
     xtype: 'combo',
     mode: 'local',
     ref: 'team',
     typeAhead: true,
     forceSelection: true,
     fieldLabel: 'Teams',
     triggerAction: 'all',
     store: myTeamStore,
     displayField: 'name',
     valueField: 'id',
     hidden: true
  },{
    ref: 'status',
    name: 'status',
    hidden: true
  }],
  buttons:[{
    text: "Save",
    handler: refSaveHandler
  },{
    text: 'Close',
    handler: function(){
      refEditWindow.hide();
    }
  }]
});

var remindEditPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'remindEditPanel',


  defaults: {
    width: 350
  },
  items:[{
    xtype: 'combo',
    ref:'action_type',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Action Type',
    name: 'action_type',
    triggerAction: 'all',
    emptyText: 'Select Action',
    store: new Ext.data.ArrayStore({
      id:0,
      fields: ['val','name'],
      data: [ [1,'To Do'], [2,'Reference'],[3,'Reminder']]
    }),
    displayField: 'name',
    valueField: 'val'
  },{
    fieldLabel:"Brief Thought",
    name:'brief',
    ref:'brief',
    allowBlank:false
  },{
    fieldLabel:"Next Action",
    name:'next',
    ref:'next',
    allowBlank:false
  },{
      xtype: 'datefield',
      fieldLabel: 'Due Date',
      ref:'due_date',
      name: 'due_date',
      format: 'c',
      editable: false
  },{
    xtype:'textarea',
    ref:'detail',
    fieldLabel:"More Details",
    name:'detail',
    height: 180
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    name: 'scope',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
      inputValue: 'private',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            remindEditPanel.getForm().findField('team').setVisible(false);
          }
        }
      }
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public',
      listeners:{
        check:function(field,checked) {
            //console.log("Hit");
          if(checked) {
            remindEditPanel.getForm().findField('team').setVisible(true);
          }
        }
      }
    }]
  },{
     name: 'team',
     ref:'team',
     xtype: 'combo',
     mode: 'local',
     typeAhead: true,
     forceSelection: true,
     fieldLabel: 'Teamms',
     triggerAction: 'all',
     store: myTeamStore,
     displayField: 'name',
     valueField: 'id',
     hidden: true
  },{
    ref: 'status',
    name: 'status',
    hidden: true
  }],

  buttons:[{
    text: "Save",
    handler: remindSaveHandler
  },{
    text: 'Close',
    handler: function(){
      remindEditWindow.hide();
    }
  }]
});
/*
var addToTeam = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'addToTeam',
  defaults: {
    width: 350
  },
  items:[{
    xtype: 'combo',
    ref:'teams',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Teams',
    name: 'teams',
    triggerAction: 'all',
    displayField: 'name',
    valueField: 'value',
    emptyText: 'Select Team',
    
    store: new Ext.data.SimpleStore({
      fields: ['name','value'],
      data: [
      ['General','General'],
      ['To Do','To Do'],
      ['Reference','Reference']
      ]
    }),
    value: 'General'

  },
  buttons:[{
    text: "Save",
    handler: thoughtSaveHandler
  },{
    text: 'Close',
    handler: function(){
//      addWindow.hide();
      addWindow.hide();
    }
  }]
});*/






