import { useQueue } from "discord-player";
import { SlashCommandBuilder } from "discord.js";
import { welcomeEmbeds } from "../../embeds/help.js";
export const command = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops audio playback and clears queue"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });
    queue.metadata.lastCommand = {
      user: interaction.member.nickname,
      commandName: "/stop",
    };
    try {
      queue.delete();
      await interaction.reply("Playback stopped and queue deleted 🤚🚫");
      return await interaction.deleteReply();
    } catch (e) {
      console.log(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
