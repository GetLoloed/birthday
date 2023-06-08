import { PrismaClient } from '@prisma/client';
import nodemailer from 'nodemailer';
import cron from 'node-cron';

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

// Schedule task to run at 8 AM every day
cron.schedule('0 8 * * *', sendBirthdayEmails);


// Map over the array to only keep the firstname and lastname properties
const result = studentsWithBirthdayToday.map(student => ({
    firstname: student.firstname,
    lastname: student.lastname,
}));
res.json(result);
    } else {
    res.status(405).json({ message: 'Method not allowed' });
}
}