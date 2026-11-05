// Lets node's built-in type stripping resolve this repo's extensionless relative imports and the JSON import.
export async function resolve(specifier, context, next) {
  if (specifier.startsWith('.') && !/\.[a-z]+$/.test(specifier)) {
    try { return await next(specifier + '.ts', context) } catch { /* fall through */ }
  }
  if (specifier.endsWith('.json')) {
    const r = await next(specifier, context)
    return { ...r, importAttributes: { type: 'json' } }
  }
  return next(specifier, context)
}
