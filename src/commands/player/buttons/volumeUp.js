import { useQueue } from "discord-player";

export const command = {
  async execute(interaction) {
    const queue = useQueue(interaction.guild.id);
    if (!queue)
      return interaction.editReply({
        content: `No music currently playing ${interaction.member}... try again ? ❌`,
        ephemeral: true,
      });

    const currentVolume = queue.node.volume;

    let newVolume = currentVolume + 15;

    if (newVolume > 100) newVolume = 100;
    queue.metadata.lastCommand = {
      user: interaction.member.nickname,
      commandName: "/volume",
    };
    try {
      queue.node.setVolume(newVolume);
      return interaction.deferUpdate();
    } catch (e) {
      console.log(e);
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
