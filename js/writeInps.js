// Jquery based stuff
    
function parseResults(jData){
    console.log(jData);
    console.log(jData.service.href);
    var simbadUrl=jData.service.href;
    var simbadUrl = simbadUrl + "&mescat.distance=on&mescat.z=on&submit=display+selected+measurements"
    console.log(simbadUrl);
    //$.ajax({ url: simbadUrl});
    //console.log(simbadData);

    $('body').append("<div id='simbad-results'></div>");
    $('#simbad-results').load(simbadUrl,function(){alert('load done');});
};


$(document).ajaxSuccess(function(event,xhr,settings){
    $('body').append("<div id='simbad-results'></div>");
    $('#simbad-results').append(xhr);
    dataX=$.parseHTML(xhr.responseText);
    console.log(dataX);
});

function getResults(){
    var url = 'http://strudel.org.uk/lookUP/json/?callback=lk&name=';
    var callback= 'parseResults';
    var form = document.forms[0];
    console.log(form);
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

/*$(document).ajaxSuccess(function(event,xhr,settings){
    console.log('ajax success');
    console.log(xhr);
    //console.log('response:',xhr.responseText);
    //$('#body').append("<div id='simbad-results></div>");
    //$('#simbad-results').append(xhr.responseText);
})*/

$(document).ready(function(){
    $("#object").change(function(){
	var obj= $("#object").val();
	//var simbadLink=
	$('body').append(obj);
    })
    
    var QueryString = function () {
	// This function is anonymous, is executed immediately and 
	// the return value is assigned to QueryString!
	var query_string = {};
	var query = window.location.search.substring(1);
	var vars = query.split("&");
	for (var i=0;i<vars.length;i++) {
	    var pair = vars[i].split("=");
    	    // If first entry with this name
	    if (typeof query_string[pair[0]] === "undefined") {
		query_string[pair[0]] = pair[1];
    		// If second entry with this name
	    } else if (typeof query_string[pair[0]] === "string") {
		var arr = [ query_string[pair[0]], pair[1] ];
		query_string[pair[0]] = arr;
    		// If third or later entry with this name
	    } else {
		query_string[pair[0]].push(pair[1]);
	    }
	} 
	return query_string;
    } ();

    inpName = QueryString.name;
    console.log(inpName);

    if (inpName){
	console.log('using object',inpName);
	$('#object').val(inpName);
    }
    //console.log('searching');
    //getResults();
    
});

