import css from  "./Home.module.css"

import savings from '../img/savings.svg'

import LinkButton from "../layout/LinkButton"

function Home() {
    return(
        <>
        <section className={css.home_container}>
            <h1>Bem-Vindo ao <span>Costs</span></h1>
            <p>Comece a gerenciar seus projetos agora mesmo!</p>
            <LinkButton  to="/newprojects" text="criar projeto" />
            <img src={savings} alt="logo" />
        </section>
        </>
    )
}

export default Home