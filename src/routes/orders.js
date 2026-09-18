const express = require('express');
const router = express.Router();
const { queryDb } = require('../db');

router.get('/', async (req, res) => {
  req.log.info("starting fetching orders");
  try {
    const result = await queryDb(req.log, 'SELECT * FROM orders', []);
    req.log.info("ok fetched orders");
    res.json(result.rows);
  } catch (err) {
    req.log.error("oops fetching orders", { err: err.message });
    res.status(500).send('Error fetching orders');
  }
});

router.post('/', async (req, res) => {
  req.log.info("starting order creation");
  const { product_id, quantity, customer_id } = req.body;
  
  if (!product_id || !quantity || !customer_id) {
    req.log.warn("try again, missing fields", { product_id, quantity, customer_id });
    return res.status(400).send('Missing fields');
  }

  try {
    const result = await queryDb(
      req.log,
      'INSERT INTO orders (product_id, quantity, customer_id) VALUES ($1, $2, $3) RETURNING *',
      [product_id, quantity, customer_id]
    );
    req.log.info("done creating order");
    res.status(201).json(result.rows[0]);
  } catch (err) {
    req.log.error("error happened creating order", { err: err.message });
    res.status(500).send('Error creating order');
  }
});

module.exports = router;
