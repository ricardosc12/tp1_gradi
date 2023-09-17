import { For } from 'solid-js'
import style from './style.module.css'
import { routes } from '../App'
import { A } from '@solidjs/router'

export default function Sidebar() {
    return (
        <div class={style.sidebar}>
            <div>EMPRESA</div>
            <div>USER</div>
            <nav>
                <For each={routes}>
                    {({ icon: Icon, ...route }) => {
                        return (
                            <A href={route.path} class='flex items-center mb-2' activeClass='active_route'>
                                <Icon class="icon mr-2"/>
                                <h5>{route.tilte}</h5>
                            </A>
                        )
                    }}
                </For>
            </nav>
        </div>
    )
}