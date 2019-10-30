const Discord = require('discord.js')
const client = new Discord.Client
const { prefix } = require('./config.json')


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

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    const number = parseInt(message.content.substr(2))
    if(Number.isInteger(number) === true){
        if (command === `d `){
            const rand = Math.floor((Math.random()) * number + 1)
            message.channel.send(`Your roll out of ${number}... ${rand}
            ${numMessage(number, rand)}`)
            
        }
    }
    else if (command === `pokemon`) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }

        fetch(`https://pokeapi.co/api/v2/pokemon/${args[0]}`)
            .then(res => res.json())
            .then(pokemon => {return message.channel.send(pokemon.sprites.front_default)})
    }
    

})

client.login(process.env.BOT_TOKEN)