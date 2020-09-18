import HTTP from '.'

export default {
    fetchCurrencyNames() {
        return HTTP.get(`/rates/availableCurrencies`);
    },
    fetchCurrencyDates() {
        return HTTP.get(`/rates/availableDates`);
    },
    fetchRatesByCurrencyAndDate(pageNumber, pageSize, ccy, date) {
        return HTTP.get(`/rates/get`, {
            params: {
                pageNumber: pageNumber,
                pageSize: pageSize,
                currency: ccy,
                date: date
            }
        });
    },
    fetchExchangeCalculation(ccyFrom, ccyTo, amount) {
        return HTTP.get(`/rates/calculate`, {
            params: {
                ccyFrom: ccyFrom,
                ccyTo: ccyTo,
                amount: amount
            }
        });
    },
}