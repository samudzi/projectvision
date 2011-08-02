var globalThoughtStore = Ext.StoreMgr.get('global_thought_store');
var teamThoughtStore = Ext.StoreMgr.get('team_thought_store');
teamThoughtStore.load();
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
    {name: 'user_id', type: 'int'}, 
    {name: 'assigned_to', type: 'string'},
		//{name: 'replies', type: 'string'},
    {name: 'type', type: 'string'}
		//{name: 'replies', type: 'string'}, 
];
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
var outstandingTasksJsonStore = new Ext.data.JsonStore({
			root: 'outstanding_tasks',
			fields: fieldsArray
});

var outstandingTasksJsonStore = new Ext.data.JsonStore({
      root: 'team_tasks',
      fields: fieldsArray
});

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
		var tempJsonThoughtGrid = new Array();
		var finalJsonThoughtGrid = new Array();
		var tempJsonOutstandingTasks = new Array();
		var finalJsonOutstandingTasks = new Array();
		
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
			if(status==2 && action_status=='Pending' && action_type=='1') // upcoming store
				tempJsonUpcoming.push(tempArray);
			if(status==2 && action_status=='Completed' && action_type=='1') // recentCompleted store
				tempJsonRecentCompleted.push(tempArray);		
			if(scope=='public') // thoughtGrid store
				tempJsonThoughtGrid.push(tempArray);	
			if(scope=='public' && action_status!='Completed') // outstandingTasks store
				tempJsonOutstandingTasks.push(tempArray);	
			
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
		finalJsonEventData["evts"] = tempJsonReminder;
		Ext.ensible.sample.EventData = finalJsonEventData;
		eventStore.loadData(Ext.ensible.sample.EventData);
		//Ext.ensible.sample.EventData = finalJsonEventData;
		//EventDataJsonStore.loadData(finalJsonEventData,false);	
		
		//Dashboard
		finalJsonUpcoming["upcoming"] = tempJsonUpcoming;
		upcomingJsonStore.loadData(finalJsonUpcoming,false);
		finalJsonRecentCompleted["recent_completed"] = tempJsonRecentCompleted;
		recentCompletedJsonStore.loadData(finalJsonRecentCompleted,false);
		
		finalJsonThoughtGrid["thought_grid"] = tempJsonThoughtGrid;
		thoughtGridJsonStore.loadData(finalJsonThoughtGrid,false);
		
		finalJsonOutstandingTasks["outstanding_tasks"] = tempJsonOutstandingTasks;
		//outstandingTasksJsonStore.loadData(finalJsonOutstandingTasks,false);		
				
}  // globalThoughtStoreCallbackFn


function teamThoughtStoreCallbackFn(records){
  
    var tempJsonTeamTasks = new Array();
    var finalJsonTeamTasks = new Array();
    
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
      if(scope=='public' && action_status!='Completed') // outstandingTasks store
        tempJsonTeamTasks.push(tempArray); 
      
    });
    
    finalJsonTeamTasks["team_tasks"] = tempJsonTeamTasks;
    outstandingTaskGrid.loadData(finalJsonTeamTasks,false);
}

globalThoughtStore.load({callback : function(records,option,success){
		globalThoughtStoreCallbackFn(records);		
	}
});  // globalThoughtStore.load
/*globalThoughtStore.reload({callback : function(records,option,success){
		globalThoughtStoreCallbackFn(records);		
	}
});*/
//// grid.getView().refresh();
teamThoughtStore.load({callback : function(records,option,success){
    teamThoughtStoreCallbackFn(records);
  }
});

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
		globalThoughtStore.reload({callback : function(records,option,success){
				globalThoughtStoreCallbackFn(records);		
			}
		});
        newThought = false;
      }
    });
  }
  else
  {
    addPanel.getForm().submit({
      url: '/thoughts/'+selectedThoughtID+'.json',
      params: {
        id: selectedThoughtID
      },
      method: 'put',
      waitMsg: 'Saving...',
      success: function(f,a) {
        //inboxStore.reload();
		globalThoughtStore.reload({callback : function(records,option,success){
				globalThoughtStoreCallbackFn(records);		
			}
		});
      }
    });
  }
//  addWindow.hide();
  if(addWindow) addWindow.hide();
}

function todoSaveHandler()
{
//  console.log("saving");
  todoEditPanel.getForm().submit({
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
    }
  });
  todoEditWindow.hide();
}

function refSaveHandler()
{
  refEditPanel.getForm().submit({
    url: '/thoughts/'+selectedThoughtID+'.json',
    params: {
      id: selectedThoughtID
    },
    method: 'put',
    waitMsg: 'Saving...',
    success: function(f,a) {
      //referenceStore.reload();
	  globalThoughtStore.reload({callback : function(records,option,success){
				globalThoughtStoreCallbackFn(records);		
			}
		});
    }
  });
  refEditWindow.hide();
}

function remindSaveHandler()
{
  remindEditPanel.getForm().submit({
    url: '/thoughts/'+selectedThoughtID+'.json',
    params: {
      id: selectedThoughtID
    },
    method: 'put',
    waitMsg: 'Saving...',
    success: function(f,a) {
      //reminderStore.reload();
	  globalThoughtStore.reload({callback : function(records,option,success){
				globalThoughtStoreCallbackFn(records);		
			}
		});
    }
  });
  remindEditWindow.hide();
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
    xtype: 'combo',
    ref:'category',
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
      checked: 'true'
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public'
    }]
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
//      addWindow.hide();
      addWindow.hide();
    }
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
  items:[{
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
    ref:'../action_status',
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
      ref:'../due_date',
      name: 'due_date',
      format: 'c',
      editable: false
  },{
    xtype:'textarea',
    ref:'detail',
    fieldLabel:"Details",
    name:'detail',
    height: 80
  },{
    xtype: 'combo',
    ref:'category',
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

  },{
      xtype: 'combo',
      ref:'../context',
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
      })
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
      inputValue: 'private',
      checked: 'true'
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public'
    }]
  },{
    ref: 'status',
    name: 'status',
    hidden: true
  }],
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
      xtype: 'combo',
      ref:'../context',
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
      })

  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    name: 'scope',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'scope',
      inputValue: 'private',
      checked: 'true'
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public'
    }]
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
    fieldLabel:"Brief Thought",
    name:'brief',
    ref:'brief',
    allowBlank:false
  },{
      xtype: 'datefield',
      fieldLabel: 'Due Date',
      ref:'../due_date',
      name: 'due_date',
      format: 'c',
      editable: false
  },{
    xtype:'textarea',
    ref:'detail',
    fieldLabel:"More Details",
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
      checked: 'true'
    },{
      boxLabel: 'Public',
      name: 'scope',
      inputValue: 'public'
    }]
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
