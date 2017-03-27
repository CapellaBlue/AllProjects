  $(function(){

//==============================================================================
//----------------------ARRAYS FOR FEEDBACK CODE & GUESSES----------------------
//==============================================================================
    //array to hold the codemaker's selection
    var code = [];
    var guess = [];
    // var guess1 = [];
    // var guess2 = [];
    // var guess3 = [];
    // var guess4 = [];
    var feedback = [];


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

    //display code button
    var $displayCodeBtn = $('#displayCode');


//==============================================================================
//-------------------------------LET'S GET STARTED------------------------------
//==============================================================================

    var start = function(){
      codeMakerFirstTurn();
    };

    console.log("You're doing fine");
//==============================================================================
//----------------------------CODEMAKER SELECTS CODE ---------------------------
//==============================================================================
    //when button is clicked....store in code-storage array and append
    var codeMakerFirstTurn = function(){
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
        console.log('something');
        var storeGuess = function(){
          console.log('storeGuess');
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
          // } else if($('#first-round-guess > div').length == 4 && $('#second-round-guess > div').length == 4 &&
          // $('#third-round-guess > div').length == 4 &&
          // $('#fourth-round-guess > div').length == 4) {
          //
          // }
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
    var giveFeedback = function (){
      feedback.push($(this).attr('id'));
      var $feedback = $('<div>').attr('id', $(this).attr('id')).addClass('feedback-square');
      $('#first-round-feedback').append($feedback);

      if($('#first-round-feedback > div').length < 5){
        $('#first-round-feedback').append($feedback);
      } else if($('#first-round-feedback > div').length == 5 && $('#second-round-feedback > div').length < 4){
        $('#second-round-feedback').append($feedback);
      } else if($('#first-round-feedback > div').length == 5 && $('#second-round-feedback > div').length == 4 &&
      $('#third-round-feedback > div').length < 4){
        $('#third-round-feedback').append($feedback);
      } else if($('#first-round-feedback > div').length == 5 && $('#second-round-feedback > div').length == 4 &&
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

    console.log(feedback);
    $black.on('click', giveFeedback);
    $gray.on('click', giveFeedback);
  };


//==============================================================================
//---------------------------so, WHO WINS?????????????--------------------------
//==============================================================================

  var displayCode = function(){
    console.log(code);
    $displayCodeBtn.text("Hide Code");
    for (var i = 0; i < code.length; i++) {
      var $selectedCode = $('<div>').attr('id', code[i]);
      $selectedCode.addClass('sequence-square');
      $('#code-storage').append($selectedCode);
      $displayCodeBtn.on('click', function(){
        $('.sequence-square').css('display', 'none');
        $displayCodeBtn.text("Display Code");
      });
    };
  };


  $displayCodeBtn.on('click', displayCode);



start();



});
