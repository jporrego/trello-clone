export interface User {
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface Board {
  id: string;
  name: string;
}

export interface List {
  id: string;
  name: string;
}

export interface Card {
  id: string;
  list_id: string;
  name: string;
  description: string;
}
