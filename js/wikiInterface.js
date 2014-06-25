//wikipedia interface

function wikiInterface(){

    earthTime=lookBackTime(); //will need values to pass eventually

    var earthYear=earthTime[0];
    var earthEpoch=earthTime[1];

    if (earthEpoch=="AD")
    {
	linkWiki="htpp://en.wikipedia.org/wiki/"+earthYear;
    }
    else
    {
	linkWiki="htpp://en.wikipedia.org/wiki/"+earthYear+"_BC";
    }

}
