// Jquery based stuff
    
function parseResults(jData){
    console.log(jData);
    console.log(jData.service.href);
    var simbadUrl=jData.service.href;
    var simbadUrl = simbadUrl + "&mescat.distance=on&mescat.z=on&submit=display+selected+measurements"
    console.log(simbadUrl);

    //AJAX method
    //$.ajax({ url: simbadUrl});
    //console.log(simbadData);

    //LOAD method
    $('#simbad').css('display','block');
    $('#simbad #full-results').load(simbadUrl,function(){
	//NOTE: #full-results has display:none in CSS

	//hide 'loading' div
	$('#simbad #loading').css('display','none');
    });

    //get distances from simbad results
    var preElements = document.getElementsByTagName('pre')
    for(var i = 0; i < preElements.length; ++ i)
    {
	var element = preElements[i];
	$('#simbad #table').append(element);
	//console.log(element.innerHTML);
	distStr=element.innerHTML;
	distSplit=distStr.split('|');
	console.log(distSplit);
	if (distSplit[1].search("redshift")>=0){
	    //get 4th element
	    redshift = distSplit[4];
	    console.log('redshift =',redshift);
	    document.getElementById('redshiftvalue').innerHTML = redshift;
	    document.getElementById('redshift').show()
	}else{
	    //get 6th element
	    distance = distSplit[6];
	    console.log('distance =',distance);
	    document.getElementById('distancevalue').innerHTML = distance;
	    document.getElementById('distance').css('display','block')
	};
	
    }
    
    
};


//AJAX success (depracated)
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

