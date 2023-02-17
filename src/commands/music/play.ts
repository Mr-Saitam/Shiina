
import { CommandBuilder } from "../../interfaces/Commands";
import { promisify } from 'util';
import { userMention } from "discord.js";

const setTimeoutPromise = promisify(setTimeout);

export default new CommandBuilder()
    .setName("play")
    .setDescription("reproduce una cancion")
    .addStringOption(option => option.setName('song').setDescription('nombre de la cancion o url').setRequired(true))
    .setCallback(async ({ client, interaction }) => {
        const song = interaction.options.getString("song")
        const res = await client.manager.search(song);
        if (!interaction.member.voice.channel) return interaction.reply("No estas en un canal de voz")
        const player = client.manager.create({
            guild: interaction.guild.id,
            voiceChannel: interaction.member.voice.channel.id,
            textChannel: interaction.channel.id,

        });
        player.connect();

        const canciones = await player.search(song)

        if (canciones.loadType === "PLAYLIST_LOADED") {
            for (let i = 0; i < canciones.tracks.length; i++) {
                player.queue.add(canciones.tracks[i])
            }
            await interaction.deferReply()
            await interaction.editReply({ content: `La playlist \`${canciones.playlist.name}\` fue añadida a la cola por ${userMention(interaction.user.id)} con \`${canciones.tracks.length}\` canciones ` })
            await setTimeoutPromise(15000);
            await interaction.deleteReply();
        } else {
            player.queue.add(res.tracks[0])

            await interaction.reply({ content: 'Reproduciendo canción...' });
            await setTimeoutPromise(500);
            await interaction.deleteReply();
        }

        if (!player.playing && !player.paused && !player.queue.size)
            player.play();
        if (
            !player.playing &&
            !player.paused &&
            player.queue.totalSize === res.tracks.length
        )
            player.play();

    }

    )