import { IDish } from "./IDish";

export interface IRestaurant {
  id: number;
  nome: string;
  pratos: IDish[];
}
