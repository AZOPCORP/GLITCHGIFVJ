
    function mkgif() {
      var statusbox = document.getElementById('statusbox');
      var abortbox = document.getElementById('abortbox');
      var abortbtn = document.createElement('button');
      //abortbtn.setAttribute("onclick","abort();");
      abortbtn.setAttribute("class", "btn");
      abortbox.appendChild(abortbtn);
      abortbtn.innerHTML = "Stop Recording!";
      abortbtn.onclick = function() {
        abort = !abort;
      };
      goupille = false;
      var w = setTimeout(function() {
        statusbox.innerHTML = 'Starting';
        var gifdiv = document.getElementById('mygif');
        gifdiv.innerHTML = "";
        var numframe = document.getElementById('framenum');
        var shots = [];
        var grabLimit = numframe.value;
        var grabRate = 270;
        var count = 0;

        function showResults() {
          var agif = new Image();
          var hr = document.createElement('hr');
          var savebtn = document.createElement('a');
          var br = document.createElement('br');
          statusbox.innerHTML = 'Finishing...';
          encoder.finish();
          var binary_gif = encoder.stream().getData();
          var data_url = 'data:image/gif;base64,' + encode64(binary_gif);
          agif.src = data_url;
          gifdiv.appendChild(agif);
          gifdiv.appendChild(br);
          gifdiv.appendChild(savebtn);
          savebtn.setAttribute("class", "btn visible");
          gifdiv.appendChild(hr);
          savebtn.setAttribute('href', data_url);
          savebtn.setAttribute('download', 'myGIF.gif');
          savebtn.innerHTML = "save";
          if(abort) {
            statusbox.innerHTML = "Rendering stoped at frame " + count;
          } else {
            statusbox.innerHTML = "Completed";
          }
          abort = false;
          goupille = true;
          abortbox.innerHTML = "";
        }
        var encoder = new GIFEncoder();
        encoder.setRepeat(0);
        encoder.setDelay(0);
        encoder.start();
        var grabber = setInterval(function() {
          statusbox.innerHTML = 'Rendering frame ' + count;
          count++;
          if(count > grabLimit) {
            clearInterval(grabber);
            showResults();
          } else if(abort) {
            clearInterval(grabber);
            showResults();
          } else {
            encoder.addFrame(con);
          }
        }, grabRate);
      }, 1000);
    }
