import userService from "../services/user.service.js"

const GetAll = async( req, res, next ) => {
    try {
        const users = await userService.GetAll()
        // res.render("index", { data : users }) 
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
        const user = await userService.CreateUser( body )
        return res.status(201).json("Created")
    } catch (error) {
        next( error )
    }
}

const GetById = async( req, res, next ) => {
    try {
        const id = req.params.id
        const user = await userService.GetById( id )
            return res.status(200).json({
                data : user
            })
        }
    catch (error) {
        next( error )
    }
}

const GetByField = async (req, res) => {
    try {
      const { field, value } = req.query;
  
      if (!field || !value) {
        return res.status(400).json({ message: 'Thiếu field hoặc value' });
      }
  
      const parsedValue = isNaN(value) ? value : parseInt(value);
  
      const users = await userService.GetByField(field, parsedValue);
      res.status(200).json(users);
    } catch (err) {
      res.status(404).json({ message: err.message });
    }
  };

const PutById = async( req, res, next ) => {
    try {
        const id = req.params.id 
        const body = req.body
        const user = await userService.UpdateUserByID( id, body )
        return res.status(200).json({
            data : user
        })
    } catch (error) {
        next( error )
    }
}

const DeleteById = async( req, res, next ) => {
    try {
        const id = req.params.id 
        const users = await userService.DeleteUserByID( id )
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
    GetByField,
    PutById,
    DeleteById
}