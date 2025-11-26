# Dynamic Programming Fundamentals: A Deep Dive

## Table of Contents
1. [Recursion Basics](#recursion-basics)
2. [The Fibonacci Problem](#fibonacci-problem)
3. [Memoization (Top-Down Approach)](#memoization)
4. [Tabulation (Bottom-Up Approach)](#tabulation)
5. [Climbing Stairs Problem](#climbing-stairs)
6. [Grid Path Counting](#grid-paths)
7. [Key Concepts Summary](#summary)

---

## 1. Recursion Basics {#recursion-basics}

Recursion is when a function calls itself to solve smaller instances of the same problem.

**Key Components:**
- **Base Case**: The stopping condition that prevents infinite recursion
- **Recursive Case**: The part where the function calls itself with a smaller problem

**Simple Example: Factorial**

```python
def factorial(n):
    # Base case
    if n == 0 or n == 1:
        return 1
    
    # Recursive case
    return n * factorial(n - 1)

# factorial(5) = 5 * factorial(4)
#              = 5 * 4 * factorial(3)
#              = 5 * 4 * 3 * factorial(2)
#              = 5 * 4 * 3 * 2 * factorial(1)
#              = 5 * 4 * 3 * 2 * 1 = 120
```

---

## 2. The Fibonacci Problem {#fibonacci-problem}

The Fibonacci sequence is: 0, 1, 1, 2, 3, 5, 8, 13, 21...

**Formula**: `F(n) = F(n-1) + F(n-2)` with `F(0) = 0, F(1) = 1`

### Naive Recursive Solution

```python
def fib_naive(n):
    if n <= 1:
        return n
    return fib_naive(n - 1) + fib_naive(n - 2)
```

### The Problem: Exponential Time Complexity

**Recursion Tree for fib(5):**

```
                    fib(5)
                   /      \
              fib(4)        fib(3)
             /     \        /     \
        fib(3)   fib(2)  fib(2)  fib(1)
        /   \     /  \    /  \
    fib(2) fib(1) f(1) f(0) f(1) f(0)
    /   \
  f(1) f(0)
```

**Overlapping Subproblems**: Notice how `fib(3)`, `fib(2)`, `fib(1)`, and `fib(0)` are calculated multiple times! This is wasteful.

- `fib(2)` is calculated **3 times**
- `fib(3)` is calculated **2 times**
- Time Complexity: **O(2^n)** - doubles with each increment!
- For `fib(40)`, you'd make over **2 billion** function calls!

### Optimal Substructure

The optimal solution to `fib(n)` can be constructed from optimal solutions to its subproblems: `fib(n-1)` and `fib(n-2)`. This property is essential for dynamic programming.

---

## 3. Memoization (Top-Down Approach) {#memoization}

**Memoization**: Store results of expensive function calls and return the cached result when the same inputs occur again.

### Fibonacci with Memoization

```python
def fib_memo(n, memo=None):
    if memo is None:
        memo = {}
    
    # Base cases
    if n <= 1:
        return n
    
    # Check if already calculated
    if n in memo:
        return memo[n]
    
    # Calculate and store
    memo[n] = fib_memo(n - 1, memo) + fib_memo(n - 2, memo)
    return memo[n]
```

**Alternative using @lru_cache decorator:**

```python
from functools import lru_cache

@lru_cache(maxsize=None)
def fib_memo_decorator(n):
    if n <= 1:
        return n
    return fib_memo_decorator(n - 1) + fib_memo_decorator(n - 2)
```

### How It Works

**Execution for fib_memo(5):**

```
Call fib(5):
  Call fib(4):
    Call fib(3):
      Call fib(2):
        Call fib(1): return 1
        Call fib(0): return 0
        Store memo[2] = 1
      Call fib(1): return 1
      Store memo[3] = 2
    Call fib(2): return memo[2] = 1  ← CACHED!
    Store memo[4] = 3
  Call fib(3): return memo[3] = 2  ← CACHED!
  Store memo[5] = 5

Result: 5
```

**Benefits:**
- Time Complexity: **O(n)** - each subproblem solved once
- Space Complexity: **O(n)** - memo dictionary + recursion stack
- Easy to implement (just add caching to recursive solution)

---

## 4. Tabulation (Bottom-Up Approach) {#tabulation}

**Tabulation**: Build a table iteratively, starting from the smallest subproblems and working up to the final solution.

### Fibonacci with Tabulation

```python
def fib_tab(n):
    if n <= 1:
        return n
    
    # Create table
    dp = [0] * (n + 1)
    
    # Base cases
    dp[0] = 0
    dp[1] = 1
    
    # Fill table bottom-up
    for i in range(2, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]
```

### How It Works

**Building the table for n=7:**

```
Index:  0  1  2  3  4  5   6   7
dp:    [0, 1, 1, 2, 3, 5,  8, 13]
        ↑  ↑  
     base  base

Step 2: dp[2] = dp[1] + dp[0] = 1 + 0 = 1
Step 3: dp[3] = dp[2] + dp[1] = 1 + 1 = 2
Step 4: dp[4] = dp[3] + dp[2] = 2 + 1 = 3
Step 5: dp[5] = dp[4] + dp[3] = 3 + 2 = 5
Step 6: dp[6] = dp[5] + dp[4] = 5 + 3 = 8
Step 7: dp[7] = dp[6] + dp[5] = 8 + 5 = 13
```

**Space-Optimized Version:**

Since we only need the last two values, we can reduce space to O(1):

```python
def fib_optimized(n):
    if n <= 1:
        return n
    
    prev2 = 0  # fib(i-2)
    prev1 = 1  # fib(i-1)
    
    for i in range(2, n + 1):
        current = prev1 + prev2
        prev2 = prev1
        prev1 = current
    
    return prev1
```

### Top-Down vs Bottom-Up Comparison

| Aspect | Memoization (Top-Down) | Tabulation (Bottom-Up) |
|--------|------------------------|------------------------|
| **Approach** | Recursive + caching | Iterative table building |
| **Direction** | Solves from n down to base | Solves from base up to n |
| **Space** | O(n) table + O(n) stack | O(n) table only |
| **Subproblems** | Only solves needed ones | Solves all subproblems |
| **Implementation** | Usually easier/intuitive | Requires careful ordering |
| **Real Recursion** | Yes (call stack) | No (loops) |

---

## 5. Climbing Stairs Problem {#climbing-stairs}

**Problem**: You're climbing a staircase with `n` steps. You can climb 1 or 2 steps at a time. How many distinct ways can you reach the top?

### Understanding State Transitions

**State**: Current step position  
**Transition**: From step `i`, you can reach `i+1` or `i+2`

**Visualization for n=5:**

```
Ways to reach each step:

Step 0 (ground): 1 way (starting position)
Step 1: 1 way → (1)
Step 2: 2 ways → (1,1) or (2)
Step 3: 3 ways → (1,1,1), (1,2), or (2,1)
Step 4: 5 ways → (1,1,1,1), (1,1,2), (1,2,1), (2,1,1), or (2,2)
Step 5: 8 ways → all ways to step 3 + one 2-step, or all ways to step 4 + one 1-step
```

### The Key Insight

To reach step `n`, you must come from either:
- Step `n-1` (take 1 step), OR
- Step `n-2` (take 2 steps)

Therefore: `ways(n) = ways(n-1) + ways(n-2)`

**This is exactly Fibonacci!**

### Solution with Tabulation

```python
def climbStairs(n):
    if n <= 2:
        return n
    
    dp = [0] * (n + 1)
    dp[1] = 1  # 1 way to reach step 1
    dp[2] = 2  # 2 ways to reach step 2
    
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    
    return dp[n]
```

### Visualizing State Transitions

```
n = 4 stairs

    ┌──┐ 4
    │  │
    ├──┤ 3
    │  │
    ├──┤ 2
    │  │
    ├──┤ 1
    │  │
    └──┘ 0 (ground)

State Transition Diagram:

0 → 1 → 2 → 3 → 4
  ↘   ↗ ↘   ↗ ↘   ↗
    2     3     4

From each state, two transitions:
- +1 step (always possible)
- +2 steps (always possible)

dp values: [0, 1, 2, 3, 5]
           └─ 0  1  2  3  4 (step number)
```

### Extension: Variable Step Sizes

What if you can climb 1, 2, or 3 steps at a time?

```python
def climbStairsVariableSteps(n, steps=[1, 2, 3]):
    dp = [0] * (n + 1)
    dp[0] = 1  # One way to stay at ground
    
    for i in range(1, n + 1):
        for step in steps:
            if i >= step:
                dp[i] += dp[i - step]
    
    return dp[n]
```

---

## 6. Grid Path Counting {#grid-paths}

**Problem**: Count the number of unique paths from top-left to bottom-right in an m×n grid. You can only move right or down.

### Visualizing the Problem

**3×3 Grid Example:**

```
START
┌───┬───┬───┐
│ S │ → │ → │  You can only move:
├───┼───┼───┤  → (right)
│ ↓ │   │ → │  ↓ (down)
├───┼───┼───┤
│ ↓ │ → │ E │
└───┴───┴───┘
        END
```

### The Insight

To reach any cell `(i, j)`, you must come from either:
- Cell `(i-1, j)` (from above), OR
- Cell `(i, j-1)` (from left)

Therefore: `paths(i, j) = paths(i-1, j) + paths(i, j-1)`

### Building the DP Table

**For a 3×4 grid:**

```
    j=0  j=1  j=2  j=3
i=0  1    1    1    1   ← First row: only one way (go right)
i=1  1    2    3    4   ← Each cell = cell above + cell left
i=2  1    3    6   10   ← Final answer at bottom-right

How to read:
- paths(0,0) = 1 (starting point)
- paths(0,1) = 1 (only one way: right from start)
- paths(1,1) = paths(0,1) + paths(1,0) = 1 + 1 = 2
- paths(1,2) = paths(0,2) + paths(1,1) = 1 + 2 = 3
- paths(2,3) = paths(1,3) + paths(2,2) = 4 + 6 = 10
```

### Solution Code

```python
def uniquePaths(m, n):
    """
    m: number of rows
    n: number of columns
    """
    # Create dp table
    dp = [[0] * n for _ in range(m)]
    
    # Initialize first row (can only go right)
    for j in range(n):
        dp[0][j] = 1
    
    # Initialize first column (can only go down)
    for i in range(m):
        dp[i][0] = 1
    
    # Fill the rest of the table
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]

# Example: 3x3 grid
print(uniquePaths(3, 3))  # Output: 6
```

### Step-by-Step Execution

**For a 3×3 grid:**

```
Step 1: Initialize
    0   1   2
0   1   1   1
1   1   ?   ?
2   1   ?   ?

Step 2: Fill (1,1)
dp[1][1] = dp[0][1] + dp[1][0] = 1 + 1 = 2

    0   1   2
0   1   1   1
1   1   2   ?
2   1   ?   ?

Step 3: Fill (1,2)
dp[1][2] = dp[0][2] + dp[1][1] = 1 + 2 = 3

    0   1   2
0   1   1   1
1   1   2   3
2   1   ?   ?

Step 4: Fill (2,1)
dp[2][1] = dp[1][1] + dp[2][0] = 2 + 1 = 3

    0   1   2
0   1   1   1
1   1   2   3
2   1   3   ?

Step 5: Fill (2,2)
dp[2][2] = dp[1][2] + dp[2][1] = 3 + 3 = 6

    0   1   2
0   1   1   1
1   1   2   3
2   1   3   6  ← Answer: 6 unique paths
```

### Space-Optimized Version

Since each row only depends on the previous row and the current row (left side), we can use just one array:

```python
def uniquePathsOptimized(m, n):
    dp = [1] * n  # Initialize with 1s (first row)
    
    for i in range(1, m):
        for j in range(1, n):
            dp[j] = dp[j] + dp[j-1]
            # dp[j] (before update) = paths from above
            # dp[j-1] = paths from left
    
    return dp[n-1]
```

### Extension: Grid with Obstacles

If some cells are blocked:

```python
def uniquePathsWithObstacles(grid):
    m, n = len(grid), len(grid[0])
    
    if grid[0][0] == 1 or grid[m-1][n-1] == 1:
        return 0  # Start or end blocked
    
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = 1
    
    # Initialize first row
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] if grid[0][j] == 0 else 0
    
    # Initialize first column
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] if grid[i][0] == 0 else 0
    
    # Fill the table
    for i in range(1, m):
        for j in range(1, n):
            if grid[i][j] == 1:  # Obstacle
                dp[i][j] = 0
            else:
                dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]

# Example:
grid = [
    [0, 0, 0],
    [0, 1, 0],  # 1 = obstacle
    [0, 0, 0]
]
print(uniquePathsWithObstacles(grid))  # Output: 2
```

---

## 7. Key Concepts Summary {#summary}

### Overlapping Subproblems

A problem has overlapping subproblems if the same subproblems are solved multiple times. This is wasteful in plain recursion but is the reason DP provides dramatic speedups.

**Example**: In Fibonacci, `fib(3)` is calculated many times in the naive recursive solution.

### Optimal Substructure

A problem has optimal substructure if an optimal solution can be constructed from optimal solutions to its subproblems.

**Example**: The shortest path from A to C through B equals the shortest path from A to B plus the shortest path from B to C.

### When to Use Each Approach

**Use Memoization when:**
- The recursive solution is intuitive
- Not all subproblems need to be solved
- You're prototyping quickly

**Use Tabulation when:**
- You need to solve all subproblems anyway
- You want to optimize space
- Stack overflow is a concern (deep recursion)
- You need the absolute best performance

### The DP Problem-Solving Framework

1. **Identify if it's a DP problem**: Look for optimal solutions, counting problems, or decisions that depend on previous decisions

2. **Define the state**: What information do you need to track?
   - Fibonacci: `dp[i]` = ith Fibonacci number
   - Stairs: `dp[i]` = ways to reach step i
   - Grid: `dp[i][j]` = paths to cell (i,j)

3. **Find the recurrence relation**: How does the current state relate to previous states?
   - Fibonacci: `dp[i] = dp[i-1] + dp[i-2]`
   - Grid: `dp[i][j] = dp[i-1][j] + dp[i][j-1]`

4. **Identify base cases**: What are the simplest subproblems?
   - Fibonacci: `dp[0] = 0, dp[1] = 1`
   - Grid: First row and column all equal 1

5. **Determine order of computation**: Which subproblems must be solved first?
   - Usually: smaller → larger
   - Grid: left-to-right, top-to-bottom

6. **Implement and optimize**: Start with clear code, then optimize space if needed

### Complexity Analysis Reference

| Problem | Naive | Memoization | Tabulation | Space-Optimized |
|---------|-------|-------------|------------|-----------------|
| Fibonacci | O(2ⁿ) | O(n) | O(n) | O(1) |
| Stairs | O(2ⁿ) | O(n) | O(n) | O(1) |
| Grid Paths | O(2^(m+n)) | O(m×n) | O(m×n) | O(n) |

---

## Practice Problems

To solidify these concepts, try these problems:

1. **Min Cost Climbing Stairs**: Each step has a cost. Find the minimum cost to reach the top.

2. **House Robber**: Houses in a row have money. You can't rob adjacent houses. Maximize money stolen.

3. **Coin Change**: Given coin denominations, find the minimum number of coins to make a target amount.

4. **Longest Common Subsequence**: Find the longest subsequence common to two strings.

5. **Edit Distance**: Minimum operations (insert/delete/replace) to convert one string to another.

Each of these problems builds on the concepts covered here and will deepen your understanding of dynamic programming!

---

*Remember: DP is not about memorizing solutions—it's about recognizing patterns in how problems break down into subproblems. With practice, you'll start seeing these patterns everywhere!*