var irc = require("irc");

var config = {
    channels: ["#foxnet"],
    server: "hitchcock.freenode.net",
    botName: "FoxiBot24"
}
var locstat_controller = require('./controllers/locations')
var bot = new irc.Client(config.server, config.botName, {debug: true, channels: config.channels, floodProtection: true, floodProtectionDelay: 500});

function botSay(to,message) {
  bot.say(to,message);
  
}

bot.addListener('message#', function (from, to, message) {
   switch(message.split(' ')[0]) {
     case "!help":
      bot.say(to,"I know the fol commands:");
      bot.say(to,"\"!help\" <- shows this list of commands");
      bot.say(to,"\"!list\" <- shows a list of active tracked locations");
      bot.say(to,"\"!locstat N GRIRD\" <- send locstat for tracked element id of N");
      bot.say(to,"I'm learning new commands everyday!");
      break;
     case "!locstat":
      console.log(from + ' => ' + to + ': ' + message);
     locstat_controller.locstat(message, function(reply) {
       bot.say(to,reply)
     })
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
        bot.say(to,message)
      })
      break;
     
   }

});
