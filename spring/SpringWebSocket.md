# Spring WebSocket

## WebApi调用WebSocket
- 协议：http对应ws，https对应wss
- subPotocol -- 可选参数
  - 子协议，一个字符串或字符串数组，位于请求头Sec-WebSocket-Protocol
  - 如果带有子协议，建立连接时服务器返回的响应头必须带有Sec-WebSocket-Protocol，
  值为该子协议字符串；如果子协议是数组，则值为数组中的一个元素
  - 通常用于认证授权（如token）
```javascript
let websocket = new WebSocket('ws://ip:port/context-path/api', subPotocol);
websocket.onopen = event => {};
websocket.onclose = event => {};
websocket.onerror = event => {};
websocket.onmessage = event => {};
```

## 服务端
* Maven依赖
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

## 基于Spring的WebSocket
1. 配置
```java
@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer {
    @Autowired
    private ApiWebScoketHandler apiWebScoketHandler;
    @Autowired
    private ApiHandshakeInterceptor apiHandshakeInterceptor;

    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry webSocketHandlerRegistry) {
        webSocketHandlerRegistry
                // 配置websocket接口处理器及url
                .addHandler(springWebsocket, "/api")
                // 配置握手处理器（可选）
                .addInterceptors(apiHandshakeInterceptor);
    }
}
```

2. 接口处理
- WebSocketHandler 接口
  - AbstractWebSocketHandler 抽象类
    - TextWebSocketHandler 对应 TextMessage 常用
    - BinaryWebSocketHandler 对应 BinaryMessage
```java
@Component
public class ApiWebSocketHandler implements WebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // 对应onOpen
        // 在session中获取请求头的子协议 类型为UnmodifiableList
        session.getHandshakeHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // 对应onMessage
        // WebSocketMessage包括Text, Binary, Pong（此端发出ping，接收到彼方的Pong）
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        // 对应onError
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        // 对应onClose
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
```

3. 握手处理
- HandshakeInterceptor 接口
```java
@Component
public class ApiHandshakeInterceptor implements HandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // 获取请求头子协议 类型为LinkedList
        request.getHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
        // 设置响应头子协议
        response.getHeaders().add(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL, subPotocol);
        
        // 返回true或false是否建立连接，但是请求头和响应头依然必须有相同的子协议才能建立连接
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        
    }
}
```

## 基于javax的WebSocket

todo

1. 配置
```java
@Configuration
@EnableWebSocket
public class WebSocketConfig {
    @Bean
    public ServerEndpointExporter serverEndpointExporter() {
        return new ServerEndpointExporter();
    }
}
```

2. 接口
- @ServerEndpoint
  - value 接口url
  - subprotocols 子协议
  - configurator 配置类
```java
@Component
@ServerEndpoint(value = "/api", subprotocols = {"子协议数组"}, configurator = ApiWebsocketConfigurator.class)
public class ApiWebsocket {
    @OnOpen
    public void onOpen(Session session) throws IOException {
        // 获取子协议，调用ServerEndpointConfig.Configurator的getNegotiatedSubprotocol方法，见下文
        session.getNegotiatedSubprotocol();
    }

    @OnClose
    public void onClose(Session session) throws IOException {}

    @OnError
    public void onError(Session session, Throwable throwable) throws IOException {}

    @OnMessage
    public void onMessage(Session session, String message) throws IOException {}
}
```

3. configurator配置类
```java
@Component
public class ApiWebsocketConfigurator extends ServerEndpointConfig.Configurator {
    @Override
    public boolean checkOrigin(String originHeaderValue) {
        return super.checkOrigin(originHeaderValue);
        // 返回true或false是否建立连接。先于modifyHandshake执行，但是请求头和响应头依然必须有相同的子协议才能建立连接
    }

    @Override
    public String getNegotiatedSubprotocol(List<String> supported, List<String> requested) {
        return super.getNegotiatedSubprotocol(supported, requested);
        // 在@ServerEndpoint中session获取的子协议，先于modifyHandshake执行
        // 此处返回后不可再在modifyHandshake中设置响应头
    }

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        super.modifyHandshake(sec, request, response);

        // 获取请求头子协议 类型为UnmodifiableRandomAccessList
        request.getHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
        // 设置响应头子协议，此时不能设置@ServerEndpoint的subprotocols
        response.getHeaders().put(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL, Collections.singletonList("允许的子协议"));
    }
}
```