const db = require('./database');
const seoScan = require('./seoScan');
const accessibilityScan = require('./accessibilityScan');
const securityScan = require('./securityScan - Copy');
const performanceScan = require('./performanceScan');


exports.runAudit = async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    const securityResults = await securityScan(url);
    const performanceResults = await performanceScan(url);
    const seoResults = await seoScan(url);
    const accessibilityResults = await accessibilityScan(url);

    const auditReport = { 
        securityResults, 
        performanceResults, 
        seoResults, 
        accessibilityResults 
    };

    // Save audit to SQLite
    db.run(
        "INSERT INTO audits (website_url, report) VALUES (?, ?)",
        [url, JSON.stringify(auditReport)],
        (err) => {
            if (err) console.error('Error saving audit:', err.message);
            else console.log('Audit saved successfully');
        }
    );

    res.json(auditReport);
};
