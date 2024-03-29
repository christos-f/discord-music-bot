import { createNowPlayingEmbed } from "../../embeds/nowPlaying.js";

export const event = {
  name: "audioTrackAdd",
  execute(queue, track) {
    if (queue.getSize() > 1 || (queue.getSize() === 1 && queue.isPlaying())) {
      console.log("Queue should be added")
      createNowPlayingEmbed(queue);
    }
    console.log(`Track queued **${track.title}**!`);
  },
};
