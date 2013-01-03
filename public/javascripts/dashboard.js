
//Javascript for Inbox Tab

var userStats = new Ext.grid.GridPanel({
  title: "User Stats",
  store: currentUserStore,
  height: 300,
  columns: [
     {
       header     :'User',
       dataIndex: 'current_user_name'
     },{
        header: 'Evolved Thoughts',
        dataIndex: 'alltask'
     },{
        header: 'Completed To do',
        dataIndex: 'completedtodo'
     },{
        header: 'Over Due To do',
       dataIndex: 'overdue'
     },{
        header: 'Experience Level',
        value: 'General'
       
     }
     ],


   listeners: {
    rowclick: {
     // fn: gridRowClickHandler
    }
   },
   
  region:'center'
});

/*

var userStatsItems = {
  xtype: 'fieldset',
  title: 'User Stats',
  height: 95,
  //width: 400,
  collapsible: true
};

userStats.add(userStatsItems);
*/
var miniTodoGrid = new Ext.grid.GridPanel({
  title: 'My Upcoming Tasks',
  store: upcomingJsonStore,
  height: 300,
  columns: [
  {
    header   : 'Next Action',
    width    : 389,
    //    sortable : true,
    dataIndex: 'next'
  },
  {
    header   : 'Due Date',
    width    : 75,
    //    sortable : true,
    dataIndex: 'due_date'
  }]
});

var imapGrid = new Ext.grid.GridPanel({
    // store configs
   store:myIpStore,
   autoDestroy: false,
   //storeId: 'myEmailSettingsStore',
    // reader configs
  height  : 100,
  width  : 500,
  columns: [
       {
         header     :'Server',
         dataIndex: 'server',
         width  : 180
       },{
          header: 'Login',
          dataIndex: 'login',
          width  : 180
       },{
        header: 'Edit',
        xtype: 'actioncolumn',
        width: 90,
        items: [{
        icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
        tooltip: 'Edit IMAP Setting',

        handler: function() {
          if(!userImapWindow) userImapWindow = new Ext.Window({
            title: 'Edit IMAP Setting',
            width: 380,
            applyTo:'user-window',
            closeAction:'hide',
            height: 280,
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
              //resizable:false,
            items: ImapEditPanel
            });
          else
            userImapWindow.setTitle('Edit IMAP Setting');

          ImapEditPanel.getForm().reset();
          ImapEditPanel.getForm().load({
            url: '/my_users/get_imap_form.json',
            waitMsg: 'Loading...',
            method: 'get',
            success: function(f,a){
            },
            failure: function(form, action){
              Ext.Msg.alert("Load failed", action.result.errorMessage);
            }
          });
          userImapWindow.show();
        }
        }]
    }
       ]
  //idIndex: 0,
  //fields: [
  //     'label',
  //     'value'
  //  ]
});
//mystore.loadData([['server','imap.goodlogics.com'],['login','goodlogics'],['password','abc']]);

// create the Grid
var miniThoughtGrid = new Ext.grid.GridPanel({
  title: 'My Recent Thoughts',
  store: inboxJsonStore,
  height: 300,
  columns: [
  {
    id       :'brief',
    header   : 'Thought',
    width    : 389,
    //    sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Category',
    width    : 75,
    //    sortable : true,
    dataIndex: 'category'
  }]
});

//var recentCompletedStore = Ext.StoreMgr.get('recent_completed_store');
//recentCompletedStore.load({params:{action_status:'Completed'}});

// create the Grid
var miniCompltedTodoGrid = new Ext.grid.GridPanel({
  title: 'My Completed Items',
  store: recentCompletedJsonStore,
  height: 300,
  columns: [
  {
    id       :'brief',
    header   : 'Thought',
    width    : 389,
    //    sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Category',
    width    : 75,
    //    sortable : true,
    dataIndex: 'category'
  }]
});

function miniThoughtSaveHandler(){
  newThought=true;
  quickThoughtPanel.getForm().submit({
    url: '/thoughts.json',
    method: 'post',
    params: {category:'General', detail:'', scope:'private', status:'0'},
    waitMsg: 'Saving...',
    success: function(f,a) {
        //inboxStore.reload();
	      globalThoughtStore.reload({callback : function(records,option,success){
			    globalThoughtStoreCallbackFn(records);		
		    }
	    });
      newThought = false;
      quickThoughtPanel.getForm().reset();
    }
  });
}

var quickThoughtPanel = new Ext.FormPanel({
  //  title: 'Details',
  title: 'Quick Thought',
  ref: 'quick_thought',
  //  collapsible: 'true',
  labelAlign: 'top',
  defaults: {
    width: 330,
  	height: 170
  },
  defaultType: 'textarea',
  //  disabled: true,
  //  minSize: 75,
  //  maxSize: 250,
  items : [{
    fieldLabel:"Quick Thought",
    name:'brief',
    ref:'quickThought'
  }],
  buttonAlign: 'left',
  buttons: [{
    text: 'Save',
    handler: miniThoughtSaveHandler
  }]
});


var recentTeamActivity = new Ext.grid.GridPanel({
  title: "Teams' Recent Activities",
  store: recentTeamStore,
  height: 300,
  columns: [
     {
       id       :'message',
       header   : 'Message',
       width    : 340,
       //    sortable : true,
       dataIndex: 'message'
     },
     {
       header: 'Created At',
       dataIndex: 'created_at'
     }]
});

var users = new Ext.grid.GridPanel({
  title: "Users",
  store: recentCompletedJsonStore,
  height: 300,
  columns: [
     {
       id       :'users',
       header   : 'Users',
       width    : 340,
       //    sortable : true,
       dataIndex: 'users'
     },
     {
       header: 'Team_Space',
       dataIndex: 'teamspace'
     }]
});

var teamspace = new Ext.grid.GridPanel({
  title: "Team Space",
  store: recentCompletedJsonStore,
  height: 300,
  columns: [
     {
       id       :'teamspace',
       header   : 'Team Space',
       width    : 340,
       //    sortable : true,
       dataIndex: 'team_space'
     },
     {
       header: 'Created At',
       dataIndex: 'created_at'
     }]
});

var userdStats = new Ext.grid.GridPanel({
  title: "User Stats",
  //store: recentCompletedJsonStore,
  height: 300,
  columns: [
     {
       id       :'teamspace',
       header   : 'Team Space',
       width    : 340,

       //    sortable : true,
       dataIndex: 'team_space'
     },
     {
       header: 'Created At',
       dataIndex: 'created_at'
     }]
});


var dashboardPanel = new Ext.TabPanel({
  title: 'Dashboard',
  id:'main-panel',
  xtype: 'tabpanel',
  ref:'dashboard',
  activeTab: 0,
  plain:true,
  defaults:{
    autoScroll: true
  },
  items:[
  {
    title: 'Dashboard',
    ref:'dashboard',
    layout:'table',
    layoutConfig: {
      columns:2
    },
    defaults: {
      frame:true,
      width:500
    },
    items: [userStats,miniTodoGrid,miniThoughtGrid,recentTeamActivity,miniCompltedTodoGrid]
  },{
    title: 'Community'
  },{
    title: 'Personal Settings',
    items: [imapGrid]
  },{
     title: 'Users',
    ref:'user',
    layout:'table',
    layoutConfig: {
      columns:2
    },
    defaults: {
      frame:true,
      width:500
    },
    items: [users]
  },{
     title: 'Team Spaces',
    ref:'team_space',
    layout:'table',
    layoutConfig: {
      columns:2
    },
    defaults: {
      frame:true,
      width:500
    },
    items: [teamspace]
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



