import express from "express";
import ContentModel from "../models/contentModel.mjs";

const router = express.Router();

router.post("/api/update-content", async (req, res) => {
  const { component, content } = req.body;

  try {
    // Find the component and update it, or create a new document if it doesn't exist
    await ContentModel.findOneAndUpdate(
      { component }, // Find the document by component
      { content }, // Overwrite content with new value
      { upsert: true, new: true } // Create the document if it doesn't exist
    );

    res.status(200).json({ message: "Content updated successfully" });
  } catch (error) {
    console.error("Error updating content:", error);
    res.status(500).json({ message: "Error updating content" });
  }
});

export default router;
