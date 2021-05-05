# SPA Deployment by Spring boot

> SPA: Single Page Application

## Location of static files (SPA build files)
1. Use prefix `classpath:` if files are in `jar`, and `file:` out of `jar`.
2. Both relative (recommand) and absolute path are available.
```yaml
spring:
  web:
    resources:
      static-locations: file:web/
```

## Controller of index.html
- Because the priority of this interface is too low, so it may not override other.

### Without `static-path-pattern`
- Keep the same with `Base URL` of Front-end and `server.servlet.context-path` of Back-end.
```java
@Controller
@RequestMapping
public class IndexController {
    // Forward every path to index.html,
    // include context root,
    // exclude which with "." in last path (sometimes is js, css, image or other resource file).
    @GetMapping({"/", "/**/{lastPath:[^\\.]+}"})
    public String index(@PathVariable String lastPath) {
        return "forward:/index.html";
    }
}
```

### With `static-path-pattern` (for excluded by interceptor)
1. Set properties (could be in different file) like :
```yml
static-context-path: /web

spring:
  mvc:
    static-path-pattern: ${static-context-path:}/**
```
2. Make sure interceptor exclude `/` and `/${static-context-path}/**` .
```java
@Controller
@RequestMapping
public class IndexController {
    @Value("${static-context-path:}")
    private String STATIC_CONTEXT_PATH;

    // Forward every path to index.html,
    // include context root and static root,
    // exclude which with "." in last path (sometimes is js, css, image or other resource file).
    @GetMapping({"/", "${static-context-path:}", "${static-context-path:}/", "${static-context-path:}/**/{lastPath:[^\\.]+}"})
    public String index(@PathVariable(required = false) String lastPath, HttpServletRequest request) {
        if ("/".equals(request.getServletPath()) && StringUtils.hasText(STATIC_CONTEXT_PATH)) {
            return "redirect:" + STATIC_CONTEXT_PATH + "/";
        }
        return "forward:" + STATIC_CONTEXT_PATH + "/index.html";
    }
}
```