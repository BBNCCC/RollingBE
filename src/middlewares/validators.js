const { body, param, validationResult } = require('express-validator');

// Validation middleware to check results
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array(),
    });
  }
  next();
};

// Feedback validation rules
const createFeedbackValidation = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ max: 255 })
    .withMessage('Name must be less than 255 characters'),

  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Must be a valid email')
    .normalizeEmail(),

  body('eventName')
    .trim()
    .notEmpty()
    .withMessage('Event name is required')
    .isLength({ max: 255 })
    .withMessage('Event name must be less than 255 characters'),

  body('division')
    .notEmpty()
    .withMessage('Division is required')
    .isIn(['LnT', 'Eeo', 'PR', 'HRD', 'AnD'])
    .withMessage('Division must be one of: LnT, Eeo, PR, HRD, AnD'),

  body('rating')
    .notEmpty()
    .withMessage('Rating is required')
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('comment')
    .optional()
    .trim()
    .isString()
    .withMessage('Comment must be a string'),

  body('suggestion')
    .optional()
    .trim()
    .isString()
    .withMessage('Suggestion must be a string'),

  validate,
];

const updateFeedbackValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a valid positive integer'),

  body('eventName')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Event name cannot be empty if provided')
    .isLength({ max: 255 })
    .withMessage('Event name must be less than 255 characters'),

  body('division')
    .optional()
    .isIn(['LnT', 'Eeo', 'PR', 'HRD', 'AnD'])
    .withMessage('Division must be one of: LnT, Eeo, PR, HRD, AnD'),

  body('rating')
    .optional()
    .isInt({ min: 1, max: 5 })
    .withMessage('Rating must be an integer between 1 and 5'),

  body('comment')
    .optional()
    .trim()
    .isString()
    .withMessage('Comment must be a string'),

  body('suggestion')
    .optional()
    .trim()
    .isString()
    .withMessage('Suggestion must be a string'),

  body('status')
    .optional()
    .isIn(['open', 'in_review', 'resolved'])
    .withMessage('Status must be one of: open, in_review, resolved'),

  validate,
];

const idParamValidation = [
  param('id')
    .isInt({ min: 1 })
    .withMessage('ID must be a valid positive integer'),

  validate,
];

module.exports = {
  createFeedbackValidation,
  updateFeedbackValidation,
  idParamValidation,
};
