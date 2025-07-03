import mongoose from "mongoose";
import { userModel } from "./UserModel";
import { IUserModel } from "./IUserModel";

class UserRepository {
  private USER: any;
  constructor(model: any) {
    this.USER = model;
  }

  public async countUsers(query = {}) {
    try {
      return await userModel.countDocuments({
        deletedAt: null,
        ...query,
      });
    } catch (error) {
      console.log("CATCH BLOCK : User Repository countUsers =>", error);
    }
  }

  public async getAllUsers(query?: mongoose.FilterQuery<IUserModel>, projection?: any, options?: mongoose.QueryOptions) {
    try {
      return await userModel.find(
        {
          deletedAt: null,
          ...query,
        },
        {
          _id: 0,
          deletedAt: 0,
          ...projection,
        },
        options
      );
    } catch (error) {
      console.log("CATCH BLOCK : User Repository getAllUsers =>", error);
    }
  }

  public async findOneUser(query: mongoose.FilterQuery<IUserModel>, projection?: any) {
    try {
      return await userModel.findOne(query, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository findOneUser =>", error);
    }
  }

  public async createUser(data: any, projection: any) {
    try {
      console.log("Repository: created", data);
      const id = new mongoose.Types.ObjectId();
      return new userModel(
        {
          originalId: data.originalId || id,
          ...data,
          _id: id,
        },
        {
          _id: 0,
          ...projection,
        }
      ).save();
    } catch (error) {
      console.log("CATCH BLOCK : User Repository createUser =>", error);
    }
  }

  public async updateUser(query: mongoose.FilterQuery<any>, data: mongoose.FilterQuery<IUserModel[]>, projection: any) {
    try {
      console.log(": Updated Data :", data);
      await userModel.updateOne({ deletedAt: null, ...query }, { deletedAt: new Date() });
      return await this.createUser({ ...data, deletedAt: null }, projection);
    } catch (error) {
      console.log("CATCH BLOCK : User Repository update =>", error);
    }
  }

  public async deleteUser(query: mongoose.FilterQuery<IUserModel>) {
    try {
      return await userModel.updateOne({ deletedAt: null, ...query }, { deletedAt: new Date() }).lean();
    } catch (error) {
      console.log("CATCH BLOCK : User Repository delete =>", error);
    }
  }
}

export const userRepository = new UserRepository(userModel);
