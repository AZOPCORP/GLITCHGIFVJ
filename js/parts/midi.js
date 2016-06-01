//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________    _______
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |   \   _  \
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |   /  /_\  \
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |   \  \_/   \
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___| /\ \_____  /


$('body').on('click','#startaudio',function (){
  audioreactive = !audioreactive;
  if(audioreactive){
  getaudio();
  $('#startaudio').css({"background-color":"#0F0"});
  $('#messagebox').html('Audio detection activated');
}else{
         stopaudio();
         $('#startaudio').css({"background-color":"#060"});
           $('#messagebox').html('Audio detection de-activated');
  }
})



$('body').on('click','#savemidisetup',function(){

var midimap= [];
var z=0;
$('.potard').each(function(){
midimap[z]=$(this).data('bind');
z++;
})

localStorage.setItem("midimap", JSON.stringify(midimap));
$('#messagebox').html('MIDI mapping saved');
$('#midiarrayinput').val('['+midimap+']');
})

$('body').on('click','#loadmidisetup',function(){
var value=$.trim($("#midiarrayinput").val());
if(value.length==0){

var midimap = JSON.parse(localStorage.getItem("midimap"));
	console.log('from localStorage:'+midimap);
var z =0;
$('.potard').each(function(){

$(this).data('bind',midimap[z]);
z++;

})
}else{
var  midimap= eval($('#midiarrayinput').val());
var z =0;
$('.potard').each(function(){

$(this).data('bind',midimap[z]);
z++;
console.log('from input:'+midimap);
})
}
$('#messagebox').html(' MIDI mapping loaded');
});

$('body').on('dblclick','.potard',function(){
//alert('yo');
    $(this).attr('data-bind',"");
	$(this).attr('data-bind',cc);
midilearn=false;
$('#midilearn').css({"background-color":"#060"});
$('#messagebox').html('Control assigned!');

})

$('body').on('click','#midilearn',function(){
	midilearn = !midilearn;
	if(midilearn){
	$('#midilearn').css({"background-color":"#0F0"})
  $('#messagebox').html('tweak controler to select control ');
}else{
	$('#midilearn').css({"background-color":"#060"})
}
})

$('body').on('click','#ennablemidi',function(){

midion = !midion;

if(midion){
ennablemidi();
$('#ennablemidi').css({"background-color":"#0F0"});
$('#messagebox').html('midi ennabled');
}else{
//disablemidi();
$('#ennablemidi').css({"background-color":"#060"});
$('#messagebox').html('midi disabled');
}

});



function ennablemidi(){
$('.potard').each(function(){

	potardslist[pi] = $(this);
pi++;
})



if (navigator.requestMIDIAccess) {
    navigator.requestMIDIAccess({
        sysex: false
    }).then(onMIDISuccess, onMIDIFailure);
} else {
    $('#messagebox').html("No MIDI support in your browser.");
}

function onMIDISuccess(midiAccess) {
    midi = midiAccess;
    var inputs = midi.inputs.values();
    // loop through all inputs
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // listen for midi messages
        input.value.onmidimessage = onMIDIMessage;
        // this just lists our inputs in the console
        listInputs(input);
    }
    // listen for connect/disconnect message
    midi.onstatechange = onStateChange;
}

function onMIDIMessage(event) {

if(midion){
    data = event.data,
    cmd = data[0] >> 4,
    channel = data[0] & 0xf,
    type = data[0] & 0xf0, // channel agnostic message type. Thanks, Phil Burk.
    note = data[1],
    velocity = data[2];
    // with pressure and tilt off
    // note off: 128, cmd: 8
    // note on: 144, cmd: 9
    // pressure / tilt on
    // pressure: 176, cmd 11:
    // bend: 224, cmd: 14
if(midilearn){
	cc = data[1];
$('#messagebox').html('control '+cc+' selected, double click param to assign')
}else{
	//cc= null;
}


  for (var i = 0; i<potardslist.length;i++){
  	if(potardslist[i].data('bind')==data[1]){
  		var x = potardslist[i].attr('max');
      var z = potardslist[i].attr('min');
  		console.log(x);
if(potardslist[i].attr('min')=="-100"){
  //console.log(data[2]);
  if(data[2]>62){
      potardslist[i].val(((x/64)*(data[2]-62)))
      console.log(potardslist[i].val())
  }else{
    potardslist[i].val(-(100-(((x/64)*data[2]))))
    console.log(potardslist[i].val())

  }

}else{
potardslist[i].val((x/127)*data[2]);
}

  	}
  }
}
}




function onStateChange(event) {
    var port = event.port,
        state = port.state,
        name = port.name,
        type = port.type;
    if (type == "input") console.log("name", name, "port", port, "state", state);
}

function listInputs(inputs) {
    var input = inputs.value;
    $('#messagebox').html(  "connected device: " + input.name
        );
}



function onMIDIFailure(e) {
    $('#messagebox').html('No access to MIDI devices or your browser doesn\'t support WebMIDI API.');
}






}
