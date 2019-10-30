const Discord = require('discord.js')
const client = new Discord.Client
const { prefix } = require('./config.json')
const fetch = require('node-fetch')


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
function fetchPoke(args){
    fetch(`https://pokeapi.co/api/v2/pokemon/${args[0]}`)
        .then(res => res.json())
        .then(pokemon => {
            const poke = new Discord.MessageEmbed()
                .setTitle(pokemon.name)
                .setImage(pokemon.sprites.front_default)
            message.channel.send(poke)
    })
}
client.on('message', message => {


    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'd'){
        const rand = Math.floor((Math.random()) * args[0] + 1)
        message.channel.send(`Your roll out of ${args[0]}... ${rand}
        ${numMessage(args[0], rand)}`)
            
    }
    else if (command === `poke`) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }else{
            fetchPoke(args)

        }
    }
    

})


client.login(process.env.BOT_TOKEN)