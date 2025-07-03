import * as mongoose from "mongoose";

export class CardSchema extends mongoose.Schema {
  constructor(collections: any) {
    const schemaDef = {
      createdAt: { type: Date, default: Date.now },
      deletedAt: { type: Date, default: null },
      originalId: { type: String, required: true },
      title: { type: String, required: true },
      description: { type: String },
      listId: { type: mongoose.Schema.Types.ObjectId, ref: "lists", required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
    };
    super(schemaDef, collections);
  }
}
