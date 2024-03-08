export const event = {
  name: "playerSkip",
  execute(queue, track) {
    console.log(`Skipped track **${track.title}**!`);
  },
};
