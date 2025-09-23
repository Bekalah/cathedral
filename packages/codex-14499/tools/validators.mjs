const ID_PATTERN = /^[A-Z0-9\-_:]+$/;

export function validateNode(object) {
  if (!isObject(object)) return false;
  if (typeof object.id !== 'string' || !ID_PATTERN.test(object.id)) return false;
  if (typeof object.title !== 'string') return false;
  return true;
}

export function validateTarot(object) {
  if (!isObject(object)) return false;
  if (typeof object.id !== 'string' || !object.id) return false;
  if (typeof object.name !== 'string') return false;
  return true;
}

export function validateLineage(object) {
  if (!isObject(object)) return false;
  if (typeof object.id !== 'string' || !object.id) return false;
  return true;
}

function isObject(value) {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}
