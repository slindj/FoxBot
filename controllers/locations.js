const Geodesy = require('geodesy')
var Client = require('node-rest-client').Client;

exports.locstat = function(message, callback) {
  var parsed = message.match(/!locstat \d+ ([A-Za-z0-9\s]{12,})/i)
  if (parsed == null) {
    callback("There was a problem with your locstat command")
    return;
  }
  var args = {
    path: {id: parseInt(message.split(' ')[1]),
    mgrs: parsed[1].replace(/\s/g, ''),
    time: Math.round(new Date().getTime()/1000)}
  }
  console.log(args)
  var client = new Client()
  var req = client.get("http://localhost:3000/locstat?id=${id}&mgrs=${mgrs}&time=${time}",args,function (data, response) {
    //console.log(data);
    //console.log(response);
    if (response.statusCode == '200') {
      callback("Locstat accepted.")
    }
    else
    {
      callback("Locstat was not accepted.")
    }
  })
  req.on('error', function (err) {
    console.log('request error', err);
    callback("Error occured.")
  });


}
exports.list = function(callback) {
  var client = new Client()
  var req = client.get("http://localhost:3000/list", function (data, response) {
    var text = data.toString('ascii')
    var item_list = JSON.parse(text)
    console.log(text)
    callback("Tracking the fol locations")
    item_list.forEach( function(element) {
      var ll = new Geodesy.LatLonEllipsoidal(element.lat,element.lon)
      var mgrs = ll.toUtm().toMgrs()    
      var date = new Date(0);
      date.setUTCSeconds(element.timestamp)
      callback("ID: " + element.id + ", Name: " + element.name + ", Grid: " + mgrs.toString() + ", Date: " + date.toGMTString()  )
    })

  })
  req.on('error', function (err) {
        console.log('request error', err);
        callback("Error occured.")
  });
}
exports.list_all = function(callback) {
  var client = new Client()
  var req = client.get("http://localhost:3000/list_all", function (data, response) {
    var text = data.toString('ascii')
    var item_list = JSON.parse(text)
    console.log(text)
    callback("Tracking the fol locations")
      item_list.forEach( function(element) {
      var ll = new Geodesy.LatLonEllipsoidal(element.lat,element.lon)
      var mgrs = ll.toUtm().toMgrs()
      var date = new Date(0);
      if (element.active == 1) {
        active = "TRUE"
      }
      else {
        active = "FALSE"
      }
      date.setUTCSeconds(element.timestamp)
      callback("ID: " + element.id + ", Name: " + element.name + ", Grid: " + mgrs.toString() + ", Date: " + date.toGMTString() + ", Active: " + active )
    })
  })
  req.on('error', function (err) {
    console.log('request error', err);
    callback("Error occured.")
  });
}


exports.unhide = function(message, callback) {
  var parsed = message.match(/^!unhide \d+$/i)
  if (parsed == null) {
    callback("There was a problem with your locstat command")
    return;
  }
  var id = parseInt(message.split(' ')[1])
  var client = new Client()
  var req = client.get(`http://localhost:3000/active?id=${id}`, function (data, response) {
    if (response.statusCode == '200') {
      callback("element unhidden")
    }
    else {
      callback("unhide command not accepted")
    }
  })
  req.on('error', function (err) {
    console.log('request error', err);
    callback("Error occured.")
  })
}
exports.hide = function(message, callback) {
  var parsed = message.match(/^!hide \d+$/i)
  if (parsed == null) {
    callback("There was a problem with your locstat command")
    return;
  }
  var id = parseInt(message.split(' ')[1])

  var client = new Client()
  var req = client.get(`http://localhost:3000/inactive?id=${id}`, function (data, response) {
    if (response.statusCode == '200') {
      callback("element hidden")
    }
    else {
      callback("hide command not accepted")
    }
  })
  req.on('error', function (err) {
    console.log('request error', err);
    callback("Error occured.")
  })
}

