const registrarReporte = (req, res, next) => {
    const fecha = new Date().toISOString();
    console.log(`[${fecha}] Ruta consultada: ${req.originalUrl}`);
    next();
};

module.exports = registrarReporte;