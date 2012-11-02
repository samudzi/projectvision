/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.onReady(function(){
  Ext.QuickTips.init();

	loginprocess=function()
	{
		login.getForm().submit({
          method:'POST',
          waitTitle:'Connecting',
          waitMsg:'Sending data...',

          // Functions that fire (success or failure) when the server responds.
          // The one that executes is determined by the
          // response that comes from login.asp as seen below. The server would
          // actually respond with valid JSON,
          // something like: response.write "{ success: true}" or
          // response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}"
          // depending on the logic contained within your server script.
          // If a success occurs, the user is notified with an alert messagebox,
          // and when they click "OK", they are redirected to whatever page
          // you define as redirect.

          success:function(){
            console.log("done");
            window.location = "/";
//            Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
//              if (btn == 'ok'){
//                var redirect = 'test.asp';
//                window.location = redirect;
//              }
//            });
          },

          // Failure function, see comment above re: success and failure.
          // You can see here, if login fails, it throws a messagebox
          // at the user telling him / her as much.

          failure:function(form, action){
            console.log("failed");
            if(action.failureType == 'server'){
              obj = Ext.util.JSON.decode(action.response.responseText);
              Ext.Msg.alert('Login Failed!', obj.errors.reason);
            }else{
             console.log(action.response.responseText);
             Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText);
            }
            login.getForm().reset();
          }
          
        });
	} //// loginprocess
  // Create a variable to hold our EXT Form Panel.
  // Assign various config options as seen.
  var login = new Ext.FormPanel({
    labelWidth:80,
    url:'/users/sign_in.json',
    frame:true,
    title:'ProjectVision - Please Login',
    defaultType:'textfield',
    monitorValid:true,
    // Specific attributes for the text fields for username / password.
    // The "name" attribute defines the name of variables sent to the server.
    items:[{
      fieldLabel:'Username',
      name:'user[email]',
      allowBlank:false
    },{
      fieldLabel:'Password',
      name:'user[password]',
      inputType:'password',
      allowBlank:false,
	  enableKeyEvents: true,
	  listeners: 
	  {
		  specialkey: function(field, el)
		  {  
		  		if (el.getKey() == Ext.EventObject.ENTER)
				{
					loginprocess();
				}
		  }
	  }
  },
  {
  xtype: 'box',
  autoEl: {tag: 'a', href: '/users/auth/open_id?openid_url=https%3A%2F%2Fwww.google.com%2Faccounts%2Fo8%2Fid', html: 'Sign in with Google Service'}
  }],
    
    // All the magic happens after the user clicks the button
    buttons:[{
      text:'Login',
      formBind: true,
      // Function that fires when user clicks the button
      handler:function(){
        /*login.getForm().submit({
          method:'POST',
          waitTitle:'Connecting',
          waitMsg:'Sending data...',

          // Functions that fire (success or failure) when the server responds.
          // The one that executes is determined by the
          // response that comes from login.asp as seen below. The server would
          // actually respond with valid JSON,
          // something like: response.write "{ success: true}" or
          // response.write "{ success: false, errors: { reason: 'Login failed. Try again.' }}"
          // depending on the logic contained within your server script.
          // If a success occurs, the user is notified with an alert messagebox,
          // and when they click "OK", they are redirected to whatever page
          // you define as redirect.

          success:function(){
            console.log("done");
            window.location = "/";
//            Ext.Msg.alert('Status', 'Login Successful!', function(btn, text){
//              if (btn == 'ok'){
//                var redirect = 'test.asp';
//                window.location = redirect;
//              }
//            });
          },

          // Failure function, see comment above re: success and failure.
          // You can see here, if login fails, it throws a messagebox
          // at the user telling him / her as much.

          failure:function(form, action){
            console.log("failed");
            if(action.failureType == 'server'){
              obj = Ext.util.JSON.decode(action.response.responseText);
              Ext.Msg.alert('Login Failed!', obj.errors.reason);
            }else{
             console.log(action.response.responseText);
             Ext.Msg.alert('Warning!', 'Authentication server is unreachable : ' + action.response.responseText);
            }
            login.getForm().reset();
          }
        });*/
		loginprocess();
      }
    }]
  });


  // This just creates a window to wrap the login form.
  // The login object is passed to the items collection.
  var win = new Ext.Window({
    layout:'fit',
    width:300,
    height:150,
    closable: false,
    resizable: false,
    plain: true,
    border: false,
    items: [login]
  });
  win.show();
});
