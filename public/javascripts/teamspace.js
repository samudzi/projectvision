var teamThoughtGrid = new Ext.grid.GridPanel({
  title: 'Shared Team Thoughts',
  store: recentCompletedJsonStore, //Dummy Store
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
      tooltip: 'Delete Thought',
      handler: function(grid,rowIndex, colIndex)
      {
      }
    }]
  }]
});

var outstandingTaskGrid = new Ext.grid.GridPanel({
  title: 'Outstanding Tasks',
  store: recentCompletedJsonStore, //Dummy Store
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

var eventStore = new Ext.ensible.sample.MemoryEventStore({
  // defined in events.js
  data: Ext.ensible.sample.EventData
});

var calendar = new Ext.ensible.cal.CalendarPanel({
  eventStore: eventStore,
  title: 'Shared Calendar',
  width: 700,
  height: 500
});