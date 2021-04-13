# Spring 异常处理

- 全局异常处理
```java
@ControllerAdvice({指定Controller，未指定则为全部})
public class GlobalExceptionHandler {
    @ExceptionHandler({AnyException.clss})
    public ResponseEntity AnyExceptionHandler(AnyException anyException) {
        // ... 
    }
}
```

<br/>

- 局部异常处理，仅捕获当前Controller的异常，优先于全局
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

<br/>

- @ExceptionHandler
  - 参数 -- Exception HandleMethod WebRequest NativeWebRequest 
  ServletRequest ServletResponse HttpSession Principal HttpMethod 
  Locale TimeZone ZoneId OutputStream Writer Map Model ModelMap 
  RedirectAttributes @SessionAttribute @RequestAttribute
  - 返回值 -- @ResponseBody HttpEntity ResponseEntity String View Map 
  Model ModelAndView @ModelAttribute void 

  <br/>

- 异常委托 <br/>
有些异常无法被Spring捕获，例如Spring Security的AuthenticationException和AccessDeniedException
```java
@Autowired
private HandlerExceptionResolver handlerExceptionResolver;

// 委托给全局异常处理
handlerExceptionResolver.resolveException(HttpServletRequest, HttpServletResponse, Object, Exception);
```
