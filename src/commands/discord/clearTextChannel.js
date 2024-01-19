import { SlashCommandBuilder } from "discord.js";

export const command = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Clears messages from a text channel"),
  async execute(interaction) {
    await interaction.channel.bulkDelete(20);
    await interaction.reply({
      content: "Deleted 20 messages",
      ephemeral: true,
    });
  },
};
