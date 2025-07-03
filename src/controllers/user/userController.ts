import { errorMessages, status } from "../../libs/constant";
import { Request, Response, NextFunction } from "express";
import { configuration } from "../../config/configuration";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { userRepository } from "../../repositories/user/UserRepository";

class UserController {
  getAllUsersData = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const options = request.query;

      if (options.role && options.role === "admin") {
        const adminData = await userRepository.getAllUsers({ role: { $eq: options.role } }, {}, {});
        const adminCount = await userRepository.countUsers({ role: { $eq: options.role } });
        return response.send({
          message: `Successfully fetched ${adminCount} Admin`,
          data: adminData,
          status: status.SUCCESS,
        });
      }

      if (options && options.role === "general") {
        const generalUserData = await userRepository.getAllUsers({ role: { $ne: "admin" } }, {}, {});
        const generalUserCount = await userRepository.countUsers({ role: { $ne: "admin" } });
        return response.send({
          message: `Successfully fetched ${generalUserCount} users`,
          data: generalUserData,
          status: status.SUCCESS,
        });
      }

      const allUserData = await userRepository.getAllUsers({}, {}, {});
      const allUserCount = await userRepository.countUsers();
      return response.send({
        message: `Successfully fetched all ${allUserCount} users`,
        data: allUserData,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log("CATCH BLOCK : user controller getAllUsersData =>", error);
      return next({
        error: errorMessages.BAD_REQUEST,
        message: "invalid required",
        status: status.BAD_REQUEST,
      });
    }
  };

  profile = async (request: any, response: Response, next: NextFunction) => {
    try {
      const token = request.header('Authorization');
      const { jwt_secret } = configuration;
      const decodedToken: any = jwt.verify(token, jwt_secret);
      const user = await userRepository.findOneUser(
        {
          originalId: decodedToken.data.originalId,
        },
      );
      return response.status(200).send({
        message: 'successfully fetched user details',
        data: user,
        status: status.SUCCESS,
      });
    } catch (error) {
      console.log('CATCH BLOCK : user controller me =>', error);
      return next({
        error: errorMessages.BAD_REQUEST,
        message: 'name is required',
        status: status.BAD_REQUEST,
      });
    }
  };

  registerUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { email, role, password } = request.body;
      const userExists = await userRepository.findOneUser({
        email,
      });

      if (userExists === null) {
        console.log("role", role);
        if (email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
          const output = await userRepository.createUser(
            {
              ...request.body,
              password: await bcrypt.hash(password, configuration.saltRounds),
            },
            {}
          );
          return response.send({
            message: "successfully created user",
            data: output,
            status: status.SUCCESS,
          });
        } else {
          return response.send({
            error: errorMessages.BAD_REQUEST,
            message: "enter a valid email",
            status: status.BAD_REQUEST,
          });
        }
      } else {
        return response.send({
          error: errorMessages.BAD_REQUEST,
          message: "User already exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller create =>", error);
      return next({
        error: errorMessages.BAD_REQUEST,
        message: "details are required",
        status: status.BAD_REQUEST,
      });
    }
  };

  updateUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { originalId } = request.params;
      const userExists = await userRepository.findOneUser({
        originalId,
      });
      if (userExists) {
        const updatedData = Object.assign(JSON.parse(JSON.stringify(userExists)), request.body);
        const result = await userRepository.updateUser({ originalId }, updatedData, {});
        response.send({
          message: "successfully updated user",
          data: result,
          status: status.SUCCESS,
        });
      } else {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "user is not exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller update =>", error);
      return next({
        error: errorMessages.BAD_REQUEST,
        message: "you cannot update user exception",
        status: status.BAD_REQUEST,
      });
    }
  };

  deleteUser = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const { originalId } = request.params;
      const userExists = await userRepository.findOneUser({ originalId });
      if (userExists) {
        await userRepository.deleteUser({ originalId });
        response.send({
          message: "successfully deleted user",
          data: { originalId },
          status: status.SUCCESS,
        });
      } else {
        return next({
          error: errorMessages.BAD_REQUEST,
          message: "user is not exists",
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller delete =>", error);
      return next({
        error: errorMessages.BAD_REQUEST,
        message: "originalId is required",
        status: status.BAD_REQUEST,
      });
    }
  };

  login = async (request: Request, response: Response, next: NextFunction) => {
    try {
      const {
        body: { email, password },
      } = request;
      console.log("valid token request for user", request.body);
      const userExists = await userRepository.findOneUser({ email, deletedAt: null });

      if (userExists) {
        const match = await bcrypt.compare(password, userExists.password);
        if (match) {
          const token = jwt.sign({ data: userExists }, configuration.jwt_secret);
          return response.send({
            message: "Logged in successfully",
            data: { token, user: userExists },
            status: status.SUCCESS,
          });
        } else {
          return response.send({
            message: "email or password is invalid",
            data: userExists,
            status: status.BAD_REQUEST,
          });
        }
      } else {
        return response.send({
          message: "email or password is invalid",
          data: userExists,
          status: status.BAD_REQUEST,
        });
      }
    } catch (error) {
      console.log("CATCH BLOCK : user controller login =>", error);
      return next({
        error: error,
        message: "Internal Server Error",
        status: status.INTERNAL_SERVER_ERROR,
      });
    }
  };
}

export default new UserController();
