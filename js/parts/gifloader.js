//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________    _______
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |   \   _  \
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |   /  /_\  \
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |   \  \_/   \
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___| /\ \_____  /

$('#inputimage_A').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_A" src="">';
$('#imsource_A').html('');
$('#imsource_A').append(image);

fr.onload = function (ev2)
{
//alert(fr);
//
savekit[0].A=ev2.target.result;
$('#gif_layer_A').attr('src', ev2.target.result);
sourceA = new SuperGif(
{
gif: document.getElementById('gif_layer_A'),
c_w: W,
c_h: H,
draw_while_loading:true


});
sourceA.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});

$('#inputimage_Z').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_Z" src="">';
$('#imsource_Z').html('');
$('#imsource_Z').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].Z=ev2.target.result;
$('#gif_layer_Z').attr('src', ev2.target.result);
sourceZ = new SuperGif(
{
gif: document.getElementById('gif_layer_Z'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceZ.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_E').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_E" src="">';
$('#imsource_E').html('');
$('#imsource_E').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].E=ev2.target.result;
$('#gif_layer_E').attr('src', ev2.target.result);
sourceE = new SuperGif(
{
gif: document.getElementById('gif_layer_E'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceE.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_R').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_R" src="">';
$('#imsource_R').html('');
$('#imsource_R').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].R=ev2.target.result;
$('#gif_layer_R').attr('src', ev2.target.result);
sourceR = new SuperGif(
{
gif: document.getElementById('gif_layer_R'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceR.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_T').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_T" src="">';
$('#imsource_T').html('');
$('#imsource_T').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].T=ev2.target.result;
$('#gif_layer_T').attr('src', ev2.target.result);
sourceT = new SuperGif(
{
gif: document.getElementById('gif_layer_T'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceT.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_Y').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_Y" src="">';
$('#imsource_Y').html('');
$('#imsource_Y').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].Y=ev2.target.result;
$('#gif_layer_Y').attr('src', ev2.target.result);
sourceY = new SuperGif(
{
gif: document.getElementById('gif_layer_Y'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceY.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});

$('#inputimage_Q').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_Q" src="">';
$('#imsource_Q').html('');
$('#imsource_Q').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].Q=ev2.target.result;
$('#gif_layer_Q').attr('src', ev2.target.result);
sourceQ = new SuperGif(
{
gif: document.getElementById('gif_layer_Q'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceQ.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_S').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_S" src="">';
$('#imsource_S').html('');
$('#imsource_S').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].S=ev2.target.result;
$('#gif_layer_S').attr('src', ev2.target.result);
sourceS = new SuperGif(
{
gif: document.getElementById('gif_layer_S'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceS.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_D').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_D" src="">';
$('#imsource_D').html('');
$('#imsource_D').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].D=ev2.target.result;
$('#gif_layer_D').attr('src', ev2.target.result);
sourceD = new SuperGif(
{
gif: document.getElementById('gif_layer_D'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceD.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_F').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_F" src="">';
$('#imsource_F').html('');
$('#imsource_F').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].F=ev2.target.result;
$('#gif_layer_F').attr('src', ev2.target.result);
sourceF = new SuperGif(
{
gif: document.getElementById('gif_layer_F'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceF.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_G').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_G" src="">';
$('#imsource_G').html('');
$('#imsource_G').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].G=ev2.target.result;
$('#gif_layer_G').attr('src', ev2.target.result);
sourceG = new SuperGif(
{
gif: document.getElementById('gif_layer_G'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceG.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_H').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_H" src="">';
$('#imsource_H').html('');
$('#imsource_H').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].H=ev2.target.result;
$('#gif_layer_H').attr('src', ev2.target.result);
sourceH = new SuperGif(
{
gif: document.getElementById('gif_layer_H'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceH.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_W').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_W" src="">';
$('#imsource_W').html('');
$('#imsource_W').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].W=ev2.target.result;
$('#gif_layer_W').attr('src', ev2.target.result);
sourceW = new SuperGif(
{
gif: document.getElementById('gif_layer_W'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceW.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_X').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_X" src="">';
$('#imsource_X').html('');
$('#imsource_X').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].X=ev2.target.result;
$('#gif_layer_X').attr('src', ev2.target.result);
sourceX = new SuperGif(
{
gif: document.getElementById('gif_layer_X'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceX.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_C').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_C" src="">';
$('#imsource_C').html('');
$('#imsource_C').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].C=ev2.target.result;
$('#gif_layer_C').attr('src', ev2.target.result);
sourceC = new SuperGif(
{
gif: document.getElementById('gif_layer_C'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceC.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_V').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_V" src="">';
$('#imsource_V').html('');
$('#imsource_V').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].V=ev2.target.result;
$('#gif_layer_V').attr('src', ev2.target.result);
sourceV = new SuperGif(
{
gif: document.getElementById('gif_layer_V'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceV.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_B').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_B" src="">';
$('#imsource_B').html('');
$('#imsource_B').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].B=ev2.target.result;
$('#gif_layer_B').attr('src', ev2.target.result);
sourceB = new SuperGif(
{
gif: document.getElementById('gif_layer_B'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceB.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
$('#inputimage_N').on('change', function (e)
{
//alert($(this).data('layer'));
var f = e.target.files[0];
var fr = new FileReader();
var image = '<img id="gif_layer_N" src="">';
$('#imsource_N').html('');
$('#imsource_N').append(image);

fr.onload = function (ev2)
{
//alert(fr);
savekit[0].N=ev2.target.result;
$('#gif_layer_N').attr('src', ev2.target.result);
sourceN = new SuperGif(
{
gif: document.getElementById('gif_layer_N'),
c_w: W,
c_h: H,
draw_while_loading:true
});
sourceN.load();
//console.debug($('#gif_layer_'+$(this).data('layer')));
};

fr.readAsDataURL(f);

});
