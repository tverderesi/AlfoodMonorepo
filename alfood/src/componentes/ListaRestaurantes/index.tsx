import style from "./RestaurantsList.module.scss";
import { Restaurant } from "./Restaurant";
import { useEffect, useState } from "react";
import axios from "axios";
import { IPagination } from "../../interfaces/IPagination";
import { IRestaurant } from "../../interfaces/IRestaurant";
import { Button, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
export const ListaRestaurantes = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);

  useEffect(() => {
    obterRestaurantes();
  }, []);

  const obterRestaurantes = async () => {
    try {
      const response = await axios.get<IPagination<IRestaurant>>(
        "http://localhost:8000/api/v1/restaurantes/"
      );
      setRestaurants(response.data.results);
      setNextPage(response.data.next);
    } catch (error) {
      console.log(error);
    }
  };

  const loadMoreRestaurants = async () => {
    try {
      if (nextPage) {
        const response = await axios.get<IPagination<IRestaurant>>(nextPage);
        setRestaurants((prevRestaurants) => {
          const newRestaurants = response.data.results.filter(
            (restaurant) =>
              !prevRestaurants.some(
                (prevRestaurant) => prevRestaurant.id === restaurant.id
              )
          );
          return [...prevRestaurants, ...newRestaurants];
        });
        setNextPage(response.data.next);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className={style.RestaurantList}>
      <h1>
        The <em>coolest</em> Restaurants!
      </h1>
      {restaurants?.map((item) => (
        <Restaurant restaurant={item} key={item.id} />
      ))}
      {nextPage && (
        <Container
          style={{
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <Button
            onClick={loadMoreRestaurants}
            variant="contained"
            style={{
              padding: ".5rem 1rem",
              width: "25%",
            }}
          >
            Load More
          </Button>
          <Outlet />
        </Container>
      )}
    </section>
  );
};
