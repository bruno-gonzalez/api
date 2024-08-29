import express from 'express'
import cors from 'cors'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())
app.use(cors())

app.get('/', async ( req, res) => {
    console.log("HOME")
})


app.post('/tecnologias', async (req, res) => {
    await prisma.stack.create({
        data: {
            stack_name: req.body.stack_name,
            img: req.body.img 
        }
    })
    res.status(201).json(req.body)
}
)

app.get('/tecnologias', async ( req, res) => {
    let stacks = []
    if(req.query){
        stacks = await prisma.stack.findMany({
            where: {
                stack_name: req.query.stack_name
            }
        })
    } else {
        users = await prisma.stack.findMany()
    }
    console.log(req)
    res.status(200).json(stacks)
})

app.listen(
    {
        host: '0.0.0.0',
        port: process.env.PORT ? Number(process.env.PORT) : 3333
    }, 
    console.log('server running')
)