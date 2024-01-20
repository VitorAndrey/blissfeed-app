export interface User {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  profile_img: string | null;
  phone_number: string | null;
  birth_date: Date | null;
  created_at: Date;
  updated_at: Date;
}

export interface CreateUser {
  id?: string;
  name: string;
  email: string;
  password: string;
  profile_img?: string | null;
  phone_number?: string | null;
  birth_date?: Date | string | null;
}

export interface UpdateUser {
  id?: string;
  name?: string;
  email?: string;
  old_password?: string;
  new_password?: string;
  profile_img?: string | null;
  phone_number?: string | null;
  birth_date?: Date | string | null;
}
