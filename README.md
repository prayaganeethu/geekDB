# kvsDB

A key value store database in Javascript, in development stage.

## Getting Started

Run the following command in the terminal to get started with it:

`node repl.js`     

To exit, hit CTRL+C

## Supports the following operations:-

Note: keys should be in double quotes, and restrict it to single words. Values should be in JSON format.

### insert

**Inserts values into the db**      

`insert "name" "Neethu Mohandas"`       
`insert "books" ["Kite Runner", "Gone with the wind", "Uncle Tom's cabin"]`      
`insert "address" { "place": "Indiranagar, 19th main, 4th cross", "building":2698}`

### update

**Updates values in the db**

`update "name" "Anitha Mohandas"`      
`update "address.building" 2699`    

### delete

**Deletes values from the db**

`delete "name"`        
`delete "address.place"`        

### show

**Shows a specific key's value**

Note: Supports only showing the values of outermost keys in the db for now

`show "address"`             
`show "books"`           

### keyExists

**Checks if a key exists in the db**

Note: Supports only showing the values of outermost keys in the db for now

`keyExists "books"`           
`keyExists "address"`             

### listAll

**Lists all data in db**

`listAll`  

### commit

**Saves all data to the file**

`commit`    

## Authors

* **Neethu Mohandas** - *Initial work* - [prayaganeethu](https://github.com/prayaganeethu)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hats off to my mentors, [Mukesh](https://github.com/mukeshm) and [Adarsh](https://github.com/adarsh-why) for helping me learn throughout.

* [PurpleBooth](https://github.com/PurpleBooth) for this template
