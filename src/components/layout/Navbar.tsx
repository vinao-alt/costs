import { Link } from "react-router-dom"

// import Contato from "../pages/Contato"
// import Empresa from "../pages/Empresa"
// import Home from "../pages/Home"
// import NewProjects from "../pages/NewProjects"


import Container from './Container'
import css from './Navbar.module.css'
import logo_img from '../img/costs_logo.png'
function Navbar() {
    return (
        <>
            <nav className={css.navbar}>
                <Container>
                    <Link to={"/"}>
                        <img src={logo_img} alt="logo" />
                    </Link>

                    <ul className={css.list}>
                        <li className={css.item}>
                            <Link to="/"> Home </Link>
                        </li>
                        <li className={css.item}>
                            <Link to="/projetos"> Projetos </Link>
                        </li>
                        <li className={css.item}>
                            <Link to="/empresa"> Empresa </Link>

                        </li>
                        <li className={css.item}>
                            <Link to="/newprojects"> Novo Projeto </Link>

                        </li>
                        <li className={css.item}>
                            <Link to="/contato"> Contato </Link>

                        </li>
                    </ul>
                </Container>
            </nav>
        </>
    )
}

export default Navbar