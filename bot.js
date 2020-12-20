require('dotenv').config()
//secret token sent from discord gods
const token=process.env.BOT_TOKEN;
//secret tokens sent from mongodb gods UwU
const dbUser=process.env.DB_USER;
const dbName=process.env.DB_NAME;
const dbPass=process.env.PASSWORD;
const collectionName=process.env.COLLECTION;
const Discord = require('discord.js');
const client = new Discord.Client({
  partials: ['MESSAGE']
});

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${dbUser}:${dbPass}@cluster0.hzpkp.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const clientMongo = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
//prefix
const prefix = '/';
//commands
const addmod= 'mod-meh';
const say = 'say';
const info= 'info';
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

  if(message.content.startsWith(`${prefix}${say}`) && message.content.length > 4){
    const speech= message.content.slice(4);
    message.channel.send(speech);
  }
  
  if(message.content.startsWith(`${prefix}${info}`) && message.content.length > 5){
    clientMongo.connect(err => {
      const collection = clientMongo.db(dbName).collection(collectionName);
      // perform actions on the collection object
      console.log("connected");
      clientMongo.close();
    });
  }
});

client.login(token);