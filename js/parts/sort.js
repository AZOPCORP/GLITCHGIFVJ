//    ________.____    .______________________   ___ ___     ________.______________ ____   ____  ____. ____   ________    _______
//   /  _____/|    |   |   \__    ___|_   ___ \ /   |   \   /  _____/|   \_   _____/ \   \ /   / |    | \   \ /   /_   |   \   _  \
//  /   \  ___|    |   |   | |    |  /    \  \//    ~    \ /   \  ___|   ||    __)    \   Y   /  |    |  \   Y   / |   |   /  /_\  \
//  \    \_\  \    |___|   | |    |  \     \___\    Y    / \    \_\  \   ||     \      \     /\__|    |   \     /  |   |   \  \_/   \
//   \______  /_______ \___| |____|   \______  /\___|_  /   \______  /___|\___  /       \___/\________|    \___/   |___| /\ \_____  /

var elout = document.getElementById('outlist');
var outputsort = Sortable.create(elout,
{
  animation: 300,
  handle: ".item",
  onEnd: function ()
  {

    listoutput();
  }

});
var ellr1 = document.getElementById('lr1list');
var lr1sort = Sortable.create(ellr1,
{
  animation: 300,
  handle: ".item",
  onEnd: function ()
  {

    listlayer1();
  }

});
var ellr2 = document.getElementById('lr2list');
var lr2sort = Sortable.create(ellr2,
{
  animation: 300,
  handle: ".item",
  onEnd: function ()
  {

    listlayer2();
  }

});
var el3 = document.getElementById('spe_menu');
var el3sort = Sortable.create(el3,
{
  animation: 300,

  onEnd: function ()
  {

listspesrc();
console.log(specialsequence);
  }

});


$('#fontcolor').spectrum({
  preferredFormat: "hex",
  containerClassName: "colpik",
  showButtons: false

});

$('#osccolor1').spectrum({
  preferredFormat: "hex",
  containerClassName: "colpik",
  showButtons: false

});
$('#osccolor2').spectrum({
 preferredFormat: "hex",
  containerClassName: "colpik",
  showButtons: false

});
