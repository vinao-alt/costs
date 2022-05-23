import css from  "./Container.module.css"

function Container(props:any) {

    return(
        <>
        <div className={`${css.container} ${css[props.customClass]}`}>{props.children}</div>
        </>
    )
}

export default Container