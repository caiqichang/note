# Swing 配置全局样式和字体

## 1. LookAndFeel
```java
// THEME -- Metal, Nimbus, CDE/Motif, Windows, Windows Classic 
UIManager.LookAndFeelInfo[] themes = UIManager.getInstalledLookAndFeels();
for (UIManager.LookAndFeelInfo t : themes) {
    if (t.getName().equals(THEME)) { 
        try {
            UIManager.setLookAndFeel(t.getClassName());
            break;
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```

## 2. Font
```java
// FONT_STYLE -- e.g. Microsoft YaHei
// FONT_STYLE -- e.g. Font.PLAIN 0, Font.BOLD 1, Font.ITALIC 2, Font.BOLD | Font.ITALIC 3
// FONT_SIZE  -- e.g. 16
FontUIResource fontUIResource = new FontUIResource(new Font(FONT_STYLE, FONT_STYLE, FONT_SIZE));
Enumeration<Object> keyIter = UIManager.getDefaults().keys();
while (keyIter.hasMoreElements()) {
    Object key = keyIter.nextElement();
    Object value = UIManager.get(key);
    if (value instanceof FontUIResource)
        UIManager.put(key, fontUIResource);
}
```
