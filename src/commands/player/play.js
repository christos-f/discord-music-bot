import { useMainPlayer } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

const textChannelId = process.env.TEXT_CHANNEL_ID;

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

    const textChannel = await interaction.guild.channels.fetch(textChannelId);
    const player = useMainPlayer();
    // TEMPORARY
    const channel = await interaction.guild.channels.fetch(
      "1192598451024834671"
    );
    // const channel = interaction.member.voice.channel;

    if (!channel)
      return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel
    const query = interaction.options.getString("query", true); // we need input/query to play

    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      interaction.myRequestedBy = interaction.member.nickname;
      const { queue, track } = await player.play(channel, query, {
        nodeOptions: {
          // nodeOptions are the options for guild node (aka your queue in simple word)
          metadata: interaction, // we can access this metadata object using queue.metadata later on
        },
        requestedBy: interaction.member,
      });
      queue.metadata.lastCommand = {
        user: interaction.member.nickname,
        commandName: "/play",
      };
      queue.metadata.textChannel = textChannel
      await interaction.editReply("Track Queued ✅");
      return await interaction.deleteReply();
    } catch (e) {
      // let's return error if something failed
      console.log(e)
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
