# 通过Spring Boot部署单页应用

> 注意：
> 1. 前端路由的 `baseUrl` 与 `server.servlet.context-path` 一致。
> 2. 不要设置 `spring.mvc.static-path-pattern` 静态文件前缀。

- 静态文件路径配置
```yaml
spring:
  web:
    resources:
      # jar包外部使用file:，内部使用classpath:
      # 可使用相对路径或绝对路径
      static-locations: file:web/
```

- index.html请求
> 此接口匹配优先级低，不会覆盖其他接口
```java
/**
 * 前端页面index控制器
 */
@Controller
@RequestMapping
public class IndexController {
    /**
     * @param lastPath 匹配URL最后一个斜杠后面的内容，
     *                 需要排除包含<code>.</code>的URL(通常是其他静态文件css、js等)
     * @return 转发到<code>/</code>路径，即index.html
     */
    @GetMapping("/**/{lastPath:[^\\.]*}")
    public String index(@PathVariable String lastPath) {
        // 转发到根路径，即index.html
        return "forward:/";
    }
}
```