//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! 🜍  CODEX REGISTRY  —  Codex 144:99  |  Magnum Opus v1.0
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
//! Append-only canonical database for visions, equations, and artworks.
//! The reflective memory of the Cathedral.
//! ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

use rusqlite::{Connection, Result, params};
use serde::{Serialize, Deserialize};
use cathedral_types::*;
use std::path::Path;

/// Codex Registry - Append-only canonical database
pub struct CodexRegistry {
    conn: Connection,
}

/// A manifestation event (when A × B = D occurs)
#[derive(Debug, Serialize, Deserialize)]
pub struct Manifestation {
    pub id: Option<i64>,
    pub timestamp: i64,
    pub principle_a: String,
    pub principle_b: String,
    pub derivative_d: String,
    pub phase: f32,
    pub lab: String,
    pub notes: Option<String>,
}

/// An audio session event
#[derive(Debug, Serialize, Deserialize)]
pub struct AudioSession {
    pub id: Option<i64>,
    pub timestamp: i64,
    pub frequency_hz: f32,
    pub amplitude: f32,
    pub duration_ms: i64,
    pub solfeggio_index: Option<usize>,
}

/// An Arcana event (when a card is invoked)
#[derive(Debug, Serialize, Deserialize)]
pub struct ArcanaEvent {
    pub id: Option<i64>,
    pub timestamp: i64,
    pub arcana_number: u8,
    pub arcana_name: String,
    pub ritual_type: String,
}

impl CodexRegistry {
    /// Create or open the registry database
    pub fn open<P: AsRef<Path>>(path: P) -> Result<Self> {
        let conn = Connection::open(path)?;
        
        // Create append-only tables
        conn.execute(
            "CREATE TABLE IF NOT EXISTS manifestations (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                principle_a TEXT NOT NULL,
                principle_b TEXT NOT NULL,
                derivative_d TEXT NOT NULL,
                phase REAL NOT NULL,
                lab TEXT NOT NULL,
                notes TEXT
            )",
            [],
        )?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS audio_sessions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                frequency_hz REAL NOT NULL,
                amplitude REAL NOT NULL,
                duration_ms INTEGER NOT NULL,
                solfeggio_index INTEGER
            )",
            [],
        )?;

        conn.execute(
            "CREATE TABLE IF NOT EXISTS arcana_events (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp INTEGER NOT NULL,
                arcana_number INTEGER NOT NULL,
                arcana_name TEXT NOT NULL,
                ritual_type TEXT NOT NULL
            )",
            [],
        )?;

        Ok(Self { conn })
    }

    /// Record a manifestation (append-only)
    pub fn record_manifestation(&self, event: &Manifestation) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO manifestations (timestamp, principle_a, principle_b, derivative_d, phase, lab, notes)
             VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7)",
            params![
                event.timestamp,
                event.principle_a,
                event.principle_b,
                event.derivative_d,
                event.phase,
                event.lab,
                event.notes
            ],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    /// Record an audio session (append-only)
    pub fn record_audio_session(&self, event: &AudioSession) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO audio_sessions (timestamp, frequency_hz, amplitude, duration_ms, solfeggio_index)
             VALUES (?1, ?2, ?3, ?4, ?5)",
            params![
                event.timestamp,
                event.frequency_hz,
                event.amplitude,
                event.duration_ms,
                event.solfeggio_index.map(|i| i as i64)
            ],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    /// Record an Arcana invocation (append-only)
    pub fn record_arcana_event(&self, event: &ArcanaEvent) -> Result<i64> {
        self.conn.execute(
            "INSERT INTO arcana_events (timestamp, arcana_number, arcana_name, ritual_type)
             VALUES (?1, ?2, ?3, ?4)",
            params![
                event.timestamp,
                event.arcana_number,
                event.arcana_name,
                event.ritual_type
            ],
        )?;
        Ok(self.conn.last_insert_rowid())
    }

    /// Get recent manifestations (read-only)
    pub fn get_recent_manifestations(&self, limit: usize) -> Result<Vec<Manifestation>> {
        let mut stmt = self.conn.prepare(
            "SELECT id, timestamp, principle_a, principle_b, derivative_d, phase, lab, notes
             FROM manifestations
             ORDER BY timestamp DESC
             LIMIT ?1"
        )?;

        let events = stmt.query_map([limit], |row| {
            Ok(Manifestation {
                id: row.get(0)?,
                timestamp: row.get(1)?,
                principle_a: row.get(2)?,
                principle_b: row.get(3)?,
                derivative_d: row.get(4)?,
                phase: row.get(5)?,
                lab: row.get(6)?,
                notes: row.get(7)?,
            })
        })?;

        events.collect()
    }

    /// Export to JSON (for web console)
    pub fn export_to_json(&self) -> Result<String> {
        let manifestations = self.get_recent_manifestations(100)?;
        Ok(serde_json::to_string_pretty(&manifestations).unwrap())
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_create_registry() {
        let registry = CodexRegistry::open(":memory:").unwrap();
        assert!(registry.conn.is_autocommit());
    }
}
