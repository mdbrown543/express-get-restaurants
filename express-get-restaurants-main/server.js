const express = require("express");
const {check,validationResult} = require("express-validator")
const app = express();
const {Restaurant} = require("./models/index")
const {sequelize} = require("./db");
const { Model } = require("sequelize/types");
const router = express.Router()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = 3000;

//TODO: Create your GET Request Route Below: 
app.get("/restaurants", async (req,res) => {
    const rest = await Restaurant.findAll()
    res.json(rest)
    //let id = req.params.id
    //const rest = await Restaurant.findByPk(id);
    //res.json(rest);
})
app.post("/restaurants",[check("name").not().isEmpty().trim(),check("location").not().isEmpty().trim(),check("cuisine").not().isEmpty().trim()], async (req,res) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }

    let restaurant = await Restaurant.create(req.body)
    res.send("New restaurant");
})

app.put("/restaurants/:id", [check("name").not().isEmpty().trim(),check("location").not().isEmpty().trim(),check("cuisine").not().isEmpty().trim(),check("name").isLength({ min: 10, max:30 })], async (req,res) => {

    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({error: errors.array()})
    }
   await Restaurant.update(req.body,{
        where: {id: req.params.id}
    }) 

    res.send("New update");
})

app.delete("/restaurants/:id", async (req,res) => {
   await Restaurant.destroy({
       where: {id: req.params.id}
   })
    res.send("Restaurant deleted")
})


app.listen(port, () => {
    sequelize.sync();
    console.log("Your server is listening on port " + port);
})

module.exports = router