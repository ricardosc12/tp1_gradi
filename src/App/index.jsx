import Sidebar from "../layout/sidebar";
import { DashIcon, HomeIcon, UploadIcon } from '../assets/icons'
import { Route, Routes } from "@solidjs/router";
import { For } from "solid-js";
import Home from "./organisms/Home";
import Dashboard from "./organisms/Dashboard";
import Integracoes from "./organisms/Integracoes";
import { StoreProvider } from "./store";

export const routes = [
    { path: '/home', icon: HomeIcon, tilte: "Home", import: Home },
    { path: '/dashboard', icon: DashIcon, tilte: "Dashboard", import: Dashboard },
    { path: '/integracoes', icon: UploadIcon, tilte: "Integrações", import: Integracoes }
]

export default function App() {
    return (
        <StoreProvider>
            <div class="h-full flex">
                <Sidebar />
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
        </StoreProvider>
    )
}