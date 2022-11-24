import { SlashCommandBuilder ,SlashCommandSubcommandBuilder,SlashCommandSubcommandGroupBuilder} from "discord.js";
import type { ChatInputCommandInteraction} from 'discord.js'
import ExtendedClient from "../Client/Cliente";
export class CommandBuilder extends SlashCommandBuilder {
   public callback!: CommandFunction;

   public setCallback(fn: CommandFunction){
    this.callback = fn;
    return this;
   }


   public override addSubcommand(
    input:
        | SlashCommandSubcommandBuilder
        | ((subcommandGroup: SlashCommandSubcommandBuilder) => SlashCommandSubcommandBuilder)
) {
    super.addSubcommand(input);
    return this;
}

public override addSubcommandGroup(
    input:
        | SlashCommandSubcommandGroupBuilder
        | ((
                subcommandGroup: SlashCommandSubcommandGroupBuilder
          ) => SlashCommandSubcommandGroupBuilder)
) {
    super.addSubcommandGroup(input);
    return this;
}
}





type CommandFunction =  (idk: {
    client: ExtendedClient,
    interaction: ChatInputCommandInteraction<'cached'>;
}) => unknown;