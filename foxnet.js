var irc = require("irc");

var config = {
    channels: ["#foxnet"],
    server: "irc.freenode.net",
    botName: "FoxiBot24"
}
var locstat_controller = require('./controllers/locations')
var bot = new irc.Client(config.server, config.botName, {channels: config.channels});

bot.addListener('message#', function (from, to, message) {
   switch(message.split(' ')[0]) {
     case "LOCSTAT:":
      console.log(from + ' => ' + to + ': ' + message);
      bot.say(to,  "I don't know how to do that yet, but I'm learning new things everyday");
      break;
     case "ADD:":
      break;
     case "REMOVE:":
      break;
     case "HIDE:":
      break;
     case "UNHIDE:":
      break;
     case "LIST:":
      locstat_controller.list(bot,to)
      break;
     
   }

});
