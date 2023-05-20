import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  TableContainer,
  TableRow,
  TableCell,
  Typography,
  Table,
  TableBody,
  Fab,
  Paper,
} from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditRestaurant.module.scss";
import { Modal } from "../../../components/Modal";
import { IDish } from "../../../interfaces/IDish";
import { Link } from "react-router-dom";

export const EditRestaurant = () => {
  //Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    showModal: false,
    nomeRestaurante: "",
    pratos: [] as IDish[],
  });

  const { showModal, nomeRestaurante } = state;

  //Fetch data from API
  useEffect(() => {
    fetch(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then((response) => response.json())
      .then((data) => setState({ ...state, nomeRestaurante: data.nome }));
    fetch(`http://localhost:8000/api/v1/restaurantes/${id}/pratos/`)
      .then((response) => response.json())
      .then((data) => setState({ ...state, pratos: data }));
  }, []);

  //Navigate back to admin page
  const handleModalClose = () => {
    setState({ ...state, showModal: false });
    navigate(`/admin/edit/${id}`);
  };

  //Handle form submit
  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    axios
      .put(`http://localhost:8000/api/v2/restaurantes/${id}/`, {
        id: id,
        nome: nomeRestaurante,
      })
      .then(() => {
        setState({ ...state, showModal: true, nomeRestaurante: "" });
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Fab
        variant="extended"
        component={Link}
        size="large"
        color="primary"
        aria-label="add"
        to="/admin/add"
        className={styles.addDishButton}
      >
        <span className="material-symbols-outlined">add_circle</span>
        Novo Prato
      </Fab>
      <Typography variant="h4" className={styles.title} textAlign="center">
        Editar restaurante
      </Typography>
      <form className={styles.formContainer} onSubmit={handleFormSubmit}>
        <TextField
          className={styles.formField}
          label="Nome do restaurante"
          variant="outlined"
          value={nomeRestaurante}
          onChange={(e: any) =>
            setState({ ...state, nomeRestaurante: e.target.value })
          }
        />
        <Button
          className={styles.submitButton}
          type="submit"
          variant="contained"
        >
          Salvar
        </Button>
      </form>

      <Typography
        variant="h4"
        align="center"
        padding="1rem"
        className={styles.title}
      >
        Pratos
      </Typography>
      <TableContainer component={Paper} className={styles.restaurantsTable}>
        <Table>
          <TableBody>
            {state.pratos.map((prato) => (
              <TableRow key={prato.id}>
                <TableCell>{prato.nome}</TableCell>
                <TableCell width="6">
                  <Link to={`/admin/edit/prato/${prato.id}`}>
                    <span className="material-symbols-outlined">edit</span>
                  </Link>
                </TableCell>
                <TableCell width="6">
                  <Button onClick={() => {}}>
                    <span className="material-symbols-outlined">delete</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showModal && (
        <Modal>
          <div className={styles.modalContent}>
            <p>Restaurante cadastrado com sucesso!</p>
            <Button
              className={styles.modalButton}
              variant="outlined"
              onClick={handleModalClose}
            >
              OK
            </Button>
          </div>
        </Modal>
      )}
    </div>
  );
};
