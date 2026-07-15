const express = require("express");

const router = express.Router();

const {
    createLead,
    getAllLeads,
    deleteLead,
    exportLeads
} = require("../controllers/leadController");

router.get("/", getAllLeads);

router.get("/export", exportLeads);

router.post("/", createLead);

router.delete("/:id", deleteLead);

module.exports = router;