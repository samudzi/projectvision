//Javascript for Inbox Tab


/*var inboxStore = Ext.StoreMgr.get('inbox_store');
inboxStore.load({
  params: {
    status: 0
  }
});
*/
var newThought = false;
var selectedThoughtID = 0;

var myData = [
['Needs some food','McDonals?','General','public','0',null,null,null,null,null,null,null],
['Should I add a textbox?','Into the main Panel','General','public','0',null,null,null,null,null,null,null],
['Another thing on Friday','Beer','General','public','0',null,null,null,null,null,null,null]
];

// create the data store
var thoughtStore = new Ext.data.ArrayStore({
  fields: [
  {
    name: 'brief'
  },{
    name: 'detail'
  },{
    name: 'category'
  },{
    name: 'scope'
  },{
    name: 'status'
  },{
    name: 'actionable'
  },{
    name: 'context'
  },{
    name: 'next'
  },{
    name: 'outcome'
  },{
    name: 'action_status'
  },{
    name: 'due_date'
  },{
    name: 'action_type'
  }]
});

// manually load local data
thoughtStore.loadData(myData);



function newHandler(){
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
  addPanel.category.setValue('General');
  addPanel.thoughtType.setValue('private');
  addPanel.status.setValue(0);
  addPanel.getForm().findField('team').setVisible(false);
  addWindow.show();
  addUserAndTeamSelectOptions();
  
}

function deleteHandler(){

}

function gridRowClickHandler(addrGrid,rowIndex,e) {
  detailsPanel.update(inboxJsonStore.getAt(rowIndex).get('detail'));
}


// create the Grid
var thoughtGrid = new Ext.grid.GridPanel({
  store: inboxJsonStore,
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
    header: 'Edit : Delete',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit Thought',
      handler: function(grid, rowIndex, colIndex) {
        //        currentIndex = rowIndex;
        //        var data = myData[rowIndex];
        //        if(!addWindow) addWindow = new Ext.Window({
        //          title: 'Edit Thought',
        //          closeAction:'hide',
        //          width: 380,
        //          height: 500,
        //          layout: 'fit',
        //          plain:true,
        //          bodyStyle:'padding:5px;',
        //          buttonAlign:'center',
        //          //resizable:false,
        //          items: addPanel
        //        });
        //        else
        //          addWindow.setTitle("Edit Thought");
        //
        //        addPanel.getForm().reset();
        //        addPanel.brief.setValue(data[0]);
        //        addPanel.detail.setValue(data[1]);
        //        addPanel.category.setValue(data[2]);
        //        addPanel.thoughtType.setValue(data[3]);
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
        
        selectedThoughtID = inboxJsonStore.getAt(rowIndex).data.id;
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
        addUserAndTeamSelectOptions();
        addWindow.show();
        addPanel.brief.focus();
      }
    },
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedThoughtID = inboxJsonStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/thoughts/'+selectedThoughtID,
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
          }
        });
      //        myData.splice(rowIndex,1);
      //        thoughtStore.loadData(myData);
      }
    }]
  },
  {
    header: 'Organize',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon : '../images/icons/bell.png',
      tooltip : 'Move to Organized',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedThoughtID = inboxJsonStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
			  url: '/thoughts/'+selectedThoughtID+'.json',
			  params: {
				id: selectedThoughtID,
				"thought[status]": "1"
			  },
			  method: 'put',
			  waitMsg: 'Saving...',
			  success: function(f,a) {
				globalThoughtStore.reload({callback : function(records,option,success){					
							globalThoughtStoreCallbackFn(records);}
					  });
				//organizeStore.reload();
			  }
        });
      //        Ext.Ajax.request({
      //          url: '/thoughts/update_status/'+selectedThoughtID,
      //          scope:this,
      //          params: {
      //            id: selectedThoughtID,
      //            status: 1
      //          },
      //          waitMsg:'Moving...',
      //          method: 'put',
      //          success: function(f,a){
      //            inboxStore.reload();
      //            organizeStore.reload();
      //          }
      //        });
      }
    }]
  },
  ],
  tbar: [
  {
    text: 'New Thought',
    iconCls: 'add-prop',
    handler: newHandler
  }],
  listeners: {
    rowclick: {
      fn: gridRowClickHandler
    }
  },
  region:'center',
  stripeRows: true,
  autoExpandColumn: 'brief',
  height: 400,
  width: 600,
  //  title: 'Array Grid',
  // config options for stateful behavior
  stateful: true,
  stateId: 'grid'
});

var detailsPanel = new Ext.Panel({
  title: 'Details',
  region: 'south',
  ref: 'detailsPanel',
  height: 200,
  minSize: 75,
  maxSize: 250,
  cmargins: '5 0 0 0',
  html: '<p>Select a Thought</p>'
});
//loop , array

var inboxPanel = new Ext.TabPanel({
  title: 'Inbox',
  xtype: 'tabpanel',
  ref:'inbox',
  activeTab: 0,
  plain:true,
  defaults:{
    autoScroll: true
  },
  items:[{
    title: 'My Space',
    ref:'myspace',
    layout: 'border',
    items: [thoughtGrid,detailsPanel]
  }
  ],
  listeners: {
          activate: function(tab){
				    if(addWindow) addWindow.hide();
				    if(todoEditWindow) todoEditWindow.hide();
				    if(refEditWindow) refEditWindow.hide();
				    if(remindEditWindow) remindEditWindow.hide();				
		      }
  }
});

