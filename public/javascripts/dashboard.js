
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

var simple = new Ext.FormPanel({
    labelWidth: 75, // label settings here cascade unless overridden
    url:'save-form.php',
    frame:true,
    title: 'Simple Form',
    bodyStyle:'padding:5px 5px 0',
    width: 350,
    defaults: {width: 230},
    defaultType: 'textfield',

    items: [{
            fieldLabel: 'Email Address',
            name: 'email',
            vtype:'email',
            allowBlank:false
        },{
            fieldLabel: 'Password',
            name: 'password'
        }
    ],

    buttons: [{
        text: 'Save',
        handler:function()
         {
             Ext.Ajax.request({
                url: '/imap_addresses',
                    params:{
                        imap_address: {
                          email: Ext.getCmp(simple.items.keys[0]).getValue(), 
                          password: Ext.getCmp(simple.items.keys[1]).getValue()
                        }
                    },
                    method:'POST',
                    success: function(result, request){
                       // var res = new Object();
                       // res = Ext.util.JSON.decode(result.responseText);
                       // if(res.login == false){
                       //       Ext.MessageBox.alert('Warning',res.message);
                       // }else{
                       //    location.href = '/main/index'
                       //  }
                       alert('saved');
                    }
                  });
          }
            
    },{
        text: 'Sync Current Saved Email',
        handler:function()
         {
             Ext.Ajax.request({
                url: '/1/pull',
                method:'GET',
                success: function(result, request){
                   // var res = new Object();
                   // res = Ext.util.JSON.decode(result.responseText);
                   // if(res.login == false){
                   //       Ext.MessageBox.alert('Warning',res.message);
                   // }else{
                   //    location.href = '/main/index'
                   //  }
                   alert('saved');
                }
              });
          }
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
    items: [simple,userStats,miniTodoGrid,miniThoughtGrid,recentTeamActivity,miniCompltedTodoGrid]
  },{
    title: 'Community'
  },{
    title: 'Personal Settings'
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



