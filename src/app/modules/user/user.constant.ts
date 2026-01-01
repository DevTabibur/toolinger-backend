export enum USER_ROLE_ENUM {
  ADMIN = "admin",
  GUEST = "guest",
  EDITOR = "editor",
}

export enum USER_STATUS {
  ACTIVE = "active",
  INACTIVE = "inactive",
  BANNED = "banned",
  BLOCKED = "blocked",
}

export const USER_ROLE_ARRAY: string[] = Object.values(USER_ROLE_ENUM);

export const USER_SEARCH_FIELDS = ["firstName", "lastName", "email", "phoneNo"];
export const USER_FILTER_FIELDS = ["role", "status"];

export type IUserFilters = {
  searchTerm?: string;
};
