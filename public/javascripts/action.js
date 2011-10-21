//Javascript for Inbox Tab

var todoData = [
['Needs some food','McDonals?','General','public','0','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
['Should I add a textbox?','Into the main Panel','General','public','0','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
['Another thing on Friday','Beer','General','public','0','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
];

var referenceData = [
['Needs some food','McDonals?','General','public','Private','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
['Should I add a textbox?','Into the main Panel','General','public','Public','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
['Another thing on Friday','Beer','General','public','Public','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
];

var reminderData = [
['Needs some food','McDonals?','General','public','0','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
['Should I add a textbox?','Into the main Panel','General','public','0','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
['Another thing on Friday','Beer','General','public','0','true','Agricultural','Farm','Food','Active','01/01/2011','todo'],
];

//var todoEditPanel = new Ext.form.FormPanel({
//  labelWidth:80,
//  labelAlign: 'top',
//  baseCls: 'x-plan',
//  defaultType:'textfield',
//  ref:'addPanel',
//  defaults: {
//    width: 350
//  },
//  items:[{
//    fieldLabel:"Briefly, what's on your mind?",
//    name:'brief',
//    ref:'brief',
//    id:'brief',
//    allowBlank:false
//  },{
//    xtype: 'combo',
//    ref:'category',
//    id:'category',
//    mode: 'local',
//    typeAhead: true,
//    forceSelection: true,
//    fieldLabel: 'Category',
//    name: 'category',
//    triggerAction: 'all',
//    displayField: 'name',
//    valueField: 'value',
//    emptyText: 'Select Category',
//    store: new Ext.data.SimpleStore({
//      fields: ['name','value'],
//      data: [
//      ['General','General'],
//      ['To Do','To Do'],
//      ['Reference','Reference']
//      ]
//    }),
//    value: 'General'
//
//  },{
//    xtype:'textarea',
//    ref:'detail',
//    id:'detail',
//    fieldLabel:"More Details",
//    name:'details',
//    height: 200
//  },{
//    xtype: 'radiogroup',
//    fieldLabel: 'Type',
//    name: 'type',
//    ref: 'thoughtType',
//    items: [{
//      boxLabel: 'Private',
//      name: 'type',
//      inputValue: 'private',
//      checked: 'true'
//    },{
//      boxLabel: 'Public',
//      name: 'type',
//      inputValue: 'public'
//    }]
//  }],
//  buttons:[{
//    text: "Update",
//    formBind: true,
//    handler:function(){
//      if(addWindow.title != "Edit Thought")
//      {
//        myData[myData.length] = new Array(addPanel.brief.getValue(),addPanel.detail.getValue(),addPanel.category.getValue(),addPanel.thoughtType.getValue().inputValue,'0',null,null,null,null,null,null,null);
//        thoughtStore.loadData(myData);
//        todoEditWindow.hide();
//      }
//      else
//      {
//        myData[currentIndex] = new Array(addPanel.brief.getValue(),addPanel.detail.getValue(),addPanel.category.getValue(),addPanel.thoughtType.getValue().inputValue,'0',null,null,null,null,null,null,null);
//        thoughtStore.loadData(myData);
//        todoEditWindow.hide();
//      }
//    }
//  },{
//    text: 'Close',
//    handler: function(){
//      todoEditWindow.hide();
//    }
//  }]
//
//});

//var rowIndexArray = new Array();
// create the Grid
var todoGrid = new Ext.grid.EditorGridPanel({
  store: todoJsonStore,
  frame: true,
  tbar:[{
		text:'Save Record',
		tooltip:'Update the row',
		//iconCls:'edit',
		handler:function(){
			//var todoStore_temp = todoGrid.getStore();
		}
  }],
  /*selectionchange : function (sm) {
		todoGrid.stopEditing();
		todoGrid.store.save();
  },*/
  columns: [
  {
    id       :'brief',
    header   : 'Next Action',
    width    : 160,
    //    sortable : true,
    dataIndex: 'next'
  },
  {
    header   : 'Outcome',
    width    : 75,
    //    sortable : true,
    dataIndex: 'outcome'
  },
  {
    header   : 'Due Date',
    width    : 75,
    //    sortable : true,
    dataIndex: 'due_date',
	renderer: function(date) { if(date) return date.format("d-m-y"); }
  },
  {
    header   : 'Context',
    width    : 75,
    //    sortable : true,
    dataIndex: 'context'
  },
  {
    header   : 'Status',
    width    : 75,
    //    sortable : true,
    dataIndex: 'action_status',	
	editor: new Ext.form.ComboBox({
	   /*typeAhead: true,
	    triggerAction: 'all',
	    transform:'action_status',
	    lazyRender: true,
	    listClass: 'x-combo-list-small'*/
	    store: todoStatusComboStore,
		mode: 'local',
		displayField:'action_status',
		valueField: 'action_status',		
		typeAhead: false,
		triggerAction: 'all',
		lazyRender: true,
		emptyText: 'Select status',
		listeners: {
		  select: function(){
		    Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope: todoGrid,
          params: {
            action_status: this.value 
          },
          waitMsg:'Updating...',
          method: 'put',
          success: function(f,a){
            //todoStore.reload();
			      globalThoughtStore.reload({callback : function(records,option,success){
					    globalThoughtStoreCallbackFn(records);		
				    }});
				  }
				});
		  }
		}

	})
  },
  {
    header: 'Edit : Delete',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit To Do',
      handler: function(grid, rowIndex, colIndex) {
      newTask=false;
        if(!todoEditWindow) todoEditWindow = new Ext.Window({
          title: 'Edit To do',
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
        selectedThoughtID = todoJsonStore.getAt(rowIndex).data.id;
      
        todoEditPanel.getForm().reset();
        todoEditPanel.thoughtType.setValue('public').setVisible(false);
        todoEditPanel.status.setValue(2); 
        //todoEditPanel.team.setValue(tabTeamId); 
        todoEditPanel.team.setVisible(true);
       // todoEditPanel.action_type.setValue(1);  
        todoEditPanel.actionable.setValue('t');  
       // todoEditPanel.action_status.setValue('Active');
        //todoEditPanel.action_status.setVisible(false);  
        todoEditPanel.getForm().load({
          url: '/thoughts/' + todoJsonStore.getAt(rowIndex).data.id + '.json',
          params: {
            id: todoJsonStore.getAt(rowIndex).data.id
          },
          waitMsg: 'Loading...',
          method: 'get',
          success: function(f,a){

          }
        });

        todoEditWindow.show();
      }
    },
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {
		 
		  selectedThoughtID = todoJsonStore.getAt(rowIndex).data.id;
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
          }
        });
      }
    }]
  }
  ],
  clicksToEdit: 1,
  viewConfig: {
    //forceFit: true,
    //showPreview: true, // custom property
    //enableRowBody: true, // required to create a second, full-width row to show expanded Record data
    getRowClass: function(record, rowIndex, rp, store){ // rp = rowParams
		var due_date = record.data.due_date;
		var completed = record.data.action_status;
		
		due_date = due_date.format("d-m-y");		
		var now = new Date();
		var today = now.format("d-m-y");
		console.log(completed);	
		if(completed == 'Completed')
		{			
			 return 'x-grid3-row-grey';			
		}		
       if(due_date < today){          
          return 'x-grid3-row-red';
       }
       //return 'x-grid3-row-collapsed';		
    }
  },
  listeners: {
		viewready : function(grid){				
			/*for(var i=0;i<rowIndexArray.length;i++)
			{
		  		Ext.fly(grid.getView().getRow(rowIndexArray[i])).addClass('x-grid3-row-red');	
			}*/
    	},
    cellclick: function(grid, rowIndex, columnIndex, e) {
        selectedThoughtID = todoJsonStore.getAt(rowIndex).data.id;
    }
  },
  region:'center',
  stripeRows: true,
  autoExpandColumn: 'brief',
  height: 350,
  width: 600,
  //  title: 'Array Grid',
  // config options for stateful behavior
  stateful: true,
  stateId: 'grid'
});
/*todoJsonStore.on('load', function(){
	 var todoview = todoGrid.getView();		
	 todoview.refresh();
});*/

// create the Grid
var referenceGrid = new Ext.grid.GridPanel({
  store: referenceJsonStore,
  columns: [
  {
    id       : 'ref_detail',
    header   : 'Brief',
    width    : 160,
    //    sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Context',
    width    : 75,
    //    sortable : true,
    dataIndex: 'context'
  },
  {
    header   : 'Scope',
    width    : 75,
    //    sortable : true,
    dataIndex: 'scope'
  },
  {
    header: 'Edit : Delete',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit Reference',
      handler: function(grid, rowIndex, colIndex) {
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
        selectedThoughtID = referenceJsonStore.getAt(rowIndex).data.id;
        refEditPanel.getForm().reset();
        refEditPanel.action_type.setVisible(false); 
        refEditPanel.getForm().load({
          url: '/thoughts/' + referenceJsonStore.getAt(rowIndex).data.id + '.json',
          params: {
            id: referenceJsonStore.getAt(rowIndex).data.id
          },
          waitMsg: 'Loading...',
          method: 'get',
          success: function(f,a){

          }
        });

        refEditWindow.show();
      }
    },
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedThoughtID = referenceJsonStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope:this,
          params: {
            id: selectedThoughtID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            //referenceStore.reload();
			globalThoughtStore.reload({callback : function(records,option,success){
					globalThoughtStoreCallbackFn(records);		
				}
			});
			
          }
        });
      }
    }]
  }
  ],
  listeners: {
    //rowclick: {
      //fn: gridRowClickHandler
    //}
  },
  region:'center',
  stripeRows: true,
  autoExpandColumn: 'ref_detail',
  height: 350,
  width: 600,
  //  title: 'Array Grid',
  // config options for stateful behavior
  stateful: true,
  stateId: 'grid2'
});

// create the Grid
var reminderGrid = new Ext.grid.GridPanel({
  store: reminderJsonStore,
  columns: [
  {
    id       : 'remind_details',
    header   : 'Brief',
    width    : 160,
    //    sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Context',
    width    : 75,
    //    sortable : true,
    dataIndex: 'context'
  },
  {
    header   : 'Due Date',
    width    : 75,
    //    sortable : true,
    dataIndex: 'due_date'
  },
  {
    header   : 'Creation Date',
    width    : 75,
    //    sortable : true,
    dataIndex: 'due_date'
  },
  {
    header: 'Edit : Delete',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit To Do',
      handler: function(grid, rowIndex, colIndex) {
        if(!remindEditWindow) remindEditWindow = new Ext.Window({
          title: 'Edit Reminder',
          closeAction:'hide',
          width: 380,
          height: 550,
          layout: 'fit',
          plain:true,
          bodyStyle:'padding:5px;',
          buttonAlign:'center',
          //resizable:false,
          items: remindEditPanel
        });
        else
          remindEditWindow.setTitle("Edit Reminder");
        selectedThoughtID = reminderJsonStore.getAt(rowIndex).data.id;
        remindEditPanel.getForm().reset();
        remindEditPanel.action_type.setVisible(false); 
        remindEditPanel.getForm().load({
          url: '/thoughts/' + reminderJsonStore.getAt(rowIndex).data.id + '.json',
          params: {
            id: reminderJsonStore.getAt(rowIndex).data.id
          },
          waitMsg: 'Loading...',
          method: 'get',
          success: function(f,a){

          }
        });

        remindEditWindow.show();
      }
    },
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedThoughtID = reminderJsonStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope: this,
          params: {
            id: selectedThoughtID
          },
          waitMsg: 'Deleting...',
          method: 'delete',
          success: function(f,a){
            //reminderStore.reload();
			globalThoughtStore.reload({callback : function(records,option,success){
					globalThoughtStoreCallbackFn(records);		
				}
			});
			
          }
        });
      }
    }]
  }
  ],
  listeners: {
    //rowclick: {
     // fn: gridRowClickHandler
    //}
  },
    viewConfig: {
        forceFit: true,

//      Return CSS class to apply to rows depending upon data values
        getRowClass: function(record, index) {
            var c = record.get('due_date');
            var datenow = new Date()
            if (c < datenow.getUTCDate()) {
                return 'overdue';
            } else {
                return 'notdue';
            }
        }
    },
  region:'center',
  stripeRows: true,
  autoExpandColumn: 'remind_details',
  height: 350,
  width: 600,
  //  title: 'Array Grid',
  // config options for stateful behavior
  stateful: true,
  stateId: 'grid3'
});

var button1 = new Ext.Button();
var button2 = new Ext.Button();

var actionPanel = new Ext.TabPanel({
  title: 'Actions',
  xtype: 'tabpanel',
  ref:'actions',
  height: 350,
  activeTab: 0,
  plain:true,
  defaults:{
    autoScroll: true
  },
  items:[{
    title: 'To-Dos',
    ref:'todos_tab',
    layout: 'border',
//    items: button1
    items: [todoGrid]
  },{
    title: 'Reference',
    ref:'references_tab',
    layout: 'border',
    items: [referenceGrid]
  },{
    title: 'Reminders',
    ref:'reminders_tabs',
    layout: 'border',
    items: [reminderGrid]
  }],
  listeners: {
          activate: function(tab){
				if(addWindow) addWindow.hide();
				if(todoEditWindow) todoEditWindow.hide();
				if(refEditWindow) refEditWindow.hide();
				if(remindEditWindow) remindEditWindow.hide();	
		  }
  }
});





/*var combotest = new Ext.form.ComboBox({	   
	   name: 'combotest',
	    store: todoStatusComboStore,
		displayField:'action_status',
		valueField: 'action_status',		
		typeAhead: false,
		triggerAction: 'all',
		lazyRender: true,
		emptyText: 'Select status',
		renderTo: 'combotest'

	});*/
