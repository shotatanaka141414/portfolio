<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Works detail template preview (`/works/preview/templates`)

- **Do not** import `getWorkDetailConfig` or `work-details` for this page’s block list. Use only `src/app/works/preview/templates/preview-detail-template-blocks.ts`.
- Required layout `type`s are listed in **`PREVIEW_REQUIRED_TEMPLATE_TYPES`**. If you add or rely on a new `WorkDetailBlock` variant in production, add at least one demo block and update that list so `next build` keeps passing.
<!-- END:nextjs-agent-rules -->
