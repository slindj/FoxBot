var Client = require('node-rest-client').Client;


exports.list = function(bot, to) {
  var client = new Client()
  client.get("http://localhost:3000/list", function (data, response) {
    var text = data.toString('ascii')
    var item_list = JSON.parse(text)
    console.log(text)
    bot.say(to, "Tracking the fol locations")
    item_list.forEach( function(element) {
      bot.say(to, "Name: " + element.name + ", Lat: " + element.lat.toString() + ", Lon: " + element.lon.toString() )
    })

  })
}