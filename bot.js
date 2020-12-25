require('dotenv').config()
//secret token sent from discord gods
const token = process.env.BOT_TOKEN;
//secret tokens sent from mongodb gods UwU
const dbUser = process.env.DB_USER;
const dbName = process.env.DB_NAME;
const dbPass = process.env.PASSWORD;
const collectionName = process.env.COLLECTION;
//the discord setup
const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE']
});

//mongodb setup
const mongoose = require('mongoose');
mongoose.connect(`mongodb+srv://${dbUser}:${dbPass}@cluster0.4elyp.mongodb.net/${dbName}`, { useNewUrlParser: true, useUnifiedTopology: true })
const personalSchema = new mongoose.Schema({
  Name: String,
  Lang: String
})
const personalModel = mongoose.model('datas', personalSchema);
//prefix
const prefix = '/';
//commands
const addmod = 'mod-meh';
const say = 'say';
const info= 'info';

//letting us know if bot is ready
client.on('ready', () => {
  console.log('our bot is ready to go');
});
//actions if a message if deleted
client.on('messageDelete', msg => {
  msg.channel.send('stop deleting shit you pussy');
})


client.on('message', message => {
  //giving a mod role
  if (message.content === `${prefix}${addmod}`) {
    let mod = message.guild.roles.cache.find(r => r.name === "mod");
    message.member.roles.add(mod);
  }
  //reacting to specific message
  if (message.content === 'ye bish stonks') {
    message.react('😍')
  }
  //saying something command execution
  if (message.content.startsWith(`${prefix}${say}`) && message.content.length > 4) {
    const speech = message.content.slice(4);
    message.channel.send(speech);
  }
  if(message.content.startsWith(`${prefix}${info}`) && message.content.length > 5){
    const realName = message.content.slice(5);
    let lang = message.content.split(' ')[2];
    let info = new personalModel({
      Name: realName,
      Lang: lang
    }) 
    info.save()
    .then(res => {console.log('saved name')})
  }
});

client.login(token);