import { useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";
import { httpv1 } from "../../http";
import { IPagination } from "../../interfaces/IPagination";
import { IRestaurant } from "../../interfaces/IRestaurant";
import { Restaurant } from "./Restaurant";
import style from "./RestaurantsList.module.scss";

export const RestaurantList = () => {
  const [state, setState] = useState({
    restaurants: [] as IRestaurant[],
    errors: [] as string[],
    nextPage: null as string | null,
  });

  const { restaurants, nextPage, errors } = state;

  const handleErrors = (err: Error | string) => {
    const errorMessage = err instanceof Error ? err.message : String(err);
    setState((prevState) => ({ ...prevState, errors: [errorMessage] }));
  };

  useEffect(() => {
    getRestaurants();
  }, []);

  const getRestaurants = async () => {
    try {
      const res = await httpv1.get<IPagination<IRestaurant>>("restaurantes/");
      const { results, next } = res.data;
      setState((prevState) => ({
        ...prevState,
        restaurants: results,
        nextPage: next,
      }));
    } catch (err: any) {
      handleErrors(err);
    }
  };

  const filterRestaurants = (
    prevRestaurants: IRestaurant[],
    results: IRestaurant[]
  ) => {
    const newRestaurants = results.filter(
      (restaurant) =>
        !prevRestaurants.some(
          (prevRestaurant) => prevRestaurant.id === restaurant.id
        )
    );
    return [...prevRestaurants, ...newRestaurants];
  };

  const loadMoreRestaurants = async () => {
    try {
      if (nextPage) {
        const res = await httpv1.get<IPagination<IRestaurant>>(nextPage);
        const { results, next } = res.data;
        setState((prevState) => ({
          ...prevState,
          restaurants: filterRestaurants(restaurants, results),
          nextPage: next,
        }));
      }
    } catch (err: any) {
      handleErrors(err);
    }
  };

  return (
    <Container component="section" className={style.RestaurantList}>
      <Typography variant="h4" component="h1">
        The <em>coolest</em> Restaurants!
      </Typography>
      {errors.length > 0 && (
        <Typography variant="subtitle1" color="error" className={style.Error}>
          {errors[0]}
        </Typography>
      )}
      {restaurants?.map((item) => (
        <Restaurant restaurant={item} key={item.id} />
      ))}
      {nextPage && (
        <Container className={style.LoadMoreContainer}>
          <Button
            onClick={loadMoreRestaurants}
            variant="contained"
            className={style.LoadMoreButton}
          >
            Load More
          </Button>
          <Outlet />
        </Container>
      )}
    </Container>
  );
};
