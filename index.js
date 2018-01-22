const twitterUserUrl = "https://api.twitter.com/1.1/users/lookup.json"

function getDataFromApi(searchTerm, callback) {
  const settings = {
    url: twitterUserUrl,
    // data: {
    //   q: `${searchTerm} in:name`,
    //   per_page: 5
    // },
    dataType: 'json',
    type: 'GET',
    success: callback
  };

  $.ajax(settings);
}

function authKeyTwit () {
  const keySecretTwit = 'QTFXwNrFqFS8UMfYzGOPSFd7C:i8r1ilkKWSuCQd4VSIABUE8W0wICAfQl2si88e3IhYVz3L8UxG'
  const twitAuth = 'https://api.twitter.com/oauth2/token'
  const encode = btoa(keySecretTwit)
  const settingS = {
    url: twitAuth,
    type: 'POST',
    dataType: 'json',
    headers: {"Authorization": "Basic " + encode,
    "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
    "Access-Control-Allow-Origin": "*"},
    data: 'grant_type=client_credentials',
    success: parseToken
  }
  $.ajax(settingS);
}

function parseToken (data) {
  console.log(data)
}

function loadTwitterData () {
  authKeyTwit()
  //getDataFromApi(null, testCallBack)
}

function testCallBack (data) {
  console.log(data);
}

loadTwitterData()
