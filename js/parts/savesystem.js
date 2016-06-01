//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________    _______
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |   \   _  \
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |   /  /_\  \
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |   \  \_/   \
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___| /\ \_____  /

$('body').on('click', '#savekit', function ()
{
	var kitname = prompt("KIT NAME?", "")

	for (var prop in savekit[0])
	{
		//console.log("Key:" + prop);
		savekit[0][prop] = savekit[0][prop];
		console.log(savekit[0][prop])
	}

	//$.each(savekit[0], function(i, val) {
	//compress[i]=LZString.compress(val);
	//console.log(compress[i]);
	//$("#" + i).append(document.createTextNode(" - " + val));

	//});

	saveData(savekit, kitname + ".json");

});

var saveData = (function ()
{

	var a = document.createElement("a");
	document.body.appendChild(a);
	a.style = "display: none";
	return function (data, fileName)
	{

		var json = JSON.stringify(data);
		//ar

		var blob = new Blob([json],
		{
			type: "octet/stream"
		});
		//comp=LZString.compress(json);


		var url = window.URL.createObjectURL(blob);
		a.href = url;
		a.download = fileName;
		a.click();
		window.URL.revokeObjectURL(url);
	};
}());

document.getElementById('loadkit').addEventListener('change', handleFileSelect, false);

function handleFileSelect(evt)
{
	var files = evt.target.files; // FileList object

	// files is a FileList of File objects. List some properties.
	var output = [];
	for (var i = 0, f; f = files[i]; i++)
	{
		var reader = new FileReader();

		// Closure to capture the file information.
		reader.onload = (function (theFile)
		{
			return function (e)
			{
				console.log('e readAsText = ', e);
				console.log('e readAsText target = ', e.target);
				try
				{
					json = JSON.parse(e.target.result);

          if(json[0].A!=""){
          var image = '<img id="gif_layer_A" src="">';
          		$('#imsource_A').html('');
          		$('#imsource_A').append(image);

                      savekit[0].A=json[0].A;
          			$('#gif_layer_A').attr('src',json[0].A);
          			sourceA = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_A'),
          				c_w: W,
          				c_h: H
          			});
          			sourceA.load();

          }
          if(json[0].Z!=""){
          var image = '<img id="gif_layer_Z" src="">';
          		$('#imsource_Z').html('');
          		$('#imsource_Z').append(image);

                      savekit[0].Z=json[0].Z;
          			$('#gif_layer_Z').attr('src',json[0].Z);
          			sourceZ = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_Z'),
          				c_w: W,
          				c_h: H
          			});
          			sourceZ.load();

          }
          if(json[0].E!=""){
          var image = '<img id="gif_layer_E" src="">';
          		$('#imsource_E').html('');
          		$('#imsource_E').append(image);

                      savekit[0].E=json[0].E;
          			$('#gif_layer_E').attr('src',json[0].E);
          			sourceE = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_E'),
          				c_w: W,
          				c_h: H
          			});
          			sourceE.load();

          }
          if(json[0].R!=""){
          var image = '<img id="gif_layer_R" src="">';
          		$('#imsource_R').html('');
          		$('#imsource_R').append(image);

                      savekit[0].R=json[0].R;
          			$('#gif_layer_R').attr('src',json[0].R);
          			sourceR = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_R'),
          				c_w: W,
          				c_h: H
          			});
          			sourceR.load();

          }
          if(json[0].T!=""){
          var image = '<img id="gif_layer_T" src="">';
          		$('#imsource_T').html('');
          		$('#imsource_T').append(image);

                      savekit[0].T=json[0].T;
          			$('#gif_layer_T').attr('src',json[0].T);
          			sourceT = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_T'),
          				c_w: W,
          				c_h: H
          			});
          			sourceT.load();

          }
          if(json[0].Y!=""){
          var image = '<img id="gif_layer_Y" src="">';
          		$('#imsource_Y').html('');
          		$('#imsource_Y').append(image);

                      savekit[0].Y=json[0].Y;
          			$('#gif_layer_Y').attr('src',json[0].Y);
          			sourceY = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_Y'),
          				c_w: W,
          				c_h: H
          			});
          			sourceY.load();

          }
          if(json[0].Q!=""){
          var image = '<img id="gif_layer_Q" src="">';
          		$('#imsource_Q').html('');
          		$('#imsource_Q').append(image);

                      savekit[0].Q=json[0].Q;
          			$('#gif_layer_Q').attr('src',json[0].Q);
          			sourceQ = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_Q'),
          				c_w: W,
          				c_h: H
          			});
          			sourceQ.load();

          }
          if(json[0].S!=""){
          var image = '<img id="gif_layer_S" src="">';
          		$('#imsource_S').html('');
          		$('#imsource_S').append(image);

                      savekit[0].S=json[0].S;
          			$('#gif_layer_S').attr('src',json[0].S);
          			sourceS = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_S'),
          				c_w: W,
          				c_h: H
          			});
          			sourceS.load();

          }
          if(json[0].D!=""){
          var image = '<img id="gif_layer_D" src="">';
          		$('#imsource_D').html('');
          		$('#imsource_D').append(image);

                      savekit[0].D=json[0].D;
          			$('#gif_layer_D').attr('src',json[0].D);
          			sourceD = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_D'),
          				c_w: W,
          				c_h: H
          			});
          			sourceD.load();

          }
          if(json[0].F!=""){
          var image = '<img id="gif_layer_F" src="">';
          		$('#imsource_F').html('');
          		$('#imsource_F').append(image);

                      savekit[0].F=json[0].F;
          			$('#gif_layer_F').attr('src',json[0].F);
          			sourceF = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_F'),
          				c_w: W,
          				c_h: H
          			});
          			sourceF.load();

          }
          if(json[0].G!=""){
          var image = '<img id="gif_layer_G" src="">';
          		$('#imsource_G').html('');
          		$('#imsource_G').append(image);

                      savekit[0].G=json[0].G;
          			$('#gif_layer_G').attr('src',json[0].G);
          			sourceG = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_G'),
          				c_w: W,
          				c_h: H
          			});
          			sourceG.load();

          }
          if(json[0].H!=""){
          var image = '<img id="gif_layer_H" src="">';
          		$('#imsource_H').html('');
          		$('#imsource_H').append(image);

                      savekit[0].H=json[0].H;
          			$('#gif_layer_H').attr('src',json[0].H);
          			sourceH = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_H'),
          				c_w: W,
          				c_h: H
          			});
          			sourceH.load();

          }
          if(json[0].W!=""){
          var image = '<img id="gif_layer_W" src="">';
          		$('#imsource_W').html('');
          		$('#imsource_W').append(image);

                      savekit[0].W=json[0].W;
          			$('#gif_layer_W').attr('src',json[0].W);
          			sourceW = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_W'),
          				c_w: W,
          				c_h: H
          			});
          			sourceW.load();

          }
          if(json[0].X!=""){
          var image = '<img id="gif_layer_X" src="">';
          		$('#imsource_X').html('');
          		$('#imsource_X').append(image);

                      savekit[0].X=json[0].X;
          			$('#gif_layer_X').attr('src',json[0].X);
          			sourceX = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_X'),
          				c_w: W,
          				c_h: H
          			});
          			sourceX.load();

          }
          if(json[0].C!=""){
          var image = '<img id="gif_layer_C" src="">';
          		$('#imsource_C').html('');
          		$('#imsource_C').append(image);

                      savekit[0].C=json[0].C;
          			$('#gif_layer_C').attr('src',json[0].C);
          			sourceC = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_C'),
          				c_w: W,
          				c_h: H
          			});
          			sourceC.load();

          }
          if(json[0].V!=""){
          var image = '<img id="gif_layer_V" src="">';
          		$('#imsource_V').html('');
          		$('#imsource_V').append(image);

                      savekit[0].V=json[0].V;
          			$('#gif_layer_V').attr('src',json[0].V);
          			sourceV = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_V'),
          				c_w: W,
          				c_h: H
          			});
          			sourceV.load();

          }
          if(json[0].B!=""){
          var image = '<img id="gif_layer_B" src="">';
          		$('#imsource_B').html('');
          		$('#imsource_B').append(image);

                      savekit[0].B=json[0].B;
          			$('#gif_layer_B').attr('src',json[0].B);
          			sourceB = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_B'),
          				c_w: W,
          				c_h: H
          			});
          			sourceB.load();

          }
          if(json[0].N!=""){
          var image = '<img id="gif_layer_N" src="">';
          		$('#imsource_N').html('');
          		$('#imsource_N').append(image);

                      savekit[0].N=json[0].N;
          			$('#gif_layer_N').attr('src',json[0].N);
          			sourceN = new SuperGif(
          			{
          				gif: document.getElementById('gif_layer_N'),
          				c_w: W,
          				c_h: H
          			});
          			sourceN.load();

          }

				}
				catch (ex)
				{
					alert('This is not a valid Glitch Gif VJ savefile');
				}
			}
		})(f);
		reader.readAsText(f);
	}

}
