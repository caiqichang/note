# Scope of Maven Dependency

| Scope | LifeCycle | Example |
| - | - | - |
| compile | build test runtime | default |
| test | test | JUnit (only used in test) |
| provided | build test | Servlet (provided by tomcat) |
| runtime | runtime | Database Driver (prevent to be used in source code) |

