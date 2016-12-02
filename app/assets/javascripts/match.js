$(document).ready( function() {
  // variable assignments
  var $cards = $('.cards');
  var firstCard, secondCard;
  var alert = $('.alert');
  var winCount = 0
  var puntos = $('.punctuation')
  var clicks = $('.clicks')
  var clickCount = 0
  var game = $('.game')
  var bigButton = $('.new-game')
  var noMore = $('.done')
  var best = 30
  var theKing = $('.the-king')

  // shuffle array & putting its elements on the cards
  var bla = ['ش', 'ث', 'م', 'ض', 'و', 'ة', 'ك', '٤', 'ش', 'ث', 'م', 'ض', 'و', 'ة', 'ك', '٤']

  function reshuffle() {
    var j, x, i;
    for (i = bla.length; i; i--) {
      j = Math.floor(Math.random() * i);
      x = bla[i - 1];
      bla[i - 1] = bla[j];
      bla[j] = x;
    }
    bla.forEach( function(card,i) {
      $cards.children('p')[i].innerHTML = card
    })
  }

  // evaluate matching || no matching
  function evaluate() {
    if(firstCard.text() === secondCard.text()) {
      firstCard.text('matched').css("font-size","30px");
      firstCard.parent().css("background-color","red");
      secondCard.text('matched').css("font-size","30px");
      secondCard.parent().css("background-color","red");
      alert.text('Match!').fadeOut(500);
      firstCard = null;
      secondCard = null;
      winCount += 1;
      puntos.text("Points: " + winCount)
      reEvaluate();
    } else {
      alert.text('No Match!').fadeOut(500);
      firstCard.fadeOut(1000);
      secondCard.fadeOut(1000);
      firstCard = null;
      secondCard = null;
    }
  }

  // disabling matched buttons
  noMore.click(function() {
    // You won't click anymore!
  });

  // card opening
  $cards.click(function() {
    alert.show('');
    var card = $(this).children();
    if(card.text() === 'matched') {
      noMore();
    } else {
      clickCount += 1;
      clicks.text("Clicks: " + clickCount)
      if(!firstCard) {
        firstCard = card;
        card.show();
      } else {
        secondCard = card;
        card.show();
        evaluate();
      }
    }
  });

  // Checking winning status
  function reEvaluate() {
    if(winCount === 8) {
      alert.text('You Win!!!')
      game.hide();
      bigButton.show();
      $cards.children().fadeOut(10);
      if(clickCount < best) {
        best = clickCount;
      }
    }
  }

  // New game button reseter
  bigButton.click(function(){
    game.show();
    bigButton.hide();
    winCount = 0;
    puntos.text("Points: " + winCount);
    $cards.css("background-color","white")
    $cards.children().css("font-size","40px")
    theKing.text("Best: " + best)
    clickCount = 0
    reshuffle();
  })

  // start
  reshuffle();
});
