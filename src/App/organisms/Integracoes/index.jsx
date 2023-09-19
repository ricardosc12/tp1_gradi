import { Button, notificationService } from '@hope-ui/solid'
import style from './style.module.css'
import { UploadIcon2, XmlIcon } from '@/assets/icons'
import { useStore } from '@/App/store'
import { downloadXmlFromJson, xmlToJsonObj } from '@/utils/convert'
import { onCleanup, onMount } from 'solid-js'
import { isObject } from '@/utils/form'


export default function Integracoes() {

    const [dados, { setTransacao }] = useStore()

    let drop;

    function handleExportXml() {
        downloadXmlFromJson(dados.transacoes)
    }

    function dropFile(e) {

        e.preventDefault();

        if (e.dataTransfer.files.length > 1) {
            notificationService.show({
                status: 'info',
                title: "Carregamento de XML",
                description: "Apenas um arquivo por vez pode ser carregado!"
            })

            return
        }

        const file = e.dataTransfer.files[0]

        const reader = new FileReader();

        reader.onload = function (event) {
            const xmlText = event.target.result;
            try {

                const xmlDoc = new DOMParser().parseFromString(xmlText, 'text/xml');
                const json = xmlToJsonObj(xmlDoc);
                if (isObject(json.transacoes.transacao)) {
                    const newJson = json.transacoes.transacao
                    newJson.valor = Number(newJson.valor)
                    newJson.pago = newJson.pago === 'false' ? false : true
                    setTransacao([newJson], true)
                    notificationService.show({
                        title: "Carregamento realizado",
                        status: 'success',
                        description: "As transações foram importadas com sucesso!"
                    })
                    return
                }
                if (!Array.isArray(json.transacoes.transacao)) throw 'Error'
                setTransacao(json.transacoes.transacao.map(item => ({ ...item, valor: Number(item.valor), pago: item.pago === 'false' ? false : true })), true)
                notificationService.show({
                    title: "Carregamento realizado",
                    status: 'success',
                    description: "As transações foram importadas com sucesso!"
                })

            } catch (error) {
                notificationService.show({
                    title: "Erro ao carregar XML",
                    status: 'warning'
                })
            }
        };

        reader.readAsText(file);

    }

    onMount(() => {
        drop.addEventListener('dragover', handleDragOver);
        drop.addEventListener('drop', dropFile);
    })

    onCleanup(() => {
        drop.removeEventListener('dragover', handleDragOver);
        drop.removeEventListener('drop', dropFile);
    })


    const handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <div class="flex flex-col w-full space-y-5 mt-3">
            <div class='paper'>
                <div ref={drop} class={style.import} onDrop={dropFile}>
                    <h5 class='mb-3'>Carregue transações apartir de um arquivo <b>XML.</b></h5>
                    <UploadIcon2 />
                </div>
            </div>
            <div class='paper'>
                <div class={style.export}>
                    <Button onclick={handleExportXml} leftIcon={<XmlIcon />}>Exportar XML</Button>
                </div>
            </div>
        </div>
    )
}