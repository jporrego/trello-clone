export interface User {
  id: string | null;
  name: string | null;
  email: string | null;
  picture: string | null;
}

export interface Board {
  id: string;
  title: string;
  bgImg: string;
  bgColor: string;
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
