export const event = {
  name: "playerError",
  async execute(queue, error) {
    console.log(`General player error event: ${error.message}`);
    console.log(error);
  },
};
