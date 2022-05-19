import { useState, useEffect } from 'react'
import css from './Message.module.css'

interface messageProps { type: string, msg?: string }

function Message({ type, msg }) {

    const [visible, setVisible] = useState(false)

    useEffect(() => {
        if (!msg) {
            setVisible(false)
            return
        } setVisible(true)
        const timer = setTimeout(() => {
            setVisible(false)
        }, 3000)
        
        return () => clearTimeout(timer)
    }, [msg])

    return (
        <>
            {visible && (
                <div className={`${css.message} ${css[type]}`}>{msg}</div>
            )}
        </>
    )
}

export default Message