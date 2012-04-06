/**
 * Created by JetBrains RubyMine.
 * User: goodlogics
 * Date: 3/19/12
 * Time: 10:13 AM
 * To change this template use File | Settings | File Templates.
 */

function newAssignHandler(){
   if(!teamAdminWindow) teamAdminWindow = new Ext.Window({
    title: 'Assign Team to User',
    width: 380,
    applyTo:'admin-team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: teamAdminAsignPanel
  });
  else
    teamAdminWindow.setTitle('Assign Team to User');

  teamAsignPanel.getForm().reset();
  teamAsignPanel.getForm().findField('name').setVisible(true);

  addUserAndTeamSelectOptions();
  myAdminTeamStore.reload();

  teamAdminWindow.show();

}

function newTeamHandler(){
  newTeam = true;
  if(!newAdminTeamWindow) newAdminTeamWindow = new Ext.Window({
    title: 'Add New Admin Team',
    width: 380,
    applyTo:'admin-new-team-window',
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
    newAdminTeamWindow.setTitle('Add New Admin Team');
   console.log("new");
   teamAddPanel.getForm().reset();
   newAdminTeamWindow.show();
}

function editAdminTeamHandler(){
   if(!editAdminTeamWindow) editAdminTeamWindow = new Ext.Window({
    title: 'Edit Admin Team ',
    width: 380,
    applyTo:'admin-edit-team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: editAdminTeamPanel
  });
  else
    editAdminTeamWindow.setTitle('Edit Admin Team');

  editAdminTeamPanel.getForm().reset();
  //addUserAndTeamSelectOptions();
  myAdminTeamStore.reload();
  teamUserStore.load({callback : function(records,option,success){
              teamUserStoreCallbackFn(records);
              }
            });

  editAdminTeamWindow.show();

}

function deleteAdminTeamHandler(){
   if(!deleteAdminTeamWindow) deleteAdminTeamWindow = new Ext.Window({
    title: 'Delete Team ',
    width: 380,
    applyTo:'admin-delete-team-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: deleteAdminTeamPanel
  });
  else
    deleteAdminTeamWindow.setTitle('Delete Team window');

  deleteAdminTeamPanel.getForm().reset();
  //addUserAndTeamSelectOptions();
  myAdminTeamStore.load();
  deleteAdminTeamWindow.show();

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
            teamUserStore.reload({callback : function(records,option,success){
          console.log('===================== in here ===================')
          teamUserStoreCallbackFn(records);
          }
        });
          }
        });
      }
    });
	}).defer(25);
	return (String.format('<div id="{0}"></div>', id));
}


var myPageSize = 2;
var teams = new Ext.grid.GridPanel({
  title: "Teams",
  store: myTeamUserStore,
  height: 300,
  columns: [
     {
       header     :'User',
       dataIndex: 'user_name'
     },{
        header: 'Tasks',
        dataIndex: 'tasks'
     },{
        header: 'Team Role',
        dataIndex: 'team_role_name'
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
      text: 'Edit Team Name',
      iconCls: 'add-prop',
      handler: editAdminTeamHandler
    },{
      text: 'Delete Team',
      iconCls: 'add-prop',
      handler: deleteAdminTeamHandler
    },{
      text: 'Add/Edit User',
      iconCls: 'add-prop',
      handler: newAssignHandler
    }],

   listeners: {
    rowclick: {
     // fn: gridRowClickHandler
    }
   },
  region:'center'
});


var myteamsPanel = new Ext.TabPanel({
  title: 'My Teams',
  xtype: 'tabpanel',
  ref:'myteams',
  activeTab: 0,
  plain:true,
  defaults:{
    autoScroll: true
  },
  items:[{
    title: 'Manage Teams',
    ref:'user',
    layout: 'border',
    items: [teams]
}],
  listeners: {
          activate: function(tab){
				if(userWindow) userWindow.hide();

		  }
  }
});

