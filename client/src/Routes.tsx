import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { RestaurantList } from "./components/RestaurantList";
import { AdminRestaurants } from "./pages/AdminPage";
import { PageLayout } from "./components/PageLayout";
import { AddRestaurant } from "./pages/AdminPage/Add/AddRestaurant";
import { EditRestaurant } from "./pages/AdminPage/Edit/EditRestaurant";
import { AddEditDish } from "./pages/AdminPage/Edit/AddEditDish";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PageLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/restaurantes" element={<RestaurantList />} />
          <Route path="/admin" element={<AdminRestaurants />} />
          <Route path="/admin/add" element={<AddRestaurant />} />
          <Route path="/admin/edit/:id" element={<EditRestaurant />} />
          <Route path="*" element={<h1>Not Found</h1>} />
          <Route path="/admin/edit/prato/:id" element={<AddEditDish />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
