import Course from '../models/Course.js';

export const courseAdmin = {
  resource: Course,
  options: {
    navigation: {
      name: 'Course',
    },
    listProperties: ['_id', 'name', 'price', 'quantity', 'slug', 'createdAt', 'updatedAt'],
    editProperties: ['name', 'image', 'description', 'quantity', 'price'],
  }
}