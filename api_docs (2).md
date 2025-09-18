# Supabase REST API Documentation - Task Management App

## Base Configuration

### API Base URL

```
https://PROJECT_ID.supabase.co/rest/v1/
```

### Required Headers

```http
Authorization: Bearer ANON_KEY
apikey: ANON_KEY
Content-Type: application/json
Prefer: return=representation
```

### Error Response Format

```json
{
  "code": "string",
  "details": "string",
  "hint": "string", 
  "message": "string"
}
```

---

## Categories API (Read Only)

### 1. Get All Categories

```http
GET /categories?order=name.asc
```

**Query Parameters:**

- `limit=20` - Number of results per page (default: no limit)
- `offset=0` - Number of records to skip for pagination

**Response:**

```json
[
  {
    "id": 1,
    "name": "Work",
    "color": "#ef4444",
    "icon_url": "https://api.iconify.design/material-symbols/work.svg?color=white",
    "image_filter": "grayscale",
    "image_seed_offset": 100,
    "created_at": "2025-08-25T10:00:00Z"
  },
  {
    "id": 2,
    "name": "Personal",
    "color": "#10b981",
    "icon_url": "https://api.iconify.design/material-symbols/person.svg?color=white",
    "image_filter": "default",
    "image_seed_offset": 200,
    "created_at": "2025-08-25T10:00:00Z"
  }
]
```

### 2. Get Single Category

```http
GET /categories?id=eq.1
```

**Response:**

```json
[
  {
    "id": 1,
    "name": "Work",
    "color": "#ef4444",
    "icon_url": "https://api.iconify.design/material-symbols/work.svg?color=white",
    "image_filter": "grayscale",
    "image_seed_offset": 100,
    "created_at": "2025-08-25T10:00:00Z"
  }
]
```

---

## Tasks API (Full CRUD)

### 1. Get All Tasks

```http
GET /tasks?order=created_at.desc
```

**Query Parameters:**

- `limit=20` - Number of results per page
- `offset=0` - Number of records to skip for pagination
- `category_id=eq.1` - Filter by category ID
- `completed=eq.false` - Filter by completion status (true/false)
- `priority=eq.high` - Filter by priority (low/medium/high)

**Response:**

```json
[
  {
    "id": 1,
    "title": "Complete project proposal",
    "description": "Write and review the Q4 project proposal",
    "priority": "high",
    "category_id": 1,
    "due_date": "2025-08-30",
    "completed": false,
    "image_url": "https://picsum.photos/400/300?random=101&grayscale",
    "created_at": "2025-08-25T09:00:00Z",
    "updated_at": "2025-08-25T09:00:00Z"
  }
]
```

### 2. Get Single Task

```http
GET /tasks?id=eq.1
```

### 3. Get Tasks by Category

```http
GET /tasks?category_id=eq.1&limit=20&offset=0
```

### 4. Get Tasks by Completion Status

```http
GET /tasks?completed=eq.false&limit=20&offset=0
```

### 5. Get Tasks by Priority

```http
GET /tasks?priority=eq.high&limit=20&offset=0
```

### 6. Create Task

```http
POST /tasks
```

**Request Body (Minimum Required):**

```json
{
  "title": "New Task",
  "category_id": 1
}
```

**Request Body (Full Example):**

```json
{
  "title": "Buy groceries",
  "description": "Get ingredients for weekend meal prep",
  "priority": "medium",
  "category_id": 3,
  "due_date": "2025-08-26",
  "image_url": "https://example.com/custom-image.jpg"
}
```

**Response:**

```json
[
  {
    "id": 15,
    "title": "Buy groceries",
    "description": "Get ingredients for weekend meal prep",
    "priority": "medium",
    "category_id": 3,
    "due_date": "2025-08-26",
    "completed": false,
    "image_url": "https://example.com/custom-image.jpg",
    "created_at": "2025-08-25T11:00:00Z",
    "updated_at": "2025-08-25T11:00:00Z"
  }
]
```

**Note:** If `image_url` is not provided, the database will auto-generate one based on category settings.

### 7. Update Task

```http
PATCH /tasks?id=eq.1
```

**Request Body:**

```json
{
  "title": "Updated task title",
  "description": "Updated description",
  "priority": "high",
  "due_date": "2025-08-28",
  "completed": true
}
```

**Response:**

```json
[
  {
    "id": 1,
    "title": "Updated task title",
    "description": "Updated description",
    "priority": "high",
    "category_id": 1,
    "due_date": "2025-08-28",
    "completed": true,
    "image_url": "https://picsum.photos/400/300?random=101&grayscale",
    "created_at": "2025-08-25T09:00:00Z",
    "updated_at": "2025-08-25T11:30:00Z"
  }
]
```

### 8. Delete Task

```http
DELETE /tasks?id=eq.1
```

**Response:** 204 No Content

---

## Pagination Example

To get the second page of 10 tasks:

```http
GET /tasks?limit=10&offset=10&order=created_at.desc
```

To get page 3 of 20 tasks:

```http
GET /tasks?limit=20&offset=40&order=created_at.desc
```

---

## Response Status Codes

- `200` - Success
- `201` - Created successfully  
- `204` - Success (no content returned)
- `400` - Bad Request (validation error)
- `401` - Unauthorized (invalid API key)
- `404` - Not Found
- `409` - Conflict (unique constraint violation)
- `422` - Unprocessable Entity (foreign key constraint)

---

## Field Validation Rules

### Tasks

- **title**: Required, max 255 characters
- **description**: Optional, text field
- **priority**: Must be one of: 'low', 'medium', 'high'
- **category_id**: Must reference an existing category ID
- **due_date**: Must be valid date in YYYY-MM-DD format
- **completed**: Boolean (true/false)
- **image_url**: Optional, max 500 characters

### Categories (Read Only)

- **name**: Unique, max 100 characters
- **color**: Hex color code (e.g., #ff0000)
- **icon_url**: Material Design icon URL
- **image_filter**: One of: 'default', 'grayscale', 'sepia', 'blur'

---

## Important Notes

### 1. Categories are Pre-configured

The database comes with 25 pre-loaded categories that cannot be modified through the API. Use the GET endpoints to fetch available categories.

### 2. Image Auto-Generation

When creating a task without an `image_url`, the system automatically generates a unique placeholder image based on the category's settings.

### 3. Pagination

Always use `limit` and `offset` parameters for GET requests to avoid performance issues with large datasets.

### 4. Date Format

Use ISO 8601 date format: `YYYY-MM-DD` (e.g., "2025-08-30")

### 5. Required Fields

Only `title` and `category_id` are required when creating tasks. All other fields are optional.
