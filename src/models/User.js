const bcrypt = require('bcryptjs');

const mockUsers = [
  { login: 'john', password: '123', name: 'John Snow' },
  { login: 'pink', password: 'qwerty', name: 'Pink Floyd' },
  { login: 'tom', password: 'admin', name: 'Tom Cruise' }
]

async function getUsers() {
  return await Promise.all(mockUsers.map(async (u) => {
    const password = await bcrypt.hashSync(u.password, 12);
    return {
      ...u,
      password
    }
  }));
}


class User {
  static async findOneByLogin(login) {
    const users = await getUsers();
    return users.find(i => i.login === login);
  }
}

module.exports = {
  User
};
