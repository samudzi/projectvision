
function newAsignHandler(){
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
   
  teamAsignPanel.getForm().reset();
  teamAsignPanel.getForm().findField('name').setVisible(true); 
 
  addUserAndTeamSelectOptions();
  myTeamStore.load();

  teamWindow.show();

}

function newTeamHandler(){
    newTeam = true;

  if(!newTeamWindow) newTeamWindow = new Ext.Window({
    title: 'Add New Team',
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
    newTeamWindow.setTitle('Add New Team');
   
   console.log("new");
   teamAddPanel.getForm().reset();
   newTeamWindow.show();
}


function newCatagoryHandler(){
    
newCatagory = true;
  if(!catagoryWindow) catagoryWindow = new Ext.Window({
    title: 'Add New Catagory',
    width: 380,
    applyTo:'new_catagory-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: catagoryAddPanel
  });
  else
    catagoryWindow.setTitle('Add New Catagory');
   
   console.log("new");
   catagoryAddPanel.getForm().reset();
   catagoryWindow.show();
}

function editTeamHandler(){
   if(!editTeamWindow) editTeamWindow = new Ext.Window({
    title: 'Edit Team ',
    width: 380,
    applyTo:'edit-team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: editTeamPanel
  });
  else
    editTeamWindow.setTitle('Edit Team');
   
  editTeamPanel.getForm().reset();
  //addUserAndTeamSelectOptions();
  myTeamStore.load();
  teamUserStore.load();
  editTeamWindow.show();

}



function deleteTeamHandler(){
   if(!deleteTeamWindow) deleteTeamWindow = new Ext.Window({
    title: 'Delete Team ',
    width: 380,
    applyTo:'delete-team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: deleteTeamPanel
  });
  else
    deleteTeamWindow.setTitle('Delete Team');
   
  deleteTeamPanel.getForm().reset();
  //addUserAndTeamSelectOptions();
  myTeamStore.load();
  deleteTeamWindow.show();
 
}


function newUserHandler(){
    newUser = true;

  if(!userWindow) userWindow = new Ext.Window({
    title: 'Add New User',
    width: 380,
    applyTo:'user-window',
    closeAction:'hide',
    height: 280,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: userAddPanel
  });
  else
    userWindow.setTitle('Add New User');
   
   console.log("new");
   userAddPanel.getForm().reset();
   userWindow.show();

}

function extjsRenderer(value, id, r) {
	var id = Ext.id();
	var user_id = r.get('user_id');

	(function(){
    var remove_button = new Ext.Button({
      renderTo: id,
      text: 'Remove',
      handler: function(btn, e){
        var teamID = r.get('id');
        Ext.Ajax.request({
          url: '/teams/remove_user.json',
          params: {
            team_id: teamID
          },
          method: 'post',
          waitMsg: 'Saving...',
          success: function(f,a) {
            teamUserStore.reload();
          }
        });
      }
    });
	}).defer(25);
	return (String.format('<div id="{0}"></div>', id));
}


var teams = new Ext.grid.GridPanel({
  title: "Teams",
  store: teamUserStore,
  height: 300,
  columns: [
     {
       header     :'User',
       dataIndex: 'user_name'
     },{
        header: 'Tasks',
        dataIndex: 'tasks'
     },{
        hidden : true,
        header: 'Teams',
        dataIndex: 'team'
       
     },{
        header : 'Remove User',
		    width : 50,
		    renderer : extjsRenderer
       }
     ],
  view: new Ext.grid.GroupingView({
            forceFit:true
            //groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Items" : "Item"]})'
        }),
  tbar: [
    {
      text: 'New Team',
      iconCls: 'add-prop',
      handler: newTeamHandler
    },{
      text: 'Edit Team',
      iconCls: 'add-prop',
      handler: editTeamHandler
    },{
      text: 'Delete Team',
      iconCls: 'add-prop',
      handler: deleteTeamHandler
    },{
      text: 'Assign User',
      iconCls: 'add-prop',
      handler: newAsignHandler
    }],
   listeners: {
    rowclick: {
     // fn: gridRowClickHandler
    }
   },
   
  region:'center'
});


var users = new Ext.grid.GridPanel({
  title: "Users",
  store: userStore,
  height: 300,
  columns: [
      {
        id       : 'id',
        header   : 'Users',
        width    : 90,
        //    sortable : true,
        dataIndex: 'id',
        hidden: true
      },{
        header: 'Name',
        width    : 250,
        dataIndex: 'user_name'
      },{
		    header : 'Last Sing In',
		    width : 95,
		    dataIndex :'last_sign_in_at'
	    },{
        header: 'Edit : Delete',
        xtype: 'actioncolumn',
        width: 90,
        items: [{
        icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
        tooltip: 'Edit User',
        
        handler: function(grid, rowIndex, colIndex) {
          if(!userWindow) userWindow = new Ext.Window({
            title: 'Edit User',
            width: 380,
            applyTo:'user-window',
            closeAction:'hide',
            height: 280,
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
              //resizable:false,
            items: userAddPanel
            });
          else
            userWindow.setTitle('Edit User');
        
          selectedUserID = userStore.getAt(rowIndex).data.id;
          userAddPanel.getForm().reset();
          userAddPanel.getForm().load({
            url: '/my_users/' + selectedUserID + '.json',
            params: {
              id: selectedUserID
            },
            waitMsg: 'Loading...',
            method: 'get',
            success: function(f,a){
            },
            failure: function(form, action){
              Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
          });  
          userWindow.show();
         
        }
    },{
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete User',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedUserID = userStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/my_users/'+selectedUserID,
          scope:this,
          params: {
            id: selectedUserID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            userStore.load();
    
          }
        });
      //        myData.splice(rowIndex,1);
      //        thoughtStore.loadData(myData);
      }
    }]
  }
	],
	tbar: [
  {
    text: 'New User',
    iconCls: 'add-prop',
    handler: newUserHandler
  }],
  listeners: {
  },
  region:'center'
 
	
});

var catagory = new Ext.grid.GridPanel({
  title: "Catagory and Context",
  store: catagoryStore,
  height: 300,
  columns: [
      {
        id       : 'id',
        header   : 'ID',
        width    : 90,
        //    sortable : true,
        dataIndex: 'id'
       // hidden: true
      },{
        header: 'Name',
        width    : 250,
        dataIndex: 'name'
      },{
        header: 'Type',
        width    : 250,
        dataIndex: 'ctype'
      }
      ,{
        header: 'Edit : Delete',
        xtype: 'actioncolumn',
        width: 90,
        items: [{
        icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
        tooltip: 'Edit Catagory',
        
        handler: function(grid, rowIndex, colIndex) {
          if(!catagoryWindow) catagoryWindow = new Ext.Window({
            title: 'Edit Catagory',
            width: 380,
            applyTo:'catagory-window',
            closeAction:'hide',
            height: 280,
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
              //resizable:false,
            items: catagoryAddPanel
            });
          else
            catagoryWindow.setTitle('Edit Catagory');
        
          selectedCatagoryID = catagoryStore.getAt(rowIndex).data.id;
          catagoryAddPanel.getForm().reset();
          catagoryAddPanel.getForm().load({
            url: '/catagories/' + selectedCatagoryID + '.json',
            params: {
              id: selectedCatagoryID
            },
            waitMsg: 'Loading...',
            method: 'get',
            success: function(f,a){
            },
            failure: function(form, action){
              Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
          });  
          catagoryWindow.show();
         
        }
    },{
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete User',
      handler: function(grid,rowIndex, colIndex)
      {
        selectedCatagoryID = catagoryStore.getAt(rowIndex).data.id;
        Ext.Ajax.request({
          url: '/catagories/'+selectedCatagoryID,
          
          params: {
            id: selectedCatagoryID
          },
          waitMsg:'Deleting...',
          method: 'delete',
          success: function(f,a){
            catagoryStore.load();
    
          }
        });
      //        myData.splice(rowIndex,1);
      //        thoughtStore.loadData(myData);
      }
    }]
  }
	],
	tbar: [
  {
    text: 'New Catagory',
    iconCls: 'add-prop',
    handler: newCatagoryHandler
  }],
  listeners: {
  },
  region:'center'
 	
});



var adminPanel = new Ext.TabPanel({
  title: 'Admin',
  xtype: 'tabpanel',
  ref:'admin',
  activeTab: 0,
  plain:true,
  defaults:{
    autoScroll: true
  },
  items:[{
    title: 'Manage Users',
    ref:'user',
    layout: 'border',
//    items: button1
    items: [users]
  },{
    title: 'Manage Teams',
    ref:'user',
    layout: 'border',
    items: [teams]
},{
    title: 'Catagory',
    ref: 'catagory',
    layout: 'border',
    items:[catagory]
   
}],
  listeners: {
          activate: function(tab){
				if(userWindow) userWindow.hide();
				
		  }
  }
});

