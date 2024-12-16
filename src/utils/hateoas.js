const generateHATEOAS = (joyas) => {
    return joyas.map((joya) => ({
        id: joya.id,
        nombre: joya.nombre,
        categoria: joya.categoria,
        metal: joya.metal,
        precio: joya.precio,
        stock: joya.stock,
        links: [
            {
                rel: 'self',
                href: `/joyas/${joya.id}`,
            },
        ],
    }));
};

const prepararHATEOAS = (joyas) => {
    const results = joyas.map((m) => {
        return {
            name: m.nombre,
            href: `/joyas/joya/${m.id}`,
        }
    }).slice(0, 4)
    const total = joyas.length
    const HATEOAS = {
        total,
        results
    }
    return HATEOAS
}

module.exports = { generateHATEOAS, prepararHATEOAS }