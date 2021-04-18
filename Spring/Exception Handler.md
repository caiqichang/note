# Exception Handler

- Global Exception Handler
```java
@ControllerAdvice({Order Controller or All})
public class GlobalExceptionHandler {
    @ExceptionHandler({AnyException.clss})
    public ResponseEntity AnyExceptionHandler(AnyException anyException) {
        // ... 
    }
}
```

<br/>

- Local Exception Handler, only for current controller, propity is higer than global.
```java
@Controller
public class ApiController {

    // ...

    @ExceptionHandler({AnyException.clss})
    public ResponseEntity AnyExceptionHandler(AnyException anyException) {
        // ... 
    }
}
```

- @ExceptionHandler
  - Parameter -- Exception HandleMethod WebRequest NativeWebRequest 
  ServletRequest ServletResponse HttpSession Principal HttpMethod 
  Locale TimeZone ZoneId OutputStream Writer Map Model ModelMap 
  RedirectAttributes @SessionAttribute @RequestAttribute
  - Return -- @ResponseBody HttpEntity ResponseEntity String View Map 
  Model ModelAndView @ModelAttribute void 

- Exception Entrustment |
  - Some Exception can not be catched by Spring, 
    like AuthenticationException and AccessDeniedException of Spring Security, or other exception out of Spring.
```java
@Autowired
private HandlerExceptionResolver handlerExceptionResolver;

// entrust to Spring Exception Handler
handlerExceptionResolver.resolveException(HttpServletRequest, HttpServletResponse, Object, Exception);
```
