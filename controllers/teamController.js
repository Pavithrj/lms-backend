const Team = require('../models/Team');

exports.createTeamMember = async (req, res) => {
    try {
        const { pic, name, description, content } = req.body;

        const existingMember = await Team.findOne({ name });

        if (existingMember) {
            return res.status(400).json({
                success: false,
                message: "Team member with this name already exists"
            });
        }

        const newMember = new Team({ pic, name, description, content });
        await newMember.save();

        res.status(201).json({
            success: true,
            message: "Team member added successfully",
            data: newMember
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: "Failed to add team member"
        });
    }
};

exports.deleteTeamMember = async (req, res) => {
    try {
        const { id } = req.params;

        const member = await Team.findById(id);

        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        await Team.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Team member deleted successfully"
        });
    } catch (error) {
        console.error(error);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: "Invalid team member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to delete team member"
        });
    }
};

exports.getAllTeamMembers = async (req, res) => {
    try {
        const team = await Team.find();
        res.status(200).json({ success: true, count: team.length, data: team });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Failed to fetch team members" });
    }
};

exports.updateTeamMember = async (req, res) => {
    try {
        const { id } = req.params;
        const updateData = req.body;

        const member = await Team.findById(id);
        if (!member) {
            return res.status(404).json({
                success: false,
                message: "Team member not found"
            });
        }

        if (updateData.name && updateData.name !== member.name) {
            const existing = await Team.findOne({ name: updateData.name });
            if (existing) {
                return res.status(400).json({
                    success: false,
                    message: "Another team member with this name already exists"
                });
            }
        }

        const updatedMember = await Team.findByIdAndUpdate(
            id,
            { $set: updateData },
            { new: true, runValidators: true }
        );

        res.status(200).json({
            success: true,
            message: "Team member updated successfully",
            data: updatedMember
        });
    } catch (error) {
        console.error(error);

        if (error.kind === 'ObjectId') {
            return res.status(400).json({
                success: false,
                message: "Invalid team member ID"
            });
        }

        res.status(500).json({
            success: false,
            message: "Failed to update team member"
        });
    }
};
