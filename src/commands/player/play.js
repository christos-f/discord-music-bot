import { useMainPlayer } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Plays audio from Youtube")
    .addStringOption((option) =>
      option
        .setName("query")
        .setDescription("input to search Youtube for")
        .setRequired(true)
    ),
  async execute(interaction) {
    const player = useMainPlayer();
    // TEMPORARY
    const channel = await interaction.guild.channels.fetch("1192598451024834671")
    // const channel = interaction.member.voice.channel;
    
    if (!channel)
      return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel
    const query = interaction.options.getString("query", true); // we need input/query to play

    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      const { track } = await player.play(channel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction, // we can access this metadata object using queue.metadata later on
        },
      });
 
        await interaction.editReply("Now playing")

    } catch (e) {
      // let's return error if something failed
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
