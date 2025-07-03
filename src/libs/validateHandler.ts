import { NextFunction, Request, Response } from "express";
import { checkSchema, validationResult } from "express-validator";

const validationHandler = (validator: any): any => {
  return [
    checkSchema(validator),
    (request: Request, response: Response, next: NextFunction) => {
      const errors = validationResult(request);
      if (!errors.isEmpty()) {
        next(
          response.send({
            message: "BAD_REQUEST",
            status: 500,
            error: errors.array(),
          })
        );
      }
      next();
    },
  ];
};

export default validationHandler;
