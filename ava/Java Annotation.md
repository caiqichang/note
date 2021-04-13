# Annotation

## Define:
  - value is the default parameter (must define before using)
  - use ` default DEFAULT_VALUE` behind parameter to set perset value
  - parameter type: Basic Type, String, Class, Enum, Annotation and Array of these
```java
public @interface CustomAnnotation {

}
```

## Meta Annotation：

1. @Documented
> Enable to be include in javadoc.

2. @Retention
> Scope, value is emun of `RetentionPolicy`
- SOURCE -- source code，never exist in .class file.
- CLASS -- bytecode，exist in .class file, inavailable at `Runtime`
- RUNTIME -- exist in .class file and available at `Runtime`

3. @Target
> Element that could be annotated, value is array of `ElementType`
- TYPE -- class, interface, emun 
- FIELD -- property of class, interface, emun 
- METHOD
- PARAMETER -- parameter of method
- CONSTRUCTOR
- LOCAL_VARIABLE -- local variable in method
  - Beacuse `javac` never keep annotation of local variable in bytecode, 
    LOCAL_VARIABLE always being used when `Retention` is `SOURCE`.
  - Local variable may be removed or changed by Compiler Optimition, 
    `Reflection` can not get local variable at runtime.
- ANNOTATION_TYPE -- annotation
- PACKAGE
- TYPE_PARAMETER -- generic parameter
  - e.g. `<@CustomAnnotation T>`
- TYPE_USE -- generic parameter or argument
  - e.g. `<@CustomAnnotation T extends @CustomAnnotation List>` or `List<@CustomAnnotation String>`

4. @Inherited 
> Enable to keep annotation when Inheriting. 
(children cloud have parent's annotation event they do not have)

| Target Type | Situtation |
| - | - |
| TYPE | `Class Extend` valid, `Class Implement` or `Interface Extend` invalid |
| FIELD | (Extend or Implement) `Public but not Override` valid, `Override` invalid |
| METHOD | (Extend or Implement) `Public but not Override` valid, `Override` invalid |

5. @Repeatable
> Enable annotation to annotate more that once at same target.
> Need a `Multi Annotation` and its `@Target` must subset of `Single Annotation`'s
- Define:
```java
@Repeatable(CustomAnnotations.class)
public @interface CustomAnnotation {}

public @interface CustomAnnotations {
    CustomAnnotation[] value();
}
```
- Usage:
```java
@CustomAnnotation
@CustomAnnotation
// or
@CustomAnnotations({@CustomAnnotation, @CustomAnnotation})
```
- Inline Mode, recommend by Java Bean Validation
```java
@Repeatable(CustomAnnotations.List.class)
public @interface CustomAnnotation {
    @interface List {
        CustomAnnotation[] value();
    }
}
@CustomAnnotation.List({@CustomAnnotation, @CustomAnnotation})
```
