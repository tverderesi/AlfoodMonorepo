import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./paginas/Home";
import { ListaRestaurantes } from "./componentes/ListaRestaurantes";
import { AdminRestaurants } from "./componentes/AdminPage";
import { PageLayout } from "./componentes/PageLayout";
import { AddRestaurant } from "./componentes/AdminPage/Add/AddRestaurant";
import { EditRestaurant } from "./componentes/AdminPage/Edit/EditRestaurant";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<ListaRestaurantes />} />
          <Route path="/admin" element={<AdminRestaurants />} />
          <Route path="/admin/add" element={<AddRestaurant />} />
          <Route path="/admin/edit/:id" element={<EditRestaurant />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
