# Google翻译接口

[GET]
```
https://translate.googleapis.com/translate_a/single?client=gtx&dj=1&dt=at&sl=auto&tl=zh-CN&q=
```
- 参数
  - client -- 通常为gtx
    - gtx
    - dict-chrome-ex
  - ie -- 输入编码
  - oe -- 输出编码
  - dj 
    - 0 -- 结果不显示参数名
    - 1 -- 结果显示参数名
  - dt -- 通常为at
    - t 源文本翻译
    - at 可选翻译
    - bd 字典
    - md
    - ss
    - ex 例句
    - rw
  - sl -- 源语言
    - auto 自动检测
  - tl -- 目标语言
    - zh-CN
  - q -- 查询内容，特殊字符需要URL编码