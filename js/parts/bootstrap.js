//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___|.3.1



if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){



var savekit=[{
  "A":"",
  "Z":"",
  "E":"",
  "R":"",
  "T":"",
  "Y":"",
  "Q":"",
  "S":"",
  "D":"",
  "F":"",
  "G":"",
  "H":"",
  "W":"",
  "X":"",
  "C":"",
  "V":"",
  "B":"",
  "N":""

}];
var notelist=[];
var count = 0;
var msecsFirst = 0;
var msecsPrevious = 0;
var position=0;
var isplay;
var average=0;
var tap=0;
var reset=0;
var seqrequestId;
var potardslist=[];
var midi;
var gifpopup;
var midilearn=false;
var data, cmd, channel, type, note, velocity;
var midion=false;
window.AudioContext = window.AudioContext || window.webkitAudioContext;
var sndcontext = new AudioContext();
var cc;
var pi=0;
var infocus=false;
var gain = null;
var meter;
var gainvalue = 0.5;
var sup1;
var audioreactive=false;
var abort = false;
var goupille = true;
var outputsequence = [];
var layer1sequence = [];
var layer2sequence = [];
var popup;
var oscttolayer1 = false;
var osctolayer2 = false;
var vgardm=false;
var canvas, ctx;
var compmode = ["normal", "multiply", "screen", "overlay", "darken", "lighten", "color-dodge", "color-burn", "hard-light", "soft-light", "difference", "exclusion", "hue", "saturation", "color", "luminosity", "clear", "copy", "destination", "source-over", "destination-over", "source-in", "destination-in", "source-out", "destination-out", "source-atop", "destination-atop", "xor", "lighter"];
var specialsequence = [];
var H = 240,
W = 320;
var LYR1, LYR2;
var oscillobufferLength;
var oscillodataArray = null;
var oscillo = null;
var layerAnim1;
var layerAnim2;
var vgatooutput = false;
var vgatolr1 = true;
var vgatolr2 =false;
var txttooutput = false;
var txttolr1 = true;
var txttolr2=false;
var b64tooutput = false;
var b64tolr1=true;
var b64tolr2=false;
var osctooutput=false;
var osctolr1=true;
var osctolr2=false;
var videotooutput=false;
var videotolr1=true;
var videotolr2=false;
var speinterval;
var encoder = null;
var gifrecording=false;
var sourceA, sourceZ, sourceE, sourceR, sourceT, sourceY,sourceQ,sourceS,sourceD,sourceF,sourceG,sourceH,sourceW,sourceX,sourceC,sourceV,sourceB,sourceN, popcanvas, popctx;
var loopA, loopZ, loopE, loopR, loopT, loopY,loopQ,loopS,loopD,loopF,loopG,loopH,loopW,loopX,loopC,loopV,loopB,loopN;
var playmodeA, playmodeZ, playmodeE, playmodeR, playmodeT, playmodeY,playmodeQ,playmodeS,playmodeD,playmodeF,playmodeG,playmodeH,playmodeW,playmodeX,playmodeC,playmodeV,playmodeB,playmodeN;
var frameposA= frameposZ= frameposE= frameposR= frameposT= frameposY=frameposQ=frameposS=frameposD=frameposF=frameposG=frameposH=frameposW=frameposX=frameposC=frameposV=frameposB=frameposN=0;
//$('body').html('<CENTER><H1>GLITCH GIF VJ</H1><CENTER>')

$.getScript( "js/parts/layout.js", function() {

  $('#messagebox').html('<p>Interface loaded...</p>');
  $.getScript( "js/parts/fx.js", function() {
      $('#messagebox').html('<p>FX engine loaded...</p>');

    $.getScript( "js/parts/gifloader.js", function() {
        $('#messagebox').html('<p>GIF engine loaded...</p>');
      $.getScript( "js/parts/engine.js", function() {
          $('#messagebox').html('<p>Render engine loaded...</p>');
        $.getScript( "js/parts/uidialog.js", function() {
                  $('#messagebox').html('<p>User interface engine loaded...</p>');
          $.getScript( "js/parts/sort.js", function() {
              $('#messagebox').html('<p>User Interface engine loaded...</p>');
              $.getScript( "js/parts/midi.js", function() {
                  $('#messagebox').html('<p>MIDI engine loaded...</p>');
                  //$.getScript( "js/parts/fontloader.js", function() {
                    //  $('#messagebox').append('<p>midi engine ok...</p>');scrollmessages();
$.getScript( "js/parts/savesystem.js", function() {
$('#messagebox').html('<p>BACKUP engine loaded...</p>');
$.getScript( "js/parts/videopong.js", function() {
$('#messagebox').html('<p>videopong plugin loaded...</p>');

});
});
});});});});
});
});
});

}else{

  var alertnotchrome = '<center><br><br><br>T_T<br>  SORRY THIS APPLICATION RUNS ONLY IN CHROME <br> IT IS UNFORTUNATELY THE ONLY BROWSER THAT SUPPORT MIDI CONTROLER INPUT AND HAVE THE FASTEST CANVAS 2D RENDERING ENGINE...</center>';
$('body').append(alertnotchrome);
}
