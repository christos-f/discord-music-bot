export const event = {
  name: "playerError",
  async execute(queue, error) {
    console.log(`Player error event: ${error.message}`);
    console.log(error);
  },
};
