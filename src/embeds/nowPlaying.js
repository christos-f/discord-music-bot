import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export const createNowPlayingEmbed = async (queue) => {
  const track = queue.currentTrack;

  const timestamp = queue.node.getTimestamp();

  const trackDuration =
    timestamp.progress == "Infinity" ? "infinity (live)" : track.duration;

  const progress = queue.node.createProgressBar();

  const title = !queue.node.isPaused() ? "Now Playing 🔊" : "Paused ⏸️";

  const volumeUpButton = new ButtonBuilder()
    .setLabel("🔊⬆️")
    .setCustomId("volumeUp")
    .setStyle("Primary");

  const VolumeDownButton = new ButtonBuilder()
    .setLabel("🔉⬇️")
    .setCustomId("volumeDown")
    .setStyle("Secondary");

  const pauseButton = new ButtonBuilder()
    .setLabel("⏸️")
    .setCustomId("pause")
    .setStyle("Primary");

  const resumeButton = new ButtonBuilder()
    .setLabel("▶️")
    .setCustomId("pause")
    .setStyle("Success");

  const skipButton = new ButtonBuilder()
    .setLabel("⏭️")
    .setCustomId("skip")
    .setStyle("Secondary");

  const stopButton = new ButtonBuilder()
    .setLabel("🛑")
    .setCustomId("stop")
    .setStyle("Danger");

  const embed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`\n${track.title}`)
    .setAuthor({ name: title })
    .setDescription(`Volume: ${queue.node.volume}%\n Progress: ${progress}`)
    .setImage(track.raw.thumbnail.url)
    .setTimestamp()
    .setFooter({
      text: `Requested by ${track.requestedBy.globalName}`,
    });

  const row = !queue.node.isPaused()
    ? new ActionRowBuilder().addComponents(
        volumeUpButton,
        VolumeDownButton,
        pauseButton,
        skipButton,
        stopButton
      )
    : new ActionRowBuilder().addComponents(
        volumeUpButton,
        VolumeDownButton,
        resumeButton,
        skipButton,
        stopButton
      );

  const queueEmbed =
    queue.getSize() >= 1
      ? new EmbedBuilder()
          .setColor(0x0099ff)
          .setTitle("Next in Queue")
          .addFields(
            queue.tracks.data.map((track, i) => {
              return {
                name: `${i + 1}. ${track.title}`,
                value: `Requested by ${track.requestedBy.globalName}`,
              };
            })
          )
      : new EmbedBuilder().setColor(0x0099ff).setTitle("Nothing in queue");

  const { user, commandName } = queue.metadata.lastCommand;
  const lastCommandEmbed = new EmbedBuilder()
    .setColor(0x0099ff)
    .setTitle(`@${user} used ${commandName}`);
  if (!queue.metadata.currentEmbed) {
    await queue.metadata.channel.bulkDelete(10);
    const nowPlayingMessage = await queue.metadata.channel.send({
      embeds: [lastCommandEmbed, embed],
      components: [row],
    });
    const queueMessage = await queue.metadata.channel.send({
      embeds: [queueEmbed],
    });
    queue.metadata.currentEmbed = nowPlayingMessage;
    queue.metadata.queueEmbed = queueMessage;
  } else {
    queue.metadata.currentEmbed.edit({
      embeds: [lastCommandEmbed, embed],
      components: [row],
    });
    queue.metadata.queueEmbed.edit({
      embeds: [queueEmbed],
    });
  }
};
