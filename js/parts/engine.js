//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___|.3.1

var txton=false;
var oscon=false;
var glitchon=false;
var vgaon=false;
var videosrc=false;
var keyb_def_map =[60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77];
var previewcanvas = document.getElementById('preview_canvas');
var previewctx = previewcanvas.getContext('2d');
var canvas_layer_1 = document.getElementById('canvas_layer_1');
var context_layer_1 = canvas_layer_1.getContext('2d');
var canvas_layer_2 = document.getElementById('canvas_layer_2');
var context_layer_2 = canvas_layer_2.getContext('2d');
var outputAnim = requestAnimationFrame(animoutput);
var txtcanvas = document.getElementById('txtcanvas');
var txtctx = txtcanvas.getContext('2d');
var glitchcanvas = document.getElementById('b64canvas');
var glitchctx = glitchcanvas.getContext('2d');
var osccanvas = document.getElementById('osccanvas');
var oscctx = osccanvas.getContext('2d');
var vgacanvas = document.getElementById('vgacanvas');
var vgactx = vgacanvas.getContext('2d');
var txtinterval,oscinterval,glitchinterval,vgainterval;
var tmpCanvas = document.createElement('canvas');
var tmpCtx = tmpCanvas.getContext('2d');
var videocanvas = document.getElementById('videocanvas');
var videoctx = videocanvas.getContext('2d');
var spesrccanvas = document.createElement('canvas');
var spesrcctx = spesrccanvas.getContext('2d');
var temp = document.createElement('canvas');
var tempctx = temp.getContext('2d');
var grabframe = false;

var recorder = new CanvasRecorder(window.previewcanvas, {
    disableLogs: false
});




listoutput();
listlayer1();
listlayer2();
listspesrc();
speinterval = requestAnimationFrame(animspe);
reset();

$('#txtsource').show();
$('#txtmovespeed').show();
///reset sliders position

function reset(){
$('input[type=range]').val(0);
$('#l2opacity').val(1);
$('#speopacity').val(1);
$('#vgaR').val(255);
$('#vgaG').val(255);
$('#vgaB').val(255);
$('#vgaA').val(255);
$('#txtmovespeed').val(10);
$('#fontsize').val(40);

}
//ENCODE 64
function encode64(input) {
	var output = "", i = 0, l = input.length,
	key = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
	chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	while (i < l) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);
		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) enc3 = enc4 = 64;
		else if (isNaN(chr3)) enc4 = 64;
		output = output + key.charAt(enc1) + key.charAt(enc2) + key.charAt(enc3) + key.charAt(enc4);
	}
	return output;
}


///LIST FX CHAIN & spesrc
function listspesrc(){
  specialsequence.length = 0;
  $('#spe_menu li').each(function (n, v)
  {
    specialsequence.push($(this).data('order'));

  });
}
function listoutput()
{
  outputsequence.length = 0;
  $('#outlist li').each(function (n, v)
  {
    outputsequence.push($(this).data('fnc'));

  });

}

function listlayer1()
{
  layer1sequence.length = 0;
  $('#lr1list li').each(function (n, v)
  {
    layer1sequence.push($(this).data('fnc'));

  });

}

function listlayer2()
{
  layer2sequence.length = 0;
  $('#lr2list li').each(function (n, v)
  {
    layer2sequence.push($(this).data('fnc'));

  });
  console.log(layer2sequence);
}

///source to layer

function sourceToLayer(canvas, targetlayer)
{

  switch (targetlayer)
  {
    case 'L1':
    var layer1 = document.getElementById('canvas_layer_1');
    var layer1ctx = layer1.getContext('2d');

    layer1ctx.fillStyle = "red";
    layer1ctx.fillRect(0, 0, 600, 600);
    layer1ctx.drawImage(canvas, 0, 0, 600, 600);

    break;

    case 'L2':
    var layer2 = document.getElementById('canvas_layer_2');
    var layer2ctx = layer2.getContext('2d');
    layer2ctx.fillStyle = "red";
    layer2ctx.fillRect(0, 0, 600, 600)
    layer2ctx.drawImage(canvas, 0, 0, 600, 600)

    break;
  }

};


///AUDIO meter
function createAudioMeter(audioContext, clipLevel, averaging, clipLag)
{
  var processor = audioContext.createScriptProcessor(512);
  processor.onaudioprocess = volumeAudioProcess;
  processor.clipping = false;
  processor.lastClip = 0;
  processor.volume = 0;
  processor.clipLevel = clipLevel || 0.98;
  processor.averaging = averaging || 0.95;
  processor.clipLag = clipLag || 750;
  processor.connect(audioContext.destination);
  processor.checkClipping =
    function ()
    {
      if (!this.clipping)
        return false;
      if ((this.lastClip + this.clipLag) < window.performance.now())
        this.clipping = false;
      return this.clipping;
    };

  processor.shutdown =
    function ()
    {
      this.disconnect();
      this.onaudioprocess = null;
    };

  return processor;
}

function volumeAudioProcess(event)
{
  var buf = event.inputBuffer.getChannelData(0);
  var bufLength = buf.length;
  var sum = 0;
  var meter;
  var x;
  for (var i = 0; i < bufLength; i++)
  {
    x = buf[i];
    if (Math.abs(x) >= this.clipLevel)
    {
      this.clipping = true;
      this.lastClip = window.performance.now();
    }
    sum += x * x;
  }
  var rms = Math.sqrt(sum / bufLength);
  this.volume = Math.max(rms, this.volume * this.averaging);
}



/// RESOLUTION CHANGER

function resolution()
{

  $('#status').html(W + 'x' + H);

  switch ($('#rezolution').val())
  {
    case "qvga":
    H = 240;
    W = 320;

    break;
    case "vga":
    W = 640;
    H = 480;
    break;
    case "svga":
    W = 800;
    H = 600;
    break;
    case "xga":
    W = 1024;
    H = 768;
    break;
    case "hd720":
    W = 1280;
    H = 720;

    break;
    case "hd1080":
    W = 1920;
    H = 1080;
    break;

  }

}


function Opengifpopup()
{
  gifpopup = window.open("gifpopup.htm", "Your Gif", "width='320',height='240'");
}

///POPUP OUTPUT FUNCTIONS
function OpenPopup()
{
  popup = window.open("output.htm", "output", "width='" + W + "',height='" + H + "'");

};

function animatepopup()
{
  popcanvas.height = H;
  popcanvas.width = W;
  popctx.drawImage(previewcanvas, 0, 0, W, H)
  requestAnimationFrame(animatepopup);
}

function SendToPopup()
{
  if (popup != null && !popup.closed)
  {
    popcanvas = popup.document.getElementById("outputcanvas");
    popctx = popcanvas.getContext('2d');

    animatepopup();

  }
  else
  {
    alert("can't find popup window.");
  }
}


///DRAW spesrc to hidde canvas

function animspe(){
spesrccanvas.height=H;
spesrccanvas.width=W;
for (var i = 0; i < specialsequence.length; i++)
{
switch(specialsequence[i]){
case "vga":

  if(vgaon){

    spesrcctx.drawImage(vgacanvas, 0, 0, W, H);

  }
break;
case "txt" :

  if(txton ){
  //previewctx.globalCompositeOperation = compmode[$('#txtcompmode').val()];
  spesrcctx.drawImage(txtcanvas, 0, 0, W, H);

}
break;
case "b64":
if(glitchon ){

  previewctx.drawImage(glitchcanvas, 0, 0, W, H);

}
break;
case "osc":
if(oscon ){

  spesrcctx.drawImage(osccanvas, 0, 0, W, H);

}
break;
case "video":
if(videosrc ){
  spesrcctx.drawImage(videocanvas,0,0,W,H);
}
break;
}
}


  speinterval = requestAnimationFrame(animspe);

}


/// DRAW OUTPUT
function animoutput()
{
  resolution();
  previewcanvas.height = H;
  previewcanvas.width = W;
  previewctx.clearRect(0, 0, W, H);
  previewctx.globalCompositeOperation = "normal";
  previewctx.drawImage(canvas_layer_1, 0, 0, W, H);

  previewctx.globalAlpha = $('#l2opacity').val();
  $('#opainfo').html($('#l2opacity').val());
  previewctx.globalCompositeOperation = compmode[$('#l2compmode').val()];
  $('#compinfo').html(compmode[$('#l2compmode').val()]);
  previewctx.drawImage(canvas_layer_2, 0, 0, W, H);
  previewctx.globalAlpha = $('#speopacity').val();
  previewctx.globalCompositeOperation =compmode[$('#specompmode').val()];
previewctx.drawImage(spesrccanvas, 0, 0, W, H);






  for (var i = 0; i < outputsequence.length; i++)
  {

    switch (outputsequence[i])
    {
              //case "feedback":
             // feedback(previewcanvas, previewctx,$('#feedbackseed').val())
              //$('#feedbackinfo').html($('#feedbackseed').val())
              //break;
      case "zoom":
      //console.log($('#zoomseed').val())
      zoom( previewcanvas,previewctx, $('#zoomseed').val());
        $('#zoominfo').html($('#zoomseed').val());
      break;
      case "flip":
      flip(previewcanvas, previewctx, $('#flip').val());
      $('#flipinfo').html($('#flip').val());
      break;
      case "latglitch":
      latglitch(previewcanvas, previewctx, $('#outlatseed').val());
      $('#outseedinfo').html($('#outlatseed').val());
      break;
      case "dither":
      dither(previewctx, $('#outdith').val());
      $('#outdithinfo').html($('#outdith').val());
      break;
      case "invert":
      invert(previewctx, $('#outinv').val());
      $('#outinvinfo').html($('#outinv').val());
      break;
      case "mirror":
      mirror(previewcanvas, previewctx, $('#mirror').val());
      $('#mirrorinfo').html($('#mirror').val());

      break;
      case "noise":
      filterz(previewcanvas, previewctx, $('#filterz').val());
      $('#filterzinfo').html($('#filterz').val());
      break;
      case "slicer":
      slicerz(previewctx, $('#slicerz').val());
      $('#slicerzinfo').html($('#slicerz').val());
      break;
      case "monochroma":
      monochroma(previewctx, $('#monochroma').val())
      $('#monochromainfo').html($('#monochroma').val());
      break;
      case "rgbdesync":
      rgbdesync(previewctx, $('#rgb1').val(), $('#rgbR').val(), $('#rgbG').val(), $('#rgbB').val());
      $('#rgb1info').html($('#rgb1').val());
      break;
      case "filtering":
      filtering(previewctx,$('#filtering').val());
      $('#filteringinfo').html($('#filtering').val());
      break;
      case "pixelate":
      pixelate(previewcanvas,previewctx,$('#pixelateon').val(),$('#pixelatemode').val(),$('#pixelateforce').val());
      $('#pixelateinfo').html($('#pixelateon').val());
      break;

    }
//labirynt(previewcanvas,previewctx,10);
  }

  if(gifrecording){
    encoder.addFrame(previewctx);
  }
  outputAnim = requestAnimationFrame(animoutput);
}




///DRAW LAYER 1
function animlayer1()
{

  canvas_layer_1.height = H;
  canvas_layer_1.width = W;
  context_layer_1.drawImage(LYR1, 0, 0, W, H);






  for (var i = 0; i < layer1sequence.length; i++)
  {

    switch (layer1sequence[i])
    {
      case "zoom":
      //console.log($('#zoomseed').val())
      zoom( canvas_layer_1,context_layer_1, $('#lr1zoomseed').val());
        $('#lr1zoominfo').html($('#lr1zoomseed').val());
      break;
      case "flip":
      flip(canvas_layer_1, context_layer_1, $('#lr1flip').val());
      $('#lr1flipinfo').html($('#lr1flip').val());
      break;
      case "latglitch":
      latglitch(canvas_layer_1, context_layer_1, $('#lr1latseed').val());
      $('#lr1seedinfo').html($('#lr1latseed').val());
      break;
      case "dither":
      dither(context_layer_1, $('#lr1dith').val());
      $('#lr1dithinfo').html($('#lr1dith').val());
      break;
      case "invert":
      invert(context_layer_1, $('#lr1inv').val());
      $('#lr1invinfo').html($('#lr1inv').val());
      break;
      case "mirror":
      mirror(canvas_layer_1, context_layer_1, $('#lr1mirror').val());
      $('#lr1mirrorinfo').html($('#lr1mirror').val());

      break;
      case "noise":
      filterz(canvas_layer_1, context_layer_1, $('#lr1filterz').val());
      $('#lr1filterzinfo').html($('#lr1filterz').val());
      break;
      case "slicer":
      slicerz(context_layer_1, $('#lr1slicerz').val());
      $('#lr1slicerzinfo').html($('#lr1slicerz').val());
      break;

      case "monochroma":
      monochroma(context_layer_1, $('#lr1monochroma').val())
      $('#lr1monochromainfo').html($('#lr1monochroma').val());
      break;
      case "rgbdesync":
      rgbdesync(context_layer_1, $('#lr1rgb1').val(), $('#lr1rgbR').val(), $('#lr1rgbG').val(), $('#lr1rgbB').val())
      $('#rgb1lr1info').html($('#lr1rgb1').val());
      break;
      case "filtering":
      filtering(context_layer_1,$('#lr1filtering').val());
      $('#lr1filteringinfo').html($('#lr1filtering').val());
      break;
      case "pixelate":
      pixelate(canvas_layer_1,context_layer_1,$('#lr1pixelateon').val(),$('#lr1pixelatemode').val(),$('#lr1pixelateforce').val());
      $('#lr1pixelateinfo').html($('#lr1pixelateon').val());
      break

    }
  }
  layerAnim1 = requestAnimationFrame(animlayer1);
}



///DRAW LAYER 2
function animlayer2()
{

  canvas_layer_2.height = H;
  canvas_layer_2.width = W;
  context_layer_2.drawImage(LYR2, 0, 0, W, H);



  for (var i = 0; i < layer2sequence.length; i++)
  {

    switch (layer2sequence[i])
    {
      case "zoom":
      //console.log($('#zoomseed').val())
      zoom( canvas_layer_2,context_layer_2, $('#lr2zoomseed').val());
        $('#lr2zoominfo').html($('#lr2zoomseed').val());
      break;
      case "flip":
      flip(canvas_layer_2, context_layer_2, $('#lr2flip').val());
      $('#lr2flipinfo').html($('#lr2flip').val());
      break;
      case "latglitch":
      latglitch(canvas_layer_2, context_layer_2, $('#lr2latseed').val());
      $('#lr2seedinfo').html($('#lr2latseed').val());
      break;
      case "dither":

      dither(context_layer_2, $('#lr2dith').val());
      $('#lr2dithinfo').html($('#lr2dith').val());
      break;
      case "invert":
      invert(context_layer_2, $('#lr2inv').val());
      $('#lr2invinfo').html($('#lr2inv').val());
      break;
      case "mirror":
      mirror(canvas_layer_2, context_layer_2, $('#lr2mirror').val());
      $('#lr2mirrorinfo').html($('#lr2mirror').val());

      break;
      case "noise":
      filterz(canvas_layer_2, context_layer_2, $('#lr2filterz').val());
      $('#lr2filterzinfo').html($('#lr2filterz').val());
      break;
      case "slicer":
      slicerz(context_layer_2, $('#lr2slicerz').val());
      $('#lr2slicerzinfo').html($('#lr2slicerz').val());
      break;

      case "monochroma":
      monochroma(context_layer_2, $('#lr2monochroma').val())
      $('#lr2monochromainfo').html($('#lr2monochroma').val());
      break;
      case "rgbdesync":
      rgbdesync(context_layer_2, $('#lr2rgb1').val(), $('#lr2rgbR').val(), $('#lr2rgbG').val(), $('#lr2rgbB').val())
        $('#rgb1lr2info').html($('#lr1rgb2').val());
      break;
      case "filtering":
      filtering(context_layer_2,$('#lr2filtering').val());
      $('#lr2filteringinfo').html($('#lr2filtering').val());
      break;
      case "pixelate":
      pixelate(canvas_layer_2,context_layer_2,$('#lr2pixelateon').val(),$('#lr2pixelatemode').val(),$('#lr2pixelateforce').val());
      $('#lr2pixelateinfo').html($('#lr2pixelateon').val());
      break

    }
  }
  layerAnim2 = requestAnimationFrame(animlayer2);
}


///


///source trigger FUNCTIONS

function triggA()
{

  if(typeof sourceA !== "undefined"){
	sourceA.move_to(0);
	sourceA.play;
	var srcbox = document.getElementById("imsource_A");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_A').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);

		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}

function triggZ()
{
  if(typeof sourceZ !== "undefined"){
	sourceZ.move_to(0);
	sourceZ.play;
	var srcbox = document.getElementById("imsource_Z");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_Z').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}

function triggE()
{
if(typeof sourceE !== "undefined"){
	sourceE.move_to(0);
	sourceE.play;
	var srcbox = document.getElementById("imsource_E");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_E').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}

function triggR()
{
  if(typeof sourceR !== "undefined"){
	sourceR.move_to(0);
	sourceR.play;
	var srcbox = document.getElementById("imsource_R");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_R').find('select').val() == "L1")
	{

		LYR1 = canvas;

		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}

function triggT()
{
  if(typeof sourceT !== "undefined"){
	sourceT.move_to(0);
	sourceT.play;
	var srcbox = document.getElementById("imsource_T");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_T').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}

function triggY()
{
  if(typeof sourceY !== "undefined"){
	sourceY.move_to(0);
	sourceY.play;
	var srcbox = document.getElementById("imsource_Y");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_Y').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggQ()
{
  if(typeof sourceQ !== "undefined"){
	sourceQ.move_to(0);
	sourceQ.play;
	var srcbox = document.getElementById("imsource_Q");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_Q').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggS()
{
  if(typeof sourceS !== "undefined"){
	sourceS.move_to(0);
	sourceS.play;
	var srcbox = document.getElementById("imsource_S");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_S').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggD()
{
  if(typeof sourceD !== "undefined"){
	sourceD.move_to(0);
	sourceD.play;
	var srcbox = document.getElementById("imsource_D");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_D').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggF()
{
  if(typeof sourceF !== "undefined"){
	sourceF.move_to(0);
	sourceF.play;
	var srcbox = document.getElementById("imsource_F");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_F').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggG()
{
  if(typeof sourceG !== "undefined"){
	sourceG.move_to(0);
	sourceG.play;
	var srcbox = document.getElementById("imsource_G");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_G').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggH()
{
  if(typeof sourceH !== "undefined"){
	sourceH.move_to(0);
	sourceH.play;
	var srcbox = document.getElementById("imsource_H");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_H').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggW()
{ if(typeof sourceW !== "undefined"){
	sourceW.move_to(0);
	sourceW.play;
	var srcbox = document.getElementById("imsource_W");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_W').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggX()
{
  if(typeof sourceX !== "undefined"){
	sourceX.move_to(0);
	sourceX.play;
	var srcbox = document.getElementById("imsource_X");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_X').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}

}
}
function triggC()
{
  if(typeof sourceC !== "undefined"){
	sourceC.move_to(0);
	sourceC.play;
	var srcbox = document.getElementById("imsource_C");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_C').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}

}
}
function triggV()
{
  if(typeof sourceV !== "undefined"){
	sourceV.move_to(0);
	sourceV.play;


	var srcbox = document.getElementById("imsource_V");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_V').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}

function triggB()
{
  if(typeof sourceB !== "undefined"){
	sourceB.move_to(0);
	sourceB.play;
	var srcbox = document.getElementById("imsource_B");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_B').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
function triggN()
{
  if(typeof sourceN !== "undefined"){
	sourceN.move_to(0);
	sourceN.play;
	var srcbox = document.getElementById("imsource_N");
	var canvas = srcbox.getElementsByTagName("canvas")[0];

	if ($('#source_N').find('select').val() == "L1")
	{

		LYR1 = canvas;
		//alert(LYR1);
		cancelAnimationFrame(layerAnim1);
		layerAnim1 = requestAnimationFrame(animlayer1);
	}
	else
	{
		LYR2 = canvas;
		cancelAnimationFrame(layerAnim2);
		layerAnim2 = requestAnimationFrame(animlayer2);
	}
}
}
////START AUDIO ENGINE

function getaudio(){
                meter = createAudioMeter(sndcontext);
                if (!navigator.getUserMedia)
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia ||
navigator.mozGetUserMedia || navigator.msGetUserMedia;

if (navigator.getUserMedia)
{
navigator.getUserMedia(
{
audio: true
}, success, function (e)
{
alert('Error getting audio input.');
});
}
else alert('getUserMedia not supported in this browser.');

function success(e)
{
  oscillo = sndcontext.createAnalyser();
    oscillo.fftSize = 2048;
    oscillobufferLength = oscillo.frequencyBinCount;
    oscillodataArray = new Uint8Array(oscillobufferLength);
source = sndcontext.createMediaStreamSource(e);
gain = sndcontext.createGain();
source.disconnect();
gain.disconnect();


//source.connect(gain);
source.connect(oscillo);
source.connect(meter);



//statusloop = setInterval(getaudiostatus, 50);



}



}



////STOP AUDIO engine

function stopaudio(){
	source.disconnect();
	gain.disconnect();
	meter = null;
	source=null;
	gain=null;
}

///
function recgif(){
  $('#messagebox').html('RECORDING AS GIF');
  $('#record').css({
    'background-color':'#0F0',
    'color':'#000'
  })
   encoder =null;
   encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(0);
        encoder.start();
        gifrecording=true;
}

function savegif(){
  $('#messagebox').html('STOP ... SAVING GIF');
  $('#record').css({
    'background-color':'#030',
    'color':'#0F0'
  })
  gifrecording=false;
  encoder.finish();
  var binary_gif = encoder.stream().getData() //notice this is different from the as3gif package!
  var data_url = 'data:image/gif;base64,'+encode64(binary_gif);



    window.open(data_url, "_blank")


  encoder =null;
  $('#messagebox').html('GIF SAVED');
}
function recaswebm(){
  $('#messagebox').html('RECORDING AS VIDEO');
  $('#record').css({
    'background-color':'#0F0',
    'color':'#000'
  })

recorder.record();
}

function savewebm(){
  $('#messagebox').html('STOP ... ENCODING VIDEO');
  $('#record').css({
    'background-color':'#030',
    'color':'#0F0'
  })
	recorder.stop(function(blob) {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
	  var filename = prompt("Please name your recording", "Glitch_Gif_Vj_Recording");
    if (filename != null) {
      var url = window.URL.createObjectURL(blob);
      a.href = url;

      a.download = filename+'.webm';
      a.click();
      window.URL.revokeObjectURL(url);
}


	});

}

///SOURCES PLAYBACK MODES this function is quite complex , and i think we can meke it more simple

function playbackctrl(mode,layer,loop,layermode,framesposition,ctrl){


switch (mode) {
	case "normal":
layermode="normal";
$('#speed'+ctrl).hide();
$('#ctrl_speed_'+ctrl).hide();
layer.pause();
layer.move_to(0);
layer.play(0);
		break;
  case "control_speed":
layermode="control_speed";
$('#speed'+ctrl).hide();
$('#ctrl_speed_'+ctrl).show();
layer.pause();

loop = requestAnimationFrame(animatesource);
		break;
	case "random":
layermode="random";
$('#speed'+ctrl).show();
$('#ctrl_speed_'+ctrl).hide();
layer.pause();
loop = requestAnimationFrame(animatesource);
	break;

}

function animatesource(){

switch(layermode){

case "control_speed":
console.log(layermode);
var e = $('#ctrl_speed_'+ctrl).val();
var k = Math.abs(e);
var f = layer.get_length(frames);


setTimeout(function() {
  if(e<0){

   layer.move_to(framesposition);
    framesposition--;
    if(framesposition<0){
   framesposition=f;
    }


 }else if(e>0){
   layer.move_to(framesposition);
  framesposition++;
   if(framesposition>f){

  framesposition=0;

   }

  }
loop = requestAnimationFrame(animatesource);

if($('#src_ctrl_'+ctrl).val()!=layermode){
  cancelAnimationFrame(loop);
  loop=null;
}
},k);



break;
case "random":
var h = $('#speed'+ctrl).val();

setTimeout(function() {
var z = layer.get_length(frames);
   var x = randInt(0,z);
  layer.move_to(parseInt(x));
loop = requestAnimationFrame(animatesource);
if($('#src_ctrl_'+ctrl).val()!=layermode){
  cancelAnimationFrame(loop);
  loop=null;
}

},h);

break;

}

}

}

function seqloop(){
    var bpm = $('#bpm').val();
    var rez = $('#beatrez').val()
    var time = (1000*60/bpm)/parseInt(rez);

     //$('#monitor').html(position)
     $(".step").css({"border":"none"})
     $(".step:nth-child("+(position+1)+")").css({"border":"2px solid lime"})


switch ($(".step:nth-child("+(position+1)+") option:selected").text()) {
  case "A":
    triggA();
    break;
  case "Z":
    triggZ();
    break;
  case "E":
    triggE();
    break;
  case "R":
    triggR();
    break;
  case "T":
    triggT();
    break;
  case "Y":
    triggY();
    break;
  case "Q":
    triggQ();
    break;
  case "S":
    triggS();
    break;
  case "D":
    triggD();
    break;
  case "F":
    triggF();
    break;
  case "G":
    triggG();
    break;
  case "H":
    triggH();
    break;
  case "W":
    triggW();
    break;
  case "X":
    triggX();
    break;
  case "C":
    triggC();
    break;
  case "V":
    triggV();
    break;
  case "B":
    triggB();
    break;
  case "N":
    triggN();
    break;

}


     setTimeout(function(){
        if(isplay){
       position++;
    if(position>=16){
      position=0;
    }

  requestId =  window.requestAnimationFrame(seqloop);
  }
     }, time);
}


function start(){
  $(".step").css({"border":"none"})
   position=0;
 if (!seqrequestId) {
    seqloop();
 }
}
function stop() {
 if (seqrequestId) {
    window.cancelAnimationFrame(seqrequestId);
    requestId = undefined;
 }
}
function seqrandomise() {

		$(".step select").each(function() {
				var options = $(this).children('option');
				var random = Math.floor(Math.random() * 16) + 0 ;
				options.attr('selected', false).eq(random).attr('selected', true);
		});
}

function ResetCount()
  {
  count = 0;
  average=0;tap=0;reset=0;
  }

function TapForBPM(e)
  {

  timeSeconds = new Date;
  msecs = timeSeconds.getTime();
  if ((msecs - msecsPrevious) > 1000 * 5)
    {
    count = 0;
    }

  if (count == 0)
    {

    msecsFirst = msecs;
    count = 1;
    }
  else
    {
    bpmAvg = 60000 * count / (msecs - msecsFirst);
    average = (Math.round(bpmAvg * 100)) / 100;
    count++;
    tap = count;
      $('#bpm').val(parseInt(average));
    }
  msecsPrevious = msecs;
  return true;
  }

  function randfx(){

    $('.ctrlblock input[type=range]').each(function(){
  if(randInt(0,10)>$('#randomfxforce').val()){
      $(this).val(randInt($(this).prop('min'),$(this).prop('max')));
  }  })
  }
