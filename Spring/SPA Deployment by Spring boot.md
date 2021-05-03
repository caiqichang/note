# SPA Deployment by Spring boot

- Attentions:
1. Keep the same with `Base URL` of Front-end and `server.servlet.context-path` of Back-end.
2. Do not set `spring.mvc.static-path-pattern` (prefix of static resources).

- Location of static files (SPA build files)
1. Use prefix `classpath:` if files are in `jar`, and `file:` out of `jar`.
2. Both relative (recommand) and absolute path are available.
```yaml
spring:
  web:
    resources:
      static-locations: file:web/
```

- Controller of index.html
1. Because the priority of this interface is too low, so it may not override other.
```java
/**
 * Controller of index.
 */
@Controller
@RequestMapping
public class IndexController {
    /**
     * @param lastPath Content of lastest left-slash (/). 
     *                 Ignore if it with <code>.</code>, sometime is css or js file. 
     * @return Corward to root path
     */
    @GetMapping("/**/{lastPath:[^\\.]+}")
    public String index(@PathVariable String lastPath) {
        // forward to root path, it means index.html
        return "forward:/";
    }
}
```