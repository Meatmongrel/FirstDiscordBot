const { RichEmbed, Client, GuildMember } = require('discord.js')
const fs = require('fs')
const client = new Client
const fetch = require('node-fetch')
const embedColor = "#5b3687"

fs.readFile('./config.json', (err, data) => {
    if (err) throw err;
    return config = JSON.parse(data)
  });

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

const fetchPoke = (message, args, shiny="default") => {

    fetch(`https://pokeapi.co/api/v2/pokemon/${args[0].toLowerCase()}`)
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

const dieCommand = (message, args) => {
    if(args[0]%1==0 === true){
        const rand = Math.floor((Math.random()) * args[0] + 1)
        message.channel.send(`Your roll out of ${args[0]}... ${rand}
        ${numMessage(args, rand)}`)
    }else if(args[0]%1==0 === false){
        message.channel.send(`${args[0]} is not a number`)
    }
}

const numMessage = (args, rand) => {
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
        .setColor(embedColor)
        .setTitle(`The prefix is ${config.prefix} and current commands are:`)
        .addField(`${config.prefix}d (num)", "Roll a die with (num) sides`)
        .addField(`${config.prefix}poke (name/pokedex number) OR (random (num))", "Search a pokemon by name, or get (num) random pokemon, up to 5. You can also add the shiny param to the end of the command to get the shiny version`)
    message.channel.send(helpMsg)
}

const prefixCommand = (message, args) => {
    if (!args.length){
        const prefixMsg = new RichEmbed()
            .setTitle(`The current prefix is ${config.prefix}`)
            .setColor(embedColor)
        message.channel.send(prefixMsg)
    }else if(args[0] === "set"){
        if(args[1]){
            message.channel.send(`Are you sure you want to set the prefix to ${args[1]}`)
            message.react('👍').then(() => message.react('👎'))
            const filter = (reaction, user) => { return ['👍', '👎'].includes(reaction.emoji.name) && user.id === message.author.id}
            message.awaitReactions(filter, { max: 1, time: 15000 })
                .then(collected => {
                    const reaction = collected.first()
                    if(reaction.emoji.name === '👍'){
                        fs.writeFile("config.json", JSON.stringify({"prefix": `${args[1]}`}), (err) => {
                            if (err) throw err;
                            console.log('The file has been saved!');
                        });
                        fs.readFile('./config.json', (err, data) => {
                            if (err) throw err;
                            return config = JSON.parse(data)
                          });
                        const prefixSuccessMsg = new RichEmbed()
                        .setTitle(`Prefix changed to ${args[1]}`)
                        .setColor(embedColor)
                        return message.channel.send(prefixSuccessMsg)

                    }else if (reaction.emoji.name === '👎') {
                        const cancelMsg = new RichEmbed()
                            .setTitle("Prefix change cancelled")
                            .setColor(embedColor)
                        return message.channel.send(cancelMsg)

                    }else{
                        message.reply('That is not a valid reaction')
                    }

                })
                .catch(() => {
                    const timeMsg = new RichEmbed()
                        .setTitle('You did not respond in time')
                        .setColor(embedColor)
                    return message.channel.send(timeMsg)
                })
        }else if(!args[1]){
            message.reply('What are you trying to set the prefix to?')
        }
    }
}
client.on('message', message => {
    
    
    const args = message.content.slice(config.prefix.length).split(' ');
    const command = args.shift().toLowerCase();
    if(message.content.startsWith(`${config.prefix}`)){
        if (command === 'd'){
            dieCommand(message, args)
        }
        else if (command === `poke`) {
            pokeCommand(message, args)
        }
        else if(command === 'help'){
            helpCommand(message)
        }
        else if(command === "prefix"){
            if(GuildMember.roles.some(role => role.name === "Robloxian") === true){
                prefixCommand(message, args)
            }else{
                message.reply("You do not have permission to use that command")
            }
        }
    }
    

})
client.login(process.env.BOT_TOKEN)