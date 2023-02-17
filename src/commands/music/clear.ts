import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("clear")
    .setDescription("limpia la lista de reproduccion")
    .setCallback(async ({ client, interaction }) => {
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        });

        player.queue.clear
        interaction.reply("list, la lista de reproduccion fue eliminada")

    })