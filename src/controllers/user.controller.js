import userService from "../services/user.service.js"

const GetAll = async( req, res, next ) => {
    try {
        const users = await userService.GetAll()
        res.render("index", { data : users })
        return res.status(200).json({
            data : users
        })        
    } catch (error) {
        next( error )
    }
}

const Post = async( req, res, next ) => {
    try {
        const body = req.body
        const user = await userService.Post( body )
        return res.status(201).json("Created")
    } catch (error) {
        next( error )
    }
}

const GetById = async( req, res, next ) => {
    try {
        const id = parseInt( req.params.id )
        const user = await userService.GetById( id )
            return res.status(200).json({
                data : user
            })
        }
    catch (error) {
        next( error )
    }
}

const PutById = async( req, res, next ) => {
    try {
        const id = parseInt( req.params.id )
        const body = req.body
        const user = await userService.PutById( id, body )
        return res.status(200).json({
            data : user
        })
    } catch (error) {
        next( error )
    }
}

const DeleteById = async( req, res, next ) => {
    try {
        const id = parseInt( req.params.id )
        const users = await userService.DeleteById( id )
        return res.status(200).json({
            data : users
        })
    } catch (error) {
        next( error )
    }
}


export default {
    GetAll,
    Post,
    GetById,
    PutById,
    DeleteById
}