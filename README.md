# SAINT RIVIERA — Maison digital + Private Society

Aplicação Next.js em português brasileiro com vitrine pública, catálogo, produtos, Concierge, autenticação Supabase, área privada, painel administrativo e checkout InfinitePay preparado no servidor.

## Windows com Node.js portátil

O projeto está preparado para usar diretamente:

```text
C:\Users\alexl\Downloads\nodejs-lts\node-v22.23.1-win-x64
```

Não é necessário instalar Node, npm ou pnpm globalmente e não é necessário executar como administrador.

Fluxo recomendado, porque o projeto possui `pnpm-lock.yaml`:

1. Dê duplo clique em `install-pnpm.cmd` uma vez para instalar/validar as dependências.
2. Dê duplo clique em `start-pnpm.cmd` sempre que quiser iniciar o site.
3. Abra `http://localhost:3000` no navegador.

Alternativa com npm:

- `install-saint-riviera.cmd` instala com npm somente quando não existe uma instalação pnpm em `node_modules`.
- `start-saint-riviera.cmd` inicia com `npm.cmd run dev` usando o mesmo Node portátil.

Não misture `npm install` e `pnpm install` no mesmo `node_modules`. Se as dependências atuais foram instaladas pelo pnpm, use `install-pnpm.cmd`.

## Como abrir o site no celular na mesma rede Wi-Fi

1. Conecte o notebook e o celular à mesma rede Wi-Fi.
2. Dê duplo clique em `start-network.cmd` na raiz do projeto.
3. Abra o Prompt de Comando, digite `ipconfig` e procure o **Endereço IPv4** do adaptador Wi-Fi, por exemplo `192.168.0.15`.
4. No Safari do celular, abra `http://SEU-IP:3000`.

Exemplo:

```text
http://192.168.0.15:3000
```

`localhost` e `127.0.0.1` não funcionam no celular porque apontam para o próprio celular, não para o notebook. O script de rede inicia o Next.js em `0.0.0.0:3000`, permitindo conexões de outros dispositivos da rede local.

Se o endereço não abrir, permita o Node.js ou a porta TCP 3000 nas **redes privadas** do Firewall do Windows. Faça isso somente em uma rede confiável, como sua rede doméstica. Não exponha o servidor de desenvolvimento diretamente à internet e não desative permanentemente o firewall.

## Rodar localmente

Requisitos: Node.js 20.9 ou superior e pnpm.

```bash
pnpm install
copy .env.example .env.local
pnpm dev
```

Acesse `http://localhost:3000`.

Para validar a experiência privada sem Supabase, use `DEMO_MEMBER_MODE=true` apenas localmente e abra `/membro/dashboard`. Essa opção nunca deve ser habilitada na Vercel.

## Supabase

1. Crie um projeto no Supabase.
2. Abra o SQL Editor e execute [`supabase/schema.sql`](./supabase/schema.sql).
3. Copie a Project URL, anon key e service role key para `.env.local`.
4. Em Authentication → URL Configuration, defina o domínio público como Site URL e adicione `http://localhost:3000/**` durante o desenvolvimento.
5. Para o MVP, abra Authentication → Providers → Email e deixe **Confirm email OFF**.
6. Com a confirmação desativada, o cadastro cria uma sessão imediatamente e envia o usuário para a InfinitePay ou para `/pagamento-pendente`.

No MVP, a barreira de acesso ao clube é `membership_active = true`, liberada somente após pagamento/ativação. A confirmação de e-mail não participa desse fluxo.

Variáveis:

```env
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

A `service role key` é usada somente em Route Handlers e Server Actions. Nunca deve receber prefixo `NEXT_PUBLIC_`.

O schema cria:

- `profiles`, com status e membership;
- `orders`, com pedidos e transações InfinitePay;
- `credit_ledger`, com histórico de crédito;
- `wishlist`;
- RLS para isolamento dos dados;
- trigger de perfil no cadastro;
- função transacional que reserva os primeiros 100 founders e adiciona R$30 de crédito.

## InfinitePay

Configure:

```env
INFINITEPAY_HANDLE=sua_infinite_tag_sem_cifrao
NEXT_PUBLIC_SITE_URL=https://URL-DA-VERCEL.vercel.app
NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK=
INFINITEPAY_WEBHOOK_SECRET=use_um_token_longo_e_aleatorio
```

Para o fluxo de pagamento funcionar, configure no .env.local e na Vercel:

```env
NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK=https://invoice.infinitepay.io/plans/alex_lucio_filho/opRt5S97R0
```

O link correto precisa ser o link completo do plano InfinitePay. Para a The Private Society, use `https://invoice.infinitepay.io/plans/alex_lucio_filho/opRt5S97R0`. Não use apenas o domínio da InfinitePay, links do Instagram, valores codificados ou URLs com caracteres extras no final.
### Assinatura

O fluxo de membership cria primeiro um `order` pendente. Com `INFINITEPAY_HANDLE` configurado, ele gera um checkout integrado com `order_nsu`, retorno e webhook, permitindo a ativação automática depois da confirmação de pagamento. O link direto de `NEXT_PUBLIC_INFINITEPAY_MEMBERSHIP_LINK` permanece como contingência para conciliação manual.

### Produtos

`POST /api/infinitepay/create-checkout`:

- recebe apenas identificador, quantidade, tamanho, cor e dados opcionais do cliente;
- recupera produto e preço no servidor;
- mantém os preços em centavos;
- cria `order_nsu` interno;
- registra o pedido antes do redirecionamento;
- envia `items`, `customer`, `address`, `redirect_url` e `webhook_url` para a InfinitePay.

### Webhook

Cadastre na InfinitePay:

```text
https://URL-DA-VERCEL.vercel.app/api/webhooks/infinitepay
```

O endpoint responde `200` rapidamente e processa a confirmação em segundo plano. O checkout inclui `INFINITEPAY_WEBHOOK_SECRET` como token privado na URL do webhook e o endpoint rejeita tokens incorretos. Além disso, o sistema confirma a transação pelo `payment_check`, compara `order_nsu` e valor, e só então ativa o pedido ou membership.

Documentação oficial: [Checkout Integrado InfinitePay](https://www.infinitepay.io/checkout-documentacao).

## Administração

Para o primeiro administrador, altere o status diretamente no SQL Editor:

```sql
update public.profiles
set status = 'admin', membership_active = true
where email = 'seu-email@dominio.com';
```

Depois, `/admin` permite:

- visualizar pendentes e membros;
- ativar membership manualmente;
- definir `founder`, `member` ou `pending`;
- ajustar crédito;
- acompanhar pedidos pagos e pendentes.

## Catálogo

Os produtos mockados ficam em [`data/products.ts`](./data/products.ts). Preços são inteiros em centavos. Edite nesse arquivo nome, slug, preço, gênero, cores, tamanhos, imagem, copy editorial e status de private drop.

## Concierge

Configure o WhatsApp com DDI e DDD, apenas números:

```env
NEXT_PUBLIC_WHATSAPP_NUMBER=
```

## Deploy na Vercel

1. Importe o repositório na Vercel.
2. Defina o diretório raiz como esta pasta.
3. Cadastre todas as variáveis de `.env.example` em Project Settings → Environment Variables.
4. Faça o primeiro deploy.
5. Defina `NEXT_PUBLIC_SITE_URL` com a URL temporária da Vercel e, no futuro, troque para `https://thesaintriviera.com`.
6. Atualize Site URL/Redirect URLs no Supabase.
7. Cadastre a URL de webhook final na InfinitePay.
8. Execute um pagamento real de baixo valor em homologação operacional e confirme pedido, valor, `transaction_nsu` e ativação.

Antes de publicar, deixe `DEMO_MEMBER_MODE=false`.

## Rotas

Públicas: `/`, `/colecoes`, `/homens`, `/mulheres`, `/looks-completos`, `/produto/[slug]`, `/the-private-society`, `/founders-circle`, `/inside`, `/concierge`, `/login`, `/cadastro` e `/pagamento-pendente`.

Privadas: `/membro/dashboard`, `/membro/creditos`, `/membro/private-drops`, `/membro/indicacoes`, `/membro/wishlist` e `/admin`.
