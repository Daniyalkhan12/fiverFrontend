import AdminDashboard from "./component/Admin-Dashboard/AdminDashboard";
import Login from "./component/Auth/Login/Login";
import Registration from "./component/Auth/Registration/Registration";
import ListingPage from "./component/ListingPage/ListingPage";
import NavBar from "./component/NavBar/NavBar";
import NewsLetter from "./component/NewsLetter/NewsLetter";
import PromoBanner from "./component/PromoBanner/PromoBanner";
import UplodeImage from "./component/UplodeImage/UplodeImage";
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import { lazy } from "react";
// const AdminDashboard = lazy(() => import("./component/Admin-Dashboard/AdminDashboard"));
// const Login = lazy(() => import("./component/Auth/Login/Login"));
// const Registration = lazy(() => import("./component/Auth/Registration/Registration"));
// const ListingPage = lazy(() => import("./component/ListingPage/ListingPage"));
// const NavBar = lazy(() => import("./component/NavBar/NavBar"));

function App() {
  // console.log(localStorage.getItem("username"))
  // const isAuthenticated = localStorage.getItem("username") === "superadmin";
  // const isLoggedIn = localStorage.getItem("username");
  return (

    <div className="App">
      <NavBar/>
      <Routes>
        <Route 
          path="/" 
          element={localStorage.getItem("username") ? <Navigate to="/listingPage" /> : <Login/>} 
        />
        <Route 
          path="/registration" 
          element={<Registration />} 
        />
        <Route 
          path="/uploadImage" 
          element={localStorage.getItem("username") ? <UplodeImage/> : <Navigate to="/" />} 
        />
         <Route 
          path="/listingPage" 
          element={localStorage.getItem("username") ? <ListingPage/> : <Navigate to="/" />} 
        />
        <Route 
          exact
          path="/admindashboard" 
          element={localStorage.getItem("username") === "superadmin" ? <AdminDashboard/> : <Navigate to="/" />} 
        />
      </Routes>
      {/* <PromoBanner/> */}
      {/* <Login/> */}
      {/* <NewsLetter/>
      <Registration/>*/ }
      {/* <UplodeImage/> */}
    </div>
  );
}

export default App;
