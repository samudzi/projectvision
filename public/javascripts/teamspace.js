var selectedThoughtID;
function showResultText(btn, text){	
	if(btn == 'ok')
	{
        Ext.Ajax.request({
			  url: '/thoughts',
			  params: {
				parent_id: selectedThoughtID,
				detail: text
			  },
			  method: 'post',
			  waitMsg: 'Saving....',
			  success: function(f,a) {	
			  globalThoughtStore.reload({callback : function(records,option,success){
					globalThoughtStoreCallbackFn(records);		
				}
			  });
							
			  }
        });
	}
};
var teamThoughtGrid = new Ext.grid.GridPanel({
  title: 'Shared Team Thoughts',
  store: thoughtGridJsonStore, //Dummy Store
  height: 300,    
      bodyStyle:'margin-right:20px',
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
  },
  {
    header: 'Reply',
    xtype: 'actioncolumn',
    width: 50,
    items: [
    {
		  icon   : '../images/icons/arrow_undo.gif',
		  tooltip: 'Reply Thought',
		  handler: function(grid,rowIndex, colIndex)
		  {
				selectedThoughtID = thoughtGridJsonStore.getAt(rowIndex).data.id;
				Ext.MessageBox.buttonText.ok = "Save";
				Ext.MessageBox.show({
				   title: 'Reply',
				   msg: 'Enter reply to thought:',
				   width:300,
				   buttons: Ext.MessageBox.OKCANCEL,			   
				   multiline: true,
				   fn: showResultText//,
				   //fn: showResultText.createDelegate(scopeHere, ['your', 'custom' 'parameters'], true)
				   //animateTarget: 'mb3'
				});				
		  }
    }]
  }]
});
function extjsRenderer(value, id, r) {
	    var id = Ext.id();	
		var ownerID = r.get('user_id');
		//var username = r.get('user_name');
		
		//if(ownerID == '' || ownerID == 0 || ownerID == 'NULL')
		//{
	    (function() { 
			
			var assigned_button = new Ext.Button({
				renderTo: id,
				text: 'Assign Task',
				handler: function(btn, e) { 
					var thoughtID = r.get('id');					
					Ext.Ajax.request({
						  url: '/thoughts/'+thoughtID,
						  params: {
							owner_id: ownerID
						  },
						  method: 'post',
						  waitMsg: 'Saving....',
						  success: function(f,a) {	
							  globalThoughtStore.reload({callback : function(records,option,success){
										globalThoughtStoreCallbackFn(records);		
									}
							   });										
						  }
					});
				}
			});  
			
	 	}).defer(25);
	   return (String.format('<div id="{0}"></div>', id));
	   //} /// end of if condition
	   //else
	   //{
		   ///return username;
	   //}
};

var outstandingTaskGrid = new Ext.grid.GridPanel({
  title: 'Outstanding Tasks',
  store: outstandingTasksJsonStore, //Dummy Store
  height: 300,
  stripeRows: true,
  columns: [
  {
    id       :'brief',
    header   : 'Task',
    width    : 289,
    //sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Status',
    width    : 75,
    //sortable : true,
    dataIndex: 'status'
  },
  {
    header   : 'Assigned',
    width    : 75,
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
	renderer: extjsRenderer
  },
  {
    header   : 'Due Date',
    width    : 75,
    //    sortable : true,
    dataIndex: 'due_date'
  }]
});
//alert(finalJsonEventData);
/*for(var i=0;i<=10000;i++) /// False loop for time delay
{
	var x=i;
}
*/
//Ext.ensible.sample.EventData = Ext.decode(finalJsonEventData);
setTimeout("timedDelay()",5000);
//Ext.ensible.sample.EventData="";
function timedDelay()
{
	//Ext.ensible.sample.EventData = finalJsonEventData;
	//eventStore.loadData(Ext.ensible.sample.EventData);
}
/*var eventStore = new Ext.ensible.sample.MemoryEventStore({
  // defined in events.js
  data: Ext.ensible.sample.EventData
});*/

var calendar = new Ext.ensible.cal.CalendarPanel({
  eventStore: eventStore,
  title: 'Shared Calendar',
  width: 700,
  height: 500
});