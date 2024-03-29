import { createNowPlayingEmbed } from "../../embeds/nowPlaying.js";

export const event = {
  name: "playerStart",
  async execute(queue, track) {
    createNowPlayingEmbed(queue)
    console.log(`Started playing **${track.title}**!`);
  },
};
