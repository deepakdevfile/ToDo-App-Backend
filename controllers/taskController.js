const getTasks = (req, res) => {
    res.status(200).json({ message: 'Get All Tasks' });
}

const setTasks = (req, res) => {
    if(!req.body.text){
        res.status(400)
        throw new Error('Please enter a task')
    }
    res.status(200).json({ message: "Create Task" });
}

const updateTasks = (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} updated.` });
}

const deleteTasks = (req, res) => {
    res.status(200).json({ message: `Task ${req.params.id} deleted.` });
}

export {getTasks, setTasks, updateTasks, deleteTasks};