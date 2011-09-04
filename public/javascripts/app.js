//Application Script
//
//var inboxStore = Ext.StoreMgr.get('inbox_store');
//inboxStore.load();
//console.log(inboxStore);

var addWindow;
var teamWindow;
var userWindow;
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
  height:620,
  plain:true,
  tabMarginTop: 30,	/* Push the tab strip down 30px from top. If not set, defaults to 15.*/
  bodyStyle: 'padding: 10px',
  defaults: {
    autoScroll: true
  },
  items:[dashboardPanel,inboxPanel,organizePanel,actionPanel,adminPanel]
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
  // title: 'Project Vision',
  layout: 'fit',
  items: [tabs],
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
