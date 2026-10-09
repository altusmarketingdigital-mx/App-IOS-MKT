export default function (req: any, res: any) {
    res.status(200).json({ 
        message: "¡Vercel está vivo! El problema 500 era causado por los archivos de la Base de Datos.",
        instruction: "Por favor, tómale captura a esto y envíamela."
    });
}
