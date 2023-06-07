import {PrismaClient} from '@prisma/client'
import {NextApiRequest, NextApiResponse} from "next";

const prisma = new PrismaClient()
export default async function handler(req: NextApiRequest, res: NextApiResponse) {


    if (req.method === 'GET') {
        const allStudents = await prisma.student.findMany()
        const today = new Date()

        const studentsWithBirthdayToday = allStudents.filter(student => {
            const birthday = new Date(student.birthday)
            return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth()
        })

        // Map over the array to only keep the firstname and lastname properties
        const result = studentsWithBirthdayToday.map(student => ({
            firstname: student.firstname,
            lastname: student.lastname,
        }))

        res.json(result)
    } else {
        res.status(405).json({message: 'Method not allowed'})
    }
}