//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________   
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___|.3.1



///
///  VGA PATTERN GENERATOR
///
 function imagePatternVGA(bitmap,scale,rgbaSettings){

	rgbaSettings = rgbaSettings || {r:255,g:255,b:255,a:255};
	rgbaSettings.a = rgbaSettings.a || 255;

	scale = (scale > 0)?scale:1; // minimum scale:1x1

	var pattern_id = bitmap;

	var patternData = createImageData(2,2);

	var p = rgbaSettings; // could define custom red,green,blue values to change palette

	var bit_red = 1 << 2;
	var bit_green =  1 << 1;
	var bit_blue = 1 << 0;

	for(var i=0;i<patternData.data.length;i+=4){

		var n = i/4;
		var redBit = 4 << n;

		if(bitmap & bit_red) patternData.data[i] = p.r;
		if(bitmap & bit_green) patternData.data[i+1] = p.g;
		if(bitmap & bit_blue) patternData.data[i+2] = p.b;
		patternData.data[i+3] = p.a;

		bitmap = bitmap >> 3;
	}

	patternData = scaleImageData(patternData,scale);

	var imagePattern = imageDataToCanvas(patternData);

	return imagePattern;
};

 function canvasPatternVGA(bitmap,scale,rgbaSettings){

	rgbaSettings = rgbaSettings || {r:255,g:255,b:255,a:255};
	rgbaSettings.a = rgbaSettings.a || 255;

	var imagePattern = imagePatternVGA(bitmap,scale,rgbaSettings);
	var ctx = imagePattern.getContext('2d');
	var pattern = ctx.createPattern(imagePattern,'repeat');

	return pattern;
};

//
// Helper functions
//


 function createImageData(w, h) {
	return tmpCtx.createImageData(w, h);
};

 function imageDataToCanvas(imageData) {
    var canvas = newCanvas(imageData.width, imageData.height);
    canvas.getContext('2d').putImageData(imageData, 0, 0);
    return canvas;
};

 function newCanvas(w,h) {
	var c = document.createElement('canvas');
	c.width = w;
	c.height = h;
	return c;
};
 function scaleImageData(imageData,scale){

	scale = (scale>0)?scale:1;

	var output = createImageData(imageData.width*scale, imageData.height*scale);
	var w = imageData.width;
	var h = imageData.height;
	var dst = output.data;
	var d = imageData.data;

	for (var y=0; y<h; y++) {
		for (var x=0; x<w; x++) {

			var p = getPixel(imageData,x,y);

			var offsetX = x*scale;
			var offsetY = y*scale;
			for(var outY=0; outY<scale; outY++){
				for(var outX=0; outX<scale;outX++){

					setPixel(output,p,outX+offsetX,outY+offsetY);
				}
			}
			//setPixel(output,p,x*2,y*2);
			//setPixel(output,p,x*2+1,y*2);
			//setPixel(output,p,x*2,y*2+1);
			//setPixel(output,p,x*2+1,y*2+1);
		}
	}
	return output;
};

 function getPixel(imageData,x,y){

	var w = imageData.width;
	var h = imageData.height;
	var off = (y*w+x)*4;
	var d = imageData.data;

	return { r: d[off], g: d[off+1], b: d[off+2], a: d[off+3] };
};

 function setPixel(imageData,p,x,y){

	var w = imageData.width;
	var h = imageData.height;
	var off = (y*w+x)*4;
	var d = imageData.data;

	d[off] = p.r;
	d[off+1] = p.g;
	d[off+2] = p.b;
	d[off+3] = p.a;
};

////FX to make :  pixelate...






/// functions for Random generation and error adjusting
function randFloor(a)
{
  return Math.floor(Math.random() * a);
}
// return random # <= a
function randRound(a)
{
  return Math.round(Math.random() * a);
}
// return random # between A & B
function randRange(a, b)
{
  return Math.round(Math.random() * b) + a;
}

function adjustPixelError(data, i, error, multiplier)
{
  data[i] = data[i] + multiplier * error[0];
  data[i + 1] = data[i + 1] + multiplier * error[1];
  data[i + 2] = data[i + 2] + multiplier * error[2];
}
function randInt(a, b)
{
  return Math.random() * (b - a) + a;
}

function randDec(a,b)
{
  return (Math.random() * ((a+0.120) - (b+0.0200)) + (b+0.0200)).toFixed(8)
}

///FLIP
function flip(canv, ctx, ctrl){

switch(ctrl){
  case "0":

  break;
  case "1":
    ctx.save(); // Save the current state
    ctx.scale(-1, 1); // Set scale to flip the image
    ctx.drawImage(canv, -W, 0, W, H); // draw the image
    ctx.restore();

  break;
  case "2":
  ctx.save(); // Save the current state
  ctx.scale(1, -1); // Set scale to flip the image
  ctx.drawImage(canv, 0,-H , W, H); // draw the image
  ctx.restore();

  break;
  case "3":
  ctx.save(); // Save the current state
  ctx.scale(-1, -1); // Set scale to flip the image
  ctx.drawImage(canv, -W,-H , W, H); // draw the image
  ctx.restore();

  break;

}


}





function stopvga(){
  if(vgainterval!=null){

  cancelAnimationFrame(vgainterval);

  };
}

function makevga (){
  if(vgainterval!=null){

  cancelAnimationFrame(vgainterval);

  };
vgacanvas.height=H;
vgacanvas.width=W;
var rgbaSettings = {r:$('#vgaR').val(),g:$('#vgaG').val(),b:$('#vgaB').val(),a:$('#vgaA').val()};
if(vgardm){
  if(audioreactive){
     vgactx.fillStyle = canvasPatternVGA(randInt(0,$('#vgabitmap').val()),randInt(0,parseInt(meter.volume*$('#vgascale').val())),rgbaSettings);
  }else{
   //vgactx.drawImage( imagePatternVGA(44,2),0,0,W,H );
   vgactx.fillStyle = canvasPatternVGA(randInt(0,$('#vgabitmap').val()),randInt(0,$('#vgascale').val(),rgbaSettings));
   }
}else{
if(audioreactive){
   vgactx.fillStyle = canvasPatternVGA($('#vgabitmap').val(),parseInt(meter.volume*$('#vgascale').val()),rgbaSettings);
}else{
 //vgactx.drawImage( imagePatternVGA(44,2),0,0,W,H );
 vgactx.fillStyle = canvasPatternVGA($('#vgabitmap').val(),$('#vgascale').val(),rgbaSettings);
 }
 }
 vgactx.fillRect(0,0,W,H);

//vgactx.fillStyle = canvasPatternVGA($('#vgabitmap').val(),$('#vgascale').val());

vgainterval = requestAnimationFrame(makevga);

}


function glitcher(outcanvas,canvas_layer_1,canvas_layer_2,glitchcanvas,glitchctx){
  if(glitchinterval!=null){

 clearInterval(glitchinterval);

  };
  glitchcanvas.height=H;
  glitchcanvas.width=W;


glitchinterval = setInterval(function(){


  //  glitchctx.drawImage(canvas_layer_1,0,0,W,H);


if($('#glitchsrc').val()=="layer1"){
base64glitcher(canvas_layer_1,glitchctx,$('#glitch64force').val());
}else {
  base64glitcher(canvas_layer_2,glitchctx,$('#glitch64force').val());
}
},100);

}
function glitchstop(){
  if(glitchinterval!=null){

 clearInterval(glitchinterval);

  };
}

function grabvideoinput(){
video = document.createElement("video");
videoObj = {
               "video": true
           }, errBack = function(error) {

           };


           if (navigator.getUserMedia) {
               navigator.getUserMedia(videoObj, function(stream) {
                   video.src = stream;
                   webcam= true;
                   video.play();
               }, errBack);
           } else if (navigator.webkitGetUserMedia) {
               navigator.webkitGetUserMedia(videoObj, function(stream) {
                   video.src = window.webkitURL.createObjectURL(stream);
                   video.play();
webcam= true;
               }, errBack);
           } else if (navigator.mozGetUserMedia) {
               navigator.mozGetUserMedia(videoObj, function(stream) {
                   video.src = window.URL.createObjectURL(stream);
                   video.play();
webcam= true;
               }, errBack);
           }


//alert('video ok!');


var vid = requestAnimationFrame(videoloop);

function videoloop(){
  videocanvas.height=H;
  videocanvas.width=W;
  videoctx.drawImage(video,0,0,W,H);
   vid = requestAnimationFrame(videoloop);
}

           //drawLoop();

}

function stoposc(){

cancelAnimationFrame(oscinterval);
  oscctx.clearRect(0,0,W,H);
}

function animosc(){
console.log($('#osccolor2').val());
 oscinterval = requestAnimationFrame(oscloop);

function oscloop(){
  osccanvas.height=H;
  osccanvas.width=W;
  oscctx.clearRect(0,0,W,H);


  oscctx.globalCompositeOperation="color-dodge";

  oscillo.getByteTimeDomainData(oscillodataArray);
  oscctx.lineWidth = 8;
  oscctx.strokeStyle = $('#osccolor2').val();
  oscctx.beginPath();
  var sliceWidth = W * 1.0 / oscillobufferLength;
        var x = 0;
  for(var i = 0; i < oscillobufferLength; i++) {

          var v = oscillodataArray[i] / 128.0;
          var y = v * H/2;

          if(i === 0) {
            oscctx.moveTo(x, y);
          } else {
            oscctx.lineTo(x, y);
          }

          x += sliceWidth;
        }
  oscctx.lineTo(osccanvas.width, osccanvas.height/2);
        oscctx.stroke();
  oscctx.globalCompositeOperation="darken";
  oscctx.lineWidth = 4;
  oscctx.strokeStyle = $('#osccolor1').val();
  oscctx.beginPath();
  var sliceWidth = W * 1.0 / oscillobufferLength;
        var x = 0;
  for(var i = 0; i < oscillobufferLength; i++) {

          var v = oscillodataArray[i] / 128.0;
          var y = v * H/2;

          if(i === 0) {
            oscctx.moveTo(x, y);
          } else {
            oscctx.lineTo(x, y);
          }

          x += sliceWidth;
        }
  oscctx.lineTo(osccanvas.width, osccanvas.height/2);
  oscctx.stroke();





oscinterval = requestAnimationFrame(oscloop);
}

}

///TXT src

function animtxt(txtcanvas,txtctx){

console.log('animtxt '+$('#txt-mode').val());

 if(txtinterval!=null){

cancelAnimationFrame(txtinterval);

 };
 var Xposition = W;
 var txtsrc = ""
 var fontsize= 30;
 var charkit =[
   ['ed a1 19 96 ee 1b 0d 66', 'b6 dd 2f 34 31 7a bc 9d','▐ ░ ▒▐ ░ ▒ ▓ ▔ ▓ ▔',
'41 d6 39 3d ba cc cb b7', 'ff 40 d5 c3 4e 9e 01 a2', '▐ ▐ ░ ▒ ▓ ▔░ ▒ ▓ ▔',
'0c 51 ee 9d 9b d9 af 9e', 'ee f5 86 95 7e 61 da a1','<b>▐ ░ ▒ ▐ ░ ▒ ▓ ▔▓ ▔</b>' ,
'75 86 09갼갽░ ▒ 2a 06 18 61 3e', '7c 3b 5c d9 85 b7 4f 18', '▐ ░  ▐ ░ ▒ ▓ ▔ ▒',
'ac 99 81 db f7 88 90 2f', '6a 22 c4 7d bc e1 32 81', '가갻갼갽░ ▒▐ ░갾각갂간갺갿갅갷갸갹',
'90 d0 cc 2d 90 b6 23 bd', 'd9 c6 c7 e4 e0 32 e1 99', ' 僳 僴 僵 ▐ ░ ▒ ▓ ▔ 僶 僷',' 僸 價 ▐ ░ ▒ ▓ ▔ 僺 ','僻 僼 僽 僾 僿',
'c7 3e c1 fc 9c 갼갽░ ▒65 3c 3a', '2b 0d 04 12 3e 9c 3d 9c',
'7f 2f cf 59 e6 7d c4 ce', '06 2b b4 2a▓ ▔▓ 3f 14 c4 34',
'df a7 e9 c2 c0 56 a8 c3', 'f8 75 dd bc 97 74 5b 8c',
'48갼갽░ ▒ dc 32 45 11 b4 29 e1', 'e9 02 e7 e0 e0 f6 c3 2c',
'8a 40 bb c0 33 be ed 29', 'd1 c4 13 3b c3 b1 16 86',
'16 0c 36 1a 13 f6 c5 2a', '29 76 81 a7 7e f0 6d 05',
'<b>60 77 a9 34 47 7c 4f 77</b>', 'cb f1 ca ee 84 e7 96 58',
'62 bf 6f d0 69 ba a3 08', '11 36 9a db b9 0b 1c c1',
'63 85 5c 42 a7 b2 ac 60', '95 38 9e 97 00 0e e8 5b',],
    ["▀", "▁", "▂", "▃", "▄", "▅", "▆", "▇", "█", "▉", "▊", "▋", "▌", "▍", "▎", "▏", "▐", "░", "▒", "▓", "▔", "▕", "▖", "▗", "▘", "▙", "▚", "▛", "▜", "▝", "▞", "▟", "╠",
"╡", "╢", "╣", "╤", "╥", "╦", "╧", "╨", "╩", "╪", "╫", "╬", "╭", "╮", "╯", "╰", "╱", "╲", "╳", "╴", "╵", "╶", "╷", "╸", "╹", "╺", "╻", "╼", "╽", "╾", "╿", "╀", "╁", "╂", "╃", "╄", "╅",
"╆", "╇", "╈", "╉", "╊", "╋", "╌", "╍", "╎", "╏", "═", "║", "╒", "╓", "╔", "╕", "╖", "╗", "╘", "╙", "╚", "╛", "╜", "╝", "╞", "╟", "┠", "┡", "┢", "┣", "┤", "┥", "┦", "┧", "┨", "┩", "┪",
"┫", "┬", "┭", "┮", "┯", "┰", "┱", "┲", "┳", "┴", "┵", "┶", "┷", "┸", "┹", "┺", "┻", "┼", "┽", "┾", "┿", "─", "━", "│", "┃", "┄", "┅", "┆", "┇", "┈", "┉", "┊", "┋", "┌", "┍", "┎", "┏",
"┐", "┑", "┒", "┓", "└", "┕", "┖", "┗", "┘", "┙", "┚", "┛", "├", "┝", "┞", "┟"],
["\\","/","|","#","?","!","%","*","$","€","£","@","&"],
["0","1","0","0","1","1","0","1"],["\\","/","/","/","\\","\\","/","\\"],["f2", "71", "c1", "16", "08", "ea", "0d", "7f", "f5", "a6", "2f", "f7", "6f", "d0", "89", "69", "51", "63", "88", "32", "54", "a3", "0a","61","f7","e1","d0","6c","20","3f","a7","6e","7b","95","5b","45","88","cb","25","b4","de","0b","0e","2c","eb","85","d9","00","33","19","47","ec","b4","93","da","8b","1f","ec","bb","cd","75","f3","ff","e7","c4","3e","f2","25","4c","33","e0","a8","2f","38","05","56","dc","00","44","28","ca","be","84","ad","7e","c6","35","f7","eb","68","1e","0c","59","e6","cd","83","6a","c0","ce","b1","5d","f7","02","b3","4d","f7","fb","8a","8b","c6","c2","2b","d5","01","59","4c","45","75","88","a9","e4","06","78","60","94","37","bf","84","b8","f2","60","aa","e8","76","68","8e","86","b3","ff","46","8a","46","b8","ef","90","48","d4","34","22","64","1b","3d","41","28","12","bb","12","3d","b3","04"],
["╮","╯","╰","╱","╲","╳","╴","╵","╶","╷","╸","╹","╺","╻","╼","╽","╾","╿","▰","▱","◆","◇","◈","◉","◊","○","◌","◍","◎","●","◐","◑","◒","◓","◔","◕","◖","◗","◘","◙","◚","◛","◜","◝","◞","◟","◠","◡","◢","◣"],
["☢","☣","☠","㊚","㊛","☭","☪","✖"],
["▣","▤","▥","▦","▩"],
["║","╩","╠","═","╦","═","╦","═","╦","╦","╗","║","╚","╠","╬","╦","╣","╚","╣","╚","╦","╝","╠","═","╦","╦","╗","║","╦","║","╬","║","╬","║","╬","║","║","║","║","╔","║","║","╔","╣","╔","╣","║","║","╬","║","╬","║","║","║","╚","╩","╩","╩","╣","╔","╣","╔","╬","╗","║","═","╩","╩","╝","╚"],
["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z","1","2","3","4","5","6","7","8","9"],
["0","1","2","3","4","5","6","7","8","9"]];

//var txtsrc=$('#txtsource').val();
function randchar(z)
	{

		return z[Math.floor(Math.random() * z.length)];
	}

  txtinterval = requestAnimationFrame(txtloop);
function txtloop(){

  setTimeout(function(){
  txtcanvas.height=H;
  txtcanvas.width=W;
var tstring = $('#txty').val();

var fontfamily = "_"+$('#fontfamily').val();
var fontsize = $('#fontsize').val();
var font_size =fontsize+"px ";
switch(tstring.toString()){
case '7':
$('#txtsource').hide();
$('#txtmovespeed').hide();

txtctx.clearRect(0,0,W,H);

//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));
for(var w = 1;w<(H+(fontsize*2));w+=fontsize/1.5){
for(var i=-10;i<W;i+=fontsize/1.5){
//fontsi.toString+"px "+fontr.toString;
  txtctx.font=font_size+fontfamily;
  txtctx.fillStyle = $('#fontcolor').val();
  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),i,w);
}
}

break;
case '1':
$('#txtsource').hide();
$('#txtmovespeed').hide();



//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));
for(var w = 1;w<H+20;w+=20){
for(var i=1;i<W;i+=20){
//fontsi.toString+"px "+fontr.toString;
txtctx.clearRect(randInt(0,W),randInt(0,H),randInt(0,W),randInt(0,H));
  txtctx.font=font_size+fontfamily;
  txtctx.fillStyle = $('#fontcolor').val();


  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),i,w);
}
}

break;
case '2':
$('#txtsource').hide();
$('#txtmovespeed').hide();
txtctx.clearRect(0,0,W,H);

//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));
for(var w = 1;w<H+20;w+=randInt(1,40)){
for(var i=1;i<W;i+=randInt(1,40)){
//fontsi.toString+"px "+fontr.toString;
  txtctx.font=font_size+fontfamily;
  txtctx.fillStyle = $('#fontcolor').val();

  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),i,w);
}
}

break;
case '3':

$('#txtsource').hide();
$('#txtmovespeed').hide();
//txtctx.clearRect(randInt(-W,W),randInt(-H,H),randInt(0,W),randInt(0,H));
//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));
for(var w = 2;w<H;w+=fontsize){
  //fontsize3 = randInt(1,50);
for(var i=2;i<W;i+=fontsize){
var fontsize2 = randInt(1,fontsize);
    font_size =fontsize2+"px "
  //txtctx.globalCompositeOperation="difference";

  txtctx.font=font_size+fontfamily;
  txtctx.fillStyle =  $('#fontcolor').val();
  //txtctx.globalCompositeOperation = compmode[$('#txtcompmode').val()];
  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),randInt(-W/2,W+W/2),randInt(-H/2,H+H/2));
}

}

break;
case '4':

$('#txtsource').hide();
$('#txtmovespeed').hide();
txtctx.clearRect(randInt(0,W),randInt(0,H),randInt(0,W),randInt(0,H));
//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));
for(var w = 2;w<H;w+=fontsize){
  //fontsize3 = randInt(1,50);
for(var i=2;i<W;i+=fontsize){
var fontsize2 = randInt(1,fontsize);
    font_size =fontsize2+"px "
  //txtctx.globalCompositeOperation="difference";

  txtctx.font=font_size+fontfamily;
  txtctx.fillStyle =  $('#fontcolor').val();
  //txtctx.globalCompositeOperation = compmode[$('#txtcompmode').val()];
  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),randInt(-W/2,W+W/2),randInt(-H/2,H+H/2));
}

}

break;
case '5':
$('#txtsource').hide();
$('#txtmovespeed').hide();
//txtctx.clearRect(randInt(-W,W),randInt(-H,H),randInt(0,W),randInt(0,H));
//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));

for(var w = 2;w<H;w+=fontsize){
  //fontsize3 = randInt(1,50);
for(var i=2;i<W;i+=fontsize){
var fontsize2 = randInt(1,fontsize);
    font_size =fontsize2+"px "
  //txtctx.globalCompositeOperation="difference";
txtctx.globalAlpha=0.6;
  txtctx.font=font_size+fontfamily;
  txtctx.fillStyle =  $('#fontcolor').val();
  //txtctx.globalCompositeOperation = compmode[$('#txtcompmode').val()];
  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),randInt(-W/2,W+W/2),randInt(-H/2,H+H/2));
}

}

break;
case '6':
$('#txtsource').hide();
$('#txtmovespeed').hide();

var xfontsize=randInt(1,fontsize);

txtctx.clearRect(randInt(0,W),randInt(0,H),randInt(0,W),randInt(0,H));

//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));

for(var w = 2;w<H;w+=xfontsize){

for(var i=2;i<W;i+=xfontsize){
    xfontsize = randInt(1,fontsize);
  //txtctx.globalCompositeOperation="difference";
  var u = ""+xfontsize+"px "+fontfamily+"";
  txtctx.font=u;
  txtctx.fillStyle = '#'+Math.floor(Math.random()*16777215).toString(16);
  txtctx.fillText(randchar(charkit[$('#txt-mode').val()]),randInt(-W/2,W+W/2),randInt(-H/2,H+H/2));
}

}

break;
case '0':
$('#txtsource').show();
$('#txtmovespeed').show();
var xfontsize=randInt(1,fontsize);

txtctx.clearRect(0,0,W,H);

//txtctx.fillText(txtsrc,randInt(0,W),randInt(0,H));
var text = $('#txtsource').val();

textWidth = (text.length*fontsize);
console.log(textWidth);
txtctx.font=font_size+fontfamily;
  txtctx.fillStyle = $('#fontcolor').val();
txtctx.fillText(text,Xposition,(H/2)+(fontsize/2));
Xposition-=$('#txtmovespeed').val();
if(Xposition<(-textWidth)){
  Xposition = W;
}
break;

}
if(txton){
txtinterval = requestAnimationFrame(txtloop);
}
},$('#txtspeedloop').val());

}

}

function stoptxtanim(){
  cancelAnimationFrame(txtinterval);
  if(txtinterval!=null){

txtctx.clearRect(0,0,W,H);
cancelAnimationFrame(txtinterval);

  };
}



////MIRROR

function mirror(canv, ctx, ctrl)
{
var xt= (audioreactive ? (meter.volume*10):0);
  switch (ctrl)
  {
    case "1":
    ctx.save();

    ctx.translate(W / (4+xt), 0-xt);

    ctx.scale(-1, 1);

    ctx.drawImage(canv,
      /*source */
      W / (2+xt), 0, W / (2-xt), H,
      /*destination*/
      -W / (4-xt), 0, W / (2+xt), H);

    ctx.restore();

    break;

    case "2":
    ctx.save();

    ctx.translate(W / (2-xt), 0);

    ctx.scale(-1, (1+xt));

    ctx.drawImage(canv,
      /*source */
      0, 0, W / (2+xt), H,
      /*destination*/
      -W / (2+xt), 0, W / (2-xt), H);

    ctx.restore();

    break;
    case "3":
    ctx.save();
    ctx.translate(0, H / 4);
    ctx.scale(1, -1);

    ctx.drawImage(canv, 0, H / 2, W, H / 2, 0, -H / 4, W, H / 2);
    ctx.restore();
    break;

    case "4":

    ctx.save();
    ctx.translate(0, H / 2);
    ctx.scale(1, -1);

    ctx.drawImage(canv, 0, 0, W, H / 2, 0, -H / 2, W, H / 2);
    ctx.restore();

    break;
    case "5":
    ctx.save();

    ctx.translate(W / 4, 0);

    ctx.scale(-1, 1);

    ctx.drawImage(canv,
      /*source */
      W / 2, 0, W / 2, H,
      /*destination*/
      -W / 4, 0, W / 2, H);
    // restore context
    ctx.restore();

    ctx.save();
    ctx.translate(0, H / 2);
    ctx.scale(1, -1);

    ctx.drawImage(canv, 0, 0, W, H / 2, 0, -H / 2, W, H / 2);
    ctx.restore();

    break;

    case "6":
    ctx.save();

    ctx.translate(W / 2, 0);

    ctx.scale(-1, 1);

    ctx.drawImage(canv,
      /*source */
      0, 0, W / 2, H,
      /*destination*/
      -W / 2, 0, W / 2, H);

    ctx.restore();
    ctx.save();
    ctx.translate(0, H / 2);
    ctx.scale(1, -1);

    ctx.drawImage(canv, 0, 0, W, H / 2, 0, -H / 2, W, H / 2);
    ctx.restore();

    break;

    case "7":
    ctx.save();

    ctx.translate(W / 4, 0);

    ctx.scale(-1, 1);

    ctx.drawImage(canv,
      /*source */
      W / 2, 0, W / 2, H,
      /*destination*/
      -W / 4, 0, W / 2, H);

    ctx.restore();
    ctx.save();
    ctx.translate(0, H / 2);
    ctx.scale(1, -1);

    ctx.drawImage(canv, 0, 0, W, H / 2, 0, -H / 2, W, H / 2);
    ctx.restore();

    break;

    case "8":
    ctx.save();

    ctx.translate(W / 2, 0);

    ctx.scale(-1, 1);

    ctx.drawImage(canv,
      /*source */
      0, 0, W / 2, H,
      /*destination*/
      -W / 2, 0, W / 2, H);

    ctx.restore();

    ctx.save();
    ctx.translate(0, H / 2);
    ctx.scale(1, -1);

    ctx.drawImage(canv, 0, 0, W, H / 2, 0, -H / 2, W, H / 2);
    ctx.restore();

    break;
    case "9":
    ctx.save();

    ctx.translate(W / 4, 0);

    ctx.scale(-1, 1);

    ctx.drawImage(canv,
      /*source */
      0, 0, W / 2, H,
      /*destination*/
      W / 4, 0, -W / 2, H);

    ctx.restore();

    break;


    case "10":

    ctx.save();

    ctx.scale(1+xt, 1+xt);

    ctx.drawImage(canv,-xt*100,-xt*100,W,H);

    ctx.restore();


    break;
    case "0":

    break;

  }

}


//// LATERAL GLITCHER


function latglitch(incanv, outctx, ctrl)
{



  if (ctrl != 0)
  {
    var latseed = randInt(0, (audioreactive ? parseInt((meter.volume*ctrl)) : ctrl));

    for (var i = 0; i < latseed; i++)
    {
      var x = Math.random() * W;
      var y = Math.random() * H;
      var SW = W - x;
      var SH = randInt(5, H / 4);
      outctx.drawImage(incanv, 0, y, SW, SH, x, y, SW, SH);
      outctx.drawImage(incanv, SW, y, x, SH, 0, y, x, SH);
    }
  }
}


///RGB DESYNC
function rgbdesync(ctx, ctrl1, ctrl2, ctrl3, ctrl4)
{
  if (ctrl1 != 0)
  {
    //var r = ctrl2;
    //var g = ctrl3;
    //var b = ctrl4;
    var randR = Math.floor(Math.random()*ctrl2);
var randG = Math.floor(Math.random()*ctrl3)*3;
var randB = Math.floor(Math.random()*ctrl4);

    var imageData = ctx.getImageData(0, 0, W, H);
    var data = imageData.data;

    for(var i = 0, len = imageData.width * imageData.height; i<len; i++){

    data[i*4 + 0] = data[(i + randR)*4 + 0];
    data[i*4 + 1] = data[(i + randG)*4 + 1];
    data[i*4 + 2] = data[(i + randB)*4 + 2];
    data[i*4 + 3] = 255;
  }

    ctx.putImageData(imageData, 0, 0, 0, 0, W, H);
  }
}



/// SLICER


function slicerz(ctx, ctrl)
{

  switch (ctrl)
  {
    case "0":

    break;
    case "1":
    var imageData = ctx.getImageData(0, 0, W, H);
    slice(imageData);
    ctx.putImageData(imageData, 0, 0);
    break;
    case "2":
    var imageData = ctx.getImageData(0, 0, W, H);
    slice2(imageData);
    ctx.putImageData(imageData, 0, 0);
    break;
    case "3":
    var imageData = ctx.getImageData(0, 0, W, H);
    slice3(imageData);
    ctx.putImageData(imageData, 0, 0);
    break;
    case "4":
    var imageData = ctx.getImageData(0, 0, W, H);
    superSlice(imageData);
    ctx.putImageData(imageData, 0, 0);
    break;
    case "5":
    var imageData = ctx.getImageData(0, 0, W, H);
    superSlice2(imageData);
    ctx.putImageData(imageData, 0, 0);
    break;

  }

}

function slice(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data,
  cutend = randFloor(width * height * 4),
  cutstart = Math.floor(cutend / 1.7),
  cut = data.subarray(cutstart, cutend);
  data.set(cut, randFloor((width * height * 4) - cut.length));
  imageData.data.set(data);
  return imageData;
}

function slice2(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var i = 0, l = randRound(11); i < l; i++)
  {
    var cutend = Math.random() < 0.75 ? randFloor(width * height * 4) :
    (width * height * 4),
    cutstart = Math.floor(cutend / 1.7),
    cut = data.subarray(cutstart, cutend);
    //data.set(cut, randFloor(width * height * 2));
    data.set(cut, randFloor((width * height * 4) - cut.length));
  }
  imageData.data.set(data);
  return imageData;
}

function slice3(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var i = 0, l = randRound(20); i < l; i++)
  {
    var cutend = randFloor(width * height * 4),
    cutstart = cutend - randRange(1000, 5100),
    cut = data.subarray(cutstart, cutend);
    data.set(cut, randFloor((width * height * 4) - cut.length));
    //data.set(cut, randFloor(width * height * 2));
  }
  imageData.data.set(data);
  return imageData;
}

function superSlice2(imageData)
{
  var functs = [slice, slice2, slice3];
  for (var i = 0, l = randRound(functs.length); i < l; i++)
  {
    var fun = randFloor(functs.length);
    imageData = functs[fun](imageData);
  }
  return imageData;
}

function superSlice(imageData)
{
  for (var i = 0, l = randRange(1, 10); i < l; i++)
  {
    imageData = slice(slice2(slice3(imageData)));
  }
  return imageData;
}






///DITHER FX
function dither(inctx, mode)
{
  //var dithmode = $('#ditmode').val();
  if (mode != 0)
  {
    var imageData = inctx.getImageData(0, 0, W, H);

    switch (mode)
    {
      case "9":
      dither8Bit(imageData);
      break;
      case "1":
      ditherHalftone(imageData);
      break;
      case "2":
      ditherAtkinsons(imageData);
      break;
      case "3":
      ditherFloydSteinberg(imageData);
      break;
      case "4":
      ditherBayer(imageData);
      break;
      case "5":
      ditherBayer3(imageData);
      break;
      case "6":
      ditherRandom(imageData);
      break;
      case "7":
      ditherRandom3(imageData);
      break;
      case "8":
      ditherBitmask(imageData);
      break;
    }

    inctx.putImageData(imageData, 0, 0);
  }
}

function dither8Bit(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data,
  size = 4,
  sum_r, sum_g, sum_b, avg_r, avg_g, avg_b;
  for (var y = 0; y < height; y += size)
  {
    for (var x = 0; x < width; x += size)
    {
      sum_r = 0;
      sum_g = 0;
      sum_b = 0;
      for (var s_y = 0; s_y < size; s_y++)
      {
        for (var s_x = 0; s_x < size; s_x++)
        {
          var i = 4 * (width * (y + s_y) + (x + s_x));
          sum_r += data[i];
          sum_g += data[i + 1];
          sum_b += data[i + 2];
        }
      }
      avg_r = (sum_r / (size * size)) > 127 ? 0xff : 0;
      avg_g = (sum_g / (size * size)) > 127 ? 0xff : 0;
      avg_b = (sum_b / (size * size)) > 127 ? 0xff : 0;
      for (var s_y = 0; s_y < size; s_y++)
      {
        for (var s_x = 0; s_x < size; s_x++)
        {
          i = 4 * (width * (y + s_y) + (x + s_x));
          data[i] = avg_r;
          data[i + 1] = avg_g;
          data[i + 2] = avg_b;
        }
      }
    }
  }
  return imageData;
}

function ditherHalftone(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var y = 0; y <= height - 2; y += 3)
  {
    for (var x = 0; x <= width - 2; x += 3)
    {
      var sum_r = 0,
      sum_g = 0,
      sum_b = 0;
      var indexed = [];
      var count = 0;
      for (var s_y = 0; s_y < 3; s_y++)
      {
        for (var s_x = 0; s_x < 3; s_x++)
        {
          var i = 4 * (width * (y + s_y) + (x + s_x));
          sum_r += data[i];
          sum_g += data[i + 1];
          sum_b += data[i + 2];
          data[i] = data[i + 1] = data[i + 2] = 0xff;
          indexed.push(i);
          count++;
        }
      }
      var avg_r = (sum_r / 9) > 127 ? 0xff : 0;
      var avg_g = (sum_g / 9) > 127 ? 0xff : 0;
      var avg_b = (sum_b / 9) > 127 ? 0xff : 0;
      var avg_lum = (avg_r + avg_g + avg_b) / 3;
      var scaled = Math.round((avg_lum * 9) / 255);
      if (scaled < 9)
      {
        data[indexed[4]] = avg_r;
        data[indexed[4] + 1] = avg_g;
        data[indexed[4] + 2] = avg_b;
      }
      if (scaled < 8)
      {
        data[indexed[5]] = avg_r;
        data[indexed[5] + 1] = avg_g;
        data[indexed[5] + 2] = avg_b;
      }
      if (scaled < 7)
      {
        data[indexed[1]] = avg_r;
        data[indexed[1] + 1] = avg_g;
        data[indexed[1] + 2] = avg_b;
      }
      if (scaled < 6)
      {
        data[indexed[6]] = avg_r;
        data[indexed[6] + 1] = avg_g;
        data[indexed[6] + 2] = avg_b;
      }
      if (scaled < 5)
      {
        data[indexed[3]] = avg_r;
        data[indexed[3] + 1] = avg_g;
        data[indexed[3] + 2] = avg_b;
      }
      if (scaled < 4)
      {
        data[indexed[8]] = avg_r;
        data[indexed[8] + 1] = avg_g;
        data[indexed[8] + 2] = avg_b;
      }
      if (scaled < 3)
      {
        data[indexed[2]] = avg_r;
        data[indexed[2] + 1] = avg_g;
        data[indexed[2] + 2] = avg_b;
      }
      if (scaled < 2)
      {
        data[indexed[0]] = avg_r;
        data[indexed[0] + 1] = avg_g;
        data[indexed[0] + 2] = avg_b;
      }
      if (scaled < 1)
      {
        data[indexed[7]] = avg_r;
        data[indexed[7] + 1] = avg_g;
        data[indexed[7] + 2] = avg_b;
      }
    }
  }
  return imageData;
}

function ditherAtkinsons(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      var i = 4 * (y * width + x);
      var old_r = data[i];
      var old_g = data[i + 1];
      var old_b = data[i + 2];
      var new_r = (old_r > 127) ? 0xff : 0;
      var new_g = (old_g > 127) ? 0xff : 0;
      var new_b = (old_b > 127) ? 0xff : 0;
      data[i] = new_r;
      data[i + 1] = new_g;
      data[i + 2] = new_b;
      var err_r = old_r - new_r;
      var err_g = old_g - new_g;
      var err_b = old_b - new_b;
      // Redistribute the pixel's error like this:
      //       *  1/8 1/8
      //  1/8 1/8 1/8
      //      1/8
      // The ones to the right...
      var adj_i = 0;
      if (x < width - 1)
      {
        adj_i = i + 4;
        adjustPixelError(data, adj_i, [err_r, err_g, err_b], 1 / 8);
        // The pixel that's down and to the right
        if (y < height - 1)
        {
          adj_i = adj_i + (width * 4) + 4;
          adjustPixelError(data, adj_i, [err_r, err_g, err_b], 1 / 8);
        }
        // The pixel two over
        if (x < width - 2)
        {
          adj_i = i + 8;
          adjustPixelError(data, adj_i, [err_r, err_g, err_b], 1 / 8);
        }
      }
      if (y < height - 1)
      {
        // The one right below
        adj_i = i + (width * 4);
        adjustPixelError(data, adj_i, [err_r, err_g, err_b], 1 / 8);
        if (x > 0)
        {
          // The one to the left
          adj_i = adj_i - 4;
          adjustPixelError(data, adj_i, [err_r, err_g, err_b], 1 / 8);
        }
        if (y < height - 2)
        {
          // The one two down
          adj_i = i + (2 * width * 4);
          adjustPixelError(data, adj_i, [err_r, err_g, err_b], 1 / 8);
        }
      }
    }
  }
  return imageData;
}

function ditherFloydSteinberg(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      var i = 4 * (y * width + x);
      var old_r = data[i];
      var old_g = data[i + 1];
      var old_b = data[i + 2];
      var new_r = (old_r > 127) ? 0xff : 0;
      var new_g = (old_g > 127) ? 0xff : 0;
      var new_b = (old_b > 127) ? 0xff : 0;
      data[i] = new_r;
      data[i + 1] = new_g;
      data[i + 2] = new_b;
      var err_r = old_r - new_r;
      var err_g = old_g - new_g;
      var err_b = old_b - new_b;
      // Redistribute the pixel's error like this:
      //   * 7
      // 3 5 1
      // The ones to the right...
      var right_i = 0,
      down_i = 0,
      left_i = 0,
      next_right_i = 0;
      if (x < width - 1)
      {
        right_i = i + 4;
        adjustPixelError(data, right_i, [err_r, err_g, err_b], 7 / 16);
        // The pixel that's down and to the right
        if (y < height - 1)
        {
          next_right_i = right_i + (width * 4);
          adjustPixelError(data, next_right_i, [err_r, err_g, err_b],
            1 / 16);
        }
      }
      if (y < height - 1)
      {
        // The one right below
        down_i = i + (width * 4);
        adjustPixelError(data, down_i, [err_r, err_g, err_b], 5 / 16);
        if (x > 0)
        {
          // The one down and to the left...
          left_i = down_i - 4;
          adjustPixelError(data, left_i, [err_r, err_g, err_b], 3 /
            16);
        }
      }
    }
  }
  return imageData;
}

function ditherBayer(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data,
  /* added more threshold maps and the randomizer, the rest is stock */
  threshold_maps = [
  [
  [3, 7, 4],
  [6, 1, 9],
  [2, 8, 5]
  ],
  [
  [1, 9, 3, 11],
  [13, 5, 15, 7],
  [4, 12, 2, 10],
  [16, 8, 14, 6]
  ],
  [
  [1, 49, 13, 61, 4, 52, 16, 64],
  [33, 17, 45, 29, 36, 20, 48, 32],
  [9, 57, 5, 53, 12, 60, 8, 56],
  [41, 25, 37, 21, 44, 28, 40, 24],
  [3, 51, 15, 63, 2, 50, 14, 62],
  [35, 19, 47, 31, 34, 18, 46, 30],
  [11, 59, 7, 55, 10, 58, 6, 54],
  [43, 27, 39, 23, 42, 26, 38, 22]
  ]
  ],
  threshold_map = threshold_maps[randFloor(threshold_maps.length)],
  size = threshold_map.length;
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      var i = 4 * (y * width + x);
      var gray = 0.3 * data[i] + 0.59 * data[i + 1] + 0.11 * data[i + 2];
      var scaled = (gray * 17) / 255;
      var val = scaled < threshold_map[x % size][y % size] ? 0 : 0xff;
      data[i] = data[i + 1] = data[i + 2] = val;
    }
  }
  return imageData;
}

function ditherBayer3(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data,
  /* adding in more threshold maps, and the randomizer */
  threshold_maps = [
  [
  [3, 7, 4],
  [6, 1, 9],
  [2, 8, 5]
  ],
  [
  [1, 9, 3, 11],
  [13, 5, 15, 7],
  [4, 12, 2, 10],
  [16, 8, 14, 6]
  ],
  [
  [1, 49, 13, 61, 4, 52, 16, 64],
  [33, 17, 45, 29, 36, 20, 48, 32],
  [9, 57, 5, 53, 12, 60, 8, 56],
  [41, 25, 37, 21, 44, 28, 40, 24],
  [3, 51, 15, 63, 2, 50, 14, 62],
  [35, 19, 47, 31, 34, 18, 46, 30],
  [11, 59, 7, 55, 10, 58, 6, 54],
  [43, 27, 39, 23, 42, 26, 38, 22]
  ]
  ],
  threshold_map = threshold_maps[randFloor(threshold_maps.length)],
  size = threshold_map.length;
  for (var y = 0; y < height; y++)
  {
    for (var x = 0; x < width; x++)
    {
      var i = 4 * (y * width + x);
      /* apply the tranformation to each color */
      data[i] = ((data[i] * 17) / 255) < threshold_map[x % size][y %
      size] ? 0 : 0xff;
      data[i + 1] = ((data[i + 1] * 17) / 255) < threshold_map[x %
      size][y % size] ? 0 : 0xff;
      data[i + 2] = ((data[i + 2] * 17) / 255) < threshold_map[x %
      size][y % size] ? 0 : 0xff;
    }
  }
  return imageData;
}

function ditherRandom(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var i = 0, val, scaled, size = width * height * 4; i < size; i += 4)
  {
    scaled = ((data[i] + data[i + 1] + data[i + 2]) / 3) % 255;
    val = scaled < randRound(128) ? 0 : 0xff;
    data[i] = data[i + 1] = data[i + 2] = val;
  }
  return imageData;
}

function ditherRandom3(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data;
  for (var i = 0, size = width * height * 4; i < size; i += 4)
  {
    data[i] = data[i] < randRound(128) ? 0 : 0xff;
    data[i + 1] = data[i + 1] < randRound(128) ? 0 : 0xff;
    data[i + 2] = data[i + 2] < randRound(128) ? 0 : 0xff;
  }
  return imageData;
}

function ditherBitmask(imageData)
{
  var width = imageData.width,
  height = imageData.height,
  data = imageData.data,
  M = randRange(1, 125);
  // 0xc0; 2 bits
  // 0xe0  3 bits
  // 0xf0  4 bits
  for (var i = 0, size = width * height * 4; i < size; i += 4)
  {
    // data[i] |= M;
    // data[i + 1] |= M;
    // data[i + 2] |= M;
    data[i] |= M;
    data[i + 1] |= M;
    data[i + 2] |= M;
  }
  return imageData;
}



////INVERT

function invert(inctx, ctrl)
{
  if (ctrl != 0)
  {
    var imageData = inctx.getImageData(0, 0, W, H);
    var data = imageData.data;

    for (var i = 0; i < data.length; i += 4)
    {

      data[i] = 255 - data[i];

      data[i + 1] = 255 - data[i + 1];

      data[i + 2] = 255 - data[i + 2];
    }

    inctx.putImageData(imageData, 0, 0);
  }
}



////NOISE FILTERS

function filterz(canv, ctx, ctrl)
{

  switch (ctrl)
  {

    case "1":
    /// HALF BREAK GLITCH
    ///

    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < W; x++)
    {
      for (var y = 0; y < H / 2; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 4; // Pixel origin

        // Get pixel
        var r = data[offset];
        var g = data[offset + 1];
        var b = data[offset + 2];
        var a = data[offset + 3];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * 4;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;

    case "2":
    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < W / 4; x++)
    {
      for (var y = 0; y < H; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H / 2 * x) + y) * (audioreactive ? meter.volume*400 : 40); // Pixel origin

        // Get pixel
        var r = data[offset];
        var g = data[offset + 1];
        var b = data[offset + 2];
        var a = data[offset + 3];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 4)) * 2 + Math.floor(Math.random() * 20);

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;
    case "3":
    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < W; x++)
    {
      for (var y = 0; y < H / 8; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 4; // Pixel origin

        // Get pixel
        var r = data[offset];
        var g = data[offset + 1];
        var b = data[offset + 2];
        var a = data[offset + 3];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * Math.floor(Math.random() * (audioreactive ? meter.volume*400 : 200));

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;
    case "4":
    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < W; x++)
    {
      for (var y = 0; y < H / 2; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * Math.floor(Math.random() * (audioreactive ? meter.volume*200 :20)); // Pixel origin

        // Get pixel
        var r = data[offset];
        var g = data[offset + 1 + 4];
        var b = data[offset + 2 + 4];
        var a = data[offset + 3 + 4];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * 5;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;

    case "5":
    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < W; x++)
    {
      for (var y = 0; y < H / 2; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 7; // Pixel origin
        var gg = Math.floor(Math.random() * (audioreactive ? meter.volume*4000 : 200));
        // Get pixel
        var r = data[offset];
        var g = data[offset + 1 + gg];
        var b = data[offset + 2 + gg];
        var a = data[offset + 3 + gg];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * 5;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);
    break;
    case "6":

    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < W; x++)
    {
      for (var y = 0; y < H / 2; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 14; // Pixel origin
        var gg = Math.floor(Math.random() * (audioreactive ? meter.volume*7000 :700));
        // Get pixel
        var r = data[offset];
        var g = data[offset + 1 + gg + 2];
        var b = data[offset + 2 + gg + 1];
        var a = data[offset + 3 + gg];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * 5;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;

    case "7":
    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < H; x++)
    {
      for (var y = 0; y < W / 7; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 14; // Pixel origin
        var gg = Math.floor(Math.random() * (audioreactive ? meter.volume*7000 : 700));
        var hh = Math.floor(Math.random() * (audioreactive ? meter.volume*400 :7));
        // Get pixel
        var r = data[offset];
        var g = data[offset + 1 + gg + hh];
        var b = data[offset + 2 + gg + hh];
        var a = data[offset + 3 + gg + hh];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * 5 + hh;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;

    case "8":
    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < H; x++)
    {
      for (var y = 0; y < W; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 14; // Pixel origin
        var gg = Math.floor(Math.random() * (audioreactive ? meter.volume*4000 :700));
        var hh = Math.floor(Math.random() * gg);
        // Get pixel
        var r = data[offset];
        var g = data[offset + 1 + gg + hh];
        var b = data[offset + 2 + gg + hh];
        var a = data[offset + 3 + gg + hh];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * 5 + hh;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;

    case "9":

    var imgdata = ctx.getImageData(0, 0, W, H);
    var data = imgdata.data;

    for (var x = 0; x < H; x++)
    {
      for (var y = 0; y < W; y++)
      { // divide by 2 to only loop through the left half of the image.
        var offset = ((H * x) + y) * 14; // Pixel origin
        var gg = Math.floor(Math.random() * (audioreactive ? meter.volume*8000 :700));
        var hh = Math.floor(Math.random() * gg);
        // Get pixel
        var r = data[offset];
        var g = data[offset + 1 + hh];
        var b = data[offset + 2 + gg];
        var a = data[offset + 3 + hh];

        // Calculate how far to the right the mirrored pixel is
        var mirrorOffset = (H - (y * 2)) * hh;

        // Get set mirrored pixel's colours
        data[offset + mirrorOffset] = r;
        data[offset + 1 + mirrorOffset] = g;
        data[offset + 2 + mirrorOffset] = b;
        data[offset + 3 + mirrorOffset] = a;
      }
    }

    ctx.putImageData(imgdata, 0, 0);

    break;

  }

}

function zoom(canvas,ctx,ctrl)
{
//console.log(ctrl);
if(ctrl!=0){
var scale= (audioreactive ? meter.volume*ctrl : ctrl);
var cx=W/2;
var cy=H/2;
ctx.save();
ctx.translate(cx,cy);
ctx.scale(scale,scale);
ctx.drawImage(canvas,-W/2,-H/2);
ctx.restore();
}
};


//filterbank

function filtering(ctx,ctrl){
  switch(ctrl){
  case "0":

  break;
  case "1":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;

  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.2126*r + 0.7152*g + 0.0722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  ctx.putImageData(imageData, 0, 0);
  break;
  case "2":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;

  for (var i=0; i<d.length; i+=4) {
    var r = d[i];
    var g = d[i+1];
    var b = d[i+2];
    // CIE luminance for the RGB
    // The human eye is bad at seeing red and blue, so we de-emphasize them.
    var v = 0.5555*r + 0.007152*g + 1.8722*b;
    d[i] = d[i+1] = d[i+2] = v
  }
  ctx.putImageData(imageData, 0, 0);
  break;
  case "3":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
  		{
  			var r = d[i],
  				g = d[i+1],
  				b = d[i+2];
  			d[i] = (r * .393) + (g *.769) + (b * .189)
  			d[i+1] = (r * .349) + (g *.686) + (b * .168)
  			d[i+2] = (r * .272) + (g *.534) + (b * .131)
  		}
  ctx.putImageData(imageData, 0, 0);
  break;
  case "4":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
  		{
  			var r = d[i],
  				g = d[i+1],
  				b = d[i+2];
  			d[i] = r;
  			d[i+1] = g;
  			d[i+2] = g;
  		}
        ctx.putImageData(imageData, 0, 0);
  break;
  case "5":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = g;
        d[i+1] = g;
        d[i+2] = b;
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "6":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = r;
        d[i+1] = g;
        d[i+2] = r;
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "7":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = r;
        d[i+1] = r;
        d[i+2] = b;
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "8":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = g;
        d[i+1] = g;
        d[i+2] = r;
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "9":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = b;
        d[i+1] = r;
        d[i+2] = g;
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "10":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = g;
        d[i+1] = b;
        d[i+2] = r;
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "11":
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = r+randInt(-100,100);
        d[i+1] = g+randInt(-100,100);
        d[i+2] = b+randInt(-100,100);
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "12":
  var v = randInt(0,255);
  var h = randInt(0,255);
  var t = randInt(0,255);
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = 255-r;
        if(d[i]<100){
          d[i]=v;
        }
        d[i+1] = 255-g;
        if(d[i+1]<100){
          d[i]=h;
        }
        d[i+2] = 255-b;
        if(d[i+2]<100){
          d[i+2]=t;
        }
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "13":
  var v = randInt(0,255);
  var h = randInt(0,255);
  var t = randInt(0,255);
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = r;
        if(d[i]<100){
          d[i]=v;
        }
        d[i+1] = g;
        if(d[i+1]<100){
          d[i]=h;
        }
        d[i+2] = b;
        if(d[i+2]<100){
          d[i+2]=t;
        }
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "14":
  var v = randInt(0,255);
  var h = randInt(0,255);
  var t = randInt(0,255);
  var imageData = ctx.getImageData(0, 0, W, H);
  var d = imageData.data;
  for(var i = 0; i < d.length; i+=4)
      {
        var r = d[i],
          g = d[i+1],
          b = d[i+2];
        d[i] = r;
        if(d[i]>100){
          d[i]=v;
        }
        d[i+1] = g;
        if(d[i+1]>100){
          d[i]=h;
        }
        d[i+2] = b;
        if(d[i+2]>100){
          d[i+2]=t;
        }
      }
        ctx.putImageData(imageData, 0, 0);
  break;
  case "15":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.gaussianBlur(imageData,10);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "16":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.gaussianBlur(imageData,30);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "17":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.gaussianBlur(imageData,50);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "18":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.gaussianBlur(imageData,100);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "19":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.sobel(imageData);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "20":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.laplace(imageData);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "21":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.threshold(imageData,randInt(0,255));

  ctx.putImageData(filtered, 0, 0);
  break;
  case "22":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.threshold(imageData,200);

  ctx.putImageData(filtered, 0, 0);
  break;
  case "23":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.threshold(imageData,randInt(100,150));

  ctx.putImageData(filtered, 0, 0);
  break;
  case "24":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.distortSine(imageData,-Math.random(),-Math.random());

  ctx.putImageData(filtered, 0, 0);
  break;

  case "25":
  var imageData = ctx.getImageData(0, 0, W, H);
  var filtered = Filters.distortSine(imageData,randDec(-8,1));

  ctx.putImageData(filtered, 0, 0);
  break;
  case "26":
  var imageData = ctx.getImageData(0, 0, W, H);
  var xdata = Filters.threshold(imageData,180);
  var filtered = Filters.lightenBlend(xdata,imageData);

  ctx.putImageData(filtered, 0, 0);


  break;
  case "27":
  var imageData = ctx.getImageData(0, 0, W, H);
  var xdata = Filters.threshold(imageData,180);
  var filtered = Filters.darkenBlend(xdata,imageData);

  ctx.putImageData(filtered, 0, 0);


  break;
  case "28":
  var imageData = ctx.getImageData(0, 0, W, H);
  var xdata = Filters.threshold(imageData,randInt(100,200));
  var filtered = Filters.screenBlend(xdata,imageData);

  ctx.putImageData(filtered, 0, 0);


  break;
  case "29":
  var imageData = ctx.getImageData(0, 0, W, H);
  var xdata = Filters.threshold(imageData,randInt(100,200));
  var filtered = Filters.multiplyBlend(imageData,xdata);

  ctx.putImageData(filtered, 0, 0);


  break;
  case "30":
  var imageData = ctx.getImageData(0, 0, W, H);
  var xdata = Filters.threshold(imageData,randInt(100,200));
  var filtered = Filters.differenceBlend(xdata,imageData);

  ctx.putImageData(filtered, 0, 0);


  break;
  }
}


function pixelate(canvas,ctx,ctrl1,ctrl2,ctrl3){
var force =[5,10,15,20,25,30,40,50,60,70,80,90,100,150,200];
var iOpSize = force[ctrl3];
var iMode = 0;

var iCDif = ctrl1;
  var r0, r1, r2, r3, r4, r5, r6 = 0;
if(ctrl1!=0){



	        imageData = ctx.getImageData(0, 0, W, H);
          var data = imageData.data;
          for (var y = 0; y < H; y+=iOpSize){

	            for (var x = 0; x < W; x+=iOpSize){


                switch(ctrl2) {

              case "0":

                    r0 = 255;

                    r1 = r3 = r5 = randInt(-iCDif, iCDif * 2);

                    r2 = r4 = r6 = randInt(0, iCDif);

                break;
                case "1":
                     r0 = 255;
                     r1 = randInt(-iCDif, iCDif * 2);
                     r2 = randInt(0, iCDif);
                     r3 = randInt(-iCDif, iCDif * 2);
                     r4 = randInt(0, iCDif);
                     r5 = randInt(-iCDif, iCDif * 2);
                     r6 = randInt(0, iCDif);
                break;

              }
                     for (var y2 = 0; y2 < iOpSize; y2++){

	                    for (var x2 = 0; x2 < iOpSize; x2++){

	                        var i = ((y + y2) * W + x + x2) * 4;



	                        data[i+0] = data[i+0] - r1 + r2;
	                        data[i+1] = data[i+1] - r3 + r4;
	                        data[i+2] = data[i+2] - r5 + r6;
	                        data[i+3] = 255;
	                    }
	                }
                }
              }
ctx.putImageData(imageData, 0, 0);
}
}

////MONOCHROMA
function monochroma(ctx, ctrl)
{

  switch (ctrl)
  {
    case "0":

    break;
    case "1":
    var imageData = ctx.getImageData(0, 0, W, H);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4)
    {

      data[i + 1] = 0;

      data[i + 2] = 0;
    }
    ctx.putImageData(imageData, 0, 0);
    break;
    case "2":
    var imageData = ctx.getImageData(0, 0, W, H);
    var data = imageData.data;
    for (var i = 0; i < data.length; i += 4)
    {

      data[i] = 0;

      data[i + 2] = 0;
    }
    ctx.putImageData(imageData, 0, 0);
    break;
    case "3":
    var imageData = ctx.getImageData(0, 0, W, H);
    var data = imageData.data;
    // ditherAtkinsons(imageData);
    for (var i = 0; i < data.length; i += 4)
    {

      data[i] = 0;

      data[i + 1] = 0;
    }
    ctx.putImageData(imageData, 0, 0);
    break;

  }

}

/// BASE 64 GLITCHER (CANT WORK IN REQUEST ANIM FRAME CTX)


function base64glitcher(outcanvas, outputctx, ctrl)
{

    var dataurl = outcanvas.toDataURL("image/jpeg");
    var input = dataurl.replace('data:image/jpeg;base64,', '');
    var chars1 = ["0", ")", "<", ">", ".", "*", "&", "£", "%", "~", "#", "+", "a", "!", "|", "-"];
    var chars2 = ["a", "b", "c", "d", "e", "f", "z", "x", "v", "n", "m", "o", "i", "y", "q", "w"];
    if (Math.floor((Math.random() * 2) + 1) == 2)
    {
      var chars = chars2;
    }
    else
    {
      var chars = chars1;
    }
    var glitch_levels = ["64", "128", "256", "1024", "2048","4056","8112"];
    var optionVal = ctrl;
    var splitNum = glitch_levels[optionVal];
    var newdata;
    try
    {
      var t = input;
      newdata = atob(t);
    }
    catch (err)
    {
      var t = input;
      newdata = t;
    }
    var chunkLength = parseInt((newdata.length - 1) / splitNum);
    var chunks = [];
    for (var i = 0, charsLength = newdata.length; i < charsLength; i += chunkLength)
    {
      chunks.push(newdata.substring(i, i + chunkLength));
    }
    for (var i = 2; i <= splitNum; i++)
    {
      var glitchRand = Math.floor((Math.random() * 100) + 1);
      if (optionVal == 4)
      {
        glitchRand = 1;
      }
      var char1Rand = Math.floor((Math.random() * chars.length));
      var char2Rand = Math.floor((Math.random() * chars.length));
      if (char2Rand == char1Rand)
      {
        char2Rand = "9";
      }
      if (glitchRand % 2 != 0)
      {
        chunks[i] = chunks[i].replace(chars[char1Rand], chars[char2Rand]);
      }
    }
    newdata = chunks.join('');
    var base64data = btoa(newdata);
    glitched_img = new Image();
    glitched_img.src = 'data:image/jpeg;base64,' + base64data;
    glitched_img.onload = function ()
    {
      outputctx.drawImage(glitched_img, 0, 0);

    }

}
