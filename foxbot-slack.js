var RtmClient = require('@slack/client').RtmClient;
var CLIENT_EVENTS = require('@slack/client').CLIENT_EVENTS;
var RTM_EVENTS = require('@slack/client').RTM_EVENTS;
var config = require('config');
var locstat_controller = require('./controllers/locations');

token = config.get('slack-token');
console.log("slack-token:" + token)
var rtm = new RtmClient(token);
let channel;
rtm.on(CLIENT_EVENTS.RTM.AUTHENTICATED, (rtmStartData) => {
    console.log(rtmStartData);
    for (const c of rtmStartData.channels) {
      if (c.is_member && c.name ==='geotracking') { channel = c.id } 
    }
    console.log(`Logged in as ${rtmStartData.self.name} of team ${rtmStartData.team.name}`);
});

rtm.on(CLIENT_EVENTS.RTM.RTM_CONNECTION_OPENED, function () {
//    rtm.sendMessage("FoxBot - ONLINE", channel);
  console.log("online");
});

rtm.start()

rtm.on(RTM_EVENTS.MESSAGE, function(message) {
  if (message.channel === channel)
    switch(message.text.split(' ')[0]) {
      case "!help":
        rtm.sendMessage("I know the fol commands:",channel);
        rtm.sendMessage("\"!help\" <- shows this list of commands",channel);
        rtm.sendMessage("\"!list\" <- shows a list of active tracked locations",channel);
        rtm.sendMessage("I'm learning new commands everyday!",channel);
        break;
      case "!locstat":
        console.log(from + ' => ' + to + ': ' + message.text);
        rtm.sendMessage( "I don't know how to do that yet, but I'm learning new things everyday", channel);
         break;
      case "!add":
        break;
      case "!remove":
        break;
      case "!hide":
        break;
      case "!unhide":
        break;
      case "!list":
        locstat_controller.list(function(message) {
          rtm.sendMessage(message,channel);
        })
        break;

      }

});
