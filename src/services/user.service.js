
import DbHelper from '../helpers/DbHelper.js'

const GetAll = async() => {
    const db = await DbHelper.readDb()
    return db.User
}

const Post = async( body ) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex( (user) => user.id === body.id )
    if ( index !== -1 ) {
        throw new Error("id exists")
    }
    db.User.push( body )
    await DbHelper.writeDb( db )
}

const GetById = async( id ) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex( (user) => user.id === id )
    if ( index === -1 ) {
        throw new Error("User not found")
    } 
    return db.User[index] 

}

const PutById = async( id, body ) => {
    const db = await DbHelper.readDb()
    const index = db.User.findIndex((user) => user.id === id)
    if (index === -1) {
        throw new Error("User not found")
    } 
    db.User[index] = { ...db.User[index], ...body }
    await DbHelper.writeDb(db)
    return db.User[index]
}

const DeleteById = async( id ) => {
    const db = await DbHelper.readDb();
    const index = db.User.findIndex((user) => user.id === id)
    if (index === -1) {
        throw new Error("User not found")
    }
    db.User.splice(index, 1)
    await DbHelper.writeDb(db)
    return db.User
}

export default {
    GetAll , 
    Post ,
    GetById ,
    PutById ,
    DeleteById
}