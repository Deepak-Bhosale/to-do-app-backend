export interface IListModel {
  _id?: string;
  createdAt: Date;
  deletedAt?: Date | null;
  originalId: string;
  title: string;
  userId: string;
}
