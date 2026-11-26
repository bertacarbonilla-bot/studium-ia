# Configurar Gemini 3.8 Flash en Studium

## Modelo

El Worker utiliza `gemini-3.8-flash` mediante la Gemini Developer API de Google AI Studio.

## Crear la clave

1. Abre Google AI Studio: https://aistudio.google.com/
2. Crea una API key para un proyecto habilitado para Gemini API.
3. No compartas la clave en chats, capturas, Lovable ni GitHub.

## Guardar la clave en Cloudflare

La clave debe guardarse como un **Secret** del Worker, nunca como una variable pública ni en el frontend.

En Cloudflare:
1. Abre Workers & Pages y selecciona `studium-ia`.
2. Entra en Settings → Variables and Secrets.
3. Añade un Secret llamado `GEMINI_API_KEY`.
4. Pega el valor de la clave y guarda.
5. Despliega esta rama solo en un entorno de pruebas antes de cambiar producción.

También se puede configurar desde Wrangler con `npx wrangler secret put GEMINI_API_KEY`.

## Comportamiento

- Modelo: `gemini-3.8-flash`.
- API: Gemini Developer API, endpoint `generateContent`.
- Nivel de razonamiento: `MEDIUM`.
- Máximo de salida: 4.096 tokens en respuestas normales y 8.192 en solicitudes de examen. El límite incluye los tokens de razonamiento.
- El Worker convierte el historial de Studium (`assistant`) al rol `model` de Gemini y conserva el formato de respuesta que espera el frontend.

## Límites y privacidad del nivel gratuito

El nivel gratuito tiene límites de uso que pueden cambiar según el modelo y el proyecto. Google indica que el contenido enviado en el nivel gratuito puede utilizarse para mejorar sus productos. Por eso, durante esta beta, usa únicamente contenido de prueba y no envíes nombres, datos de contacto, expedientes, información personal ni documentos privados de estudiantes.

Antes de abrir la beta a estudiantes reales, revisa las condiciones de privacidad, la protección de datos, los límites de uso y la protección del endpoint frente a solicitudes abusivas. CORS no sustituye la autenticación ni la limitación de peticiones.

## Comprobación

Después de guardar el secreto y desplegar el Worker de pruebas:
1. Envía una pregunta breve desde Studium.
2. Comprueba que responde sin errores.
3. Repite las pruebas de Historia, Matemáticas, Lengua y generación de exámenes.
4. No fusiones esta rama con `main` hasta revisar los resultados.
