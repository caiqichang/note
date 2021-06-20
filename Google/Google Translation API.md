# Google Translation API

```http
GET
https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&dt=at&ie=utf8&oe=utf8&sl=auto&tl=zh-CN&q=
```

- Attention:
  - `query` only for one sentence and limit in about 200 words.
  - Need to replace all `\r\n` and `\n` to space. 
  - Need to escape `query`, like `encodeURIComponent` in JavaScript and `URLEncoder.encode` in Java.
- Parameter:
  - client
    - gtx
    - dict-chrome-ex
  - ie -- input encoding
  - oe -- output encoding
  - dj -- display propertity name at result
    - 0 -- off
    - 1 -- on
  - dt
    - t -- original translate
    - at -- additional translate
    - bd -- dictionary
    - md
    - ss
    - ex -- example
    - rw
  - sl -- source language
    - auto 
  - tl -- target language
    - zh-CN
  - q -- content to translate (need URL encoding)