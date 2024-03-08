import { createNowPlayingEmbed } from "../../embeds/nowPlaying.js";

export const event = {
  name: "volumeChange",
  async execute(queue) {
    createNowPlayingEmbed(queue)
    console.log(`Volume Changed`);
  },
};