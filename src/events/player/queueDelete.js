import { welcomeEmbeds } from "../../embeds/help.js";

export const event = {
  name: "queueDelete",
  async execute(queue) {
    console.log(`Queue has been deleted! Clearing Text channel`);
    await queue.metadata.textChannel.bulkDelete(20);
    await queue.metadata.textChannel.send({ embeds: welcomeEmbeds });
  },
};
