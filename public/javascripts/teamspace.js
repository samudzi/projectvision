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
		var thoughtID = r.get('id');
		Ext.Ajax.request({
		url: '/thoughts/'+thoughtID,
		params: {
		assignee_id: user_id
		},
		method: 'put',
		waitMsg: 'Saving...',
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
		width : 289,
		//sortable : true,
		dataIndex : 'next'
	}, {
		header : 'Status',
		width : 75,
		//sortable : true,
		dataIndex : 'status'
	}, {
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
	}, {
		header : 'Due Date',
		width : 75,
		//    sortable : true,
		dataIndex : 'due_date'
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


