import { CommandBuilder } from "../../interfaces/Commands";
import { AttachmentBuilder } from "discord.js";
import puppeteer from "puppeteer"

export default new CommandBuilder()
    .setName("web-preview")
    .setDescription("Obtiene una preview de una página web")
    .addStringOption(option =>
        option.setName('url')
            .setDescription('Ingrese la URL de la página web que desea ver una preview')
            .setRequired(true))

    .setCallback(async ({ client, interaction }) => {

        const url = interaction.options.getString("url");
        const URL_REGEX = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
        if (!URL_REGEX.test(url)) {
            interaction.reply({ content: "La URL ingresada no es válida.", ephemeral: true });
            return;
        }
        async function getPreviewImage(url: string) {
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.goto(url);
            const screenshot = await page.screenshot();
            await browser.close();
            return screenshot;
        }

        await interaction.deferReply({ ephemeral: true })
        getPreviewImage(url).then(async image => {
            await interaction.editReply({ files: [new AttachmentBuilder(image, { name: "image.png" })] })
        });
    })