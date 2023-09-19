import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";
import { showUnauthorized } from "..";
import { updateUser } from "@/api/transacoes";

const StoreContext = createContext();

export function StoreProvider(props) {
    const [store, setStore] = createStore(
        {
            transacoes: {

            },
            auth: {
                nome: "",
                hash: ""
            }
        }
    )

    const value = [
        store,
        {
            setTransacao: (payload, update) => {
                setStore(produce((state) => {
                    if (!state.auth.hash && payload.length) {
                        showUnauthorized()
                        return
                    }
                    state.transacoes = payload
                    update && updateUser({ hash: state.auth.hash, transacoes: state.transacoes })
                }))
            },
            removeTransacao: (payload) => {
                if (!Array.isArray(payload)) return
                setStore(produce((state) => {
                    if (!state.auth.hash) {
                        showUnauthorized()
                        return
                    }
                    state.transacoes = state.transacoes.filter((_, index) => !payload.includes(index))
                    updateUser({ hash: state.auth.hash, transacoes: state.transacoes })
                }))
            },
            toggleTransacao: (payload, e) => {
                if (typeof e === 'undefined') return
                setStore(produce((state) => {
                    if (!state.auth.hash) {
                        showUnauthorized()
                        return
                    }
                    state.transacoes[payload].pago = e
                    updateUser({ hash: state.auth.hash, transacoes: state.transacoes })
                }))
            },
            addTransacao: (payload) => {
                setStore(produce((state) => {
                    if (!state.auth.hash) {
                        showUnauthorized()
                        return
                    }
                    state.transacoes = [...state.transacoes, payload]
                    updateUser({ hash: state.auth.hash, transacoes: state.transacoes })
                }))
            },
            setAuth: (payload) => {
                setStore(produce((state) => {
                    state.auth = payload
                    localStorage.setItem('auth', JSON.stringify(payload))
                }))
            },
            loadAuth: () => {
                setStore(produce((state) => {
                    if (localStorage.getItem('auth')) {
                        state.auth = JSON.parse(localStorage.getItem('auth'))
                    }
                }))
            },
        }
    ]


    return (
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() { return useContext(StoreContext); }