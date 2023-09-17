import { createSignal, createContext, useContext } from "solid-js";
import { createStore, produce } from "solid-js/store";

const StoreContext = createContext();

export function StoreProvider(props) {
    const [store, setStore] = createStore({
        dados: {
            nome: {
                first: "Ricardo"
            }
        },
        dispatch: {
            setName: (payload) => {
                setStore(produce((state) => {
                    state.dados.nome.first = payload
                }))
            }
        }
    })


    return (
        <StoreContext.Provider value={store}>
            {props.children}
        </StoreContext.Provider>
    );
}

export function useStore() { return useContext(StoreContext); }