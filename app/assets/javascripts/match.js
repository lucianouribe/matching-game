$(document).ready( function() {
  var $cards = $('.cards');
  var firstCard, secondCard;
  var alert = $('.alert');
  var winCount = 0
  var puntos = $('.punctuation')
  var game = $('.game')
  var bigButton = $('.new-game')
  var noMore = $('.done')


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

  function evaluate() {
    if(firstCard.text() === secondCard.text()) {
      firstCard.text('matched');
      secondCard.text('matched');
      alert.text('Match!').fadeOut(500);
      firstCard = null;
      secondCard = null;

      winCount += 1;
      puntos.text(winCount)
      reEvaluate();
    } else {
      alert.text('No Match!').fadeOut(500);
      firstCard.fadeOut(1000);
      secondCard.fadeOut(1000);
      firstCard = null;
      secondCard = null;
    }
  }

  noMore.click(function() {
    // You won't click anymore!
  });

  $cards.click(function() {
    // debugger;
    alert.show('');
    var card = $(this).children();
    if(card.text() === 'matched') {
      noMore();
    } else {
      if(!firstCard) {
        firstCard = card;
        card.show();
        // debugger;
      } else {
        secondCard = card;
        card.show();
        evaluate();
      }
    }
  });

  function reEvaluate() {
    if(winCount === 8) {
      alert.text('You Win!!!')
      game.hide();
      bigButton.show();
      $cards.children().fadeOut(10);
      reshuffle();
    }
  }

  bigButton.click(function(){
    game.show();
    bigButton.hide();
    winCount = 0;
    puntos.text(winCount);
  })


  reshuffle();
});
