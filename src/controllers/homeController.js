import db from "../models/index"
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

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage
}