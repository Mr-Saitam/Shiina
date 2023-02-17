
import { EventBuilder } from "../../interfaces/Event";
export default new EventBuilder("interactionCreate", true)
    .setCallback(async (client, interaction) => {

        if (!interaction.isChatInputCommand()) return;
        if (interaction.channel.isDMBased()) {
            return interaction.reply({ content: "No pienso funcionar aqui", ephemeral: true })
        }
        if (!interaction.inCachedGuild()) {
            await interaction.guild?.fetch()
            return console.log("no chached in guild?")
        }

       

        const { commandName } = interaction;
        const command = client.commands.get(commandName);
        await command.callback({ client, interaction })

    })





