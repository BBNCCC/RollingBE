const prisma = require('../config/database');

/**
 * Get all feedbacks with optional filtering
 */
const getAllFeedbacks = async (req, res, next) => {
  try {
    const { status, division, page = 1, limit = 10 } = req.query;

    const where = {};
    if (status) where.status = status;
    if (division) where.division = division;

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const take = parseInt(limit);

    const [feedbacks, total] = await Promise.all([
      prisma.feedback.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.feedback.count({ where }),
    ]);

    res.status(200).json({
      success: true,
      message: 'Feedbacks retrieved successfully',
      data: {
        feedbacks,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          totalPages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single feedback by ID
 */
const getFeedbackById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const feedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Create new feedback
 */
const createFeedback = async (req, res, next) => {
  try {
    const { name, email, eventName, division, rating, comment, suggestion } = req.body;

    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        eventName,
        division,
        rating: parseInt(rating),
        comment: comment || null,
        suggestion: suggestion || null,
      },
    });

    res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update feedback
 */
const updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { eventName, division, rating, comment, suggestion, status } = req.body;

    // Check if feedback exists
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingFeedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    // Build update data object
    const updateData = {};
    if (eventName !== undefined) updateData.eventName = eventName;
    if (division !== undefined) updateData.division = division;
    if (rating !== undefined) updateData.rating = parseInt(rating);
    if (comment !== undefined) updateData.comment = comment;
    if (suggestion !== undefined) updateData.suggestion = suggestion;
    if (status !== undefined) updateData.status = status;

    const feedback = await prisma.feedback.update({
      where: { id: parseInt(id) },
      data: updateData,
    });

    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      data: feedback,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Delete feedback
 */
const deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Check if feedback exists
    const existingFeedback = await prisma.feedback.findUnique({
      where: { id: parseInt(id) },
    });

    if (!existingFeedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
      });
    }

    await prisma.feedback.delete({
      where: { id: parseInt(id) },
    });

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllFeedbacks,
  getFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
};
