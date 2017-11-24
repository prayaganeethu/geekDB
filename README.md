# kvsDB

A key value store database in Javascript.
Uses in-memory storage.

Run the following command in the terminal to get started with it:

`node repl.js`

Supports the following operations:-

## Insertion

**Inserts values into the db**

`kvs>> insert "name" "Neethu Mohandas"         
true         
kvs>> insert "books" ["Kite Runner", "Gone with the wind", "Uncle Tom's cabin"]      
true      
kvs>> insert "address" { "place": "Indiranagar, 19th main, 4th cross", "building":2698}      
true`
