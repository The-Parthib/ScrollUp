import ProtectedRoutes from "@/components/ProtectedRoutes/ProtectedRoute";
import Error from "@/pages/Error";
import Home from "@/pages/Home";
import Login from "@/pages/Login/Login";
import MyPhotos from "@/pages/myPhotos";
import CreatePost from "@/pages/Post/CreatePost";
import Profile from "@/pages/Profile";
import Signup from "@/pages/Signup/Signup";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/login" element={<Login />} errorElement={<Error />} />
      <Route path="/signup" element={<Signup />} errorElement={<Error />} />

      <Route path="/" element={<ProtectedRoutes />} errorElement={<Error />}>
        <Route path="" element={<Home />} errorElement={<Error />} />
        <Route path="profile" element={<Profile />} errorElement={<Error />} />
        <Route
          path="/my-photos"
          element={<MyPhotos />}
          errorElement={<Error />}
        />
        <Route
          path="create-post"
          element={<CreatePost />}
          errorElement={<Error />}
        />
      </Route>
    </>
  )
);

export default router;
