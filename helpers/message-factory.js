const factory = require('rosie').Factory
const faker = require('faker')


//used to set message subscription
const subscription = "test-adyen-payment-request-subscription"

//used in message attributes
const correlationId = "ac44232d-1932-421f-a66a-dd0f140b569d"
const tenantId = "tenant1"

//used in amount attribute of paymentRequest
const currency = faker.finance.currencyCode()
const transactionDateTime = new Date()
const transactionReference = faker.datatype.uuid()


//define the header
factory.define('header')
    .attrs({
        businessUnitId: "SE045",
        checkoutId: "006",
        exchangeIdentification: "string",
        sessionId: "ac44232d-1932-421f-a66a-dd0f140b569d",
        tenantId: "tenant1" 
    })

//define the paymentRequest
factory.define('paymentRequest')
    .attr('amount', {
        currency,
        cashBack: 0,
        paidAmount: 0,
        total: 0
    })
    .attrs({
        attendanceContex: 'ATTD',
        attendantLanguage: 'en',
        saleReferenceId: 'string',
        saleTransactionId : {
            transactionDateTime,
            transactionReference
        }
    })

//define the message that will be published to the pubsub payment request topic
factory.define('message')
    .attrs({
        data: {},
        attributes: {
            'Correlation-Id': correlationId,
            'Tenant-Id': tenantId
        }
    })

const createMessage = (payload) => {
  const header = factory.build('header');
  const data = Buffer.from(payload).toString('base64');
  const message = factory.build('message', { data });
  return message;
};

const createPaymentRequest = (attrs) => {
  const paymentRequest = factory.build('paymentRequest', attrs);
  const header = factory.build('header');
  return createMessage(JSON.stringify({ header, paymentRequest }));
}


module.exports = {
  createPaymentRequest,
};
