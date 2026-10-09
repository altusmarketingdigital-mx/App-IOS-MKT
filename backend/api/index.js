let appHandler;
let fatalError = null;

try {
    const expressApp = require('../dist/index.js');
    appHandler = expressApp.default || expressApp;
} catch (e) {
    fatalError = e;
}

module.exports = function (req, res) {
    if (fatalError) {
        return res.status(500).json({
            error: "FATAL_CRASH_ON_STARTUP",
            message: fatalError.message,
            stack: fatalError.stack
        });
    }
    return appHandler(req, res);
};
