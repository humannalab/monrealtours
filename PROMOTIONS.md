# Sistema de Promoções Temporárias — Monreal Tours

Este documento é um briefing para conversas de criação de conteúdo (e-mail, banners, posts). Leia antes de começar qualquer tarefa de criação.

---

## O que é esse sistema

O site da Monreal Tours (estático, GitHub Pages) exibe cards de promoções temporárias que somem automaticamente quando a data de validade passa. O conteúdo do e-mail e do card do site é o mesmo — criado uma só vez, publicado em dois lugares.

---

## Regra obrigatória para a conversa de e-mail

**Sempre que criar ou adaptar um e-mail de oferta/promoção, pergunte ao usuário:**

> "Quer publicar essa promoção no site também? Se sim, me diz até quando ela vale."

Se o usuário confirmar, gere o bloco JSON abaixo como parte da resposta, pronto para colar em `data/promotions.json`.

---

## Estrutura de arquivos

```
monrealtours/
├── data/
│   └── promotions.json       ← arquivo central de promoções ativas
├── assets/
│   └── js/
│       └── promotions.js     ← script que renderiza os cards no site
└── index.html                ← seção "Ofertas" onde os cards aparecem
```

> **Nota:** `data/promotions.json` e `assets/js/promotions.js` ainda não existem — serão criados na sessão de implementação técnica.

---

## Schema de uma promoção

```json
{
  "id": "promo-001",
  "titulo": "Ski em Bariloche",
  "descricao": "Pacotes a partir de R$ 4.900 por pessoa. Aéreo + hotel + transfers inclusos.",
  "imagem": "assets/images/promotions/bariloche-2026.jpg",
  "cta_texto": "Ver pacote",
  "cta_link": "/neve-ski.html",
  "validade": "2026-08-31",
  "criado_em": "2026-06-30",
  "ativo": true
}
```

### Campos obrigatórios

| Campo | Tipo | Descrição |
|---|---|---|
| `id` | string | Identificador único. Formato: `promo-NNN` (sequencial) |
| `titulo` | string | Título do card. Mesmo do subject do e-mail |
| `descricao` | string | Texto curto (máx. 120 caracteres) |
| `imagem` | string | Caminho relativo da imagem no repositório |
| `cta_texto` | string | Texto do botão |
| `cta_link` | string | URL de destino (página interna ou externa) |
| `validade` | string | Data no formato `YYYY-MM-DD`. Após essa data o card some do site |
| `criado_em` | string | Data de criação no formato `YYYY-MM-DD` |
| `ativo` | boolean | `true` para exibir, `false` para ocultar manualmente sem excluir |

---

## Como o site remove promoções expiradas

O script `promotions.js` roda no carregamento da página e:

1. Lê `data/promotions.json`
2. Filtra entradas onde `validade >= hoje` E `ativo === true`
3. Renderiza apenas os cards válidos na seção "Ofertas" do `index.html`

Nenhuma ação manual é necessária — quando a data passa, o card some automaticamente para todos os visitantes.

---

## Fluxo completo de publicação

```
1. Usuário pede um e-mail de promoção
      ↓
2. Claude cria o e-mail (HTML, adaptado do template email-monreal.html)
      ↓
3. Claude pergunta: "Quer publicar no site? Até quando vale?"
      ↓
4. Usuário confirma e informa a data
      ↓
5. Claude gera o bloco JSON da promoção
      ↓
6. Usuário cola o bloco em data/promotions.json e faz git push
      ↓
7. Card aparece no site até a data de validade
```

---

## Identidade visual dos cards

Os cards de promoção seguem a mesma identidade do site:

- **Fundo:** `#F5F3EE` (off-white — nunca `#FFFFFF`)
- **Cor primária:** `#001489` (azul Monreal)
- **Destaque/acento:** `#00AEEF` (azul claro)
- **Tipografia display:** Sora
- **Tipografia corpo:** Inter
- **Sem seções escuras** — não usar `#0A0A0A` como fundo de seção

---

## Sessão pendente: implementação técnica

A implementação de `data/promotions.json`, `assets/js/promotions.js` e a seção de cards em `index.html` ainda não foi feita. Quando quiser implementar, abra uma sessão de Claude Code com o contexto:

> "Implementar o sistema de promoções temporárias conforme descrito em PROMOTIONS.md"
