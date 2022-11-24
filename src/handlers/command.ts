import { readdirSync} from 'fs';
import { join } from 'path';
import ExtendedClient from '../Client/Cliente';
import { CommandBuilder } from '../interfaces/Commands';
export async function commandHandler(client: ExtendedClient){
    const categoria = readdirSync(join(__dirname,'..' , 'commands'));
    for ( const category of categoria){
        const commands = readdirSync(join(__dirname,'..' , 'commands', category))

        for ( const command of commands){
            const { default: cmd } : {default: CommandBuilder} = await import(join(__dirname, '..', 'commands', category , command))

            

            client.commands.set(cmd.name , cmd)
        }
    }


    client.once("ready", () =>  {
client.application.commands.set(client.commands.map(cmd => cmd.toJSON()));

    })
}