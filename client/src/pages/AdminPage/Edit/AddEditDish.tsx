import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { Modal } from "../../../components/Modal";

import { IRestaurant } from "../../../interfaces/IRestaurant";
import styles from "./EditRestaurant.module.scss";

export const AddEditDish = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [state, setState] = useState({
    showModal: false,
    nome: "",
    descricao: "",
    tag: "",
    restaurante: "",
    imagem: null,
  });

  const { showModal, nome, descricao, tag, restaurante, imagem } = state;

  const [tags, setTags] = useState<any[]>([]);
  const [restaurantes, setRestaurantes] = useState<IRestaurant[]>([]);

  useEffect(() => {
    fetchTags();
    fetchRestaurantes();
  }, []);

  const fetchTags = () => {
    axios
      .get<{ tags: any[] }>("http://localhost:8000/api/tags/")
      .then((response) => setTags(response.data.tags))
      .catch((error) => console.error(error));
  };

  const fetchRestaurantes = () => {
    axios
      .get<IRestaurant[]>("http://localhost:8000/api/restaurantes/")
      .then((response) => setRestaurantes(response.data))
      .catch((error) => console.error(error));
  };

  const selecionarArquivo = (evento: any) => {
    if (evento.target.files?.length) {
      setState((prevState) => ({
        ...prevState,
        imagem: evento.target.files[0],
      }));
    } else {
      setState((prevState) => ({ ...prevState, imagem: null }));
    }
  };

  const handleModalClose = () => {
    setState((prevState) => ({ ...prevState, showModal: false }));
    navigate("/admin");
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("descricao", descricao);
    formData.append("tag", tag);
    formData.append("restaurante", restaurante);

    if (imagem) {
      formData.append("imagem", imagem);
    }

    axios({
      method: id ? "put" : "post",
      url: id
        ? `http://localhost:8000/api/v2/pratos/${id}`
        : "http://localhost:8000/api/v2/pratos/",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then(() => {
        setState((prevState) => ({
          ...prevState,
          showModal: true,
          nome: "",
          descricao: "",
          tag: "",
          restaurante: "",
          imagem: null,
        }));
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className={styles.container}>
      <Typography variant="h4" className={styles.title} align="center">
        {id ? "Editar Prato" : "Adicionar Prato"}
      </Typography>
      <form className={styles.formContainer} onSubmit={handleFormSubmit}>
        <TextField
          className={styles.formField}
          label="Nome do Prato"
          variant="outlined"
          value={nome}
          onChange={(e: any) =>
            setState((prevState) => ({ ...prevState, nome: e.target.value }))
          }
        />
        <TextField
          className={styles.formField}
          label="Descrição do Prato"
          variant="outlined"
          value={descricao}
          onChange={(e: any) =>
            setState((prevState) => ({
              ...prevState,
              descricao: e.target.value,
            }))
          }
        />
        <FormControl className={styles.formField} fullWidth>
          <InputLabel id="select-tag">Tag</InputLabel>
          <Select
            labelId="select-tag"
            value={tag}
            onChange={(e: any) =>
              setState((prevState) => ({ ...prevState, tag: e.target.value }))
            }
          >
            {tags.map((tag) => (
              <MenuItem key={tag.id} value={tag.value}>
                {tag.value}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <input type="file" onChange={selecionarArquivo} />

        <Button
          className={styles.submitButton}
          type="submit"
          variant="contained"
        >
          Salvar
        </Button>
      </form>
      {showModal && (
        <Modal>
          <div className={styles.modalContent}>
            <p>Prato cadastrado com sucesso!</p>
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
