# Design

■ Explains the system and application design
■ Some explanation about the internal code design

## Running the app

```bash
# development
$ docker-compose up --build

```

## Testing
You can test using this [link](http://localhost:3000/docs)

## Requirements

### create a REST Nest.js web server that exposes the following APIs:
1. Login
    * Request
        * playerId
        * Password
    * Logic
        * Validate that this is a valid player user and generate a unique session id
    * Response
        * A login session id


2. Offer sets CRUD endpoint with this schema example
```json
{
  "gameId": "33",
  "avlabilty": 15,
  "offerSetName": "bundle medium",
  "offerSetId": "63e8ac11df807b5c13656c69",
  "sku": "222",
  "priceInCents": "3900",
  "currency": "usd",
  "products": [
    {
      "amount": 500,
      "sku": "002",
      "name": "dice medium"
    },
    {
      "amount": 1500,
      "sku": "005",
      "name": "coins medium"
    }
  ]
}
```
3. Order
    * Request
        * Credit card details
        * OfferSetId
        * Session id
    * Logic
        * Validate that the user logged in
        * Validate basic credit card details
        * Validate OfferSet availability and reduce it
        * Record the order in a DB table
    * Response
        * Encrypted new order id
            * Use aes-256-cbc encryption algorithm

4. The system should be ready to launch with the user and offers set data injected into the chosen DB in the setup
