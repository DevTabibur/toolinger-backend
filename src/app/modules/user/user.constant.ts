export enum USER_ROLE_ENUM {
  CAR_OWNER = 'car_owner',
  MECHANIC = 'mechanic',
}

export enum USER_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
  BANNED = 'banned',
  BLOCKED = 'blocked',
}

export const USER_ROLE_ARRAY: string[] = Object.values(USER_ROLE_ENUM)

export const USER_SEARCH_FIELDS = ['name', 'email', 'phone']
export const USER_FILTER_FIELDS = ['role', 'isVerified']


export const CAR_OWNER_FILTER_FIELDS = ['name', 'createdAt']
export const CAR_OWNER_SEARCH__FIELDS = ['name', 'createdAt']


export const MECHANIC_FILTER_FIELDS = ['name', 'createdAt']
export const MECHANIC_SEARCH__FIELDS = ['name', 'createdAt']


export type ICarOwnerFilters = {
  searchTerm?: string
}
export type IMechanicFilters = {
  searchTerm?: string
}
