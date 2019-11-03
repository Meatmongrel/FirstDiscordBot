const fetch = require('node-fetch')
const { RichEmbed } = require('discord.js')
const embedColor = "#5b3687"

module.exports = {
    name: "poke",
    description: "Get a pokemon by name or get a random one, can also get shiny pokemon",
    execute(message, args){
        const randomCommand = (message, args) => {
            if(!args){
                fetchRandomPoke(message)
            }
            else if(args[1] === "shiny"){
                if(args[2] <= 5){
                    for(var i=1; i <= args[2]; i++){
                        fetchRandomPoke(message, "shiny")
                    }
                }else if(args[2] > 5){
                    return message.reply("You can only get 5 random pokemon at a time")
                }
                else{
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
                return message.reply("You can only get 5 random pokemon at a time")
            }
        }

        const fetchPoke = (message, args, shiny="default") => {

            fetch(`https://pokeapi.co/api/v2/pokemon/${args.toLowerCase()}`)
                .then(res => res.json())
                .then(pokemon => {
                    const poke = new RichEmbed()
                        .setTitle(pokemon.name)
                        .setColor(embedColor)
                        .setImage(eval(`pokemon.sprites.front_${shiny}`))
                    message.channel.send(poke)
                    if(shiny === "shiny"){
                        console.log("Getting shiny pokemon")
        
                    }else{
                        console.log("Getting pokemon")
        
                    }
                })
        }
        
        const fetchRandomPoke = (message, shiny="default") => {
            const num = Math.floor(Math.random() * 808 + 1)
            fetch(`https://pokeapi.co/api/v2/pokemon/${num}`)
                .then(res => res.json())
                .then(pokemon => {
                    const poke = new RichEmbed()
                        .setTitle(pokemon.name)
                        .setColor(embedColor)
                        .setImage(eval(`pokemon.sprites.front_${shiny}`))
                    message.channel.send(poke)
                    if(shiny === "shiny"){
                        console.log("Getting random shiny pokemon")
        
                    }else{
                        console.log("Getting random pokemon")
        
                    }
                })
        }

        if (!args.length) {
            randomCommand(message)
        }
        else if(args[0] === "shiny"){
            if(args[1] === 'random'){
                fetchRandomPoke(message, "shiny")
            }
            else if(args[1]%1==0 === true){
    
            }
            else if(args[1]){
                fetchPoke(message, args[1], "shiny")
            }
            else{
                fetchRandomPoke(message, "shiny")
            }
        }
        else if(args[0] === 'random'){
            randomCommand(message, args)
            
        }else if(args[1] === "shiny"){
            fetchPoke(message, args[0], "shiny")
        }
        else{
            fetchPoke(message, args[0])
            
        }
    }
}