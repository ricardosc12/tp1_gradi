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

export function downloadXmlFromJson(json) {
    const xmlString = jsonToXml(json)

    const blob = new Blob([xmlString], { type: 'application/xml' });

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a')
    a.style.display = 'none'
    a.href = url;
    a.download = 'transacoes.xml';
    document.body.appendChild(a);
    a.click()
    URL.revokeObjectURL(url);
    a.remove()
}

export function xmlToJsonObj(xml) {
    try {
        var obj = {};
        if (xml.children.length > 0) {
            for (var i = 0; i < xml.children.length; i++) {
                var item = xml.children.item(i);
                var nodeName = item.nodeName;

                if (typeof (obj[nodeName]) == "undefined") {
                    obj[nodeName] = xmlToJsonObj(item);
                } else {
                    if (typeof (obj[nodeName].push) == "undefined") {
                        var old = obj[nodeName];

                        obj[nodeName] = [];
                        obj[nodeName].push(old);
                    }
                    obj[nodeName].push(xmlToJsonObj(item));
                }
            }
        } else {
            obj = xml.textContent;
        }
        return obj;
    } catch (e) {
        console.log(e.message);
    }
}