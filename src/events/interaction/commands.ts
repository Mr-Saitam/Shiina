
import { EventBuilder } from "../../interfaces/Event";

export default new EventBuilder("interactionCreate", true)
.setCallback(async ( client , interaction ) => {
    
    
    if(!interaction.isChatInputCommand())return;
    if(interaction.channel.isDMBased()){
        return interaction.reply({content: "No pienso funcionar aqui", ephemeral: true})
    }
    if(!interaction.inCachedGuild()){
       await  interaction.guild?.fetch()
        return interaction.reply({content: "guild", ephemeral: true})
    }



const { commandName } =  interaction;
const command = client.commands.get(commandName);
if(!command){
     client.application.commands.set(client.commands.map(c => c.toJSON()))
    return interaction.reply({content: "no encontre eso", ephemeral: true})
}


await command.callback({client, interaction})
return void 0;
})





