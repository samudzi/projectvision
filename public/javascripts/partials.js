var globalThoughtStore = Ext.StoreMgr.get('global_thought_store');

var inboxArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'brief', type: 'string'},
		   {name: 'detail', type: 'string'},     
           {name: 'category', type: 'string'}       
        ]
});
var organizeArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'brief', type: 'string'}, 
           {name: 'category', type: 'string'},
		   {name: 'actionable', type: 'string'}   
        ]
});
var todoArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'next', type: 'string'}, 
           {name: 'outcome', type: 'string'},
		   {name: 'due_date', type: 'string'},
		   {name: 'context', type: 'string'},
		   {name: 'action_status', type: 'string'}   
        ]
});
var Grid1Store = new Ext.data.JsonStore({
    root: 'users',
    fields: [ 'id', 'name', 'email' ],
    autoLoad: true,
    data: { users: [ 
      { "id": 1, "name":"John Smith", "email":"jsmith@example.com"},
      { "id": 2, "name":"Anna Smith", "email":"asmith@example.com"},
      { "id": 3, "name":"Peter Smith", "email":"psmith@example.com"},
      { "id": 4, "name":"Tom Smith", "email":"tsmith@example.com"},
      { "id": 5, "name":"Andy Smith", "email":"asmith@example.com"},
      { "id": 6, "name":"Nick Smith", "email":"nsmith@example.com"}
    ]}
  });
var referenceArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'detail', type: 'string'}, 
           {name: 'context', type: 'string'},		   
		   {name: 'scope', type: 'string'}   
        ]
});
var reminderArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'detail', type: 'string'}, 
           {name: 'context', type: 'string'},		   
		   {name: 'scope', type: 'string'}   
        ]
});
var upcomingArrayStore = new Ext.data.ArrayStore({
	 fields: [          
		   {name: 'id', type: 'int'},   
           {name: 'next', type: 'string'},           
           {name: 'due_date', type: 'date'}
        ]
});
function globalThoughtStoreCallbackFn(records){
	var inboxData = new Array();
		var organizeData = new Array();
		var todoData = new Array();
		var upcomingData = new Array();
		var rowCount=0;
		records.each(function(rec){
			var action_status = rec.get('action_status');
			var action_type = rec.get('action_type');
			var status = rec.get('status');
			rowCount++;
			if(status==0) // inbox store
			{
				var tempArray = new Array();			
				rec.fields.each(function(field) 
				{ 
					if(field.name=='id' || field.name=='brief' || field.name=='detail' || field.name=='category'){
						var fieldValue = rec.get(field.name);   
						tempArray.push(fieldValue);
					}
				});
				inboxData.push(tempArray);
			}	
			
			if(status==1) // organize store
			{
				var tempArray = new Array();			
				rec.fields.each(function(field) 
				{ 
					if(field.name=='id' || field.name=='brief' || field.name=='category' || field.name=='actionable'){
						var fieldValue = rec.get(field.name);   
						tempArray.push(fieldValue);
					}
				});
				organizeData.push(tempArray);
			}	
			
			if(status==2 && action_type=='1') // todo store
			{
				var tempJsonString="{todo:[";
				var fieldCount=0;	
				rec.fields.each(function(field) 
				{ 
					
					//if(field.name=='id' || field.name=='next' || field.name=='outcome' || field.name=='due_date' || field.name=='context' || field.name=='action_status'){
						
						var fieldValue = rec.get(field.name); 
						fieldCount++;
						if(fieldCount == 16)
							tempJsonString += "{"+field.name+":"+fieldValue+"";	
						else
							tempJsonString += "{"+field.name+":"+fieldValue+",";	
					//}
				});
				
				if(rowCount == records.length)
					//todoData.push(tempArray);
				else
					//todoData.push(tempArray);
			}	
			
			if(status==2 && action_type=='2') // reference store
			{
				var tempArray = new Array();			
				rec.fields.each(function(field) 
				{ 
					if(field.name=='id' || field.name=='detail' || field.name=='context' || field.name=='scope'){
						var fieldValue = rec.get(field.name);   
						tempArray.push(fieldValue);
					}
				});
				referenceData.push(tempArray);
			}	
			
			if(status==2 && action_type=='3') // reminder store
			{
				var tempArray = new Array();			
				rec.fields.each(function(field) 
				{ 
					if(field.name=='id' || field.name=='detail' || field.name=='context' || field.name=='due_date'){
						var fieldValue = rec.get(field.name);   
						tempArray.push(fieldValue);
					}
				});
				reminderData.push(tempArray);
			}	
			
			if(status==2 && action_status=='Pending' && action_type=='1') // upcoming store
			{
				var tempArray = new Array();			
				rec.fields.each(function(field) 
				{ 
					if(field.name=='id' || field.name=='next' || field.name=='due_date'){
						var fieldValue = rec.get(field.name);   
						tempArray.push(fieldValue);
					}
				});
				upcomingData.push(tempArray);
			}			
			
		});		// records.each
		inboxArrayStore.loadData(inboxData);
		organizeArrayStore.loadData(organizeData);
		todoArrayStore.loadData(todoData);
		referenceArrayStore.loadData(referenceData);
		reminderArrayStore.loadData(reminderData);
		upcomingArrayStore.loadData(upcomingData);
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
		globalThoughtStore.reload();
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
		globalThoughtStore.reload();
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
	  globalThoughtStore.reload();
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
	  globalThoughtStore.reload();
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
	  globalThoughtStore.reload();
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