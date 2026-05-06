# Meta Ads Setup — Saint Riviera | Look Branco Feminino

**Documento interno de configuração**
Campanha: Feminino | Look Branco Riviera | Meta Ads
Data: Maio 2026 | Orçamento inicial: R$100

---

## 1. Estrutura da Campanha

| Campo | Valor |
|---|---|
| **Objetivo** | Vendas (Purchase) |
| **Nome da campanha** | `SR \| Fem \| LookBranco \| Prosp \| Mai26` |
| **Orçamento total** | R$100 |
| **Orçamento diário** | R$20/dia |
| **Duração do teste** | 5 dias |
| **Tipo de campanha** | ABO (Ad Budget Optimization) |
| **Quantidade de conjuntos** | 1 |
| **Quantidade de anúncios** | 2 (variação A e variação B) |
| **Evento de otimização** | Purchase (se pixel com histórico) / Add to Cart (se pixel novo) |

**Por que ABO e não CBO neste momento:**
Com apenas R$100 e 1 conjunto, ABO e CBO são equivalentes na prática. ABO oferece mais controle manual sobre o orçamento diário do único ad set — preferível na fase de teste onde qualquer ajuste precisa ser rastreável.

---

## 2. Configuração Passo a Passo no Gerenciador

### Passo 1 — Campanha

1. Acesse: **business.facebook.com/adsmanager**
2. Clique em **+ Criar**
3. Objetivo: **Vendas**
4. Localização da conversão: **Site**
5. Nome da campanha: `SR | Fem | LookBranco | Prosp | Mai26`
6. Limite de gasto da campanha: **deixar em branco**
7. Clique em **Próximo**

---

### Passo 2 — Conjunto de Anúncios

**Nome do conjunto:** `Adv+ | Fem | SP+RJ | 28-48 | LookBranco`

**Evento de conversão:**
- Se o pixel já tem histórico de Purchase na loja: selecionar **Compra**
- Se o pixel é novo ou tem menos de 50 compras registradas: selecionar **Adicionar ao carrinho**

**Pixel:** confirmar que o pixel correto da Saint Riviera está selecionado antes de avançar.

---

### Passo 3 — Público

**Tipo:** Advantage+ Audience *(deixar o Meta otimizar — não forçar interesses obrigatórios)*

**Sugestões de público** (campo opcional dentro do Advantage+):
```
Hermès
Ralph Lauren
Loro Piana
Le Lis Blanc
Iguatemi
Fasano
```

**Localização:**
- São Paulo: Jardins, Itaim Bibi, Vila Nova Conceição, Pinheiros
- Rio de Janeiro: Leblon, Ipanema, Lagoa

**Faixa etária:** 28 a 48 anos
**Gênero:** Mulheres

---

### Passo 4 — Posicionamentos

Selecionar: **Posicionamentos manuais**

**Ativar apenas:**
- Feed do Instagram
- Reels do Instagram
- Feed do Facebook

**Desativar:**
- Marketplace
- Audience Network
- Messenger
- Stories do Facebook
- Coluna direita

*Motivo: o criativo é vertical premium — Reels e Feed do Instagram são onde o público feminino qualificado da Saint Riviera passa mais tempo.*

---

### Passo 5 — Orçamento

- **Tipo:** Orçamento diário
- **Valor:** R$20,00/dia
- **Data de início:** hoje
- **Data de término:** aberta (pausar manualmente no dia 5 após análise)

---

### Passo 6 — Anúncio A

**Nome:** `SR_Fem_LookBranco_V1_Pertencimento`

**Identidade:**
- Conta Instagram: perfil Saint Riviera
- Página Facebook: página Saint Riviera

**Mídia:** imagem vertical 4:5 (ou 9:16 para Reels) — look branco feminino

**Primary text:**
```
Há um grupo que reconhece.

Não o logotipo — o caimento. Não o preço — a escolha. O branco de linho
numa varanda com vista para o mar não é acidente. É curadoria.

A Saint Riviera é feita para quem entende essa diferença.

Conjunto Riviera Blanc — linho belga, corte editado, produzido em
pequena escala no Brasil.
```

**Headline:** `Para quem entende o caimento`
**Descrição:** `Linho belga. Alfaiataria em pequena escala. Para quem entende.`
**CTA:** Saiba mais
**URL:** link direto para a página do conjunto na loja Shopify

---

### Passo 7 — Anúncio B

**Nome:** `SR_Fem_LookBranco_V2_Lifestyle`

**Mesma identidade, mesma mídia.**

**Primary text:**
```
Há lugares que pedem uma roupa à altura.

Uma varanda com vista para o mar. Uma tarde sem agenda. O branco que
o vento não estraga porque foi tecido para o calor, para a luz,
para o movimento lento das melhores tardes.

Conjunto Riviera Blanc. Para a tarde que pede presença sem pedir esforço.
```

**Headline:** `O lugar pede uma roupa assim`
**Descrição:** `Linho belga lavado. Caimento editado. Conjunto Riviera Blanc.`
**CTA:** Saiba mais
**URL:** mesmo link do anúncio A

---

### Passo 8 — Revisão antes de publicar

Verificar cada item antes de clicar em **Publicar:**

- [ ] Pixel correto selecionado e ativo
- [ ] Evento de conversão configurado (Purchase ou ATC)
- [ ] URL de destino abre a página correta na loja
- [ ] Imagem no formato correto (sem corte indesejado no preview)
- [ ] Primary text sem erros de digitação
- [ ] Headline com menos de 40 caracteres
- [ ] CTA: Saiba mais (não "Comprar agora")
- [ ] Orçamento: R$20/dia
- [ ] Posicionamentos: Feed + Reels (Instagram e Facebook apenas)
- [ ] Gênero: Mulheres
- [ ] Faixa etária: 28–48
- [ ] Localização: SP + RJ (bairros corretos)

---

## 3. Orçamento — Qual Distribuição Usar

| Opção | Valor/dia | Dias | Prós | Contras |
|---|---|---|---|---|
| **R$20/dia × 5 dias** | R$20 | 5 | Tempo suficiente para algoritmo aprender; dados comparáveis entre dias | Pode ser lento demais para mercados competitivos |
| R$25/dia × 4 dias | R$25 | 4 | Sai do aprendizado um pouco mais rápido | 4 dias é curto para diagnóstico completo |
| R$10/dia × 10 dias | R$10 | 10 | Mais dados no tempo | R$10/dia é insuficiente para sair do aprendizado em fashion premium — CPM alto consome o budget antes de gerar dados úteis |

**Recomendação definitiva: R$20/dia por 5 dias.**

R$10/dia no segmento fashion premium feminino em São Paulo e Rio gera impressões insuficientes — o CPM esperado é R$35–55, o que significa entre 180 e 285 impressões por dia com R$10. Isso não é suficiente para diagnóstico de criativo.

R$20/dia garante entre 360 e 570 impressões diárias no público correto — volume mínimo para identificar se o hook rate e o CTR estão funcionando no segundo dia.

---

## 4. Turbinar no Instagram vs. Meta Ads Manager

| Critério | Turbinar (Boost) | Meta Ads Manager |
|---|---|---|
| Objetivos disponíveis | Engajamento, visitas ao perfil, mensagens | Vendas, leads, tráfego, conversão — completo |
| Evento de conversão | Não disponível | Disponível (Purchase, ATC, etc.) |
| Posicionamentos | Automático (sem controle) | Manual e preciso |
| Segmentação | Básica (idade, gênero, interesses gerais) | Avançada (Advantage+, lookalike, Custom Audiences) |
| Pixel e CAPI | Não integra com profundidade | Integração completa |
| Testes A/B de criativo | Não disponível | Disponível |
| Dados e relatórios | Limitados | Completos |
| Adequado para Saint Riviera | Não | Sim |

**Decisão: sempre Meta Ads Manager para a Saint Riviera.**

Turbinar é uma ferramenta de engajamento social — não de conversão em e-commerce premium. Para uma marca com ticket de R$350–900, cada real de tráfego precisa ser rastreável até o evento de compra. O Boost não oferece isso.

O único cenário onde o Boost faz sentido para a Saint Riviera é amplificar um post orgânico que já está performando muito bem — e mesmo assim, apenas para gerar alcance social, não conversão.

---

## 5. Critérios de Pausa

Pausar o ad set se qualquer condição abaixo persistir após 48 horas de veiculação:

| Situação | Threshold | Ação |
|---|---|---|
| CTR link muito baixo | < 0,5% após R$40 gastos | Pausar o criativo com pior CTR; manter o melhor |
| CPC link muito alto | > R$8,00 | Revisar segmentação — público pode estar errado |
| Nenhum clique após R$30 | 0 cliques | Pausar e revisar posicionamento e criativo |
| Nenhum ATC após R$60 | 0 add to carts | Problema na página de produto — auditar antes de reativar |
| CPM acima de R$80 | > R$80 | Público muito restrito — expandir localização ou faixa etária |
| Comentários negativos recorrentes | 3+ comentários de rejeição | Pausar para revisar criativo; não impulsionar com críticas ativas |

**Regra de ouro:** Não pausar antes de R$30 gastos. O algoritmo precisa de dados mínimos para otimizar — pausar cedo demais desperdiça o aprendizado inicial.

---

## 6. Critérios de Escala

Reinvestir e aumentar orçamento se as condições abaixo forem atendidas:

| Condição | Threshold | Ação |
|---|---|---|
| CTR link saudável | ≥ 1,0% | Manter e observar ATC |
| CPC link saudável | ≤ R$3,50 | Sinal de público qualificado |
| Add to Cart registrado | ≥ 1 ATC por R$30 gastos | Funil funcionando — aumentar para R$40/dia |
| Checkout iniciado | ≥ 1 checkout por R$50 gastos | Aumentar para R$60/dia |
| Purchase realizada | ≥ 1 compra com ROAS ≥ 2,0x | Duplicar ad set em nova campanha CBO — não aumentar o ABO |
| Direct qualificado | Mulheres perguntando sobre produto, tamanho, disponibilidade | Sinal de interesse real — responder com elegância e monitorar conversão |

**Regra de escala:** Nunca aumentar mais de 20% do orçamento de um ad set no mesmo dia. Aumentos acima de 20% reiniciam o aprendizado do algoritmo. Para escalar rápido: duplicar o ad set em uma campanha CBO separada com o criativo vencedor.

---

## 7. Checklist Manual para Configurar no Meta Ads

Use este checklist com o Gerenciador aberto. Marque cada item antes de clicar em Publicar.

### CAMPANHA
- [ ] Objetivo: Vendas
- [ ] Localização da conversão: Site
- [ ] Nome copiado exatamente: `SR | Fem | LookBranco | Prosp | Mai26`
- [ ] Nenhum limite de gasto de campanha definido

### CONJUNTO DE ANÚNCIOS
- [ ] Pixel Saint Riviera selecionado e com status "Ativo"
- [ ] Evento: Compra (ou Add to Cart se pixel novo)
- [ ] Tipo de público: Advantage+ Audience
- [ ] Sugestões de público inseridas (Hermès, Ralph Lauren, Le Lis Blanc, Loro Piana, Iguatemi)
- [ ] Gênero: Mulheres
- [ ] Faixa etária: 28–48
- [ ] Localização: SP (Jardins, Itaim, VNC, Pinheiros) + RJ (Leblon, Ipanema, Lagoa)
- [ ] Posicionamentos manuais: Feed + Reels (Instagram e Facebook)
- [ ] Marketplace, Audience Network e Messenger: DESATIVADOS
- [ ] Orçamento diário: R$20,00
- [ ] Data de término: em aberto

### ANÚNCIO A
- [ ] Nome: `SR_Fem_LookBranco_V1_Pertencimento`
- [ ] Conta Instagram correta selecionada
- [ ] Imagem enviada no formato 4:5 ou 9:16
- [ ] Preview no feed do Instagram verificado (imagem não cortada)
- [ ] Primary text colado (versão Pertencimento)
- [ ] Headline: `Para quem entende o caimento`
- [ ] CTA: Saiba mais
- [ ] URL testada — abre o produto correto na loja

### ANÚNCIO B
- [ ] Nome: `SR_Fem_LookBranco_V2_Lifestyle`
- [ ] Mesma conta Instagram
- [ ] Primary text colado (versão Lifestyle)
- [ ] Headline: `O lugar pede uma roupa assim`
- [ ] CTA: Saiba mais
- [ ] Mesma URL testada

### REVISÃO FINAL
- [ ] Revisar aba "Revisão" do Meta — sem erros ou avisos críticos
- [ ] Confirmar que não há desconto, preço ou urgência em nenhuma copy
- [ ] Confirmar que o pixel está disparando na loja (testar via Meta Pixel Helper)
- [ ] Publicar

### PÓS-PUBLICAÇÃO (primeiras 24h)
- [ ] Verificar se o status do ad set passou de "Aprendizado" para "Ativo"
- [ ] Não mexer em nada nas primeiras 48h
- [ ] Abrir métricas apenas para leitura — sem ajustes antes de R$30 gastos
- [ ] Publicar stories de apoio orgânicos no mesmo dia

---

*Documento de configuração técnica — para uso interno antes de qualquer investimento em tráfego pago.*
*Aprovação: paid-traffic / brand-director / fundador*
