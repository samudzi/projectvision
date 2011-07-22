var selectedThoughtID;
function showResultText(btn, text){	
	if(btn == 'ok')
	{
        Ext.Ajax.request({
			  url: '/thoughts/'+selectedThoughtID+'.json',
			  params: {
				id: selectedThoughtID,
				replytext: text,
				"thought[scope]": "public"
			  },
			  method: 'post',
			  waitMsg: 'Saving....',
			  success: function(f,a) {				 
							
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

var outstandingTaskGrid = new Ext.grid.GridPanel({
  title: 'Outstanding Tasks',
  store: outstandingTasksJsonStore, //Dummy Store
  height: 300,
  columns: [
  {
    id       :'brief',
    header   : 'Task',
    width    : 289,
    //    sortable : true,
    dataIndex: 'brief'
  },
  {
    header   : 'Status',
    width    : 75,
    //    sortable : true,
    dataIndex: 'status'
  },
  {
    header   : 'Assigned',
    width    : 75,
    //    sortable : true,
    dataIndex: 'assigned'
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