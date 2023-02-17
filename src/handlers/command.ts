import { readdirSync } from 'fs';
import { join } from 'path';
import AsciiTable from "ascii-table";
import ExtendedClient from '../Client/Cliente';
import { CommandBuilder } from '../interfaces/Commands';
export async function commandHandler(client: ExtendedClient) {
    const categoria = readdirSync(join(__dirname, '..', 'commands'));
    for (const category of categoria) {
        const commands = readdirSync(join(__dirname, '..', 'commands', category))
        for (const command of commands) {
            const { default: cmd }: { default: CommandBuilder } = await import(join(__dirname, '..', 'commands', category, command))
            client.commands.set(cmd.name, cmd)
        }
    }

    client.once("ready", () => {
        const table = new AsciiTable();
        table.setHeading("Command", "Description");

        const cmds = client.commands;
        
        cmds.forEach(command => {
            const name = command?.name || "vacio";
            const description = command?.description || "vacio";
            table.addRow(name, description);
        });
        console.log(table.toString())
        client.application.commands.set(client.commands.map(cmd => cmd.toJSON()));
    })
}