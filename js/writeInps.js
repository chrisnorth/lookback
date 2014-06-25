// Jquery based stuff
    
function parseResults(jData){
    console.log(jData);
}

$(document).ready(function(){
    $("#object").change(function(){
	var obj= $("#object").val();
	//var simbadLink=
	$('body').append(obj);
    })
    
    function getResults(url,callback){
	var form = document.forms[0];
	var object = form['name'].value
	// Encode and escape single quotes
	var obj = encodeURIComponent(object).replace(/\'/,"\\\'");
	if(object){
	    var headID = document.getElementsByTagName("head")[0];
	    var newScript = document.createElement('script');
	    newScript.type = 'text/javascript';
	    newScript.src = url+''+obj+'&callback='+callback;
	    headID.appendChild(newScript);
	}
    }

    console.log('searching');
    getResults('http://strudel.org.uk/lookUP/json/?callback=lk&name=','parseResults');
    
});

