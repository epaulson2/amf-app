// Paid AI routes are off unless AMF_AI_ENABLED is exactly 'true'. Do not turn this on for a public
// deployment until the routes have access control, rate and token caps, and an approved cost ceiling.
export function aiFeaturesEnabled(): boolean {
  return process.env.AMF_AI_ENABLED === 'true'
}

export function aiDisabledResponse(): Response {
  return Response.json({ error: 'AI features are turned off on this site.' }, { status: 503 })
}
