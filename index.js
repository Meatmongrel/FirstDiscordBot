const { RichEmbed, Client, Collection } = require('discord.js')
const fs = require('fs')
const client = new Client
client.commands = new Collection()

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
        if (command === 'd'){
            client.commands.get('d').execute(message, args)
        }
        else if (command === `poke`) {
            client.commands.get('poke').execute(message, args)
        }
        else if(command === 'help'){
            client.commands.get('help').execute(message)
        }
        else if(command === "prefix"){
            if(message.member.hasPermission("ADMINISTRATOR") === true){
            client.commands.get('prefix').execute(message, args)                
            }else{
                const currentPrefix = new RichEmbed()
                    .setTitle(`The current prefix is ${config.prefix}`)
                    .setField("You cannot change the prefix", "You do not have the administrator permissions")
                message.channe.send(currentPrefix)
            }
        }
        else if(command === "watch"){
            if(!args.length){
                message.reply('Watch what?')
            }
            else if(args){
                client.user.setActivity(`${args.toString().replace(/,/g, ' ')}`, { type: 'WATCHING' })
            }
        }
    }
})
client.login(process.env.BOT_TOKEN)