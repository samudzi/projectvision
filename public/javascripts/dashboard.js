
//Javascript for Inbox Tab

var userStats = new Ext.FormPanel({
  frame: true,
  title: 'User Stats',
  //Width: 220,
  //hieght: 200,
  items: []
});

var userStatsItems = {
  xtype: 'fieldset',
  title: 'User Stats',
  height: 95,
  //width: 400,
  collapsible: true
};

userStats.add(userStatsItems);

var miniTodoGrid = new Ext.grid.GridPanel({
  title: 'Upcoming Tasks',
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
  title: 'Recent Thoughts',
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
  title: 'Completed Items Log',
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
    width: 330
  },
  defaultType: 'textfield',
  //  disabled: true,
  //  minSize: 75,
  //  maxSize: 250,
  items : [{
    fieldLabel:"Quick Thought",
    name:'brief',
    ref:'quickThought'
  }],
  buttons: [{
    text: 'Save',
    handler: miniThoughtSaveHandler
  }]
});


var recentTeamActivity = new Ext.grid.GridPanel({
  title: 'Recent team Activities',
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
    items: [userStats,quickThoughtPanel,miniTodoGrid,miniThoughtGrid,miniCompltedTodoGrid,recentTeamActivity]
  },{
    title: 'Community'
  },{
    title: 'Personal Settings'
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
