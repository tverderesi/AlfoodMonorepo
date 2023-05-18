import { IRestaurant } from "../../../interfaces/IRestaurant";
import { Dish } from "../Dish";
import styles from "./Restaurant.module.scss";

export const Restaurant = ({ restaurant }: { restaurant: IRestaurant }) => {
  return (
    <section className={styles.Restaurant}>
      <div className={styles.Title}>
        <h2>{restaurant.nome}</h2>
      </div>
      <div>
        {restaurant.pratos?.map((item) => (
          <Dish dish={item} key={item.id} />
        ))}
      </div>
    </section>
  );
};
