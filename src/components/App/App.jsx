import Header from "../Header/Header";
import Characters from "../Characters/Characters";
import SingleChar from "../SingleChar/SingleChar";
import Footer from "../Footer/Footer";
import './app.scss';




export default function App() {
  return (
    <div className="App">
        <Header/>
        <div className="App__characters-wrapper">
          <Characters/>
          <SingleChar/>
        </div>
        <Footer/>
    </div>
  )
}