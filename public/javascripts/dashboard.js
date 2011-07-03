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

/*var upcomingStore = Ext.StoreMgr.get('upcoming_store');
//upcomingStore.load({params:{action_status:'Pending'}});
var upcomingArrayStore = new Ext.data.ArrayStore({
	 fields: [          
           {name: 'next', type: 'string'},           
           {name: 'due_date', type: 'date'}
        ]
});
//, dateFormat: 'n/j h:ia'
upcomingStore.load({callback : function(records,option,success){
		
		var upcomingData = new Array();
		records.each(function(rec){
			var action_status = rec.get('action_status');			
			if(action_status=='Pending')
			{
				var tempArray = new Array();			
				rec.fields.each(function(field) 
				{ 
					if(field.name=='next' || field.name=='due_date'){
						var fieldValue = rec.get(field.name);   
						tempArray.push(fieldValue);
					}
				});
				upcomingData.push(tempArray);
			}			
			
		});
		
		upcomingArrayStore.loadData(upcomingData);
	}
});*/

var miniTodoGrid = new Ext.grid.GridPanel({
  title: 'Upcoming Tasks',
  store: upcomingArrayStore,
  height: 300,
  columns: [
  {
    header   : 'Next Action',
    width    : 289,
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
  store: upcomingArrayStore,
  height: 300,
  columns: [
  {
    id       :'brief',
    header   : 'Thought',
    width    : 289,
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

var recentCompletedStore = Ext.StoreMgr.get('recent_completed_store');
recentCompletedStore.load({params:{action_status:'Completed'}});

// create the Grid
var miniCompltedTodoGrid = new Ext.grid.GridPanel({
  title: 'Completed Items Log',
  store: recentCompletedStore,
  height: 300,
  columns: [
  {
    id       :'brief',
    header   : 'Thought',
    width    : 289,
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


var quickThoughtPanel = new Ext.FormPanel({
  //  title: 'Details',
  title: 'Quick Thought',
  ref: 'quick_thought',
  //  collapsible: 'true',
  labelAlign: 'top',
  defaults: {
    width: 230
  },
  defaultType: 'textfield',
  //  disabled: true,
  //  minSize: 75,
  //  maxSize: 250,
  items : [{
    fieldLabel:"Quick Thought",
    name:'quickThought',
    ref:'quickThought'
  }],
  buttons: [{
    text: 'Save'
  }]
});


var recentTeamActivity = new Ext.grid.GridPanel({
  title: 'Recent team Activities',
  store: inboxArrayStore,
  height: 300,
  columns: [
  {
    id       :'brief',
    header   : 'Thought',
    width    : 360,
    //    sortable : true,
    dataIndex: 'brief'
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
      width:400
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

