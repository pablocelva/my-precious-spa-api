const { obtenerJoyas, obtenerJoyaPorId, obtenerJoyasFiltradas } = require('../models/joyasModel');
const { generateHATEOAS } = require('../utils/hateoas');


const getAll = async(req, res, next) => {
    try {
        const { limit, order_by, page } = req.query
        
        const response = await obtenerJoyas(limit, order_by, page)
        
        if (response.rowCount === 0) {
            return res.status(404).json({ error: "No se encontraron joyas" });
        }
        
        //const hateoas = generateHATEOAS(response.rows);
        const hateoas = generateHATEOAS(response.rows, `${req.protocol}://${req.get('host')}/joyas`);

        console.log("Hateoas generadas:", hateoas)

        res.status(200).json({
            msg: "Lista de Joyas",
            totalJoyas: response.rowCount,
            stockTotal: response.rows.reduce((acc, joya) => acc + joya.stock, 0),
            page: response.page,
            totalPages: response.pages,
            data: hateoas
        })
    } catch (error) {
        next(error)
    }
}

const getById = async(req, res, next) => {
    try {
        const { id } = req.params
        const joya = await obtenerJoyaPorId(id)
        console.log("Joya obtenida:", joya)
        
        if (!joya) {
            return res.status(404).json({ error: "Joya no encontrada" });
        }
        res.status(200).json(joya)
/*
        const hateoas = generateHATEOAS(joya, `${req.protocol}://${req.get('host')}/joyas`);

        console.log("Hateoas generadas:", hateoas)
        res.json({
            msg: "Joya Encontrada",
            data: hateoas
        })*/
    } catch (error) {
        next(error)
    }
}

const getFiltered = async(req, res, next) => {
    try {
        const { precio_min, precio_max, categoria, metal } = req.query
        const response = await obtenerJoyasFiltradas(precio_min, precio_max, categoria, metal)
        
        const hateoas = generateHATEOAS(response.rows, `${req.protocol}://${req.get('host')}/joyas/filtered`);

        res.json({
            msg: "Lista de Joyas Filtrada",
            totalJoyas: response.rowCount,
            stockTotal: response.rows.reduce((acc, joya) => acc + joya.stock, 0),
            //pages: response.pages,
            data: hateoas
        })
    } catch (error) {
        next(error)
    }
}

module.exports = {
    getAll,
    getById,
    getFiltered
}

