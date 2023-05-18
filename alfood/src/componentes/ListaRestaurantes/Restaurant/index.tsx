import { IRestaurant } from "../../../interfaces/IRestaurant";
import { Dish } from "../Dish";
import styles from "./Restaurant.module.scss";
import { IDish } from "../../../interfaces/IDish";
import { useEffect, useState } from "react";
import axios from "axios";

export const Restaurant = ({ restaurant }: { restaurant: IRestaurant }) => {
  const [dishes, setDishes] = useState<IDish[]>([]);

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/v1/restaurantes/${restaurant.id}/pratos/`)
      .then((response) => {
        console.log(response.data);
        setDishes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <section className={styles.Restaurant}>
      <div className={styles.Title}>
        <h2>{restaurant.nome}</h2>
      </div>
      <div>
        {dishes?.map((item) => (
          <Dish dish={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
