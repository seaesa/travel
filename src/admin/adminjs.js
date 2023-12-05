// import admin
import Adminjs from 'adminjs';
import AdminJSExpress from '@adminjs/express';
import { Database, Resource } from '@adminjs/mongoose';
// import modal
import User from '../models/User.js';
import Course from '../models/Course.js';
import Tour from '../models/Tour.js';

// config database adminjs
Adminjs.registerAdapter({ Database, Resource })

// initialize admin view
const admin = new Adminjs({
  resources: [{
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
  },
  {
    resource: Tour,
    options: {
      navigation: {
        name: 'Course',
      },
      listProperties: ['_id', 'name', 'price', 'quantity', 'slug', 'createdAt', 'updatedAt'],
      editProperties: ['name', 'image', 'description', 'quantity', 'price'],
    }
  },
  {
    resource: Course,
    options: {
      navigation: {
        name: 'Course',
      },
      listProperties: ['_id', 'name', 'price', 'quantity', 'slug', 'createdAt', 'updatedAt'],
      editProperties: ['name', 'image', 'description', 'quantity', 'price'],
    }
  }
  ],
  // rootPath: '/adminfanpage',
  // loginPath:'adminfanpage/login',
  // logoutPath:'/adminfanpage/logout',
  // refreshTokenPath:'/adminfanpage/refresh-token'
});

// init router
const adminRouter = AdminJSExpress.buildRouter(admin);

export { adminRouter, admin };