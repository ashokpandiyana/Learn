# Complete Two Pointers Pattern Guide
## From Easy to Advanced

---

## 📚 Table of Contents
1. [Introduction](#introduction)
2. [Pattern 1: Opposite Direction (Collision)](#pattern-1-opposite-direction)
3. [Pattern 2: Same Direction (Fast-Slow)](#pattern-2-same-direction)
4. [Pattern 3: Sliding Window (Fixed Size)](#pattern-3-sliding-window-fixed)
5. [Pattern 4: Sliding Window (Variable Size)](#pattern-4-sliding-window-variable)
6. [Pattern 5: Partition Pattern](#pattern-5-partition)
7. [Pattern 6: Merge Pattern](#pattern-6-merge)
8. [Advanced Patterns & Nuances](#advanced-patterns)

---

## Introduction

**Two Pointers** is a technique that uses two references (pointers/indices) to traverse a data structure, typically an array or string. It reduces time complexity from O(n²) to O(n) in many cases.

**Key Insight**: Instead of nested loops, we use two pointers moving strategically to solve problems efficiently.

---

## Pattern 1: Opposite Direction (Collision)

**Concept**: Two pointers start at opposite ends and move toward each other.

```
[1, 2, 3, 4, 5, 6]
 ↑              ↑
 L              R
```

### Visual Representation
```
Initial:    [1, 2, 3, 4, 5, 6]
             L →         ← R

Step 1:     [1, 2, 3, 4, 5, 6]
                L →   ← R

Step 2:     [1, 2, 3, 4, 5, 6]
                   L R

Condition: L < R (stop when they meet/cross)
```

### When to Use
- Array is **sorted** or you need to **reverse** something
- Looking for **pairs** with specific properties
- **Palindrome** checking

### Example 1: Two Sum II (Sorted Array)

**Problem**: Find two numbers that add up to a target in a sorted array.

```python
def twoSum(numbers, target):
    left, right = 0, len(numbers) - 1
    
    while left < right:
        current_sum = numbers[left] + numbers[right]
        
        if current_sum == target:
            return [left, right]  # Found!
        elif current_sum < target:
            left += 1  # Need larger sum
        else:
            right -= 1  # Need smaller sum
    
    return []  # No solution

# Example: [2, 7, 11, 15], target = 9
# Step 1: 2 + 15 = 17 > 9, right--
# Step 2: 2 + 11 = 13 > 9, right--
# Step 3: 2 + 7 = 9 ✓
```

**Time**: O(n), **Space**: O(1)

### Example 2: Valid Palindrome

```python
def isPalindrome(s):
    left, right = 0, len(s) - 1
    
    while left < right:
        # Skip non-alphanumeric from left
        while left < right and not s[left].isalnum():
            left += 1
        # Skip non-alphanumeric from right
        while left < right and not s[right].isalnum():
            right -= 1
        
        # Compare characters (case-insensitive)
        if s[left].lower() != s[right].lower():
            return False
        
        left += 1
        right -= 1
    
    return True
```

### Example 3: Container With Most Water

```python
def maxArea(height):
    left, right = 0, len(height) - 1
    max_water = 0
    
    while left < right:
        # Water = min(heights) × width
        width = right - left
        water = min(height[left], height[right]) * width
        max_water = max(max_water, water)
        
        # Move pointer at shorter line
        if height[left] < height[right]:
            left += 1
        else:
            right -= 1
    
    return max_water
```

**Key Nuance**: Always move the pointer pointing to the shorter line (can't get more water by moving the taller one).

---

## Pattern 2: Same Direction (Fast-Slow)

**Concept**: Both pointers start at the same end, one moves faster than the other.

```
[1, 2, 3, 4, 5, 6]
 ↑
 S,F (both start here)

[1, 2, 3, 4, 5, 6]
 ↑  ↑
 S  F (fast moves ahead)
```

### When to Use
- **In-place array modification**
- **Removing duplicates**
- **Cycle detection** (linked list)
- Maintaining a **window or condition**

### Example 1: Remove Duplicates from Sorted Array

```python
def removeDuplicates(nums):
    if not nums:
        return 0
    
    slow = 0  # Position for next unique element
    
    for fast in range(1, len(nums)):
        if nums[fast] != nums[slow]:
            slow += 1
            nums[slow] = nums[fast]
    
    return slow + 1

# Visual: [1, 1, 2, 2, 3]
# Initial: [1, 1, 2, 2, 3]
#           S  F
# Step 1:  [1, 1, 2, 2, 3]  (1==1, skip)
#           S     F
# Step 2:  [1, 2, 2, 2, 3]  (2!=1, slow++, copy)
#              S     F
# Step 3:  [1, 2, 2, 2, 3]  (2==2, skip)
#              S        F
# Step 4:  [1, 2, 3, 2, 3]  (3!=2, slow++, copy)
#                 S        F
# Result:  [1, 2, 3, _, _]
```

**Time**: O(n), **Space**: O(1)

### Example 2: Move Zeroes

```python
def moveZeroes(nums):
    slow = 0  # Position for next non-zero
    
    for fast in range(len(nums)):
        if nums[fast] != 0:
            nums[slow], nums[fast] = nums[fast], nums[slow]
            slow += 1

# [0, 1, 0, 3, 12]
# S,F=0: 0==0, skip
# S=0,F=1: 1!=0, swap, [1,0,0,3,12], S=1
# S=1,F=2: 0==0, skip
# S=1,F=3: 3!=0, swap, [1,3,0,0,12], S=2
# S=2,F=4: 12!=0, swap, [1,3,12,0,0], S=3
```

### Example 3: Cycle Detection (Floyd's Algorithm)

```python
def hasCycle(head):
    slow = fast = head
    
    while fast and fast.next:
        slow = slow.next        # Move 1 step
        fast = fast.next.next   # Move 2 steps
        
        if slow == fast:
            return True  # Cycle detected
    
    return False
```

**Visual**:
```
No Cycle:
1 → 2 → 3 → 4 → None
S       F
        S           F (fast reaches end)

With Cycle:
1 → 2 → 3 → 4
    ↑       ↓
    6 ← 5 ←

Eventually slow and fast meet inside the cycle!
```

---

## Pattern 3: Sliding Window (Fixed Size)

**Concept**: Maintain a window of fixed size K and slide it across the array.

```
[1, 2, 3, 4, 5], K=3

Window 1: [1, 2, 3] 4, 5
Window 2:  1 [2, 3, 4] 5
Window 3:  1, 2 [3, 4, 5]
```

### Example: Maximum Average Subarray

```python
def findMaxAverage(nums, k):
    # Initial window sum
    window_sum = sum(nums[:k])
    max_sum = window_sum
    
    # Slide the window
    for i in range(k, len(nums)):
        # Remove left element, add right element
        window_sum = window_sum - nums[i - k] + nums[i]
        max_sum = max(max_sum, window_sum)
    
    return max_sum / k

# Visual: [1, 12, -5, -6, 50, 3], k=4
# Window 1: [1, 12, -5, -6] = 2
# Window 2: [12, -5, -6, 50] = 51  (remove 1, add 50)
# Window 3: [-5, -6, 50, 3] = 42  (remove 12, add 3)
```

**Template**:
```python
def fixed_window(arr, k):
    left = 0
    for right in range(len(arr)):
        # Add arr[right] to window
        
        # If window size exceeds k, shrink from left
        if right - left + 1 > k:
            # Remove arr[left] from window
            left += 1
        
        # If window size equals k, process
        if right - left + 1 == k:
            # Calculate result
            pass
```

---

## Pattern 4: Sliding Window (Variable Size)

**Concept**: Window size changes dynamically based on a condition.

```
[1, 2, 3, 4, 5], target sum ≤ 10

Window: [1, 2, 3] sum=6 ✓
Window: [1, 2, 3, 4] sum=10 ✓
Window: [1, 2, 3, 4, 5] sum=15 ✗ (shrink!)
Window: [2, 3, 4, 5] sum=14 ✗ (shrink!)
...
```

### Example 1: Longest Substring Without Repeating Characters

```python
def lengthOfLongestSubstring(s):
    char_set = set()
    left = 0
    max_length = 0
    
    for right in range(len(s)):
        # Shrink window while duplicate exists
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        
        # Add current character
        char_set.add(s[right])
        max_length = max(max_length, right - left + 1)
    
    return max_length

# "abcabcbb"
# right=0: [a], length=1
# right=1: [ab], length=2
# right=2: [abc], length=3
# right=3: 'a' exists! remove 'a', left=1, [bca], length=3
# right=4: 'b' exists! remove 'b', left=2, [cab], length=3
```

**Time**: O(n), **Space**: O(min(n, alphabet_size))

### Example 2: Minimum Size Subarray Sum

```python
def minSubArrayLen(target, nums):
    left = 0
    current_sum = 0
    min_length = float('inf')
    
    for right in range(len(nums)):
        current_sum += nums[right]
        
        # Shrink window while valid
        while current_sum >= target:
            min_length = min(min_length, right - left + 1)
            current_sum -= nums[left]
            left += 1
    
    return min_length if min_length != float('inf') else 0
```

### Variable Window Template

```python
def variable_window(arr, condition):
    left = 0
    window_state = initialize_state()
    result = initial_result
    
    for right in range(len(arr)):
        # Expand: add arr[right] to window
        update_window_state(arr[right])
        
        # Shrink: while condition is violated
        while not is_valid(window_state):
            remove_from_window(arr[left])
            left += 1
        
        # Update result with current valid window
        result = update_result(result, left, right)
    
    return result
```

---

## Pattern 5: Partition Pattern

**Concept**: Use pointers to partition array into regions (like QuickSort).

```
[3, 1, 4, 2, 5], pivot=3

Goal: [<3] [3] [>3]
      [1,2] [3] [4,5]
```

### Example 1: Sort Colors (Dutch National Flag)

```python
def sortColors(nums):
    # Three regions: [0...low-1]=0, [low...mid-1]=1, [high+1...]=2
    low, mid, high = 0, 0, len(nums) - 1
    
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:  # nums[mid] == 2
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1

# Visual: [2, 0, 2, 1, 1, 0]
# L M           H
# [2,0,2,1,1,0] nums[M]=2, swap with H
#   L M       H
# [0,0,2,1,1,2] nums[M]=0, swap with L, advance both
#     L M   H
# [0,0,2,1,1,2] nums[M]=2, swap with H
#     L M H
# [0,0,1,1,2,2] nums[M]=1, advance M
#     L   M H
# [0,0,1,1,2,2] done
```

### Example 2: Move All Negative Numbers to Left

```python
def moveNegatives(arr):
    left, right = 0, len(arr) - 1
    
    while left <= right:
        if arr[left] < 0:
            left += 1
        elif arr[right] >= 0:
            right -= 1
        else:
            arr[left], arr[right] = arr[right], arr[left]
            left += 1
            right -= 1
```

---

## Pattern 6: Merge Pattern

**Concept**: Merge two sorted sequences using two pointers.

```
arr1: [1, 3, 5]  →  pointer i
arr2: [2, 4, 6]  →  pointer j

Compare arr1[i] with arr2[j], take smaller
```

### Example: Merge Sorted Arrays

```python
def merge(nums1, m, nums2, n):
    # Merge from the end to avoid overwriting
    i, j, k = m - 1, n - 1, m + n - 1
    
    while i >= 0 and j >= 0:
        if nums1[i] > nums2[j]:
            nums1[k] = nums1[i]
            i -= 1
        else:
            nums1[k] = nums2[j]
            j -= 1
        k -= 1
    
    # Copy remaining from nums2 (if any)
    while j >= 0:
        nums1[k] = nums2[j]
        j -= 1
        k -= 1

# nums1 = [1,2,3,0,0,0], m=3
# nums2 = [2,5,6], n=3
#
# Compare from end:
# 3 vs 6: take 6, [1,2,3,0,0,6]
# 3 vs 5: take 5, [1,2,3,0,5,6]
# 3 vs 2: take 3, [1,2,3,3,5,6]
# 2 vs 2: take 2, [1,2,2,3,5,6]
# 1 vs 2: take 2, [1,2,2,3,5,6]
```

**Why from the end?** Merging from the start would overwrite elements in nums1.

---

## Advanced Patterns & Nuances

### 1. Three Pointers

**3Sum Problem**:
```python
def threeSum(nums):
    nums.sort()
    result = []
    
    for i in range(len(nums) - 2):
        # Skip duplicates for first number
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        
        # Two pointers for remaining two numbers
        left, right = i + 1, len(nums) - 1
        target = -nums[i]
        
        while left < right:
            current_sum = nums[left] + nums[right]
            
            if current_sum == target:
                result.append([nums[i], nums[left], nums[right]])
                
                # Skip duplicates
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                
                left += 1
                right -= 1
            elif current_sum < target:
                left += 1
            else:
                right -= 1
    
    return result
```

**Pattern**: Fix one pointer, use two pointers on remaining array.

### 2. Trapping Rain Water

```python
def trap(height):
    if not height:
        return 0
    
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    
    while left < right:
        if left_max < right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    
    return water
```

**Key Insight**: Water at position depends on min(left_max, right_max). Process from the side with smaller max.

### 3. Partition with Multiple Conditions

**Partition into Even/Odd**:
```python
def partition_even_odd(arr):
    even_ptr = 0
    
    for i in range(len(arr)):
        if arr[i] % 2 == 0:
            arr[even_ptr], arr[i] = arr[i], arr[even_ptr]
            even_ptr += 1
    
    return even_ptr  # Boundary between even and odd
```

---

## 🎯 Key Nuances & Pitfalls

### Nuance 1: When to Move Which Pointer

**Opposite Direction**:
- Move the pointer that helps you get closer to the solution
- In Two Sum (sorted): move smaller if sum too small, larger if too big

**Same Direction**:
- Fast pointer always explores
- Slow pointer maintains invariant (unique elements, non-zeros, etc.)

### Nuance 2: Handling Duplicates

```python
# Skip duplicates in sorted array
while i < n and arr[i] == arr[i - 1]:
    i += 1

# Or use set for tracking
seen = set()
```

### Nuance 3: Edge Cases

- Empty array: `if not arr: return result`
- Single element: Check `len(arr) < 2`
- All elements same: Test with `[1, 1, 1, 1]`
- Pointers crossing: Ensure `left <= right` or `left < right` as needed

### Nuance 4: In-Place vs Extra Space

**In-place** (O(1) space):
```python
# Swap elements
arr[i], arr[j] = arr[j], arr[i]
```

**Extra space** (O(n)):
```python
result = []
while ...:
    result.append(...)
```

### Nuance 5: Integer Overflow (in languages like C++/Java)

```cpp
// Wrong: can overflow
int mid = (left + right) / 2;

// Correct:
int mid = left + (right - left) / 2;
```

---

## 📊 Complexity Cheat Sheet

| Pattern | Time | Space | Use Case |
|---------|------|-------|----------|
| Opposite Direction | O(n) | O(1) | Sorted arrays, palindromes |
| Same Direction | O(n) | O(1) | In-place modifications |
| Fixed Window | O(n) | O(1) or O(k) | Subarrays of size k |
| Variable Window | O(n) | O(n) worst | Substring problems |
| Partition | O(n) | O(1) | Sorting, grouping |
| Merge | O(n+m) | O(1) or O(n+m) | Combining sorted arrays |

---

## 🧠 Recognition Patterns

**Use Two Pointers when you see**:
- ✅ "Sorted array" + "find pair/triplet"
- ✅ "In-place" or "O(1) space"
- ✅ "Subarray" or "substring" with conditions
- ✅ "Remove duplicates" or "move elements"
- ✅ "Palindrome" checking
- ✅ "Merge" two sorted structures
- ✅ "Partition" or "segregate" elements

**Don't use Two Pointers when**:
- ❌ Need to track multiple states (use DP)
- ❌ Need all combinations (use backtracking)
- ❌ Complex state dependencies
- ❌ Tree or graph traversal

---

## Practice Problems by Difficulty

### Easy
1. Two Sum II (sorted array)
2. Remove Duplicates from Sorted Array
3. Valid Palindrome
4. Merge Sorted Array
5. Move Zeroes
6. Squares of Sorted Array

### Medium
1. 3Sum
2. Container With Most Water
3. Sort Colors
4. Longest Substring Without Repeating Characters
5. Minimum Size Subarray Sum
6. Find All Anagrams in a String
7. Subarray Product Less Than K

### Hard
1. Trapping Rain Water
2. Minimum Window Substring
3. Substring with Concatenation of All Words
4. Longest Duplicate Substring
5. Median of Two Sorted Arrays

---

## Summary

Two Pointers is about **strategic traversal**:
- **Opposite Direction**: Converge to find pairs/palindromes
- **Same Direction**: Maintain invariants while modifying
- **Sliding Window**: Track subarrays efficiently
- **Partition**: Group elements by properties
- **Merge**: Combine sorted sequences

**Master these templates, practice recognition, and you'll solve 80% of two-pointer problems!** 🚀