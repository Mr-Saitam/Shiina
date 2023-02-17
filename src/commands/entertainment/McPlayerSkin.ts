import { CommandBuilder } from "../../interfaces/Commands";
import { EmbedBuilder } from "discord.js";
import request from "request";

export default new CommandBuilder()
  .setName("skin")
  .setDescription("Obtiene la piel de un jugador de Minecraft premium")
  .addStringOption((option) => option
    .setName("nick")
    .setDescription("El apodo de un jugador premium")
    .setRequired(true)
  )
  .setCallback(async ({ client, interaction }) => {
    const name = interaction.options.getString("nick");
    const url = `https://api.mojang.com/users/profiles/minecraft/${name}`;


    request(url, (err, resp, body) => {
      if (err) {
        console.error("Error inesperado");
        return;
      }

      try {
        body = JSON.parse(body);
      } catch (err) {
        console.log(err)
        return;
      }
      if (body.errorMessage == "Couldn't find any profile with that name") return interaction.reply({ content: "El usuario no es premium", ephemeral: true });
      const render = `https://crafatar.com/renders/body/${body.id}`;
      const avatar = `https://crafatar.com/renders/head/${body.id}`;

      const embed = new EmbedBuilder()
        .setThumbnail(avatar)
        .setTitle(`Skin de ${name}`)
        .setImage(render)
        .setColor("Green");

      interaction.reply({ embeds: [embed] });
    })




  });
