export const event = {
  name: "audioTrackAdd",
  execute(queue, track) {
    if (queue.getSize() > 1 || (queue.getSize() === 1 && !queue.isPlaying()))
      console.log("Need to add queue")
    console.log(`Track queued **${track.title}**!`);
  },
};
