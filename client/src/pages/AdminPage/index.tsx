import React from "react";
import {
  Button,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  Fab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { IRestaurant } from "../../interfaces/IRestaurant";

export const AdminRestaurants = () => {
  const [state, setState] = React.useState({
    showModal: false,
    showErrorModal: false,
    restaurantId: 0,
    restaurants: [] as IRestaurant[],
    hidden: true,
  });

  const handleShowModal = (id: number) => {
    setState({ ...state, showModal: true, restaurantId: id });
  };

  React.useEffect(() => {
    fetch("http://localhost:8000/api/v2/restaurantes/")
      .then((response) => response.json())
      .then((data) => setState({ ...state, restaurants: data }));
  }, []);

  const handleModalClose = () => {
    setState({ ...state, showModal: false, showErrorModal: false });
  };

  const handleDeleteRestaurant = (e: React.SyntheticEvent, id: number) => {
    axios
      .delete(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then((response) => {
        console.log("Deletion successful");
        console.log(response);
        setState({
          ...state,
          showModal: false,
          showErrorModal: false,
          restaurants: state.restaurants.filter(
            (restaurant) => restaurant.id !== id
          ),
        });
      })
      .catch((error) => {
        console.error("An error occurred during deletion:", error);
        setState({ ...state, showModal: false, showErrorModal: true });
      });
  };

  return (
    <>
      <div className={styles.adminRestaurantsContainer}>
        <Fab
          variant="extended"
          component={Link}
          size="large"
          color="primary"
          aria-label="add"
          to="/admin/add"
          className={styles.addRestaurantButton}
        >
          <span className="material-symbols-outlined">add_circle</span>
          Novo restaurante
        </Fab>
        <Typography
          variant="h4"
          align="center"
          padding="1rem"
          className={styles.title}
        >
          Restaurantes
        </Typography>
        <TableContainer component={Paper} className={styles.restaurantsTable}>
          <Table>
            <TableBody>
              {state.restaurants.map((restaurant) => (
                <TableRow key={restaurant.id}>
                  <TableCell>{restaurant.nome}</TableCell>
                  <TableCell width="6">
                    <Link to={`/admin/edit/${restaurant.id}`}>
                      <span className="material-symbols-outlined">edit</span>
                    </Link>
                  </TableCell>
                  <TableCell width="6">
                    <Button onClick={() => handleShowModal(restaurant.id)}>
                      <span className="material-symbols-outlined">delete</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <div>
        <Dialog
          open={state.showModal}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Deletar Restaurante"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja excluir o restaurante?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Cancelar</Button>
            <Button
              onClick={(e) => {
                handleDeleteRestaurant(e, state.restaurantId);
              }}
            >
              Deletar
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={state.showErrorModal}
          onClose={handleModalClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Erro ao deletar restaurante"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Ocorreu um erro durante a exclusão do restaurante. Por favor,
              tente novamente mais tarde.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleModalClose}>Fechar</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};
