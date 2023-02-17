

import { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } from "discord.js";
import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
  .setName("userinfo")
  .setDescription("informacion sobre un usuario")
  .addStringOption(option => option.setName('id').setDescription('id del usuario').setRequired(true))
  .setCallback(async ({ client, interaction }) => {


    const id = interaction.options.getString('id');
    const user = client.users.fetch(id)
    const año = new Date((await user).createdAt).getFullYear() + 1;
    const dia = new Date((await user).createdAt).getDate();
    const month = new Date((await user).createdAt).getMonth() + 1;
    const total = `${dia}/${month}/${año}`;
    const flags = (await user).flags.toArray()


    const row = new ActionRowBuilder<ButtonBuilder>()
      .addComponents(
        new ButtonBuilder()
          .setLabel('Avatar')
          .setStyle(ButtonStyle.Link)
          .setURL((await user).avatarURL()),
      );

    const embed = new EmbedBuilder()
      .setTitle(`${(await user).username} Info`)
      .setColor("Green")
      .setDescription(`\`\`\`yaml
username: ${(await user).username}
id: ${(await user).id}
createdAt: ${total}
discriminator: ${(await user).discriminator}
\`\`\``)

    interaction.reply({ components: [row], embeds: [embed] })


  })