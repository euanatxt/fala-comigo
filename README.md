# Fala Comigo

Prancha de comunicação para crianças com dificuldades de fala: a criança toca nas palavras, ouve o som delas e monta a própria frase.

Feito para ser usado no celular, no tablet ou no computador — sem cadastro, sem instalar nada.

## Como funciona

- **Tocar numa palavra** faz o site falar essa palavra em português e já coloca ela na frase.
- **A frase** aparece no quadro do topo, na ordem em que foi montada.
- **Falar frase** lê a frase inteira em voz alta.
- **Apagar última** tira a última palavra. **Limpar** esvazia a frase.
- **Tocar numa palavra da frase** tira aquela palavra de lá.

## Grupos de palavras

| Grupo | Palavras |
| --- | --- |
| Pessoas | eu, você, mamãe, papai, vovó, quero, não quero, sim, não, obrigado, por favor, oi, tchau |
| Sentimentos | feliz, triste, bravo, com medo, cansado, com dor, com fome, com sede, com frio, amo você |
| Comida | água, suco, leite, maçã, banana, pão, biscoito, arroz, sorvete, mais |
| Ações | brincar, comer, beber, dormir, banheiro, passear, assistir, desenhar, abraço, ajuda, parar, ir |
| Lugares | casa, escola, parque, carro, quarto, lá fora, médico |
| Coisas | bola, boneca, livro, música, tablet, cachorro, gato, cobertor |

Ao todo são 60 palavras. Cada grupo tem a sua cor e o seu desenho, para a criança que ainda não lê conseguir escolher só olhando.

## A voz

O site usa a voz de fala que já vem no aparelho (Web Speech API), configurada para português do Brasil, um pouco mais devagar e com o tom um pouco mais agudo. Por isso o som muda de um aparelho para outro: no celular soa diferente do computador.

## Rodando no seu computador

Você precisa do [Node.js](https://nodejs.org) instalado.

```sh
npm install
npm run dev
```

Abra o endereço que aparecer no terminal (normalmente `http://localhost:8080`).

Outros comandos:

```sh
npm run build     # gera a versão de publicação
npm run preview   # roda a versão gerada
npm run test      # roda os testes
npm run lint      # confere o código
npm run format    # organiza o código
```

## Adicionando palavras

Tudo está em `src/routes/index.tsx`, na lista `CATS`. Cada grupo tem um nome, um desenho, duas cores e a lista de palavras:

```tsx
{ name: "Comida", i: I.Apple, bg: "bg-apricot", ink: "text-apricot-ink", words: [
  { t: "água", i: I.Droplets },
  { t: "suco", i: I.Citrus },
]},
```

Para adicionar uma palavra, escreva uma linha nova em `words`, com o texto em `t` e o desenho em `i`. Os desenhos vêm da biblioteca [lucide-react](https://lucide.dev) — dá para escolher outro nome qualquer dela. Para criar um grupo novo, copie um bloco de grupo inteiro e troque o nome, as cores e as palavras.

## Estrutura do projeto

```
src/
  routes/
    index.tsx      # a tela do site: palavras, frase e voz
    __root.tsx     # base de todas as páginas
  styles.css       # cores, fontes e arredondamentos
  test/            # testes
public/            # favicon e robots.txt
```

## Feito com

- [TanStack Start](https://tanstack.com/start) (React 19)
- [Tailwind CSS 4](https://tailwindcss.com)
- [lucide-react](https://lucide.dev) para os desenhos
- [Vitest](https://vitest.dev) para os testes

## Visual

Fundo creme com manchas de cor bem suaves, cartões brancos e seis cores pastéis — rosa, mel, damasco, verde-sálvia, azul e lilás — uma por grupo. As letras de título usam Fraunces e o resto usa Figtree.

## Aviso

Este é um quadro de palavras simples, feito para ajudar no dia a dia. Ele não é um dispositivo de comunicação aumentativa e alternativa certificado e não substitui o acompanhamento de uma fonoaudióloga ou fonoaudiólogo.

## Licença

Distribuído sob a licença MIT. Veja o arquivo [LICENSE](LICENSE).
