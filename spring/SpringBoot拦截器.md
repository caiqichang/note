# Spring Boot Inteceptor

- 定义拦截器
```java
public class AuthInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        // handlerMapping之后、handleAdapter之前执行
        // 返回true通过，false拦截并终止(若未处理response，dispatcherServlet将自行处理)        
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        // handlerAdapter之后、dispatcherServlet之前执行
        // preHandle()返回false且未处理response，此方法会执行
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        // rendering view之后执行
        // 仅preHandle()返回true且preHandle()、postHandle()未处理response会执行
    }
}
```

- 注册拦截器
```java
@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        // 注册拦截器
        registry.addInterceptor(interceptor1)
                // 拦截顺序，默认0
                .order(1)
                // 拦截的url
                .addPathPatterns("/**")
                // 不拦截的url
                .excludePathPatterns("/notIntecept/**");

        // 注册多个拦截器
        registry.addInterceptor(interceptor2)
                .order(2)
                .addPathPatterns("/**");
    }
}
```
