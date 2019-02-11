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


interface YourInterface {
    nickname: string
    color: "blue" | "white"
    age: number
    websites: string[]
    job:
    {
        description: string
        salary: number
        info?: string
    } 
    // |
    // {
    //     description: string
    //     salary: number
    // }
}

const cheshireCat: YourInterface = {
    nickname: 'cat',
    color: 'blue',
    age: 15,
    websites: [
        'http://www.catsareawesome.com',
        'http://www.dogsarelame.biz'
    ],
    job: {
        description: 'Scare people',
        salary: 500,
        info: 'only works on sundays'
    }
}

const whiteRabbit: YourInterface = {
    nickname: 'rabbie',
    color: 'white',
    age: 7,
    websites: [
        'http://www.rabbitsrule.com',
        'http://www.carrots.net',
        'http://www.rabbitnews.ru'
    ],
    job: {
        description: 'Being fluffy',
        salary: 1500
    }
}