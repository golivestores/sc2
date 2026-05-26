---
name: "default scrape target is designs/"
description: When user says "爬 <URL>" / "scrape <URL>" without specifying a destination, automatically run scrape-url.py and add the mirror to designs/ with the next available NNN-name.
type: feedback
originSessionId: 11d48ecf-6da5-4e85-b61d-71e6d684debd
---
When the user issues a bare scrape request like "爬 https://example.com/" / "爬这个网站 https://example.com/" / "scrape https://example.com/" without specifying where to put the output, default to:

1. Pick the next available `NNN` (look at existing `designs/` subfolders, take max+1, zero-pad to 3 digits).
2. Pick a short slug from the hostname (drop `www.`, drop TLD): e.g., `goodlifemeds.com` → `goodlifemeds`, `omrbeauty.com` → `omrbeauty`.
3. Run `python scrape-url.py <URL> NNN-slug "Readable Title"` from the project root.
4. Run `rebuild-index.ps1` so the new mirror appears in the navigator (since 2026-05-13 the navigator reads `designs/designs.js` instead of auto-scanning the directory).
5. Report download counts + any failures, then point the user at `http://localhost:8080/designs/` to see the new card.

User has explicitly confirmed: "以后我说爬xx网站默认新增到design中" (Nov 2026).

**Don't** prompt for confirmation about which folder. **Don't** ask for a slug suggestion. Just pick a sensible default and run it. If the user wanted a different number or slug they would have specified.

If the user says "爬 X 替换 NNN" or "爬 X 作为 NNN" (replace / as NNN), then they ARE specifying — handle accordingly (delete the old folder first if needed).
