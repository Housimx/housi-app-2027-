import test from 'node:test'
import assert from 'node:assert/strict'
import { readFileSync } from 'node:fs'

const sql = readFileSync(new URL('../supabase/migrations/0001_core.sql', import.meta.url), 'utf8')
const read = (path) => readFileSync(new URL('../' + path, import.meta.url), 'utf8')

test('RLS is enabled for both P0 tables', () => {
  for (const table of ['properties', 'contacts']) {
    assert.match(sql, new RegExp('alter table public\\.' + table + ' enable row level security;', 'i'))
    for (const op of ['select', 'insert', 'update', 'delete']) {
      assert.match(sql, new RegExp('create policy ' + table + '_' + op + '_own', 'i'))
    }
  }
})

test('all P0 policies restrict rows to authenticated owner', () => {
  const policies = [...sql.matchAll(/create policy [^;]+;/gi)]
  assert.equal(policies.length, 8)
  for (const [policy] of policies) {
    assert.match(policy, /to authenticated/i)
    assert.match(policy, /owner_id\s*=\s*\(select auth\.uid\(\)\)/i)
  }
})

test('client never references server-side service role or secret keys', () => {
  const source = read('src/lib/supabase.ts') + read('src/App.tsx')
  assert.doesNotMatch(source, /service_role|SUPABASE_SERVICE_ROLE_KEY|OPENAI_API_KEY/i)
  assert.match(source, /VITE_SUPABASE_ANON_KEY/)
})

test('env file patterns are ignored', () => {
  const gitignore = read('.gitignore')
  assert.match(gitignore, /^\.env$/m)
  assert.match(gitignore, /^\.env\.\*$/m)
})
