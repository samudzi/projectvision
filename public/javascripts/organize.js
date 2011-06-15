//Javascript for organize Tab
var currentOrganizeIndex = 0;
var organizeStore = Ext.StoreMgr.get('organize_store');
var selectedOrganizeID = 0;
organizeStore.load();


function organizeGridRowClickHandler(addrGrid,rowIndex,e) {
  currentOrganizeIndex = rowIndex;
  selectedOrganizeID = organizeStore.getAt(rowIndex).data.id;
  organizeDetailsPanel.getForm().reset();
  organizeDetailsPanel.getForm().load({
    url: '/thoughts/' + organizeStore.getAt(rowIndex).data.id + '.json',
    params: {
      id: organizeStore.getAt(rowIndex).data.id
    },
    waitMsg: 'Loading...',
    method: 'get',
    success: function(f,a){

    }
  });
  if(organizeStore.getAt(rowIndex).data.actionable == true)
    organizeDetailsPanel.todo_options.show();
  organizeDetailsPanel.enable();

}

// create the Grid
var organizeGrid = new Ext.grid.GridPanel({
  store: organizeStore,
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
    xtype: 'actioncolumn',
    width: 50,
    items: [
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {        
        selectedThoughtID = organizeStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
          scope:this,
          params: {
            id: selectedThoughtID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            organizeStore.reload();
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
  height: 350,
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
  height: 250,
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
      name: 'actionable',
      ref: '../actionable',
      items: [{
        boxLabel: 'Yes',
        name: 'actionable',
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
        name: 'actionable',
        inputValue: 'false',
        checked: 'true'
      }]
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
      }),
      value: 'Context1'

    },{
      xtype: 'datefield',
      fieldLabel: 'Due Date',
      ref:'../due_date',
      name: 'due_date',
      format: 'd/m/Y',
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
      name:'next',
      ref:'next'
    },{
      fieldLabel:"Briefly, descript the successful outcome",
      name:'outcome',
      ref:'outcome'
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
              status: 2,
              action_type: 1
            },
            method: 'put',
            waitMsg: 'Saving...',
            success: function(f,a) {
              organizeStore.reload();
              todoStore.reload();
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
              status: 2,
              action_type: 2
            },
            method: 'put',
            waitMsg: 'Saving...',
            success: function(f,a) {
              organizeStore.reload();
              referenceStore.reload();
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
              status: 2,
              action_type: 3
            },
            method: 'put',
            waitMsg: 'Saving...',
            success: function(f,a) {
              organizeStore.reload();
              reminderStore.reload();
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
  items: [organizeGrid,organizeDetailsPanel]
});