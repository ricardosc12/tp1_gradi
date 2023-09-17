import { useStore } from "../../store"

export default function Integracoes() {

    const { dispatch: { setName } } = useStore()

    function handleSetName() {
        const name = document.getElementById("name")?.value
        setName(name)
    }

    return (
        <div>
            <h5>Integrações</h5>
            <div class="flex flex-col">
                <input type="text" name="" id="name" />
                <button onclick={handleSetName} class="bg-red-500">SET</button>
            </div>
        </div>
    )
}