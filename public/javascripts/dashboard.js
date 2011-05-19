//Javascript for Inbox Tab

var userStats = new Ext.FormPanel({
  frame: true,
  title: 'User Stats',
  //  Width: 220,
  //  hieght: 200,
  items: []
});

var userStatsItems = {
  xtype: 'fieldset',
  title: 'User Stats',
  height: 150,
  //  width: 400,
  collapsible: true
};

var miniTodoGrid = new Ext.grid.GridPanel({
  title: 'Upcoming Tasks',
  store: todoStore,
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
  store: inboxStore,
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

// create the Grid
var miniCompltedTodoGrid = new Ext.grid.GridPanel({
  title: 'Completed Items Log',
  store: inboxStore,
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

userStats.add(userStatsItems);

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
  store: inboxStore,
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
    items: [userStatsItems,quickThoughtPanel,miniTodoGrid,miniThoughtGrid,miniCompltedTodoGrid,recentTeamActivity]
  },{
    title: 'Community'
  },{
    title: 'Personal Settings'
  }
  ]
});

