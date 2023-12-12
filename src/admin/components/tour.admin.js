import Tour from '../../models/Tour.js';
export const tourAdmin = {
  resource: Tour,
  options: {
    navigation: {
      name: 'Course',
    },
    properties: {
      image: { type: 'uuid'}
    },
    listProperties: ['name', 'price', 'quantity', 'slug', 'createdAt', 'updatedAt'],
    editProperties: ['name', 'image', 'description', 'quantity', 'price'],
  }
}