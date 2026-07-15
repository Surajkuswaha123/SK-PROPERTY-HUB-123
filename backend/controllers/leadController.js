const ExcelJS = require("exceljs");
const pool = require("../db/database");
const sendLeadNotification = require("../services/emailService");

const createLead = async (req, res) => {
    try {

        const {
            name,
            mobile,
            email,
            city,
            requirement,
            message
        } = req.body;

        const result = await pool.query(
            `INSERT INTO leads
            (name,mobile,email,city,requirement,message)
            VALUES($1,$2,$3,$4,$5,$6)
            RETURNING *`,
            [
                name,
                mobile,
                email,
                city,
                requirement,
                message
            ]
        );
        await sendLeadNotification({
            name,
            mobile,
            email,
            city,
            requirement,
            message
        });

        res.status(201).json({
            success: true,
            data: result.rows[0]
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });
    }
};

const getAllLeads = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM leads ORDER BY id DESC"
        );

        res.status(200).json({
            success: true,
            data: result.rows
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const deleteLead = async (req, res) => {

    try {

        const { id } = req.params;

        await pool.query(
            "DELETE FROM leads WHERE id = $1",
            [id]
        );

        res.status(200).json({
            success: true,
            message: "Lead Deleted"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Server Error"
        });

    }

};

const exportLeads = async (req, res) => {

    try {

        const result = await pool.query(
            "SELECT * FROM leads ORDER BY id DESC"
        );

        const workbook =
            new ExcelJS.Workbook();

        const worksheet =
            workbook.addWorksheet("Leads");

        worksheet.columns = [
            {
                header: "ID",
                key: "id",
                width: 10
            },
            {
                header: "Name",
                key: "name",
                width: 25
            },
            {
                header: "Mobile",
                key: "mobile",
                width: 20
            },
            {
                header: "Email",
                key: "email",
                width: 30
            },
            {
                header: "City",
                key: "city",
                width: 20
            },
            {
                header: "Requirement",
                key: "requirement",
                width: 25
            },
            {
                header: "Message",
                key: "message",
                width: 40
            }
        ];

        result.rows.forEach((lead) => {
            worksheet.addRow(lead);
        });

        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );

        res.setHeader(
            "Content-Disposition",
            "attachment; filename=leads.xlsx"
        );

        await workbook.xlsx.write(res);

        res.end();

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: "Export Failed"
        });

    }

};

module.exports = {
    createLead,
    getAllLeads,
    deleteLead,
    exportLeads
};