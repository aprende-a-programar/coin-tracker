# Coin Tracker

## Página web
https://arielgol.github.io/coin-tracker/

#### Documentación de la API de Coin Gecko

https://api.coingecko.com/api/v3

Para esta misión necesitamos crear una web utilizando HTML, CSS y Javascript (sin frameworks/librerías) que te permita buscar acciones/monedas o cualquier asset, de ahora en más llamados "monedas", usando una API gratuita como la de https://finnhub.io/docs/api/quote (o cualquier otra que te sea práctica) y agregarla a un listado de “monedas” que quieras seguir.

La webapp debe consultar constantemente a la API para pedirle los valores actualizados y reflejarlos en la UI. Al mismo tiempo tendremos que poder configurar alertas para cada “moneda” que estemos siguiendo utilizando valores máximos y/o mínimos. Para notificar que una de las monedas está fuera de los límites vamos a modificar el favicon de la web (el que se muestra en la pestaña del navegador) para que podamos hacer seguimiento simplemente teniendo una pestaña abierta ¡En otras misiones llevaremos este esquema de notificaciones mucho más lejos!

![image](https://user-images.githubusercontent.com/1208547/128564974-47acc718-11fe-404f-aad8-5415a148a214.png)

Toda la configuración de las "monedas" (monedas y montos de las alertas) deben ser guardados en el navegador (localStorage puede ser una buena alternativa) para no perder toda esta config si salimos de la web.

## Para sumarse a esta misión

Recuerden enviar sus [PRs](https://docs.github.com/en/github/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/about-pull-requests) y si publican sus webs (una alternativa es usar [GitHub Pages](https://pages.github.com/) suban una foto de su web (y la URL) a Instagran y nos mencionan https://www.instagram.com/apx.school/ para compartirles el proyecto.

Cualquier duda o sugerencia la podemos charlar en el canal de Misión Código de la comu: https://discord.gg/5Z6aaAMAVq

## Requisitos

Para encarar esta misión necesitan dominio básicos de HTML, CSS y Javascript (**módulo 4** de [la carrera](https://apx.school/carreras/dwf)) . Algunos de estos conocimientos básicos son:

- Fetch: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- localStorage: https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
- DOM: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model
- CSS Grids - https://css-tricks.com/snippets/css/complete-guide-grid/
- Flexbox - https://css-tricks.com/snippets/css/a-guide-to-flexbox/
- Semántica - https://developer.mozilla.org/en-US/docs/Glossary/Semantics#semantics_in_html
- Sobre cambiar el favicon - https://stackoverflow.com/questions/260857/changing-website-favicon-dynamically

## Recursos

#### Diseño

https://www.figma.com/file/NPF0mSvPCR30yYmga1cA52/Misi%C3%B3n-2-Coin-Tracker?node-id=0%3A1

#### Documentación de la API de Finnhub

https://finnhub.io/docs/api/quote

#### Otras alternativas

https://medium.com/geekculture/the-best-free-stock-market-data-apis-available-in-2021-1ecfa51ee619

## Resolución

Les dejo el PR de la primera parte (lógica): https://github.com/apx-mision-codigo/coin-tracker/pull/1/files
