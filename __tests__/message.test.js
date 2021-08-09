const paymentRequest = require('../src/payment-request')
const { createPaymentRequest } = require('../helpers/message-factory')

// create an inbound message where we set the Currency and Total
const sekPayment = JSON.stringify(createPaymentRequest({amount: {currency: 'SEK', total: 100}}))
const message = JSON.parse(sekPayment).message
const data = JSON.parse(Buffer.from(message.data, 'base64').toString('utf8'))


// get AmountsReq property from paymentRequest sent to Adyen
const amountsReq = JSON.parse(paymentRequest).SaleToPOIRequest.PaymentRequest.PaymentTransaction.AmountsReq


test('The Currency in the paymentRequest should match the currency in the inbound message', () => {
    expect(amountsReq.Currency).toBe(data.paymentRequest.amount.currency)
})

test('The RequestedAmount in the paymentRequest should match the total in the inbound message', () => {
    expect(amountsReq.RequestedAmount).toBe(data.paymentRequest.amount.total)
})
