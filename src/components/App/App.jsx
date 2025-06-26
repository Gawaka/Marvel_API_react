import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from "../Header/Header";
import Characters from "../Characters/Characters";
import SingleChar from "../SingleChar/SingleChar";
import Comics from '../Comics/Comics';
import Footer from "../Footer/Footer";
import './app.scss';

export default function App() {
    return (
        <BrowserRouter>
            <AppContent />
        </BrowserRouter>
    );
}

function AppContent() {
    const location = useLocation();

    return (
        <div className="App">
            <Header />
            <div className="App__content-wrapper">
                <Routes>
                    <Route path="/" element={<Characters />} />
                    <Route path="/comics" element={<Comics />} />
                </Routes>

                {location.pathname === '/' && <SingleChar />}
            </div>
            <Footer />
        </div>
    );
}



// export default function App() {
//     return (
//         <BrowserRouter>
//             <div className="App">
//             <Header/>
//             <div className="App__content-wrapper">
//                 <Routes>
//                     <Route path='/' element={<Characters/>}>
//                         <Route path=':id' element={<SingleChar/>}/>
//                     </Route>
//                     <Route path='/comics' element={<Comics/>}/>
//                 </Routes>
//             </div>
//             <Footer/>
//         </div>
//         </BrowserRouter>
//     );
// };