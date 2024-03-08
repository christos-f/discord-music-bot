import { useQueue } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("pause")
    .setDescription("Pauses current playing audio"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });
    queue.metadata.lastCommand = {
      user: interaction.member.nickname,
      commandName: "/pause",
    };
    try {
      queue.node.setPaused(!queue.node.isPaused());
      await interaction.reply("Track Paused ⏸️");
      return await interaction.deleteReply();
    } catch (e) {
      console.log(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
