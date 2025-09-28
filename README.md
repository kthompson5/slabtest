# SlabMetrics.com (Static Site)

White/green/black theme. No frameworks, vanilla JS, mobile-first.

## Structure
- `index.html` (hero, SM explainer, service tiles)
- `submit.html` (client-side form + printable summary)
- `grading-standards.html` (formula + mini calculator + animated ring)
- `services.html`, `big4.html`, `emerging.html`, `grading-101.html`
- `examples.html` (responsive iframe embed of a live report)
- `faq.html`, `contact.html`
- `blog/` index + post template
- `tools/centering.html` (client-side centering helper)
- `css/`, `js/`, `assets/`, `robots.txt`, `sitemap.xml`

## Local Dev
Open `index.html` in a browser. For file-upload canvas security, you may prefer a simple local server:

```bash
python3 -m http.server 8080
# then visit http://localhost:8080
```

## Deploy
- **GitHub Pages:** push to a repo and enable Pages (root).
- **Render static site:** create a Static Site, set the publish directory to `/`.
- Update `sitemap.xml` domain to your final domain.

## Theming
Edit color tokens at the top of `css/styles.css`.
