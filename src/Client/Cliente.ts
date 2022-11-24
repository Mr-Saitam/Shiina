import { Client, DiscordAPIError } from 'discord.js';
import  Discord  from 'discord.js';
import * as dotenv from "dotenv"; 
import type { CommandBuilder } from '../interfaces/Commands';
dotenv.config();
import { commandHandler } from '../handlers';
import { eventHandler } from '../handlers/events';
export class ExtendedClient extends Client<true> {
constructor(){
    super({
        intents: 3276799,
        presence:{
            status: "dnd"
        }
    })
}
public commands = new Discord.Collection<string, CommandBuilder>()

public async init(){
    await commandHandler(this)
    await eventHandler(this)
    await this.login(process.env.TOKEN);
}


}
export default ExtendedClient;