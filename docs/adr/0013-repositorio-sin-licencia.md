# ADR-13: Repositorio público sin licencia de código abierto

- **Estado:** Aceptada
- **Fecha:** 2026-11-10
- **Categoría:** Proceso
- **Impacto:** Alto

## Contexto

El repositorio es público para que reclutadores y personas interesadas puedan consultar el código como parte del portfolio. Al mismo tiempo, no se quiere que nadie reutilice el código ni despliegue una copia de la aplicación.

Que un repositorio sea público no lo convierte en código abierto: eso depende de la licencia. Sin ninguna licencia, la ley de propiedad intelectual reserva todos los derechos al autor.

Se quiere, además, dejar la puerta abierta a recibir Pull Requests externos, que el autor aceptará o rechazará según su criterio.

## Decisión

- **No se publica ninguna licencia.** No hay archivo `LICENSE`: el código queda con **todos los derechos reservados** y solo se concede permiso para consultarlo.
- La intención se declara de forma explícita en la sección «Licencia» del README, para que no se interprete como un olvido.
- **Se aceptan Pull Requests** bajo una condición recogida en [CONTRIBUTING.md](../../CONTRIBUTING.md): quien contribuye cede al autor los derechos de explotación sobre su aportación. Así la licencia se puede cambiar en el futuro sin pedir permiso a cada contribuidor.

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| Sin licencia (todos los derechos reservados) | Máxima protección; nadie puede usar el código legalmente | No es código abierto; puede disuadir contribuciones |
| MIT | Máxima difusión; muy reconocida | Cualquiera puede copiarlo, cerrarlo y explotarlo comercialmente |
| AGPL-3.0 | Código abierto; obliga a publicar el código de cualquier copia desplegada como servicio | Permite que otros desplieguen la aplicación |
| FSL (*Functional Source License*) | Código visible; impide productos que compitan durante 2 años | No es código abierto según la OSI; pasa a ser MIT o Apache con el tiempo |

## Consecuencias

- **Positivas:** el código queda protegido sin perder su valor como portfolio, y la decisión queda documentada.
- **Negativas:** el proyecto no es de código abierto, lo que puede reducir el interés en contribuir. GitHub sigue permitiendo hacer *fork* de cualquier repositorio público, aunque un fork no da permiso para usar el código.
- **Revisar si:** el proyecto se abre al público con usuarios reales o se quiere fomentar una comunidad de contribuidores. En ese caso, la alternativa preferente es AGPL-3.0.
