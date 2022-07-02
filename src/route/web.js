import express from "express";
import homeController from "../controllers/homeController"

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage)

    router.get('/test', homeController.getAboutPage)

    router.get('/crud', homeController.getCRUD)

    router.post('/post-crud', homeController.postCRUD)
    router.get('/read-crud', homeController.readCRUD)
    router.get('/edit-crud', homeController.editCRUD)
    router.post('/put-crud', homeController.putCRUD)

    return app.use("/", router)
}

module.exports = initWebRoutes