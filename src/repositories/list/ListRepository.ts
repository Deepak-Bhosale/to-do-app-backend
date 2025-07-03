import * as mongoose from "mongoose";
import { listModel } from "./ListModel";
import { IListModel } from "./IListModel";

class ListRepository {
  private LIST: mongoose.Model<IListModel>;

  constructor(model: mongoose.Model<IListModel>) {
    this.LIST = model;
  }

  public async getListsByUserId(userId: mongoose.Types.ObjectId) {
    return this.LIST.find({ userId, deletedAt: null });
  }

  public async getListsWithCardsByUserId(userId: mongoose.Types.ObjectId) {
    return this.LIST.aggregate([
      { $match: { userId, deletedAt: null } },
      {
        $lookup: {
          from: "cards",
          localField: "_id",
          foreignField: "listId",
          as: "cards",
          pipeline: [
            { $match: { deletedAt: null } },
            {
              $project: {
                _id: 1,
                title: 1,
                description: 1,
                createdAt: 1,
                updatedAt: 1,
                listId: 1,
                deletedAt: 1,
              },
            },
          ],
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          userId: 1,
          createdAt: 1,
          updatedAt: 1,
          deletedAt: 1,
          originalId: 1,
          cards: 1,
        },
      },
    ]);
  }

  public async createList(data: Partial<IListModel>) {
    return new this.LIST(data).save();
  }

  public async findListByIdAndUser(id: string, userId: string) {
    return this.LIST.findOne({ _id: id, userId, deletedAt: null });
  }

  public async updateList(id: string, userId: string, updateData: Partial<IListModel>) {
    return this.LIST.findOneAndUpdate({ _id: id, userId, deletedAt: null }, updateData, { new: true });
  }

  public async deleteList(id: string, userId: string) {
    return this.LIST.findOneAndUpdate({ _id: id, userId, deletedAt: null }, { deletedAt: new Date() }, { new: true });
  }
}

export const listRepository = new ListRepository(listModel);
