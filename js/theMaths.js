//Convert everything to common unit for converions to lookback time
//this will of course need more conversions
function toParsec(dist,distUnit){
    if (distUnit=="pc")
    {
	distPC=dist;
    }
    else if (distUnit=="kpc")
    {
	distPC=dist*1.0e3;
    }
    else if (distUnit=="Mpc")
    {
	distPC=dist*1.0e6;
    }
    else if (distUnit=="lyr")
    {
	distPC=0.306594845*dist
    }
    else if (distUnit=="klyr")
    {
	distPC=306.594845*dist
    }
    else if (distUnit=="Mlyr")
    {
	distPC=306594.845*dist
    }
    else if (distUnit=="Gyr")
    {
	distPC=306594845.0*dist
    }

    //Needs redshift conversion!!!

    return distPC;
}

//convert parsec to light years
function lightTravTime(distPC){
    //Constants
    var c=299792458.0;
    var parsec=3.0856e16;
    var secPerYr=365.25*24.0*60.0*60.0;

    //parsec to m
    var distm=distPC*parsec;

    //distance to time (sec)
    var travTimeSec=distm/c;
    
    //time to year
    var travTimeYr=travTimeSec/secPerYr;

    return travTimeYr;

}

//Figure out the time on Earth (today-light years)
function earthTime(timeYr){
    // Get todays date
    var today = new Date();
    var thisYr = today.getFullYear();
    
    timeEarth=thisYr-timeYr;

    if (timeEarth<0.0)
    {
	timeEarth=timeEarth*-1.0;
	timeEarthUnit='BC';
    }
    else
    {
	timeEarthUnit='AD';
    }
    

    return [timeEarth,timeEarthUnit];

}

function lookBackTime(){
    // psuedo inputs... these will eventually be inputs to this function
    var dist=1.0;
    var distUnit="lyr";
    
    // convert to common unit for lookup time
    distPC=toParsec(dist,distUnit);
    // to light travel time
    timeYears=lightTravTime(distPC);

    // Earth Year
    lookBack=earthTime(timeYears);
    var lookBackTime=lookBack[0];
    var lookBackUnit=lookBack[1];

    //$('body').append(lookBackTime+"   "+lookBackUnit);

    return [lookBackTime,lookBackUnit];
}
