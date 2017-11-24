# kvsDB

A key value store database in Javascript, in development stage.
Uses in-memory storage for now.

Run the following command in the terminal to get started with it:

`node repl.js`

Supports the following operations:-

Note: keys should be in double quotes, and restrict it to single words. Values should be in JSON format.

## Insert

**Inserts values into the db**      

`insert "name" "Neethu Mohandas"`       
`insert "books" ["Kite Runner", "Gone with the wind", "Uncle Tom's cabin"]`      
`insert "address" { "place": "Indiranagar, 19th main, 4th cross", "building":2698}`

## Update

**Updates values in the db**

`update "name" "Anitha Mohandas"`      
`update "address.building" 2699`    

## Delete

**Deletes values from the db**

`delete "name"`        
`delete "address.place"`        

## Show

**Shows a specific key's value**

Note: Supports only showing the values of outermost keys in the db for now

`show "address"`             
`show "books"`           

## keyExists

**Checks if a key exists in the db**

Note: Supports only showing the values of outermost keys in the db for now

`keyExists "books"`           
`keyExists "address"`             

## ListAll

**Lists all data in db**

`listAll`
