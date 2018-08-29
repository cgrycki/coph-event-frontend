// WorkflowWidget object
export default function(window, undefined) {
  
  var WorkflowWidget = window.WorkflowWidget || {};
  
  // Generic function to load JS scripts. Verifies script has loaded before firing the callback
  function _loadScript(url, append, callback) {
    var script = document.createElement('script');
    script.async = true;
    script.src = url;
    
    if( append === true ) {
      document.getElementsByTagName('head')[0].appendChild(script);
    } else {
      var entry = document.getElementsByTagName('script')[0];
      entry.parentNode.insertBefore(script, entry);
    }
    
    script.onload = script.onreadystatechange = function() {
      var rdyState = script.readyState;
      
      if (!rdyState || /complete|loaded/.test(script.readyState)) {
        callback();
        script.onload = null;
        script.onreadystatechange = null;
      }
    };
  }
  
  // Generic function to load CSS styles.
  function _loadStylesheet(url) {
    var link = document.createElement('link');
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = url;
    var entry = document.getElementsByTagName('script')[0];
    entry.parentNode.insertBefore(link, entry);
  }
  
  // Call this on load
  function loadSupportingFiles(callback) {
    
    var host = 'https://workflowtest.its.uiowa.edu';
    
    if( typeof WorkflowWidget.widget_server !== 'undefined' && WorkflowWidget.widget_server === 'staging' ) {
      host = 'https://workflowtest.its.uiowa.edu';
    } else {
      host = 'https://workflow.uiowa.edu';
    }
    
    _loadStylesheet(host+'/workflow-widget/assets/css/workflow-iframe.css');
    
    // Load other JS assets including easyXDM
    _loadScript(host+'/workflow-widget/assets/js/easyXDM/2.4.19.3/easyXDM.min.js', true, function() {
      callback();
    });
    
  }
  
  // Load Required JS & CSS and create visual iFrame for the Workflow Widget
  loadSupportingFiles(function(){
    
    var remote, remoteHost, signVoid, versionMismatch, widgetFiles, widgetServer;
    
    if( typeof(WorkflowWidget.container_id) !== 'undefined' ){
      WorkflowWidget.form_id = WorkflowWidget.container_id;
    }
    
    if( typeof(WorkflowWidget.post_sign_void) !== 'undefined' && WorkflowWidget.post_sign_void !== '' ){
      signVoid = '&post_sign_void='+WorkflowWidget.post_sign_void;
    } else {
      signVoid = '';
    }
    
    if( typeof(WorkflowWidget.post_version_mismatch) !== 'undefined' && WorkflowWidget.post_version_mismatch !== '' ){
      versionMismatch = '&post_version_mismatch='+WorkflowWidget.post_version_mismatch;
    } else {
      versionMismatch = '';
    }
    
    if( typeof(WorkflowWidget.widget_files) !== 'undefined' && WorkflowWidget.widget_files === 'test' ) {
      widgetFiles = '&widget_files=test';
    } else {
      widgetFiles = '';
    }
    
    if( typeof(WorkflowWidget.widget_server) !== 'undefined' && WorkflowWidget.widget_server === 'staging' ) {
      widgetServer = '&widget_server=staging';
      remoteHost = 'https://test.its.uiowa.edu/workflow-widget/'+WorkflowWidget.scope+'/'+WorkflowWidget.client_id+'/widget';
    } else {
      widgetServer = '';
      remoteHost = 'https://apps.its.uiowa.edu/workflow-widget/'+WorkflowWidget.scope+'/'+WorkflowWidget.client_id+'/widget';
    }
    

    /** ADDED AND HACKY */
    const location = process.env.REACT_APP_REDIRECT_URI;
    var easyXDM    = window.easyXDM;

    remote = remoteHost+'?location='+encodeURIComponent(location)+'&environment='+WorkflowWidget.environment+'&scope='+WorkflowWidget.scope+'&form_id='+WorkflowWidget.form_id+'&package_id='+WorkflowWidget.package_id+'&signature_id='+WorkflowWidget.signature_id+signVoid+versionMismatch+widgetFiles+widgetServer;
    
    
    easyXDM.Socket({
      remote: remote,
      container: "workflowWidgetContainer",
      onReady:  function(){
        this.container.getElementsByTagName("iframe")[0].scrolling = "no";
        this.container.getElementsByTagName("iframe")[0].frameborder = "0";
        this.container.getElementsByTagName("iframe")[0].style.width = "100%";
        this.container.getElementsByTagName("iframe")[0].style.height = "450px";
        this.container.getElementsByTagName("iframe")[0].style.overflow = "hidden";
      },
      onMessage: function(message){
        var newHeight = parseInt(message,10);
        this.container.getElementsByTagName("iframe")[0].style.height = newHeight + "px";
      }
    });
    
  });
  
}