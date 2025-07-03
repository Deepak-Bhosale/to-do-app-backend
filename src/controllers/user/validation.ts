import { errorMessages } from '../../libs/constant';

export default Object.freeze({
  get: {},
  userProfileData: {},
  getAllUsersData: {},
  create: {
    firstName: {
      errorMessage: errorMessages.BAD_FIRST_NAME_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_FIRST_NAME_REQUEST,
        options: { min: 3 },
      },
    },
    lastName: {
      errorMessage: errorMessages.BAD_LAST_NAME_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_LAST_NAME_REQUEST,
        options: { min: 3 },
      },
    },
    email: {
      errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_EMAIL_REQUEST,
        options: { min: 6 },
      },
    },
    password: {
      errorMessage: errorMessages.BAD_PASSWORD_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_PASSWORD_LENGTH_REQUEST,
        options: { min: 6 },
      },
    },
    role: {
      errorMessage: errorMessages.BAD_ROLE_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_ROLE_REQUEST,
        options: { min: 3 },
      },
    },
  },
  addBulkUsers: {
    errorMessage: errorMessages.BAD_INSERT_MANY,
      in: ['body'],
  },
  update: {
    originalId: {
      string: true,
      exist: true,
      errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      in: ['params'],
    },
  },
  delete: {
    originalId: {
      string: true,
      exist: true,
      errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      in: ['params'],
    },
  },
  login: {
    email: {
      errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      regex: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_EMAIL_REQUEST,
        options: { min: 6 },
      },
    },
    password: {
      errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      in: ['body'],
      isLength: {
        errorMassage: errorMessages.BAD_EMAIL_REQUEST,
        options: { min: 6 },
      },
    },
  },
});
