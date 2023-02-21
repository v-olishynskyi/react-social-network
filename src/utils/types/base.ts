export type InputChangeEvent = React.ChangeEvent<HTMLInputElement>;

export interface User {
  id: number;
  fullname: string;
  first_name: string;
  last_name: string;
  username?: string;
  email: string;
  address?: Address;
  phone?: string;
  website?: string;
  company?: Company;
  avatar?: string;
}

export interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
}

export interface Geo {
  lat: string;
  lng: string;
}

export interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

export type ApiError = {
  message: string;
  code?: number;
};
