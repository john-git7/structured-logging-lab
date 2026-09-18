const processPayment = (logger) => {
  logger.info("payment");
  // Simulate some payment processing
  setTimeout(() => {
    logger.info("done");
  }, 500);
};

module.exports = { processPayment };
