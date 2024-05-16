# Notes for development

## What should be in a gardening journal?

1. Date
2. Weather
    - Temperature
    - Rain
    - Wind
    - Frost
3. What was done
4. What was planted (where and when)
5. What was harvested
6. Flowering (where and when)

## What should be in a gardening calendar?

- What to plant
- When to plant
- When to harvest
- When to prune
- When to fertilize
- When to water
- When to weed
- When to mulch
- When to protect from frost

## Bullet Journaling

- [Bullet Journaling](https://bulletjournal.com/pages/learn)

Organize into sections:

- Future log
- Monthly log
- Weekly log

Record the weather and frost dates.

Record overnight temperatures relative to season.

Record pest pressure over the months.

Record what solutions to pests worked.

Inspiration:

<https://docs.google.com/document/d/1-RErVgKsQ2Jfgn6TlKk4zZF0UIe0ZKQkz5E5d99Xub0/edit#heading=h.2c54p3lpln28>

## AI UI Inspiration from Gamma.app

- [Gamma.app](https://gamma.app/)

### UI Notes

- Take in a natural language prompt to generate a gardening plan.
  - Show the length in tokens of the prompt.
- Use the prompt to generate a garden outline, outline will be broken into cards, then allow the user to edit it.
  - Include a list of plants to add to the garden.
  - Include their position, grouping, and density in the garden.
  - Include an option to add a plant to the garden and have the system suggest a location.
  - Include an optional garden map.
  - Include an optional set of sensors.
  - Add ability to add cards to the outline.
  - Add a section for settings and options for the plan
    - have options to select for partner planting, companion planting, consortium planting, guild planting and succession planting.
  - Advanced mode: allow the user to edit the plan in a Prompt Editor page.
    - Settings that control the output of the AI Generator.
    - Text Content:
      - Options: [Generate, Condense, Preserve]
        - Generate: Fill outline with added details
        - Condense: Shorten Content to be Concise
        - Preserve: reformat while keeping the original content
      - Amount of text per Card: [Brief, Medium, Detailed]
      - Write for: [Beginner, Intermediate, Advanced, Farmer, Gardener, Permaculturist, Cannabis Grower, Designer]
      - Tone: [Formal, Informal, Friendly, Professional, conversational, technical, academic, inspirational, instructional, humorous]
      - Output Language: [English, Spanish, French, German, Italian, Dutch, Portuguese, Russian, Chinese, Japanese, Korean, Arabic, Hindi]
      - Images: [web Search, Stock, AI Generated]
    - Content: The garden outline
      - Options: [Freeform, Card-by-Card]
        - Freeform: Fast, Let AI divide content into cards.
          - A Markdown Text Area
          - Freeform lets you scale or shrink your content into as many cards as you want. For example, you can turn a long document into a concise presentation.
        - Card-by-Card: Precise, Edit the content of each card.
          - A numbered list of cards
          - Card-by-card lets you specify exactly where card breaks should go, so you can outline your content card by card.
          - Editing Cards: Drag and rearrange, or type `---` to create a new card.
            - Have an add card button at the bottom, with total number of cards, `Type --- for card breaks` reminder, and total number of tokens used/remaining.
  - Footer:
    - Left: Total number of Credits available.
    - Middle-Left: Total number of Cards.
    - Middle-Right: Continue button with total number of credits this operation will consume.
    - Right: Question mark button for help.
