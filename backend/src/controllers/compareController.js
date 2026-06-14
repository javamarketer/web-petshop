const { Op } = require('sequelize');
const db = require('../models');
const { successResponse, errorResponse } = require('../utils/response');
const logger = require('../utils/logger');

const { Product, Petshop } = db;

/**
 * Compare product prices across petshops
 */
exports.compareProductPrice = async (req, res, next) => {
  try {
    const { product_name, product_id } = req.query;

    // Validate input
    if (!product_name && !product_id) {
      return res.status(400).json(
        errorResponse('product_name or product_id is required', null, 400)
      );
    }

    let where = {};

    if (product_id) {
      where.id = product_id;
    } else if (product_name) {
      where.name = {
        [Op.like]: `%${product_name}%`,
      };
    }

    // Fetch products with petshop info
    const products = await Product.findAll({
      where,
      include: [
        {
          model: Petshop,
          as: 'petshop',
          attributes: ['id', 'name', 'phone', 'address', 'city'],
        },
      ],
      order: [['price', 'ASC']],
    });

    if (!products || products.length === 0) {
      logger.warn('No products found for comparison', { product_name, product_id });
      return res.status(404).json(
        errorResponse('Product not found', null, 404)
      );
    }

    // Build comparison response
    const comparison = products.map((p) => ({
      product_id: p.id,
      petshop_id: p.petshop.id,
      petshop_name: p.petshop.name,
      price: parseFloat(p.price),
      stock: p.stock,
      is_available: p.is_available,
      phone: p.petshop.phone,
      address: p.petshop.address,
      city: p.petshop.city,
    }));

    // Calculate price statistics
    const prices = comparison.map((c) => c.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);

    const responseData = {
      product_name: products[0].name,
      product_category: products[0].category,
      product_brand: products[0].brand,
      comparison,
      price_range: {
        min: minPrice,
        max: maxPrice,
        average: avgPrice,
        savings: maxPrice - minPrice,
      },
    };

    logger.info('Price comparison retrieved', {
      product_name: products[0].name,
      count: products.length,
    });

    res.json(successResponse(responseData));
  } catch (error) {
    next(error);
  }
};

/**
 * Get top cheapest products across all petshops
 */
exports.getTopCheapestProducts = async (req, res, next) => {
  try {
    const { limit = 10 } = req.query;

    const products = await Product.findAll({
      where: { is_available: true },
      include: [
        {
          model: Petshop,
          as: 'petshop',
          attributes: ['id', 'name', 'city'],
        },
      ],
      order: [['price', 'ASC']],
      limit: parseInt(limit, 10) || 10,
    });

    logger.info('Fetched top cheapest products', { count: products.length });

    res.json(successResponse(products));
  } catch (error) {
    next(error);
  }
};
