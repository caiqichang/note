# Maven 中依赖的 scope 属性

| 名称 | 作用域 | 示例 |
| --- | --- | --- |
| compile | build test runtime | 默认 |
| test | test | junit等仅用于测试的依赖 |
| provided | build test | servlet等由容器提供的依赖 |
| runtime | runtime | 数据库驱动包，可防止build和test时依赖的内容被引用 |

