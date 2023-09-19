import Sidebar from "../layout/sidebar";
import { HomeIcon, UploadIcon } from '../assets/icons'
import { Route, Routes, useLocation, useNavigate } from "@solidjs/router";
import { For, createEffect, onMount } from "solid-js";
import Home, { defaultData } from "./organisms/Home";
import Integracoes from "./organisms/Integracoes";
import { useStore } from "./store";
import Header from "../layout/header";
import { NotificationsProvider } from "@hope-ui/solid";

export const routes = [
    { path: '/home', icon: HomeIcon, tilte: "Home", import: Home },
    { path: '/integracoes', icon: UploadIcon, tilte: "Integrações", import: Integracoes }
]

export default function App() {

    console.log(import.meta.env)

    const [_, { setTransacao }] = useStore()
    const location = useLocation()
    const navigate = useNavigate()

    createEffect(() => {
        if(!routes.find(item => item.path == location.pathname)) {
            navigate('/home')
        }
    })

    onMount(() => {
        setTransacao(defaultData)
    })

    return (
        <NotificationsProvider>
            <div class="h-full flex">
                <Sidebar />
                <div class="main">
                    <Header />
                    <main>
                        <Routes>
                            <For each={routes}>
                                {route => (
                                    <Route path={route.path} component={route.import} />
                                )}
                            </For>
                        </Routes>
                    </main>
                </div>
            </div>
        </NotificationsProvider>
    )
}