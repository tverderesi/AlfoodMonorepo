import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./paginas/Home";
import { ListaRestaurantes } from "./componentes/ListaRestaurantes";
import { AdminRestaurants } from "./componentes/AdminPage";
import { PageLayout } from "./componentes/PageLayout";
import { AddRestaurant } from "./componentes/AdminPage/AddRestaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<ListaRestaurantes />} />
          <Route path="/admin" element={<AdminRestaurants />} />
          <Route path="/admin/add" element={<AddRestaurant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
