const { createPaymentRequest } = require('../helpers/message-factory')

const sekPayment = createPaymentRequest({amount: {currency: 'SEK', total: 100}})
const sekPaymentWithCashBack = createPaymentRequest({amount: {currency: 'SEK', total: 100, cashBack: 25}})
const sekPaymentWithPartialPayment = createPaymentRequest({amount: {currency: 'SEK', total: 100, paidAmount: 33}})
const nokPayment = createPaymentRequest({amount: {currency: 'NOK', total: 100}})

console.log(JSON.stringify(sekPayment))
console.log(JSON.stringify(sekPaymentWithCashBack))
console.log(JSON.stringify(sekPaymentWithPartialPayment))
console.log(JSON.stringify(nokPayment))
