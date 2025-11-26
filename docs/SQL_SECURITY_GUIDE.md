# 🔐 Cathedral SQL Security Guide

## Overview

This guide covers SQL security best practices for the Cathedral project.

**NEVER commit database credentials or connection strings to version control!**

---

## 🚨 Security Rules

### 1. Never Hardcode Credentials

```typescript
// ❌ NEVER do this:
const password = "sacred_geometry_144";
const connectionString = "postgresql://user:password@host/db";

// ✅ DO this:
const password = process.env.POSTGRES_PASSWORD;
const connectionString = process.env.DATABASE_URL;
```

### 2. Always Use Parameterized Queries

```typescript
// ❌ NEVER do this (SQL Injection vulnerable):
const query = `SELECT * FROM users WHERE name = '${userInput}'`;

// ✅ DO this (Parameterized query):
const query = 'SELECT * FROM users WHERE name = $1';
const params = [userInput];
```

### 3. Use the SQL Security Utilities

```typescript
import { SQLSecurity } from '@cathedral/shared/sql-security';

// Detect injection attempts
if (SQLSecurity.detectInjection(userInput)) {
  SQLSecurity.logEvent({
    type: 'SQL_INJECTION_ATTEMPT',
    input: userInput,
  });
  throw new Error('Invalid input');
}

// Build safe queries
const { query, params } = new SQLSecurity.QueryBuilder()
  .select(['id', 'name', 'element'])
  .from('codex_nodes')
  .where('id', '=', nodeId)
  .build();
```

---

## 🔒 Environment Setup

### 1. Copy the Template

```bash
cp .env.template .env
```

### 2. Generate Secure Passwords

```bash
# Generate a secure database password
openssl rand -base64 32

# Generate a session secret
openssl rand -hex 32

# Generate a JWT secret
openssl rand -hex 64
```

### 3. Update .env

```env
POSTGRES_PASSWORD=<generated-secure-password>
SESSION_SECRET=<generated-session-secret>
JWT_SECRET=<generated-jwt-secret>
```

---

## 🐳 Docker Security

### Development (Quick Start)

```bash
# Uses default credentials - OK for local dev only
docker-compose up
```

### Production (Secure)

```bash
# 1. Set up environment
cp .env.template .env
# Edit .env with secure values

# 2. Use secure compose file
docker-compose -f infrastructure/docker/docker-compose.secure.yml up
```

---

## 📊 Database Security Features

### Audit Logging

All database changes are logged to `audit.access_log`:

```sql
SELECT * FROM audit.access_log 
ORDER BY timestamp DESC 
LIMIT 10;
```

### Append-Only Tables

Manifestations table is immutable:

```sql
-- This will FAIL (by design):
UPDATE codex.manifestations SET notes = 'changed';
-- ERROR: Manifestations table is append-only. Modifications not allowed.

-- This works:
INSERT INTO codex.manifestations (...) VALUES (...);
```

### Role-Based Access

| Role | Permissions |
|------|-------------|
| `cathedral_readonly` | SELECT only |
| `cathedral_app` | SELECT + INSERT (limited tables) |
| `postgres` (admin) | Full access |

---

## 🦀 Rust SQL Security

The `codex-registry` crate uses rusqlite with parameterized queries:

```rust
// ✅ Safe - uses params![] macro
self.conn.execute(
    "INSERT INTO manifestations (timestamp, principle_a, principle_b) VALUES (?1, ?2, ?3)",
    params![event.timestamp, event.principle_a, event.principle_b],
)?;
```

---

## 🔍 Security Checklist

- [ ] `.env` is in `.gitignore`
- [ ] No hardcoded passwords in code
- [ ] All queries use parameterized statements
- [ ] Database files (`.db`, `.sqlite`) are gitignored
- [ ] Connection strings loaded from environment
- [ ] Audit logging enabled
- [ ] Role-based access configured
- [ ] SQL injection detection in place

---

## 🚨 Incident Response

If you suspect a security breach:

1. **Rotate all credentials immediately**
   ```bash
   # Generate new passwords
   openssl rand -base64 32
   ```

2. **Check audit logs**
   ```sql
   SELECT * FROM audit.access_log 
   WHERE timestamp > NOW() - INTERVAL '24 hours';
   ```

3. **Review access patterns**
   ```sql
   SELECT user_name, action, COUNT(*) 
   FROM audit.access_log 
   GROUP BY user_name, action;
   ```

4. **Update .env and restart services**

---

## 📚 Resources

- [OWASP SQL Injection Prevention](https://owasp.org/www-community/attacks/SQL_Injection)
- [PostgreSQL Security](https://www.postgresql.org/docs/current/security.html)
- [rusqlite Documentation](https://docs.rs/rusqlite/)

---

*Cathedral Security Team - Keep the sacred data safe* 🏰

