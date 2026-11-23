# HOUSI App 2027

**Estado:** arquitectura inicial, sin aplicación desplegada ni backend conectado.

Plataforma PropTech para asesores inmobiliarios independientes. Principio: **HOUSI no motiva, HOUSI estructura**.

## Alcance MVP P0
- Inicio de sesión y perfil del asesor
- Inventario de propiedades
- Contactos y oportunidades (CRM)
- Actividades, seguimientos y vista HOY
- Generación asistida de textos inmobiliarios con revisión humana

## Arquitectura propuesta
- Frontend: React + TypeScript + Vite
- Backend: Supabase Auth, PostgreSQL, RLS y Storage
- IA: función de servidor con autenticación, cuotas y auditoría
- Despliegue futuro: Netlify, **solo con aprobación**

## Estado de seguridad
Este repositorio es **PÚBLICO**. No subir datos de clientes, credenciales, claves de servicios, archivos .env ni estrategias comerciales confidenciales. Las migraciones SQL son borradores: no ejecutarlas sin revisión de integridad y pruebas de aislamiento.

## Próximos pasos
1. Recuperar y evaluar código ANUNCIA y HOUSI Kit antes de reutilizarlo.
2. Implementar una primera ruta completa: login → propiedad → contacto → seguimiento.
3. Revisar seguridad y privacidad antes de conectar infraestructura.
4. Solicitar autorización explícita antes de servicios de pago o publicación.

Consulta `docs/ARCHITECTURE.md`, `docs/ROADMAP.md` y `docs/SECURITY_GATES.md`.
