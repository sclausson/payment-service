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


//build the header and the paymentRequest and concatenate them in the rawData object
const header = factory.build('header')
//pass in options in the paymentRequest to override the defaults
const paymentRequest = factory.build('paymentRequest', { amount: {currency: 'EUR', total: 100}, attendantLanguage: 'fr'})
const rawData = JSON.stringify({
	header,
	paymentRequest
})

//pubsub message data must be base64 encoded
const data = Buffer.from(rawData).toString('base64')

//define the message that will be published to the pubsub payment request topic
factory.define('message')
	.attrs({
		data,
		attributes: {
			'Correlation-Id': correlationId,
			'Tenant-Id': tenantId
		}
	})


//build the message
const message = factory.build('message')

//JSON string including the subscription and the message
console.log(JSON.stringify({
	subscription,
	message
}))
