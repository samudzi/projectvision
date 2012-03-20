/**
 * Created by JetBrains RubyMine.
 * User: goodlogics
 * Date: 3/19/12
 * Time: 10:13 AM
 * To change this template use File | Settings | File Templates.
 */

function newAsignHandler(){
   if(!teamWindow) teamWindow = new Ext.Window({
    title: 'Assign Team to User',
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
    teamWindow.setTitle('Assign Team to User');

  teamAsignPanel.getForm().reset();
  teamAsignPanel.getForm().findField('name').setVisible(true);

  addUserAndTeamSelectOptions();
  myTeamStore.reload();

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
  teamUserStore.load({callback : function(records,option,success){
              teamUserStoreCallbackFn(records);
              }
            });

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

