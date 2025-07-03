import { errorMessages } from "../../libs/constant";

export default Object.freeze({
  getLists: {},
  create: {
    title: {
      in: ["body"],
      isString: true,
      notEmpty: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
  update: {
    id: {
      in: ["params"],
      isString: true,
      notEmpty: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
    title: {
      in: ["body"],
      isString: true,
      notEmpty: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
  delete: {
    id: {
      in: ["params"],
      isString: true,
      notEmpty: true,
      errorMessage: errorMessages.BAD_REQUEST,
    },
  },
});
