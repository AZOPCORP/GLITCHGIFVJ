//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________    _______
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |   \   _  \
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |   /  /_\  \
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |   \  \_/   \
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___| /\ \_____  /

function animrandomA(){
	cancelAnimationFrame(loopA);
	loopA = null;
	 setTimeout(function() {
	var z = sourceA.get_length(frames);
			var x = randInt(0,z);
			sourceA.move_to(parseInt(x));
	loopA=requestAnimationFrame(animrandomA);
	console.log('rdm');
},$('#speedA').val());
}


function animspeedA(){
	cancelAnimationFrame(loopA);
	loopA = null;
	sourceA.pause();
	var k = Math.abs($('#ctrl_speed_A').val())

console.log(frameposA)


}










}



$(document).on('change','#src_ctrl_',function(){

	switch($('#src_ctrl_A').val()){
		case "normal":
    $('#ctrl_bpm_A').hide();
		$('#ctrl_speed_A').hide();
		$('#speedA').hide();
		cancelAnimationFrame(loopA);
		loopA = null;
			sourceA.pause();
			sourceA.move_to(0);
			sourceA.play();
		break;
		case "control_speed":
		cancelAnimationFrame(loopA);
		loopA = null;
			sourceA.pause();
		$('#ctrl_speed_A').show();
    $('#ctrl_bpm_A').hide();
		$('#speedA').hide();

  loopA = requestAnimationFrame(animspeedA);

		break;

		case "random":
		$('#ctrl_bpm_A').hide();
		$('#ctrl_speed_A').hide();
		$('#speedA').show();

		cancelAnimationFrame(loopA);
		loopA=null;
	  sourceA.pause();
		loopA = requestAnimationFrame(animrandomA);
		break;


	}
})
