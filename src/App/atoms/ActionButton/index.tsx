import { Tooltip } from '@hope-ui/solid';
import style from './style.module.css'

interface ActionButtonPros {
    size?: 'small' | 'medium' | 'large';
    icon?: any;
    class?: string;
    title?: string;
    color?: "roxinho" | "vermelhinho" | "verdinho"
}

export default function ActionButton({ icon, size, color, title, ...props }: ActionButtonPros) {
    return (
        // @ts-ignore
        <Tooltip label={title} disabled={!title}>
            <div class={`${style.root} ${size || ''} ${color || ''}`} {...props}>
                {icon && icon()}
            </div>
        </Tooltip>
    )
}