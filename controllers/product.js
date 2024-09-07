const { PrismaClient } = require('@prisma/client');
const { serve } = require('swagger-ui-express');
const prisma = new PrismaClient();

const createProduct = async (req, res) => {
    const { product_id, name, description , price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.create({
            data: {
                product_id,
                name,
                description,
                price,
                category,
                image_url
            }
        });
        res.status(200).json(prod);
    } catch (err) {        
        res.status(500).json(err);
    }
};

const updateProduct = async (req, res) => {
    const { id, name, description, price, category, image_url } = req.body;
    try {
        const prod = await prisma.products.update({
            data: {
                name,
                description,
                price,
                category,
                image_url
            },
            where: { product_id: Number(id) }
        });
        res.status(200).json(prod);
    } catch (err) {
        res.status(500).json(err);
    }
};


const deleteProduct = async (req,res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.products.delete({
            where: {
                product_id: Number(id),
            },
        })
        res.status(200).json(cust);
    } catch (err) {
        res.status(500).json(err);
    }
}

const getProducts = async (req,res) => {
    const custs = await prisma.products.findMany()
    res.json(custs)
};

const getProduct = async (req,res) => {
    const id = req.params.id;
    try {
        const cust = await prisma.products.findUnique({
            where: { product_id: Number(id) },
        });
        if (!cust) {
            res.status(404).json({'message': 'Product not found!!!!!!'});
        } else {
            res.status(200).json(cust);
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getProductsByTerm = async (req, res) => {
    const searchString = req.params.term;
    try {
        const products = await prisma.products.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: searchString
                        }
                    },
                    {
                        category: {
                            contains: searchString
                        }
                    }
                ]
            }
        });
        if (!products || products.length === 0) {
            res.status(404).json({ message: 'Product not found!' });
        } else {
            res.status(200).json(products);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
};

module.exports = { createProduct, getProduct, getProducts, updateProduct, deleteProduct, getProductsByTerm };