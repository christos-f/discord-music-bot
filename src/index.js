import { Client, GatewayIntentBits } from 'discord.js';
import { loadModules } from './loader.js';
import "dotenv/config.js" 

const token = process.env.TOKEN

if (!token)
    throw new Error("NO TOKEN PROVIDED")

// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// Load Events and Commands
await loadModules(client)


// Log in to Discord with your client's token
client.login(token);