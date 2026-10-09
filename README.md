# TAFWITA — Guide de démarrage

File d'attente pour cabinets médicaux en Algérie. Les patients prennent un
ticket à distance. Le cabinet gère la file sur téléphone ou sur PC, y compris
les tickets papier.

## Fichiers (tout est à la racine)

| Fichier | Rôle |
|---|---|
| `main.py` | API FastAPI + base de données |
| `patient.html` | App patient (PWA) |
| `cabinet.html` | Console cabinet (PWA téléphone) |
| `index.html` | Site vitrine + inscription essai |
| `admin.html` | Administration |
| `tafwita_desktop.py` | Application bureau Windows |
| `poc.py` | Tests de sécurité |

## 1. Une seule fois

1. Python 3.12 — vérifier : `py --version`
2. Dans ce dossier :

```powershell
py -m venv .venv
.\.venv\Scripts\activate
py -m pip install -r requirements.txt
py -m pip install "uvicorn[standard]"
```

## 2. Fichier `.env` (ne jamais le committer)

Crée `.env` dans ce dossier :

```
DATABASE_URL=sqlite:///./dev.db
ADMIN_TOKEN=change-moi-par-une-valeur-aleatoire-de-32-caracteres
```

- `ADMIN_TOKEN` : au moins 24 caractères. Sans cette variable, l'admin refuse tout accès.
- Générer un token : `py -c "import secrets; print(secrets.token_urlsafe(32))"`

## 3. Lancer l'API

```powershell
.\.venv\Scripts\activate
uvicorn main:app --reload --env-file .env
```

- Santé : `http://127.0.0.1:8000/health`
- Docs : `http://127.0.0.1:8000/docs`

## 4. Tests de sécurité

```powershell
py poc.py
```

Doit afficher `0 echec`. Relancer après chaque changement de `main.py`.

## 5. Voir les pages

```powershell
py -m http.server 5500
```

Puis `http://127.0.0.1:5500/patient.html` ou `cabinet.html`.

Par défaut les pages parlent à l'API Render. Pour le local, dans la console
navigateur : `localStorage.setItem("tafwita_api","http://127.0.0.1:8000")`.

Connexion cabinet : identifiant (nom du cabinet) + **mot de passe** (pas un PIN).
Les comptes déjà créés avec un PIN 6 chiffres peuvent encore s'en servir.

Application bureau :

```powershell
py -m pip install customtkinter requests qrcode pillow
py tafwita_desktop.py
```

## 6. Déploiement

- Pages (vitrine / patient / cabinet) : dépôt GitHub `tafwita`
- API : dépôt `tafwita-api` sur Render, variables `DATABASE_URL` et `ADMIN_TOKEN`
