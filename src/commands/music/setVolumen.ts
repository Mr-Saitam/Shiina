import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("volumen")
    .setDescription("cambia el volumen ")
    .addNumberOption(option => option.setName("volumen").setRequired(true).setDescription("el volumen que quieres establecer"))
    .setCallback(async ({ client, interaction }) => {
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id
        });
const volumen = interaction.options.getNumber("volumen")
if(volumen > 200)return interaction.reply({content: "El volumen maximo es 200%", ephemeral: true})
        player.setVolume(volumen)
        interaction.reply(`Ahora el volumen actual es ${player.volume}%`)

    })