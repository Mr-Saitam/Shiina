import { CommandBuilder } from "../../interfaces/Commands";
import fetch from "node-fetch";
import { EmbedBuilder, AttachmentBuilder } from "discord.js";
import { Buffer } from 'node:buffer';
interface MinecraftServerData {
    online: boolean;
    players: {
        online: number;
        max: number;
    };
    version: {
        name: string;
    };
    icon: string;
    ip: Number;
    port: Number;
    motd: {
        clean: String;
    };

}

export default new CommandBuilder()
    .setName("server")
    .setDescription("Este comando muestra información sobre un servidor de minecraft")
    .addStringOption(option =>
        option.setName('ip')
            .setDescription('IP del servidor')
            .setRequired(true))

    .setCallback(async ({ interaction }) => {

        try {
            const ip = interaction.options.getString("ip");
            const response = await fetch(`https://api.mcsrvstat.us/2/${ip}`);

            if (!response.ok) return interaction.reply({ content: "?", ephemeral: true });
            const data: MinecraftServerData = await response.json();
            if (data.online === false) return interaction.reply({ content: "El servidor no existe o esta apagado", ephemeral: true });
            const buffer = Buffer.from(data.icon.split(",")[1], "base64");
            const bufferAttach = new AttachmentBuilder(buffer, { name: "buffer.png" })

            const embed = new EmbedBuilder()
                .setTitle(`Informacion de ${ip}`)
                .setThumbnail(`attachment://buffer.png`)
                .addFields(
                    {
                        name: "IP del servidor",
                        value: `\`${ip}\``,
                        inline: true
                    },
                    {
                        name: "status",
                        value: `\`${data.online === true ? "Online" : "Offline"}\``,
                        inline: true
                    },
                    {
                        name: "Jugadores",
                        value: `\`${data.players.online}/${data.players.max}\``,
                        inline: true
                    },
                    {
                        name: "Version",
                        value: `\`${data.version}\``,
                        inline: false
                    },
                    {
                        name: "Numeric IP",
                        value: `\`${data.ip}\``,
                        inline: true
                    },
                    {
                        name: "port",
                        value: `\`${data.port}\``,
                        inline: true
                    }
                    ,
                    {
                        name: "Description",
                        value: `\`${data.motd.clean[0]}\``,
                        inline: false
                    }

                )
                .setColor("Random")
                .setFooter({ text: `${ip}`, iconURL: "attachment://buffer.png" });
            await interaction.deferReply({ ephemeral: true })
            await interaction.editReply({ embeds: [embed], files: [bufferAttach], });

        } catch (error) {
            interaction.reply({ content: error.message, ephemeral: true });
        }
    });
