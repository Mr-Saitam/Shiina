

import { EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
.setName("userinfo")
.setDescription("informacion sobre un usuario")
.addStringOption(option => option.setName('id').setDescription('id del usuario'))
.setCallback(async ({client , interaction}) => {
 
    const id = interaction.options.getString('id');
   
const user = client.users.fetch(id)

  const año = new Date((await user).createdAt).getFullYear();
  const dia =  new Date((await user).createdAt).getDay();
  const month = new Date((await user).createdAt).getMonth();
  const total = `${dia}/${month ? "0" : "1"}/${año}`;
  const flags = (await user).flags.toArray()
 
const embed = new EmbedBuilder()
.setTitle(`${(await user).username} Info`)
.setColor("Green")
.setDescription(`\`\`\`yaml
username: ${(await user).username}
id: ${(await user).id}
createdAt: ${total}
badges: ${flags.includes("HypeSquadOnlineHouse3")}
discriminator: ${(await user).discriminator}
avatar: ${(await user).avatarURL()}

\`\`\``)

  interaction.reply({embeds: [embed]})

  
})