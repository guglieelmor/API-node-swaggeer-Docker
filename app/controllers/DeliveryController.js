const jwt = require('jsonwebtoken');
const Delivery = require('../models/Delivery');
const Invoice = require('../models/Invoice');
/**
 * @swagger
 * tags:
 *   name: Delivery
 *   description: API de Entrega
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryCreate:
 *       type: object
 *       required:
 *         - remetente
 *         - destinatario   
 *         - frete
 *         - invoice
 *       properties:
 *         remetente:
 *           type: string
 *         destinatario:
 *           type: string
 *         frete:
 *           type: number
 *         invoice:
 *           type: object
 */

/**
 * @swagger
 * /v1/delivery:
 *   post:
 *     summary: Criar uma ordem de entrega
 *     tags: [Delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryCreate'
 *     responses:
 *       200:
 *         description: pedido de entrega realizado com sucesso!
 */

exports.create = async (req, res) => {
  try {
    let validator = [];
    const { remetente, destinatario, frete, invoice } = req.body;

    if (typeof remetente === 'undefined') {
      validator.push('remetente é um campo obrigatório.');

    } else if (remetente.length == 0) {
      validator.push('remetente nulo.');
    }

    if (typeof destinatario === 'undefined') {
      validator.push('destinatario é um campo obrigatório.');

    } else if (destinatario.length == 0) {
      validator.push('destinatario nulo.');
    }

    if (typeof frete === 'undefined') {
      validator.push('frete é um campo obrigatório.');

    } else if (frete == 0) {
      validator.push('frete nulo.');
    }

    if (typeof invoice === 'undefined') {
      validator.push('invoice é um campo obrigatório.');

    } else if (typeof invoice !== 'object') {
      validator.push('invoice precisa ser um objeto.');

    } else if (invoice.length == 0) {
      validator.push('invoice nulo.');
    }

    if (validator.length) {
      res.status(400).json({ "status": 0, message: validator });
      return;
    }

    let deliveryDB = await Delivery.create({ remetente, destinatario, frete });

    if (deliveryDB) {
      invoice.forEach(async (data) => {
        await Invoice.create({ delivery_id: deliveryDB.id, invoice_number: data, });
      });

      res.status(201).json({ "status": 1, message: ['pedido de entrega realizado com sucesso!'] });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ "status": 0, error: 'erro ao efetuar a criação da entrega.' });
  }
};

/**
 * @swagger
 * components:
 *   schemas:
 *     DeliveryGet:
 *       type: object
 *       required:
 *         - id
 *       properties:
 *         id:
 *           type: number
 */

/**
 * @swagger
 * /v1/delivery:
 *   get:
 *     summary: Consultar uma ordem de entrega
 *     tags: [Delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryGet'
 *     responses:
 *       200:
 *         description: Entrega criada com sucesso!
 */

exports.get = async (req, res) => {
  try {
    let validator = [];
    const id = req.params.id;

    if (typeof id === 'undefined') {
      validator.push('id é um campo obrigatório.');
    }

    if (validator.length) {
      res.status(400).json({ "status": 0, message: validator });
      return;
    }

    let deliveryDB = await Delivery.findOne({ where: { id } });
    let invoiceDB = await Invoice.findAll({ where: { delivery_id: id } });

    res.status(201).json({ "status": 1, message: ['entrega encontrado com sucesso!'], data: { delivery: deliveryDB, invoice: invoiceDB } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ "status": 0, error: 'erro ao efetuar a criação da entrega.' });
  }
};

/**
 * @swagger
 * /v1/delivery:
 *   put:
 *     summary: Atualizar uma ordem de entrega
 *     tags: [Delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryCreate'
 *     responses:
 *       200:
 *         description: Entrega criada com sucesso!
 */

exports.put = async (req, res) => {
  try {
    let validator = [];
    const { remetente, destinatario, frete, invoice } = req.body;



  } catch (error) {
    console.error(error);
    res.status(500).json({ "status": 0, error: 'erro ao efetuar a criação da entrega.' });
  }
};

/**
 * @swagger
 * /v1/delivery:
 *   delete:
 *     summary: Deletar uma ordem de entrega
 *     tags: [Delivery]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliveryCreate'
 *     responses:
 *       200:
 *         description: Entrega criada com sucesso!
 */

exports.delete = async (req, res) => {
  try {
    let validator = [];
    const { remetente, destinatario, frete, invoice } = req.body;



  } catch (error) {
    console.error(error);
    res.status(500).json({ "status": 0, error: 'erro ao efetuar a criação da entrega.' });
  }
};

