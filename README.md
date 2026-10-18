# Pytincture website

Static Pytincture 1.0 release website, served by Apache on Fly.io. The framework
and Lambda commands are documented in the linked, versioned framework guides.

## Preview locally

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory htdocs
```

Open http://127.0.0.1:8080. No Python web framework is needed for this site.
`htdocs/index.html`, `htdocs/css/pytincture-framework.css` and
`htdocs/js/pytincture-site.js` contain the page, styles and interactions.

## Release and deployment

Review the 1.0 content locally. Publish the corresponding framework tag and
registry artifacts before deploying this website: the installation command and
documentation URLs point to version 1.0.0. Confirm the Lambda guide is included
in that tag. Then use the existing `fly.toml` and `Dockerfile` with `fly deploy`.
The container serves the static `htdocs` directory using `apache.conf`; it does
not run FastAPI. Keep the previous deployment available for rollback.

Verify the desktop/mobile navigation, installation copy button, code tabs,
release links and Lambda documentation link after deployment.
