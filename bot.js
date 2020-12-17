require('dotenv').config()
//secret token sent from discord gods
const token=process.env.BOT_TOKEN;
const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE']
});

//prefix
const prefix = '/';
//commands
const addmod= 'mod-meh';
const say = 'say';
client.on('ready', () => {
    console.log('our bot is ready to go');
});

client.on('messageDelete', msg => {
  msg.channel.send('stop deleting shit you pussy');
})
client.on('message', message => {
  //giving a mod role
  if (message.content === `${prefix}${addmod}`) {
    let mod = message.guild.roles.cache.find(r => r.name === "mod");
    message.member.roles.add(mod);
  }

  if (message.content === 'ye bish stonks'){
    message.react('😍')
  }

  if(message.content === `${prefix}${say}` && message.content.length > 4){
    const speech= message.content.slice(4);
    message.channel.send(speech);
  }
});

client.login(token);