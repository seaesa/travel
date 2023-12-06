import Tour from '../models/Tour.js';

export const tourAdmin = {
  resource: Tour,
  options: {
    navigation: {
      name: 'Course',
    },
    listProperties: ['_id', 'name', 'price', 'quantity', 'slug', 'createdAt', 'updatedAt'],
    editProperties: ['name', 'image', 'description', 'quantity', 'price'],
  }
}