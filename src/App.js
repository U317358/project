
import { Route, Routes } from 'react-router-dom';
import DetailsPage from './components/DetailsPage';
import MainPage from './components/mainpage';
import ComponentPage from './components/cardPage';

function App() {
  return (
   <div>

     
     <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/details/:id" element={<DetailsPage />} />
        <Route path="/component" element={<ComponentPage/>}/>
        </Routes>
    
    </div>
  );
}

export default App;







