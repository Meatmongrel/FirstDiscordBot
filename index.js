const Discord = require('discord.js')
const client = new Discord.Client
const config = require('./config.json')


function numMessage(number, rand){
    if (rand <= number * 0.25){
        return ("Ouch, sucks for you!")
    }else if(rand <= number * 0.5){
        return ("Das ight...")
    }else if(rand <= number * 0.75){
        return ("Pretty decent, alright.")
    }else if(rand <= number * 0.99){
        return ("Oh shit now we talkin'")
    }else if(rand === number){
        return ("OHHHH WOMBO COMBOOOOOO OH MY GOD")
    }

}

client.once('ready', () => {
    console.log('Ready!');
})

client.on('message', message => {
    const number = parseInt(message.content.substr(2))
    if(Number.isInteger(number) === true){
        if (message.content.slice(0, 3) === `${config.prefix}d `){
            const rand = Math.floor((Math.random()) * number + 1)
            message.channel.send(`Your roll out of ${number}... ${rand}
            ${numMessage(number, rand)}`)
            
        }
    }
    else if (message.content === `${config.prefix}server`) {
        message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nServer Creation: ${message.guild.createdAt}\nRole objects: ${message.guild.roles.forEach(role => {role.name})}`);
    }
    

})

client.login(process.env.BOT_TOKEN)