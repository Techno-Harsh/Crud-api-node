const Note = require('../models/node.model');

const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.userId }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: notes.length, data: notes });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching notes', error: error.message });
  }
};

const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({ _id: req.params.id, userId: req.userId });
    if (!note) return res.status(404).json({ success: false, message: 'Note not found or access denied' });
    res.status(200).json({ success: true, data: note });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching note', error: error.message });
  }
};

const createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) return res.status(400).json({ success: false, message: 'Please provide title and content' });

    const newNote = await Note.create({ title, content, userId: req.userId });
    res.status(201).json({ success: true, message: 'Note created successfully', data: newNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error creating note', error: error.message });
  }
};

const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title && !content) return res.status(400).json({ success: false, message: 'Provide title or content to update' });

    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) return res.status(404).json({ success: false, message: 'Note not found or access denied' });
    res.status(200).json({ success: true, message: 'Note updated successfully', data: updatedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error updating note', error: error.message });
  }
};

const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, userId: req.userId });
    if (!deletedNote) return res.status(404).json({ success: false, message: 'Note not found or access denied' });
    res.status(200).json({ success: true, message: 'Note deleted successfully', data: deletedNote });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error deleting note', error: error.message });
  }
};

module.exports = {
  getAllNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote
};
