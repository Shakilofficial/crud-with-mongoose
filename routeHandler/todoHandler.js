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
