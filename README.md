# Screen scraping

## Build
`docker build -t web-scrap .`

## RUN
`docker run -p 49161:3000 -d web-scrap`

## ENDPOINTS

* `POST https://<host>:<port>/capture`
* `GET https://<host>:<port>/images`

### Tip: Docker image
https://github.com/puppeteer/puppeteer/blob/main/docs/troubleshooting.md#running-on-alpine
