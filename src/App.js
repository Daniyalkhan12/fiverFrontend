import Login from "./component/Auth/Login/Login";
import Registration from "./component/Auth/Registration/Registration";
import NewsLetter from "./component/NewsLetter/NewsLetter";
import PromoBanner from "./component/PromoBanner/PromoBanner";
import UplodeImage from "./component/UplodeImage/UplodeImage";

function App() {
  return (
    <div className="App">
      {/* <PromoBanner/> */}
      {/* <Login/> 
      <NewsLetter/> */}
      <Registration/>
      {/* <UplodeImage/> */}
    </div>
  );
}

export default App;
