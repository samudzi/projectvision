//Application Script
//
//var inboxStore = Ext.StoreMgr.get('inbox_store');
//inboxStore.load();
//console.log(inboxStore);
var newTeamWindow;
var newAdminTeamWindow;
var deleteAdminTeamWindow;
var catagoryWindow;
var deleteTeamWindow;
var editTeamWindow;
var editAdminTeamWindow;
var addWindow;
var teamWindow;
var teamAdminWindow;
var userWindow;
var userImapWindow;
var todoEditWindow;
var refEditWindow;
var remindEditWindow;
var currentIndex;
var currentOrganizeIndex;
var userTaskWindow;
var eventEditWindow;


Ext.util.JSON.encodeDate = function(o)
{
  return '"' + o.format("Y-m-d'T'H:i:s.uZ") + '"';
}

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
function createEmailThoughtsHandler(){
  a=confirm('Do you want to generate Thoughts from your email');
  if(a){
    console.log('Generating thoughts from your email');
    $.get("/my_users/email_thoughts",function(data){
      if(data=='false'){
        alert('An error has been occurred, please check your imap settings');
      }
      else{
        alert('Created Thoughts from email successfully');
      }
    });
  }
}
var createEmailThoughtsButton = new Ext.Button({
  text    : 'Thoughts from Email',
  width : 125,
  height :25,
  style: "z-index:1000",
  x:5,
  y:175,
  handler : function() {
          a=confirm('Do you want to generate Thoughts from your email');
          if(a){
             Ext.Ajax.request({
              url: "/my_users/email_thoughts",
              success: function(response, opts) {
                alert('Created Thoughts from email successfully');
              },
              failure: function(response, opts) {
                 alert('An error has been occurred, please check your imap settings');
              }
              });
            }
  }
});

// Horizontal Tabs ( Ext.TabPanel ) nested inside Vertical TabPanel.
var mainPanel;

if (is_admin == true)
  mainPanel = [dashboardPanel,inboxPanel,organizePanel,actionPanel,myteamsPanel,adminPanel];
else
  mainPanel = [dashboardPanel,inboxPanel,organizePanel,actionPanel,myteamsPanel];

var tabs = new Ext.ux.VrTabPanel({
  title: 'Project Vision',
  ref:'tabs',
  activeTab: 0,
  x: 0,
  y: 0,
  width:"100%",
  height: 720,
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
  height: 720,
//  autoScroll: true,
 
  items: [newThoughtButton,newTodoButton,newReferenceButton,newReminderButton,createEmailThoughtsButton,tabs],
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
  Ext.get('ext-gen72').setStyle('overflow-x', 'auto');
   // Ext.get('ext-gen120').setStyle('overflow', 'auto');
  

});
