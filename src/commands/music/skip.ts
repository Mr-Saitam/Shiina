import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("skip")
    .setDescription("salta una cancion de la cola")
    .setCallback(async ({ client, interaction }) => {
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        });
    player.stop();
    interaction.reply({content: "Cancion saltada", ephemeral: true})
    })
  