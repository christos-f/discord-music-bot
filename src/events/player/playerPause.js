import { createNowPlayingEmbed } from "../../embeds/nowPlaying.js";

export const event = {
  name: "playerPause",
  async execute(queue) {
    createNowPlayingEmbed(queue);
    console.log(`Paused Player`);
  },
};
