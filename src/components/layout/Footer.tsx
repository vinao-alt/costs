import {FaFacebook, FaInstagram, FaLinkedin} from 'react-icons/fa'
import css from './Footer.module.css'

function Footer() {
    return(
        <>
        <footer className={css.footer}>
            <ul className={css.social_list}>
                <li><FaFacebook/></li>
                <li><FaInstagram/></li>
                <li><FaLinkedin/></li>
            </ul>
            <p className={css.copy_right}>
                <span>Costs</span> &copy; 2022
            </p>
        </footer>
        </>
    )
}

export default Footer