let appHandler: any;
let fatalError: any = null;

try {
    // Importación dinámica para atrapar errores de raíz
    const expressApp = require('../src/index');
    appHandler = expressApp.default || expressApp;
} catch (e: any) {
    fatalError = e;
}

export default function (req: any, res: any) {
    if (fatalError) {
        return res.status(500).json({
            error: "FATAL_CRASH_ON_STARTUP",
            message: fatalError.message,
            stack: fatalError.stack
        });
    }
    return appHandler(req, res);
}
