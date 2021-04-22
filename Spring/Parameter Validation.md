# Parameter Validation 

> Base on Java Bean Validation

0. Dependency
```xml
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
```

1. Custom Validation Annotation
```java
// appoint vaildator
@Constraint(validatedBy = {CustomConstraintValidator.class})
@Documented
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.TYPE, ElementType.FIELD, ElementType.METHOD, ElementType.TYPE_USE, ElementType.PARAMETER})
// optional
@Repeatable(CustomConstraint.List.class)
public @interface CustomConstraint {
    // required, use {} to reference to properties of annotation, use ${} for expression, so it need to escape { , } , $ and \ .
    String message() default "";
    // required, validation group
    Class<?>[] groups() default {};
    // required, user parameter, get by ConstraintViolation.getConstraintDescriptor().getPayload().
    Class<? extends Payload>[] payload() default {};
    // optional, required if target is ambiguous. Annotate target is method, appoint to valid target.
    // - IMPLICIT (default): 
    //   - Valid field if target is not method or constructor.
    //   - Valid return value if target is non-parameter method or constructor.
    //   - Valid paramter if target is non-return-value method.
    //   - Not Valid if target is method with parameter and return value or constructor with parameter.
    // - RETURN_VALUE 
    // - PARAMETER
    // throw ConstraintDeclarationException if target is not suitable.
    ConstraintTarget validationAppliesTo() default ConstraintTarget.IMPLICIT;

    // optional
    @Documented
    @Retention(RetentionPolicy.RUNTIME)
    @Target({ElementType.FIELD, ElementType.METHOD})
    @interface List {
        CustomConstraint[] value();
    }

    // other parameter ...
}
```

2. Define Validator
- Implement `ConstraintValidator`
```java
// T -- type of argument that need to be valided.
// This class is not singleton, but can inject Spring Bean.
public class CustomConstraintValidator implements ConstraintValidator<CustomConstraint, T> {
    @Override
    public boolean isValid(T value, ConstraintValidatorContext context) {
        // value is a copy of argument that need to valid. Different validator have diffferent copy.
        // ConstraintValidatorContext -- general use to modify message.

        // Get default message, general use for judge if user has define message or internationalization.
        context.getDefaultConstraintMessageTemplate();
        // Disable default message, include user define in annotation.
        context.disableDefaultConstraintViolation();
        // Custom message, if never disable default, validator will be call multi times with different message.
        context.buildConstraintViolationWithTemplate("NEW_MESSAGE").addConstraintViolation();

        // ...
    }

    // Invocate before each isValid().
    @Override
    public void initialize(CustomConstraint constraintAnnotation) {
        // Get properties of annotation from constraintAnnotation.
        
        // ...
    }
}
```

3. Usage
- `@Valid` is belong to Java Bean Validation, for enable validation of bean.
- For `nested` bean, need `@Valid` on that bean if won to valid. Attention that weather it is `@NotNull` or not.
- `@Validated` is belong to Spring, for valid parameter. Use on controller for pure parameter and on parameter for bean parameter.

- Example
```java
@Controller
public TestController {
    @RequestMapping
    @Validated
    public void API(@NotEmpty String str, @Validated ENTITY entity) {}
}
```
- Attention that invalid parameter will throw different exception like
  BindException, MethodArgumentNotValidException, ConstraintViolationException or others.
  Be sure to deal with multiple suitation in global exception hander.

4. Validation Group
- Example
```java
public interface group0 {}
public interface group1 {}
public interface group2 {}

// str0 belong to group of javax.validation.groups.Default.
@Min(3)
private Integer str0;
@Min(value = 5, groups = group1.class)
private Integer str1;
@Min(value = 6, groups = group2.class)
private Integer str2;
@Min(value = 8, groups = {group1.class, group2.class})
private Integer str3;
```
- Use `@Validated` to appoint validation group, if not valid `Default` group.
- Attention that if have appointed group, must appoint `Default` group if won to valid default.
```java
// valid str0
@Validated
// valid str1 and str3
@Validated(group1.class)
// valid str1, str2 and str3 
@Validated({group1.class, group2.class})
// valid str0, str1, str2 and str3 
@Validated({Default.class, group1.class, group2.class})
// valid nothing, always remove @Validated
@Validated(group0.class)
```

5. Other Example
- Valid each member of collection.
```java
List<@Pattern(regexp = "^[a-zA-Z][a-zA-Z0-9_]{0,19}$") String> params
```