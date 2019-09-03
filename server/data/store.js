const fs = require('fs').promises;

async function getUsers () {
  try {
    const buffer = await fs.readFile('user.json');
    return JSON.parse(buffer.toString());
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function saveUsers (users) {
  try {
    await fs.writeFile('user.json', JSON.stringify(users));
  } catch (e) {
    console.log(e);
  }
}

async function getGroups () {
  try {
    const buffer = await fs.readFile('group.json');
    return JSON.parse(buffer.toString());
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function saveGroups (groups) {
  try {
    await fs.writeFile('group.json', JSON.stringify(groups));
  } catch (e) {
    console.log(e);
  }
}

async function getChannels () {
  try {
    const buffer = await fs.readFile('channel.json');
    return JSON.parse(buffer.toString());
  } catch (e) {
    console.log(e);
    return [];
  }
}

async function saveChannels (groups) {
  try {
    await fs.writeFile('channel.json', JSON.stringify(groups));
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  getUsers, saveUsers, getGroups, saveGroups, getChannels, saveChannels,
};
