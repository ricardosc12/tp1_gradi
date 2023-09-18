import { useLocation } from "@solidjs/router"
import style from './style.module.css'

const getUpperPath = (path: string) => path[1].toUpperCase() + path.substring(2, path.length)

export default function Header() {
    const location = useLocation()
    return (
        <div class={style.header}>
            {getUpperPath(location.pathname)}
        </div>
    )
}