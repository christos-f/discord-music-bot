import { createNowPlayingEmbed } from "../../embeds/nowPlaying.js";

export const event = {
  name: "playerStart",
  execute(queue, track) {
    queue.metadata.channel.send(createNowPlayingEmbed(queue))
    console.log(`Started playing **${track.title}**!`);
  },
};
 