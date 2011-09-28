var selectedThoughtID;
function showResultText(btn, text) {
	if(btn == 'ok') {
		Ext.Ajax.request({
			url : '/thoughts',
			params : {
				parent_id : selectedThoughtID,
			
				detail : text,
				status : '4'
			},
			waitMsg : 'Saving....',
			success : function(f, a) {
			  //console.log(selectedThoughtID);
				// globalThoughtStore.reload({
				// callback : function(records, option, success) {
				// globalThoughtStoreCallbackFn(records);
				// }
				// });
				teamThoughtStore.reload({
					callback : function(records, option, success) {
						teamThoughtStoreCallbackFn(records);
					}
				});
			}
		});
	}
};
function userTaskAsignHandler(asignThoughtID){
   if(!userTaskWindow) userTaskWindow = new Ext.Window({
    title: 'Assing Task to User',
    width: 380,
    applyTo:'team-task-window',
    closeAction:'hide',
    height: 230,
    layout: 'fit',
    plain:true,
    bodyStyle:'padding:5px;',
    buttonAlign:'center',
    //resizable:false,
    items: userTaskAsignPanel
  });
  else
    userTaskWindow.setTitle('Assing Task to User');        
  userTaskAsignPanel.getForm().reset();
  addUserAndTeamSelectOptions(); 
  userTaskWindow.show();
}

var userTaskAsignPanel = new Ext.form.FormPanel({
  labelWidth:80,
  labelAlign: 'top',
  baseCls: 'x-plan',
  defaultType:'textfield',
  ref:'userTaskAsignPanel',
  defaults: {
    width: 350
  },
  items:[{
    name: 'user',
    xtype: 'combo',
    mode: 'local',
    typeAhead: true,
    forceSelection: true,
    fieldLabel: 'Users',
    triggerAction: 'all',
    store: emailOptions,
    displayField: 'email',
    valueField: 'id',
    emptyText: 'Select User'
  }],
  buttons:[{
    text: "Asign",
    handler: myTaskAsignHandler
  },{
    text: 'Close',
    handler: function(){
      userTaskWindow.hide();
    }
  }]
})

function myTaskAsignHandler()
{

  var user_id = userTaskAsignPanel.getForm().findField('user').getValue();
  Ext.Ajax.request({
    url: '/thoughts/'+asignThoughtID,
    params: {
    assignee_id: user_id
    },
    method: 'put',
    waitMsg: 'Saving...',
    success: function(f,a) {
      teamThoughtStore.reload({
        callback : function(records, option, success) {
	          teamThoughtStoreCallbackFn(records);
        }
      });
      globalThoughtStore.reload({callback : function(records,option,success){
        globalThoughtStoreCallbackFn(records);
        }
      });
    }
  });
    userTaskWindow.hide();
}

function extjsAssignRenderer(value, id, r) {
	var id = Ext.id();
	var user_id = r.get('user_id');
	var assignee_id = r.get('assignee_id');
	var assigned_to = r.get('assigned_to');

	if(assignee_id == '' || assignee_id == 0 || assignee_id == 'NULL') {
		(function() {

		var assigned_button = new Ext.Button({
		  renderTo: id,
		  text: 'Assign Task',
		  handler: function(btn, e) {
		    asignThoughtID = r.get('id');
		    
		    if(is_admin == true){		    
		      userTaskAsignHandler(asignThoughtID);
		    }
		    else
		    {
		      Ext.Ajax.request({
		        url: '/thoughts/'+asignThoughtID,
		        params: {
		        assignee_id: currentUser
		        },
		        method: 'put',
		        waitMsg: 'Saving...',
		        success: function(f,a) {
		          teamThoughtStore.reload({
			          callback : function(records, option, success) {
						        teamThoughtStoreCallbackFn(records);
				        }
			        });
		          globalThoughtStore.reload({callback : function(records,option,success){
		            globalThoughtStoreCallbackFn(records);
		            }
		          });
		        }
		      });
		    }		    		    
		  }
		});

	}).defer(25);
		return (String.format('<div id="{0}"></div>', id));
	} /// end of if condition
	else {
		//return (String.format('<div id="{0}"></div>', username));
		return assigned_to;
	}
};

//alert(finalJsonEventData);
/*for(var i=0;i<=10000;i++) /// False loop for time delay
{
var x=i;
}
*/
//Ext.ensible.sample.EventData = Ext.decode(finalJsonEventData);
setTimeout("timedDelay()", 5000);
//Ext.ensible.sample.EventData="";
function timedDelay() {
	//Ext.ensible.sample.EventData = finalJsonEventData;
	//eventStore.loadData(Ext.ensible.sample.EventData);
}
/*var eventStore = new Ext.ensible.sample.MemoryEventStore({
 // defined in events.js
 data: Ext.ensible.sample.EventData
 });*/


