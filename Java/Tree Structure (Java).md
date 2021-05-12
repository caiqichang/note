# Tree Structure (Java)

## Base Tree Interface
```java
/**
 * base tree for tree util
 * usage:
 * public class MenuTree implements Tree<MenuTree, Long> {}
 *
 * @param <ITEM>  type of tree item (tree itself)
 * @param <ID> type of id
 */
public interface Tree<ITEM extends Tree<?, ID>, ID> {
    ID getId();
    ID getParentId();
    List<ITEM> getSubList();
    void setSubList(List<ITEM> list);
}
```
- Usage
```java
public class MenuTree implements Tree<MenuTree, Long> {
    // ...
}
```

## Looping
```java
public <ID, ITEM extends Tree<ITEM, ID>> void loop(ITEM root, Consumer<ITEM> iterator) {
    if (root.getSubList() != null) root.getSubList().forEach(i -> loop(i, iterator));
    iterator.accept(root);
}
```
- usage:
```java
menuTree.forEach(root -> {
    loop(root, item -> {
        // ...
    });
});
```

## Transform List to Tree
```java
/**
 * Transform list to tree structure
 *
 * @param list       list to be transformed
 * @param clazz      type of tree item
 * @param comparator sort if comparator is not null
 */
public <ID, ITEM extends Tree<ITEM, ID>> List<ITEM> listToTree(List<?> list, Class<ITEM> clazz, Comparator<ITEM> comparator) {
    List<ITEM> tree = new ArrayList<>();

    // create a copy of list
    List<ITEM> copy = BeanCopyUtil.beanListCopy(list, clazz);

    // construct tree
    copy.forEach(i -> {
        boolean isParent = true;
        for (ITEM parent : copy) {
            if (parent.getId().equals(i.getParentId())) {
                isParent = false;
                if (parent.getSubList() == null) parent.setSubList(new ArrayList<>());
                parent.getSubList().add(i);
                break;
            }
        }
        if (isParent) tree.add(i);
    });

    // sorting
    if (comparator != null) {
        copy.sort(comparator);
        tree.forEach(root -> {
            loop(root, item -> {
                if (item.getSubList() != null) item.getSubList().sort(comparator);
            });
        });
    }

    return tree;
}
```
- usage:
```java
listToTree(menuList, MenuTree.class, Comparator.comparing(MenuTree::getOrder));
```

