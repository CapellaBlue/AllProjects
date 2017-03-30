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
  var roundLimit = 0;

  var roundCount = 1;

  var playerOne = { name: "",
  role: 'Code Maker',
  points: 0         };

  var playerTwo = { name: "",
  role: 'Code Breaker',
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

  //button pressed when two player's names are entered.
  var $beginTwoPlayerBtn = $('<button>').attr('id','begin-two-player');

  //the user choses between 2 or 4 rounds.
  var $twoRoundsBtn = $('<button>').attr('id','two-rounds-button').text("Two Rounds");
  var $fourRoundsBtn =$('<button>').attr('id','four-rounds-button').text("Four Rounds");

  //==============================================================================
  //-------------------------------LET'S GET STARTED------------------------------
  //==============================================================================
  var $masterMind = $('<h1>').text("MASTER MIND").css('text-align','justify').css('padding', 'zero');
  $scoreDiv.append($masterMind);

  var pickRounds = function(){
    $startBtn.css('display','none');
    $('.instruction').append($twoRoundsBtn);
    $('.instruction').append($fourRoundsBtn);
    $twoRoundsBtn.on('click', twoRounds);
    $fourRoundsBtn.on('click', fourRounds);
  };

  //this function shows the two player mode options.
  var showPlayerMode = function(){
    $twoRoundsBtn.css('display', 'none');
    $fourRoundsBtn.css('display', 'none');
    $('.instruction').append($twoPlayerBtn).append($versusComputerBtn);
    $twoPlayerBtn.on('click', twoPlayerMode);
    // $versusComputerBtn.on('click', versusComputerMode);
  };



  $startBtn.on('click', pickRounds);
  //==============================================================================
  //----------------------------Two Player Mode Set UP----------------------------
  //==============================================================================
  var submitNames = function(){
    $masterMind.remove();
    playerOne.name = $inputOne.val();
    playerTwo.name = $inputTwo.val();

    $playerOneScoreBoard = $('<p>').text(playerOne.role + ": " + playerOne.name + ": " + playerOne.points);
    $playerTwoScoreBoard = $('<p>').text(playerTwo.role + ": " + playerTwo.name + ": "+ playerTwo.points);
    $scoreDiv.append($playerOneScoreBoard);
    $scoreDiv.append($playerTwoScoreBoard);
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
  //-------------------------------Reset & Rounds-------------------------------
  //==============================================================================

  var twoRounds = function(){
    roundLimit = 4;
    showPlayerMode();
  };

  var fourRounds = function(){
    roundLimit = 8;
    showPlayerMode();
  };

  var checkRound = function(){
    console.log("checkRound here");
    if(roundCount == roundLimit){
      declareWinner();
    } else {
      startNextRound();
    };
  };

  var startNextRound = function(){
    console.log("inside startNextRound");
    $('.controls').append($startNextRoundBtn);
    if(playerOne.role == 'Code Maker'){
      playerOne.points = playerOne.points + codeMakerScore;
      playerTwo.points = playerTwo.points + codeBreakerScore;
    } else if(playerOne.role == 'Code Breaker'){
      playerOne.points = playerOne.points + codeBreakerScore;
      playerTwo.points = playerTwo.points + codeMakerScore;
    };

    $playerOneScoreBoard.text(playerOne.role + ": " + playerOne.name + ": " + playerOne.points);
    $playerTwoScoreBoard.text(playerTwo.role + ": " + playerTwo.name + ": "+ playerTwo.points);
    $startNextRoundBtn.on('click', reset);
  };

  var reset = function(){
    console.log(playerOne.role);
    if(playerOne.role == "Code Maker"){
      playerOne.role = "Code Breaker";
      playerTwo.role = "Code Maker";
    } else if(playerOne.role == "Code Breaker"){
      playerOne.role = "Code Maker";
      playerTwo.role = "Code Breaker";
    };
    $playerOneScoreBoard.text(playerOne.role + ": " + playerOne.name + ": " + playerOne.points);
    $playerTwoScoreBoard.text(playerTwo.role + ": " + playerTwo.name + ": "+ playerTwo.points);
    roundCount += 1;
    console.log("roundCount is " + roundCount);
    code = [];
    guess = [];
    feedback = [];
    codeMakerScore = 0;
    codeBreakerScore = 0;
    $('#next-round-start').remove();
    $('.instruction').text("");
    $('.guess-rows').empty();
    $('#code-storage').empty();
    $('.feedback-rows').empty();
    codeMakerFirstTurn();
  };




  console.log("You're doing fine");
  //==============================================================================
  //----------------------------CODEMAKER SELECTS CODE ---------------------------
  //==============================================================================

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
  //when button is clicked....store in code-storage array and append
  var codeMakerFirstTurn = function(){
    $('.nameInput').css('display', 'none');
    $beginTwoPlayerBtn.css('display','none');
    if(code.length < 4){
      var storeCode = function(){
        code.push($(this).attr('id'));
        var $selectedCode = $('<div>').attr('id',$(this).attr('id'));
        $selectedCode.addClass('sequence-square');

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
    console.log("inside codeBreakerGuess");
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

    };

  };


  //==============================================================================
  //---------------------------CODE MAKER GIVES FEEDBACK--------------------------
  //==============================================================================

  var feedbackTime = function(){

    feedback = [];

    if(code[0] == guess[0] && code[1] == guess[1] && code[2] == guess[2] && code[3] == guess[3]){
      $('.instruction').text("Code Breaker wins round!");
      codeBreakerScore += 1;
      checkRound()
    } else {
      codeMakerScore += 1;
    };

  };


  var giveFeedback = function (){

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
      codeMakerScore += 1;
      if(roundCount == roundLimit){
        declareWinner();
      } else if(roundCount < roundLimit){
        $('.instruction').text("Code Maker wins round!");
      };
    };
  };
  $black.on('click', giveFeedback);
  $gray.on('click', giveFeedback);
  $feedbackEmptyBtn.on('click', giveFeedback);


  //==============================================================================
  //---------------------------so, WHO WINS?????????????--------------------------
  //==============================================================================

  var declareWinner = function(){
    console.log("inside declareWinner");
    $('instruction').text("");
    $scoreDiv.text("");
    $scoreDiv.append($masterMind);
    if(playerOne.points > playerTwo.points){
      $('.instruction').text(playerOne.name + "wins with" + playerOne.points + "points!");
    } else if(playerTwo.points > playerOne.points){
      $('.instruction').text(playerOne.name + "wins with" + playerOne.points + "points!");
    };
  };


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
