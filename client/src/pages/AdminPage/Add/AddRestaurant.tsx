import { useState } from "react";
import { TextField, Button } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./AddRestaurant.module.scss";
import { Modal } from "../../../components/Modal";

export const AddRestaurant = () => {
  const [nomeRestaurante, setNomeRestaurante] = useState("");
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleFormSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    axios
      .post("http://localhost:8000/api/v2/restaurantes/", {
        nome: nomeRestaurante,
      })
      .then(() => {
        setShowModal(true);
        setNomeRestaurante("");
      })
      .catch((error) => console.error(error));
  };

  const handleModalClose = () => {
    setShowModal(false);
    navigate("/admin");
  };

  return (
    <>
      <h1>Adicionar Novo Restaurante</h1>
      <form className={styles.formContainer} onSubmit={handleFormSubmit}>
        <TextField
          className={styles.formField}
          label="Nome do restaurante"
          variant="outlined"
          value={nomeRestaurante}
          onChange={(evento) => setNomeRestaurante(evento.target.value)}
        />
        <Button
          className={styles.submitButton}
          type="submit"
          variant="outlined"
        >
          Salvar
        </Button>
      </form>
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
