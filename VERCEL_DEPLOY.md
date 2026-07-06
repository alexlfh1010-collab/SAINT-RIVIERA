# Publicar a SAINT RIVIERA no GitHub e na Vercel

Este guia usa o domínio temporário da Vercel até a compra de `https://thesaintriviera.com`.

O e-mail `alexlfh1010@gmail.com` é apenas uma referência operacional para entrar no GitHub e na Vercel. Ele não deve ser copiado para o código, para arquivos de ambiente ou para conteúdo público do site.

## Root Directory correto

No repositório GitHub `alexlfh1010-collab/SAINT-RIVIERA`, o projeto Next.js já está na raiz: `package.json`, `app/`, `components/`, `public/`, `next.config.ts` e `tsconfig.json` aparecem diretamente no primeiro nível.

Na Vercel, use **Root Directory: `.`** ou deixe o campo vazio. Não use `outputs/saint-riviera`: esse trecho pertence somente ao caminho local do computador e não existe dentro do repositório GitHub.

Se a Vercel estiver configurada com `outputs/saint-riviera`, abra **Project → Settings → Build and Deployment → Root Directory**, remova esse valor, salve e faça um novo deploy da branch `main`.

## 1. Validar o projeto localmente

Na raiz do projeto, execute:

```cmd
npm.cmd install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm.cmd run lint
npm.cmd run build
```

O repositório também possui `pnpm-lock.yaml`; a Vercel pode instalar as dependências com pnpm automaticamente.

## 2. Criar o repositório no GitHub

1. Entre no GitHub usando a conta associada a `alexlfh1010@gmail.com`.
2. Selecione **New repository**.
3. Use exatamente o nome `saint-riviera`.
4. Escolha repositório privado ou público conforme sua preferência.
5. Não peça ao GitHub para criar README, `.gitignore` ou licença, pois o projeto já possui esses arquivos.
6. Crie o repositório.

Na raiz do projeto, execute:

```cmd
git init
git add .
git status
git commit -m "Prepare SAINT RIVIERA for Vercel"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/saint-riviera.git
git push -u origin main
```

Substitua `SEU-USUARIO` pelo nome de usuário mostrado no GitHub. Antes do commit, confirme que `.env.local`, `.next`, `node_modules` e `.vercel` não aparecem entre os arquivos preparados.

## 3. Importar o projeto na Vercel

1. Entre na Vercel usando a conta associada a `alexlfh1010@gmail.com`.
2. Selecione **Add New → Project**.
3. Autorize o acesso ao GitHub, se solicitado.
4. Importe o repositório `saint-riviera`.
5. Confirme **Framework Preset: Next.js**.
6. Use **Root Directory: `.`** ou deixe o campo vazio. Nunca use `outputs/saint-riviera` neste repositório.
7. Mantenha os comandos automáticos de instalação e build detectados pela Vercel.

## 4. Configurar as variáveis de ambiente

Em **Project → Settings → Environment Variables**, configure para Production, Preview e Development conforme necessário:

```env
NEXT_PUBLIC_SUPABASE_URL=https://kevdhwqtvqtlsaoedzzx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=MINHA_CHAVE
NEXT_PUBLIC_SUPABASE_ANON_KEY=MINHA_CHAVE
NEXT_PUBLIC_SITE_URL=https://URL-GERADA-PELA-VERCEL.vercel.app
NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK=https://invoice.infinitepay.io/plans/alex_lucio_filho/opRt5S97R0
NEXT_PUBLIC_WHATSAPP_NUMBER=55MEUNUMERO
```

`MINHA_CHAVE`, `55MEUNUMERO` e `URL-GERADA-PELA-VERCEL` são placeholders. Não os use literalmente.

O primeiro build também consegue reconhecer a URL automática fornecida pela própria Vercel. Assim que o projeto gerar sua URL real, substitua o placeholder de `NEXT_PUBLIC_SITE_URL` pela URL exata.

## 5. Fazer o primeiro deploy

1. Selecione **Deploy**.
2. Aguarde o build finalizar.
3. Copie o domínio `.vercel.app` mostrado pela Vercel, por exemplo `https://thesaintriviera.vercel.app`.
4. Volte a **Settings → Environment Variables**.
5. Atualize `NEXT_PUBLIC_SITE_URL` com o domínio real copiado, sem barra no final.
6. Abra **Deployments**, escolha o último deploy e selecione **Redeploy**.
7. Abra novamente o domínio `.vercel.app` após o redeploy.

## 6. Configurar o Supabase após o deploy

No Supabase, abra **Authentication → URL Configuration**.

Enquanto estiver usando o domínio temporário:

```text
Site URL:
https://URL-GERADA-PELA-VERCEL.vercel.app

Redirect URLs:
https://URL-GERADA-PELA-VERCEL.vercel.app/**
http://localhost:3000/**
```

Substitua o placeholder pela mesma URL configurada em `NEXT_PUBLIC_SITE_URL`.

## 7. Trocar para o domínio oficial no futuro

Quando `https://thesaintriviera.com` for comprado:

1. Abra **Vercel → Project → Settings → Domains**.
2. Adicione `thesaintriviera.com` e `www.thesaintriviera.com`.
3. Configure os registros DNS exatamente como a Vercel indicar.
4. Atualize `NEXT_PUBLIC_SITE_URL=https://thesaintriviera.com`.
5. Faça um novo deploy.
6. No Supabase, defina a nova **Site URL** e adicione:

```text
https://thesaintriviera.com
https://thesaintriviera.com/**
https://www.thesaintriviera.com/**
```

## 8. Checklist final

- A home abre no domínio `.vercel.app` usando HTTPS.
- Cadastro e login usam o projeto correto do Supabase.
- The Private Society abre normalmente.
- O botão de pagamento abre o plano completo da InfinitePay.
- O botão do WhatsApp abre o número configurado.
- Usuário pendente não acessa `/membro/dashboard`.
- Usuário com `membership_active = true` acessa o dashboard.
- O fluxo foi testado no Safari do iPhone.
- Nenhuma chave real ou `.env.local` foi enviada ao GitHub.
