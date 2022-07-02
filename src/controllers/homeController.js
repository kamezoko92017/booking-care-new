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

let editCRUD = async (req, res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUDService.getUserInfoById(userId)
        return res.render('edit-crud.ejs', {
            user: userData
        })
    } else {
        return res.send('User not found !')
    }

}

let putCRUD = async (req, res) => {
    let data = req.body
    let allUser = await CRUDService.updateUserData(data)

    //Trả lại trang read-crud.ejs sau khi update xong
    return res.render("read-crud.ejs", {
        dataTable: allUser
    })
    // return res.send('Update done !')

}

let deleteCRUD = async (req, res) => {
    let id = req.query.id
    if (id) {
        await CRUDService.deleteUserByID(id)
        return res.render("delete user success !")
    }
    else {
        return res.render("user not found !")
    }
}

module.exports = {
    getHomePage: getHomePage,
    getAboutPage: getAboutPage,
    getCRUD: getCRUD,
    postCRUD: postCRUD,
    readCRUD: readCRUD,
    editCRUD: editCRUD,
    putCRUD: putCRUD,
    deleteCRUD: deleteCRUD,
}