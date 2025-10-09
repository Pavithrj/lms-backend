const express = require('express');
const router = express.Router();
const { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } = require('../controllers/teamController');

router.post('/add', createTeamMember);

router.delete('/delete/:id', deleteTeamMember);

router.get('/all', getAllTeamMembers);

router.put('/update/:id', updateTeamMember);

module.exports = router;
