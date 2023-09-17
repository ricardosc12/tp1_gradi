import { useStore } from "../../store"

export default function Home() {
    const { dados } = useStore()
    return (
        <div>
            <h3>HOME</h3>
            <p>{dados.nome.first}</p>
        </div>
    )
}