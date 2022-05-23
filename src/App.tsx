import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Container from './components/layout/Container';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import Projects from './components/pages/Projects';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Edit from './components/pages/Edit';
import NewProjects from './components/pages/NewProjects';
import Home from './components/pages/Home';


function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="minHeight">
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/company' element={<Company />}></Route>
          <Route path='/newprojects' element={<NewProjects />}></Route>
          <Route path='/contact' element={<Contact />}></Route>
          <Route path='/edit/:id' element={<Edit  />}></Route>
        </Routes>
      </Container>
      <Footer/>
    </Router>
  );
}

export default App;
