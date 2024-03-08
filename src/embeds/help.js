import { EmbedBuilder } from "@discordjs/builders";

const commandsEmbed = new EmbedBuilder()
  .setTitle("🧞‍♂️ **| Commands**")
  .setDescription(
    "Use any of these slash commands by typing them in the text channel\nJust use **/play** to get started!\nBelow are a list of useable commands:\n"
  )
  .addFields(
    {
      name: "**▶️ |  /play**",
      value:
        "Starts playing audio. If audio is already playing, it will queue it to play next",
      inline: true,
    },
    {
      name: "**⏸️ |  /pause**",
      value: "Pauses audio that is currently playing",
      inline: true,
    },
    {
      name: "**⏯️ |  /resume**",
      value: "Resumes playing paused audio",
      inline: true,
    },
    {
      name: "**⏭️ |  /skip**",
      value:
        "Skips the current playing audio and starts playing the next track in queue",
      inline: true,
    },
    {
      name: "**🛑 |  /stop**",
      value:
        "Stops the current playing audio and removes all tracks from the queue",
      inline: true,
    },
    {
      name: "**🔊 |  /volume**",
      value: "Sets the volume of the audio player",
      inline: true,
    }
  )
  .setFooter({
    text: "You can also use these commands by clicking the buttons attached to bottom of the player",
  });

const welcomeEmbed = new EmbedBuilder()
  .setTitle("🤖 **| Music Bot**")
  .setDescription(
    "This is a simple discord bot that plays audio from YouTube.\nTo get started, just use the command **/play** in the text channel.\n\nYou will then be prompted to enter something to search for\n\nThis text can either be any text to search YouTube for, or a YouTube URL.\n**If** you provide text to search YouTube for, it will start playing the first result it finds\n**If** you provide a YouTube URL, it will start playing that link"
  );

export const welcomeEmbeds = [welcomeEmbed, commandsEmbed];
