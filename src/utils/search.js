/** Normaliza texto para búsqueda sin distinguir mayúsculas ni tildes */
export function normalizeSearchText(value = '') {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

function tokenizeForSearch(value = '') {
  return normalizeSearchText(value)
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

/**
 * Coincide por prefijo de palabra (evita falsos positivos como "angu" en "rectangulo").
 * Varias palabras en la consulta deben coincidir todas (AND).
 */
export function matchesSearch(query, ...fields) {
  const queryTokens = tokenizeForSearch(query);
  if (!queryTokens.length) return true;

  const haystackTokens = fields.flatMap((field) => {
    if (field == null || field === '') return [];
    return tokenizeForSearch(String(field));
  });

  return queryTokens.every((queryToken) =>
    haystackTokens.some((haystackToken) => haystackToken.startsWith(queryToken)),
  );
}
