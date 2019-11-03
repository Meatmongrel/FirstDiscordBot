module.exports = {
    name: "d",
    description: "Rolls a die with specified number of sides",
    execute(message, args){
        if(args[0]%1==0 === true){
            const rand = Math.floor((Math.random()) * args[0] + 1)

            function numMessage(args, rand) {
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

            message.channel.send(`Your roll out of ${args[0]}... ${rand}
            ${numMessage(args, rand)}`)
            
        }else if(args[0]%1==0 === false){
            message.channel.send(`${args[0]} is not a number`)
        }
    }
        
}
