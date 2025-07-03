export interface ICardModel {
  _id?: string;
  createdAt: Date;
  deletedAt?: Date | null;
  originalId: string;
  title: string;
  description?: string;
  listId: string;
  userId: string;
}
