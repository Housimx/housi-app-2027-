import { useEffect, useState, type FormEvent } from 'react'
import type { Session } from '@supabase/supabase-js'
import { configured, supabase } from './lib/supabase'
import './shell.css'

type Property = { id: string; title: string; city: string; price_mxn: number; created_at: string }
type Contact = { id: string; full_name: string; phone: string | null; email: string | null; created_at: string }
type ModuleId = 'home'|'properties'|'contacts'|'pipeline'|'tasks'|'matching'|'ai'|'marketing'|'documents'|'reports'|'academy'|'community'|'settings'
type Module = { id: ModuleId; name: string; icon: string; group: string; description: string; features: string[]; phase: string }
const modules: Module[] = [
  { id:'home',name:'HOUSI Hoy',icon:'⌂',group:'Operación',description:'Tu centro de mando: pendientes, clientes, propiedades y siguientes acciones.',features:['Indicadores de actividad','Seguimientos prioritarios','Acciones rápidas','Resumen de oportunidades'],phase:'Estructura' },
  { id:'properties',name:'Propiedades',icon:'▦',group:'Operación',description:'Inventario centralizado de propiedades.',features:['Alta y consulta de propiedades','Galería y fichas','Estados de comercialización','Importación y exportación'],phase:'Base disponible' },
  { id:'contacts',name:'Clientes',icon:'♙',group:'Operación',description:'Organiza compradores, propietarios, arrendatarios y prospectos.',features:['Alta y consulta de contactos','Perfil de búsqueda','Historial de interacción','Etiquetas y origen'],phase:'Base disponible' },
  { id:'pipeline',name:'Oportunidades',icon:'◫',group:'Operación',description:'Visualiza cada negociación desde el primer contacto hasta el cierre.',features:['Embudo comercial','Etapas personalizadas','Valor de operación','Motivos de pérdida'],phase:'Estructura' },
  { id:'tasks',name:'Agenda y tareas',icon:'◷',group:'Operación',description:'Recordatorios, visitas y seguimiento comercial.',features:['Tareas por fecha','Agenda de visitas','Recordatorios','Prioridades'],phase:'Estructura' },
  { id:'matching',name:'Matching IA',icon:'◇',group:'Inteligencia artificial',description:'Cruza necesidades de clientes con propiedades disponibles.',features:['Coincidencias explicadas','Filtros de búsqueda','Recomendaciones revisables','Alertas de nuevas coincidencias'],phase:'Estructura' },
  { id:'ai',name:'Asistente IA',icon:'✳',group:'Inteligencia artificial',description:'Copiloto inmobiliario para convertir información en acciones.',features:['Asistencia sobre propiedades','Resumen de clientes','Sugerencias de seguimiento','Historial de solicitudes'],phase:'Estructura' },
  { id:'marketing',name:'Estudio comercial',icon:'▤',group:'Inteligencia artificial',description:'Convierte una propiedad en materiales comerciales.',features:['Descripciones inmobiliarias','Textos para redes','Mensajes para WhatsApp','Campañas y fichas'],phase:'Estructura' },
  { id:'documents',name:'Documentos',icon:'▧',group:'Herramientas',description:'Organiza archivos y prepara revisiones asistidas.',features:['Biblioteca documental','Plantillas','Resúmenes asistidos','Control de versiones'],phase:'Estructura' },
  { id:'reports',name:'Reportes',icon:'▥',group:'Herramientas',description:'Mide tu operación con indicadores verificables.',features:['Actividad comercial','Conversión de prospectos','Inventario por estado','Exportación de resultados'],phase:'Estructura' },
  { id:'academy',name:'HOUSI Academy',icon:'◈',group:'Ecosistema HOUSI',description:'Acceso futuro a capacitación, recursos y procesos.',features:['Cursos','Biblioteca de recursos','Rutas de aprendizaje','Certificaciones'],phase:'Estructura' },
  { id:'community',name:'Comunidad HOUSI',icon:'◎',group:'Ecosistema HOUSI',description:'Red profesional y herramientas de colaboración.',features:['Directorio profesional','Alianzas','Beneficios','Oportunidades compartidas'],phase:'Estructura' },
  { id:'settings',name:'Configuración',icon:'⚙',group:'Cuenta',description:'Gestiona preferencias y seguridad de tu espacio.',features:['Perfil profesional','Preferencias','Plan y consumo IA','Seguridad y privacidad'],phase:'Estructura' }
]
const groups = [...new Set(modules.map(m => m.group))]
export default function App() {
  const [section,setSection] = useState<ModuleId>('home')
  const [sidebar,setSidebar] = useState(false)
  const [session,setSession] = useState<Session|null>(null)
  const [loading,setLoading] = useState(true)
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [message,setMessage] = useState('')
  const [properties,setProperties] = useState<Property[]>([])
  const [contacts,setContacts] = useState<Contact[]>([])
  const [title,setTitle] = useState('')
  const [city,setCity] = useState('')
  const [price,setPrice] = useState('')
  const [fullName,setFullName] = useState('')
  const [phone,setPhone] = useState('')
  const [contactEmail,setContactEmail] = useState('')
  useEffect(() => {
    if (!supabase) {setLoading(false);return}
    supabase.auth.getSession().then(({data,error})=>{setSession(data.session);setLoading(false);if(error)setMessage(error.message)})
    const {data:{subscription}}=supabase.auth.onAuthStateChange((_event,s)=>setSession(s))
    return ()=>subscription.unsubscribe()
  },[])
  useEffect(()=>{if(session){void refresh()}else{setProperties([]);setContacts([])}},[session?.user.id])
  async function refresh(){
    if(!supabase)return
    const [p,c]=await Promise.all([supabase.from('properties').select('id,title,city,price_mxn,created_at').order('created_at',{ascending:false}),supabase.from('contacts').select('id,full_name,phone,email,created_at').order('created_at',{ascending:false})])
    if(p.error||c.error){setMessage(p.error?.message||c.error?.message||'Error de consulta');return}
    setProperties(p.data||[]);setContacts(c.data||[])
  }
  async function login(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!supabase)return
    setMessage('')
    const {error}=await supabase.auth.signInWithPassword({email,password})
    if(error)setMessage(error.message)
  }
  async function addProperty(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!supabase||!session)return
    const value=Number(price)
    if(!Number.isFinite(value)||value<0){setMessage('Precio inválido');return}
    const {error}=await supabase.from('properties').insert({owner_id:session.user.id,title:title.trim(),city:city.trim(),price_mxn:value})
    if(error){setMessage(error.message);return}
    setTitle('');setCity('');setPrice('');setMessage('Propiedad guardada');await refresh()
  }
  async function addContact(e:FormEvent<HTMLFormElement>){
    e.preventDefault();if(!supabase||!session)return
    const {error}=await supabase.from('contacts').insert({owner_id:session.user.id,full_name:fullName.trim(),phone:phone.trim()||null,email:contactEmail.trim()||null})
    if(error){setMessage(error.message);return}
    setFullName('');setPhone('');setContactEmail('');setMessage('Contacto guardado');await refresh()
  }
  const active=modules.find(m=>m.id===section)!
  const navigate=(id:ModuleId)=>{setSection(id);setSidebar(false);setMessage('')}
  const operational=Boolean(configured&&session)
  return <div className="app-frame">
    <aside className={'app-sidebar '+(sidebar?'is-open':'')}>
      <div className="brand"><div className="brand-mark">H</div><div><strong>HOUSI</strong><small>BROKER OS · 2027</small></div></div>
      <div className="workspace"><span>ESPACIO DE TRABAJO</span><strong>{session?.user.email?.split('@')[0]||'Vista de arquitectura'}</strong><small>{operational?'Sesión conectada':'Entorno sin conectar'}</small></div>
      <nav aria-label="Navegación principal">{groups.map(group=><div className="nav-group" key={group}><p>{group}</p>{modules.filter(m=>m.group===group).map(m=><button type="button" key={m.id} className={'nav-item '+(section===m.id?'selected':'')} onClick={()=>navigate(m.id)}><span aria-hidden="true" className="nav-icon">{m.icon}</span><span>{m.name}</span>{m.phase==='Base disponible'&&<i aria-label="Base implementada">•</i>}</button>)}</div>)}</nav>
      <div className="sidebar-foot">HOUSI no motiva. HOUSI estructura.<small>Esqueleto de producto · v0.2</small></div>
    </aside>
    {sidebar&&<button className="backdrop" aria-label="Cerrar menú" onClick={()=>setSidebar(false)}/>}
    <div className="app-main">
      <header className="app-topbar"><button className="mobile-menu" onClick={()=>setSidebar(!sidebar)} aria-label="Abrir menú">☰</button><div className="crumb">HOUSI APP <span>/</span> {active.name}</div><div className="top-actions"><span className="env-pill">PREVIEW · NO PUBLICADA</span>{session&&<button className="text-button" onClick={()=>void supabase?.auth.signOut()}>Salir</button>}</div></header>
      <div className="app-content">
        <div className="page-heading"><div><div className="overline">{active.group.toUpperCase()}</div><h1>{active.name}</h1><p>{active.description}</p></div><span className={'status '+(active.phase==='Base disponible'?'status-progress':'')}>{active.phase}</span></div>
        {!configured&&<div className="notice"><strong>Vista estructural sin conexión.</strong> Puedes explorar todos los módulos. Para guardar datos reales será necesario configurar una base de datos de desarrollo independiente.</div>}
        {configured&&!session&&!loading&&<div className="auth-panel"><h2>Acceso de asesores</h2><p>Inicia sesión para usar los módulos básicos de propiedades y clientes.</p><form onSubmit={login}><label>Correo<input required type="email" value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Contraseña<input required type="password" value={password} onChange={e=>setPassword(e.target.value)}/></label><button className="primary">Entrar</button></form></div>}
        {loading&&<p>Verificando sesión…</p>}
        {message&&<div role="status" className="notice">{message}</div>}
        {section==='home'?<><div className="stat-grid"><div className="stat-card"><small>Propiedades</small><strong>{operational?properties.length:'—'}</strong><span>{operational?'En tu inventario':'Por conectar'}</span></div><div className="stat-card"><small>Clientes</small><strong>{operational?contacts.length:'—'}</strong><span>{operational?'Contactos registrados':'Por conectar'}</span></div><div className="stat-card"><small>Oportunidades</small><strong>—</strong><span>Módulo planeado</span></div><div className="stat-card"><small>Seguimientos</small><strong>—</strong><span>Módulo planeado</span></div></div><div className="section-label"><h2>Tu espacio de trabajo</h2><p>Mapa de herramientas del sistema</p></div><div className="module-grid">{modules.filter(m=>!['home','settings'].includes(m.id)).map(m=><button key={m.id} className="module-card" onClick={()=>navigate(m.id)}><span className="module-symbol">{m.icon}</span><strong>{m.name}</strong><small>{m.description}</small><span className="module-link">Explorar módulo →</span></button>)}</div></>:
        section==='properties'&&operational?<div className="content-columns"><form className="form-card" onSubmit={addProperty}><h2>Agregar propiedad</h2><label>Nombre o título<input required maxLength={160} value={title} onChange={e=>setTitle(e.target.value)}/></label><label>Ciudad<input required maxLength={120} value={city} onChange={e=>setCity(e.target.value)}/></label><label>Precio MXN<input required type="number" min="0" step="0.01" value={price} onChange={e=>setPrice(e.target.value)}/></label><button className="primary">Guardar propiedad</button></form><div className="data-card"><h2>Inventario <span>{properties.length}</span></h2>{properties.length?properties.map(p=><div className="data-row" key={p.id}><strong>{p.title}</strong><span>{p.city} · {p.price_mxn.toLocaleString('es-MX',{style:'currency',currency:'MXN'})}</span></div>):<p>No hay propiedades registradas.</p>}</div></div>:
        section==='contacts'&&operational?<div className="content-columns"><form className="form-card" onSubmit={addContact}><h2>Agregar cliente</h2><label>Nombre<input required maxLength={160} value={fullName} onChange={e=>setFullName(e.target.value)}/></label><label>Teléfono<input maxLength={30} value={phone} onChange={e=>setPhone(e.target.value)}/></label><label>Correo<input type="email" maxLength={254} value={contactEmail} onChange={e=>setContactEmail(e.target.value)}/></label><button className="primary">Guardar cliente</button></form><div className="data-card"><h2>Contactos <span>{contacts.length}</span></h2>{contacts.length?contacts.map(c=><div className="data-row" key={c.id}><strong>{c.full_name}</strong><span>{c.phone||c.email||'Sin información adicional'}</span></div>):<p>No hay contactos registrados.</p>}</div></div>:
        <div className="placeholder-layout"><section className="feature-panel"><div className="feature-icon">{active.icon}</div><h2>{active.name}</h2><p>{active.description}</p><div className="planned-label">FUNCIONALIDADES CONTEMPLADAS</div><div className="feature-list">{active.features.map(f=><div key={f}><span>○</span>{f}</div>)}</div><div className="module-footnote">Esta sección es parte del esqueleto navegable. Sus funciones aún no están implementadas.</div></section><aside className="roadmap-card"><h3>Estado del módulo</h3><div className="timeline-step done"><b>1</b><span>Definición del módulo</span></div><div className="timeline-step"><b>2</b><span>Diseño de datos y flujos</span></div><div className="timeline-step"><b>3</b><span>Implementación funcional</span></div><div className="timeline-step"><b>4</b><span>Pruebas y validación</span></div><p>Sin datos ficticios presentados como reales.</p></aside></div>}
      </div>
    </div>
  </div>
}
