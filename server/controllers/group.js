const store = require('../data/store');

async function getGroups () {
  return await store.getGroups();
}

async function saveGroups (groups) {

  await store.saveGroups(groups);

  return groups;
}

module.exports = {
  getGroups, saveGroups,
};
