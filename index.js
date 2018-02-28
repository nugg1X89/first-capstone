const RESHUFLE_DEK = "https://deckofcardsapi.com/api/deck/k4kl0ljiy27t/shuffle/";
const DRW_CRD = "https://deckofcardsapi.com/api/deck/k4kl0ljiy27t/draw/?count=4";
const housePick = "https://www.anapioficeandfire.com/api/houses/"
const charPick = "https://www.anapioficeandfire.com/api/characters/"
const CRD_BCK = '<img src = "https://i.imgur.com/qfx2nUf.png">'

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
  name: "The Night King",
  img: "https://vignette.wikia.nocookie.net/gameofthrones/images/1/1f/Night_King_BTW.jpg/revision/latest?cb=20171013162809",
  houseName: "The White Walkers",
  houseImg: "https://vignette.wikia.nocookie.net/gameofthrones/images/e/e0/Walkerhorse3.png/revision/latest?cb=20160811101113"
};

let hero = {
  name: null,
  img: null,
  houseName: null,
  houseImg: null
};

let cardsForPlay = null ;

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

function processHouse(response) {
  hero.houseName = response.name
}

function processHero(response) {
  hero.name = response.name
  $('.char-select-confirm1').html(`
    <p>Currently selected ${hero.name} confirm when ready</p>`)
   $('.char-select-but').removeClass('hidden') 
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
    drawCard(cardCall)
    warGame()
  })
}

function warGame(){
  $('.game-area-sec').find('.game-area-hero').html(`${hero.name} <img src='${hero.img}'> of ${hero.houseName} <img src='${hero.houseImg}'>`)
  $('.game-area-sec').find('.game-area-villain').html(`${villain.name} of ${villain.houseName}`)
}

function cardCall(data) {
  let cards = data.cards;
  let cardsObj = cards.map(function (card){
    const newObj = {
      img: card.image
    }
    if (card.value === "ACE") {
      newObj.value = 14;
    } else if (card.value === "KING") {
      newObj.value = 13;
    } else if (card.value === "QUEEN") {
      newObj.value = 12;
    } else if (card.value === "JACK") {
      newObj.value = 11;
    } else {
      newObj.value = parseInt(card.value);
    }
    return newObj;
  })
  console.log(cardsObj)
  cardsForPlay = cardsObj
  
 
  $('.game-area-hero-card').html(`<img src='${cards[1].image}'>`)
  console.log(cards[0].image)
  declareWar();
 }

function declareWar(){
  $('.game-area-but').click(function(event){
    $('.results-screen-sec').removeClass('hidden')
    $('.game-area-sec').addClass('hidden')
  }) 
  if (cardsForPlay[1].value > cardsForPlay[0].value){
    $('.winner-div').html(winHtml(hero, cardsForPlay[1]))
    $('.loser-div').html(loseHtml(villain, cardsForPlay[0]))
  } else if (cardsForPlay[1].value < cardsForPlay[0].value) {
    $('.winner-div').html(winHtml(villain, cardsForPlay[0]))
    $('.loser-div').html(loseHtml(hero, cardsForPlay[1]))
  } else {
    //on tie add tie cards to header or something
    if (cardsForPlay[3].value > cardsForPlay[2].value){
    $('.winner-div').html(`
      Tie declare War ${CRD_BCK} ${CRD_BCK} ${CRD_BCK}
      ${winHtml(hero, cardsForPlay[3])}`)
    $('.loser-div').html(`
      ${CRD_BCK} ${CRD_BCK} ${CRD_BCK}
      ${loseHtml(villain, cardsForPlay[2])}`)
    } else if (cardsForPlay[3].value < cardsForPlay[2].value) {
    $('.winner-div').html(`
      Tie declare War ${CRD_BCK} ${CRD_BCK} ${CRD_BCK}
      ${winHtml(villain, cardsForPlay[2])}`)
    $('.loser-div').html(`
      ${CRD_BCK} ${CRD_BCK} ${CRD_BCK} 
      ${loseHtml(hero, cardsForPlay[3])}`)
    } else {
      $('.winner-div').html(`Stalemate go back to your respective houses and try again`)
      $('.loser-div').html(`
        <img src = ${cardsForPlay[0].img}>
        ${CRD_BCK}
        ${CRD_BCK}
        ${CRD_BCK}
        <img src = ${cardsForPlay[2].img}
        ${villain.name} <img src='${villain.img}'>
        of ${villain.houseName} <img src='${villain.houseImg}'> 
        <img src = ${cardsForPlay[1].img}>
        ${CRD_BCK} 
        ${CRD_BCK} 
        ${CRD_BCK}
        <img src = ${cardsForPlay[3].img}>
        ${hero.name} <img src='${hero.img}'>
        of ${hero.houseName} <img src='${hero.houseImg}>`)
    }
  }
 console.log(cardsForPlay)
 }

function resetWar(){
  $('.results-screen-but').click(function(event){
    $('.results-screen-sec').addClass('hidden')
    $('.title-screen-sec').removeClass('hidden')
    $('.house-div .ul').addClass('hidden')
    $('.char-select-but').addClass('hidden')
    $('.char-select-confirm1').html(``) 
    villain = {
      //change villian to the night king
      name: "Darth Vader",
      img: "troll",
      houseName: "Sith",
      houseImg: "lol"
      };
    hero = {
      name: null,
      img: null,
      houseName: null,
      houseImg: null
      };
    })
}

function winHtml(winner, card) {
  return `
      Winner is ${winner.name} 
      <img src='${winner.img}'> of 
      ${winner.houseName} <img src='${winner.houseImg}'> 
      won with <img src = '${card.img}'>`  
} 

function loseHtml(loser, card) {
  return `
      Loser is ${loser.name} <img src='${loser.img}'> 
      of ${loser.houseName} <img src='${loser.houseImg}'> 
      lost with <img src = '${card.img}'>`
}

resetWar();
intialWar();
