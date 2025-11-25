const express = require('express');
const cors = require('cors');
const multer = require('multer'); // The tool to hold files
const Jimp = require('jimp'); // The eyes
const QrCode = require('qrcode-reader'); // The decoder
const fs = require('fs'); // Tool to clean up the desk later

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// 1. Setup the "Desk" (Storage)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/') // Save files here
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname) // Give it a unique name
    }
});

const upload = multer({ storage: storage });

// 2. The Safety Check Function (The Detective) 🕵️‍♂️
function checkSafety(url) {
    // Rule 1: Safe sites usually start with HTTPS (The S stands for Secure)
    if (url.startsWith('http://')) {
        return { safe: false, reason: "Warning: Website is not secure (Http)" };
    }
    
    // Rule 2: Dangerous files
    if (url.endsWith('.exe') || url.endsWith('.zip')) {
        return { safe: false, reason: "Danger: This looks like a virus download!" };
    }

    // Otherwise, looks okay!
    return { safe: true, reason: "Safe: Link looks secure." };
}

// 3. The Scanning Route (Where the magic happens)
app.post('/scan', upload.single('file'), (req, res) => {
    
    // If no file was sent
    if (!req.file) {
        return res.status(400).send("No file uploaded.");
    }

    const filePath = req.file.path;

    // Use JIMP to read the image
    Jimp.read(fs.readFileSync(filePath), function(err, image) {
        if (err) {
            console.error(err);
            return res.status(500).send("Could not read image.");
        }

        // Use QRCode Reader to find the code
        const qr = new QrCode();
        
        qr.callback = function(err, value) {
            if (err) {
                console.error(err);
                // Clean up: Delete the file if we failed
                fs.unlinkSync(filePath); 
                return res.status(500).send("Could not find a QR code in this image.");
            }

            // We found a QR Code!
            const foundUrl = value.result;
            console.log("Found URL:", foundUrl);

            // Let's check if it is safe
            const safetyReport = checkSafety(foundUrl);

            // Send the report back to the user
            res.send({
                url: foundUrl,
                isSafe: safetyReport.safe,
                message: safetyReport.reason
            });

            // Clean up: Delete the image from the folder now that we are done
            fs.unlinkSync(filePath); 
        };
        
        // Start decoding
        qr.decode(image.bitmap);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});