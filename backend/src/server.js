require('dotenv').config();
const app = require('./app');
const db = require('./models');
const logger = require('./utils/logger');

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';

let server;

/**
 * Start server with database sync
 */
const startServer = async () => {
  try {
    // Sync database
    logger.info('Syncing database...');
    await db.sequelize.sync({ alter: false });
    logger.info('✅ Database synced successfully');

    // Start server
    server = app.listen(PORT, () => {
      logger.info(`
╔════════════════════════════════════════╗
║  PetShop Jogja Finder - Backend API    ║
║  Version: 1.0.0                        ║
║  Environment: ${NODE_ENV.padEnd(28)} ║
║  Port: ${PORT.toString().padEnd(34)} ║
║  Status: Running ✅                    ║
╚════════════════════════════════════════╝
      `);
    });

    // Handle graceful shutdown
    process.on('SIGTERM', () => {
      logger.info('SIGTERM received, shutting down gracefully...');
      server.close(() => {
        logger.info('Server closed');
        db.sequelize.close();
        process.exit(0);
      });
    });

    process.on('SIGINT', () => {
      logger.info('SIGINT received, shutting down gracefully...');
      server.close(() => {
        logger.info('Server closed');
        db.sequelize.close();
        process.exit(0);
      });
    });
  } catch (error) {
    logger.error('Failed to start server', error);
    process.exit(1);
  }
};

startServer();

module.exports = server;
