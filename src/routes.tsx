import { ReactNode } from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes as Switch,
} from "react-router-dom";
import Company from "./components/pages/Company";
import Contact from "./components/pages/Contact";
import Dashboard from "./components/pages/Dashboard";
import Edit from "./components/pages/Edit";
import Home from "./components/pages/Home";
import NewProjects from "./components/pages/NewProjects";
import Projects from "./components/pages/Projects";
import MainLayout from "./layout/MainLayout";

const Routes = () => {
  const renderLayout = (element: ReactNode) => {
    return <MainLayout children={element} />;
  };

  return (
    <Router>
      <Switch>
        <Route path="/" element={renderLayout(<Dashboard />)} />
        <Route path="/home" element={renderLayout(<Home />)} />
        <Route path="/projects" element={renderLayout(<Projects />)} />
        <Route path="/company" element={renderLayout(<Company />)} />
        <Route path="/newprojects" element={renderLayout(<NewProjects />)} />
        <Route path="/contact" element={renderLayout(<Contact />)} />
        <Route path="/edit/:id" element={renderLayout(<Edit />)} />
      </Switch>
    </Router>
  );
};

export default Routes;
