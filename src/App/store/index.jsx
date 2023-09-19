import { createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";

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
            setTransacao: (payload) => {
                setStore(produce((state) => {
                    state.transacoes = payload
                }))
            },
            removeTransacao: (payload) => {
                if (!Array.isArray(payload)) return
                setStore(produce((state) => {
                    state.transacoes = state.transacoes.filter((_, index) => !payload.includes(index))
                }))
            },
            toggleTransacao: (payload, e) => {
                if (typeof e === 'undefined') return
                setStore(produce((state) => {
                    state.transacoes[payload].pago = e
                }))
            },
            addTransacao: (payload) => {
                setStore(produce((state) => {
                    state.transacoes = [...state.transacoes, payload]
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