const { Op } = require('sequelize');
const db = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { PAGINATION } = require('../config/constants');
const logger = require('../utils/logger');

const { Product, Petshop } = db;

/**
 * Get all products with pagination, search, and filtering
 */
exports.getAllProducts = async (req, res, next) => {
  try {
    const {
      page = PAGINATION.DEFAULT_PAGE,
      limit = PAGINATION.DEFAULT_LIMIT,
      category,
      brand,
      search,
      petshop_id,
      sort_by = 'created_at',
      sort_order = 'DESC',
    } = req.query;

    // Validate pagination
    const pageNum = Math.max(1, parseInt(page, 10) || PAGINATION.DEFAULT_PAGE);
    const limitNum = Math.min(
      parseInt(limit, 10) || PAGINATION.DEFAULT_LIMIT,
      PAGINATION.MAX_LIMIT
    );

    // Build filter
    const where = { is_available: true };

    if (category) {
      where.category = category;
    }

    if (brand) {
      where.brand = brand;
    }

    if (petshop_id) {
      where.petshop_id = petshop_id;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { brand: { [Op.like]: `%${search}%` } },
      ];
    }

    // Fetch products
    const { count, rows } = await Product.findAndCountAll({
      where,
      include: [
        {
          model: Petshop,
          as: 'petshop',
          attributes: ['id', 'name', 'phone', 'address', 'city'],
        },
      ],
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
      order: [[sort_by === 'price' ? 'price' : sort_by, sort_order.toUpperCase()]],
    });

    logger.info('Fetched products', { page: pageNum, limit: limitNum, total: count });

    res.json(paginatedResponse(rows, pageNum, limitNum, count));
  } catch (error) {
    next(error);
  }
};

/**
 * Get product by ID
 */
exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id, {
      include: [
        {
          model: Petshop,
          as: 'petshop',
          attributes: ['id', 'name', 'phone', 'address', 'city', 'email'],
        },
      ],
    });

    if (!product) {
      logger.warn('Product not found', { id });
      return res.status(404).json(
        errorResponse('Product not found', null, 404)
      );
    }

    logger.info('Fetched product detail', { id });

    res.json(successResponse(product));
  } catch (error) {
    next(error);
  }
};

/**
 * Get product categories and brands for filters
 */
exports.getFilters = async (req, res, next) => {
  try {
    const categories = await Product.findAll({
      attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('category')), 'category']],
      raw: true,
    });

    const brands = await Product.findAll({
      attributes: [[db.sequelize.fn('DISTINCT', db.sequelize.col('brand')), 'brand']],
      raw: true,
      where: {
        brand: {
          [Op.not]: null,
        },
      },
    });

    const filters = {
      categories: categories.map((c) => c.category).filter(Boolean),
      brands: brands.map((b) => b.brand).filter(Boolean),
    };

    logger.info('Fetched filter options');

    res.json(successResponse(filters));
  } catch (error) {
    next(error);
  }
};

/**
 * Create new product (for admin - future use)
 */
exports.createProduct = async (req, res, next) => {
  try {
    const {
      petshop_id,
      name,
      description,
      category,
      brand,
      price,
      stock,
      image_url,
    } = req.body;

    // Check petshop exists
    const petshop = await Petshop.findByPk(petshop_id);
    if (!petshop) {
      return res.status(404).json(
        errorResponse('Petshop not found', null, 404)
      );
    }

    const product = await Product.create({
      petshop_id,
      name,
      description,
      category,
      brand,
      price,
      stock,
      image_url,
      is_available: true,
    });

    logger.info('Product created', { id: product.id, name: product.name });

    res.status(201).json(
      successResponse(product, null, 'Product created successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update product (for admin - future use)
 */
exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json(
        errorResponse('Product not found', null, 404)
      );
    }

    await product.update(updates);

    logger.info('Product updated', { id });

    res.json(
      successResponse(product, null, 'Product updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete product (for admin - future use)
 */
exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json(
        errorResponse('Product not found', null, 404)
      );
    }

    await product.destroy();

    logger.info('Product deleted', { id });

    res.json(
      successResponse(null, null, 'Product deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
