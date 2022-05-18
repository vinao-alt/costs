import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contato from './components/pages/Contato';
import Empresa from './components/pages/Empresa';
import Home from './components/pages/Home';
import NewProjects from './components/pages/NewProjects';
import Projetos from './components/pages/Projetos';

import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';


function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="minHeight">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/projetos' element={<Projetos />}></Route>
          <Route path='/empresa' element={<Empresa />}></Route>
          <Route path='/newprojects' element={<NewProjects />}></Route>
          <Route path='/contato' element={<Contato />}></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
