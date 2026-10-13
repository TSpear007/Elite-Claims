# Malten AI News Network

The network's production module within `TSpear007/Elite-Claims`, under Malten.
This is a manual API rendering backend, not a deployed website or automated news feed.
It uses Python 3.12's standard library and the separate HeyGen API balance.

## Today's prepared bulletin

`bulletins/2026-10-13.json` includes world, American and Baltimore news, Melbourne
and Chicago marathon results, and Baltimore weather through Sunday. Marcus Reed
delivers every section, says Claire is off today, and asks viewers to subscribe.
The renderer speaks Kipchoge as **Kip-Cho-Ge**.

Marcus's single-person avatar is used to prevent animating the wrong person in a
two-anchor image. The avatar and voice IDs must be accessible to the API key's
HeyGen workspace. The default engine is Avatar III; motion quality differs from
Avatar IV. The `fit: contain` setting preserves the entire presenter image.

## Secure API setup

Revoke the key previously posted in chat and generate a replacement in HeyGen.
In this repository, open **Settings → Secrets and variables → Actions → New
repository secret**. Name it `HEYGEN_API_KEY` and paste the replacement there.
Never put the key in a bulletin, frontend, commit, issue, screenshot or chat.
API funds and the Creator web-plan credit balance are separate.

## Render in GitHub

1. Open **Actions → Malten AI News Network → Run workflow** on `main`.
2. Leave `submit` off to review the payload without a credential or charge.
3. Review the dated reporting and the price/available balance in HeyGen's API dashboard.
4. Run a new workflow with `submit` selected to create the paid video.
5. Download the job receipt artifact. The video ID can be checked in HeyGen or with
   the status command below. Video generation is asynchronous; acceptance is not completion.

There is no recurring schedule, YouTube posting, or automatic retry of generation.
Do not rerun a submission workflow: check the earlier job first. A new workflow
run can still create a duplicate, so check receipts and HeyGen before starting one.

## Local backend use

Set `HEYGEN_API_KEY` privately in the server environment (the runner does not load
`.env` files automatically). Then run:

```bash
python malten/news-network/render.py preview
python malten/news-network/render.py render --submit
python malten/news-network/render.py status
```

The receipt is stored in ignored `output/job.json`. Its presence prevents another
POST. On a timeout, it records an uncertain submission; inspect HeyGen before
removing it. `status` needs a returned video ID. After October 13, the dated
bulletin is blocked unless `--allow-archive` is supplied intentionally. Refresh
headlines and weather for future broadcasts.

## Validation and limits

```bash
python -m unittest discover -s malten/news-network -p 'test_*.py'
```

Tests cover single-person assignments, pronunciation, archived reporting, the
subscription reminder, and duplicate/uncertain submission protection. Live paid
generation has not been tested with the replacement key. This module has no
public render endpoint, shares no claims-platform data, and contains no API key.

API reference: https://developers.heygen.com/reference/create-video
Billing: https://www.heygen.com/api-pricing
