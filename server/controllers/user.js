const store = require('../data/store');

async function login (username) {
  const users = await store.getUsers();

  return users.find(user => {
    return user.username === username;
  });
}

async function getUsers () {
  return await store.getUsers();
}

async function addUser (user) {
  const users = await store.getUsers();
  if (users.find(item => item.username === user.username)) {
    return null;
  }

  users.push(user);
  await store.saveUsers(users);

  return user;
}

async function updateUser (user) {
  const users = await store.getUsers();
  const id = users.findIndex(item => item.username === user.username);
  if (!id) {
    return null;
  }

  users[id] = user;
  await store.saveUsers(users);

  return user;
}

async function deleteUser (user) {
  const users = await store.getUsers();
  const id = users.findIndex(item => item.username === user.username);
  if (!id) {
    return null;
  }

  users.splice(id, 1);
  await store.saveUsers(users);

  return user;
}

module.exports = {
  login, getUsers, addUser, updateUser, deleteUser,
};
