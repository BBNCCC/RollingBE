const swaggerJsdoc = require('swagger-jsdoc');
const config = require('./env');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'BNCC Feedback API',
      version: '1.0.0',
      description: 'Professional Feedback Management API with Express.js and Prisma',
      contact: {
        name: 'BNCC',
        email: 'support@bncc.net',
      },
    },
    servers: [
      {
        url: `http://localhost:${config.port}${config.apiPrefix}/${config.apiVersion}`,
        description: 'Development server',
      },
    ],
    components: {
      schemas: {
        Feedback: {
          type: 'object',
          required: ['name', 'email', 'eventName', 'division', 'rating'],
          properties: {
            id: {
              type: 'integer',
              description: 'Auto-generated ID',
              example: 1,
            },
            name: {
              type: 'string',
              description: 'Name of the person giving feedback',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'Email address',
              example: 'john.doe@example.com',
            },
            eventName: {
              type: 'string',
              description: 'Name of the event',
              example: 'BNCC Workshop 2024',
            },
            division: {
              type: 'string',
              enum: ['LnT', 'Eeo', 'PR', 'HRD', 'AnD'],
              description: 'Division responsible',
              example: 'LnT',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              description: 'Rating from 1 to 5',
              example: 5,
            },
            comment: {
              type: 'string',
              nullable: true,
              description: 'Optional comment',
              example: 'Great event!',
            },
            suggestion: {
              type: 'string',
              nullable: true,
              description: 'Optional suggestion',
              example: 'More interactive sessions please',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Timestamp when feedback was created',
              example: '2024-01-15T10:30:00.000Z',
            },
            status: {
              type: 'string',
              enum: ['open', 'in_review', 'resolved'],
              description: 'Current status of feedback',
              example: 'open',
            },
          },
        },
        FeedbackInput: {
          type: 'object',
          required: ['name', 'email', 'eventName', 'division', 'rating'],
          properties: {
            name: {
              type: 'string',
              example: 'John Doe',
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            eventName: {
              type: 'string',
              example: 'BNCC Workshop 2024',
            },
            division: {
              type: 'string',
              enum: ['LnT', 'Eeo', 'PR', 'HRD', 'AnD'],
              example: 'LnT',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 5,
            },
            comment: {
              type: 'string',
              nullable: true,
              example: 'Great event!',
            },
            suggestion: {
              type: 'string',
              nullable: true,
              example: 'More interactive sessions please',
            },
          },
        },
        FeedbackUpdate: {
          type: 'object',
          properties: {
            eventName: {
              type: 'string',
              example: 'BNCC Workshop 2024 Updated',
            },
            division: {
              type: 'string',
              enum: ['LnT', 'Eeo', 'PR', 'HRD', 'AnD'],
              example: 'PR',
            },
            rating: {
              type: 'integer',
              minimum: 1,
              maximum: 5,
              example: 4,
            },
            comment: {
              type: 'string',
              nullable: true,
              example: 'Updated comment',
            },
            suggestion: {
              type: 'string',
              nullable: true,
              example: 'Updated suggestion',
            },
            status: {
              type: 'string',
              enum: ['open', 'in_review', 'resolved'],
              example: 'in_review',
            },
          },
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false,
            },
            message: {
              type: 'string',
              example: 'Error message',
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
              },
            },
          },
        },
        SuccessResponse: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true,
            },
            message: {
              type: 'string',
              example: 'Operation successful',
            },
            data: {
              type: 'object',
            },
          },
        },
      },
    },
    tags: [
      {
        name: 'Feedback',
        description: 'Feedback management endpoints',
      },
    ],
  },
  apis: ['./src/routes/*.js'], // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
