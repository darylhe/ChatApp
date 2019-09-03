const store = require('../data/store');

async function getChannels () {
  return await store.getChannels();
}

async function saveChannels (channels) {

  await store.saveChannels(channels);

  return channels;
}

module.exports = {
  getChannels, saveChannels,
};
