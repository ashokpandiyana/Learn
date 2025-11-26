# Complete Dynamic Programming Patterns Guide
## From Beginner to Advanced

---

## Table of Contents
1. [Introduction & Core Concepts](#introduction)
2. [Pattern 1: Linear DP (1D)](#pattern-1)
3. [Pattern 2: Grid/2D DP](#pattern-2)
4. [Pattern 3: Knapsack Patterns](#pattern-3)
5. [Pattern 4: Longest Common Subsequence (LCS) Family](#pattern-4)
6. [Pattern 5: Longest Increasing Subsequence (LIS) Family](#pattern-5)
7. [Pattern 6: Palindrome Problems](#pattern-6)
8. [Pattern 7: String Matching & Edit Distance](#pattern-7)
9. [Pattern 8: Partition Problems](#pattern-8)
10. [Pattern 9: DP on Trees](#pattern-9)
11. [Pattern 10: DP with Bitmasks](#pattern-10)
12. [Pattern 11: Digit DP](#pattern-11)
13. [Pattern 12: Matrix Chain Multiplication](#pattern-12)
14. [Pattern 13: Game Theory DP](#pattern-13)
15. [Pattern 14: Probability DP](#pattern-14)
16. [Pattern 15: State Machine DP](#pattern-15)
17. [Advanced Optimization Techniques](#optimizations)

---

## <a name="introduction"></a>1. Introduction & Core Concepts

### What is Dynamic Programming?

Dynamic Programming (DP) is an algorithmic paradigm that solves complex problems by:
1. Breaking them into overlapping subproblems
2. Solving each subproblem once
3. Storing solutions for reuse (memoization)

### When to Use DP?

**Two key properties:**
1. **Optimal Substructure**: Optimal solution contains optimal solutions to subproblems
2. **Overlapping Subproblems**: Same subproblems are solved multiple times

### Two Approaches

#### 1. Memoization (Top-Down)
- Start with original problem
- Recursively break down
- Store results in cache

```python
def fib_memo(n, memo={}):
    if n in memo:
        return memo[n]
    if n <= 1:
        return n
    memo[n] = fib_memo(n-1, memo) + fib_memo(n-2, memo)
    return memo[n]
```

#### 2. Tabulation (Bottom-Up)
- Start with smallest subproblems
- Build up to original problem
- Fill table iteratively

```python
def fib_tab(n):
    if n <= 1:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    for i in range(2, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]
```

### The DP Framework (5 Steps)

1. **Define State**: What parameters uniquely identify a subproblem?
2. **Define Recurrence**: How do states relate to each other?
3. **Base Cases**: What are the simplest cases?
4. **Compute Order**: Which order ensures dependencies are met?
5. **Answer Location**: Where is the final answer?

---

## <a name="pattern-1"></a>2. Pattern 1: Linear DP (1D)

### Core Concept
State depends on previous states in a linear sequence.

### Problem 1: Climbing Stairs
**Problem**: Climb n stairs, taking 1 or 2 steps at a time. Count ways.

**State**: `dp[i]` = ways to reach step i

**Recurrence**: `dp[i] = dp[i-1] + dp[i-2]`

**Visualization**:
```
Step:  0  1  2  3  4  5
Ways:  1  1  2  3  5  8
       ↑     ↗ ↖
       |    /   \
       |   1     2
```

```python
def climbStairs(n):
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1], dp[2] = 1, 2
    for i in range(3, n + 1):
        dp[i] = dp[i-1] + dp[i-2]
    return dp[n]

# Space Optimized O(1)
def climbStairs_optimized(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for i in range(3, n + 1):
        curr = prev1 + prev2
        prev2, prev1 = prev1, curr
    return prev1
```

### Problem 2: House Robber
**Problem**: Rob houses in a line, can't rob adjacent houses. Maximize loot.

**State**: `dp[i]` = max loot from houses 0 to i

**Recurrence**: `dp[i] = max(dp[i-1], dp[i-2] + nums[i])`

```python
def rob(nums):
    if not nums:
        return 0
    if len(nums) == 1:
        return nums[0]
    
    n = len(nums)
    dp = [0] * n
    dp[0] = nums[0]
    dp[1] = max(nums[0], nums[1])
    
    for i in range(2, n):
        dp[i] = max(dp[i-1], dp[i-2] + nums[i])
    
    return dp[n-1]

# Space Optimized
def rob_optimized(nums):
    if not nums:
        return 0
    prev2, prev1 = 0, 0
    for num in nums:
        curr = max(prev1, prev2 + num)
        prev2, prev1 = prev1, curr
    return prev1
```

### Problem 3: Maximum Subarray (Kadane's Algorithm)
**Problem**: Find contiguous subarray with maximum sum.

**State**: `dp[i]` = max sum ending at index i

**Recurrence**: `dp[i] = max(nums[i], dp[i-1] + nums[i])`

```python
def maxSubArray(nums):
    max_sum = curr_sum = nums[0]
    
    for i in range(1, len(nums)):
        curr_sum = max(nums[i], curr_sum + nums[i])
        max_sum = max(max_sum, curr_sum)
    
    return max_sum
```

### Problem 4: Decode Ways
**Problem**: "226" can be decoded as "BZ" (2,26), "VF" (22,6), "BBF" (2,2,6). Count ways.

**State**: `dp[i]` = ways to decode string[0:i]

**Recurrence**: 
```
dp[i] = dp[i-1] (if s[i-1] is '1'-'9')
      + dp[i-2] (if s[i-2:i] is '10'-'26')
```

```python
def numDecodings(s):
    if not s or s[0] == '0':
        return 0
    
    n = len(s)
    dp = [0] * (n + 1)
    dp[0] = 1  # empty string
    dp[1] = 1  # first character
    
    for i in range(2, n + 1):
        # Single digit
        if s[i-1] != '0':
            dp[i] += dp[i-1]
        
        # Two digits
        two_digit = int(s[i-2:i])
        if 10 <= two_digit <= 26:
            dp[i] += dp[i-2]
    
    return dp[n]
```

---

## <a name="pattern-2"></a>3. Pattern 2: Grid/2D DP

### Core Concept
Navigate a 2D grid, typically finding paths or accumulating values.

### Problem 1: Unique Paths
**Problem**: Robot moves right/down in m×n grid. Count paths from top-left to bottom-right.

**State**: `dp[i][j]` = paths to cell (i,j)

**Recurrence**: `dp[i][j] = dp[i-1][j] + dp[i][j-1]`

**Visualization**:
```
Grid 3×3:
1  1  1
1  2  3
1  3  6
```

```python
def uniquePaths(m, n):
    dp = [[1] * n for _ in range(m)]
    
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = dp[i-1][j] + dp[i][j-1]
    
    return dp[m-1][n-1]

# Space Optimized O(n)
def uniquePaths_optimized(m, n):
    dp = [1] * n
    for i in range(1, m):
        for j in range(1, n):
            dp[j] += dp[j-1]
    return dp[n-1]
```

### Problem 2: Minimum Path Sum
**Problem**: Find path from top-left to bottom-right with minimum sum.

```python
def minPathSum(grid):
    if not grid:
        return 0
    
    m, n = len(grid), len(grid[0])
    dp = [[0] * n for _ in range(m)]
    dp[0][0] = grid[0][0]
    
    # First row
    for j in range(1, n):
        dp[0][j] = dp[0][j-1] + grid[0][j]
    
    # First column
    for i in range(1, m):
        dp[i][0] = dp[i-1][0] + grid[i][0]
    
    # Rest of grid
    for i in range(1, m):
        for j in range(1, n):
            dp[i][j] = min(dp[i-1][j], dp[i][j-1]) + grid[i][j]
    
    return dp[m-1][n-1]
```

### Problem 3: Longest Common Substring
**Problem**: Find length of longest common substring.

**State**: `dp[i][j]` = length of common substring ending at s1[i-1] and s2[j-1]

```python
def longestCommonSubstring(s1, s2):
    m, n = len(s1), len(s2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    max_length = 0
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s1[i-1] == s2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
                max_length = max(max_length, dp[i][j])
            else:
                dp[i][j] = 0
    
    return max_length
```

---

## <a name="pattern-3"></a>4. Pattern 3: Knapsack Patterns

### 0/1 Knapsack (Classic)
**Problem**: Given weights and values, maximize value with capacity constraint. Each item used 0 or 1 time.

**State**: `dp[i][w]` = max value using items 0..i-1 with capacity w

**Recurrence**:
```
dp[i][w] = max(
    dp[i-1][w],              // don't take item i
    dp[i-1][w-wt[i]] + val[i] // take item i
)
```

```python
def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]

# Space Optimized O(capacity)
def knapsack_01_optimized(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)
    
    for i in range(n):
        # Iterate backwards to avoid using updated values
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]
```

**Backtracking to find items**:
```python
def knapsack_with_items(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    # Fill DP table
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i-1][w - weights[i-1]] + values[i-1]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    # Backtrack to find items
    w = capacity
    items = []
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i-1][w]:
            items.append(i-1)
            w -= weights[i-1]
    
    return dp[n][capacity], items[::-1]
```

### Unbounded Knapsack
**Problem**: Each item can be used unlimited times.

**Recurrence**: `dp[i][w] = max(dp[i-1][w], dp[i][w-wt[i]] + val[i])`

Note: Use `dp[i]` instead of `dp[i-1]` for second term.

```python
def unbounded_knapsack(weights, values, capacity):
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]
    
    for i in range(1, n + 1):
        for w in range(capacity + 1):
            if weights[i-1] <= w:
                dp[i][w] = max(
                    dp[i-1][w],
                    dp[i][w - weights[i-1]] + values[i-1]  # dp[i], not dp[i-1]
                )
            else:
                dp[i][w] = dp[i-1][w]
    
    return dp[n][capacity]

# Space Optimized
def unbounded_knapsack_optimized(weights, values, capacity):
    dp = [0] * (capacity + 1)
    
    for i in range(len(weights)):
        # Iterate forwards (unlike 0/1 knapsack)
        for w in range(weights[i], capacity + 1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])
    
    return dp[capacity]
```

### Subset Sum
**Problem**: Can we select subset with sum equal to target?

```python
def subset_sum(nums, target):
    n = len(nums)
    dp = [[False] * (target + 1) for _ in range(n + 1)]
    
    # Base case: sum 0 is always possible
    for i in range(n + 1):
        dp[i][0] = True
    
    for i in range(1, n + 1):
        for s in range(target + 1):
            if nums[i-1] <= s:
                dp[i][s] = dp[i-1][s] or dp[i-1][s - nums[i-1]]
            else:
                dp[i][s] = dp[i-1][s]
    
    return dp[n][target]

# Space Optimized
def subset_sum_optimized(nums, target):
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]
    
    return dp[target]
```

### Partition Equal Subset Sum
**Problem**: Can array be partitioned into two subsets with equal sum?

```python
def canPartition(nums):
    total = sum(nums)
    if total % 2:
        return False
    
    target = total // 2
    dp = [False] * (target + 1)
    dp[0] = True
    
    for num in nums:
        for s in range(target, num - 1, -1):
            dp[s] = dp[s] or dp[s - num]
    
    return dp[target]
```

### Target Sum
**Problem**: Assign +/- to each number to reach target. Count ways.

**Insight**: This becomes subset sum problem.
- Let P = positive subset, N = negative subset
- P - N = target
- P + N = sum(nums)
- Therefore: P = (target + sum) / 2

```python
def findTargetSumWays(nums, target):
    total = sum(nums)
    if total < abs(target) or (total + target) % 2:
        return 0
    
    subset_sum = (total + target) // 2
    dp = [0] * (subset_sum + 1)
    dp[0] = 1
    
    for num in nums:
        for s in range(subset_sum, num - 1, -1):
            dp[s] += dp[s - num]
    
    return dp[subset_sum]
```

### Coin Change (Minimum Coins)
**Problem**: Minimum coins needed to make amount.

```python
def coinChange(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] = min(dp[a], dp[a - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1
```

### Coin Change 2 (Count Ways)
**Problem**: Count ways to make amount with coins.

```python
def change(amount, coins):
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] += dp[a - coin]
    
    return dp[amount]
```

---

## <a name="pattern-4"></a>5. Pattern 4: Longest Common Subsequence (LCS) Family

### Longest Common Subsequence
**Problem**: Find length of longest subsequence common to both strings.

**State**: `dp[i][j]` = LCS length of s1[0..i-1] and s2[0..j-1]

**Recurrence**:
```
if s1[i-1] == s2[j-1]:
    dp[i][j] = dp[i-1][j-1] + 1
else:
    dp[i][j] = max(dp[i-1][j], dp[i][j-1])
```

```python
def longestCommonSubsequence(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    return dp[m][n]

# Printing LCS
def print_lcs(text1, text2):
    m, n = len(text1), len(text2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if text1[i-1] == text2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    # Backtrack to find LCS
    lcs = []
    i, j = m, n
    while i > 0 and j > 0:
        if text1[i-1] == text2[j-1]:
            lcs.append(text1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    
    return ''.join(lcs[::-1])
```

### Shortest Common Supersequence
**Problem**: Find shortest string containing both strings as subsequences.

**Length**: `m + n - LCS(s1, s2)`

```python
def shortestCommonSupersequence(str1, str2):
    m, n = len(str1), len(str2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Fill LCS table
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if str1[i-1] == str2[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    
    # Build SCS
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if str1[i-1] == str2[j-1]:
            result.append(str1[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            result.append(str1[i-1])
            i -= 1
        else:
            result.append(str2[j-1])
            j -= 1
    
    # Add remaining characters
    while i > 0:
        result.append(str1[i-1])
        i -= 1
    while j > 0:
        result.append(str2[j-1])
        j -= 1
    
    return ''.join(result[::-1])
```

### Minimum Insertions/Deletions to Convert String
**Problem**: Convert s1 to s2 using insertions/deletions.

**Solution**:
- Deletions = m - LCS
- Insertions = n - LCS

```python
def minDistance(word1, word2):
    lcs_length = longestCommonSubsequence(word1, word2)
    deletions = len(word1) - lcs_length
    insertions = len(word2) - lcs_length
    return deletions + insertions
```

---

## <a name="pattern-5"></a>6. Pattern 5: Longest Increasing Subsequence (LIS) Family

### Longest Increasing Subsequence (O(n²))
**Problem**: Find length of longest strictly increasing subsequence.

**State**: `dp[i]` = length of LIS ending at index i

**Recurrence**: `dp[i] = max(dp[j] + 1) for all j < i where nums[j] < nums[i]`

```python
def lengthOfLIS(nums):
    if not nums:
        return 0
    
    n = len(nums)
    dp = [1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                dp[i] = max(dp[i], dp[j] + 1)
    
    return max(dp)

# Printing LIS
def print_lis(nums):
    n = len(nums)
    dp = [1] * n
    parent = [-1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i] and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j
    
    # Find max length and its index
    max_length = max(dp)
    max_idx = dp.index(max_length)
    
    # Backtrack
    lis = []
    idx = max_idx
    while idx != -1:
        lis.append(nums[idx])
        idx = parent[idx]
    
    return lis[::-1]
```

### LIS (O(n log n)) - Binary Search + DP
**Key Insight**: Maintain array of smallest tail elements for each length.

```python
def lengthOfLIS_optimized(nums):
    from bisect import bisect_left
    
    tails = []
    
    for num in nums:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    
    return len(tails)
```

**Visualization**:
```
nums = [10, 9, 2, 5, 3, 7, 101, 18]

Step by step:
10:      tails = [10]
9:       tails = [9]           (replace 10)
2:       tails = [2]           (replace 9)
5:       tails = [2, 5]        (extend)
3:       tails = [2, 3]        (replace 5)
7:       tails = [2, 3, 7]     (extend)
101:     tails = [2, 3, 7, 101] (extend)
18:      tails = [2, 3, 7, 18] (replace 101)

Length = 4
```

### Longest Divisible Subset
**Problem**: Find largest subset where every pair (a,b) satisfies a%b==0 or b%a==0.

```python
def largestDivisibleSubset(nums):
    if not nums:
        return []
    
    nums.sort()
    n = len(nums)
    dp = [1] * n
    parent = [-1] * n
    
    for i in range(1, n):
        for j in range(i):
            if nums[i] % nums[j] == 0 and dp[j] + 1 > dp[i]:
                dp[i] = dp[j] + 1
                parent[i] = j
    
    # Find max length
    max_idx = dp.index(max(dp))
    
    # Backtrack
    result = []
    idx = max_idx
    while idx != -1:
        result.append(nums[idx])
        idx = parent[idx]
    
    return result[::-1]
```

### Russian Doll Envelopes
**Problem**: Envelope (w,h) fits in (w',h') if w<w' and h<h'. Max nesting?

**Solution**: Sort by width ascending, height descending. Find LIS on heights.

```python
def maxEnvelopes(envelopes):
    from bisect import bisect_left
    
    # Sort: width ascending, height descending
    envelopes.sort(key=lambda x: (x[0], -x[1]))
    
    # LIS on heights
    tails = []
    for _, h in envelopes:
        pos = bisect_left(tails, h)
        if pos == len(tails):
            tails.append(h)
        else:
            tails[pos] = h
    
    return len(tails)
```

### Number of LIS
**Problem**: Count number of distinct LIS.

```python
def findNumberOfLIS(nums):
    n = len(nums)
    dp = [1] * n     # length of LIS ending at i
    count = [1] * n  # number of LIS ending at i
    
    for i in range(1, n):
        for j in range(i):
            if nums[j] < nums[i]:
                if dp[j] + 1 > dp[i]:
                    dp[i] = dp[j] + 1
                    count[i] = count[j]
                elif dp[j] + 1 == dp[i]:
                    count[i] += count[j]
    
    max_length = max(dp)
    return sum(count[i] for i in range(n) if dp[i] == max_length)
```

---

## <a name="pattern-6"></a>7. Pattern 6: Palindrome Problems

### Longest Palindromic Subsequence
**Problem**: Find length of longest palindromic subsequence.

**Insight**: LPS(s) = LCS(s, reverse(s))

```python
def longestPalindromeSubseq(s):
    n = len(s)
    dp = [[0] * n for _ in range(n)]
    
    # Every single character is a palindrome
    for i in range(n):
        dp[i][i] = 1
    
    # Build table for substrings of length 2 to n
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i+1][j-1] + 2
            else:
                dp[i][j] = max(dp[i+1][j], dp[i][j-1])
    
    return dp[0][n-1]
```

### Longest Palindromic Substring
**Problem**: Find longest palindromic substring.

**Method 1: Expand Around Center O(n²)**
```python
def longestPalindrome_expand(s):
    def expand(left, right):
        while left >= 0 and right < len(s) and s[left] == s[right]:
            left -= 1
            right += 1
        return right - left - 1
    
    start = end = 0
    for i in range(len(s)):
        len1 = expand(i, i)      # odd length
        len2 = expand(i, i + 1)  # even length
        max_len = max(len1, len2)
        
        if max_len > end - start:
            start = i - (max_len - 1) // 2
            end = i + max_len // 2
    
    return s[start:end+1]
```

**Method 2: DP O(n²)**
```python
def longestPalindrome_dp(s):
    n = len(s)
    dp = [[False] * n for _ in range(n)]
    start = 0
    max_length = 1
    
    # Single characters
    for i in range(n):
        dp[i][i] = True
    
    # Two characters
    for i in range(n - 1):
        if s[i] == s[i + 1]:
            dp[i][i + 1] = True
            start = i
            max_length = 2
    
    # Longer substrings
    for length in range(3, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j] and dp[i + 1][j - 1]:
                dp[i][j] = True
                start = i
                max_length = length
    
    return s[start:start + max_length]
```

### Palindrome Partitioning II
**Problem**: Minimum cuts to partition string into palindromes.

```python
def minCut(s):
    n = len(s)
    
    # Precompute palindrome table
    is_palindrome = [[False] * n for _ in range(n)]
    for i in range(n):
        is_palindrome[i][i] = True
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                is_palindrome[i][j] = (length == 2) or is_palindrome[i + 1][j - 1]
    
    # DP for minimum cuts
    dp = [float('inf')] * n
    for i in range(n):
        if is_palindrome[0][i]:
            dp[i] = 0
        else:
            for j in range(i):
                if is_palindrome[j + 1][i]:
                    dp[i] = min(dp[i], dp[j] + 1)
    
    return dp[n - 1]
```

### Count Palindromic Substrings
**Problem**: Count all palindromic substrings.

```python
def countSubstrings(s):
    def expand(left, right):
        count = 0
        while left >= 0 and right < len(s) and s[left] == s[right]:
            count += 1
            left -= 1
            right += 1
        return count
    
    total = 0
    for i in range(len(s)):
        total += expand(i, i)      # odd length
        total += expand(i, i + 1)  # even length
    
    return total
```

---

## <a name="pattern-7"></a>8. Pattern 7: String Matching & Edit Distance

### Edit Distance (Levenshtein Distance)
**Problem**: Minimum operations (insert, delete, replace) to convert s1 to s2.

**State**: `dp[i][j]` = min operations to convert s1[0..i-1] to s2[0..j-1]

**Recurrence**:
```
if s1[i-1] == s2[j-1]:
    dp[i][j] = dp[i-1][j-1]
else:
    dp[i][j] = 1 + min(
        dp[i-1][j],    // delete
        dp[i][j-1],    // insert
        dp[i-1][j-1]   // replace
    )
```

```python
def minDistance(word1, word2):
    m, n = len(word1), len(word2)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Base cases
    for i in range(m + 1):
        dp[i][0] = i
    for j in range(n + 1):
        dp[0][j] = j
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if word1[i-1] == word2[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(
                    dp[i-1][j],    # delete
                    dp[i][j-1],    # insert
                    dp[i-1][j-1]   # replace
                )
    
    return dp[m][n]
```

### Wildcard Matching
**Problem**: Match string with pattern containing '?' and '*'.
- '?' matches any single character
- '*' matches any sequence (including empty)

```python
def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # Handle leading '*'
    for j in range(1, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-1]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                dp[i][j] = dp[i-1][j] or dp[i][j-1]
            elif p[j-1] == '?' or s[i-1] == p[j-1]:
                dp[i][j] = dp[i-1][j-1]
    
    return dp[m][n]
```

### Regular Expression Matching
**Problem**: Match string with pattern containing '.' and '*'.
- '.' matches any single character
- '*' matches zero or more of the preceding element

```python
def isMatch(s, p):
    m, n = len(s), len(p)
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # Handle patterns like a*, a*b*, a*b*c*
    for j in range(2, n + 1):
        if p[j-1] == '*':
            dp[0][j] = dp[0][j-2]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if p[j-1] == '*':
                # Match zero occurrences
                dp[i][j] = dp[i][j-2]
                # Match one or more occurrences
                if p[j-2] == '.' or p[j-2] == s[i-1]:
                    dp[i][j] = dp[i][j] or dp[i-1][j]
            elif p[j-1] == '.' or p[j-1] == s[i-1]:
                dp[i][j] = dp[i-1][j-1]
    
    return dp[m][n]
```

### Distinct Subsequences
**Problem**: Count distinct subsequences of s that equal t.

```python
def numDistinct(s, t):
    m, n = len(s), len(t)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    
    # Empty string is subsequence of any string
    for i in range(m + 1):
        dp[i][0] = 1
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if s[i-1] == t[j-1]:
                dp[i][j] = dp[i-1][j-1] + dp[i-1][j]
            else:
                dp[i][j] = dp[i-1][j]
    
    return dp[m][n]
```

### Interleaving String
**Problem**: Check if s3 is interleaving of s1 and s2.

```python
def isInterleave(s1, s2, s3):
    m, n, l = len(s1), len(s2), len(s3)
    
    if m + n != l:
        return False
    
    dp = [[False] * (n + 1) for _ in range(m + 1)]
    dp[0][0] = True
    
    # First row
    for j in range(1, n + 1):
        dp[0][j] = dp[0][j-1] and s2[j-1] == s3[j-1]
    
    # First column
    for i in range(1, m + 1):
        dp[i][0] = dp[i-1][0] and s1[i-1] == s3[i-1]
    
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            dp[i][j] = (dp[i-1][j] and s1[i-1] == s3[i+j-1]) or \
                       (dp[i][j-1] and s2[j-1] == s3[i+j-1])
    
    return dp[m][n]
```

---

## <a name="pattern-8"></a>9. Pattern 8: Partition Problems

### Word Break
**Problem**: Check if string can be segmented into dictionary words.

```python
def wordBreak(s, wordDict):
    word_set = set(wordDict)
    n = len(s)
    dp = [False] * (n + 1)
    dp[0] = True
    
    for i in range(1, n + 1):
        for j in range(i):
            if dp[j] and s[j:i] in word_set:
                dp[i] = True
                break
    
    return dp[n]
```

### Word Break II (Print All Solutions)
**Problem**: Return all possible segmentations.

```python
def wordBreak(s, wordDict):
    word_set = set(wordDict)
    memo = {}
    
    def backtrack(start):
        if start in memo:
            return memo[start]
        
        if start == len(s):
            return [[]]
        
        result = []
        for end in range(start + 1, len(s) + 1):
            word = s[start:end]
            if word in word_set:
                for rest in backtrack(end):
                    result.append([word] + rest)
        
        memo[start] = result
        return result
    
    return [' '.join(words) for words in backtrack(0)]
```

### Palindrome Partitioning (All Solutions)
**Problem**: Partition string so every substring is palindrome.

```python
def partition(s):
    n = len(s)
    
    # Precompute palindromes
    is_palindrome = [[False] * n for _ in range(n)]
    for i in range(n):
        is_palindrome[i][i] = True
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                is_palindrome[i][j] = (length == 2) or is_palindrome[i+1][j-1]
    
    def backtrack(start):
        if start == n:
            return [[]]
        
        result = []
        for end in range(start, n):
            if is_palindrome[start][end]:
                for rest in backtrack(end + 1):
                    result.append([s[start:end+1]] + rest)
        
        return result
    
    return backtrack(0)
```

---

## <a name="pattern-9"></a>10. Pattern 9: DP on Trees

### Binary Tree Maximum Path Sum
**Problem**: Find maximum path sum in binary tree. Path can start/end anywhere.

```python
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def maxPathSum(root):
    max_sum = float('-inf')
    
    def dfs(node):
        nonlocal max_sum
        if not node:
            return 0
        
        # Max gain from left and right (0 if negative)
        left_gain = max(dfs(node.left), 0)
        right_gain = max(dfs(node.right), 0)
        
        # Path through current node
        path_sum = node.val + left_gain + right_gain
        max_sum = max(max_sum, path_sum)
        
        # Return max gain if continuing from this node
        return node.val + max(left_gain, right_gain)
    
    dfs(root)
    return max_sum
```

### House Robber III
**Problem**: Houses arranged in binary tree. Can't rob adjacent houses.

```python
def rob(root):
    def dfs(node):
        if not node:
            return (0, 0)  # (rob, not_rob)
        
        left_rob, left_not = dfs(node.left)
        right_rob, right_not = dfs(node.right)
        
        # If rob current, can't rob children
        rob = node.val + left_not + right_not
        
        # If not rob current, take max from children
        not_rob = max(left_rob, left_not) + max(right_rob, right_not)
        
        return (rob, not_rob)
    
    return max(dfs(root))
```

### Diameter of Binary Tree
**Problem**: Length of longest path between any two nodes.

```python
def diameterOfBinaryTree(root):
    diameter = 0
    
    def depth(node):
        nonlocal diameter
        if not node:
            return 0
        
        left = depth(node.left)
        right = depth(node.right)
        
        diameter = max(diameter, left + right)
        return 1 + max(left, right)
    
    depth(root)
    return diameter
```

### Longest Univalue Path
**Problem**: Longest path where all nodes have same value.

```python
def longestUnivaluePath(root):
    max_path = 0
    
    def dfs(node):
        nonlocal max_path
        if not node:
            return 0
        
        left = dfs(node.left)
        right = dfs(node.right)
        
        left_path = right_path = 0
        if node.left and node.left.val == node.val:
            left_path = left + 1
        if node.right and node.right.val == node.val:
            right_path = right + 1
        
        max_path = max(max_path, left_path + right_path)
        return max(left_path, right_path)
    
    dfs(root)
    return max_path
```

---

## <a name="pattern-10"></a>11. Pattern 10: DP with Bitmasks

### Traveling Salesman Problem
**Problem**: Visit all cities exactly once, return to start. Minimize cost.

**State**: `dp[mask][i]` = min cost to visit cities in mask, ending at city i

```python
def tsp(dist):
    n = len(dist)
    dp = [[float('inf')] * n for _ in range(1 << n)]
    dp[1][0] = 0  # Start at city 0
    
    for mask in range(1 << n):
        for last in range(n):
            if not (mask & (1 << last)):
                continue
            
            for next in range(n):
                if mask & (1 << next):
                    continue
                
                new_mask = mask | (1 << next)
                dp[new_mask][next] = min(
                    dp[new_mask][next],
                    dp[mask][last] + dist[last][next]
                )
    
    # Return to start
    return min(dp[(1 << n) - 1][i] + dist[i][0] for i in range(1, n))
```

### Assignment Problem (Hungarian Algorithm with DP)
**Problem**: Assign n tasks to n people to minimize cost.

```python
def assignment_problem(cost):
    n = len(cost)
    dp = [float('inf')] * (1 << n)
    dp[0] = 0
    
    for mask in range(1 << n):
        person = bin(mask).count('1')
        if person >= n:
            continue
        
        for task in range(n):
            if not (mask & (1 << task)):
                new_mask = mask | (1 << task)
                dp[new_mask] = min(dp[new_mask], 
                                   dp[mask] + cost[person][task])
    
    return dp[(1 << n) - 1]
```

### Partition into Equal Sum Subsets
**Problem**: Partition array into k subsets with equal sum.

```python
def canPartitionKSubsets(nums, k):
    total = sum(nums)
    if total % k:
        return False
    
    target = total // k
    nums.sort(reverse=True)
    n = len(nums)
    dp = [-1] * (1 << n)
    dp[0] = 0
    
    for mask in range(1 << n):
        if dp[mask] == -1:
            continue
        
        for i in range(n):
            if mask & (1 << i):
                continue
            
            new_mask = mask | (1 << i)
            remainder = dp[mask] + nums[i]
            
            if remainder <= target:
                dp[new_mask] = max(dp[new_mask], remainder % target)
    
    return dp[(1 << n) - 1] == 0
```

### Maximum Students Taking Exam
**Problem**: Place students in seats such that no two adjacent students can see each other's paper.

```python
def maxStudents(seats):
    m, n = len(seats), len(seats[0])
    
    def valid(mask, row):
        # Check consecutive seats and broken seats
        for i in range(n):
            if mask & (1 << i):
                if seats[row][i] == '#':
                    return False
                if i > 0 and (mask & (1 << (i-1))):
                    return False
        return True
    
    def count_bits(mask):
        return bin(mask).count('1')
    
    dp = [[-1] * (1 << n) for _ in range(m)]
    
    def solve(row, prev_mask):
        if row == m:
            return 0
        
        if dp[row][prev_mask] != -1:
            return dp[row][prev_mask]
        
        max_students = 0
        for mask in range(1 << n):
            if not valid(mask, row):
                continue
            
            # Check diagonal conflicts with previous row
            conflict = False
            for i in range(n):
                if mask & (1 << i):
                    if i > 0 and (prev_mask & (1 << (i-1))):
                        conflict = True
                        break
                    if i < n-1 and (prev_mask & (1 << (i+1))):
                        conflict = True
                        break
            
            if not conflict:
                students = count_bits(mask) + solve(row + 1, mask)
                max_students = max(max_students, students)
        
        dp[row][prev_mask] = max_students
        return max_students
    
    return solve(0, 0)
```

---

## <a name="pattern-11"></a>12. Pattern 11: Digit DP

### Count Numbers with Unique Digits
**Problem**: Count n-digit numbers with all unique digits.

```python
def countNumbersWithUniqueDigits(n):
    if n == 0:
        return 1
    
    result = 10  # For n=1
    unique_digits = 9
    available = 9
    
    for i in range(2, n + 1):
        unique_digits *= available
        result += unique_digits
        available -= 1
    
    return result
```

### Numbers At Most N Given Digit Set
**Problem**: Count numbers ≤ N that can be formed from given digit set.

```python
def atMostNGivenDigitSet(digits, n):
    s = str(n)
    k = len(s)
    d = len(digits)
    
    # Count numbers with fewer digits
    result = sum(d ** i for i in range(1, k))
    
    # Count k-digit numbers
    for i in range(k):
        has_smaller = False
        for digit in digits:
            if digit < s[i]:
                result += d ** (k - i - 1)
                has_smaller = True
            elif digit == s[i]:
                continue
            else:
                break
        
        # If no digit equals s[i], can't continue
        if s[i] not in digits:
            break
        
        # If reached last digit and all matched
        if i == k - 1:
            result += 1
    
    return result
```

### Count of Numbers with Sum of Digits Equal to Target
**Problem**: Count numbers with digit sum equal to target.

```python
def count_digit_sum(n, target):
    s = str(n)
    
    @cache
    def dp(pos, sum_val, tight):
        if pos == len(s):
            return 1 if sum_val == target else 0
        
        limit = int(s[pos]) if tight else 9
        result = 0
        
        for digit in range(0, limit + 1):
            if sum_val + digit <= target:
                result += dp(pos + 1, 
                           sum_val + digit, 
                           tight and (digit == limit))
        
        return result
    
    return dp(0, 0, True)
```

---

## <a name="pattern-12"></a>13. Pattern 12: Matrix Chain Multiplication

### Matrix Chain Multiplication (Classic)
**Problem**: Multiply matrices with minimum scalar multiplications.

**State**: `dp[i][j]` = min operations to multiply matrices i to j

**Recurrence**: `dp[i][j] = min(dp[i][k] + dp[k+1][j] + cost) for k in [i,j)`

```python
def matrixChainOrder(dims):
    n = len(dims) - 1  # Number of matrices
    dp = [[float('inf')] * n for _ in range(n)]
    
    # Single matrix has 0 cost
    for i in range(n):
        dp[i][i] = 0
    
    # Chain length 2 to n
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(i, j):
                cost = (dp[i][k] + dp[k+1][j] + 
                       dims[i] * dims[k+1] * dims[j+1])
                dp[i][j] = min(dp[i][j], cost)
    
    return dp[0][n-1]
```

### Burst Balloons
**Problem**: Burst balloons to maximize coins. Bursting balloon i gives coins[i-1] * coins[i] * coins[i+1].

```python
def maxCoins(nums):
    # Add boundary balloons with value 1
    nums = [1] + nums + [1]
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    
    for length in range(2, n):
        for left in range(n - length):
            right = left + length
            for i in range(left + 1, right):
                coins = nums[left] * nums[i] * nums[right]
                coins += dp[left][i] + dp[i][right]
                dp[left][right] = max(dp[left][right], coins)
    
    return dp[0][n-1]
```

### Minimum Cost to Merge Stones
**Problem**: Merge stones into k piles, minimize cost.

```python
def mergeStones(stones, k):
    n = len(stones)
    if (n - 1) % (k - 1):
        return -1
    
    prefix = [0]
    for stone in stones:
        prefix.append(prefix[-1] + stone)
    
    dp = [[float('inf')] * n for _ in range(n)]
    
    for i in range(n):
        dp[i][i] = 0
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for mid in range(i, j, k - 1):
                dp[i][j] = min(dp[i][j], dp[i][mid] + dp[mid+1][j])
            
            if (j - i) % (k - 1) == 0:
                dp[i][j] += prefix[j+1] - prefix[i]
    
    return dp[0][n-1]
```

### Boolean Parenthesization
**Problem**: Count ways to parenthesize boolean expression to get True.

```python
def countParenth(expr):
    n = len(expr)
    dpTrue = [[0] * n for _ in range(n)]
    dpFalse = [[0] * n for _ in range(n)]
    
    # Initialize for operands
    for i in range(0, n, 2):
        if expr[i] == 'T':
            dpTrue[i][i] = 1
        else:
            dpFalse[i][i] = 1
    
    # Fill for subexpressions
    for length in range(3, n + 1, 2):
        for i in range(0, n - length + 1, 2):
            j = i + length - 1
            for k in range(i + 1, j, 2):
                operator = expr[k]
                
                tl = dpTrue[i][k-1]
                fl = dpFalse[i][k-1]
                tr = dpTrue[k+1][j]
                fr = dpFalse[k+1][j]
                
                if operator == '&':
                    dpTrue[i][j] += tl * tr
                    dpFalse[i][j] += tl * fr + fl * tr + fl * fr
                elif operator == '|':
                    dpTrue[i][j] += tl * tr + tl * fr + fl * tr
                    dpFalse[i][j] += fl * fr
                else:  # XOR
                    dpTrue[i][j] += tl * fr + fl * tr
                    dpFalse[i][j] += tl * tr + fl * fr
    
    return dpTrue[0][n-1]
```

---

## <a name="pattern-13"></a>14. Pattern 13: Game Theory DP

### Stone Game / Minimax
**Problem**: Two players pick from ends of array. Maximize score difference.

```python
def stoneGame(piles):
    n = len(piles)
    dp = [[0] * n for _ in range(n)]
    
    # Base case: single pile
    for i in range(n):
        dp[i][i] = piles[i]
    
    # Fill for increasing lengths
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            # Take left or right, opponent plays optimally
            dp[i][j] = max(
                piles[i] - dp[i+1][j],
                piles[j] - dp[i][j-1]
            )
    
    return dp[0][n-1] > 0
```

### Predict the Winner
**Problem**: Determine if Player 1 can win with optimal play.

```python
def PredictTheWinner(nums):
    n = len(nums)
    dp = [[0] * n for _ in range(n)]
    
    for i in range(n):
        dp[i][i] = nums[i]
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = max(
                nums[i] - dp[i+1][j],
                nums[j] - dp[i][j-1]
            )
    
    return dp[0][n-1] >= 0
```

### Nim Game / Grundy Numbers
**Problem**: Two players remove 1-3 stones. Last to move wins.

```python
def canWinNim(n):
    # Losing positions: 4, 8, 12, ... (multiples of 4)
    return n % 4 != 0

# General Nim with Grundy numbers
def calculate_grundy(n, moves):
    grundy = [0] * (n + 1)
    
    for i in range(1, n + 1):
        reachable = set()
        for move in moves:
            if i >= move:
                reachable.add(grundy[i - move])
        
        # MEX (minimum excludant)
        mex = 0
        while mex in reachable:
            mex += 1
        grundy[i] = mex
    
    return grundy[n] != 0  # Non-zero means current player wins
```

---

## <a name="pattern-14"></a>15. Pattern 14: Probability DP

### Knight Probability in Chessboard
**Problem**: Knight makes k moves on n×n board. Probability it stays on board?

```python
def knightProbability(n, k, row, column):
    moves = [(-2,-1),(-2,1),(-1,-2),(-1,2),
             (1,-2),(1,2),(2,-1),(2,1)]
    
    dp = [[0] * n for _ in range(n)]
    dp[row][column] = 1
    
    for _ in range(k):
        new_dp = [[0] * n for _ in range(n)]
        for r in range(n):
            for c in range(n):
                for dr, dc in moves:
                    nr, nc = r + dr, c + dc
                    if 0 <= nr < n and 0 <= nc < n:
                        new_dp[nr][nc] += dp[r][c] / 8
        dp = new_dp
    
    return sum(sum(row) for row in dp)
```

### Dice Roll Simulation with Target
**Problem**: Roll die k times to get sum n. Count ways.

```python
def numRollsToTarget(n, k, target):
    MOD = 10**9 + 7
    dp = [[0] * (target + 1) for _ in range(n + 1)]
    dp[0][0] = 1
    
    for i in range(1, n + 1):
        for j in range(1, target + 1):
            for face in range(1, k + 1):
                if j >= face:
                    dp[i][j] = (dp[i][j] + dp[i-1][j-face]) % MOD
    
    return dp[n][target]
```

### Soup Servings
**Problem**: Two soups A and B. Probability A empties first.

```python
def soupServings(n):
    if n > 4800:
        return 1.0
    
    memo = {}
    
    def dp(a, b):
        if a <= 0 and b <= 0:
            return 0.5
        if a <= 0:
            return 1.0
        if b <= 0:
            return 0.0
        
        if (a, b) in memo:
            return memo[(a, b)]
        
        result = 0.25 * (
            dp(a - 100, b) +
            dp(a - 75, b - 25) +
            dp(a - 50, b - 50) +
            dp(a - 25, b - 75)
        )
        
        memo[(a, b)] = result
        return result
    
    return dp(n, n)
```

---

## <a name="pattern-15"></a>16. Pattern 15: State Machine DP

### Best Time to Buy and Sell Stock with Cooldown
**Problem**: Buy/sell stock with 1-day cooldown after selling.

**States**: hold, sold, cooldown

```python
def maxProfit(prices):
    if not prices:
        return 0
    
    n = len(prices)
    hold = [0] * n
    sold = [0] * n
    rest = [0] * n
    
    hold[0] = -prices[0]
    
    for i in range(1, n):
        hold[i] = max(hold[i-1], rest[i-1] - prices[i])
        sold[i] = hold[i-1] + prices[i]
        rest[i] = max(rest[i-1], sold[i-1])
    
    return max(sold[-1], rest[-1])

# Space optimized
def maxProfit_optimized(prices):
    sold = rest = 0
    hold = float('-inf')
    
    for price in prices:
        prev_sold = sold
        sold = hold + price
        hold = max(hold, rest - price)
        rest = max(rest, prev_sold)
    
    return max(sold, rest)
```

### Best Time to Buy and Sell Stock with Transaction Fee
**Problem**: Pay fee per transaction.

```python
def maxProfit(prices, fee):
    cash = 0  # Max profit without stock
    hold = -prices[0]  # Max profit with stock
    
    for price in prices[1:]:
        cash = max(cash, hold + price - fee)
        hold = max(hold, cash - price)
    
    return cash
```

### Best Time to Buy and Sell Stock IV (k transactions)
**Problem**: At most k transactions.

```python
def maxProfit(k, prices):
    if not prices:
        return 0
    
    n = len(prices)
    if k >= n // 2:
        # Unlimited transactions
        return sum(max(0, prices[i] - prices[i-1]) 
                  for i in range(1, n))
    
    buy = [float('-inf')] * (k + 1)
    sell = [0] * (k + 1)
    
    for price in prices:
        for i in range(k, 0, -1):
            sell[i] = max(sell[i], buy[i] + price)
            buy[i] = max(buy[i], sell[i-1] - price)
    
    return sell[k]
```

---

## <a name="optimizations"></a>17. Advanced Optimization Techniques

### 1. Space Optimization

**Rolling Array**: Keep only necessary rows.
```python
# From O(m*n) to O(n)
def optimized_2d_to_1d(grid):
    m, n = len(grid), len(grid[0])
    dp = [0] * n
    dp[0] = grid[0][0]
    
    for j in range(1, n):
        dp[j] = dp[j-1] + grid[0][j]
    
    for i in range(1, m):
        dp[0] += grid[i][0]
        for j in range(1, n):
            dp[j] = min(dp[j], dp[j-1]) + grid[i][j]
    
    return dp[n-1]
```

### 2. Monotonic Queue/Stack Optimization

**Example: Sliding Window Maximum**
```python
from collections import deque

def maxSlidingWindow(nums, k):
    dq = deque()
    result = []
    
    for i, num in enumerate(nums):
        # Remove out of window
        while dq and dq[0] < i - k + 1:
            dq.popleft()
        
        # Remove smaller elements
        while dq and nums[dq[-1]] < num:
            dq.pop()
        
        dq.append(i)
        
        if i >= k - 1:
            result.append(nums[dq[0]])
    
    return result
```

### 3. Convex Hull Trick (CHT)

**For**: `dp[i] = min(dp[j] + cost(j, i))` with special structure.

```python
# Example: USACO Commando problem
def convex_hull_trick(a, b, c, prefixes):
    n = len(prefixes) - 1
    dp = [0] * (n + 1)
    
    class Line:
        def __init__(self, m, c):
            self.m, self.c = m, c
        
        def eval(self, x):
            return self.m * x + self.c
        
        def intersect(self, other):
            return (other.c - self.c) / (self.m - other.m)
    
    hull = []
    ptr = 0
    
    for i in range(1, n + 1):
        x = prefixes[i]
        
        # Query
        while ptr + 1 < len(hull) and \
              hull[ptr].eval(x) >= hull[ptr + 1].eval(x):
            ptr += 1
        
        if hull:
            dp[i] = hull[ptr].eval(x) + a * x * x + b * x + c
        
        # Insert new line
        new_line = Line(-2 * a * prefixes[i], 
                       dp[i] + a * prefixes[i] ** 2 - 
                       b * prefixes[i])
        
        while len(hull) >= 2:
            if hull[-1].intersect(new_line) <= \
               hull[-2].intersect(hull[-1]):
                hull.pop()
                if ptr >= len(hull):
                    ptr = len(hull) - 1
            else:
                break
        
        hull.append(new_line)
    
    return dp[n]
```

### 4. Divide and Conquer Optimization

**For**: `dp[i][j] = min(dp[i-1][k] + cost(k, j))` where optimal k is monotonic.

```python
def divide_and_conquer_dp(cost, n, k):
    dp = [[float('inf')] * n for _ in range(k + 1)]
    dp[0][0] = 0
    
    def solve(t, l, r, opt_l, opt_r):
        if l > r:
            return
        
        mid = (l + r) // 2
        best = -1
        
        for k in range(opt_l, min(mid, opt_r) + 1):
            val = dp[t-1][k] + cost[k][mid]
            if val < dp[t][mid]:
                dp[t][mid] = val
                best = k
        
        solve(t, l, mid - 1, opt_l, best)
        solve(t, mid + 1, r, best, opt_r)
    
    for t in range(1, k + 1):
        solve(t, 0, n - 1, 0, n - 1)
    
    return dp[k][n-1]
```

### 5. Knuth Optimization

**For**: Quadrangle inequality: `cost[a][c] + cost[b][d] ≤ cost[a][d] + cost[b][c]`

Reduces complexity from O(n³) to O(n²).

```python
def knuth_optimization(cost, n):
    dp = [[float('inf')] * n for _ in range(n)]
    opt = [[0] * n for _ in range(n)]
    
    for i in range(n):
        dp[i][i] = 0
        opt[i][i] = i
    
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            for k in range(opt[i][j-1], opt[i+1][j] + 1):
                val = dp[i][k] + dp[k+1][j] + cost[i][j]
                if val < dp[i][j]:
                    dp[i][j] = val
                    opt[i][j] = k
    
    return dp[0][n-1]
```

### 6. Slope Trick

**For**: Convex piecewise linear functions.

```python
import heapq

def slope_trick_example(arr):
    # Maintain two heaps for slopes
    left_heap = []  # max heap
    right_heap = []  # min heap
    
    result = 0
    
    for x in arr:
        heapq.heappush(left_heap, -x)
        heapq.heappush(right_heap, -heapq.heappop(left_heap))
        
        if len(right_heap) > len(left_heap):
            heapq.heappush(left_heap, -heapq.heappop(right_heap))
    
    return result
```

---

## Key Tips for DP Problems

### 1. **Identification**
- Look for: "maximum", "minimum", "count ways", "longest"
- Overlapping subproblems
- Optimal substructure

### 2. **Approach**
1. Start with recursive solution
2. Identify parameters that change (state)
3. Add memoization
4. Convert to tabulation if needed
5. Optimize space

### 3. **Common Patterns Recognition**
- **Strings**: Usually 2D DP with indices
- **Arrays**: Linear or 2D depending on choices
- **Trees**: DFS with return values
- **Choices**: 0/1 patterns, knapsack-like

### 4. **Debugging**
- Print DP table
- Check base cases carefully
- Verify recurrence relation
- Test with small examples

### 5. **Optimization Checklist**
- Can I reduce dimensions? (Rolling array)
- Can I use binary search? (LIS)
- Is there monotonicity? (CHT, D&C)
- Can I use greedy for part? (Kadane's)

---

## Practice Problems by Difficulty

### **Beginner**
1. Climbing Stairs
2. House Robber
3. Maximum Subarray
4. Unique Paths
5. Coin Change

### **Intermediate**
1. Longest Increasing Subsequence
2. Edit Distance
3. Word Break
4. Partition Equal Subset Sum
5. Longest Common Subsequence

### **Advanced**
1. Regular Expression Matching
2. Burst Balloons
3. Traveling Salesman Problem
4. Digit DP Problems
5. Convex Hull Trick Problems

### **Expert**
1. Slope Trick Problems
2. Divide and Conquer DP
3. DP on DAG with large states
4. Game Theory with complex states
5. Multi-dimensional optimization

---

**Remember**: The key to mastering DP is practice! Start with easier problems, understand the pattern, then gradually move to harder ones. Each pattern builds on previous ones.

Happy Coding! 🚀