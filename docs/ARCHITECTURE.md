# Arquitectura v0.1 — propuesta

Frontend React + Vite + TypeScript. Backend Supabase Auth, Postgres, RLS y Storage privado. IA mediante función server-side con validación de sesión, cuotas, registro de consumo y revisión humana. Netlify solo tras aprobación.

## Modelo de datos propuesto
profiles, properties, property_media, contacts, opportunities, activities, ai_generations, ai_usage.

## Aislamiento
Cada recurso pertenece a un usuario autenticado. Las referencias cruzadas (propiedad/contacto/oportunidad) deben validar también la titularidad; no basta una política RLS por owner_id. Ninguna migración se aplica hasta superar pruebas de aislamiento entre dos usuarios.

## Reutilización
ANUNCIA y HOUSI Kit son candidatos a reutilización, **no código validado**. Se requiere inspección de fuentes y pruebas antes de integrar.

## Fuera de alcance inicial
Integraciones automáticas con portales, WhatsApp no oficial, cobros, tasaciones automáticas y funciones que dependan de servicios no contratados.
