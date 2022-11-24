import { readdirSync } from 'fs';
import { join } from 'path';
import ExtendedClient from '../Client/Cliente';
import { EventBuilder } from '../interfaces/Event';

export async function eventHandler(client: ExtendedClient) {
    const categoria = readdirSync(join(__dirname, '..', 'events'));
    for (const category of categoria) {
        const events = readdirSync(join(__dirname, '..', 'events', category))

        for (const eventFile of events) {
            const { default: event }: { default: EventBuilder<'ready'> } = await import(join(__dirname, '..', 'events', category, eventFile))

            if (event.once) {
                client.on(event.name, (...args) => void event.callback(client, ...args));
            } else {
                client.on(event.name, (...args) => void event.callback(client, ...args));
            }


        }
    }




}
