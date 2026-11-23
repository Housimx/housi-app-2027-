import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { configured, supabase } from './lib/supabase'

type Property = { id: string; title: string; city: string; price_mxn: number; created_at: string }
type Contact = { id: string; full_name: string; phone: string | null; email: string | null; created_at: string }
type Tab = 'properties' | 'contacts'
export default function App() {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [tab, setTab] = useState<Tab>('properties')
  const [properties, setProperties] = useState<Property[]>([])
  const [contacts, setContacts] = useState<Contact[]>([])
  const [title, setTitle] = useState('')
  const [city, setCity] = useState('')
  const [price, setPrice] = useState('')
  const [fullName, setFullName] = useState('')
  const [phone, setPhone] = useState('')
  const [contactEmail, setContactEmail] = useState('')
  useEffect(() => {
    if (!supabase) { setLoading(false); return }
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false) })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, next) => setSession(next))
    return () => subscription.unsubscribe()
  }, [])
  useEffect(() => { if (session) void refresh(); else { setProperties([]); setContacts([]) } }, [session?.user.id])
  async function refresh() {
    if (!supabase) return
    const [p, c] = await Promise.all([supabase.from('properties').select('id,title,city,price_mxn,created_at').order('created_at', { ascending: false }), supabase.from('contacts').select('id,full_name,phone,email,created_at').order('created_at', { ascending: false })])
    if (p.error || c.error) { setMessage(p.error?.message || c.error?.message || 'Error al consultar'); return }
    setProperties(p.data || []); setContacts(c.data || [])
  }
  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!supabase) return
    setMessage('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setMessage(error ? error.message : '')
  }
  async function addProperty(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!supabase || !session) return
    const value = Number(price)
    if (!Number.isFinite(value) || value < 0) { setMessage('Precio inválido'); return }
    const { error } = await supabase.from('properties').insert({ owner_id: session.user.id, title: title.trim(), city: city.trim(), price_mxn: value })
    if (error) { setMessage(error.message); return }
    setTitle(''); setCity(''); setPrice(''); setMessage('Propiedad guardada'); await refresh()
  }
  async function addContact(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); if (!supabase || !session) return
    const { error } = await supabase.from('contacts').insert({ owner_id: session.user.id, full_name: fullName.trim(), phone: phone.trim() || null, email: contactEmail.trim() || null })
    if (error) { setMessage(error.message); return }
    setFullName(''); setPhone(''); setContactEmail(''); setMessage('Contacto guardado'); await refresh()
  }
  if (!configured) return <main className="shell"><h1>HOUSI App 2027</h1><p>Entorno de desarrollo sin configurar. Agrega las variables públicas de Supabase en un archivo .env local.</p><p>No se han conectado servicios ni datos reales.</p></main>
  if (loading) return <main className="shell"><p>Cargando sesión…</p></main>
  if (!session) return <main className="shell"><header><span className="eyebrow">HOUSI MÉXICO</span><h1>Tu operación inmobiliaria, estructurada.</h1><p>Acceso de asesores · MVP técnico</p></header><form onSubmit={login} className="panel"><h2>Iniciar sesión</h2><label>Correo<input type="email" required value={email} onChange={e => setEmail(e.target.value)} /></label><label>Contraseña<input type="password" required value={password} onChange={e => setPassword(e.target.value)} /></label><button>Entrar</button><p role="status">{message}</p><small>El alta de cuentas se administra fuera de esta pantalla durante la beta.</small></form></main>
  return <main className="shell"><header className="top"><div><span className="eyebrow">HOUSI MÉXICO · MVP</span><h1>Panel del asesor</h1><p>{session.user.email}</p></div><button className="secondary" onClick={() => void supabase?.auth.signOut()}>Cerrar sesión</button></header><nav aria-label="Secciones"><button className={tab === 'properties' ? 'active' : 'secondary'} onClick={() => { setTab('properties'); setMessage('') }}>Propiedades ({properties.length})</button><button className={tab === 'contacts' ? 'active' : 'secondary'} onClick={() => { setTab('contacts'); setMessage('') }}>Clientes ({contacts.length})</button></nav><p role="status">{message}</p>{tab === 'properties' ? <section className="columns"><form className="panel" onSubmit={addProperty}><h2>Nueva propiedad</h2><label>Título<input required maxLength={160} value={title} onChange={e => setTitle(e.target.value)} /></label><label>Ciudad<input required maxLength={120} value={city} onChange={e => setCity(e.target.value)} /></label><label>Precio (MXN)<input required type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} /></label><button>Guardar propiedad</button></form><div className="panel"><h2>Inventario</h2>{properties.length === 0 ? <p>Sin propiedades registradas.</p> : <ul>{properties.map(p => <li key={p.id}><strong>{p.title}</strong><span>{p.city} · {p.price_mxn.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</span></li>)}</ul>}</div></section> : <section className="columns"><form className="panel" onSubmit={addContact}><h2>Nuevo cliente</h2><label>Nombre<input required maxLength={160} value={fullName} onChange={e => setFullName(e.target.value)} /></label><label>Teléfono<input maxLength={30} value={phone} onChange={e => setPhone(e.target.value)} /></label><label>Correo<input type="email" maxLength={254} value={contactEmail} onChange={e => setContactEmail(e.target.value)} /></label><button>Guardar cliente</button></form><div className="panel"><h2>Contactos</h2>{contacts.length === 0 ? <p>Sin clientes registrados.</p> : <ul>{contacts.map(c => <li key={c.id}><strong>{c.full_name}</strong><span>{c.phone || c.email || 'Sin datos de contacto'}</span></li>)}</ul>}</div></section>}<footer>Versión técnica inicial. Sin integración IA ni despliegue autorizado.</footer></main>
