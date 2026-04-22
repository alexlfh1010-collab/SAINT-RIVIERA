# ESTRATÉGIA DE TRÁFEGO PAGO — R$100/DIA — SAINT RIVIERA

> O que separa uma marca premium de uma fast fashion no Meta Ads hoje não é orçamento de produção — é disciplina estética, hook visual tátil nos primeiros 2 segundos e CTA contemplativo em vez de imperativo.

---

## ESTRUTURA DE CAMPANHAS — PRIMEIROS 30-60 DIAS

### Por que NÃO usar ASC puro no início
ASC (Advantage+ Shopping Campaign) só funciona com ~50 compras em 30 dias. Com ticket alto de moda premium e orçamento inicial baixo, o algoritmo não gera esse volume — e o ASC desperdiça aprendizado. Usar CBO/ABO híbrido.

---

### CAMPANHA 1 — Teste Criativo [ABO]
**Orçamento:** R$60/dia | **Objetivo:** Vendas | **3 ad sets de R$20/dia cada**

| Ad Set | Público |
|---|---|
| **A** | Advantage+ Audience (broad) |
| **B** | Interesses Cluster Luxo |
| **C** | Lookalike 1-3% de engajadores Instagram 365d |

**Interesses para Cluster Luxo (ad set B):**
Hermès OR Louis Vuitton OR Ralph Lauren OR Loro Piana OR Cucinelli OR Animale OR Le Lis OR Farm premium OR Iguatemi JK OR Shopping Cidade Jardim OR Oscar Freire OR Daslu OR Farfetch — combinado em AND com Travel + Luxury + Fashion

**Cada ad set roda 3-4 criativos simultaneamente.**

---

### CAMPANHA 2 — Remarketing [CBO]
**Orçamento:** R$25/dia | **2 ad sets**

| Ad Set | Público |
|---|---|
| **Remarketing frio** | Visitantes 30d excluindo ATC |
| **Remarketing quente** | ATC 14d excluindo Purchase |

---

### CAMPANHA 3 — DPA Catálogo
**Orçamento:** R$15/dia | Ativar após o pixel registrar 100+ ViewContent

---

## SEGMENTAÇÃO GEOGRÁFICA

Focar nos CEPs de alta renda:

| Cidade | Bairros/regiões |
|---|---|
| **São Paulo** | Jardins, Itaim, Vila Nova Conceição, Pinheiros |
| **Rio de Janeiro** | Leblon, Ipanema, Lagoa, Barra |
| **Brasília** | Asa Sul, Lago Sul |
| **Belo Horizonte** | Lourdes, Savassi |
| **Curitiba** | Batel |
| **Florianópolis** | Jurerê |
| **Balneário Camboriú** | BC centro, Barra Sul |
| **Goiânia** | Setor Marista |
| **Alphaville** | — |

**Faixa etária:** 28-55 anos | **Sweet spot:** 32-48 anos

---

## CRITÉRIOS DE VALIDAÇÃO DE CRIATIVO

Precisa bater **4 de 6 métricas** com R$50-100 gastos:

| Métrica | Meta mínima |
|---|---|
| CPM | ≤ R$40 |
| Hook rate (3s/impressões) | ≥ 25% |
| Hold rate (retenção) | ≥ 20% |
| CTR all | ≥ 1,5% |
| CTR link | ≥ 1,0% |
| ROAS | ≥ 2,2x |

---

## MÉTODO DE ESCALA 0-20-50-100

Para cada ad set vencedor, seguir rigorosamente:

| Dias | Ação |
|---|---|
| **Dias 0-2** | Lançar com R$20/dia. Não mexer. Monitorar apenas hook rate e CPM. |
| **Dia 3** | Se hook rate ≥25% e CTR ≥1% → manter. Senão → pausar e trocar criativo. |
| **Dias 4-5** | Se houve ATC/compra com CPA dentro da meta → subir para R$50/dia. |
| **Dia 7** | Se ROAS ≥2,5x mantido → subir para R$100/dia. |
| **Dia 10+** | Aumentos de +20% a cada 3 dias. |

### Cálculo do CPA alvo
```
CPA alvo = (ticket × margem) ÷ ROAS alvo

Exemplo: ticket R$600 × margem 65% ÷ ROAS 2,5x = CPA alvo R$156
```

---

## REGRAS ANTI-RESET (CRÍTICAS)

1. **Nunca aumente mais de 20%/dia** em um ad set fora do aprendizado
2. Se quiser dobrar rápido: **duplique o ad set em CBO separado** com novo budget — preserva o aprendizado do ad set original
3. **Não mexer** em público, criativo ou otimização durante a fase de aprendizagem (~50 conversões para sair)
4. Fase de aprendizagem: respeitar os primeiros 7 dias sem ajustes

---

## SETUP TÉCNICO OBRIGATÓRIO — DIA 0

Antes de rodar qualquer anúncio:

| Item | Detalhe |
|---|---|
| **Meta Pixel** | Via GTM |
| **CAPI** | Via Shopify Enhanced Mode — ou Elevar/Stape.io se VTEX/Nuvemshop |
| **Deduplicação** | Pixel + CAPI com event_id |
| **Advanced Matching** | Email + phone + first_name + city + zip → Event Match Quality ≥ 8 (reduz CPA em 10-25%) |
| **Domain Verification** | Obrigatório |
| **AEM (Aggregated Event Measurement)** | 8 eventos priorizados: Purchase, InitiateCheckout, AddToCart, ViewContent, Lead, AddPaymentInfo, CompleteRegistration, PageView |
| **Commerce Manager** | Catálogo ativo e sincronizado |
| **Custom Audiences** | 4 básicas: visitantes 30d, ATC 14d, engajadores IG 90d, compradores 180d |

---

## CRONOGRAMA DE ESCALA — 3 MESES

| Período | Ação | Orçamento |
|---|---|---|
| **Mês 1 (dias 1-30)** | Rodar os 3 roteiros, identificar criativo vencedor, validar métricas | R$100/dia |
| **Mês 2 (dias 31-60)** | Produzir 2 variações do vencedor, escalar ad sets validados | R$200-300/dia |
| **Mês 3 (dias 61-90)** | Migrar para ASC (quando atingir 50 compras/30 dias), manter 30% em teste criativo | R$300-500/dia |

> **Regra de ouro:** Sempre manter 30% do orçamento em teste criativo contínuo, mesmo escalando.

---

## CONCLUSÃO — A DISCIPLINA VALE MAIS QUE O ORÇAMENTO

O exercício de engenharia reversa revela uma verdade contraintuitiva: **o que separa Ralph Lauren/Loro Piana/Cucinelli/Zegna de uma marca de varejo popular não é o orçamento de mídia, é a disciplina estética e narrativa mantida ao longo de décadas em cada ponto de contato.**

Cucinelli, com controle 100% interno e sem agência, gera campanhas mais premium do que grupos com budgets 10x maiores. Essa é a boa notícia para a Saint Riviera: a marca não precisa competir em orçamento — precisa competir em **coerência**.

### As 3 alavancas decisivas (em ordem de retorno sobre esforço)

1. **Hook tátil nos primeiros 2 segundos** — textura, mão, passo, olhar — nunca rosto falando
2. **Paleta hermética e luz natural mantidas em 100% dos outputs** — inclusive nos Stories casuais
3. **Copy filosófico-contemplativo em vez de transacional** — usando o léxico aprovado e banindo absolutamente o léxico proibido

> Com o imposto de 12,15% sobre mídia digital no Brasil (vigente desde fim de 2025), a pressão sobre CPM torna a qualidade criativa ainda mais decisiva. Dados Nielsen/Meta mostram que em fashion/luxury o criativo responde por **70-80% da performance**.
