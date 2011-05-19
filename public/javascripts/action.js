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

var todoStore = Ext.StoreMgr.get('todo_store');
todoStore.load();

var referenceStore = Ext.StoreMgr.get('reference_store');
referenceStore.load();

var reminderStore = Ext.StoreMgr.get('reminder_store');
reminderStore.load();

// manually load local data
//todoStore.loadData(todoData);
//referenceStore.loadData(referenceData);
//reminderStore.loadData(reminderData);
//
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

// create the Grid
var todoGrid = new Ext.grid.GridPanel({
  store: todoStore,
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
    dataIndex: 'due_date'
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
    dataIndex: 'action_status'
  },
  {
    xtype: 'actioncolumn',
    width: 50,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit To Do',
      handler: function(grid, rowIndex, colIndex) {
        if(!todoEditWindow) todoEditWindow = new Ext.Window({
          title: 'Edit Thought',
          closeAction:'hide',
          width: 380,
          height: 700,
          layout: 'fit',
          plain:true,
          bodyStyle:'padding:5px;',
          buttonAlign:'center',
          //resizable:false,
          items: todoEditPanel
        });
        else
          todoEditWindow.setTitle("Edit To Do");
        selectedThoughtID = todoStore.getAt(rowIndex).data.id;
        todoEditPanel.getForm().reset();
        todoEditPanel.getForm().load({
          url: '/thoughts/' + todoStore.getAt(rowIndex).data.id + '.json',
          params: {
            id: todoStore.getAt(rowIndex).data.id
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
        selectedThoughtID = todoStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope:this,
          params: {
            id: selectedThoughtID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            todoStore.reload();
          }
        });
      }
    }]
  }
  ],
  listeners: {
    rowclick: {
      fn: gridRowClickHandler
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

// create the Grid
var referenceGrid = new Ext.grid.GridPanel({
  store: referenceStore,
  columns: [
  {
    id       : 'ref_detail',
    header   : 'Detail',
    width    : 160,
    //    sortable : true,
    dataIndex: 'detail'
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
    xtype: 'actioncolumn',
    width: 50,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit To Do',
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
        selectedThoughtID = referenceStore.getAt(rowIndex).data.id;
        refEditPanel.getForm().reset();
        refEditPanel.getForm().load({
          url: '/thoughts/' + referenceStore.getAt(rowIndex).data.id + '.json',
          params: {
            id: referenceStore.getAt(rowIndex).data.id
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
        selectedThoughtID = referenceStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope:this,
          params: {
            id: selectedThoughtID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            referenceStore.reload();
          }
        });
      }
    }]
  }
  ],
  listeners: {
    rowclick: {
      fn: gridRowClickHandler
    }
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
  store: reminderStore,
  columns: [
  {
    id       : 'remind_details',
    header   : 'Detail',
    width    : 160,
    //    sortable : true,
    dataIndex: 'detail'
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
    xtype: 'actioncolumn',
    width: 50,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit To Do',
      handler: function(grid, rowIndex, colIndex) {
        if(!remindEditWindow) remindEditWindow = new Ext.Window({
          title: 'Edit Thought',
          closeAction:'hide',
          width: 380,
          height: 500,
          layout: 'fit',
          plain:true,
          bodyStyle:'padding:5px;',
          buttonAlign:'center',
          //resizable:false,
          items: remindEditPanel
        });
        else
          remindEditWindow.setTitle("Edit Reminder");
        selectedThoughtID = reminderStore.getAt(rowIndex).data.id;
        remindEditPanel.getForm().reset();
        remindEditPanel.getForm().load({
          url: '/thoughts/' + reminderStore.getAt(rowIndex).data.id + '.json',
          params: {
            id: reminderStore.getAt(rowIndex).data.id
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
        selectedThoughtID = reminderStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope:this,
          params: {
            id: selectedThoughtID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            reminderStore.reload();
          }
        });
      }
    }]
  }
  ],
  listeners: {
    rowclick: {
      fn: gridRowClickHandler
    }
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
  }]
});

