# Impera's Lab — Landing Page

Landing page institucional de Impera's Lab, construida con **Astro 7 + Tailwind CSS 4**.
Sitio 100% estático (HTML/CSS/JS), sin backend, listo para servirse con Nginx en la VPS.

Todo el contenido está en **pt-BR**.

---

## Estructura

```
.
├── Dockerfile            # Multi-stage build (Astro + Nginx Alpine)
├── docker-compose.yml    # Orquestación para producción con Traefik
├── astro.config.mjs      # Config de Astro + proxy /api/contato en dev
├── deploy/
│   └── nginx-docker.conf # Config de Nginx para el contenedor en producción
├── public/               # Assets servidos tal cual (favicon, og-image, robots)
├── scripts/build-og.mjs  # Regenera public/og-image.png desde el SVG
├── src/
│   ├── components/       # Header, Footer, Logo y secciones de la landing
│   ├── layouts/          # Plantillas Base y LegalPage
│   ├── lib/site-config.js# Datos centrales de la empresa y endpoints
│   ├── pages/            # Páginas: index, legal y 404
│   └── styles/global.css # Estilos globales
└── README.md
```

---

## Comandos

| Comando          | Qué hace                                          |
| ---------------- | ------------------------------------------------- |
| `npm install`    | Instala dependencias                              |
| `npm run dev`    | Servidor local en http://localhost:4321           |
| `npm run build`  | Genera el sitio estático en `dist/`               |
| `npm run preview`| Sirve `dist/` localmente para revisar             |
| `npm run og`     | Regenera `public/og-image.png`                    |

> **Nota:** Node.js está instalado en `C:\Program Files\nodejs` pero no en el PATH de PowerShell.
> Si `npm` no se reconoce, ejecuta antes:
> ```powershell
> $env:Path = "C:\Program Files\nodejs;" + $env:Path
> ```

---

## Captura de leads

Todos los formularios envían un **POST JSON** a `https://n8n.imperaslab.com.br/webhook/contacto-lead`.

Para evitar problemas de CORS, el navegador **no** llama a n8n directamente: postea a
`/api/contato` (mismo origen) y el proxy reenvía la petición.

| Entorno    | Quién hace el proxy                                  |
| ---------- | ---------------------------------------------------- |
| Desarrollo | Vite (`vite.server.proxy` en `astro.config.mjs`)      |
| Producción | Nginx (`location = /api/contato` en el server block)  |

Si el proxy no está disponible (404/405/502), el JS reintenta automáticamente contra la
URL absoluta del webhook — en ese caso n8n necesita devolver cabeceras CORS.

### Payload enviado

```json
{
  "nome": "Roberto Silva",
  "whatsapp": "(83) 99162-5590",
  "whatsapp_e164": "+5583991625590",
  "email": "roberto@empresa.com.br",
  "empresa": "Clínica Alfa",
  "plano": "core",
  "plano_label": "Impera Core (Mais Escolhido)",
  "mensagem": "Perdemos orçamentos por demora no WhatsApp.",
  "consentimento": true,
  "origem": "landing-imperaslab",
  "pagina": "/",
  "url": "https://imperaslab.com.br/#agendamento",
  "referrer": "https://www.instagram.com/",
  "utm": { "utm_source": "meta", "utm_campaign": "core-set" },
  "user_agent": "...",
  "enviado_em": "2026-09-12T14:32:10.123Z"
}
```

### Probar el webhook manualmente

```bash
curl -i -X POST https://n8n.imperaslab.com.br/webhook/contacto-lead -H "Content-Type: application/json" -d '{"nome":"Teste","whatsapp":"(83) 99162-5590","email":"teste@exemplo.com","empresa":"QA","plano":"core","origem":"teste-manual"}'
```

El workflow de n8n debe estar **activo** (no en modo test) para responder en la URL
`/webhook/...`. En modo test la URL es `/webhook-test/...` y solo funciona mientras el
editor está escuchando.

### Protecciones incluidas

- **Honeypot** (`website`): si un bot lo rellena, se simula el éxito y no se envía nada.
- Validación de DDD + número antes del envío.
- Checkbox de consentimiento LGPD obligatorio.
- Rate limit por IP en Nginx (10 req/min).

---

## Personalización

Casi todo se cambia en **`src/lib/site-config.js`**: razón social, CNPJ, e-mails,
WhatsApp, dirección, fecha de los documentos legales y la URL del webhook.

### Pendientes antes de publicar

- [ ] `legalName` y `cnpj` — hoy son marcadores de posición.
- [ ] `address` — el export decía "São Paulo, SP", pero el WhatsApp es DDD 83 (Paraíba)
      y un case es de Cabedelo/PB. Está puesto **João Pessoa, PB**; confirmar.
- [ ] `privacyEmail` (`privacidade@imperaslab.com.br`) — crear el buzón o cambiarlo.
- [ ] Revisar los textos legales con tu abogado.

---

## Deploy

Para publicar con Docker y Traefik:

```bash
docker compose up -d --build
```
