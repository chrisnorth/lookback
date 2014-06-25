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
	distPC=0.306594845*dist;
    }
    else if (distUnit=="klyr")
    {
	distPC=306.594845*dist;
    }
    else if (distUnit=="Mlyr")
    {
	distPC=306594.845*dist;
    }
    else if (distUnit=="Gyr")
    {
	distPC=306594845.0*dist;
    }
    else if (distUnit=="z")
    {
	distPC=convRedshift(dist);
    }
   
    return distPC;
}

function convRedshift(dist){
    //Thanks Ned Wright and James Schombert http://www.astro.ucla.edu/~wright/CosmoCalc.html

    //vals
    var c=299792458.0;
    var parsec=3.0856e16;
    var H0 = 69.6;
    var n = 1000.0;
    var DTT = 0.0;
    var h = H0/100.0;
    var Tyr=977.8;
    var WM = 0.286;
    var WR = 4.165e-5/(h*h);   
    var WV = 1.0-WM-(0.4165/(H0*H0));
    var WK = 1-WM-WR-WV;
    az = 1.0/(1.0+1.0*dist);
    
    
    for (var i=0;i<=n;i++)
    {   
	a = az+(1.0-az)*(i+0.5)/n;
	adot = Math.sqrt(WK+(WM/a)+(WR/(a*a))+(WV*a*a))
	DTT = DTT + 1.0/adot
    }

    DTT = (1.0-az)*DTT/n;

    DTT_Gyr = (Tyr/H0)*DTT;
    
    distPC= (DTT_Gyr*1.0e9*365.25*24.0*60.0*60.0*c)/parsec;

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
    var dist=3.0;
    var distUnit="z";
    
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
