export const moneyMask = (value: string) => {
    if (!value) return ''

    value = value.replace('.', '').replace(',', '').replace(/\D/g, '')

    const options = { minimumFractionDigits: 2 }
    const result = new Intl.NumberFormat('pt-BR', options).format(
        parseFloat(value) / 100
    )

    return typeof result === 'string' ? 'R$ ' + result : undefined
}

export const removeMask = (value: string) => {
    if (!value) return ''
    return value.replace(/[^\d,]/g, '').replace(',', '.')
}