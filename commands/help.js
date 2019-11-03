const embedColor = "#5b3687"
const { RichEmbed } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "help",
    description: "Get a list of current commands with descriptions",
    execute(message){
        fs.readFile('./config.json', (err, data) => {
            if (err) throw err;
            return config = JSON.parse(data)
        });
        const helpMsg = new RichEmbed()
            .setColor(embedColor)
            .setTitle(`The prefix is ${config.prefix} and current commands are:`)
            .addField(`${config.prefix}d (num)`, "Roll a die with (num) sides")
            .addField(`${config.prefix}poke (name/pokedex number) OR (random (num))`, "Search a pokemon by name, or get (num) random pokemon, up to 5. You can also add the shiny param to the end of the command to get the shiny version")
            .addField(`${config.prefix}prefix set (prefix)`, "Command lists the current prefix and allows a user with admin level role to modify it.")
        message.channel.send(helpMsg)
    }
}