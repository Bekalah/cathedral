export function writeReport({ records, errors, log, master, safety }) {
  const lines = [];
  lines.push('# Codex 144:99 — Master Build Report');
  lines.push(`- Total inputs: ${records.length}`);
  lines.push(`- Master nodes: ${master.length}`);
  lines.push(`- Conflicts: ${log.conflicts.length}`);
  lines.push(`- Validation errors: ${errors.length}`);
  lines.push('');

  if (safety.autoplay.length || safety.motion.length || safety.livingArtistHits.length) {
    lines.push('## Safety Findings');
    if (safety.autoplay.length) {
      lines.push(`- Autoplay=true: ${safety.autoplay.length} (${safety.autoplay.join(', ')})`);
    }
    if (safety.motion.length) {
      lines.push(`- Motion=intense: ${safety.motion.length} (${safety.motion.join(', ')})`);
    }
    if (safety.livingArtistHits.length) {
      lines.push(`- Living-artist flags: ${safety.livingArtistHits.length} (${safety.livingArtistHits.join(', ')})`);
    }
    lines.push('');
  }

  if (log.conflicts.length) {
    lines.push('## Conflicts');
    log.conflicts.slice(0, 50).forEach(conflict => {
      lines.push(`- **${conflict.id}** has ${conflict.variants.length} variants:`);
      conflict.variants.forEach(variant => {
        lines.push(`  - ${variant.repo}:${variant.path}  v=${variant.version || '–'}  updated=${variant.updated || '–'}  sha=${variant.sha.slice(0, 8)}`);
      });
    });
    if (log.conflicts.length > 50) {
      lines.push(`… +${log.conflicts.length - 50} more`);
    }
    lines.push('');
  }

  if (errors.length) {
    lines.push('## Validation Errors');
    errors.slice(0, 50).forEach(error => {
      lines.push(`- ${error.repo}:${error.file} — ${error.err}`);
    });
    if (errors.length > 50) {
      lines.push(`… +${errors.length - 50} more`);
    }
  }

  return lines.join('\n');
}
