import { useQueue } from "discord-player";

export const command = {
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });
    queue.metadata.lastCommand = {
      user: interaction.member.nickname,
      commandName: "/skip",
    };
    try {
      queue.node.skip();
      return interaction.deferUpdate();
    } catch (e) {
      console.log(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
