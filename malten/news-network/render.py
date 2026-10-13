"""Manual Malten news rendering through HeyGen's API billing account."""
import argparse
import datetime as dt
import json
import os
from pathlib import Path
import re
import sys
import urllib.error
import urllib.request
from zoneinfo import ZoneInfo

BASE = "https://api.heygen.com/v3"


def build_payload(bulletin, allow_archive=False):
    day = dt.date.fromisoformat(bulletin["date"])
    if not allow_archive and day != dt.datetime.now(ZoneInfo("America/New_York")).date():
        raise ValueError("This is an archived bulletin. Refresh reporting or pass --allow-archive.")
    sections = bulletin["sections"]
    if not sections or any(not isinstance(s, str) or not s.strip() for s in sections):
        raise ValueError("Every section must contain reviewed narration.")
    script = "\n\n".join(sections)
    if len(script) > 5000:
        raise ValueError("Narration exceeds the 5000-character limit; split the bulletin.")
    if "subscribe" not in script.lower():
        raise ValueError("Include the channel subscription reminder.")
    # Respelling applies only to speech; the editorial source keeps the proper name.
    script = re.sub(r"\bKipchoge\b", "Kip-Cho-Ge", script, flags=re.I)
    return {
        "type": "avatar", "title": bulletin["title"],
        "avatar_id": bulletin["anchor"]["avatar_id"],
        "voice_id": bulletin["anchor"]["voice_id"], "script": script,
        "aspect_ratio": "16:9", "resolution": "1080p", "fit": "contain",
        "engine": {"type": "avatar_iii"},
        "voice_settings": {"speed": 1.05, "locale": "en-US"},
        "output_format": "mp4",
    }


def api(method, path, payload=None):
    key = os.environ.get("HEYGEN_API_KEY", "").strip()
    if not key:
        raise ValueError("Set HEYGEN_API_KEY in the backend environment or GitHub Actions secret.")
    body = json.dumps(payload).encode() if payload is not None else None
    request = urllib.request.Request(BASE + path, data=body, method=method,
                                     headers={"X-Api-Key": key, "Content-Type": "application/json"})
    try:
        with urllib.request.urlopen(request, timeout=60) as response:
            result = json.load(response)
    except urllib.error.HTTPError as exc:
        raise ValueError(f"HeyGen returned HTTP {exc.code}. Check API balance, credentials and avatar access.") from None
    except (urllib.error.URLError, TimeoutError):
        raise ValueError("Request did not finish. Check HeyGen before retrying a render; submission may have succeeded.") from None
    if not isinstance(result, dict) or result.get("error"):
        raise ValueError("HeyGen returned an unsuccessful response. Check the API dashboard.")
    return result.get("data", result)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("command", choices=["preview", "render", "status"])
    parser.add_argument("--bulletin", type=Path, default=Path(__file__).parent / "bulletins/2026-10-13.json")
    parser.add_argument("--receipt", type=Path, default=Path(__file__).parent / "output/job.json")
    parser.add_argument("--submit", action="store_true", help="Explicitly authorize paid API rendering")
    parser.add_argument("--allow-archive", action="store_true")
    args = parser.parse_args()
    try:
        if args.command == "status":
            receipt = json.loads(args.receipt.read_text())
            video_id = receipt["video_id"]
            if not re.fullmatch(r"[A-Za-z0-9_-]+", video_id):
                raise ValueError("Invalid video ID in receipt.")
            result = api("GET", "/videos/" + video_id)
            output = {"video_id": video_id, "status": result.get("status", "unknown")}
            if output["status"] == "completed":
                output["video_url"] = result.get("video_url")
            print(json.dumps(output, indent=2))
            return 0
        bulletin = json.loads(args.bulletin.read_text())
        payload = build_payload(bulletin, args.allow_archive)
        if args.command == "preview":
            print(json.dumps(payload, indent=2))
            return 0
        if not args.submit:
            raise ValueError("Rendering uses paid API balance. Review preview, then supply --submit.")
        if not os.environ.get("HEYGEN_API_KEY", "").strip():
            raise ValueError("Set the replacement HEYGEN_API_KEY securely before rendering.")
        args.receipt.parent.mkdir(parents=True, exist_ok=True)
        # Reserve this receipt before POST, including on timeout. Never silently resubmit.
        with args.receipt.open("x") as file:
            json.dump({"status": "submission_started", "title": bulletin["title"]}, file)
        result = api("POST", "/videos", payload)
        video_id = result.get("video_id")
        if not video_id:
            raise ValueError("No video ID returned. Check the API dashboard before another submission.")
        receipt = {"video_id": video_id, "status": result.get("status", "pending"), "title": bulletin["title"]}
        args.receipt.write_text(json.dumps(receipt, indent=2) + "\n")
        print(json.dumps(receipt, indent=2))
        return 0
    except (ValueError, KeyError, OSError) as exc:
        print(f"Error: {exc}", file=sys.stderr)
        return 1


if __name__ == "__main__":
    raise SystemExit(main())
