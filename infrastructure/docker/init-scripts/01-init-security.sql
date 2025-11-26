-- 🏰 Cathedral Database Security Initialization
-- This script runs automatically on first PostgreSQL container start
-- All secrets should be passed via environment variables

-- Create extension for UUID generation
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Create schemas for organization
CREATE SCHEMA IF NOT EXISTS codex;
CREATE SCHEMA IF NOT EXISTS arcana;
CREATE SCHEMA IF NOT EXISTS audit;

-- Set default search path
ALTER DATABASE cathedral SET search_path TO public, codex, arcana;

-- Create audit log table for security tracking
CREATE TABLE IF NOT EXISTS audit.access_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    user_name TEXT NOT NULL,
    action TEXT NOT NULL,
    table_name TEXT,
    record_id TEXT,
    ip_address INET,
    details JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create index for faster audit queries
CREATE INDEX IF NOT EXISTS idx_audit_timestamp ON audit.access_log (timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_audit_user ON audit.access_log (user_name);

-- Create function for automatic audit logging
CREATE OR REPLACE FUNCTION audit.log_change()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO audit.access_log (user_name, action, table_name, record_id, details)
    VALUES (
        CURRENT_USER,
        TG_OP,
        TG_TABLE_NAME,
        COALESCE(NEW.id::TEXT, OLD.id::TEXT),
        jsonb_build_object(
            'old', CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
            'new', CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
        )
    );
    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create Codex tables with proper constraints
CREATE TABLE IF NOT EXISTS codex.nodes (
    id SERIAL PRIMARY KEY,
    node_id INTEGER UNIQUE NOT NULL CHECK (node_id >= 1 AND node_id <= 144),
    name TEXT NOT NULL,
    element TEXT,
    layer INTEGER CHECK (layer >= 1 AND layer <= 12),
    coordinates JSONB,
    correspondences JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create Arcana tables
CREATE TABLE IF NOT EXISTS arcana.cards (
    id SERIAL PRIMARY KEY,
    card_number INTEGER NOT NULL CHECK (card_number >= 0 AND card_number <= 77),
    name TEXT NOT NULL,
    type TEXT NOT NULL CHECK (type IN ('major', 'minor')),
    suit TEXT,
    element TEXT,
    path TEXT,
    correspondences JSONB,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create manifestations table (append-only for security)
CREATE TABLE IF NOT EXISTS codex.manifestations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    principle_a TEXT NOT NULL,
    principle_b TEXT NOT NULL,
    derivative_d TEXT NOT NULL,
    phase REAL NOT NULL CHECK (phase >= 0 AND phase <= 1),
    lab TEXT NOT NULL,
    notes TEXT,
    created_by TEXT DEFAULT CURRENT_USER,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    -- No UPDATE or DELETE allowed - append only
);

-- Create trigger for immutable manifestations
CREATE OR REPLACE FUNCTION codex.prevent_modification()
RETURNS TRIGGER AS $$
BEGIN
    RAISE EXCEPTION 'Manifestations table is append-only. Modifications not allowed.';
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS prevent_manifestation_update ON codex.manifestations;
CREATE TRIGGER prevent_manifestation_update
    BEFORE UPDATE OR DELETE ON codex.manifestations
    FOR EACH ROW
    EXECUTE FUNCTION codex.prevent_modification();

-- Add audit triggers to main tables
DROP TRIGGER IF EXISTS audit_codex_nodes ON codex.nodes;
CREATE TRIGGER audit_codex_nodes
    AFTER INSERT OR UPDATE OR DELETE ON codex.nodes
    FOR EACH ROW
    EXECUTE FUNCTION audit.log_change();

DROP TRIGGER IF EXISTS audit_arcana_cards ON arcana.cards;
CREATE TRIGGER audit_arcana_cards
    AFTER INSERT OR UPDATE OR DELETE ON arcana.cards
    FOR EACH ROW
    EXECUTE FUNCTION audit.log_change();

-- Create read-only role for applications
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'cathedral_readonly') THEN
        CREATE ROLE cathedral_readonly;
    END IF;
END
$$;

GRANT USAGE ON SCHEMA codex, arcana, audit TO cathedral_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA codex TO cathedral_readonly;
GRANT SELECT ON ALL TABLES IN SCHEMA arcana TO cathedral_readonly;

-- Create application role with limited write access
DO $$
BEGIN
    IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'cathedral_app') THEN
        CREATE ROLE cathedral_app;
    END IF;
END
$$;

GRANT USAGE ON SCHEMA codex, arcana TO cathedral_app;
GRANT SELECT, INSERT ON codex.manifestations TO cathedral_app;
GRANT SELECT ON codex.nodes TO cathedral_app;
GRANT SELECT ON arcana.cards TO cathedral_app;
GRANT USAGE ON ALL SEQUENCES IN SCHEMA codex TO cathedral_app;

-- Revoke public access
REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON ALL TABLES IN SCHEMA public FROM PUBLIC;

-- Log initialization
INSERT INTO audit.access_log (user_name, action, details)
VALUES (CURRENT_USER, 'INIT', '{"message": "Database security initialized"}');

COMMENT ON DATABASE cathedral IS '🏰 Cathedral Codex Database - Secured with audit logging and role-based access';

