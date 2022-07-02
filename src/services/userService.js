import db from "../models/index"
import bcrypt from 'bcryptjs'
import res from "express/lib/response";

let checkUserEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.users.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (e) {

        }
    })
}

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExits = await checkUserEmail(email)
            if (isExits) {
                //user already exist

                let user = await db.users.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],

                    //chon raw de su dung duoc ham: delete user.password;
                    raw: true
                })
                if (user) {
                    //compare password
                    let check = await bcrypt.compareSync(password, user.password)
                    if (check) {
                        userData.errCode = 0
                        userData.errMessage = 'OK';
                        //Xoa truong password truoc khi tra ve client
                        delete user.password;
                        userData.user = user;
                    } else {
                        userData.errCode = 3
                        userData.errMessage = 'Error pwd'
                    }
                } else {
                    userData.errCode = 2
                    userData.errMessage = `Your's Email isn't exist in your system. Plz try other email`

                }
            }
            else {
                //return
                userData.errCode = 1
                userData.errMessage = `User's not found !`

            }
            resolve(userData)

        } catch (e) {
            reject(e)
        }
    })
}


module.exports = {
    handleUserLogin: handleUserLogin,
}