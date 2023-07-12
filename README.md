
# Graph Tasker
```
A --|
    |-- D --|
B --|       |-- E
            |
C ----------|
```

Task A, B, C: no dependencies
Task D: Depends on A, B
Task E: Depends on D, C

1. Create a task graph - Register tasks w/ dependencies
2. Run tasks

Task: Id, async function, dependencies