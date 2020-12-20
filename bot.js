require('dotenv').config()
//secret token sent from discord gods
const token=process.env.BOT_TOKEN;
//secret tokens sent from mongodb gods UwU
const dbUser=process.env.DB_USER;
const dbName=process.env.DB_NAME;
const dbPass=process.env.PASSWORD;
const collectionName=process.env.COLLECTION;

//the discord setup
const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE']
});
//mongodb setup
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.hzpkp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const clientMongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//prefix
const prefix = '/';
//commands
const addmod= 'mod-meh';
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
  if (message.content === 'ye bish stonks'){
    message.react('😍')
  }
  //saying something command execution
  if(message.content.startsWith(`${prefix}${say}`) && message.content.length > 4){
    const speech= message.content.slice(4);
    message.channel.send(speech);
  }
  //personal info command execution
  if(message.content.startsWith(`${prefix}${info}`) && message.content.length > 5){
    //sending data to database(coming up in future commits)
    clientMongo.connect(err => {
      const collection = clientMongo.db(dbName).collection(collectionName);
      console.log("connected");
      clientMongo.close();
    });
  }
});

client.login(token);