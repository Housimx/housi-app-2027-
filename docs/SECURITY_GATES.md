# Controles obligatorios

- Repositorio público: sin secretos, datos personales, tokens ni documentos privados.
- Secretos exclusivamente en servicios de ejecución seguros; nunca en VITE_ salvo claves públicas previstas para navegador.
- No aplicar SQL de borrador sin revisar RLS, FKs, privilegios y Storage.
- Probar aislamiento con usuarios A y B: SELECT, INSERT, UPDATE, DELETE y referencias cruzadas.
- Revisar archivos cargados: autorización, tipo, tamaño y rutas de almacenamiento.
- IA: no exponer claves al navegador, validar autenticación, cuota, entradas y errores.
- No publicar ni generar gastos sin autorización expresa.
- Mantener separada esta app de HAZYA y de HOUSI Creative Brain.
