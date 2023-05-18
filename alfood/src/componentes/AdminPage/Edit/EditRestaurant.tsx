import { useState, useEffect } from "react";
import { TextField, Button, Container } from "@mui/material";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./EditRestaurant.module.scss";
import { Modal } from "../../Modal";
export const EditRestaurant = () => {
  //Hooks
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [nomeRestaurante, setNomeRestaurante] = useState("");

  //Fetch data from API
  useEffect(() => {
    fetch(`http://localhost:8000/api/v2/restaurantes/${id}/`)
      .then((response) => response.json())
      .then((data) => setNomeRestaurante(data.nome));
  }, []);

  //Navigate back to admin page
  const handleModalClose = () => {
    setShowModal(false);
    navigate("/admin");
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
        setShowModal(true);
        setNomeRestaurante("");
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      <Container>
        <h1>Editar Restaurante</h1>
        <form className={styles.formContainer} onSubmit={handleFormSubmit}>
          <TextField
            className={styles.formField}
            label="Nome do restaurante"
            variant="outlined"
            value={nomeRestaurante}
            onChange={(e: any) => setNomeRestaurante(e.target.value)}
          />
          <Button
            className={styles.submitButton}
            type="submit"
            variant="contained"
          >
            Salvar
          </Button>
        </form>
      </Container>
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
    </>
  );
};
