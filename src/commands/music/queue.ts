import { EmbedBuilder } from "discord.js";
import { CommandBuilder } from "../../interfaces/Commands";

export default new CommandBuilder()
    .setName("queue")
    .setDescription("mira la lista de canciones de la cola")
    .addNumberOption(option =>
        option.setName("page")
            .setDescription("Selecciona qué página quieres ver"))
    .setCallback(async ({ client, interaction }) => {
        const voiceChannel = interaction.member.voice.channel;
        if (!voiceChannel) return interaction.reply("No estás en un canal de voz");

        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: voiceChannel.id,
            textChannel: interaction.channel.id,
        });

        const currentTrack = player.queue.current;
        if (!currentTrack) return interaction.reply("No hay ninguna canción en reproducción");

        const tracks = player.queue;
        const fieldsPerPage = 10;
        let pages = [];
        let currentPage = 0;
        let fields = [];

        fields.push({
            name: `💿 Ahora suena`,
            value: `[${currentTrack.title}](${currentTrack.uri}) - ${currentTrack.author}`,
        });

        tracks.forEach((track, i) => {
            fields.push({
                name: `${i + 1}. ${track.title}`,
                value: `[${track.title}](${track.uri}) - ${track.author}`,
            });

            if (fields.length === fieldsPerPage) {
                pages.push(fields);
                fields = [];
            }
        });

        if (fields.length) {
            pages.push(fields);
        }

        const sendPage = async (page) => {
            const embed = new EmbedBuilder()
                .setAuthor({
                    name: "Lista de reproducción",
                    iconURL: client.user.avatarURL(),
                })
                .setColor("Random")
                .setFields(pages[page])
                .setThumbnail(currentTrack.thumbnail);

            if (pages.length > 1) {
                embed.setFooter({ text: `Página ${page + 1} de ${pages.length}`, iconURL: client.user.avatarURL() });
            }
            await interaction.reply({ embeds: [embed] });
        };

        const requestedPage = interaction.options.getNumber("page");
        if (requestedPage >= pages.length) return interaction.reply(`Solo hay ${pages.length} páginas (0 - ${pages.length - 1})`);

        await sendPage(requestedPage || currentPage);
    });
