var globalThoughtStore = Ext.StoreMgr.get('global_thought_store');

/*var fieldsArray = ['id', 'brief', 'detail', 'category', 'type', 'status', 'actionable', 'context', 'next', 'outcome', 'action_status', 'due_date', 'action_type', 'scope'];*/
var fieldsArray = [ 
		{name: 'id', type: 'int'},   
		{name: 'brief', type: 'string'},  
		{name: 'detail', type: 'string'},  
		{name: 'category', type: 'string'},  
		{name: 'type', type: 'string'},  
		{name: 'status', type: 'string'}, 
		{name: 'actionable', type: 'string'}, 
		{name: 'context', type: 'string'}, 
		{name: 'next', type: 'string'}, 
		{name: 'outcome', type: 'string'}, 
		{name: 'action_status', type: 'string'},
		{name: 'due_date', type: 'date'},
		{name: 'action_type', type: 'string'},
		{name: 'scope', type: 'string'}   
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

/*var todoStatusComboStore = new Ext.data.JsonStore({
	root: 'actionstatus',
	fields: ['value', 'action_status']
});*/

function globalThoughtStoreCallbackFn(records){
	
		var tempJsonInbox = new Array();
		var finalJsonInbox = [];	
		var tempJsonOrganize = new Array();
		var finalJsonOrganize = [];		
		var tempJsonTodo = new Array();
		var finalJsonTodo = [];		
		var tempJsonReference = new Array();
		var finalJsonReference = [];		
		var tempJsonReminder = new Array();
		var finalJsonReminder = [];			
		var tempJsonUpcoming = new Array();
		var finalJsonUpcoming = [];	
		var tempJsonRecentCompleted = new Array();
		var finalJsonRecentCompleted = [];
		/*var todoStatusComboStoreData = new Array();
		var todoStatusComboStoreTemp = new Array();*/
		records.each(function(rec){
			var action_status = rec.get('action_status');
			var action_type = rec.get('action_type');
			var status = rec.get('status');
			
			/*todoStatusComboStoreTemp['value'] = action_status;
			todoStatusComboStoreTemp['action_status'] = action_status;*/
			
			if(status==0) // inbox store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonInbox.push(tempArray);	
			}	
			
			if(status==1) // organize store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonOrganize.push(tempArray);	
			}	
			
			if(status==2 && action_type=='1') // todo store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonTodo.push(tempArray);						
			}	
			
			if(status==2 && action_type=='2') // reference store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonReference.push(tempArray);
			}	
			
			if(status==2 && action_type=='3') // reminder store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonReminder.push(tempArray);
			}	
			
			if(status==2 && action_status=='Pending' && action_type=='1') // upcoming store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonUpcoming.push(tempArray);
			}	
			
			if(status==2 && action_status=='Completed' && action_type=='1') // recentCompleted store
			{
				var tempArray = [];
				rec.fields.each(function(field) 
				{ 
					var fieldValue = rec.get(field.name); 
					tempArray[field.name] = fieldValue;
					
				});				
				tempJsonRecentCompleted.push(tempArray);
			}		
			
		});		// records.each
		/*todoStatusComboStoreData["actionstatus"] = todoStatusComboStoreTemp;
		todoStatusComboStore.loadData(todoStatusComboStoreData,false); */
		finalJsonInbox["inbox"] = tempJsonInbox;
		inboxJsonStore.loadData(finalJsonInbox,false);
		finalJsonOrganize["organize"] = tempJsonOrganize;
		organizeJsonStore.loadData(finalJsonOrganize,false);
		finalJsonTodo["todo"] = tempJsonTodo;
		todoJsonStore.loadData(finalJsonTodo,false);
		finalJsonReference["reference"] = tempJsonReference;
		referenceJsonStore.loadData(finalJsonReference,false);
		finalJsonReminder["reminder"] = tempJsonReminder;
		reminderJsonStore.loadData(finalJsonReminder,false);		
		finalJsonUpcoming["upcoming"] = tempJsonUpcoming;
		upcomingJsonStore.loadData(finalJsonUpcoming,false);
		finalJsonRecentCompleted["recent_completed"] = tempJsonRecentCompleted;
		recentCompletedJsonStore.loadData(finalJsonRecentCompleted,false);
				
}  // globalThoughtStoreCallbackFn


globalThoughtStore.load({callback : function(records,option,success){
		globalThoughtStoreCallbackFn(records);		
	}
});  // globalThoughtStore.load
/*globalThoughtStore.reload({callback : function(records,option,success){
		globalThoughtStoreCallbackFn(records);		
	}
});*/
//// grid.getView().refresh();

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
  addWindow.hide();
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
    name:'thought[brief]',
    ref:'brief',
    allowBlank:false
  },{
    xtype: 'combo',
    ref:'category',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Category',
    name: 'thought[category]',
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
    name:'thought[detail]',
    height: 200
  },{
    xtype: 'radiogroup',
    fieldLabel: 'Type',
    ref: 'thoughtType',
    items: [{
      boxLabel: 'Private',
      name: 'thought[scope]',
      inputValue: 'private',
      checked: 'true'
    },{
      boxLabel: 'Public',
      name: 'thought[scope]',
      inputValue: 'public'
    }]
  },{
    ref: 'status',
    name: 'thought[status]',
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
