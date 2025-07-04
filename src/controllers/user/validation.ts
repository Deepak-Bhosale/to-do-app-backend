import { errorMessages } from "../../libs/constant";

export default Object.freeze({
  get: {},
  userProfileData: {},
  getAllUsersData: {},
  create: {
    firstName: {
      errorMessage: errorMessages.BAD_FIRST_NAME_REQUEST,
      in: ["body"],
      isLength: {
        errorMessage: errorMessages.BAD_FIRST_NAME_REQUEST,
        options: { min: 3 },
      },
    },
    lastName: {
      errorMessage: errorMessages.BAD_LAST_NAME_REQUEST,
      in: ["body"],
      isLength: {
        errorMessage: errorMessages.BAD_LAST_NAME_REQUEST,
        options: { min: 3 },
      },
    },
    email: {
      errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      in: ["body"],
      isEmail: {
        errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      },
      matches: {
        options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      },
      isLength: {
        errorMessage: errorMessages.BAD_EMAIL_REQUEST,
        options: { min: 6 },
      },
    },
    password: {
      errorMessage: errorMessages.BAD_PASSWORD_REQUEST,
      in: ["body"],
      isLength: {
        errorMessage: errorMessages.BAD_PASSWORD_LENGTH_REQUEST,
        options: { min: 6 },
      },
    },
    role: {
      errorMessage: errorMessages.BAD_ROLE_REQUEST,
      in: ["body"],
      isLength: {
        errorMessage: errorMessages.BAD_ROLE_REQUEST,
        options: { min: 3 },
      },
    },
  },
  addBulkUsers: {
    errorMessage: errorMessages.BAD_INSERT_MANY,
    in: ["body"],
  },
  update: {
    originalId: {
      errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      in: ["params"],
      isString: {
        errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      },
      notEmpty: {
        errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      },
    },
  },
  delete: {
    originalId: {
      errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      in: ["params"],
      isString: {
        errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      },
      notEmpty: {
        errorMessage: errorMessages.BAD_ORIGINALID_REQUEST,
      },
    },
  },
  login: {
    email: {
      errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      in: ["body"],
      isEmail: {
        errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      },
      matches: {
        options: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        errorMessage: errorMessages.BAD_EMAIL_REQUEST,
      },
      isLength: {
        errorMessage: errorMessages.BAD_EMAIL_REQUEST,
        options: { min: 6 },
      },
    },
    password: {
      errorMessage: errorMessages.BAD_PASSWORD_REQUEST,
      in: ["body"],
      isLength: {
        errorMessage: errorMessages.BAD_PASSWORD_REQUEST,
        options: { min: 6 },
      },
    },
  },
});
