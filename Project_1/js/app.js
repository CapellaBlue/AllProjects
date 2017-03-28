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

    //player scores;
    var playerOneScore = 0;
    var playerTwoScore = 0;


//==============================================================================
//--------------------------------BUTTONS GRABBED-------------------------------
//==============================================================================
    //these are my buttons to choose sequences
    var $redBtn = $('#red');
    var $yellowBtn = $('#yellow');
    var $blueBtn = $('#blue');
    var $orangeBtn = $('#orange');
    var $greenBtn = $('#green');
    var $purpleBtn = $('#purple');

    //feedback buttons!
    var $black = $('#black');
    var $gray = $('#gray');
    var $feedbackDone = $('#feedback-done-button');

    //display code button
    var $displayCodeBtn = $('#displayCode');

    var $versusComputerBtn = $('#versus-computer-btn');
    var $twoPlayerBtn =$('#two-player-btn');


//==============================================================================
//-------------------------------LET'S GET STARTED------------------------------
//==============================================================================

    var start = function(){
      var twoPlayerMode = function(){
        codeMakerFirstTurn();
      };

      $twoPlayerBtn.on('click', twoPlayerMode);
      // $versusComputerBtn.on('click', versusComputerMode);

    };

    console.log("You're doing fine");
//==============================================================================
//----------------------------CODEMAKER SELECTS CODE ---------------------------
//==============================================================================
    //when button is clicked....store in code-storage array and append
    var codeMakerFirstTurn = function(){
      $('.player-mode').css('display', 'none');
      $('.feedback-buttons').css('visibility', 'visible');
      $('#feedback-done-button').css('visibility', 'visible');
      if(code.length < 4){
        var storeCode = function(){
          var $selectedCode = $('<div>').attr('id',$(this).attr('id'));
          $selectedCode.addClass('sequence-square-hidden');
          $selectedCode.css('display', 'none');
          code.push($(this).attr('id'));
          $('#code-storage').append($selectedCode);
          if (code.length == 4){
            $('h1').text("Code Breaker: make your guess.");

            $redBtn.off('click', storeCode);
            $yellowBtn.off('click', storeCode);
            $blueBtn.off('click', storeCode);
            $orangeBtn.off('click', storeCode);
            $greenBtn.off('click', storeCode);
            $purpleBtn.off('click', storeCode);

            codeBreakerGuess();
          };
        };
        var $instruction = $('<h1>').text("Code Maker: Select your code.");
        $('.instruction').prepend($instruction);
        $redBtn.on('click', storeCode);
        $yellowBtn.on('click', storeCode);
        $blueBtn.on('click', storeCode);
        $orangeBtn.on('click', storeCode);
        $greenBtn.on('click', storeCode);
        $purpleBtn.on('click', storeCode);
      };
    };

//==============================================================================
//---------------------------CODEBREAKER MAKES GUESS----------------------------
//==============================================================================
  //when button is clicked, store in guess code-guess-container array and append
  var codeBreakerGuess = function(){

      guess = [];
      console.log("still doing swell:)");
      if(guess.length < 4){
        var storeGuess = function(){
          var $selectedGuess = $('<div>').attr('id',$(this).attr('id'));
          $selectedGuess.addClass('guessed-square');
          guess.push($(this).attr('id'));


          if($('#first-round-guess > div').length < 4){
            $('#first-round-guess').append($selectedGuess);
          } else if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length < 4){
            $('#second-round-guess').append($selectedGuess);
          } else if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length == 4 && $('#third-round-guess > div').length < 4){
            $('#third-round-guess').append($selectedGuess);
          } else if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length == 4 && $('#third-round-guess > div').length == 4 && $('#fourth-round-guess > div').length < 4 ){
            $('#fourth-round-guess').append($selectedGuess);
            };


          if (guess.length == 4){
            $('h1').text("Feedback time.");

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
  feedback = [];


    for (var i = 0; i < code.length; i++) {
      if(code[i] == guess[i] && code[i + 1] == guess[i + 1] && code[i + 2] == guess[i + 2] && code[i + 3] == guess[i + 3]){
      $('.instruction').text("Code Breaker wins round!").css('color','white').css('font-size', '50px');//maybe add a reset button here.
      playerOneScore += .25;
      console.log(playerOneScore);
    };
  };


  var giveFeedback = function (){
    feedback.push($(this).attr('id'));
    var $feedback = $('<div>').attr('id', $(this).attr('id')).addClass('feedback-square');


      if($('#first-round-feedback > div').length < 4){
        $('#first-round-feedback').append($feedback);
      } else if($('#first-round-feedback > div').length == 4 && $('#second-round-feedback > div').length < 4){
        $('#second-round-feedback').append($feedback);
      } else if($('#first-round-feedback > div').length == 4 && $('#second-round-feedback > div').length == 4 &&
      $('#third-round-feedback > div').length < 4){
        $('#third-round-feedback').append($feedback);
      } else if($('#first-round-feedback > div').length == 4 && $('#second-round-feedback > div').length == 4 &&
      $('#third-round-feedback > div').length == 4 &&
      $('#fourth-round-feedback > div').length < 4 ){
        $('#fourth-round-feedback').append($feedback);
      };

      if (feedback.length == 4){
        $('h1').text("Code Breaker: make your guess.");

        $black.off('click', giveFeedback);
        $gray.off('click', giveFeedback);

        codeBreakerGuess();

      };
    };
    $black.on('click', giveFeedback);
    $gray.on('click', giveFeedback);
  };




//==============================================================================
//---------------------------so, WHO WINS?????????????--------------------------
//==============================================================================

  var displayCode = function(){
    $displayCodeBtn.on('click', hideCode);
    $displayCodeBtn.text("Hide Code");
    for (var i = 0; i < code.length; i++) {
      var $selectedCode = $('<div>').attr('id', code[i]);
      $selectedCode.addClass('sequence-square');
      $('#code-storage').append($selectedCode);
    };
  };
  var hideCode = function(){
    $('.sequence-square').css('display', 'none');
    $displayCodeBtn.text("Display Code");
    $displayCodeBtn.on('click', displayCode);
  };


  $displayCodeBtn.on('click', displayCode);



start();



});
