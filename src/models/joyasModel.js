const format = require('pg-format');
const { DB } = require("../config/db")

const obtenerJoyas = async (limit = 6, order_by = 'id_ASC', page = 1) => {
    try {
        const [campo, direccion] = order_by.split("_") //id_ASC => ['id', 'ASC']
        const offset = Math.abs((page -1) * limit)

        console.log(offset)
        const SQLQuery = format(`
            SELECT * FROM inventario 
            ORDER BY %s %s
            LIMIT %s 
            OFFSET %s`
            , campo, 
            direccion, 
            limit,
            offset
        )

        const { rowCount, rows } = await DB.query(SQLQuery)
        const { rowCount: count } = await DB.query('SELECT * FROM inventario')

        return {
            rowCount,
            pages: Math.ceil(count / limit),
            page: page,
            rows
        }
    } catch (error) {
        throw error
    }
}

const obtenerJoyaPorId = async (id) => {
    try {
        console.log(`Obteniendo joya con ID: ${id}`)
        const SQLQuery = format(`
            SELECT * FROM inventario WHERE id = %s
            `, id)
        console.log("Consulta generada:", SQLQuery)

        const { rows } = await DB.query(SQLQuery)

        console.log("Resultado de la consulta:", rows)

        if (!id) {
            throw new Error('joyaNoEncontrada')
        }

        if (rows.length === 0) {
            throw new Error('joyaNoEncontrada')
        }
        return rows[0]
    } catch (error) {
        console.error("Error al obtener la joya:", error)
        throw error
    }
}

const obtenerJoyasFiltradas = async ( precio_min, precio_max, categoria, metal ) => {
    try {
        const SQLQuery = handleGetFilters(precio_min, precio_max, categoria, metal)

        const { rows, rowCount } = await DB.query(SQLQuery)
        return { 
            rowCount,
            rows
        }
    } catch (error) {
        throw error
    }
}

const handleGetFilters = (precio_min = '', precio_max = '', categoria = '', metal = '') => {
    let filtros = []

    if (precio_max) filtros.push(`precio <= ${precio_max}`)
    if (precio_min) filtros.push(`precio >= ${precio_min}`)
    if (categoria) filtros.push(`categoria = '${categoria}'`)
    if (metal) filtros.push(`metal = '${metal}'`)
    
    let consulta = "SELECT * FROM inventario"

    if (filtros.length) {
        filtros = filtros.join(" AND ")
        consulta += ` WHERE ${filtros}`
    }
    console.log("Consulta generada:", consulta);
    return consulta
}

module.exports = { obtenerJoyas, obtenerJoyaPorId,obtenerJoyasFiltradas }