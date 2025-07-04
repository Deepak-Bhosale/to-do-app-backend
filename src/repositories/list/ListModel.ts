import * as mongoose from "mongoose";
import { ListSchema } from "./ListSchema";
import { IListModel } from "./IListModel";

export const listSchema = new ListSchema({ collection: "lists", versionKey: false });
export const listModel: mongoose.Model<IListModel> = mongoose.model<IListModel>("lists", listSchema);

// listModel.collection.createIndex({ title: 1 });
