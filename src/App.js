import AdminDashboard from "./component/Admin-Dashboard/AdminDashboard";
import Login from "./component/Auth/Login/Login";
import Registration from "./component/Auth/Registration/Registration";
import ListingPage from "./component/ListingPage/ListingPage";
import NavBar from "./component/NavBar/NavBar";
import NewsLetter from "./component/NewsLetter/NewsLetter";
import PromoBanner from "./component/PromoBanner/PromoBanner";
import UplodeImage from "./component/UplodeImage/UplodeImage";
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  const products = [
    {
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },{
      name: 'Product 1',
      imageUrl: 'alexas_fotos-DmuqS6KTf6M-unsplash.jpg',
      price: 49.99,
    },]
  return (

    <div className="App">
      <NavBar/>
      <Routes>
        <Route 
          path="/" 
          element={<Login />} 
        />
        <Route 
          path="/registration" 
          element={<Registration />} 
        />
        <Route 
          path="/uploadImage" 
          element={<UplodeImage />} 
        />
         <Route 
          path="/listingPage" 
          element={<ListingPage products={products}/>} 
        />
        <Route 
          path="/admindashboard" 
          element={<AdminDashboard/>} 
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
