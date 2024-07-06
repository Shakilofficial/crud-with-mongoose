const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schemas/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// GET ALL THE TODOS
router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});

// Get all todos with status 'active'
router.get("/active", async (req, res) => {
  try {
    const todos = await Todo.find({ status: "active" });
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});

// Get a single todo by title
router.get("/title/:title", async (req, res) => {
  try {
    const todo = await Todo.findOne({ title: req.params.title });
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});


//GET A TODO BY ID
router.get("/:id", async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});




// POST A TODO
router.post("/", async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({
      message: "Todo was inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

//POST MULTIPLE TODO
router.post("/all", async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({
      message: "Todos were inserted successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});



// Replace todos with status 'inactive' with new data
router.put("/replaceInactive", async (req, res) => {
  try {
    await Todo.replaceOne({ status: "inactive" }, req.body);
    res.status(200).json({ message: "Inactive todo was replaced successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});


// Update all todos with status 'inactive' to 'active'
router.put("/updateInactive", async (req, res) => {
  try {
    await Todo.updateMany(
      { status: "inactive" },
      { status: "active" }
    );
    res.status(200).json({ message: "All inactive todos were updated to active successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});


// UPDATE A TODO
router.put("/:id", async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      {
        $set: { status: "inactive" },
      }
    );
    res.status(200).json({
      message: "Todo status was updated to active successfully",
    });
  } catch (err) {
    res.status(500).json({
      error: "There was a server side error!",
    });
  }
});

// Update a single todo's status by title
router.put("/updateOne/:title", async (req, res) => {
  try {
    await Todo.updateOne(
      { title: req.params.title },
      { status: "active" }
    );
    res.status(200).json({ message: "Todo status was updated to active successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});


// Update a single todo's status by title
router.put("/title/:title", async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { title: req.params.title },
      { status: "active" },
      { new: true }
    );
    res.status(200).json({ message: "Todo status was updated to active successfully", todo });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});




// Replace a single todo by title
router.put("/replace/:title", async (req, res) => {
  try {
    const todo = await Todo.findOneAndReplace(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    res.status(200).json({ message: "Todo was replaced successfully", todo });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});


// Delete a single todo by title
router.delete("/title/:title", async (req, res) => {
  try {
    await Todo.deleteOne({ title: req.params.title });
    res.status(200).json({ message: "Todo was deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});


// Delete all todos with status 'inactive'
router.delete("/inactive", async (req, res) => {
  try {
    await Todo.deleteMany({ status: "inactive" });
    res.status(200).json({ message: "All inactive todos were deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});

// DELETE A TODO
router.delete("/:id", async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Todo was deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "There was a server side error!" });
  }
});



module.exports = router;
