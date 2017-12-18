const Geodesy = require('geodesy')
var Client = require('node-rest-client').Client;


exports.list = function(callback) {
  var client = new Client()
  client.get("http://localhost:3000/list", function (data, response) {
    var text = data.toString('ascii')
    var item_list = JSON.parse(text)
    console.log(text)
    callback("Tracking the fol locations")
    item_list.forEach( function(element) {
      var ll = new Geodesy.LatLonEllipsoidal(element.lat,element.lon)
      var mgrs = ll.toUtm().toMgrs()    
      callback("ID: " + element.id + ", Name: " + element.name + ", Grid: " + mgrs.toString() )
    })

  })
}
