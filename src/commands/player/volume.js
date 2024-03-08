import { useQueue } from "discord-player";
import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Sets the volume of the player")
    .addIntegerOption((option) =>
      option.setName("volume").setDescription("0-100").setRequired(true)
    ),
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });

    let volume = interaction.options.getInteger("volume", true);

    if (volume > 100) volume = 100;
    if (volume < 0) volume = 0;

    queue.metadata.lastCommand = {
      user: interaction.member.nickname,
      commandName: "/volume",
    };
    try {
      queue.node.setVolume(volume);
      await interaction.reply("Volume Changed 🔈🔉");
      return await interaction.deleteReply();
    } catch (e) {
      console.log(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
