import { Link } from 'react-router-dom'
import css from './LinkButton.module.css'
import { Button } from 'antd'

function LinkButton({ to, text }) {
    return (
        <Button type='primary' size='large'>
            <Link to={to}>
                {text}
            </Link>
        </Button>
    )
}

export default LinkButton