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
        // Get sub protocol from session, type is UnmodifiableList.
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

3. Handshake Config
- Implement `HandshakeInterceptor` Interface
```java
@Component
public class ApiHandshakeInterceptor implements HandshakeInterceptor {
    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        // Get request protocol, type is LinkedList.
        request.getHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
        // Set response sub protocol
        response.getHeaders().add(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL, subPotocol);
        
        // Return true of false to establish. Attention to make sure the rule of sub protocol in request and response header.
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
- @ServerEndpoint
  - value -- Path
  - subprotocols
  - configurator 
```java
@Component
@ServerEndpoint(value = "/api", subprotocols = {"SUB_PROTOCOL"}, configurator = ApiWebsocketConfigurator.class)
public class ApiWebsocket {
    @OnOpen
    public void onOpen(Session session) throws IOException {
        // Get sub protocol from session. In fact, it calls method ServerEndpointConfig.Configurator$getNegotiatedSubprotocol() as follows.
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

- todo

```java
@Component
public class ApiWebsocketConfigurator extends ServerEndpointConfig.Configurator {
    @Override
    public boolean checkOrigin(String originHeaderValue) {
        return super.checkOrigin(originHeaderValue);
        // Return true or false to establish connection.
        // Invocated before modifyHandshake, but require to follow the rule of sub protocol in request and response header.
    }

    @Override
    public String getNegotiatedSubprotocol(List<String> supported, List<String> requested) {
        return super.getNegotiatedSubprotocol(supported, requested);
        // For getting sub protocol in @ServerEndpoint (use session), invocated before modifyHandshake.
        // Can not change response header in modifyHandshake if this is invocated.
    }

    @Override
    public void modifyHandshake(ServerEndpointConfig sec, HandshakeRequest request, HandshakeResponse response) {
        super.modifyHandshake(sec, request, response);

        // Get request sub protocol, type is UnmodifiableRandomAccessList.
        request.getHeaders().get(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL);
        // Set response sub protocol, attention that it is effective if never set subprotocols of @ServerEndpoint.
        response.getHeaders().put(WebSocketHttpHeaders.SEC_WEBSOCKET_PROTOCOL, Collections.singletonList("ENABLE_SUB_PROTOCOL"));
    }
}
```