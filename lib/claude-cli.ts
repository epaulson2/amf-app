import { spawn } from 'child_process'

const CLAUDE_BIN = process.env.CLAUDE_CLI_BIN ?? '/home/elderle/.nvm/versions/node/v20.19.6/bin/claude'
const CLAUDE_ENV = { ...process.env, HOME: '/home/elderle' }

export function callClaude(prompt: string, systemPrompt: string, timeoutMs = 30000): Promise<string> {
  return new Promise((resolve, reject) => {
    const child = spawn(
      CLAUDE_BIN,
      ['-p', prompt, '--system-prompt', systemPrompt, '--output-format', 'text'],
      { env: CLAUDE_ENV, stdio: ['ignore', 'pipe', 'pipe'] }
    )

    let stdout = ''
    let stderr = ''
    child.stdout.on('data', (d: Buffer) => { stdout += d.toString() })
    child.stderr.on('data', (d: Buffer) => { stderr += d.toString() })

    const timer = setTimeout(() => { child.kill(); reject(new Error('Claude CLI timeout')) }, timeoutMs)

    child.on('close', (code) => {
      clearTimeout(timer)
      if (code === 0) resolve(stdout.trim())
      else reject(new Error(stderr.trim() || `Claude CLI exited with code ${code}`))
    })

    child.on('error', (e) => { clearTimeout(timer); reject(e) })
  })
}
