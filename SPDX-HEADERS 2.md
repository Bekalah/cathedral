# SPDX Header Templates

This document provides standard SPDX license identifier headers for different file types in the Cathedral of Circuits project.

## Software Components (Apache-2.0)

### For JavaScript/TypeScript files

```javascript
/*

 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
 *
 * Cathedral of Circuits - Living Grimoire Engine
 * https://github.com/Bekalah/cathedral
 */

```

### For Python files

```python
# SPDX-License-Identifier: Apache-2.0

# Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors

#

# Cathedral of Circuits - Living Grimoire Engine

# https://github.com/Bekalah/cathedral

```

### For Shell scripts

```bash
#!/bin/bash

# SPDX-License-Identifier: Apache-2.0

# Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors

#

# Cathedral of Circuits - Living Grimoire Engine

# https://github.com/Bekalah/cathedral

```

### For TypeScript definition files

```typescript
/*

 * SPDX-License-Identifier: Apache-2.0
 * Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors
 *
 * Cathedral of Circuits - Living Grimoire Engine
 * Type definitions
 */

```

## Creative Content (CC-BY-NC-SA-4.0)

### For Markdown documentation

```markdown
<!--

SPDX-License-Identifier: CC-BY-NC-SA-4.0
Copyright (c) 2025 Rebecca "Bekalah" Lemke

Cathedral of Circuits - Archetypal Documentation

Creative content licensed under Creative Commons BY-NC-SA 4.0
https://github.com/Bekalah/cathedral

-->

```

### For JSON with symbolic content

```json
{

  "_license": "SPDX-License-Identifier: CC-BY-NC-SA-4.0",
  "_copyright": "Copyright (c) 2025 Rebecca 'Bekalah' Lemke",

  "_notice": "Symbolic content under CC BY-NC-SA 4.0. Schema structure may be Apache-2.0.",
  "_source": "https://github.com/Bekalah/cathedral"
}

```

## Dual-Character Assets

### For JSON with both structural and symbolic elements

```json
{

  "_license": "DUAL: Apache-2.0 (schema) + CC-BY-NC-SA-4.0 (symbolic content)",
  "_copyright": "Copyright (c) 2025 Rebecca 'Bekalah' Lemke",

  "_notice": "Schema/structure: Apache-2.0. Mythic/symbolic meanings: CC BY-NC-SA 4.0.",
  "_source": "https://github.com/Bekalah/cathedral"
}

```

## Configuration Files (Apache-2.0)

### For YAML/TOML config

```yaml
# SPDX-License-Identifier: Apache-2.0

# Copyright (c) 2025 Rebecca "Bekalah" Lemke and contributors

#

# Cathedral of Circuits - Configuration

```

## HTML Files

### For HTML with embedded code (mixed)

```html
<!--

SPDX-License-Identifier: Apache-2.0 (code) + CC-BY-NC-SA-4.0 (content)
Copyright (c) 2025 Rebecca "Bekalah" Lemke

Cathedral of Circuits - Interactive Platform

Code logic: Apache-2.0, Narrative/symbolic content: CC BY-NC-SA 4.0

-->

```

## Usage Guidelines

1. **New Files**: Add appropriate header based on primary content type

2. **Existing Files**: Headers can be added gradually during maintenance

3. **Mixed Files**: Use dual license notation when both code and symbolic content are substantial

4. **Auto-generation**: The `license-audit.sh` script can help identify files needing headers

## SPDX Identifier Reference

- `Apache-2.0`: For software components, infrastructure, engines

- `CC-BY-NC-SA-4.0`: For creative, symbolic, mythopoetic content

- `DUAL: Apache-2.0 + CC-BY-NC-SA-4.0`: For files with substantial both code and symbolic content

For more SPDX identifiers: <https://spdx.org/licenses/>
