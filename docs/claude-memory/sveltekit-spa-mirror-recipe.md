scrape-url.py 抓 SvelteKit + Vite 站时只下 HTML 里直接引用的 entry chunks，**不递归 `__vite__mapDeps` chunk 图谱**——会漏 90%+ 的 chunks/nodes，runtime 404 但 console 几乎没醒目报错。按下面 4 步补救（首次验证：2026-05-27 lessestudio.com / 024-lessestudio，128 个文件最终全 200，37/37 image，0 page error）。

## 识别信号

scrape 完后这几个特征 ≈ 100% SvelteKit + Vite：
- 目录有 `_app/immutable/` （SvelteKit 的标准位置）
- HTML 里有 `<script type="module" src=".../_app/immutable/entry/start.*.js">` 和 `app.*.js`
- chunks 里有 `__vite__mapDeps` 长数组
- verify 报 `Failed to fetch dynamically imported module: .../_app/immutable/entry/*.js`

## Recipe

### 1. 递归抓 `__vite__mapDeps` 引用的所有 chunks/nodes/assets

scrape-url.py 拿不到的：`_app/immutable/{entry,chunks,nodes}/*.js`（90%+ 都在这里）+ `_app/immutable/assets/*.css`。写脚本递归抓：

```python
import urllib.request, os, re
ROOT = r'C:\Users\EDY\Documents\sc2\designs\NNN-slug'
BASE = 'https://example.com/'   # 原站
UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

INLINE_RE = re.compile(r'\.\./(chunks|nodes|entry|assets)/([A-Za-z0-9._-]+\.(?:js|css))')

def fetch(rel):
    local = os.path.join(ROOT, rel.replace('/', os.sep))
    if os.path.exists(local) and os.path.getsize(local) > 0: return
    req = urllib.request.Request(BASE + rel, headers={'User-Agent': UA, 'Accept': '*/*'})
    try: body = urllib.request.urlopen(req, timeout=20).read()
    except Exception as e: print(f'  FAIL {rel}: {e}'); return
    os.makedirs(os.path.dirname(local), exist_ok=True)
    open(local, 'wb').write(body)
    print(f'  {len(body):>7}B  {rel}')

queue = [
    '_app/immutable/entry/start.<HASH>.js',   # 改成 HTML 里实际的 hash
    '_app/immutable/entry/app.<HASH>.js',
]
seen = set()
while queue:
    next_q = []
    for rel in queue:
        if rel in seen: continue
        seen.add(rel)
        fetch(rel)
        local = os.path.join(ROOT, rel.replace('/', os.sep))
        if not os.path.exists(local): continue
        text = open(local, encoding='utf-8', errors='replace').read()
        for m in INLINE_RE.finditer(text):
            sub = f'_app/immutable/{m.group(1)}/{m.group(2)}'
            if sub not in seen: next_q.append(sub)
    queue = next_q
```

模板放在：`c:/tmp/imm/fetch_sveltekit.py`（lessestudio 那次写的，参考拷一份改 ROOT/BASE/HASH 即可）。一般 3-5 轮就收敛（lessestudio 97 个 / 3 轮）。

### 2. 默认 urllib 被 Cloudflare 403 拦——必须带 Chrome UA

裸 `urllib.request.urlopen()` 没 `User-Agent` header 会被 CF 直接 403。**所有手动 fetch 一律带 Chrome UA**（上面脚本已含）。`requests` 库自带 UA 但默认是 `python-requests/X.X.X`，CF 同样拦——也得替换。

### 3. Vite preload-helper `/` 前缀——patch 成 `./`

跟 `nuxt3-spa-mirror-recipe.md` pitfall #3 完全同款，但发生在 SvelteKit chunks 路径下：

```bash
grep -l 'return"/"+' designs/<slug>/_app/immutable/chunks/*.js
# 一般只有一个文件命中，例如 D5rF4i65.js
```

```python
p = '_app/immutable/chunks/<匹配的文件>.js'
s = open(p, encoding='utf-8').read()
open(p, 'w', encoding='utf-8').write(s.replace('return"/"+o', 'return"./"+o', 1))
```

注意变量名不一定是 `o`——不同 vite minify 版本可能是 `e` `l` `n` 等。grep 出来肉眼确认前后文是 preload-helper 再改。

### 4. 字体走 `url(../../../fonts/X.ttf)`——拷 fonts 到 mirror 根

CSS 在 `_app/immutable/assets/0.<HASH>.css` 里：
```css
@font-face{src:url(../../../fonts/DMSans.ttf)...}
```

`../../../` 从 CSS 的位置跳三层到 mirror 根，所以浏览器解到 `/designs/NNN-slug/fonts/X.ttf`。scrape-url.py 把字体下到了 `assets/<host>/fonts/` 而不是根 `fonts/`，所以 404。

```bash
cp -r designs/<slug>/assets/<host>/fonts designs/<slug>/fonts
```

字体不止 `.ttf`，可能是 `.otf` `.woff` `.woff2`——`cp -r` 整目录最稳。

## 验证清单

- [ ] `_app/immutable/{entry,chunks,nodes}/*.js` 全部存在（每个 chunk 都 200 OK）
- [ ] preload-helper 里的 `/` 前缀已改 `./`
- [ ] `designs/NNN-slug/fonts/` 存在且文件名跟 CSS 引用一致
- [ ] Playwright 跑 verify：0 page errors，images N/N 全加载
- [ ] 剩余 4xx 应该只有：① 第三方分析 endpoint POST → 501（python http.server 不支 POST）② `/cdn-cgi/rum?` 这种 CF beacon → 501

## 为什么不一次性内化到 scrape-url.py

- SvelteKit / Astro / Remix / Qwik 等 SSR 框架的 chunk 图谱都靠 `__vite__mapDeps` 但每家路径布局略有差（`_app/` `chunks/` `_qwik/` ...），写通用解析器复杂度收益比低
- 现在 4 步脚本化够快，新框架碰到再补一个 recipe 文件就行
- 已经覆盖 Nuxt 3 / Next.js / SvelteKit 三类，跟 Astro 在某些 chunks-only 站上行为接近，碰到 Astro 站可以先按 SvelteKit 流程试一遍
