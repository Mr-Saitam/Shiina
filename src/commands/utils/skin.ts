
import { CommandBuilder } from "../../interfaces/Commands";
import request  from "request"
import { EmbedBuilder } from "discord.js";
export default new CommandBuilder()
.setName("skin")
.setDescription("minecraft skin")
.addStringOption(option => option.setName('nick').setDescription('nick de un jugador premium').setRequired(true))
.setCallback(async ({client , interaction}) => {
  const nick = interaction.options.getString('nick');
const ka = `https://api.mojang.com/users/profiles/minecraft/${nick}`;
request(ka, function(err , resp , body){
  if(err){
    console.error("hubo un error inesperado")
  }
  try{
  body = JSON.parse(body)
    const skin = `https://crafatar.com/skins/${body.id}`;
    const render = `https://crafatar.com/renders/body/${body.id}`;
    const avatar  = `https://crafatar.com/avatars/${body.id}`

const embed = new EmbedBuilder()
.setThumbnail(avatar)
.setTitle(`Skin de ${nick}`)
.setImage(render)

    interaction.reply({embeds: [embed]})
  }catch(err){
    interaction.reply({content: "usuario no premium"})
  }
})

})