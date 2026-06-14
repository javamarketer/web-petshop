const { Op } = require('sequelize');
const db = require('../models');
const { successResponse, errorResponse, paginatedResponse } = require('../utils/response');
const { PAGINATION } = require('../config/constants');
const logger = require('../utils/logger');

const { Petshop, Product } = db;

/**
 * Get all petshops with pagination and filtering
 */
exports.getAllPetshops = async (req, res, next) => {
  try {
    const { page = PAGINATION.DEFAULT_PAGE, limit = PAGINATION.DEFAULT_LIMIT, city, search } = req.query;

    // Validate pagination
    const pageNum = Math.max(1, parseInt(page, 10) || PAGINATION.DEFAULT_PAGE);
    const limitNum = Math.min(
      parseInt(limit, 10) || PAGINATION.DEFAULT_LIMIT,
      PAGINATION.MAX_LIMIT
    );

    // Build filter
    const where = { is_active: true };

    if (city) {
      where.city = city;
    }

    if (search) {
      where[Op.or] = [
        { name: { [Op.like]: `%${search}%` } },
        { address: { [Op.like]: `%${search}%` } },
      ];
    }

    // Fetch petshops
    const { count, rows } = await Petshop.findAndCountAll({
      where,
      limit: limitNum,
      offset: (pageNum - 1) * limitNum,
      order: [['name', 'ASC']],
      attributes: [
        'id',
        'name',
        'address',
        'city',
        'phone',
        'email',
        'latitude',
        'longitude',
        'opening_time',
        'closing_time',
        'image_url',
      ],
    });

    logger.info('Fetched petshops', { page: pageNum, limit: limitNum, total: count });

    res.json(paginatedResponse(rows, pageNum, limitNum, count));
  } catch (error) {
    next(error);
  }
};

/**
 * Get petshop by ID with products
 */
exports.getPetshopById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const petshop = await Petshop.findByPk(id, {
      include: [
        {
          model: Product,
          as: 'products',
          attributes: [
            'id',
            'name',
            'category',
            'brand',
            'price',
            'stock',
            'image_url',
            'is_available',
          ],
        },
      ],
    });

    if (!petshop) {
      logger.warn('Petshop not found', { id });
      return res.status(404).json(
        errorResponse('Petshop not found', null, 404)
      );
    }

    logger.info('Fetched petshop detail', { id });

    res.json(successResponse(petshop));
  } catch (error) {
    next(error);
  }
};

/**
 * Create new petshop (for admin - future use)
 */
exports.createPetshop = async (req, res, next) => {
  try {
    const {
      name,
      description,
      address,
      city,
      phone,
      email,
      latitude,
      longitude,
      opening_time,
      closing_time,
      image_url,
    } = req.body;

    const petshop = await Petshop.create({
      name,
      description,
      address,
      city,
      phone,
      email,
      latitude,
      longitude,
      opening_time,
      closing_time,
      image_url,
      is_active: true,
    });

    logger.info('Petshop created', { id: petshop.id, name: petshop.name });

    res.status(201).json(
      successResponse(petshop, null, 'Petshop created successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Update petshop (for admin - future use)
 */
exports.updatePetshop = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const petshop = await Petshop.findByPk(id);

    if (!petshop) {
      return res.status(404).json(
        errorResponse('Petshop not found', null, 404)
      );
    }

    await petshop.update(updates);

    logger.info('Petshop updated', { id });

    res.json(
      successResponse(petshop, null, 'Petshop updated successfully')
    );
  } catch (error) {
    next(error);
  }
};

/**
 * Delete petshop (for admin - future use)
 */
exports.deletePetshop = async (req, res, next) => {
  try {
    const { id } = req.params;

    const petshop = await Petshop.findByPk(id);

    if (!petshop) {
      return res.status(404).json(
        errorResponse('Petshop not found', null, 404)
      );
    }

    await petshop.destroy();

    logger.info('Petshop deleted', { id });

    res.json(
      successResponse(null, null, 'Petshop deleted successfully')
    );
  } catch (error) {
    next(error);
  }
};
