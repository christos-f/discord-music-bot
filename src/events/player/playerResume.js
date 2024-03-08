import { createNowPlayingEmbed } from "../../embeds/nowPlaying.js";

export const event = {
  name: "playerResume",
  execute(queue) {
    createNowPlayingEmbed(queue)
    console.log(`Player unpaused`);
  },
};
