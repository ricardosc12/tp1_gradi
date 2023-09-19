import ActionButton from "@/App/atoms/ActionButton"
import InputMask from "@/App/atoms/InputMask"
import Select from "@/App/atoms/Select"
import { Real, TransacaoType } from "@/App/organisms/Home/components/Table"
import { useStore } from "@/App/store"
import { createUser, getUser, hashUser } from "@/api/transacoes"
import { AddIcon, DoorIcon, MoneyDownIcon, MoneyUpIcon, UserIcon } from "@/assets/icons"
import { validateValues } from "@/utils/form"
import { moneyMask, removeMask } from "@/utils/format"
import {
    Button, Modal as ModalHope, ModalBody,
    ModalCloseButton, ModalContent,
    ModalFooter, ModalHeader, ModalOverlay,
    createDisclosure,
    Input,
    Textarea,
    Text,
    InputGroup,
    InputLeftElement,
    Switch,
    Radio,
    RadioGroup,
    HStack,
    notificationService
} from "@hope-ui/solid"
import { createMemo, createSignal } from "solid-js"

export function openModalLogin() {
    document.getElementById('modal-login')?.click()
}

export default function ModalLogin(props) {

    const { isOpen, onOpen, onClose } = createDisclosure()

    const [_, { setAuth, setTransacao }] = useStore()

    const [isUser, setIsUser] = createSignal(true)

    const [form, setForm] = createSignal({})

    async function handleLogin() {
        const values = form()

        if (!validateValues(values, ['user', 'pass'])) {
            notificationService.show({
                title: "Erro ao logar",
                description: "Preencha todos os campos",
                status: 'info'
            })
            return
        }
        //@ts-ignore
        const hash: string = hashUser({ login: values.user, pass: values.pass })

        const resp = await getUser({ hash: hash })

        if (resp) {
            const { nome, userId: hash, transacoes } = resp
            setAuth({ nome, hash })
            transacoes && setTransacao(transacoes)
            notificationService.show({
                title: "Login efetuado",
                description: `Usuário ${nome} carregado com sucesso!`,
                status: 'success'
            })
            onClose()
        }
        else {
            notificationService.show({
                title: "Login não realizado",
                status: 'warning'
            })
        }
    }

    async function handleCreate() {
        const values = form()

        if (!validateValues(values, ['user', 'pass', 'name'])) {
            notificationService.show({
                title: "Erro ao cadastrar usuário",
                description: "Preencha todos os campos",
                status: 'info'
            })
            return
        }
        //@ts-ignore
        const hash: string = hashUser({ login: values.user, pass: values.pass })
        //@ts-ignore
        const nome = values.name
        //@ts-ignore
        const resp = await createUser({ login: values.user, pass: values.pass, nome: nome })

        if (resp) {
            setAuth({ nome, hash })
            notificationService.show({
                title: "Cadastro efetuado",
                description: `Usuário ${nome} cadastrado com sucesso!`,
                status: 'success'
            })
            onClose()
        }
        else {
            notificationService.show({
                title: "Cadastro não realizado",
                description: `Usuário ${nome} não foi cadastrado!`,
                status: 'warning'
            })
        }
    }

    function handleRequest() {
        isUser() ? handleLogin() : handleCreate()
    }

    function onForm(id) {
        return (e) => {
            if (!e) {
                setForm(prev => ({ ...prev, [id]: undefined }))
            }
            else if (id == 'valor') {
                setForm(prev => ({ ...prev, [id]: Number(removeMask(e.target.value)) }))
            }
            else if (typeof e === 'string') {
                setForm(prev => ({ ...prev, [id]: e }))
            }
            else if (e.target.type == 'checkbox') {
                setForm(prev => ({ ...prev, [id]: e.target.checked }))
            }
            else {
                setForm(prev => ({ ...prev, [id]: e.target.value }))
            }
        }
    }

    return (
        <>
            <Button onclick={onOpen} id="modal-login" class="hidden"></Button>
            <ModalHope
                motionPreset="scale"
                opened={isOpen()}
                onClose={onClose}
                centered
                initialFocus="#title-modal"
            >
                <ModalOverlay />
                <ModalContent class="h-auto">
                    <ModalCloseButton />
                    <ModalHeader id="title-modal" class="text-xl flex items-center mb-2">
                        <div class="mr-3">{isUser() ? "Logar" : "Cadastrar"}</div>
                        <ActionButton icon={UserIcon} />
                    </ModalHeader>
                    <ModalBody>
                        {isUser() ? (
                            <div class="space-y-5 px-5">
                                <Input onchange={onForm('user')} placeholder="Usuário" />
                                <Input onchange={onForm('pass')} placeholder="Senha" type="password" />
                            </div>
                        ) : (
                            <div class="space-y-5 px-5">
                                <Input onchange={onForm('name')} placeholder="Nome" />
                                <Input onchange={onForm('user')} placeholder="Usuário" />
                                <Input onchange={onForm('pass')} placeholder="Senha" type="password" />
                            </div>
                        )}
                    </ModalBody>
                    <ModalFooter class="justify-between mt-3">
                        <Button variant="ghost" onClick={() => setIsUser(prev => !prev)}>{isUser() ? "Criar Conta" : "Logar"}</Button>
                        <Button leftIcon={<DoorIcon />} onClick={handleRequest}>{isUser() ? "Logar" : "Cadastrar"}</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalHope>
        </>
    )
}