import mongoose from "mongoose";

const taskSchema = mongoose.Schema(
    { text: {type: String, required: [true, 'Please add a text value']}},
    { timestamps: true}
)

const Task = mongoose.model("Task", taskSchema);

export {Task}