const PRODUCT_CATEGORIES = [
  'Makanan Kucing',
  'Makanan Anjing',
  'Makanan Hewan Lain',
  'Pasir Kucing',
  'Vitamin & Suplemen',
  'Kandang & Rumah',
  'Aksesoris & Mainan',
  'Grooming',
];

const DIY_CITIES = [
  'Yogyakarta Kota',
  'Sleman',
  'Bantul',
  'Gunungkidul',
  'Kulon Progo',
];

const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  CONFLICT: 409,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
};

const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 100,
};

module.exports = {
  PRODUCT_CATEGORIES,
  DIY_CITIES,
  HTTP_STATUS,
  PAGINATION,
};
