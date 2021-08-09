const { createPaymentRequest } = require('../helpers/message-factory')

const sekPayment = JSON.stringify(createPaymentRequest({amount: {currency: 'SEK', total: 100}}))

const message = JSON.parse(sekPayment).message

const data = JSON.parse(Buffer.from(message.data, 'base64').toString('utf8'))

const requestBody = JSON.stringify({
    "SaleToPOIRequest":{
        "MessageHeader":{
            "ProtocolVersion":"3.0",
            "MessageClass":"Service",
            "MessageCategory":"Payment",
            "MessageType":"Request",
            "SaleID":"POSSystemID12345",
            "ServiceID":"0207111104",
            "POIID":"V400m-324688179"
        },
        "PaymentRequest":{
            "SaleData":{
                "SaleTransactionID":{
                    "TransactionID":"27908",
                    "TimeStamp":"2019-03-07T10:11:04+00:00"
                }
            },
            "PaymentTransaction":{
                "AmountsReq":{
                    "Currency": data.paymentRequest.amount.currency,
                    "RequestedAmount": data.paymentRequest.amount.total,
                    "CashBackAmount": data.paymentRequest.amount.cashBack,
                    "PaidAmount": data.paymentRequest.amount.paidAmount
                }
            }
        }
    }
})

module.exports = requestBody
