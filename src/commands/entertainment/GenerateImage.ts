
import { CommandBuilder } from "../../interfaces/Commands";
import { AttachmentBuilder, userMention } from "discord.js";
import { Configuration, OpenAIApi } from "openai";
import * as dotenv from "dotenv";
import { translation } from "../../../config/i18n.config"
dotenv.config();
import { promisify } from 'util';
const timeout = promisify(setTimeout);

export default new CommandBuilder()
    .setName("imagen")
    .setDescription("Este comando genera una imagen única y aleatoria a partir del texto que proporciones")
    .addStringOption(option =>
        option.setName('prompt')
            .setDescription('Ingresa el texto de tu elección')
            .setRequired(true))

    .setCallback(async ({ client, interaction }) => {
        try {
            const configuration = new Configuration({
                apiKey: process.env.OpenaiKey,
            });
            const text = interaction.options.getString("prompt");
            const openai = new OpenAIApi(configuration);
            interaction.reply({ content: translation.__("generateImage.creatingImage") });
            const image = await openai.createImage({
                prompt: text,
                n: 2,
                size: "512x512",
            });
            await timeout(5000);
            await interaction.editReply({ content: `**${text}** - ${userMention(interaction.user.id)}`, files: [new AttachmentBuilder(image.data.data[0].url, { name: "imagen.png" })] })
        } catch (err) {
            if (err?.response?.status === 400) {
                await interaction.editReply({ content:  translation.__("generateImage.err400")})
            } else {
                console.log(err)
                return;
            }
        }
    })