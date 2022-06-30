import db from "../models/index"
import CRUDService from "../services/CRUDService"

// const db = require("../models");
// const Tut = db.users;

let getHomePage = async (req, res) => {
    try {
        let data = await db.users.findAll()
        // console.log(data)
        return res.render("homepage.ejs", {
            data: JSON.stringify(data)
        })
    } catch (e) {
        console.log(e)
    }
    // return res.render("homepage.ejs")
}



// let getHomePage = (req, res) => {
//     return res.render("homepage.ejs")
// }

let getAboutPage = (req, res) => {
    return res.render("test/about.ejs")
}

let getCRUD = (req, res) => {
    return res.render("crud.ejs")
}

let postCRUD = async (req, res) => {
    // await CRUDService.createNewUser(req.body)
    let message = await CRUDService.createNewUser(req.body)
    console.log(message)
    return res.send("post crud from sever")
}

let readCRUD = async (req, res) => {
    let data = await CRUDService.getAllUser();
    return res.render("read-crud.ejs", {
        dataTable: data
    })
}


module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
}