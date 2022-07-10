import { json } from "express/lib/response"
import db from "../models/index"
import userService from "../services/userService"



let handleLogin = async (req, res) => {
    let email = req.body.email
    let password = req.body.password

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: 'Missing inputs parameter !'
        })
    }

    //check email exits
    //compare password
    //return userInfor
    //access_token (JWT)

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUsers = async (req, res) => {
    let id = req.body.id; //Có 2 trường hợp là lấy all user và lấy 1 user để edit
    let i = ''
    if (!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter !',
            users: []
        })
    }

    let users = await userService.getAllUsers(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        users
    })
}

let handleCreateNewUser = async (req, res) => {
    let message = await userService.createNewUser(req.body)
    console.log(message)
    return res.status(200).json(message)
}

let handleDeleteUser = async (req, res) => {

    let i = req.query.id
    let k = 1
    if (!req.query.id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: "Missing required parameter !"
        })
    }
    let message = await userService.deleteUser(req.query.id)
    return res.status(200).json(message)
}

let handleEditUser = async (req, res) => {
    let data = req.body
    let message = await userService.updateUserData(data)
    return res.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleGetAllUsers: handleGetAllUsers,
    handleCreateNewUser: handleCreateNewUser,
    handleEditUser: handleEditUser,
    handleDeleteUser: handleDeleteUser,
}