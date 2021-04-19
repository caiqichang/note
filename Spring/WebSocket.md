# WebSocket

## Web Api of WebSocket
- Protocol: http -> ws, https -> wss
- SubProtocol -- optional
  - A string or an array of string, locate at request header `Sec-WebSocket-Protocol`.
  - If request with sub protocol, response must with header `Sec-WebSocket-Protocol` when connection established.
    The value of `Sec-WebSocket-Protocol` must equal to (if a string) or one of (if an array) sub protocol.
  - General use for authentication (like token).
```javascript
let websocket = new WebSocket('ws://ip:port/context-path/api', subPotocol);
websocket.onopen = event => {};
websocket.onclose = event => {};
websocket.onerror = event => {};
websocket.onmessage = event => {};
```

## Server
- Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-websocket</artifactId>
</dependency>
```

## Base on Spring WebSocket (recommand)
1. Configuration
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
        // Register
        webSocketHandlerRegistry
                // Config interface handler and path.
                .addHandler(springWebsocket, "/api")
                // Config handshake interceptor (optional)
                .addInterceptors(apiHandshakeInterceptor);

        // Register more ...
    }
}
```

2. Interface Handler
- Interface `WebSocketHandler` 
  - Absolute class `AbstractWebSocketHandler`
    - Class `TextWebSocketHandler` for type `TextMessage` (general)
    - Class `BinaryWebSocketHandler` for type `BinaryMessage`
```java
@Component
public class ApiWebSocketHandler implements WebSocketHandler {
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        // Get sub protocol of response from session, type is UnmodifiableList.
        session.getHandshakeHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
    }

    @Override
    public void handleMessage(WebSocketSession session, WebSocketMessage<?> message) throws Exception {
        // WebSocketMessage type include: Text, Binary, Pong (here ping and there pong).
    }

    @Override
    public void handleTransportError(WebSocketSession session, Throwable exception) throws Exception {
        
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus closeStatus) throws Exception {
        
    }

    @Override
    public boolean supportsPartialMessages() {
        return false;
    }
}
```

3. Handshake Interceptor
- Implement `HandshakeInterceptor` Interface
```java
@Component
public class ApiHandshakeInterceptor implements HandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // Get sub protocol of request, type is LinkedList.
        request.getHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
    
        // Authentication ...

        // Set sub protocol of response if certified.
        response.getHeaders().add(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL, subPotocol);

        // Return true to establish connection or false to reject. 
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
        
    }
}
```

## Base on Javax WebSocket

1. Configuration
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

2. Interface Handler
```java
@Component
// Value is path of interface. 
@ServerEndpoint(value = "/api", configurator = ApiWebsocketConfigurator.class)
public class ApiWebsocket {
    @OnOpen
    public void onOpen(Session session) throws IOException {
        // Get sub protocol of response from session. 
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

3. Configurator
```java
@Component
public class ApiWebsocketConfigurator extends ServerEndpointConfig.Configurator {

    @Override
    public String getNegotiatedSubprotocol(List<String> supported, List<String> requested) {
        String result = super.getNegotiatedSubprotocol(supported, requested);
        // requested is list of sub protocol of request.

        // Authentication ....

        // Return sub protocol of response if certified or default result if not.
    }
}
```