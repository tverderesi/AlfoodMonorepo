import React from "react";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Fab,
} from "@mui/material";

import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { IRestaurant } from "../../interfaces/IRestaurant";

export const AdminRestaurants = () => {
  const [restaurants, setRestaurants] = React.useState<IRestaurant[]>([]);

  React.useEffect(() => {
    fetch("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => response.json())
      .then((data) => setRestaurants(data));
  }, []);

  return (
    <div className={styles.adminRestaurantsContainer}>
      <Fab
        variant="extended"
        component={Link}
        to="/admin/add"
        TouchRippleProps={{ style: { color: "white" } }}
        color="primary"
        className={styles.addRestaurantButton}
      >
        <span className="material-symbols-outlined">add_circle</span>
      </Fab>
      <TableContainer component={Paper} className={styles.restaurantsTable}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Edit</TableCell> {/* New TableCell for Edit */}
            </TableRow>
          </TableHead>
          <TableBody>
            {restaurants.map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.nome}</TableCell>
                <TableCell>
                  <Link to={`/admin/edit/${restaurant.id}`}>Editar</Link>
                </TableCell>{" "}
                {/* Render Edit link */}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
