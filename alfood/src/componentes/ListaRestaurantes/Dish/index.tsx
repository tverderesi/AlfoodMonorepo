import { IDish } from "../../../interfaces/IDish";
import estilos from "./dish.module.scss";

export const Dish = ({ dish }: { dish: IDish }) => {
  return (
    <div className={estilos.dish}>
      <div className={estilos.Container}>
        <div>
          <div className={estilos.TorsionEffect}>
            <img src={dish.imagem} alt={dish.descricao} />
          </div>
        </div>
      </div>
      <div className={estilos.Content}>
        <h3>{dish.nome}</h3>
        <div className={estilos.Tag}>{dish.tag}</div>
        <div>{dish.descricao}</div>
      </div>
    </div>
  );
};
