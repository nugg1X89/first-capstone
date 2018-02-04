const RESHUFLE_DEK = "https://deckofcardsapi.com/api/deck/k4kl0ljiy27t/shuffle/";
const DRW_CRD = "https://deckofcardsapi.com/api/deck/k4kl0ljiy27t/draw/?count=2";
let villian = null;
let hero = null;

function reshufleDeck() {
  const settings = {
    url: RESHUFLE_DEK,
    dataType: 'json',
    type: 'GET'
  };

  $.ajax(settings);
}

function drawCard(callback) {
  const settings = {
    url: DRW_CRD,
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function intialWar() {
  $('.title-screen-but').click(function(){
    $('.title-screen-sec').addClass('hidden');
    $('.char-select-sec').removeClass('hidden');
    reshufleDeck();
  })
  $('.house-div').click(function(event){
    $(event.target).find('.ul').removeClass('hidden')
  })
}


function charSelect() {
  $('.char-select-but').click(function(){
    $('.char-select-sec').addClass('hidden');
    $('.game-area-sec').removeClass('hidden');
    })
}


function testCall(data) {
  console.log(data)
  let cards = data.cards;
  let cardsVal = cards.map(function (card){
    if (card.value === "ACE") {
      return 14;
    } else if (card.value === "KING") {
      return 13;
    } else if (card.value === "QUEEN") {
      return 12;
    } else if (card.value === "JACK") {
      return 11;
    } else {
      return parseInt(card.value);
    }
  })
  villian = cardsVal[0]
  hero = cardsVal[1]
  if (hero > villian){
    console.log("win")
  } else if (villian > hero) {
    console.log("Lose")
  } else {
    console.log("tie")
  }
 }



intialWar()

