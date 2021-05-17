# Regular Expression

- At least include one letter or number.
```
(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).+
```

- Begin with letter and underline, 
  only include letter, number or underline. (Parameter Pattern)
```
^[a-zA-Z][a-zA-Z0-9_].+$
```

