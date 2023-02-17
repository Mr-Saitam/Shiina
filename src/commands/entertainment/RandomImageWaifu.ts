import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("waifu")
    .setDescription("una linda waifu")

    .setCallback(async ({ client, interaction }) => {
        interaction.reply({ content: `https://www.thiswaifudoesnotexist.net/example-${Math.floor(Math.random() * 100001)}.jpg` })
    })