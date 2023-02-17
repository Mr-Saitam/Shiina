import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("leave")
    .setDescription("me voy de la llamada :c")
    .setCallback(async ({ client, interaction }) => {
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        });

        player.disconnect();
        interaction.reply("Eh abandonado el canal de voz")

    })