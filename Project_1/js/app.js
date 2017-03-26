$(function(){

  //array to hold the codemaker's selection
  var code = [];

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
    if(code.length < 4){
      var $partOfCode = $('<div>').attr('id',$(this).attr('id'));
      $partOfCode.addClass('sequence-square');
      code.push($(this).attr('id'));
      console.log(code);
      $('#code-storage').append($partOfCode);
    };
  };

  var storeGuess = function(){
    console.log($(this));
  };




  console.log("You're doing fine");


  //when button is clicked....store in code-storage array and append
  var codeMakerFirstTurn = function(){
    var $instruction = $('<h1>').text("Code Maker: Select your code.");
    $('body').prepend($instruction);
    $redBtn.on('click', storeCode);
    $yellowBtn.on('click', storeCode);
    $blueBtn.on('click', storeCode);
    $orangeBtn.on('click', storeCode);
    $greenBtn.on('click', storeCode);
    $purpleBtn.on('click', storeCode);

  };


  codeMakerFirstTurn();

  //when button is clicked, store in guess code-guess-container array and append
  $redBtn.on('click', storeGuess);
  $yellowBtn.on('click', storeGuess);
  $blueBtn.on('click', storeGuess);
  $orangeBtn.on('click', storeGuess);
  $greenBtn.on('click', storeGuess);
  $purpleBtn.on('click', storeGuess);




});
