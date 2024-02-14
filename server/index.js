const express = require('express')
const bodyParser = require('body-parser')
const port = 3000

const app = express()

app.use(bodyParser.json())

let products = []
let counter = 1


app.post('/products', (req, res) => {
    const data = req.body
    let id = counter
    
    const product = {
        id: counter,
        productname: data.productname,
        price: data.price
    }
    
    products.push(product)
    counter += 1

    res.json({
        message:'create new product success',
        detail:product
    })
})


app.get('/products', (req, res) => {
    res.json({
      message:'get data success',
      detail:products
    })
  })


app.put('/products/:id', (req, res) => {
    let id = req.params.id
    const updateProduct = req.body

    const selectedID = products.findIndex((product) => product.id === parseInt(id))

    products[selectedID].id = updateProduct.id || products.id
    products[selectedID].productname = updateProduct.productname || products.productname
    products[selectedID].price = updateProduct.price || products.price

    res.json({
        message: 'update data new product success',
        detail: {
            product: updateProduct,
            indexUpdate: selectedID
        }
    })
})


app.delete('/products/:id', (req, res) => {
    let id = req.params.id
    const selectedID = products.findIndex((product) => product.id === parseInt(id))

    products.splice(selectedID, 1)

    res.json({
        message: 'delete complete',
        indexDeleted: selectedID
    })
})


app.listen(port,(req, res) => {
    console.log(`starting server with port ${port}`)
})