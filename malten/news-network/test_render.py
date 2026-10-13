import copy
import json
from pathlib import Path
import tempfile
import unittest
from unittest.mock import patch
import render


class RenderTests(unittest.TestCase):
    def setUp(self):
        self.b = json.loads((Path(__file__).parent / 'bulletins/2026-10-13.json').read_text())

    def test_solo_anchor_and_pronunciation(self):
        p = render.build_payload(self.b, True)
        self.assertEqual(p['avatar_id'], '170f573848f9b27881c44a38bcc3a118')
        self.assertIn('Claire Bennett is off today', p['script'])
        self.assertIn('Kip-Cho-Ge', p['script'])
        self.assertNotIn('Kipchoge', p['script'])
        self.assertIn('subscribe', p['script'])

    def test_stale_reporting_is_blocked(self):
        self.b['date'] = '2000-01-01'
        with self.assertRaisesRegex(ValueError, 'archived'):
            render.build_payload(self.b)

    def test_missing_subscribe_reminder_is_blocked(self):
        self.b['sections'] = ['Good morning.']
        with self.assertRaisesRegex(ValueError, 'subscription'):
            render.build_payload(self.b, True)

    def test_existing_receipt_never_posts_again(self):
        with tempfile.TemporaryDirectory() as directory:
            receipt = Path(directory) / 'job.json'
            receipt.write_text('{}')
            with patch.dict('os.environ', {'HEYGEN_API_KEY':'test-not-a-real-key'}), patch('render.api') as api, patch('sys.argv', ['render.py','render','--submit','--allow-archive','--receipt',str(receipt)]):
                self.assertEqual(render.main(), 1)
                api.assert_not_called()

    def test_timeout_receipt_stops_resubmission(self):
        with tempfile.TemporaryDirectory() as directory:
            receipt = Path(directory) / 'job.json'
            with patch.dict('os.environ', {'HEYGEN_API_KEY':'test-not-a-real-key'}), patch('render.api', side_effect=ValueError('request timed out')), patch('sys.argv', ['render.py','render','--submit','--allow-archive','--receipt',str(receipt)]):
                self.assertEqual(render.main(), 1)
            self.assertEqual(json.loads(receipt.read_text())['status'], 'submission_started')


if __name__ == '__main__':
    unittest.main()
