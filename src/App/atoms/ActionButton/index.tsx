import { Tooltip } from '@hope-ui/solid';
import style from './style.module.css'
import { splitProps, JSX } from 'solid-js';

interface ActionButtonPros extends JSX.HTMLAttributes<HTMLDivElement> {
    size?: 'small' | 'medium' | 'large';
    icon?: any;
    className?: string;
    title?: string;
    color?: "roxinho" | "vermelhinho" | "verdinho" | "cinzinha"
}

export default function ActionButton(props: ActionButtonPros) {

    const [local, others] = splitProps(props, ["icon", "size", "color", "title", "className"])

    return (
        // @ts-ignore
        <Tooltip label={local.title} disabled={!local.title}>
            <div class={`${style.root} ${local.size || ''} ${local.color || ''} ${local.className || ''}`} {...others}>
                {typeof local.icon == 'function' && local.icon()}
            </div>
        </Tooltip>
    )
}