import css from  "./Home.module.css"
import savings from '../img/savings.svg'
import LinkButton from "../layout/LinkButton"
import { Link } from "react-router-dom"

function Home() {
    return(
        <>
        <section className={css.home_container}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            {/* <LinkButton to="/newproject" text="criar projeto"></LinkButton> */}
            {/* <LinkButton  to="/newproject" text="criar projeto" /> */}
            <Link to={"/LinkButton"}>Teste</Link>
            <img src={savings} alt="logo" />
        </section>
        </>
    )
}

export default Home