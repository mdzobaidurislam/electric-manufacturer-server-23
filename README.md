# Electric-manufacturer

Click this link see live project: [Project live link](https://electric-manufacturer.web.app/).

Server link: [Project server link](https://electric-manufacturer-server.herokuapp.com/).

# Project Features:

- All Api routes ->

  - Order routes

    1. get -> api/admin-order/ -> Get all order when admin log in
    2. put -> api/admin-order-approved
    3. delete -> api/admin-order/:id
    4. get -> api/order/:email
    5. post -> api/order/
    6. delete -> api/order/:id/:email
    7. delete -> api/orderid/:orderId
    8. post -> api/create-payment-intent
    9. patch -> api//order-payment-update/:id/:email

- All products ->

  1. get -> api/admin-product/ ->
  2. delete -> api/admin-product/:id ->
  3. post -> api/admin-product/ ->

- All reviews ->

  1. get -> api/review/ ->
  2. post -> api/review/ ->

- All Tool ->
  1. get -> api/tool/ ->
  1. get -> api/tool/:id ->

* useing middileware jwt token secure api routes

* Blog api routes

1. get -> api/blog -> Get all articles
2. post -> api/blog -> Add blog articles in database
3. get -> api/blog/:id -> get blog articles in database with sepecific id

- Technologies use
  1.  cors
  2.  express js
  3.  mongoose
  4.  jsonwebtoken
  5.  dotenv
  6.  stripe
