const Task = require('../models/tasks')
const getAllTasks = async (req, res) => {
    try {
        const task = await Task.find({})
        res.status(200).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).json({ task })
    }
    catch (err) {
        res.status(500).json({ msg: err })
    }
}

const getTasks = async (req, res) => {
    try {
        const { id: taskid } = req.params
        const task = await Task.findOne({ _id: taskid })
        if (!task) {
            return res.status(404).json({ msg: `No task with given ID` })
        }
        res.status(200).json({ task })
    } catch (error) {
        res.status(500).json({ msg: err })
    }
}

const updateTask = async (req, res) => {
    try {
        const { id: taskid } = req.params
        const task = await Task.findOneAndUpdate({ _id: taskid }, req.body, {
            new: true, runValidators: true,
        })
        res.status(200).json({ id: taskid, data: req.body })
    }
    catch (error) {
        res.status(500).json({ msg: err })
    }
}

const deleteTask = async (req, res) => {
    try {
        const { id: taskid } = req.params
        const task = await Task.findOneAndDelete({ _id: taskid })
        if (!task) {
            return res.status(404).json({ msg: `No task with given ID` })
        }
        res.status(200).send()
    }
    catch (error) {
        res.status(500).json({ msg: err })
    }
}
module.exports = {
    getAllTasks, createTask, getTasks, updateTask, deleteTask
}