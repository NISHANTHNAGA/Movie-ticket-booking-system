import { BrowserRouter, Routes, Route } from "react-router-dom";


import Register from "./pages/Register/Register";
import Movies from "./pages/Movies/Movies";
import Login from "./pages/Login/Login";
import MovieDetails from './pages/MovieDetails/MovieDetails';
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Theatres from "./pages/Theatres/Theatres";
import Shows from "./pages/Shows/Shows";
import SeatSelection from "./pages/SeatSelection/SeatSelection";
import Booking from "./pages/Booking/Booking";
import MyBookings from "./pages/MyBookings/MyBookings";
import Admin from "./pages/Admin/Admin";
import AdminMovies from "./pages/AdminMovies/AdminMovies";
import AddMovie from "./pages/Admin/AddMovie/AddMovie";
import EditMovie from "./pages/Admin/EditMovie/EditMovie";
import AdminUsers from "./pages/AdminUsers/AdminUsers";
import AdminTheatres from "./pages/AdminTheatres/AdminTheatres";
import AddTheatre from "./pages/AdminTheatres/AddTheatre/AddTheatre";
import EditTheatre from "./pages/AdminTheatres/EditTheatre/EditTheatre";
import ManageTheatreMovies from "./pages/AdminTheatres/ManageTheatresMovies/ManageTheatreMovies";
import AdminShows from "./pages/AdminShows/AdminShows";
import AddShow from "./pages/AdminShows/AddShow/AddShow";
import EditShow from "./pages/AdminShows/EditShow/EditShow";
import ETicket from "./pages/ETicket/ETicket";
import VerifyTicket  from "./pages/VerifyTicket/VerifyTicket";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="movies/:id" element={<ProtectedRoute>
          <MovieDetails /></ProtectedRoute>} />
        <Route path="/movies/:id/theatres" element={
          <ProtectedRoute><Theatres /></ProtectedRoute>} />

        <Route path="/movies/:id/shows/:theatreId"
          element={<ProtectedRoute><Shows /></ProtectedRoute>} />

        <Route
          path="/booking/:showId/seats"
          element={<ProtectedRoute><SeatSelection /></ProtectedRoute>} />

        <Route
          path="/booking/:showId"
          element={
            <ProtectedRoute><Booking /></ProtectedRoute>} />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <Admin />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/movies"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminMovies />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/movies/add"
          element={<AddMovie />}
        />


        <Route
          path="/admin/movies/edit/:movieId"
          element={<EditMovie />}
        />

        <Route
          path="/admin/users"
          element={<AdminUsers />}
        />


        <Route
          path="/admin/theatres"
          element={<AdminTheatres />}
        />

        <Route
          path="/admin/theatres/add"
          element={<AddTheatre />}
        />

        <Route
          path="/admin/theatres/edit/:theatreId"
          element={<EditTheatre />}
        />

        <Route
          path="/admin/theatres/movies/:theatreId"
          element={<ManageTheatreMovies />}
        />

        <Route
          path="/admin/shows"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AdminShows />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/shows/add"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <AddShow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin/shows/edit/:showId"
          element={
            <ProtectedRoute allowedRoles={["ADMIN"]}>
              <EditShow />
            </ProtectedRoute>
          }
        />

        <Route
          path="/e-ticket"
          element={
            <ProtectedRoute>
              <ETicket />
            </ProtectedRoute>
          }
        />

        <Route
          path="/verify-ticket/:ticketCode"
          element={<VerifyTicket />}
        />


      </Routes>
    </BrowserRouter>
  );
}

export default App;
