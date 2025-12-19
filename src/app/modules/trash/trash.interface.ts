export interface ITrash {
  model: string;
  data: any; // Store the actual deleted record data
  deletedAt: Date;
  expireAt: Date;
}
