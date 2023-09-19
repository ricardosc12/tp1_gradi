import { For, createMemo } from 'solid-js'
import style from './style.module.css'
import { routes } from '../App'
import { A } from '@solidjs/router'
import { useStore } from '@/App/store'
import { Button } from '@hope-ui/solid'
import { DoorIcon, TrashIcon, UserIcon } from '@/assets/icons'
import { openModalLogin } from '@/App/molecules/Modal/login'

export default function Sidebar() {

    const [dados] = useStore()

    const isLogged = createMemo(() => !!dados.auth?.hash)

    return (
        <div class={style.sidebar}>
            <div class='flex items-center px-3 py-2 bg-roxinho-bg rounded-lg'>
                <img width={30} src='./profile-img.png' class='rounded-full overflow-hidden min-w-[30px]' />
                <div class='ml-3 -space-y-1'>
                    <h5>{dados.auth?.nome || "unauthorized"}</h5>
                    <p class='font-medium'>user</p>
                </div>
            </div>
            <nav>
                <For each={routes}>
                    {({ icon: Icon, ...route }) => {
                        return (
                            <A href={route.path} class='flex items-center mb-2' activeClass='active_route'>
                                <Icon class="icon mr-2" />
                                <h5>{route.tilte}</h5>
                            </A>
                        )
                    }}
                </For>
            </nav>
            <div class='absolute bottom-5 flex w-full pr-5'>
                <div class='flex flex-col w-full space-y-3'>
                    {isLogged() ? (
                        <Button borderColor={'$danger10'} color="$danger10" class='scale-[0.8]' leftIcon={<TrashIcon />} variant={'outline'}>Deletar conta</Button>
                    ) : ''}
                    <Button onclick={openModalLogin}
                        leftIcon={isLogged() ? <DoorIcon /> : <UserIcon />}
                        variant="outline" class='w-full'>{isLogged() ? "Sair" : "Logar"}
                    </Button>
                </div>
            </div>
        </div >
    )
}