# BNCC Feedback API

API profesional untuk manajemen feedback menggunakan Express.js, Prisma ORM, dan MySQL dengan dokumentasi Swagger lengkap.

## Fitur

- ✅ RESTful API dengan Express.js
- ✅ Prisma ORM untuk database MySQL
- ✅ Dokumentasi API dengan Swagger/OpenAPI
- ✅ Validasi input dengan express-validator
- ✅ Error handling yang komprehensif
- ✅ Pagination dan filtering
- ✅ CORS dan security headers (Helmet)
- ✅ Logging dengan Morgan
- ✅ Environment configuration

## Struktur Folder

```
BNCCExpress/
├── prisma/
│   └── schema.prisma           # Prisma schema untuk database
├── src/
│   ├── config/
│   │   ├── database.js         # Konfigurasi Prisma client
│   │   ├── env.js              # Environment variables
│   │   └── swagger.js          # Konfigurasi Swagger
│   ├── controllers/
│   │   └── feedbackController.js  # Business logic
│   ├── middlewares/
│   │   ├── errorHandler.js     # Global error handler
│   │   ├── notFound.js         # 404 handler
│   │   └── validators.js       # Input validation
│   ├── routes/
│   │   └── feedbackRoutes.js   # API routes
│   ├── app.js                  # Express app setup
│   └── index.js                # Server entry point
├── .env                        # Environment variables
├── .env.example                # Environment template
├── .gitignore                  # Git ignore file
├── package.json                # Dependencies
└── README.md                   # Documentation
```

## Requirements

- Node.js (v16 atau lebih tinggi)
- MySQL (v8 atau lebih tinggi)
- npm atau yarn

## Installation

### 1. Clone atau download project

```bash
cd BNCCExpress
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup database

Buat database MySQL baru:

```sql
CREATE DATABASE bncc_feedback;
```

### 4. Setup environment variables

Copy file `.env.example` ke `.env` dan sesuaikan konfigurasi:

```bash
cp .env.example .env
```

Edit file `.env` dan sesuaikan dengan konfigurasi MySQL Anda:

```env
PORT=3000
NODE_ENV=development

# Sesuaikan dengan kredensial MySQL Anda
DATABASE_URL="mysql://root:your_password@localhost:3306/bncc_feedback"

API_VERSION=v1
API_PREFIX=/api
```

### 5. Generate Prisma Client dan migrate database

```bash
npm run prisma:generate
npm run prisma:migrate
```

Ketika diminta nama migration, masukkan: `init`

### 6. Jalankan server

Development mode (dengan auto-reload):

```bash
npm run dev
```

Production mode:

```bash
npm start
```

Server akan berjalan di `http://localhost:3000`

## API Endpoints

Base URL: `http://localhost:3000/api/v1`

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/feedback` | Get all feedbacks (with pagination & filter) |
| GET | `/feedback/:id` | Get single feedback by ID |
| POST | `/feedback` | Create new feedback |
| PUT | `/feedback/:id` | Update feedback |
| DELETE | `/feedback/:id` | Delete feedback |

### Query Parameters (GET /feedback)

- `status`: Filter by status (open, in_review, resolved)
- `division`: Filter by division (LnT, Eeo, PR, HRD, AnD)
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 10)

### Field Validation

**Create Feedback (POST /feedback)**

```json
{
  "name": "string (required, max 255)",
  "email": "string (required, valid email)",
  "eventName": "string (required, max 255)",
  "division": "enum (required: LnT|Eeo|PR|HRD|AnD)",
  "rating": "integer (required: 1-5)",
  "comment": "string (optional)",
  "suggestion": "string (optional)"
}
```

**Update Feedback (PUT /feedback/:id)**

```json
{
  "eventName": "string (optional, max 255)",
  "division": "enum (optional: LnT|Eeo|PR|HRD|AnD)",
  "rating": "integer (optional: 1-5)",
  "comment": "string (optional)",
  "suggestion": "string (optional)",
  "status": "enum (optional: open|in_review|resolved)"
}
```

## API Documentation

Swagger UI tersedia di: `http://localhost:3000/api-docs`

Di sana Anda bisa:
- Melihat semua endpoint yang tersedia
- Melihat request/response schema
- Testing API langsung dari browser

## Example Requests

### Create Feedback

```bash
curl -X POST http://localhost:3000/api/v1/feedback \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "eventName": "BNCC Workshop 2024",
    "division": "LnT",
    "rating": 5,
    "comment": "Great event!",
    "suggestion": "More hands-on sessions"
  }'
```

### Get All Feedbacks

```bash
curl http://localhost:3000/api/v1/feedback?status=open&page=1&limit=10
```

### Get Single Feedback

```bash
curl http://localhost:3000/api/v1/feedback/1
```

### Update Feedback

```bash
curl -X PUT http://localhost:3000/api/v1/feedback/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "in_review",
    "rating": 4
  }'
```

### Delete Feedback

```bash
curl -X DELETE http://localhost:3000/api/v1/feedback/1
```

## Database Schema

### Feedback Model

| Field | Type | Description |
|-------|------|-------------|
| id | Int | Auto-increment primary key |
| name | String | Name of person giving feedback |
| email | String | Email address |
| eventName | String | Event name |
| division | Enum | Division (LnT, Eeo, PR, HRD, AnD) |
| rating | Int | Rating 1-5 |
| comment | String? | Optional comment |
| suggestion | String? | Optional suggestion |
| createdAt | DateTime | Auto-generated timestamp |
| status | Enum | Status (open, in_review, resolved) |

## Prisma Commands

```bash
# Generate Prisma Client
npm run prisma:generate

# Create and run migrations
npm run prisma:migrate

# Open Prisma Studio (database GUI)
npm run prisma:studio
```

## Error Handling

API menggunakan format response yang konsisten:

**Success Response:**
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

**Error Response:**
```json
{
  "success": false,
  "message": "Error message",
  "errors": [ ... ]
}
```

## Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request (validation error)
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Development Tips

1. Gunakan Prisma Studio untuk melihat data:
   ```bash
   npm run prisma:studio
   ```

2. Monitor logs di development mode dengan Morgan

3. Test API menggunakan Swagger UI atau tools seperti Postman/Insomnia

4. Untuk production, set `NODE_ENV=production` di `.env`

## Troubleshooting

### Database Connection Error

- Pastikan MySQL server running
- Check kredensial di `.env`
- Pastikan database sudah dibuat

### Migration Error

```bash
# Reset database (WARNING: akan hapus semua data)
npx prisma migrate reset

# Atau push schema tanpa migration
npx prisma db push
```

### Port Already in Use

Ubah `PORT` di file `.env` ke port lain (misal: 3001)

## License

MIT

## Support

Untuk pertanyaan atau issue, silakan hubungi tim BNCC.
