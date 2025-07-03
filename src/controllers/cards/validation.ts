import { errorMessages } from '../../libs/constant';

export default {
  create: {
    title: {
      in: ['body'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
    description: {
      in: ['body'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
    listId: {
      in: ['body'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
  update: {
    id: {
      in: ['params'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
    title: {
      in: ['body'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
    description: {
      in: ['body'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
    listId: {
      in: ['body'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
  delete: {
    id: {
      in: ['params'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
  getByList: {
    listId: {
      in: ['params'],
      isString: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
};
