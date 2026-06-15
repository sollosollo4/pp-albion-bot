import { REST, Routes } from 'discord.js';
import { config } from './config.js';
import { commands } from './commands/index.js';

const body = commands.map((cmd) => cmd.data.toJSON());

const rest = new REST({ version: '10' }).setToken(config.discordToken);

try {
  if (config.guildId) {
    await rest.put(Routes.applicationGuildCommands(config.clientId, config.guildId), {
      body,
    });
    console.log(`Registered ${body.length} guild commands for guild ${config.guildId}`);
  } else {
    await rest.put(Routes.applicationCommands(config.clientId), { body });
    console.log(`Registered ${body.length} global commands`);
  }
} catch (error) {
  console.error('Failed to register commands:', error);
  process.exit(1);
}
