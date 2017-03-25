$(function(){

  //these are my buttons to choose sequences
  var $redBtn = $('#red');
  var $yellowBtn = $('#yellow');
  var $blueBtn = $('#blue');
  var $orangeBtn = $('#orange');
  var $greenBtn = $('#green');
  var $purpleBtn = $('#purple');

//*********************HANDLERS******************
//during code maker's turn
  var storeCode = function(){
    var $partOfCode = $('<div>').attr('id',$(this).attr('id')).addClass('sequence-square');
    // $partOfCode.css('background', $(this).attr('id)'));
    console.log($(this))
    $('#code-storage').append($partOfCode);
  };

  var storeGuess = function(){
    console.log($(this));
  };


console.log("You're doing fine");
  //when button is clicked....store in code-storage array and append
  $redBtn.on('click', storeCode);
  $yellowBtn.on('click', storeCode);
  $blueBtn.on('click', storeCode);
  $orangeBtn.on('click', storeCode);
  $greenBtn.on('click', storeCode);
  $purpleBtn.on('click', storeCode);

  //when button is clicked, store in guess code-guess-container array and append
  // $redBtn.on('click', storeGuess);
  // $yellowBtn.on('click', storeGuess);
  // $blueBtn.on('click', storeGuess);
  // $orangeBtn.on('click', storeGuess);
  // $greenBtn.on('click', storeGuess);
  // $purpleBtn.on('click', storeGuess);




});
