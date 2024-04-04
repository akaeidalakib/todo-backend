const express = require('express');
const { PostTask, getTasks, getTaskByID, UpdateTaskByID, DeleteTaskByID } = require('../controllers/task.controller');
const router = express.Router();

router.route('/').post(PostTask).get(getTasks);
router.route('/:id').get(getTaskByID).patch(UpdateTaskByID).delete(DeleteTaskByID);

module.exports = router;