import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/pages/home";
import Contact from "./components/pages/contact";
import Conpany from "./components/pages/conpany";
import NewProject from "./components/pages/newproject";
import Projects from "./components/pages/projects";
import Project from "./components/pages/project";

import Container from "./components/layout/container";
import NavBar from "./components/layout/navBar";
import Footer from "./components/layout/footer";
function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass="minHeight">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/conpany" element={<Conpany />} />
          <Route path="/newproject" element={<NewProject />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/project/:id" element={<Project />} />
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
