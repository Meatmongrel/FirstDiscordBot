const { RichEmbed, Client } = require('discord.js')
const client = new Client
const { prefix } = require('./config.json')
const fetch = require('node-fetch')


function numMessage(args, rand){
    if (rand <= args[0] * 0.25){
        return ("Ouch, sucks for you!")
    }else if(rand <= args[0] * 0.5){
        return ("Das ight...")
    }else if(rand <= args[0] * 0.75){
        return ("Pretty decent, alright.")
    }else if(rand <= args[0] * 0.99){
        return ("Oh shit now we talkin'")
    }else{
        return ("OHHHH WOMBO COMBOOOOOO OH MY GOD")
    }

}

function fetchPoke(message, args){
    fetch(`https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`)
        .then(res => res.json())
        .then(pokemon => {
            const poke = new RichEmbed()
                .setTitle(pokemon.name)
                .setImage(pokemon.sprites.front_default)
            message.channel.send(poke)
        })
}

function fetchRandomPoke(message){
    const num = Math.floor(Math.random() * 808 + 1)
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(res => res.json())
        .then(pokemon => {
            const poke = new RichEmbed()
                .setTitle(pokemon.name)
                .setImage(pokemon.sprites.front_default)
            message.channel.send(poke)
        })
        console.log(num)
}

client.on('message', message => {


    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();

    if (command === 'd'){
        if(args[0]%1==0 === true){
            const rand = Math.floor((Math.random()) * args[0] + 1)
            message.channel.send(`Your roll out of ${args[0]}... ${rand}
            ${numMessage(args, rand)}`)
            console.log(args[0])
        }else if(args[0]%1==0 === false){
            message.channel.send(`${args[0]} is not a number`)
        }
            
    }
    else if (command === `poke`) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
        }
        else if(args[0] == 'random'){
            if(args[1] <= 5){
                for(var i=1; i <= args[1]; i++){
                    (fetchRandomPoke(message))
                }
            }else if(!args[1]){
                fetchRandomPoke(message)
            }
            else{
                message.channel.send("You can only get 5 random pokemon at a time")
            }
        }
        else{
            fetchPoke(message, args)

        }
    }
    

})
client.login(process.env.BOT_TOKEN)