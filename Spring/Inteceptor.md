# Inteceptor

- Define
```java
public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // After handlerMapping and before handleAdapter.
        // Return ture to resolve, and false to reject. If do not resolve response，dispatcherServlet will do by itself.        
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // After handlerAdapter and before dispatcherServlet.
        // This will invocate when preHandle() return false and never resolve response.
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // After rendering view.
        // This will invocate when preHandle() return true, preHandle() and postHandle() never resolve response.
    }
}
```

- Register
```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(interceptor1)
                // Priority, defalut is 0 (highest).
                .order(1)
                .addPathPatterns("/**")
                .excludePathPatterns("/notIntecept/**");

        // Register more interceptor
        registry.addInterceptor(interceptor2)
                .order(2)
                .addPathPatterns("/**");
    }
}
```
