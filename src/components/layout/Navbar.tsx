import { Link } from "react-router-dom"

import Container from './Container'
import css from './Navbar.module.css'
import logo_img from '../img/costs_logo.png'
function Navbar() {

    function changeColor() {
        
    }

return (
    <>
        <nav className={css.navbar}>
            <Container>
                <Link to={"/"}>
                    <img src={logo_img} alt="logo" />

                </Link>

                <ul className={css.list}>
                    <li className={`${css.item} ${" "}`} id="opt" onClick={changeColor}>
                        <Link to="/"> Home </Link>
                    </li>

                    <li className={`${css.item} ${" "}`} id="opt" onClick={changeColor}>
                        <Link to="/projects"> Projetos </Link>
                    </li>

                    <li className={`${css.item} ${" "}`} id="opt" onClick={changeColor}>
                        <Link to="/company"> Empresa </Link>

                    </li>

                    <li className={`${css.item} ${" "}`} id="opt" onClick={changeColor}>
                        <Link to="/newprojects"> Novo Projeto </Link>
                    </li>

                    <li className={`${css.item} ${" "}`} id="opt" onClick={changeColor}>
                        <Link to="/contact"> Contato </Link>
                    </li>
                </ul>
            </Container>
        </nav>
    </>
)
}
export default Navbar