const RESHUFLE_DEK = "https://deckofcardsapi.com/api/deck/k4kl0ljiy27t/shuffle/";
const DRW_CRD = "https://deckofcardsapi.com/api/deck/k4kl0ljiy27t/draw/?count=2";
const housePick = "https://www.anapioficeandfire.com/api/houses/"
const charPick = "https://www.anapioficeandfire.com/api/characters/"
function houseApi(houseId, callback) {
  const settings = {
    url: `${housePick}${houseId}`,
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function charsApi(charId, callback) {
  const settings = {
    url: `${charPick}${charId}`,
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

let villian = {
  name: null,
  img: null,
  houseName: null,
  houseImg: null
};

let hero = {
  name: null,
  img: null,
  houseName: null,
  houseImg: null
};

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
  $('.house-div').on('click', '.house-img', function(event){
    $('.house-div .ul').addClass('hidden')
    $(event.target).siblings('.ul').removeClass('hidden')
  })
  $('.char').click(function(event){
    event.stopPropagation()
    hero.img = $(event.target).attr('src')
    hero.houseImg = $(event.target).closest('.house-div').find('.house-img').attr('src')
    heroId = $(event.currentTarget).attr('id');
    houseId = $(event.target).closest('.house-div').attr('id')
    charsApi(heroId, processHero)
    houseApi(houseId, processHouse)
  })
}

function processHouse(response) {
  hero.houseName = response.name
  console.log(hero)
}

function processHero(response) {
  hero.name = response.name
}

function charSelect() {
  $('.char-select-but').click(function(){
    $('.char-select-sec').addClass('hidden');
    $('.game-area-sec').removeClass('hidden');
    })
}


function testCall(data) {
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

