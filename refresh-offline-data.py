"""Refresh the offline content bundle after changing a JSON file in this folder."""
import json
from pathlib import Path

folder = Path(__file__).resolve().parent
data = {name: json.loads((folder / f'{name}.json').read_text(encoding='utf-8'))
        for name in ['profile', 'career', 'technologies']}
(folder / 'data.js').write_text('window.PORTFOLIO_DATA = ' + json.dumps(data, ensure_ascii=False) + ';\n', encoding='utf-8')
print('Offline content updated. Reload index.html to see your changes.')
