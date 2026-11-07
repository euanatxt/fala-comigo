# Contribuindo

Que bom que você quer ajudar. O Fala Comigo é um site pequeno, então dá para contribuir sem conhecer o código.

## Ideias e problemas

Abra uma issue descrevendo o que aconteceu e o que você esperava. Se for sobre uma palavra, diga a palavra e o grupo onde ela deveria ficar.

## Palavras novas

A lista de palavras fica em `src/routes/index.tsx`, na lista `CATS`. Para sugerir uma palavra, você pode:

1. Abrir o arquivo e adicionar uma linha no grupo certo: `{ t: "nome da palavra", i: I.NomeDoDesenho }`
2. Abrir um pull request com essa mudança

Escolha o desenho em [lucide.dev](https://lucide.dev) e use o nome dele com `I.` na frente.

## Antes de enviar

```sh
npm run lint
npm run test
```

Os dois precisam terminar sem erros.

## O que a gente evita

- Palavras difíceis demais para o dia a dia de uma criança
- Grupos com muitas palavras na mesma tela
- Cores fortes, emojis e letras que pareçam de desenho animado
- Qualquer coisa que colete dados de quem usa o site
