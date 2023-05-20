import { Link } from "react-router-dom";
import { Typography, Grid, Card, CardContent } from "@mui/material";
import { Banner } from "../../components/Banner";
import styles from "./Home.module.scss";

export function Home() {
  return (
    <>
      <Banner />
      <div className={styles.MiniBanners}>
        <img src="/imagens/cozinhar_01.jpg" alt="Um prato conceitual" />

        <Card className={styles.CentralCard}>
          <CardContent>
            <Typography variant="h4">A melhor rede de restaurantes!</Typography>
            <div>
              <Typography variant="body1">seja um parceiro agora:</Typography>
              <Typography variant="body1">
                ligue para{" "}
                <a href="callto:99999999999" className={styles.PhoneLink}>
                  (99) 99999-999
                </a>
              </Typography>
            </div>
          </CardContent>
        </Card>

        <img src="/imagens/cozinhar_02.jpg" alt="Um hambúrguer desconstruído" />
      </div>
      <Grid
        container
        spacing={2}
        className={styles.Categories}
        justifyContent="center"
        alignItems="center"
      >
        <Grid item xs={6} sm={3} className={styles.DishType}>
          <img src="/imagens/cafedamanha.png" alt="Café da manhã" />
          <Typography variant="h4">Café da manhã</Typography>
        </Grid>
        <Grid item xs={6} sm={3} className={styles.DishType}>
          <img src="/imagens/almoco.png" alt="Almoço" />
          <Typography variant="h4">Almoço</Typography>
        </Grid>
        <Grid item xs={6} sm={3} className={styles.DishType}>
          <img src="/imagens/jantar.png" alt="Jantar" />
          <Typography variant="h4">Jantar</Typography>
        </Grid>
        <Grid item xs={6} sm={3} className={styles.DishType}>
          <img src="/imagens/sobremesa.png" alt="Sobremesas" />
          <Typography variant="h4">Sobremesas</Typography>
        </Grid>
      </Grid>
      <div className={styles.LinkContainer}>
        <Typography
          variant="h4"
          component={Link}
          to="/restaurantes"
          className={styles.Links}
        >
          Conheça os melhores restaurantes
        </Typography>
      </div>
    </>
  );
}
