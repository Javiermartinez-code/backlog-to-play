# ADR-9: Recomendaciones sin LLM con similitud de géneros y etiquetas

- **Estado:** Aceptada
- **Fecha:** 2026-10-28
- **Categoría:** Arquitectura
- **Impacto:** Medio

## Contexto

Las recomendaciones (versión `v0.2.0`) no deben tener coste por uso de IA. Además, la competencia ya ofrece un asistente basado en IA, así que un enfoque explicable es un rasgo diferenciador.

## Decisión

Construir un **perfil de gustos** a partir de los géneros y etiquetas de RAWG de los juegos del usuario y calcular la **similitud de Jaccard o del coseno** en Python. Un LLM queda como fase 3 opcional.

## Alternativas consideradas

| Opción | A favor | En contra |
| --- | --- | --- |
| Similitud de conjuntos | Gratuito, explicable y rápido | Resultados menos «mágicos» |
| LLM | Interacción en lenguaje natural | Coste por uso |

## Consecuencias

- **Positivas:** coste cero y resultados explicables y reproducibles.
- **Negativas:** la calidad depende de lo buenas que sean las etiquetas de RAWG.
- **Revisar si:** los resultados resultan pobres en pruebas con usuarios.
