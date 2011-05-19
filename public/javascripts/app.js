//Application Script
//
//var inboxStore = Ext.StoreMgr.get('inbox_store');
//inboxStore.load();
//console.log(inboxStore);

var addWindow;
var todoEditWindow;
var refEditWindow;
var remindEditWindow;
var currentIndex;
var currentOrganizeIndex;

Ext.Msg.alert('ProjectVision','Welcome to the thought engine!');

// Horizontal Tabs ( Ext.TabPanel ) nested inside Vertical TabPanel.
var tabs = new Ext.ux.VrTabPanel({
  title: 'Project Vision',
  ref:'tabs',
  activeTab: 0,
  width:1024,
  height:900,
  plain:true,
  tabMarginTop: 30,	/* Push the tab strip down 30px from top. If not set, defaults to 15.*/
  bodyStyle: 'padding: 10px',
  defaults:{
    autoScroll: true
  },
  items:[dashboardPanel,inboxPanel,organizePanel,actionPanel]
});//,{
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
  title: 'Project Vision',
  layout: 'fit',
  items: [tabs]
});

Ext.onReady(function(){
  mainPanel.render('mainDiv');
});
