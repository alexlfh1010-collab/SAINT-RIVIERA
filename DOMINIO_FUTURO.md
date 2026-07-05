# Domínio futuro — SAINT RIVIERA

## Planejamento

- Domínio oficial planejado: `https://thesaintriviera.com`
- Situação atual: usar o domínio HTTPS criado pela Vercel, como `https://thesaintriviera.vercel.app`

A URL real gerada pela Vercel pode ser diferente do exemplo. Copie sempre a URL exibida em **Project → Domains**.

## Enquanto o domínio oficial não for comprado

Na Vercel, configure:

```text
NEXT_PUBLIC_SITE_URL=https://URL-DA-VERCEL.vercel.app
```

No Supabase, em **Authentication → URL Configuration**:

```text
Site URL:
https://URL-DA-VERCEL.vercel.app

Redirect URLs:
https://URL-DA-VERCEL.vercel.app/**
http://localhost:3000/**
```

Faça um novo deploy depois de cadastrar ou alterar a variável.

## Quando comprar thesaintriviera.com

1. Abra **Vercel → Project → Settings → Domains**.
2. Adicione `thesaintriviera.com`.
3. Adicione `www.thesaintriviera.com` e redirecione-o para o domínio sem `www`.
4. Configure os registros DNS exatamente como a Vercel indicar.
5. Aguarde a validação do domínio e do certificado HTTPS.
6. Atualize na Vercel:

```text
NEXT_PUBLIC_SITE_URL=https://thesaintriviera.com
```

7. Faça novo deploy.
8. No Supabase, troque a **Site URL** e adicione os redirects:

```text
Site URL:
https://thesaintriviera.com

Redirect URLs:
https://thesaintriviera.com/**
https://www.thesaintriviera.com/**
http://localhost:3000/**
```

## Teste obrigatório após cada troca

No Safari do iPhone:

1. Abra a home pelo domínio ativo.
2. Crie uma conta nova.
3. Confirme o e-mail.
4. Faça login.
5. Verifique o redirecionamento para pagamento pendente.
6. Teste InfinitePay e WhatsApp.
7. Confirme que um membro pendente não acessa `/membro/dashboard`.
8. Confirme que um membro ativo acessa normalmente.

Não é necessário alterar componentes quando o domínio mudar. Autenticação, metadata, redirects e webhook usam a URL fornecida por `NEXT_PUBLIC_SITE_URL`.
