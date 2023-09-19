export function validateValues(objeto, chaves) {
    for (let chave of chaves) {
        if (!objeto.hasOwnProperty(chave) || !objeto[chave]) {
            return false;
        }
    }
    return true;
}