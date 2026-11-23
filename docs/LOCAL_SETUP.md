# Inicio local (sin despliegue)

1. Instalar Node.js 20.19+ o 22.12+ y ejecutar `npm install`.
2. Crear un proyecto Supabase **separado**, solo tras autorización.
3. Revisar y aplicar `supabase/migrations/0001_core.sql` en ese proyecto; nunca en HAZYA ni HOUSI Creative Brain.
4. Copiar `.env.example` a `.env` y colocar URL y clave pública anon del proyecto dedicado.
5. Crear usuarios de prueba desde el panel de Supabase Auth (sin registro público durante la beta).
6. Ejecutar `npm run dev` y luego `npm run build`.
7. Probar con dos usuarios distintos que no puedan leer, editar ni borrar los registros del otro.

## Pendientes antes de beta
- Ejecutar build, pruebas automatizadas y QA de autenticación.
- Manejo de errores, estados de carga y paginación.
- Validación de inputs y pruebas de aislamiento de RLS.
- Definir avisos de privacidad y consentimiento para datos de clientes.
- Recuperar y evaluar fuentes de ANUNCIA y HOUSI Kit.

**No se ha aplicado la migración ni se ha desplegado la app.**
