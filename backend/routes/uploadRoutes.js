import express from "express";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

// 📂 Get correct directory path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 🧩 Multer setup
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, path.join(__dirname, "../uploads/products"));
  },
  filename(req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// 📸 Route: POST /api/upload
router.post("/", upload.single("image"), (req, res) => {
  res.json({
    message: "File uploaded successfully",
    filePath: `/uploads/products/${req.file.filename}`,
  });
});

export default router;
