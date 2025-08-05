export interface IContactMail {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export type IContactFilters = {
  searchTerm?: string;
};
