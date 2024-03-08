import { Client, GatewayIntentBits } from "discord.js";
import { loadModules } from "./loader.js";
import { Player } from "discord-player";
import "dotenv/config.js";
import { welcomeEmbeds } from "./embeds/help.js";

const token = process.env.TOKEN;
const textChannelId = process.env.TEXT_CHANNEL_ID;
const guildId = process.env.GUILD_ID;

if (!token) throw new Error("NO TOKEN PROVIDED");

// Create a new client instance
const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
});
const player = new Player(client);
await player.extractors.loadDefault((ext) => ext === "YouTubeExtractor");

// Load Events and Commands
await loadModules(client);

// Log in to Discord with your client's token
await client.login(token);

// Get the list of guilds this bot is in
const guilds = client.guilds.cache;

const guild = guilds.get(guildId);

const textChannel = await guild.channels.fetch(textChannelId);
await textChannel.bulkDelete(20);
await textChannel.send({ embeds: welcomeEmbeds });

console.log("Successfully Cleared Text Channel ✅ Ready to go!");
