$(function(){

  //==============================================================================
  //----------------------ARRAYS FOR FEEDBACK CODE & GUESSES----------------------
  //--------------------------& Global Elements-----------------------------------
  //==============================================================================
  //array to hold the codemaker's selection
  var code = [];
  //array to hold the most recent guess by the code breaker
  var guess = [];
  //an array to store feedback for computer if I get to making the computer be the code breaker
  var feedback = [];

  //==============================================================================
  //---------------------------Keeping Score Elements-----------------------------
  //-----------------------------Players and Points-------------------------------
  //==============================================================================

  var playerOne = { name: "",
  role: 'code maker',
  points: 0         };

  var playerTwo = { name: "",
  role: 'code breaker',
  points: 0         };
  // console.log($inputOne.val());
  var $inputOne = $('<input>').attr('type', 'text').attr('id', 'input-one').addClass('nameInput').attr('placeholder', "Enter Code Maker's Name");

  var $inputTwo = $('<input>').attr('type', 'text').attr('id', 'input-two').addClass('nameInput').attr('placeholder', "Enter Code Breaker's Name");
  // console.log($inputOne);

  //player scores;
  var codeMakerScore = 0;
  var codeBreakerScore = 0;

  //div to hold the scores
  var $scoreDiv = $('#score-container');
  // $playerOneScoreBoard = $('<p>').text(playerOne.name + ": " + playerOne.points);
  // $playerTwoScoreBoard = $('<p>').text(playerTwo.name + ": " + playerTwo.points);



  //==============================================================================
  //--------------------------------BUTTONS GRABBED-------------------------------
  //==============================================================================
  //these are my buttons to choose sequences
  var $startBtn = $('#start-button');

  var $redBtn = $('#red');
  var $yellowBtn = $('#yellow');
  var $blueBtn = $('#blue');
  var $orangeBtn = $('#orange');
  var $greenBtn = $('#green');
  var $purpleBtn = $('#purple');

  //feedback buttons!
  var $black = $('#black');
  var $gray = $('#gray');
  var $feedbackEmptyBtn = $('#feedback-empty-button');

  //display code button
  var $displayCodeBtn = $('#displayCode');

  //player mode buttons
  var $versusComputerBtn = $('<button>').attr('id','versus-computer-btn').addClass('player-mode').text("Versus Computer");
  var $twoPlayerBtn = $('<button>').attr('id','two-player-btn').addClass('player-mode').text("Two Player");

  //reset button
  var $startNextRoundBtn = $('<button>').attr('id', 'next-round-start').text('Start Next Round');

  var $beginTwoPlayerBtn = $('<button>').attr('id','begin-two-player');


  //==============================================================================
  //-------------------------------LET'S GET STARTED------------------------------
  //==============================================================================

  var start = function(){
    showPlayerMode();
    $twoPlayerBtn.on('click', twoPlayerMode);
    // $versusComputerBtn.on('click', versusComputerMode);
  };

  var showPlayerMode = function(){
    $startBtn.css('display', 'none');
    $('.instruction').append($twoPlayerBtn).append($versusComputerBtn);
  };


  //==============================================================================
  //----------------------------Two Player Mode Set UP----------------------------
  //==============================================================================
  var submitNames = function(){
    playerOne.name = $inputOne.val();
    playerTwo.name = $inputTwo.val();

    $playerOneScoreBoard = $('<p>').text(playerOne.name + ": " + playerOne.points);
    $playerTwoScoreBoard = $('<p>').text(playerTwo.name + ": " + playerTwo.points);
    $scoreDiv.append($playerOneScoreBoard);
    $scoreDiv.append($playerTwoScoreBoard);
    console.log(playerTwo.name);
  };

  var twoPlayerMode = function(){

    $('.instruction').append($inputOne);
    $('.instruction').append($beginTwoPlayerBtn);
    $beginTwoPlayerBtn.text("Begin!");
    $('.instruction').append($inputTwo);
    $startBtn.css('display', 'none');
    $('.player-mode').css('display', 'none');
    $('.feedback-buttons').css('visibility', 'visible');
    $('#feedback-empty-button').css('visibility', 'visible');

    $beginTwoPlayerBtn.on('click', codeMakerFirstTurn);
    $beginTwoPlayerBtn.on('click', submitNames);
  };

  //==============================================================================
  //-------------------------------Reset for Rounds-------------------------------
  //==============================================================================
  var startNextRound = function(){
    // console.log("inside startNextRound");
    $('.controls').append($startNextRoundBtn);
    $startNextRoundBtn.on('click', reset);
    if(playerOne.role == 'code maker'){
      playerOne.score = playerOne.score + codeMakerScore;
      playerTwo.score = playerTwo.score + codeBreakerScore;
    } else if(playerOne.role == "code breaker"){
      playerOne.score = playerOne.score + codeBreakerScore;
      playerTwo.score = playerTwo.score + codeBreakerScore;
    };
  };
  var reset = function(){

    code = [];
    guess = [];
    feedback = []
    codeMakerScore = 0;
    codeBreakerScore = 0;
    $('#next-round-start').remove();
    $('.instruction').text("").css('font-size', '35px');
    $('.guess-rows').empty();
    $('#code-storage').empty();
    $('.feedback-rows').empty();
    codeMakerFirstTurn();
  };



  $startBtn.on('click', start);
  console.log("You're doing fine");
  //==============================================================================
  //----------------------------CODEMAKER SELECTS CODE ---------------------------
  //==============================================================================
  //when button is clicked....store in code-storage array and append
  var codeMakerFirstTurn = function(){
    $('.nameInput').css('display', 'none');
    $beginTwoPlayerBtn.css('display','none');
    if(code.length < 4){
      var storeCode = function(){
        code.push($(this).attr('id'));
        var $selectedCode = $('<div>').attr('id',$(this).attr('id'));
        $selectedCode.addClass('sequence-square');
        // for (var i = 0; i < code.length; i++) {
        //   var $selectedCode = $('<div>').attr('id', code[i]);
        //   $selectedCode.addClass('sequence-square');
        //   $('#code-storage').append($selectedCode);
        // };
        $('#code-storage').append($selectedCode);
        if (code.length == 4){
          $('.instruction').text("Code Breaker: make your guess.");

          $redBtn.off('click', storeCode);
          $yellowBtn.off('click', storeCode);
          $blueBtn.off('click', storeCode);
          $orangeBtn.off('click', storeCode);
          $greenBtn.off('click', storeCode);
          $purpleBtn.off('click', storeCode);

          codeBreakerGuess();
        };
      };
      var $instruction = $('<div>').text("Code Maker: Select your code.");
      $('.instruction').prepend($instruction);
      // $redBtn.on('click', storeCode);
      // $yellowBtn.on('click', storeCode);
      // $blueBtn.on('click', storeCode);
      // $orangeBtn.on('click', storeCode);
      // $greenBtn.on('click', storeCode);
      // $purpleBtn.on('click', storeCode);
    };
    $redBtn.on('click', storeCode);
    $yellowBtn.on('click', storeCode);
    $blueBtn.on('click', storeCode);
    $orangeBtn.on('click', storeCode);
    $greenBtn.on('click', storeCode);
    $purpleBtn.on('click', storeCode);
  };

  //==============================================================================
  //---------------------------CODEBREAKER MAKES GUESS----------------------------
  //==============================================================================
  //when button is clicked, store in guess code-guess-container array and append
  var codeBreakerGuess = function(){

    guess = [];
    console.log("still doing swell:)");
    if(guess.length <= 4){
      var storeGuess = function(){
        var $selectedGuess = $('<div>').attr('id',$(this).attr('id'));
        $selectedGuess.addClass('guessed-square');
        guess.push($(this).attr('id'));
        // console.log(guess);

        if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length == 4 && $('#third-round-guess > div').length == 4 && $('#fourth-round-guess > div').length < 4 ){
          $('#fourth-round-guess').append($selectedGuess);

        } else if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length == 4 && $('#third-round-guess > div').length < 4){
          $('#third-round-guess').append($selectedGuess);

        } else if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length < 4){
          $('#second-round-guess').append($selectedGuess);

        } else if($('#first-round-guess > div').length < 4){
          $('#first-round-guess').append($selectedGuess);

        };

        if (guess.length == 4){
          $('.instruction').text("Feedback time.");

          $redBtn.off('click', storeGuess);
          $yellowBtn.off('click', storeGuess);
          $blueBtn.off('click', storeGuess);
          $orangeBtn.off('click', storeGuess);
          $greenBtn.off('click', storeGuess);
          $purpleBtn.off('click', storeGuess);

          feedbackTime();
        };
      };
      $redBtn.on('click', storeGuess);
      $yellowBtn.on('click', storeGuess);
      $blueBtn.on('click', storeGuess);
      $orangeBtn.on('click', storeGuess);
      $greenBtn.on('click', storeGuess);
      $purpleBtn.on('click', storeGuess);
      // console.log(code);
      // console.log(guess);
    };

  };


  //==============================================================================
  //---------------------------CODE MAKER GIVES FEEDBACK--------------------------
  //==============================================================================

  var feedbackTime = function(){
    console.log(guess);
    console.log(code);
    feedback = [];

    // code.length == 4 && guess.length == 4 &&
    if(code[0] == guess[0] && code[1] == guess[1] && code[2] == guess[2] && code[3] == guess[3]){
      $('.instruction').text("Code Breaker wins round!");
      codeBreakerScore += 1;
      codeBreakerWinner = true;
      startNextRound();

    } else {
      codeMakerScore += 1;
    };
    console.log(codeMakerScore);
    console.log(codeBreakerScore);

  };


  var giveFeedback = function (){
    console.log(feedback);
    feedback.push($(this).attr('id'));

    var $feedback = $('<div>').attr('id',$(this).attr('id')).addClass('feedback-square');

    var $noFeedback
    $('<div>').addClass('feedback-square');

    if($('#first-round-feedback > div').length == 4 && $('#second-round-feedback > div').length == 4 &&
    $('#third-round-feedback > div').length == 4 &&
    $('#fourth-round-feedback > div').length < 4 ){
      $('#fourth-round-feedback').append($feedback);
      $('#fourth-round-feedback').append($noFeedback);

    } else if($('#first-round-feedback > div').length == 4 && $('#second-round-feedback > div').length == 4 &&
    $('#third-round-feedback > div').length < 4){
      $('#third-round-feedback').append($feedback);
      $('#third-round-feedback').append($noFeedback);

    } else if($('#first-round-feedback > div').length == 4 && $('#second-round-feedback > div').length < 4){
      $('#second-round-feedback').append($feedback);
      $('#second-round-feedback').append($noFeedback);

    } else if($('#first-round-feedback > div').length < 4){
      $('#first-round-feedback').append($feedback);
      $('#first-round-feedback').append($noFeedback);
    };

    if (feedback.length == 4 && $('#fourth-round-feedback > div').length < 4){
      $('.instruction').text("Code Breaker: make your guess.");
      codeBreakerGuess();
    };

    if($('#fourth-round-feedback > div').length == 4){
      codeMakerScore += 2;
      $('.instruction').text("Code Maker wins round!");
      console.log(codeMakerScore);
      startNextRound();
    };
  };
  $black.on('click', giveFeedback);
  $gray.on('click', giveFeedback);
  $feedbackEmptyBtn.on('click', giveFeedback);


  //==============================================================================
  //---------------------------so, WHO WINS?????????????--------------------------
  //==============================================================================
  var codeBreakerWinner = false;



  // if(codeBreakerWinner){
  //   startNextRound();
  // };


  var displayCode = function(){
    $displayCodeBtn.on('click', hideCode);
    $displayCodeBtn.text("Hide Code");
    $('.sequence-square').css('visibility', 'visible');
  };

  var hideCode = function(){
    $('.sequence-square').css('visibility', 'hidden');
    $displayCodeBtn.text("Display Code");
    $displayCodeBtn.on('click', displayCode);
  };

  $displayCodeBtn.on('click', displayCode);
});




// if($('#fourth-round-guess > div').length == 4 && $('#first-round-feedback > div').length > 0 && $('#second-round-feedback > div').length > 0 && $('#third-round-feedback > div').length > 0){
//   $('#fourth-round-feedback').append($feedback);
// } else if($('#third-round-guess > div').length == 4 && $('#first-round-feedback > div').length > 0 && $('#second-round-feedback > div').length > 0){
//   $('#third-round-feedback').append($feedback);
//
// } else if($('#first-round-feedback > div').length > 0  && $('#second-round-guess > div').length == 4){
//   $('#second-round-feedback').append($feedback);
// } else {
//   $('#first-round-feedback').append($feedback);
// };
// console.log(guess);
//
// var endFeedback = function(){
//
//   $black.off('click', giveFeedback);
//   $gray.off('click', giveFeedback);
//   // givePointToCodeMaker();
//   $('.instruction').text("Code Breaker: make your guess.");
//   console.log(code);
//   console.log(guess);
//   codeBreakerGuess();
// };
