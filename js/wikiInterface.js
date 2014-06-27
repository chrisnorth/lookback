//wikipedia interface

function wikiInterface(){

    simbadResult=$("#distancevalue").html();
    var dists = simbadResult.replace(/\s+/g, ' ');//replaces multiple whitespace with single
    dists = dists.trim();//trims leading and trailing whitespace
    var dista = dists.split(" ");//then split on whitespace
    console.log(dista[0]);
    
    earthTime=lookBackTime(dista[0],dista[1]); //will need values to pass eventually

    var earthYear=earthTime[0];
    var earthEpoch=earthTime[1];

    if (earthEpoch=="AD")
    {
	linkWiki="http://en.wikipedia.org/wiki/"+earthYear;
    }
    else
    {
	linkWiki="http://en.wikipedia.org/wiki/"+earthYear+"_BC";
    }

    $('body').append("<a href=\""+linkWiki+"\">"+linkWiki+"</a>");
    //$('body').append(dists);
}
