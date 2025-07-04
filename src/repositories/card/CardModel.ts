import * as mongoose from "mongoose";
import { CardSchema } from "./CardSchema";
import { ICardModel } from "./ICardModel";

export const cardSchema = new CardSchema({ collection: "cards", versionKey: false });
export const cardModel: mongoose.Model<ICardModel> = mongoose.model<ICardModel>("cards", cardSchema);

cardModel.collection.createIndex({ title: 1 });
