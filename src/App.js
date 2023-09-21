import Login from "./component/Auth/Login/Login";
import Registration from "./component/Auth/Registration/Registration";
import NewsLetter from "./component/NewsLetter/NewsLetter";
import PromoBanner from "./component/PromoBanner/PromoBanner";
import UplodeImage from "./component/UplodeImage/UplodeImage";
import { BrowserRouter, Routes, Route} from 'react-router-dom'

function App() {
  return (
    <div className="App">
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
