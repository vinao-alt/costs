import { Link, NavLink } from "react-router-dom"

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
                            <NavLink to="/" style={({ isActive }) => {
                                return { color: isActive ? '#ffbb33' : undefined }
                            }} > Home </NavLink>
                        </li>

                        <li className={css.item}>
                            <NavLink to="/projects" style={({ isActive }) => {
                                return { color: isActive ? '#ffbb33' : undefined }
                            }}> Projetos </NavLink>
                        </li>

                        <li className={css.item}>
                            <NavLink to="/company" style={({ isActive }) => {
                                return { color: isActive ? '#ffbb33' : undefined }
                            }}> Empresa </NavLink>

                        </li>

                        <li className={css.item}>
                            <NavLink to="/newprojects" style={({ isActive }) => {
                                return { color: isActive ? '#ffbb33' : undefined }
                            }}> Novo Projeto </NavLink>
                        </li>

                        <li className={css.item}>
                            <NavLink to="/contact" style={({ isActive }) => {
                                return { color: isActive ? '#ffbb33' : undefined }
                            }}> Contato </NavLink>
                        </li>
                    </ul>
                </Container>
            </nav>
        </>
    )
}
export default Navbar