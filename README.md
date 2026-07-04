# BookWise 📚 
### *Personal Linen Journal x Dark Academia Reading Companion & AI Librarian*

BookWise is a full-stack, authenticated digital reading sanctuary designed for readers to log metrics, track reading velocities, and explore dynamic literary recommendations. Combining a nostalgic personal diary aesthetic with an advanced analytical backend, BookWise safely partitions reader logs using cryptographically secure session structures.

---

## 🏛️ System Architecture & Features

The platform is engineered around three primary structural matrices:

*   **Secure Authentication Gate:** Utilizes JWT token architecture and `bcrypt` password hashing to enforce route protection (`ProtectedRoute` / `GuestRoute`) and isolate distinct user environments.
*   **Contextual Smart Vault:** Allows readers to archive specific volumes into multi-tier conceptual logs (`Placement`, `Career`, `Self Growth`, `Mental Health`, `Skill Development`) with customized rationale hooks.
*   **Dynamic Analytics Ledger:** Automatically parses real-time database queries to track user reading streaking metrics, volume counts, favorite genres, and monthly reading trends.
*   **Automated Content Matrix Engine:** Evaluates comprehensive user behavior footprints (recent views, user interests, and saved profiles) to calculate similarity recommendations.

---

## 🛠️ The Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Frontend** | React.js, Tailwind CSS v4, React Router Dom | Single Page Application UI, Client-side Protected Routing |
| **Backend** | Node.js, Express.js | Secure RESTful API Gateway & Middleware Routing |
| **Database** | SQLite3 | Local Embedded Relational Database Ledger |
| **Security** | JSON Web Tokens (JWT), Bcrypt | Session Validation, Cryptographic Account Isolation |

---

## 📐 Relational Database Schema

The core SQLite ledger runs on a normalized relational schema explicitly optimized for user-data isolation:

```sql
-- Core Accounts Matrix
CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    favorite_genre TEXT DEFAULT 'Other',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Secure Vault Archive
CREATE TABLE smart_vaults (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    saved_reason TEXT CHECK(saved_reason IN ('Placement', 'Career', 'Self Growth', 'College', 'Mental Health', 'Entertainment', 'Skill Development')) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);

-- Real-time Activity Logs
CREATE TABLE reading_activity (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    book_id INTEGER NOT NULL,
    progress_percent INTEGER DEFAULT 0,
    status TEXT CHECK(status IN ('want_to_read', 'currently_reading', 'finished', 'dropped')) DEFAULT 'want_to_read',
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, book_id),
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
);
