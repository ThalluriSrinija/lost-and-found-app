import Item from "../models/Item.js";

// @desc    Get all items (with optional 'type' filter)
// @route   GET /api/items
// @access  Public
export const getItems = async (req, res) => {
  try {
    const { type } = req.query;
    let query = {};
    if (type) {
      query.type = type;
    }
    const items = await Item.find(query).sort({ createdAt: -1 });
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Get single item
// @route   GET /api/items/:id
// @access  Public
export const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Create a new item
// @route   POST /api/items
// @access  Public
export const createItem = async (req, res) => {
  try {
    const { title, description, type, date, location, contact, imageUrl, userEmail } = req.body;

    if (!title || !description || !type || !date || !location || !contact || !userEmail) {
      return res.status(400).json({ message: "Please provide all required fields" });
    }

    const item = new Item({
      title,
      description,
      type,
      date,
      location,
      contact,
      imageUrl,
      userEmail,
    });

    const createdItem = await item.save();
    res.status(201).json(createdItem);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Public
export const deleteItem = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    
    await Item.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Item removed" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
