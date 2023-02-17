import { bold } from "discord.js";
import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("pause")
    .setDescription("pausa o renauda una cancion")
     .addBooleanOption(option =>
		option.setName('value')
			.setDescription('pausa o renauda una cancion')
            .setRequired(true)
            )
            
    .setCallback(async ({ client, interaction }) => {
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        });
 const boolean  = interaction.options.getBoolean("paused");
 if(boolean === true){
       player.pause(true)
        interaction.reply("Cancion pausada")
 }else{
    player.pause(false)
        interaction.reply("Cancion reunadada ")
 }
    })