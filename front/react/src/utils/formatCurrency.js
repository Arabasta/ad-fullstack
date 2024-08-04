export const formatCurrency = (currency) => {
    if (currency == null) return '$0.00';
    return `$${currency.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`;
}
