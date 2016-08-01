//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___|.3.1

var videopongpannel = '<div id="videopongpannel">';
videopongpannel += '<h2><a href="https://videopong.net" target="_blank">VIDEOPONG.NET</a></h2><button id="pannelclose" style="float:right">CLOSE</button>';
videopongpannel += '<div id="videopongform">';
//videopongpannel += '<form>';
videopongpannel +='<button id="vprdm">Get some random clips</button><br><label>search box</label><br><input type="text" name="search" id="searchpong"> ';
//videopongpannel +='</form>';
//videopongpannel +=
videopongpannel += '</div>';
videopongpannel +='<div id="results"></div>';



var remoteloader = '<div id="videopongpannel">';
remoteloader += '<h2>LOAD A REMOTE GIF</h2><button id="pannelclose" style="float:right">CLOSE</button>';
remoteloader += '<div id="videopongform">';
remoteloader +='<br><form id="gifurl"><label>Enter a gif url</label><br><div class="input_row"><input name="url" placeholder="http://url...gif" type="text"></div><input id="urlsubmit" type="submit" value="submit"></form> ';
remoteloader += '</div>';
remoteloader +='<div id="results"></div>';



function loadinbank(bank,src){
src = src.replace(/^http:\/\//i, 'https://');
switch(bank){
  case "A":
          var image = '<img id="gif_layer_A" src="">';
              $('#imsource_A').html('');
              $('#imsource_A').append(image);

                      savekit[0].A=src;
                $('#gif_layer_A').attr('src',src);
                sourceA = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_A'),
                  c_w: W,
                  c_h: H
                });
                sourceA.load();

          break;
          case "Z":
          var image = '<img id="gif_layer_Z" src="">';
              $('#imsource_Z').html('');
              $('#imsource_Z').append(image);

                      savekit[0].Z=src;
                $('#gif_layer_Z').attr('src',src);
                sourceZ = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_Z'),
                  c_w: W,
                  c_h: H
                });
                sourceZ.load();

          break;
          case "E":
          var image = '<img id="gif_layer_E" src="">';
              $('#imsource_E').html('');
              $('#imsource_E').append(image);

                      savekit[0].E=src;
                $('#gif_layer_E').attr('src',src);
                sourceE = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_E'),
                  c_w: W,
                  c_h: H
                });
                sourceE.load();

          break;
          case "R":
          var image = '<img id="gif_layer_R" src="">';
              $('#imsource_R').html('');
              $('#imsource_R').append(image);

                      savekit[0].R=src;
                $('#gif_layer_R').attr('src',src);
                sourceR = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_R'),
                  c_w: W,
                  c_h: H
                });
                sourceR.load();

          break;
          case "T":
          var image = '<img id="gif_layer_T" src="">';
              $('#imsource_T').html('');
              $('#imsource_T').append(image);

                      savekit[0].T=src;
                $('#gif_layer_T').attr('src',src);
                sourceT = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_T'),
                  c_w: W,
                  c_h: H
                });
                sourceT.load();

          break;
          case "Y":
          var image = '<img id="gif_layer_Y" src="">';
              $('#imsource_Y').html('');
              $('#imsource_Y').append(image);

                      savekit[0].Y=src;
                $('#gif_layer_Y').attr('src',src);
                sourceY = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_Y'),
                  c_w: W,
                  c_h: H
                });
                sourceY.load();

          break;
          case "Q":
          var image = '<img id="gif_layer_Q" src="">';
              $('#imsource_Q').html('');
              $('#imsource_Q').append(image);

                      savekit[0].Q=src;
                $('#gif_layer_Q').attr('src',src);
                sourceQ = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_Q'),
                  c_w: W,
                  c_h: H
                });
                sourceQ.load();

          break;
          case "S":
          var image = '<img id="gif_layer_S" src="">';
              $('#imsource_S').html('');
              $('#imsource_S').append(image);

                      savekit[0].S=src;
                $('#gif_layer_S').attr('src',src);
                sourceS = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_S'),
                  c_w: W,
                  c_h: H
                });
                sourceS.load();

          break;
         case "D":
          var image = '<img id="gif_layer_D" src="">';
              $('#imsource_D').html('');
              $('#imsource_D').append(image);

                      savekit[0].D=src;
                $('#gif_layer_D').attr('src',src);
                sourceD = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_D'),
                  c_w: W,
                  c_h: H
                });
                sourceD.load();

          break;
          case "F":
          var image = '<img id="gif_layer_F" src="">';
              $('#imsource_F').html('');
              $('#imsource_F').append(image);

                      savekit[0].F=src;
                $('#gif_layer_F').attr('src',src);
                sourceF = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_F'),
                  c_w: W,
                  c_h: H
                });
                sourceF.load();

          break;
          case "G":
          var image = '<img id="gif_layer_G" src="">';
              $('#imsource_G').html('');
              $('#imsource_G').append(image);

                      savekit[0].G=src;
                $('#gif_layer_G').attr('src',src);
                sourceG = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_G'),
                  c_w: W,
                  c_h: H
                });
                sourceG.load();

          break;
          case "H":
          var image = '<img id="gif_layer_H" src="">';
              $('#imsource_H').html('');
              $('#imsource_H').append(image);

                      savekit[0].H=src;
                $('#gif_layer_H').attr('src',src);
                sourceH = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_H'),
                  c_w: W,
                  c_h: H
                });
                sourceH.load();

          break;
          case "W":
          var image = '<img id="gif_layer_W" src="">';
              $('#imsource_W').html('');
              $('#imsource_W').append(image);

                      savekit[0].W=src;
                $('#gif_layer_W').attr('src',src);
                sourceW = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_W'),
                  c_w: W,
                  c_h: H
                });
                sourceW.load();

          break;
          case "X":
          var image = '<img id="gif_layer_X" src="">';
              $('#imsource_X').html('');
              $('#imsource_X').append(image);

                      savekit[0].X=jsrc;
                $('#gif_layer_X').attr('src',src);
                sourceX = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_X'),
                  c_w: W,
                  c_h: H
                });
                sourceX.load();

          break;
          case "C":
          var image = '<img id="gif_layer_C" src="">';
              $('#imsource_C').html('');
              $('#imsource_C').append(image);

                      savekit[0].C=src;
                $('#gif_layer_C').attr('src',src);
                sourceC = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_C'),
                  c_w: W,
                  c_h: H
                });
                sourceC.load();

          break;
          case "V":
          var image = '<img id="gif_layer_V" src="">';
              $('#imsource_V').html('');
              $('#imsource_V').append(image);

                      savekit[0].V=json[0].V;
                $('#gif_layer_V').attr('src',src);
                sourceV = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_V'),
                  c_w: W,
                  c_h: H
                });
                sourceV.load();

          break;
          case "B":
          var image = '<img id="gif_layer_B" src="">';
              $('#imsource_B').html('');
              $('#imsource_B').append(image);

                      savekit[0].B=src;
                $('#gif_layer_B').attr('src',src);
                sourceB = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_B'),
                  c_w: W,
                  c_h: H
                });
                sourceB.load();

          break;
          case "N":
          var image = '<img id="gif_layer_N" src="">';
              $('#imsource_N').html('');
              $('#imsource_N').append(image);

                      savekit[0].N=src;
                $('#gif_layer_N').attr('src',src);
                sourceN = new SuperGif(
                {
                  gif: document.getElementById('gif_layer_N'),
                  c_w: W,
                  c_h: H
                });
                sourceN.load();

          break;
        }

}




$('body').on('input','#searchpong',function(e){
e.preventDefault();

var val = $('#searchpong').val();
console.log(val);
 $.ajax({
    type: 'GET',


    url: 'https://www.videopong.net/api/clip/search/'+val+'/0/50',


    contentType: 'text/plain',

    xhrFields: {

      withCredentials: false
    },

    headers: {

    },

    success: function(e) {








var result = JSON.parse(e);

     $('#results').html('');
for(var i = 0;i<result.data.length;i++){
  var src = result.data[i][0].url_preview_gif;
  src = src.replace(/^http:\/\//i, 'https://');
    $('#results').append('<div class="resultbox" data-id="'+result.data[i][0].id+'"><img src="'+src+'"><p>Name:<b>'+result.data[i][0].title+'<b><br>By:'+result.data[i][1].name+'</p><button data-file="'+src+'" class="loadinbankvp">load in bank</button><select class="vpselect" ><option value="A">A</option><option value="Z">Z</option><option value="E">E</option><option value="R">R</option><option value="T">T</option><option value="Y">Y</option><option value="Q">Q</option><option value="S">S</option><option value="D">D</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="W">W</option><option value="X">X</option><option value="C">C</option><option value="V">V</option><option value="B">B</option><option value="N">N</option></div>')

}








    },

    error: function(e) {
  alert('can\'t load data from videopong.net :(' );
  console.debug(e);
    }
  });



return false;
});

$('body').on('click','.resultbox button',function(){

loadinbank($(this).next().val(),$(this).data('file'));

console.log($(this).next().val()+$(this).data('file'))

});

$('body').on('click','#openvideopong',function(){
  search = true;

$('body').append(videopongpannel);

});
$('body').on('click','#remotegif',function(){
  search = true;

$('body').append(remoteloader);

});

$('body').on('click','#pannelclose',function(){
search = false;
$('#videopongpannel').remove();
});

$('body').on('click','#vprdm',function(){


console.log('gni')

 $.ajax({
    type: 'GET',


    url: 'https://www.videopong.net/api/clip/random/50',


    contentType: 'text/plain',

    xhrFields: {

      withCredentials: false
    },

    headers: {

    },

    success: function(e) {








var result = JSON.parse(e);

     $('#results').html('');
for(var i = 0;i<result.data.length;i++){
var src = result.data[i][0].url_preview_gif;
src = src.replace(/^http:\/\//i, 'https://');
  $('#results').append('<div class="resultbox" data-id="'+result.data[i][0].id+'"><img src="'+src+'"><p>Name:<b>'+result.data[i][0].title+'<b><br>By:'+result.data[i][1].name+'</p><button data-file="'+src+'" class="loadinbankvp">load in bank</button><select class="vpselect" ><option value="A">A</option><option value="Z">Z</option><option value="E">E</option><option value="R">R</option><option value="T">T</option><option value="Y">Y</option><option value="Q">Q</option><option value="S">S</option><option value="D">D</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="W">W</option><option value="X">X</option><option value="C">C</option><option value="V">V</option><option value="B">B</option><option value="N">N</option></div>')
}








    },

    error: function(e) {
  alert('can\'t load data from videopong.net :(' );
  console.debug(e);
    }
  });



return false;

})

$('body').on('submit', '#gifurl', function (e)
{
	e.preventDefault();



	  $('#results').html('Please wait...');



	$.ajax(
	{
		type: "POST",
		url: 'https://azopcorp.com/glitchgifstudio/getgif',
		data: $('#gifurl').serialize(),
		success: function (json)
		{

		    $('#results').html('');
			//success message mybe...
			if(json.status!='ok'){
			    $('#results').html(json.status);
			}else{


      $('#results').append('<div class="resultbox" ><img src="'+json.gif+'"><br><button data-file="'+json.gif+'" class="loadinbankvp">load in bank</button><select class="vpselect" ><option value="A">A</option><option value="Z">Z</option><option value="E">E</option><option value="R">R</option><option value="T">T</option><option value="Y">Y</option><option value="Q">Q</option><option value="S">S</option><option value="D">D</option><option value="F">F</option><option value="G">G</option><option value="H">H</option><option value="W">W</option><option value="X">X</option><option value="C">C</option><option value="V">V</option><option value="B">B</option><option value="N">N</option></div>')





		}
  }
	});

});
