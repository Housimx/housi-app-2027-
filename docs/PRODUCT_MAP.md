# Mapa de producto — Esqueleto navegable v0.2

## Objetivo
Disponer de una aplicación con todas las áreas principales organizadas antes de implementar la lógica completa.

## Módulos
| Área | Módulo | Estado |
|---|---|---|
| Operación | HOUSI Hoy | Estructura navegable |
| Operación | Propiedades | Pantalla + formulario conectado a Supabase solo cuando se configure |
| Operación | Clientes | Pantalla + formulario conectado a Supabase solo cuando se configure |
| Operación | Oportunidades | Estructura navegable |
| Operación | Agenda y tareas | Estructura navegable |
| IA | Matching IA | Estructura navegable |
| IA | Asistente IA | Estructura navegable |
| IA | Estudio comercial | Estructura navegable |
| Herramientas | Documentos | Estructura navegable |
| Herramientas | Reportes | Estructura navegable |
| Ecosistema | HOUSI Academy | Estructura navegable |
| Ecosistema | Comunidad HOUSI | Estructura navegable |
| Cuenta | Configuración | Estructura navegable |

## Reglas de producto
- Ninguna función incompleta debe simular que ejecutó acciones reales.
- La IA es un diferenciador principal: no presentar la plataforma como un CRM genérico.
- Los datos de cada asesor deben permanecer aislados mediante RLS y pruebas reales.
- No conectar servicios ni publicar sin autorización.
- Recuperar componentes de ANUNCIA y HOUSI Kit solo después de revisar su código.
- La interfaz en repositorio no equivale a una beta validada.

## Próximas entregas
1. Comprobación de compilación y accesibilidad.
2. Datos de ejemplo **locales y explícitamente ficticios**, si se aprueba una demo visual.
3. Autenticación y tablas en Supabase independiente.
4. Flujos completos de propiedades, clientes, tareas y oportunidades.
5. IA real y pruebas de seguridad.
