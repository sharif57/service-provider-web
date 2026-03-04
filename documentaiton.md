# Frontend Deployment Documentation (Next.js)

This document explains how to deploy the Next.js frontend project on a
VPS server.\
The project is delivered as a ZIP file (no Git required).

---

## System Requirements

The VPS server must have:

- Ubuntu 20.04+ / Debian / CentOS
- Node.js v18 or higher
- npm (included with Node.js)
- Backend API server running

Check Node.js version:

```bash
node -v
npm -v
```

---

## Step 1: Upload & Extract Project

1.  Download the project ZIP file from Google Drive\
2.  Upload it to the VPS using FileZilla / WinSCP / SCP\
3.  Extract the file:

```bash
unzip frontend-project.zip
cd frontend-project
```

---

## Step 2: Environment Configuration

Create a `.env.local` file in the project root:

```bash
nano .env.local
```

Add the following:

```env
NEXT_PUBLIC_API_URL=http://10.10.12.111:8001
NEXT_PUBLIC_GOOGLE_CLIENT_ID=438230015346-f0nnhfn7pnkd04b00eq1f87ldolpue1s.apps.googleusercontent.com
```

Replace API URL with your backend domain or IP:

```env
NEXT_PUBLIC_API_URL=https://api.yourdomain.com
```

Save file:

    CTRL + X → Y → Enter

---

## Step 3: Install Dependencies

```bash
npm install
```

---

## Step 4: Build for Production

```bash
npm run build
```

---

## Step 5: Run the Application

```bash
npm start
```

The application will run on:

    http://SERVER_IP:3000

---

## Run on VPS with PM2 (Recommended)

Install PM2:

```bash
npm install -g pm2
```

Start the app:

```bash
pm2 start npm --name "nextjs-frontend" -- start
pm2 save
pm2 startup
```

Check status:

```bash
pm2 list
```

Restart app:

```bash
pm2 restart nextjs-frontend
```

---

## Optional: Run on Custom Port

```bash
PORT=3002 npm start
```

---

## Optional: Domain Setup with Nginx

### Install Nginx

```bash
sudo apt install nginx
```

### Create Config

```bash
sudo nano /etc/nginx/sites-available/frontend
```

```nginx
server {
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### Enable Config

```bash
sudo ln -s /etc/nginx/sites-available/frontend /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## Google OAuth Configuration (If Used)

Authorized JavaScript Origins:

    http://localhost:3000
    https://yourdomain.com

Authorized Redirect URI:

    https://yourdomain.com/api/auth/callback/google

---

## Troubleshooting

### API Not Working

- Check `.env.local`
- Ensure backend server is running
- Restart frontend:

```bash
pm2 restart nextjs-frontend
```

### Google Login Not Working

- Verify Google Client ID
- Add domain in Google Cloud Console

### App Not Starting

```bash
npm install
npm run build
npm start
```

---

## Developer Contact

Developer: Sharif Mahamud\
Email: your-email@example.com

---

## Quick Deployment Summary

```bash
unzip frontend-project.zip
cd frontend-project
nano .env.local
npm install
npm run build
pm2 start npm --name frontend -- start
```

---

Deployment Completed.
