# A simple example of how we can use a message factory to support Unit Tests in our payment service

## Usage
```sh
npm install
npm test
```

## Files
`helpers/message-factory.js` - used to create inbound messages to the payment services - these are what would be pushed via an HTTP POST to the payment service via its pubsub subscription to the payment.requests topic.

```javascript
const { createPaymentRequest } = require('../helpers/message-factory')

const sekPayment = JSON.stringify(createPaymentRequest({amount: {currency: 'SEK', total: 100}}))

console.log(sekPayment)
```
```json
{
    "subscription": "test-adyen-payment-request-subscription",
    "message": {
        "data": "eyJoZWFkZXIiOnsiYnVzaW5lc3NVbml0SWQiOiJTRTA0NSIsImNoZWNrb3V0SWQiOiIwMDYiLCJleGNoYW5nZUlkZW50aWZpY2F0aW9uIjoic3RyaW5nIiwic2Vzc2lvbklkIjoiYWM0NDIzMmQtMTkzMi00MjFmLWE2NmEtZGQwZjE0MGI1NjlkIiwidGVuYW50SWQiOiJ0ZW5hbnQxIn0sInBheW1lbnRSZXF1ZXN0Ijp7ImFtb3VudCI6eyJjdXJyZW5jeSI6IlNFSyIsInRvdGFsIjoxMDB9LCJhdHRlbmRhbmNlQ29udGV4IjoiQVRURCIsImF0dGVuZGFudExhbmd1YWdlIjoiZW4iLCJzYWxlUmVmZXJlbmNlSWQiOiJzdHJpbmciLCJzYWxlVHJhbnNhY3Rpb25JZCI6eyJ0cmFuc2FjdGlvbkRhdGVUaW1lIjoiMjAyMS0wOC0wOVQwNzozMzoxMi41NjZaIiwidHJhbnNhY3Rpb25SZWZlcmVuY2UiOiIzOWYzNWJkOS00NjQ5LTQzYTYtODZjNC0zZmJjY2Q0MjRlODEifX19",
        "attributes": {
            "Correlation-Id": "ac44232d-1932-421f-a66a-dd0f140b569d",
            "Tenant-Id": "tenant1"
        }
    }
}
```