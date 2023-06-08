import {PrismaClient} from '@prisma/client';
import {NextApiRequest, NextApiResponse} from "next";
import nodemailer from 'nodemailer';
import cron from 'node-cron';
import moment from 'moment-timezone';

const prisma = new PrismaClient();

const sendBirthdayEmails = async () => {
    const allStudents = await prisma.student.findMany();
    const today = new Date();

    const studentsWithBirthdayToday = allStudents.filter(student => {
        const birthday = new Date(student.birthday);
        return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
    });

    const transporter = nodemailer.createTransport({
        port: 465,
        host: 'node177-eu.n0c.com',
        secure: true,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
        },
    });

    for (const student of studentsWithBirthdayToday) {
        await transporter.sendMail({
            from: `"Mon école" <${process.env.MAIL_USER}>`, // Expéditeur
            to: student.email, // Destinataire
            subject: 'Joyeux anniversaire!', // Sujet
            text: `Joyeux anniversaire, ${student.firstname} ${student.lastname}!`, // Corps du courrier électronique
            html: `<p>Joyeux anniversaire, ${student.firstname} ${student.lastname}!</p>`, // Corps du courrier électronique en HTML
        });
    }

    console.log('Birthday emails sent!');
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const allStudents = await prisma.student.findMany();
        const today = new Date();

        const studentsWithBirthdayToday = allStudents.filter(student => {
            const birthday = new Date(student.birthday);
            return birthday.getDate() === today.getDate() && birthday.getMonth() === today.getMonth();
        });

        // Map over the array to only keep the firstname and lastname properties
        const result = studentsWithBirthdayToday.map(student => ({
            firstname: student.firstname,
            lastname: student.lastname,
        }));

        res.json(result);
    } else {
        res.status(405).json({message: 'Method not allowed'});
    }
}

// Planification de l'envoi d'e-mails à 8h du matin (heure française)
cron.schedule('0 8 * * *', () => {
    const franceTime = moment().tz('Europe/Paris');
    if (franceTime.hour() === 8 && franceTime.minute() === 0) {
        sendBirthdayEmails().then(r => console.log(r));
    }
});
