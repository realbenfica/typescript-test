import * as express from 'express'
import * as moment from 'moment'

const app = express()

app
    .get('/users/:id([0-9]+)', (req, res) => {
        const userId: string = req.params.id
        if (userId === '123') {
            res.send({
                name: 'Jan Klaassen',
                age: 60
            })
        }
        else {
            res.status(404).send(`User ${userId} not found!`)
        }
    })
    .listen(12345, () => console.log('Listening on port 12345'))

interface UserEntity {
    id: number
    firstName: string
    lastName: string
    birthDate: Date
}

interface UserResponse {
    user: {
        name: string
        age: number
    }
}

const toUser = (entity: UserEntity): UserResponse => {
    const currentDate = moment()
    const ageYears = moment.duration(currentDate.diff(entity.birthDate));
    const userAge = Math.floor(ageYears.asYears());
    const fullname = entity.firstName + ' ' + entity.lastName
    return {
        user: {
            name: fullname,
            age: userAge
        }
    }
}

const userOne: UserEntity = {
    id: 1, 
    firstName: 'User',
    lastName: 'One',
    birthDate: new Date('01-01-2000')
}



console.log(toUser(userOne))