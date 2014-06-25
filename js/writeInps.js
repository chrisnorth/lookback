function writeInputs(){
   var str = $( "form" ).serialize();
    $( "#results" ).text( str ); 
}//end of writeInputs function

function dosearch(){
    console.log('hello');
}

$(function(){

    writeInputs();

    $("input[type='checkbox'],input[type='radio']").on("click",writeInputs);
    $( "select,input[type='text'],input[type='file']" ).on( "change", writeInputs );


   
});
