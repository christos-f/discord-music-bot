import { useQueue } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Stops audio playback and clears queue"),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return inter.editReply({
        content: `No music currently playing ${inter.member}... try again ? ❌`,
        ephemeral: true,
      });
    queue.delete
  },
};
