# Good job, John — design system

The live reference is `/style-guide/`. Semantic tokens are defined once in `src/styles/tokens.css`, imported by the shared site layout before other styles.

## Safe editing

- Change `--color-*` tokens to adjust the palette; `--font-*` tokens to adjust font stacks; layout, hero-type, radius and motion tokens to adjust those shared decisions.
- Existing aliases (`--paper`, `--ink`, `--yellow`, etc.) resolve to the semantic tokens. Keep these while archival pages and artwork still use them.
- Reuse `Header`, `Footer`, `Arrow`, `Hero`, and the production link/filter styles. The guide renders actual styles and reads token values from the CSS source.
- Preserve page-specific and archival spacing unless intentionally redesigning it. The spacing scale is the default for new work, not a reason to change every historical layout.
- Run `pnpm check` and compare the homepage, an article and the guide at desktop and mobile sizes.

## Fonts

Inter is loaded from Google Fonts. The display stack is Thelma, Cooper Black, Georgia, serif. No Thelma webfont is currently shipped, so the browser uses the first locally available face. Ubuntu Mono also has no font download; the utility stack falls back to system monospace. The existing appearance and these fallback chains are preserved.

If a licensed webfont is added later, add its `@font-face` declaration to the token layer, update the guide’s loading note, and compare line breaks across all routes. Do not silently claim a font is loaded when it is only named in a stack.

## Relationship to Goodjob

Goodjob’s consulting site shares the wordmark and semantic token vocabulary, with a cobalt palette and hand icon. Each repository has its own values and builds independently. There is no monorepo package or runtime dependency between the sites. Update shared brand assets explicitly in both projects when necessary.
