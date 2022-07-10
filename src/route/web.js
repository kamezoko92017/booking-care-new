import express from "express";
import homeController from "../controllers/homeController"
import userController from "../controllers/userController"

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/test', homeController.getAboutPage)

    router.get('/crud', homeController.getCRUD)

    router.post('/post-crud', homeController.postCRUD)
    router.get('/read-crud', homeController.readCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/put-crud', homeController.putCRUD)
    router.get('/delete-crud', homeController.deleteCRUD)

    //Viet API cho booking-care-reactjs
    router.post('/api/login', userController.handleLogin)
    router.post('/api/get-all-users', userController.handleGetAllUsers)
    router.post('/api/create-new-user', userController.handleCreateNewUser)
    router.put('/api/edit-user', userController.handleEditUser)
    router.delete('/api/delete-user', userController.handleDeleteUser)

    return app.use("/", router)
}

module.exports = initWebRoutes