import { EmbedBuilder } from "@discordjs/builders";
import { ActionRowBuilder, ButtonBuilder } from "discord.js";

export const createNowPlayingEmbed = (queue) => {
  const track = queue.currentTrack;

  const timestamp = queue.node.getTimestamp();

  const trackDuration =
    timestamp.progress == "Infinity" ? "infinity (live)" : track.duration;

  const progress = queue.node.createProgressBar();

  const volumeUpButton = new ButtonBuilder()
  .setLabel("🔊⬆️")
  .setCustomId("volumeUp")
  .setStyle("Primary")

  const VolumeDownButton = new ButtonBuilder()
  .setLabel("🔉⬇️")
  .setCustomId("volumeDown")
  .setStyle("Secondary")

  const pauseResumeButton = new ButtonBuilder()
  .setLabel("⏸️ / ▶️")
  .setCustomId("pause/resume")
  .setStyle("Success")

  const skipButton = new ButtonBuilder()
  .setLabel("⏭️")
  .setCustomId("skip")
  .setStyle("Secondary")

  const stopButton = new ButtonBuilder()
  .setLabel("🛑")
  .setCustomId("stop")
  .setStyle("Danger")


  const latestCommand = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(`@Christos used /skip`)

  const embed = new EmbedBuilder()
	.setColor(0x0099FF)
	.setTitle(`${track.title}`)
	.setAuthor({ name: 'Now Playing 🔊'})
  .setDescription(`Volume: ${queue.node.volume}%\n Progress: ${progress}`)
	.setImage(track.raw.thumbnail.url)
	.setTimestamp()
	.setFooter({ text: `Requested by ${track.requestedBy}`, iconURL: 'https://i.imgur.com/AfFp7pu.png' });


    
  const row = new ActionRowBuilder().addComponents(volumeUpButton, VolumeDownButton, pauseResumeButton, skipButton, stopButton)
  


  return { embeds: [embed], components: [row] }



};