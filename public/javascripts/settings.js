//Javascript for Inbox Tab


/*var inboxStore = Ext.StoreMgr.get('inbox_store');
inboxStore.load({
  params: {
    status: 0
  }
});
*/
var newEmail = false;

function newEmailHandler(){
  newEmail = true;
  if(!addEmailWindow) addEmailWindow = new Ext.Window({
    title: 'Add New Email',
    width: 380,
    applyTo:'hello-win',
    closeAction:'hide',
    height: 320,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: addEmailPanel
  });
  else
    addEmailWindow.setTitle('Add New Email');

  console.log("new");
  addEmailPanel.getForm().reset();
  addEmailPanel.email.setValue('');
  addEmailPanel.password.setValue('');
  addEmailPanel.server.setValue('imap.gmail.com');
  addEmailPanel.port.setValue('993');
  addEmailPanel.ssl.checked = false;
  addEmailWindow.show();
  
}

function deleteHandler(){

}


// create the Grid
var emailsGrid = new Ext.grid.GridPanel({
  store: emailJsonStore,
  columns: [
  {
    id       :'email',
    header   : 'Email',
    width    : 160,
    //    sortable : true,
    dataIndex: 'email'
  },{
    header   : 'Server',
    width    : 75,
    //    sortable : true,
    dataIndex: 'server'
  },{
    header   : 'Port',
    width    : 75,
    //    sortable : true,
    dataIndex: 'port'
  },{
    header: 'Edit : Delete',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit Email',
      handler: function(grid, rowIndex, colIndex) {
      selectedUserID = emailJsonStore.getAt(rowIndex).data.user_id;
      
        if(is_admin == true || currentUser == selectedUserID){
          if(!addEmailWindow) addEmailWindow = new Ext.Window({
            title: 'Edit Email',
            width: 380,
            applyTo:'hello-win',
            closeAction:'hide',
            height: 500,
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
            //resizable:false,
            items: addEmailPanel
          });
          else
            addEmailPanel.setTitle('Edit Email');                  
          selectedThoughtID = emailJsonStore.getAt(rowIndex).data.id;
          console.log("selcted id");      
          addEmailPanel.getForm().reset();         
          addEmailPanel.getForm().load({
            url: '/imap_addresses/' + emailJsonStore.getAt(rowIndex).data.id + '.json',
            params: {
              id: emailJsonStore.getAt(rowIndex).data.id
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
      tooltip: 'Delete Email',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedThoughtID = emailJsonStore.getAt(rowIndex).data.id;
        selectedUserID = emailJsonStore.getAt(rowIndex).data.user_id;
        if(is_admin == true || currentUser == selectedUserID)
        {
          Ext.Ajax.request({
            url: '/imap_addresses/'+selectedThoughtID,
            scope:this,
            params: {
              id: selectedThoughtID
            },
            waitMsg:'Deleting...',
            method: 'delete',
            success: function(f,a){
              emailStore.reload();
            }
          });
        }
        else
        {
        Ext.Msg.alert("Access violation","You don't have access to delete it");
        }
      }
    }]
  },
  ],
  tbar: [
  {
    text: 'New Email',
    iconCls: 'add-prop',
    handler: newEmailHandler
  }],
  region:'center',
  stripeRows: true,
  height: 400,
  width: 600,
  //  title: 'Array Grid',
  // config options for stateful behavior
  stateful: true,
  stateId: 'grid'
});

var settingsPanel = new Ext.TabPanel({
  title: 'Settings',
  xtype: 'tabpanel',
  ref:'emailTab',
  activeTab: 0,
  plain:true,
  defaults:{
    autoScroll: true
  },
  items:[{
    title: 'Emails',
    ref:'emailsPanel',
    layout: 'border',
    items: [emailsGrid]
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

