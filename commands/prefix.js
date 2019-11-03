const embedColor = "#5b3687"
const { RichEmbed } = require('discord.js')
const fs = require('fs')

module.exports = {
    name: "prefix",
    description: "View or change the current bot prefix",
    execute(message, args){
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
}