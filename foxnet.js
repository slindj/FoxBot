var irc = require("irc");

var config = {
    channels: ["#foxnet"],
    server: "irc.efnet.org",
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
      boy.say(to,"\"!list_all\" <- shows a list of all tracked locations, even if they're hidden/inactive")
      bot.say(to,"\"!locstat N GRID\" <- send locstat for tracked element id of N");
      boy.say(to,"\"!hide N\" <- hide/inactivate a tracked element id of N");
      boy.say(to,"\"!unhide N\" <- unhide/activate a tracked element id of N");
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
      locstat_controller.hide(message, function(message) {
        bot.say(to,message)
      })
      break;
     case "!unhide":
      locstat_controller.unhide(message, function(message) {
        bot.say(to,message)
      })
      break;
     case "!list":
      locstat_controller.list(function(message) {
        bot.say(to,message)
      })
      break;
     case "!list_all":
      locstat_controller.list_all(function(message) {
        bot.say(to,message)
      })
      break;
     
   }

});
