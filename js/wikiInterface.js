//wikipedia interface

function wikiInterface(){

    simbadResult=$("#distancevalue").html();
    var dists = simbadResult.split("\\s{2,}");
    console.log(dists);

    earthTime=lookBackTime(); //will need values to pass eventually

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
