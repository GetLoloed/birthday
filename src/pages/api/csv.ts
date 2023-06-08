import { PrismaClient } from "@prisma/client";
import multer from "multer";
import csvParser from "csv-parser";
import { Request, Response } from "express";
import stripBom from "strip-bom-stream";
import fs from "fs";

const prisma = new PrismaClient();
const upload = multer({ dest: "/uploads" });

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: Request, res: Response) {
  if (req.method === "POST") {
    upload.single("csvFile")(req, res, async (error: any) => {
      if (error) {
        return res.status(400).json({ error: error });
      }
      const { path } = req.file as Express.Multer.File;
      const processCSV = new Promise<any[]>((resolve, reject) => {
        const results: any[] = [];
        fs.createReadStream(path)
          .pipe(stripBom())
          .pipe(csvParser())
          .on("data", (data) => {
            results.push(data);
          })
          .on("end", () => {
            resolve(results);
          })
          .on("error", (error) => {
            reject(error);
          });
      });
      try {
        const csvData = await processCSV;
        console.log(csvData);
        const formattedData = csvData.map((row) => ({
          firstname: row.firstname,
          lastname: row.lastname,
          birthday: new Date(row.birthday),
          email: row.email,
        }));
        console.log(formattedData);
        await prisma.student.createMany({ data: formattedData });
        fs.unlinkSync(path);
        return res
          .status(200)
          .json({ message: "Le fichier CSV a bien été ajouté" });
      } catch (error) {
        return res.status(500).json({
          error: "Le fichier CSV n'a pas été ajouté",
        });
      }
    });
  } else {
    res.status(405).json({ error: "La methode n'ai pas alloué" });
  }
}
