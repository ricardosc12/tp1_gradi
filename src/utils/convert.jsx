export function jsonToXml(json) {
    let xml = '<transacoes>';
    for (const transacao of json) {
        xml += '<transacao>';
        for (const key in transacao) {
            xml += `<${key}>${transacao[key]}</${key}>`;
        }
        xml += '</transacao>';
    }
    xml += '</transacoes>';
    return xml;
}

export function xmlToJson(xml) {
    const jsonObj = [];
    const transacoes = xml.getElementsByTagName('transacao');
    for (const transacao of transacoes) {
        const transacaoObj = {};
        for (const child of transacao.children) {
            transacaoObj[child.tagName] = child.textContent;
        }
        jsonObj.push(transacaoObj);
    }
    return jsonObj;
}