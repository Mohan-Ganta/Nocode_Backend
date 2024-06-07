const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require('cors')

const app = express();
app.use(cors())
const PORT = 4000;

// Configure Multer storage
const storage = multer.diskStorage({
  destination: "D:/VTS PROS/NoCodePortfolio/frontend/src/assets/profileImages/", // Destination folder for uploaded images
  filename: (req, file, cb) => {
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  },
});

const upload = multer({ storage: storage });

// Route to handle image upload
app.post("/upload", upload.single("image"), (req, res) => {
  try {
    if (req.file) {
      console.log(`Uploaded image: ${req.file.filename}`);
      const imageUrl = `http://localhost:${PORT}/images/${req.file.filename}`;
      res.json({ message: "Image uploaded successfully!", image_url: imageUrl });
    } else {
      res.status(400).json({ message: "No image uploaded" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error uploading file" });
  }
});

// Optional: Route to serve uploaded images
app.use("/images", express.static("D:/VTS PROS/NoCodePortfolio/frontend/src/assets/profileImages/"));

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
