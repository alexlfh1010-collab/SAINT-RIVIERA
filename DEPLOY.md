# Deploy na Vercel — SAINT RIVIERA

O projeto pode ser publicado agora no domínio temporário da Vercel. A URL pública vem de `NEXT_PUBLIC_SITE_URL`; por isso, a troca futura para `https://thesaintriviera.com` não exige alterações no código.

## 1. Validar o projeto

Na raiz da aplicação:

```cmd
npm.cmd install --package-lock=false --legacy-peer-deps --no-audit --no-fund
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

O `package.json` também mantém compatibilidade com pnpm.

## 2. Publicar no GitHub

Confirme que `.env.local` não aparece em `git status`. Nunca envie tokens ou chaves privadas ao repositório.

```cmd
git init
git add .
git commit -m "Prepare SAINT RIVIERA for Vercel"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/saint-riviera.git
git push -u origin main
```

## 3. Criar o projeto na Vercel

1. Acesse a Vercel e selecione **Add New → Project**.
2. Importe o repositório do GitHub.
3. Confirme **Framework Preset: Next.js**.
4. Use **Root Directory: `.`** se o repositório contiver somente a aplicação. Em um monorepo, selecione `outputs/saint-riviera`.
5. Faça o primeiro deploy. A Vercel criará uma URL como `https://thesaintriviera.vercel.app` ou outra URL automática.

O código reconhece a URL de sistema da Vercel no primeiro deploy. Ainda assim, configure `NEXT_PUBLIC_SITE_URL` explicitamente após conhecer a URL definitiva do projeto e faça um novo deploy.

## 4. Variáveis de ambiente

Em **Project → Settings → Environment Variables**, configure:

```text
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
NEXT_PUBLIC_SUPABASE_ANON_KEY
NEXT_PUBLIC_SITE_URL
NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK
NEXT_PUBLIC_WHATSAPP_NUMBER
SUPABASE_SERVICE_ROLE_KEY
INFINITEPAY_HANDLE
INFINITEPAY_WEBHOOK_SECRET
DEMO_MEMBER_MODE=false
```

Enquanto estiver no domínio temporário:

```text
NEXT_PUBLIC_SITE_URL=https://URL-DA-VERCEL.vercel.app
```

Exemplo, somente se essa for a URL criada no painel:

```text
NEXT_PUBLIC_SITE_URL=https://thesaintriviera.vercel.app
```

Depois da compra do domínio:

```text
NEXT_PUBLIC_SITE_URL=https://thesaintriviera.com
```

Depois de mudar uma variável na Vercel, faça um novo deploy. Variáveis `NEXT_PUBLIC_` são incorporadas ao build e não alteram deploys antigos.

## 5. Supabase durante o domínio temporário

Em **Authentication → URL Configuration**, use a URL exata gerada no seu projeto:

```text
Site URL:
https://URL-DA-VERCEL.vercel.app

Redirect URLs:
https://URL-DA-VERCEL.vercel.app/**
http://localhost:3000/**
```

Se a URL for `https://thesaintriviera.vercel.app`, substitua o placeholder por ela. Não cadastre literalmente `URL-DA-VERCEL`.

No template de confirmação de e-mail, use:

```text
{{ .RedirectTo }}?token_hash={{ .TokenHash }}&type=email
```

O cadastro envia o token para `/auth/confirm`; depois da validação, a aplicação encaminha o usuário para `/pagamento-pendente`.

## 6. InfinitePay e WhatsApp

- Membership: `NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK` deve conter um link HTTPS direto da InfinitePay.
- Checkout integrado: `INFINITEPAY_HANDLE` deve conter a InfiniteTag sem `$`.
- Webhook: a aplicação monta automaticamente a URL com o domínio de `NEXT_PUBLIC_SITE_URL`.
- WhatsApp: `NEXT_PUBLIC_WHATSAPP_NUMBER` deve conter apenas números, com DDI e DDD.

Com o domínio temporário, o webhook será semelhante a:

```text
https://URL-DA-VERCEL.vercel.app/api/webhooks/infinitepay
```

Quando `NEXT_PUBLIC_SITE_URL` mudar, novos checkouts passarão a usar o domínio novo automaticamente.

## 7. Trocar para o domínio oficial

Quando `thesaintriviera.com` for comprado:

1. Abra **Vercel → Project → Settings → Domains**.
2. Adicione `thesaintriviera.com` e `www.thesaintriviera.com`.
3. Configure no registrador os registros DNS mostrados pela Vercel.
4. Defina `thesaintriviera.com` como domínio principal e redirecione `www` para ele.
5. Atualize `NEXT_PUBLIC_SITE_URL=https://thesaintriviera.com`.
6. Faça novo deploy.
7. Atualize Site URL e Redirect URLs no Supabase.
8. Faça um novo teste controlado de autenticação e pagamento.

Consulte também [`DOMINIO_FUTURO.md`](./DOMINIO_FUTURO.md).

## 8. Teste final no Safari

1. Abra a URL HTTPS da Vercel no Safari do iPhone.
2. Teste menu, imagens, cadastro e login.
3. Confirme o e-mail no próprio iPhone.
4. Verifique o redirecionamento para `/pagamento-pendente`.
5. Teste o checkout InfinitePay com uma cobrança controlada.
6. Confirme `membership_active=true` no Supabase antes de acessar `/membro/dashboard`.
7. Abra o WhatsApp e valide número e mensagem.
8. Compartilhe a home e confira título, descrição e imagem.

O domínio temporário da Vercel já é público e usa HTTPS; não é necessário expor localhost ou IP da rede Wi-Fi.
