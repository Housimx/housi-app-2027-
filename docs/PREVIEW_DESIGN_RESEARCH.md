# Preview visual HOUSI App — Investigación y dirección de producto (2026-11-23)

## Objetivo
Demo comercial interactiva, no backend completo. Mostrar el ciclo del asesor: captar → publicar → atraer → calificar → hacer matching → visitar → negociar → cerrar → postventa. No presentar simulaciones como integraciones funcionales.

## Repositorios verificados
- https://github.com/shadcn-ui/ui — componentes accesibles para diseño de dashboard; verificar licencias de cada dependencia antes de copiar.
- https://github.com/lucide-icons/lucide — iconografía (ISC).
- https://github.com/recharts/recharts — gráficos (MIT).
- https://github.com/clauderic/dnd-kit — tablero drag-and-drop (MIT).
- https://github.com/react-hook-form/react-hook-form — formularios (MIT).
- https://github.com/xyflow/xyflow — diagrama de flujos de IA (MIT); fase posterior.

No copiar repositorios enteros; instalar paquetes concretos y fijar versiones al construir.

## Arquitectura de información propuesta
1. Inicio / HOUSI Hoy — prioridades, agenda, actividad y CTA.
2. Propiedades — inventario, detalle, multimedia, estado, ficha.
3. Clientes — contactos, requerimientos, historial, fuentes.
4. Pipeline — tablero comercial, etapas y tareas.
5. Agenda — visitas, llamadas y recordatorios.
6. IA — centro de comandos con flujos guiados.
7. Matching IA — cliente ↔ propiedad, explicación del resultado.
8. Estudio comercial — propiedad → descripción, WhatsApp, anuncio, ficha.
9. Documentos — plantillas, expedientes, revisión asistida.
10. Reportes — embudo, actividad, conversión.
11. HOUSI Academy — formación y recursos.
12. Comunidad — alianzas, directorio, beneficios.
13. Configuración — cuenta, permisos, privacidad, consumo.

## Historias demostrables (sin backend)
- Registrar una propiedad ficticia y verla en inventario.
- Crear un cliente ficticio y asignarle una necesidad.
- Mover oportunidad entre etapas con feedback visual.
- Elegir propiedad → generar una propuesta de publicación **simulada y etiquetada**.
- Elegir cliente → mostrar coincidencias **simuladas y etiquetadas**.
- Recorrer el timeline de cierre con pasos y tareas.

## Diseño
- Identidad HOUSI propia; evitar copiar dashboards de otros productos.
- Sidebar clara + encabezado + cards con jerarquía.
- Estética editorial, premium y de alta legibilidad; colores neutrales con acento verde/lima.
- Mobile-first: navegación inferior o drawer; formularios de una columna.
- Estados vacíos útiles, onboarding y tooltips contextuales.
- Demo guiada con botón 'Recorrer un caso' y distintivo permanente 'Datos de demostración'.

## Plan 15 días (orientativo)
D1–3: UX, mapa de pantallas y design system.
D4–6: dashboard, inventario, fichas y clientes.
D7–9: pipeline, agenda, recorridos de cierre.
D10–12: simulaciones transparentes de IA, marketing y matching.
D13–15: móvil, accesibilidad, QA, demo guiada y guion comercial.

## Restricciones
Sin gastos, despliegue ni conexión de datos reales sin autorización. Repositorio actual público: no subir secretos ni materiales privados. Separar HOUSI App de HAZYA y HOUSI Creative Brain.
