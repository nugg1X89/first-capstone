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

let villain = {
  name: "Darth Vader",
  img: "troll",
  houseName: "Sith",
  houseImg: "lol"
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
  });
  $('.house-div').on('click', '.house-img', function(event){
    $('.house-div .ul').addClass('hidden')
    $(event.target).siblings('.ul').removeClass('hidden')
  });
  $('.char').click(function(event){
    event.stopPropagation()
    hero.img = $(event.target).attr('src')
    hero.houseImg = $(event.target).closest('.house-div').find('.house-img').attr('src')
    heroId = $(event.currentTarget).attr('id');
    houseId = $(event.target).closest('.house-div').attr('id')
    charsApi(heroId, processHero);
    houseApi(houseId, processHouse);
  })
  $('.char-select-but').click(function(event){
    $('.char-select-sec').addClass('hidden')
    $('.game-area-sec').removeClass('hidden')
    drawCard()
    warGame()
  })


}

function warGame(){
  $('.game-area-sec').find('.game-area-hero').append(`${hero.name} of ${hero.houseName}`)
  $('.game-area-sec').find('.game-area-villain').append(`${villain.name} of ${villain.houseName}`)
  $('.game-area-sec').find('.game-area-hero-card').append(`<img src${hero.img}> ${heroCard} <img src ${hero.houseImg}>`)
  //$('.game-area-sec').find('.game-area-hero-card').append(`${hero.name} of ${hero.houseName}`)
console.log(heroCard)

}

function processHouse(response) {
  hero.houseName = response.name
}

function processHero(response) {
  hero.name = response.name
  $('.char-select-confirm1').html(`
    <p>Currently selected ${hero.name} confirm when ready</p>`)
   $('.char-select-but').removeClass('hidden') 
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
  villainCard = cardsVal[0]
  heroCard = cardsVal[1]
  if (hero > villain){
    console.log("win")
  } else if (villain > hero) {
    console.log("Lose")
  } else {
    console.log("tie")
  }
 }

intialWar()
