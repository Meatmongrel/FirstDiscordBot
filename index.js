const { RichEmbed, Client } = require('discord.js')
const client = new Client
const { prefix } = require('./config.json')
const fetch = require('node-fetch')

const pokeCommand = (message, args) => {
    if (!args.length) {
        randomCommand(message)
    }
    else if(args[0] === "shiny"){
        fetchRandomPoke(message, "shiny")
    }
    else if(args[0] === 'random'){
        randomCommand(message, args)
        
    }else if(args[1] === "shiny"){
        fetchPoke(message, args, "shiny")
    }
    else{
        fetchPoke(message, args)
        
    }
}

const randomCommand = (message, args) => {
    if(!args){
        fetchRandomPoke(message)
    }
    else if(args[1] === "shiny"){
        if(args[2] <= 5){
            for(var i=1; i <= args[2]; i++){
                fetchRandomPoke(message, "shiny")
            }
        }else{
            fetchRandomPoke(message, "shiny")
        }
    }
    else if(args[1] <= 5){
        if(args[2] === "shiny"){
            for(var i=1; i <= args[1]; i++){
                fetchRandomPoke(message, "shiny")
            }
        }else{
            for(var i=1; i <= args[1]; i++){
                (fetchRandomPoke(message))
            }
        }
    }
    else{
        message.channel.send("You can only get 5 random pokemon at a time")
    }
}

function fetchPoke(message, args, shiny="default"){

    fetch(`https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`)
        .then(res => res.json())
        .then(pokemon => {
            const poke = new RichEmbed()
                .setTitle(pokemon.name)
                .setImage(eval(`pokemon.sprites.front_${shiny}`))
            message.channel.send(poke)
            console.log(poke)
        })
}

function fetchRandomPoke(message, shiny="default"){
    const num = Math.floor(Math.random() * 808 + 1)
    fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
        .then(res => res.json())
        .then(pokemon => {
            const poke = new RichEmbed()
                .setTitle(pokemon.name)
                .setImage(eval(`pokemon.sprites.front_${shiny}`))
            message.channel.send(poke)
        })
        console.log(num)
}

const dieCommand = (message, args) => {
    if(args[0]%1==0 === true){
        const rand = Math.floor((Math.random()) * args[0] + 1)
        message.channel.send(`Your roll out of ${args[0]}... ${rand}
        ${numMessage(args, rand)}`)
        console.log(args[0])
    }else if(args[0]%1==0 === false){
        message.channel.send(`${args[0]} is not a number`)
    }
}

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

const helpCommand = (message) => {
    const helpMsg = new RichEmbed()
        .setTitle("The prefix is - and current commands are:")
        .addField("-d (num)", "Roll a die with (num) sides")
        .addField("-poke (name/pokedex number) OR (random (num))", "Search a pokemon by name, or get (num) random pokemon, up to 5. You can also add the shiny param to the end of the command to get the shiny version")
    message.channel.send(helpMsg)
}
client.on('message', message => {
    
    
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    
    if (command === 'd'){
        dieCommand(message, args)
    }
    else if (command === `poke`) {
        pokeCommand(message, args)
    }
    else if(command === 'help'){
        helpCommand(message)
    }
    

})
client.login(process.env.BOT_TOKEN)