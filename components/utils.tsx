export const formatPrice = (value: number | string) => {
    const numberValue = typeof value === 'string' ? Number(value) : value;
    if (isNaN(numberValue)) return '-';
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    }).format(numberValue);
};