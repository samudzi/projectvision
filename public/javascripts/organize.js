//Javascript for organize Tab
var currentOrganizeIndex = 0;
//var organizeStore = Ext.StoreMgr.get('organize_store');
var selectedOrganizeID = 0;
//organizeStore.load();

function organizeGridRowClickHandler(addrGrid,rowIndex,e) {
	currentOrganizeIndex = rowIndex;
	selectedOrganizeID = organizeJsonStore.getAt(rowIndex).data.id;
	organizeDetailsPanel.getForm().reset();
    addCatagoryOptions();
   


    Ext.get('ext-comp-1128').setStyle('top', '465px');
	/*organizeDetailsPanel.getForm().load({
		url: '/thoughts/' + organizeJsonStore.getAt(rowIndex).data.id + '.json',
		params: {
		  id: organizeJsonStore.getAt(rowIndex).data.id
		},
		waitMsg: 'Loading...',
		method: 'get',
		success: function(f,a){
		
		}
	});*/
	if(organizeJsonStore.getAt(rowIndex).data.actionable == true)
	organizeDetailsPanel.todo_options.show();
	organizeDetailsPanel.enable();
}

// create the Grid
var organizeGrid = new Ext.grid.GridPanel({
  store: organizeJsonStore,
  columns: [
  {
    id       :'brief',
    header   : 'Thought',
    width    : 160,
    //    sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Category',
    width    : 75,
    //    sortable : true,
    dataIndex: 'category'
  },
  {
    header: 'Delete',
    xtype: 'actioncolumn',
    width: 50,
    items: [
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {        
        selectedThoughtID = organizeJsonStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope:this,
          params: {
            id: selectedThoughtID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            //organizeStore.reload();
			globalThoughtStore.reload({callback : function(records,option,success){					
						globalThoughtStoreCallbackFn(records);		
					}
				});
            organizeDetailsPanel.disable();
          }
        });
      }
    }]
  }
  ],
  listeners: {
    rowclick: {
      fn: organizeGridRowClickHandler
    }
  },
  region:'center',
  stripeRows: true,
  autoExpandColumn: 'brief',
  height: 300,
  width: 600,
  //  title: 'Array Grid',
  // config options for stateful behavior
  stateful: true,
  stateId: 'grid'
});

var organizeDetailsPanel = new Ext.FormPanel({
  //  title: 'Details',
//  title: 'Thoughts Detail',
  region: 'south',
  ref: 'organizeDetailsPanel',
  layout: 'border',
//  collapsible: 'true',
  height: 220,
  labelAlign: 'top',
  disabled: true,
  //  minSize: 75,
  //  maxSize: 250,
  items : [{
    title: 'Organization',
    layout: 'form',
    defaultType: 'textfield',
    width: 300,
    defaults: {
      width: 100
    },
    region: 'west',
    items: [{
      xtype: 'radiogroup',
      fieldLabel: 'Is this thought actionable?',
      name: 'thought[actionable]',
      ref: '../actionable',
      items: [{
        boxLabel: 'Yes',
        name: 'thought[actionable]',
        inputValue: 'true',
        listeners: {
          check : function(){
            if(this.getValue() == true)
            {
              organizeDetailsPanel.todo_options.show();
              organizeDetailsPanel.todo_options.next.allowBlank = false;
              organizeDetailsPanel.todo_options.outcome.allowBlank = false;
            }
            else
            {
              organizeDetailsPanel.todo_options.hide();
              organizeDetailsPanel.todo_options.next.allowBlank = true;
              organizeDetailsPanel.todo_options.outcome.allowBlank = true;
            }
          }
        }
      },{
        boxLabel: 'No',
        name: 'thought[actionable]',
        inputValue: 'false',
        checked: 'true'
      }]
    },{
       xtype: 'combo',
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      name:'context',
      ref: 'context',
      id:  'context',      
      fieldLabel: 'context',
      triggerAction: 'all',
      store: contextOptions,
      displayField: 'catagory_name',
      valueField: 'catagory_name',
      emptyText: 'Select context'

    },{
      xtype: 'datefield',
      fieldLabel: 'Due Date',
      ref:'../due_date',
      name: 'thought[due_date]',
      format: 'Y/m/d',
      editable: false
    }]
  },
  {
    title: 'To-Do Options',
    region: 'center',
    ref: 'todo_options',
    layout: 'form',
    hidden: true,
    defaultType: 'textfield',
    width: 200,
    defaults: {
      width: 350
    },
    items: [{
      fieldLabel:"What needs to happen next?",
      name:'thought[next]',
      ref:'next'
    },{
      fieldLabel:"Briefly, descript the successful outcome",
      name:'thought[outcome]',
      ref:'outcome'
    },{
      xtype: 'combo',
      ref:'../action_status',
      mode: 'local',
      typeAhead: true,
      forceSelection: true,
      fieldLabel: 'Action Status',
      name: 'thought[action_status]',
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

    }]
  }
  ],
    bbar: [
    //      {
    //        text: 'Process Thought',
    //        handler: function(){
    //          console.log(organizeDetailsPanel.actionable.getValue());
    //          organizeData[currentOrganizeIndex][5] = organizeDetailsPanel.actionable.getValue().inputValue;
    //          organizeData[currentOrganizeIndex][6] = organizeDetailsPanel.context.getValue();
    //          organizeData[currentOrganizeIndex][7] = organizeDetailsPanel.next.getValue();
    //          organizeData[currentOrganizeIndex][8] = organizeDetailsPanel.outcome.getValue();
    //          organizeData[currentOrganizeIndex][9] = organizeDetailsPanel.action_status.getValue();
    //          organizeData[currentOrganizeIndex][10] = organizeDetailsPanel.due_date.getValue();
    //          organizeStore.loadData(organizeData);
    //        }
    //    },{
    {
      text: 'To Do',
      handler: function(){
        if(selectedOrganizeID != 0)
          organizeDetailsPanel.getForm().submit({
            url: '/thoughts/'+selectedOrganizeID+'.json',
            params: {
              id: selectedOrganizeID,
              "thought[status]": "2",
              "thought[action_type]": "1"
            },
            method: 'put',
            waitMsg: 'Saving...',
            success: function(f,a) {
				organizeDetailsPanel.getForm().reset();
				organizeDetailsPanel.disable();
              //organizeStore.reload();
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
    },'|',{
      text: 'Reference',
      handler: function(){
        if(selectedOrganizeID != 0)
        organizeDetailsPanel.getForm().submit({
          url: '/thoughts/'+selectedOrganizeID+'.json',
          params: {
            id: selectedOrganizeID,
            "thought[status]": "2",
            "thought[action_type]": "2"
          },
          method: 'put',
          waitMsg: 'Saving...',
          success: function(f,a) {
			      organizeDetailsPanel.getForm().reset();
			      organizeDetailsPanel.disable();
            //organizeStore.reload();
            //referenceStore.reload();
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
    },'|',{
      text: 'Reminder',
      handler: function(){
        if(selectedOrganizeID != 0)
        organizeDetailsPanel.getForm().submit({
          url: '/thoughts/'+selectedOrganizeID+'.json',
          params: {
            id: selectedOrganizeID,
            "thought[status]": "2",
            "thought[action_type]": "3"
          },
          method: 'put',
          waitMsg: 'Saving...',
          success: function(f,a) {
				    organizeDetailsPanel.getForm().reset();
				    organizeDetailsPanel.disable();
             // organizeStore.reload();
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
          }
        });
      }
    }]
//  cmargins: '5 0 0 0',
//  html: '<p>Select a Thought</p>'
});

var organizePanel = new Ext.Panel({
  title: 'Organize',
  layout: 'border',
  items: [organizeGrid,organizeDetailsPanel],
  listeners:{
    activate: function(){
		  if(addWindow) addWindow.hide();
		  if(todoEditWindow) todoEditWindow.hide();
		  if(refEditWindow) refEditWindow.hide();
		  if(remindEditWindow) remindEditWindow.hide();	
    }
  }
});
