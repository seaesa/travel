import User from '../models/User.js';

export const userAdmin = {
  resource: User,
  options: {
    navigation: {
      name: 'Users',
      icon: 'Users'
    },
    listProperties: ['_id', 'email', 'username', 'role', 'createdAt', 'updatedAt'],
    actions: {
      new: { isAccessible: false },
      edit: { isVisible: false },
      delete: { isVisible: false }
    },
    sort: {
      sortBy: 'createdAt',
      direction: 'desc'
    }
  },
}