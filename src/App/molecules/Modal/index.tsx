import ActionButton from "@/App/atoms/ActionButton"
import InputMask from "@/App/atoms/InputMask"
import Select from "@/App/atoms/Select"
import { Real, TransacaoType } from "@/App/organisms/Home/components/Table"
import { AddIcon, MoneyDownIcon, MoneyUpIcon } from "@/assets/icons"
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

export default function Modal(props) {

    const { isOpen, onOpen, onClose } = createDisclosure()

    const [form, setForm] = createSignal({
        tipo: "receita",
        pago: false
    })

    const dados = createMemo(() => {
        const data = {
            categorias: {},
            origens: {},
            tipo: ['receita', 'despesa'],
            tipos_pagamento: ['Pix', 'Cartão', 'Boleto', 'Dinheiro']
        }

        if (!Array.isArray(props.transacoes)) {
            data.categorias = Object.keys(data.categorias)
            data.origens = Object.keys(data.origens)
            return data
        }

        props.transacoes.forEach((item: TransacaoType) => {
            data.categorias[item.categoria] = true
            data.origens[item.origem] = true
        })

        data.categorias = Object.keys(data.categorias)
        data.origens = Object.keys(data.origens)
        
        return data
    })

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

    function handleCreate() {
        const values = form()
        if (!validateValues(values, ['data', 'tipo_pagamento',
            'categoria',
            'origem', 'valor']
        )) {
            notificationService.show({
                title: "Dados ausentes",
                status: 'info',
                description: "Preencha todos os dados para criação de uma nova transação!",
            })
            return
        }

        props.handleAdd(values)

    }

    return (
        <>
            <Button onclick={onOpen} leftIcon={<AddIcon />}>Nova Transação</Button>
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
                    <ModalHeader id="title-modal" class="text-xl flex items-center">
                        <div class="mr-3">Nova transação</div>
                        {form().tipo == 'despesa' ? (
                            <ActionButton
                                color='vermelhinho'
                                title={'Receita'}
                                icon={MoneyDownIcon}
                            />
                        ) : <ActionButton
                            color='verdinho'
                            title={'Receita'}
                            icon={MoneyUpIcon}
                        />}

                    </ModalHeader>
                    <ModalBody class="space-y-5">

                        <RadioGroup onchange={onForm('tipo')} defaultValue="receita">
                            <HStack spacing="$4">
                                <Radio value="receita">Receita</Radio>
                                <Radio value="despesa">Despesa</Radio>
                            </HStack>
                        </RadioGroup>

                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <h2>Pago ?</h2>
                                <Switch onchange={onForm('pago')} class="mt-1" />
                            </div>
                            <div class="flex items-center">
                                <Input onchange={onForm('data')} placeholder="Data" />
                            </div>
                        </div>
                        <div>
                            <Select onChange={onForm('tipo_pagamento')} placeholder="Forma de pagamento" data={["Boleto", "Pix", "Cartão", "Dinheiro"]} />
                        </div>
                        <div class="flex w-full space-x-3">
                            <Select onChange={onForm('categoria')} isCreateable class="w-full" placeholder="Categoria" data={dados().categorias as Array<any>} />
                            <Select onChange={onForm('origem')} isCreateable class="w-full" placeholder="Origem" data={dados().origens as Array<any>} />
                        </div>
                        <Textarea onchange={onForm('descricao')} placeholder="Descrição" />

                        <InputMask onchange={onForm('valor')} mask={moneyMask} placeholder="Valor" />

                    </ModalBody>
                    <ModalFooter class="justify-between">
                        <Button variant="outline" onClick={onClose}>Close</Button>
                        <Button leftIcon={<AddIcon />} onClick={handleCreate}>Criar transação</Button>
                    </ModalFooter>
                </ModalContent>
            </ModalHope>
        </>
    )
}