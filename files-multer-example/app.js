const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs/promises");
const multer = require("multer");

const app = express();

app.use(cors());

const tempDir = path.join(process.cwd(), "temp");
const uploadDir = path.join(process.cwd(), "upload")

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, tempDir)
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    },
    limits: {
        fileSize: 10000000
    }
});

const upload = multer({
    storage
});

app.post("/profile", upload.single("avatar"), async (req, res, next)=> {
    const {path: tempName, originalname} = req.file;
    const fileName = path.join(uploadDir, originalname);
    // console.log(tempName);
    // console.log(fileName);
    try {
        await fs.rename(tempName, fileName);
        res.json({
            statsus: "success",
            code: 200,
            data: {
                result: {
                    avatar: fileName
                }
            }
        })
    }
    catch(error) {
        await fs.unlink(tempName);
        next(error)
    }
})

const {PORT = 3000} = process.env;

app.listen(PORT);