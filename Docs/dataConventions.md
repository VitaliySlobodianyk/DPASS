1. New order request
PUT http://{server host}:{server port}/newOrder
RequestBody:
{
    "id": string,
    "name": string,- format: Name Surname,
    "group": string - format: LL-NN,
    "phone" : number - format: X XX XXX XXXX (10 digits),
    "date" : string - format: MM/YYYY,
    "cards": [
       {
           "type": string,
           "limit": string,
           "price": number( price of 1 card),
           "quantity" : number
       }: Card object
    ]: Cards array
}
 
Expected response: 
  - Status 200 OK : if date, name, group, and phone are unique in spreadsheat with date form request
  - Status 205 Reset Content : if all parameters in previous request are not unique

2. Check Order Status Request
GET http://{server host}:{server port}/checkOrder
RequestBody:
{
    ordersToCheck: [
        {
            "id": string,
            "date": string - format: MM/YYYY (neded for quick access of spreadshet by date),
            "approoved": boolean (false by default)
        }:orderId
    ]: orderId array
}
 
Expected response: 
  - Status 200 OK 
Response Body: 
{
    checkedOrders: [
        {
            "id": string,
            "approoved": boolean ( checked form spreadsheet)
        }:orderId
    ]: orderId array
}
   
3. Approove Order Request
POST http://{server host}:{server port}/approveOrder
RequestBody:
{
    "id": string,
    "date": string - format: MM/YYYY (neded for quick access of spreadshet by date),
    "photo": string -  Encoded photo in BASE64 format and converted to string  
}

Expected response: 
  - Status 200 OK : if field approoval is empty in requested order and data successfully uploaded
  - Status 205 Reset Content : if approval exists in order witn that id
  - Status 500 Internal Server Error : if photo can`t be retrieved  or converted from string into Image format