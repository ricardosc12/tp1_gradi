import { useLocation } from "@solidjs/router"
import style from './style.module.css'

const getUpperPath = (path: string) => {
    try {
        return path[1].toUpperCase() + path.substring(2, path.length)
    }
    catch { return '' }
}

export default function Header() {
    const location = useLocation()
    return (
        <div class={style.header}>
            {getUpperPath(location.pathname)}
        </div>
    )
}