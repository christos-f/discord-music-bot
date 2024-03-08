import { readdirSync } from "node:fs";
import path from "node:path";
import { Collection } from "discord.js";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { useMainPlayer } from "discord-player";

const __dirname = dirname(fileURLToPath(import.meta.url));

export const loadModules = async (client) => {
  client.commands = new Collection();

  const commandFoldersPath = path.join(__dirname, "commands");
  const commandFolders = readdirSync(commandFoldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(commandFoldersPath, folder);
    const commandFiles = readdirSync(commandsPath).filter((file) => file.endsWith(".js"));
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const { command } = await import(filePath);
      if ("data" in command && "execute" in command) {
        client.commands.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }

  const eventFoldersPath = path.join(__dirname, "events");
  const eventFolders = readdirSync(eventFoldersPath);

  const player = useMainPlayer()

  for (const folder of eventFolders) {
    const eventsPath = path.join(eventFoldersPath, folder);
    const eventFiles = readdirSync(eventsPath).filter((file) => file.endsWith(".js"));
    for (const file of eventFiles) {
      const filePath = path.join(eventsPath, file);
      const { event } = await import(filePath);
      
      if (folder === "player") {
        player.events.on(event.name, (...args) => event.execute(...args))
      }

      if (event.once) {
        client.once(event.name, (...args) => event.execute(...args));
      } else {
        client.on(event.name, (...args) => event.execute(...args));
      }
    }
  }
};
