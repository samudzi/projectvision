//Application Script
//
//var inboxStore = Ext.StoreMgr.get('inbox_store');
//inboxStore.load();
//console.log(inboxStore);
var newTeamWindow;
var deleteTeamWindow;
var editTeamWindow;
var addWindow;
var teamWindow;
var userWindow;
var todoEditWindow;
var refEditWindow;
var remindEditWindow;
var currentIndex;
var currentOrganizeIndex;
var userTaskWindow;
var eventEditWindow;

Ext.Msg.alert('ProjectVision','Welcome to the thought engine!');

var newThoughtButton = new Ext.Button({
  text    : 'New Thought',
  width : 125,
  height :25,
  style: "z-index:1000",
  x:5,
  y:100,
  handler : function() {
             newHandler();
            } 
});
var newTodoButton = new Ext.Button({
  text    : 'New Todo',
  width : 125,
  height :25,
  style: "z-index:1000",
  x:5,
  y:125,
  handler : function() {
             btnTodoTaskHandler();
            } 
});
var newReferenceButton = new Ext.Button({
  text    : 'New Reference',
  width : 125,
  height :25,
  style: "z-index:1000",
  x:5,
  y:150,
  handler : function() {
             btnReferenceTaskHandler();
            } 
});
var newReminderButton = new Ext.Button({
  text    : 'New Reminder',
  width : 125,
  height :25,
  style: "z-index:1000",
  x:5,
  y:175,
  handler : function() {
             btnReminderTaskHandler();
            } 
});

// Horizontal Tabs ( Ext.TabPanel ) nested inside Vertical TabPanel.
var mainPanel;

if (is_admin == true)
  mainPanel = [dashboardPanel,inboxPanel,organizePanel,actionPanel,adminPanel];
else
  mainPanel = [dashboardPanel,inboxPanel,organizePanel,actionPanel];

var tabs = new Ext.ux.VrTabPanel({
  title: 'Project Vision',
  ref:'tabs',
  activeTab: 0,
  x: 0,
  y: 0,
  width:"100%",
  height:620,
  plain:true,
  tabMarginTop: 250,	/* Push the tab strip down 30px from top. If not set, defaults to 15.*/
  bodyStyle: 'padding: 10px',
  
            
  defaults: {
    autoScroll: true
  },

  items: [mainPanel]
  
  
});

//,{
//    title: 'Action',
//    xtype: 'tabpanel',
//    activeTab: 0,
//    plain:true,
//    defaults:{
//      autoScroll: true
//    },
//    items:[{
//      title: 'To-Dos',
//      layout: 'border'
//
//    },{
//      title: 'Projects',
//      layout: 'border'
//    },{
//      title: 'Reference',
//      layout: 'border'
//    },{
//      title: 'Reminders',
//      layout: 'border'
//    }]
//  }




var mainPanel = new Ext.Panel({
  // title: 'Project Vision',
  layout: 'absolute',
  height: 620,
  items: [newThoughtButton,newTodoButton,newReferenceButton,newReminderButton,tabs],
  tbar: new Ext.Toolbar({
    cls: 'x-panel-header',
    height: 25,
    items: [
    '<span style="color:#15428B; font-weight:bold">Project Vision</span>',
    '->',{
      text: 'Logout',
      handler: function() {
        document.location = 'users/sign_out'
      }
    },' ']
  
  })
 
});

Ext.onReady( function() {
	Ext.QuickTips.init(); 	
  mainPanel.render('mainDiv');
});
