## Installation

```bash
# Dependencies installieren
npm install

# Prisma Client generieren
npx prisma generate
```

## Starten

### 1. Frontend starten

```bash
npm run dev
```

→ Öffnet Vite Dev Server auf **http://localhost:5173/**

### 2. Backend starten (in separatem Terminal)

```bash
npm run server
```

→ Express API läuft auf **http://localhost:3000/**

## Notizen

- Der TypeScript Code in `index.ts` wird beim Starten automatisch zu JavaScript kompiliert
- Die kompilierten `.js` Dateien sind in `.gitignore` – nicht in Git commiten
- `.env` Datei für `DATABASE_URL` konfigurieren für Datenbankverbindung