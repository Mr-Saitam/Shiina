import { Manager } from "erela.js";
import { TextChannel, EmbedBuilder } from "discord.js";
import ExtendedClient from "../src/Client/Cliente";
import Spotify from "erela.js-spotify";
import * as dotenv from "dotenv";
dotenv.config();

export class ExtendedManager extends Manager {
    constructor(public client: ExtendedClient) {
        super({
            defaultSearchPlatform: "youtube music",
            plugins: [
                new Spotify({
                    clientID: process.env.SpotifyId,
                    clientSecret: process.env.SpotifySecret
                })
            ],
            nodes: [
                {
                    host: "lavalink.joshsevero.dev",
                    port: 80,
                    password: "oxygen",
                    secure: false
                }
            ],
            send(id: string, payload: any) {
                payload.d.self_deaf = true;
                const guild = client.guilds.cache.get(id);
                if (guild) guild.shard.send(payload);
            }
        });

        this.on("nodeConnect", node => console.log(`Node ${node.options.identifier} connected`));
        this.on("nodeError", (node, error) => console.log(`Node ${node.options.identifier} error: ${error.message}`));
        client.on("raw", (d: any) => client.manager.updateVoiceState(d));
        this.on("queueEnd", player => {
            const channel = client.channels.cache.get(player.textChannel) as TextChannel;
            channel.send({ content: "La cola de canciones ha terminado." });
            player.destroy();
        });
        this.on("trackStart", (player, track) => {
            function roundToTwo(num: number) {
                return Math.round(num * 100) / 100;
            }
            const embed = new EmbedBuilder()
                .setTitle("Ahora suena ♪")
                .setThumbnail(track.thumbnail)
                .setDescription(`[${track.title}](${track.uri})\n[0:00 / ${roundToTwo(track.duration / 1000 / 60).toString().replace(".", ":")}]`)
                .setColor("Random");
            const channel = client.channels.cache.get(player.textChannel) as TextChannel;
            channel.send({ embeds: [embed] });
        });
    }
}
