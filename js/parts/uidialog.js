//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___|.3.1


$('#oscstart').click(function(){
	oscon= !oscon;
	animosc();
	if(oscon){
		$(this).css({"background-color":"#0F0","color":"#000"})
	animosc();
	}else{
		$(this).css({"background-color":"#030","color":"#0F0"})
stoposc();
	}
})




$('#startvideoinput').click(function(){
	videosrc = !videosrc;
	grabvideoinput();
	if(videosrc){
		$(this).css({"background-color":"#0F0","color":"#000"})

	}else{
		$(this).css({"background-color":"#030","color":"#0F0"})

	}
})
$('#stoptxtclear').click(function(){
	txton=false;
	stoptxtanim();
})
$('#txtgo').click(function(){
	txton= !txton ;
	if(txton){
		$(this).css({"background-color":"#0F0","color":"#000"})
		animtxt(txtcanvas,txtctx);
	}else{
		$(this).css({"background-color":"#030","color":"#0F0"})
		stoptxtanim();
	}

})

$('#glitchgo').click(function(){
	glitchon= !glitchon;

	if(glitchon){
		$(this).css({"background-color":"#0F0","color":"#000"})
		glitcher(spesrccanvas,canvas_layer_1,canvas_layer_2,glitchcanvas,glitchctx);
	}else{
		$(this).css({"background-color":"#030","color":"#0F0"})
			glitchstop();
	}
})

$('#glitch64force').change(function(){
	if(glitchon){
		glitcher(spesrccanvas,canvas_layer_1,canvas_layer_2,glitchcanvas,glitchctx);
	}
})

$('#vgardm').click(function(){
	vgardm = !vgardm;
	if(vgardm){
		$(this).css({"background-color":"#0F0","color":"#000"})
	}else{
		$(this).css({"background-color":"#030","color":"#0F0"})
	}
})
$('#vgago').click(function(){
	vgaon= !vgaon;
	if(vgaon){
		$(this).css({"background-color":"#0F0","color":"#000"})
	}else{
		$(this).css({"background-color":"#030","color":"#0F0"})
		stopvga();
	}

	makevga();
})


///Special sources tab system
$('.spe_tab').hide();
$('#spetab_1').show();
$('#spe_menu li').first().addClass('spe_selected');
$('#spe_1').click(function(){
	$('#spe_menu li').removeClass('spe_selected');
	$(this).addClass('spe_selected');
	$('.spe_tab').hide();
	$('#spetab_1').show();
})
$('#spe_2').click(function(){
	$('#spe_menu li').removeClass('spe_selected');
	$(this).addClass('spe_selected');
	$('.spe_tab').hide();
	$('#spetab_2').show();
})
$('#spe_3').click(function(){
	$('#spe_menu li').removeClass('spe_selected');
	$(this).addClass('spe_selected');
	$('.spe_tab').hide();
	$('#spetab_3').show();
})
$('#spe_4').click(function(){
	$('#spe_menu li').removeClass('spe_selected');
	$(this).addClass('spe_selected');
	$('.spe_tab').hide();
	$('#spetab_4').show();
})
$('#spe_5').click(function(){
	$('#spe_menu li').removeClass('spe_selected');
	$(this).addClass('spe_selected');
	$('.spe_tab').hide();
	$('#spetab_5').show();
})

/// PANIC reset all slider values
$('#panic').click(function(){
	reset();
})



$('.txtinput').focus(function(){
	infocus=true;
	console.log(infocus);
})
$('.txtinput').focusout(function(){
	infocus=false;
	console.log(infocus);
})
 ///sources show hide SLIDERS

//alert($('#src_ctrl_A').val());

$('.speed_sldr').hide();

$(document).on('change','#src_ctrl_A',function(){

playbackctrl($(this).val(),sourceA,loopA,playmodeA,frameposA,"A");

});
$(document).on('change','#src_ctrl_Z',function(){

playbackctrl($(this).val(),sourceZ,loopZ,playmodeZ,frameposZ,"Z");

});
$(document).on('change','#src_ctrl_E',function(){

playbackctrl($(this).val(),sourceE,loopE,playmodeE,frameposE,"E");

});
$(document).on('change','#src_ctrl_R',function(){

playbackctrl($(this).val(),sourceR,loopR,playmodeR,frameposR,"R");

});
$(document).on('change','#src_ctrl_T',function(){

playbackctrl($(this).val(),sourceT,loopT,playmodeT,frameposT,"T");

});
$(document).on('change','#src_ctrl_Y',function(){

playbackctrl($(this).val(),sourceY,loopY,playmodeT,frameposY,"Y");

});
$(document).on('change','#src_ctrl_Q',function(){

playbackctrl($(this).val(),sourceQ,loopQ,playmodeQ,frameposQ,"Q");

});

$(document).on('change','#src_ctrl_S',function(){

playbackctrl($(this).val(),sourceS,loopS,playmodeS,frameposS,"S");

});
$(document).on('change','#src_ctrl_D',function(){

playbackctrl($(this).val(),sourceD,loopD,playmodeD,frameposD,"D");

});

$(document).on('change','#src_ctrl_F',function(){

playbackctrl($(this).val(),sourceF,loopF,playmodeF,frameposF,"F");

});
$(document).on('change','#src_ctrl_G',function(){

playbackctrl($(this).val(),sourceG,loopG,playmodeG,frameposG,"G");

});
$(document).on('change','#src_ctrl_H',function(){

playbackctrl($(this).val(),sourceH,loopH,playmodeH,frameposH,"H");

});
$(document).on('change','#src_ctrl_W',function(){

playbackctrl($(this).val(),sourceW,loopW,playmodeW,frameposW,"W");

});
$(document).on('change','#src_ctrl_X',function(){

playbackctrl($(this).val(),sourceX,loopX,playmodeX,frameposX,"X");

});
$(document).on('change','#src_ctrl_C',function(){

playbackctrl($(this).val(),sourceC,loopC,playmodeC,frameposC,"C");

});
$(document).on('change','#src_ctrl_V',function(){

playbackctrl($(this).val(),sourceV,loopV,playmodeV,frameposV,"V");

});
$(document).on('change','#src_ctrl_B',function(){

playbackctrl($(this).val(),sourceB,loopB,playmodeB,frameposB,"B");

});
$(document).on('change','#src_ctrl_N',function(){

playbackctrl($(this).val(),sourceN,loopN,playmodeN,frameposN,"N");

});





///
/// SOURCE CLICK TRIGGER
$('body').on('click','#imsource_A',function(){
triggA();
});
$('body').on('click','#imsource_Z',function(){
	triggZ();
});
$('body').on('click','#imsource_E',function(){
triggE();
});
$('body').on('click','#imsource_R',function(){
	triggR();
});
$('body').on('click','#imsource_T',function(){
	triggT();
});
$('body').on('click','#imsource_Y',function(){
	triggY();
});


$('body').on('click','#imsource_Q',function(){
	triggQ();
});
$('body').on('click','#imsource_S',function(){
	triggS();
});
$('body').on('click','#imsource_D',function(){
	triggD();
});
$('body').on('click','#imsource_F',function(){
triggF();
});
$('body').on('click','#imsource_G',function(){
triggG();
});
$('body').on('click','#imsource_H',function(){
triggH();
});


$('body').on('click','#imsource_W',function(){
triggW();
});
$('body').on('click','#imsource_X',function(){
triggX();
});
$('body').on('click','#imsource_C',function(){
triggC();
});
$('body').on('click','#imsource_V',function(){
triggV();
});
$('body').on('click','#imsource_B',function(){
triggB();
});
$('body').on('click','#imsource_N',function(){
triggN();
});
///
/// OPEN SECOND scen
$('body').on('click', '#outpopup', function (e)
{
	e.preventDefault();
	OpenPopup();
	setTimeout(function ()
	{
		SendToPopup();
	}, 1000);

});


$('body').on('click','#record',function(){
	if($('#recformat').val()=="0"){
	recaswebm();
}else{
recgif();
}

});
$('body').on('click','#recstop',function(){
if($('#recformat').val()=="0"){
savewebm();
	}else{
savegif();
	}

});

///
$('.num').keyup(function() {
        if (this.value != this.value.replace(/[^0-9\.]/g, '')) {
                this.value = this.value.replace(/[^0-9\.]/g, '');
        }
});
////
////
$(document).keydown(function (e)
{
if(!search){	
if(!infocus){
	switch (e.which)
	{
case 32:
TapForBPM();
break;
	case 79:
	if($('#recformat').val()=="0"){
recaswebm();
}else{
recgif();
}
	break;
	case 80:
	if($('#recformat').val()=="0"){
savewebm();
}else{
	savegif();
}
	break;
	case 65:
		triggA();
		break;
	case 90:
		triggZ();
		break;
	case 69:
		triggE();
		break;
	case 82:
		triggR();
		break;
	case 84:
		triggT();
		break;
	case 89:
        triggY();
		break;
	case 81:
	    triggQ();
	    break;
	 case 83:
	    triggS();
	    break;
	 case 68:
	    triggD();
	    break;
	 case 70:
	    triggF();
	    break;
	 case 71:
	    triggG();
	    break;
	 case 72:
	    triggH();
	    break;
	 case 87:
	 	triggW();
	 	break;
	 case 88:
	 	triggX();
	 	break;
     case 67:
         triggC();
         break;
     case 86:
     	triggV();
     	break;
     case 66:
     	triggB();
     	break;
     case 78:
     	triggN();
     	break;


	}
}
}
});






////BANK select




$('#bankselector li').click(function(){
		var tab_id = $(this).attr('data-bank');

		$('#bankselector li').removeClass('selected');
		$('.bank').removeClass('selected-bank');
		$('.bank').addClass('hidden');

		$(this).addClass('selected');
		$("#"+tab_id).removeClass('hidden');
		$("#"+tab_id).addClass('selected-bank');
	})

//randomise sequencer options

$('#randomise').click(function(){
	seqrandomise()
});
$('#start').click(function(){
	 isplay=true;
									start();
									})
$('#stop').click(function(){
	isplay=false;
	stop();
});
$('#tap').click(TapForBPM);
$('body').on("click","#rdmfx",function(){
	randfx();
})
