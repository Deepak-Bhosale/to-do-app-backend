import * as mongoose from "mongoose";
import { cardModel } from "./CardModel";
import { ICardModel } from "./ICardModel";

class CardRepository {
  private CARD: mongoose.Model<ICardModel>;

  constructor(model: mongoose.Model<ICardModel>) {
    this.CARD = model;
  }

  public async createCard(data: Partial<ICardModel>) {
    return new this.CARD(data).save();
  }

  public async findCardByIdAndUser(id: string, userId: string) {
    return this.CARD.findOne({ _id: id, userId, deletedAt: null });
  }

  public async updateCard(id: string, userId: string, updateData: Partial<ICardModel>) {
    return this.CARD.findOneAndUpdate({ _id: id, userId, deletedAt: null }, updateData, { new: true });
  }

  public async deleteCard(id: string, userId: string) {
    return this.CARD.findOneAndUpdate({ _id: id, userId, deletedAt: null }, { deletedAt: new Date() }, { new: true });
  }
}

export const cardRepository = new CardRepository(cardModel);
