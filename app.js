const { MessageEmbed, Client, Collection } = require('discord.js')
const fs = require('fs')
const fetch = require('node-fetch')


const client = new Client
client.commands = new Collection()

const embedColor = "#5b3687"

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

    client.commands.set(command.name, command);
}


fs.readFile('./config.json', (err, data) => {
    if (err) throw err;
    return config = JSON.parse(data)
});

client.on("ready", () => {
    client.user.setActivity('yo messages', { type: 'WATCHING' })
})

client.on('message', message => {
    
    fs.readFile('./config.json', (err, data) => {
        if (err) throw err;
        return config = JSON.parse(data)
    });

    const args = message.content.slice(config.prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if(message.content.startsWith(`${config.prefix}`)){
        switch(command){
            case 'd': return client.commands.get('d').execute(message, args)
            case 'poke': return client.commands.get('poke').execute(message, args)
            case 'help': return client.commands.get('help').execute(message)
            case 'prefix': {
                if(message.member.hasPermission("ADMINISTRATOR") == true){
                    return client.commands.get('prefix').execute(message, args)                
                }
                const currentPrefix = new MessageEmbed()
                    .setTitle(`The current prefix is ${config.prefix}`)
                    .setField("You cannot change the prefix", "You do not have the administrator permissions")
                return message.channel.send(currentPrefix)
            }
            case 'watch': {
                if(args.length >= 1){
                    return client.user.setActivity(`${args.toString().replace(/,/g, ' ')}`, { type: 'WATCHING' })
                }
                return message.reply('Watch what?')
            }
            default:  if(message.content.length > 1){return message.channel.send('That is not a valid command');}
        }
        
    }
})
client.login('NjM4NTYyOTU5NDM3ODU2NzY4.XbeiGQ.sY17607TaBGKpzNbzUR0bc16v70')