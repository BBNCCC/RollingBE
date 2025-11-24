const express = require('express');
const router = express.Router();
const {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
} = require('../controllers/feedbackController');
const {
  createFeedbackValidation,
  updateFeedbackValidation,
  idParamValidation,
} = require('../middlewares/validators');

/**
 * @swagger
 * /feedback:
 *   get:
 *     summary: Get all feedbacks
 *     description: Retrieve a list of all feedbacks with optional filtering and pagination
 *     tags: [Feedback]
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [open, in_review, resolved]
 *         description: Filter by status
 *       - in: query
 *         name: division
 *         schema:
 *           type: string
 *           enum: [LnT, Eeo, PR, HRD, AnD]
 *         description: Filter by division
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           default: 1
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *           default: 10
 *         description: Items per page
 *     responses:
 *       200:
 *         description: Feedbacks retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Feedbacks retrieved successfully
 *                 data:
 *                   type: object
 *                   properties:
 *                     feedbacks:
 *                       type: array
 *                       items:
 *                         $ref: '#/components/schemas/Feedback'
 *                     pagination:
 *                       type: object
 *                       properties:
 *                         page:
 *                           type: integer
 *                         limit:
 *                           type: integer
 *                         total:
 *                           type: integer
 *                         totalPages:
 *                           type: integer
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/', getAllFeedbacks);

/**
 * @swagger
 * /feedback/{id}:
 *   get:
 *     summary: Get feedback by ID
 *     description: Retrieve a specific feedback by its ID
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Feedback retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Feedback retrieved successfully
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.get('/:id', idParamValidation, getFeedbackById);

/**
 * @swagger
 * /feedback:
 *   post:
 *     summary: Create new feedback
 *     description: Submit a new feedback from public form
 *     tags: [Feedback]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackInput'
 *     responses:
 *       201:
 *         description: Feedback created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Feedback created successfully
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       400:
 *         description: Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.post('/', createFeedbackValidation, createFeedback);

/**
 * @swagger
 * /feedback/{id}:
 *   put:
 *     summary: Update feedback
 *     description: Update existing feedback (for admin panel - can update status, division, rating, or text)
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feedback ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FeedbackUpdate'
 *     responses:
 *       200:
 *         description: Feedback updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Feedback updated successfully
 *                 data:
 *                   $ref: '#/components/schemas/Feedback'
 *       404:
 *         description: Feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.put('/:id', updateFeedbackValidation, updateFeedback);

/**
 * @swagger
 * /feedback/{id}:
 *   delete:
 *     summary: Delete feedback
 *     description: Delete a feedback (admin only)
 *     tags: [Feedback]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Feedback ID
 *     responses:
 *       200:
 *         description: Feedback deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Feedback deleted successfully
 *       404:
 *         description: Feedback not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 */
router.delete('/:id', idParamValidation, deleteFeedback);

module.exports = router;
