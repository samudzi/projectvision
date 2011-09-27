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

function extjsRenderer(value, id, r) {
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

var outstandingTaskColModel = new Ext.grid.ColumnModel({
	columns : [{
		id : 'next',
		header : 'Task',
		width : 280,
		//sortable : true,
		dataIndex : 'next'
	},{
		header : 'Type',
		width : 70,
		dataIndex : 'action_type_str',
		hidden: true
	},{
		header : 'Assigned',
		width : 75,
		//xtype: 'button',
		//width: 50,
		//items: [assigned_button
		/*{
		icon   : '../images/icons/blue1.png',
		tooltip: 'Assigned',
		handler: function(grid,rowIndex, colIndex)
		{
		selectedThoughtID = thoughtGridJsonStore.getAt(rowIndex).data.id;
		alert(colIndex);
		}
		}*///]
		//renderer: function(value, id, r){ return assigned_button; }
		renderer : extjsRenderer
	},{
		header : 'Due Date',
		width : 100,
		//    sortable : true,
	dataIndex : 'due_date'
	},{
    header: 'Edit : Delete',
    xtype: 'actioncolumn',
    width: 70,
    items: [{
      icon   : '../images/icons/application_form_edit.gif',  // Use a URL in the icon config
      tooltip: 'Edit To Do',
      handler: function(grid, rowIndex, colIndex) {
        selectedUserID = grid.getStore().getAt(rowIndex).data.user_id;
        if(is_admin==true || currentUser == selectedUserID)
        {
          newTask=false;
          if(!todoEditWindow) todoEditWindow = new Ext.Window({
            title: 'Edit Thought',
            closeAction:'hide',
            width: 380,
            height: 580,
            layout: 'fit',
            plain:true,
            bodyStyle:'padding:5px;',
            buttonAlign:'center',
            //resizable:false,
            items: todoEditPanel
          });
          else
            todoEditWindow.setTitle("Edit To Do");
          selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
          todoEditPanel.getForm().reset();
          todoEditPanel.thoughtType.setValue('public').setVisible(false);
          todoEditPanel.status.setValue(2); 
          //todoEditPanel.team.setValue(tabTeamId); 
          todoEditPanel.team.setVisible(true);
          todoEditPanel.action_type.setVisible(true);  
          todoEditPanel.actionable.setValue('t');  
          todoEditPanel.action_status.setValue('Active');
          todoEditPanel.action_status.setVisible(false);  
          todoEditPanel.getForm().load({
            url: '/thoughts/' + grid.getStore().getAt(rowIndex).data.id + '.json',
            params: {
              id: grid.getStore().getAt(rowIndex).data.id
            },
            waitMsg: 'Loading...',
            method: 'get',
            success: function(f,a){

            }
          });

          todoEditWindow.show();
        }
        else        {
          Ext.Msg.alert("Access violation","You dont have access to edit");
        }
      }
      
    },
    {
      icon   : '../images/icons/delete.gif',
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {		  
		    selectedThoughtID = grid.getStore().getAt(rowIndex).data.id;
		    selectedUserID = grid.getStore().getAt(rowIndex).data.user_id;
        if(is_admin==true || currentUser == selectedUserID)
        {
          Ext.Ajax.request({
            url: '/thoughts/'+selectedThoughtID,
            scope:this,
            params: {
              id: selectedThoughtID
            },
            waitMsg:'Deleting...',
            method: 'delete',
            success: function(f,a){
              //todoStore.reload();
		          globalThoughtStore.reload({callback : function(records,option,success){
				        globalThoughtStoreCallbackFn(records);		
			          }
		          });
		          teamThoughtStore.reload({callback: function(records, option, success){
		            teamThoughtStoreCallbackFn(records);
		            }
		          });
            }
          });
          }
        else
        {
          Ext.Msg.alert("Access violation","You dont have access to delete it");
        }
      }
    }]
  }]
});

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


