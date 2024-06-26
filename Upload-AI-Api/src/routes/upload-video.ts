import { FastifyInstance } from "fastify"
import fs from 'node:fs'
import {pipeline} from 'node:stream'
import {fastifyMultipart} from '@fastify/multipart'
import {randomUUID} from 'crypto'
import path from 'node:path'
import { promisify } from "node:util"
import { prisma } from "../lib/prisma"

const pump = promisify(pipeline)

export async function uploadVideoRoute(app: FastifyInstance){
    app.register(fastifyMultipart,{
        limits:{
            fileSize:1048576 * 25,
        }
    })
    app.post('/videos', async(req,reply) => {
        const data = await req.file()
        if(!data){
            return reply.status(400).send({error: 'Missing file input'})
        }
        const extension = path.extname(data.filename)

        if(extension !== '.mp3'){
            return reply.status(400).send({error: 'Invalid input type, please upload a MP3.'})
        }

        const fileBaseName = path.basename(data.filename,extension)
        const fileUploadName = `${fileBaseName}-${randomUUID()}${extension}`
        const uploadDestination = path.resolve(__dirname,'../../tmp',fileUploadName)

        pump(data.file, fs.createWriteStream(uploadDestination))

        const video = await prisma.video.create({
            data:{
                name: data.filename,
                path: uploadDestination,
            }
        })

        return {
            video,
        }
    })
}