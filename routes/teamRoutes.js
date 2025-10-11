const express = require('express');
const { createTeamMember, deleteTeamMember, getAllTeamMembers, updateTeamMember } = require('../controllers/teamController');

const router = express.Router();

router.post("/add", createTeamMember);

router.delete("/delete/:id", deleteTeamMember);

router.get("/all", getAllTeamMembers);

router.put("/update/:id", updateTeamMember);

module.exports = router;
