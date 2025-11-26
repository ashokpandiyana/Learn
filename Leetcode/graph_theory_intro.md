# Chapter 1: Introduction to Graphs

## 1. What are Graphs?

A **graph** is a non-linear data structure consisting of **nodes** (also called vertices) and **edges** (connections between nodes). Graphs are used to represent relationships between objects.

**Mathematical Definition:** A graph G is defined as G = (V, E), where:
- V is a set of vertices
- E is a set of edges connecting pairs of vertices

**Visual Representation:**
```
    A --- B
    |     |
    |     |
    C --- D
```

In this graph:
- V = {A, B, C, D}
- E = {(A,B), (A,C), (B,D), (C,D)}

### Basic Graph Implementation in Python

```python
# Using Adjacency List representation
class Graph:
    def __init__(self):
        self.graph = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []
    
    def add_edge(self, vertex1, vertex2):
        # Add vertices if they don't exist
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        
        # Add edge (undirected graph)
        self.graph[vertex1].append(vertex2)
        self.graph[vertex2].append(vertex1)
    
    def display(self):
        for vertex in self.graph:
            print(f"{vertex} -> {self.graph[vertex]}")

# Example usage
g = Graph()
g.add_edge('A', 'B')
g.add_edge('A', 'C')
g.add_edge('B', 'D')
g.add_edge('C', 'D')
g.display()

# Output:
# A -> ['B', 'C']
# B -> ['A', 'D']
# C -> ['A', 'D']
# D -> ['B', 'C']
```

---

## 2. Real-world Applications of Graphs

Graphs are everywhere in the real world! Here are some compelling applications:

### Social Networks
- **Vertices:** Users
- **Edges:** Friendships/connections
- **Use case:** Friend recommendations, influence analysis, community detection

### Maps & Navigation
- **Vertices:** Locations/intersections
- **Edges:** Roads/paths
- **Use case:** GPS navigation, shortest path, traffic optimization

### Internet & Web
- **Vertices:** Web pages
- **Edges:** Hyperlinks
- **Use case:** PageRank algorithm, web crawling

### Computer Networks
- **Vertices:** Computers/routers
- **Edges:** Network connections
- **Use case:** Routing protocols, network topology

### Recommendation Systems
- **Vertices:** Users and products
- **Edges:** Purchases, ratings
- **Use case:** Amazon, Netflix recommendations

### Biology
- **Vertices:** Proteins, genes
- **Edges:** Interactions
- **Use case:** Protein interaction networks, disease pathways

```python
# Example: Simple Social Network
class SocialNetwork:
    def __init__(self):
        self.network = {}
    
    def add_user(self, user):
        if user not in self.network:
            self.network[user] = []
    
    def add_friendship(self, user1, user2):
        self.add_user(user1)
        self.add_user(user2)
        self.network[user1].append(user2)
        self.network[user2].append(user1)
    
    def get_friends(self, user):
        return self.network.get(user, [])
    
    def mutual_friends(self, user1, user2):
        friends1 = set(self.get_friends(user1))
        friends2 = set(self.get_friends(user2))
        return friends1.intersection(friends2)

# Usage
social = SocialNetwork()
social.add_friendship("Alice", "Bob")
social.add_friendship("Alice", "Charlie")
social.add_friendship("Bob", "Charlie")
social.add_friendship("Bob", "David")

print("Alice's friends:", social.get_friends("Alice"))
print("Mutual friends of Alice and Bob:", social.mutual_friends("Alice", "Bob"))
```

---

## 3. Graph Terminology

### Vertices (Nodes)
The fundamental units of a graph. Each vertex can store data.

### Edges (Links/Arcs)
Connections between vertices. Can be:
- **Undirected:** Connection goes both ways (friendship)
- **Directed:** Connection has a direction (following on Twitter)

### Neighbors (Adjacent Vertices)
Two vertices are neighbors if they are connected by an edge.

```
    A --- B
    |
    C

Neighbors of A: {B, C}
Neighbors of B: {A}
Neighbors of C: {A}
```

### Path
A sequence of vertices where each adjacent pair is connected by an edge.

```
Path from A to D: A -> B -> D
Path length: 2 (number of edges)
```

### Cycle
A path that starts and ends at the same vertex.

```
    A --- B
    |     |
    C --- D

Cycle: A -> B -> D -> C -> A
```

### Connected Graph
A graph where there's a path between every pair of vertices.

### Complete Graph
A graph where every pair of vertices is connected by an edge.

```python
# Graph terminology implementation
class GraphAnalysis:
    def __init__(self, graph):
        self.graph = graph  # Adjacency list
    
    def get_neighbors(self, vertex):
        """Get all neighbors of a vertex"""
        return self.graph.get(vertex, [])
    
    def find_path(self, start, end, path=[]):
        """Find a path between two vertices using DFS"""
        path = path + [start]
        
        if start == end:
            return path
        
        if start not in self.graph:
            return None
        
        for neighbor in self.graph[start]:
            if neighbor not in path:
                new_path = self.find_path(neighbor, end, path)
                if new_path:
                    return new_path
        return None
    
    def is_connected(self):
        """Check if graph is connected"""
        if not self.graph:
            return True
        
        visited = set()
        start = next(iter(self.graph))
        
        def dfs(vertex):
            visited.add(vertex)
            for neighbor in self.graph[vertex]:
                if neighbor not in visited:
                    dfs(neighbor)
        
        dfs(start)
        return len(visited) == len(self.graph)

# Example
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A', 'D'],
    'D': ['B', 'C']
}

analyzer = GraphAnalysis(graph)
print("Neighbors of A:", analyzer.get_neighbors('A'))
print("Path from A to D:", analyzer.find_path('A', 'D'))
print("Is connected:", analyzer.is_connected())
```

---

## 4. Types of Graphs: Directed vs Undirected

### Undirected Graphs
Edges have no direction. If there's an edge between A and B, you can go from A to B and B to A.

**Visual:**
```
    A ---- B
    |      |
    C ---- D
```

**Examples:** Friendships, physical connections, undirected roads

### Directed Graphs (Digraphs)
Edges have direction. An edge from A to B doesn't mean there's an edge from B to A.

**Visual:**
```
    A ---> B
    ^      |
    |      v
    C <--- D
```

**Examples:** Twitter follows, web links, one-way streets, dependencies

```python
# Directed Graph Implementation
class DirectedGraph:
    def __init__(self):
        self.graph = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = []
    
    def add_edge(self, from_vertex, to_vertex):
        """Add directed edge from from_vertex to to_vertex"""
        self.add_vertex(from_vertex)
        self.add_vertex(to_vertex)
        self.graph[from_vertex].append(to_vertex)
    
    def has_path(self, start, end):
        """Check if path exists from start to end"""
        if start == end:
            return True
        
        visited = set()
        stack = [start]
        
        while stack:
            vertex = stack.pop()
            if vertex == end:
                return True
            
            if vertex not in visited:
                visited.add(vertex)
                for neighbor in self.graph.get(vertex, []):
                    if neighbor not in visited:
                        stack.append(neighbor)
        
        return False
    
    def display(self):
        for vertex in self.graph:
            print(f"{vertex} -> {self.graph[vertex]}")

# Undirected Graph Implementation
class UndirectedGraph:
    def __init__(self):
        self.graph = {}
    
    def add_edge(self, vertex1, vertex2):
        """Add undirected edge"""
        if vertex1 not in self.graph:
            self.graph[vertex1] = []
        if vertex2 not in self.graph:
            self.graph[vertex2] = []
        
        self.graph[vertex1].append(vertex2)
        self.graph[vertex2].append(vertex1)

# Example: Task Dependencies (Directed)
tasks = DirectedGraph()
tasks.add_edge("Design", "Development")
tasks.add_edge("Development", "Testing")
tasks.add_edge("Testing", "Deployment")
print("Task Dependencies:")
tasks.display()
print("Can we go from Design to Deployment?", tasks.has_path("Design", "Deployment"))
print("Can we go from Deployment to Design?", tasks.has_path("Deployment", "Design"))
```

---

## 5. Weighted vs Unweighted Graphs

### Unweighted Graphs
Edges have no associated value. All edges are "equal."

```
    A --- B
    |     |
    C --- D
```

**Use case:** Social connections, simple networks

### Weighted Graphs
Edges have associated weights (costs, distances, capacities).

```
    A --5-- B
    |       |
    3       2
    |       |
    C --4-- D
```

**Use case:** Road networks (distances), flight routes (costs), network bandwidth

```python
# Weighted Graph Implementation
class WeightedGraph:
    def __init__(self):
        self.graph = {}
    
    def add_vertex(self, vertex):
        if vertex not in self.graph:
            self.graph[vertex] = {}
    
    def add_edge(self, vertex1, vertex2, weight):
        """Add weighted edge"""
        self.add_vertex(vertex1)
        self.add_vertex(vertex2)
        
        # For undirected graph
        self.graph[vertex1][vertex2] = weight
        self.graph[vertex2][vertex1] = weight
    
    def get_weight(self, vertex1, vertex2):
        """Get weight of edge between two vertices"""
        return self.graph.get(vertex1, {}).get(vertex2, float('inf'))
    
    def display(self):
        for vertex in self.graph:
            print(f"{vertex}:")
            for neighbor, weight in self.graph[vertex].items():
                print(f"  -> {neighbor} (weight: {weight})")

# Example: City Road Network
roads = WeightedGraph()
roads.add_edge("Mumbai", "Pune", 150)
roads.add_edge("Mumbai", "Surat", 280)
roads.add_edge("Pune", "Bangalore", 850)
roads.add_edge("Surat", "Ahmedabad", 260)

print("Road Network:")
roads.display()
print(f"\nDistance Mumbai to Pune: {roads.get_weight('Mumbai', 'Pune')} km")

# Dijkstra's Algorithm for Shortest Path (Weighted Graph)
import heapq

def dijkstra(graph, start):
    """Find shortest paths from start to all vertices"""
    distances = {vertex: float('inf') for vertex in graph.graph}
    distances[start] = 0
    pq = [(0, start)]  # (distance, vertex)
    
    while pq:
        current_dist, current = heapq.heappop(pq)
        
        if current_dist > distances[current]:
            continue
        
        for neighbor, weight in graph.graph[current].items():
            distance = current_dist + weight
            
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                heapq.heappush(pq, (distance, neighbor))
    
    return distances

print("\nShortest distances from Mumbai:")
print(dijkstra(roads, "Mumbai"))
```

---

## 6. Dense vs Sparse Graphs

### Sparse Graphs
Graphs with relatively few edges compared to the maximum possible edges.

```
Maximum edges for n vertices: n(n-1)/2 (undirected)

    A     B
     \   /
      \ /
       C     D

4 vertices, 2 edges (sparse)
Maximum possible: 6 edges
```

**Properties:**
- E << V²
- Common in real-world graphs
- Adjacency list is more efficient

### Dense Graphs
Graphs with many edges, close to the maximum possible.

```
    A --- B
    |\   /|
    | \ / |
    | / \ |
    |/   \|
    C --- D

4 vertices, 6 edges (complete graph - dense)
```

**Properties:**
- E ≈ V²
- Less common in practice
- Adjacency matrix might be more efficient

```python
# Graph Density Analysis
class GraphDensity:
    def __init__(self, vertices, edges, directed=False):
        self.vertices = vertices
        self.edges = edges
        self.directed = directed
    
    def max_edges(self):
        """Calculate maximum possible edges"""
        n = self.vertices
        if self.directed:
            return n * (n - 1)
        else:
            return n * (n - 1) // 2
    
    def density(self):
        """Calculate graph density"""
        max_e = self.max_edges()
        if max_e == 0:
            return 0
        return self.edges / max_e
    
    def classify(self):
        """Classify as sparse or dense"""
        d = self.density()
        if d < 0.3:
            return "Sparse"
        elif d > 0.7:
            return "Dense"
        else:
            return "Medium"

# Examples
print("Social Network (100 users, 500 friendships):")
social = GraphDensity(100, 500, directed=False)
print(f"Density: {social.density():.4f}")
print(f"Classification: {social.classify()}")
print(f"Max possible edges: {social.max_edges()}")

print("\nComplete Graph (10 vertices):")
complete = GraphDensity(10, 45, directed=False)
print(f"Density: {complete.density():.4f}")
print(f"Classification: {complete.classify()}")

# Adjacency Matrix vs List comparison
class GraphRepresentation:
    @staticmethod
    def adjacency_matrix(n, edges):
        """Space: O(V²)"""
        matrix = [[0] * n for _ in range(n)]
        for u, v in edges:
            matrix[u][v] = 1
            matrix[v][u] = 1
        return matrix
    
    @staticmethod
    def adjacency_list(n, edges):
        """Space: O(V + E)"""
        adj_list = {i: [] for i in range(n)}
        for u, v in edges:
            adj_list[u].append(v)
            adj_list[v].append(u)
        return adj_list

# Example
edges = [(0, 1), (0, 2), (1, 3)]
print("\nAdjacency Matrix:")
matrix = GraphRepresentation.adjacency_matrix(4, edges)
for row in matrix:
    print(row)

print("\nAdjacency List:")
adj_list = GraphRepresentation.adjacency_list(4, edges)
for vertex, neighbors in adj_list.items():
    print(f"{vertex}: {neighbors}")
```

---

## 7. Graph Properties: Degree, In-degree, Out-degree

### Degree (Undirected Graphs)
The **degree** of a vertex is the number of edges connected to it.

```
    A --- B --- D
    |     |
    C     E

deg(A) = 2 (connected to B, C)
deg(B) = 3 (connected to A, D, E)
deg(C) = 1 (connected to A)
deg(D) = 1 (connected to B)
deg(E) = 1 (connected to B)
```

**Handshaking Lemma:** The sum of all degrees equals twice the number of edges.
Sum of degrees = 2|E|

### In-degree and Out-degree (Directed Graphs)

**In-degree:** Number of edges coming into a vertex
**Out-degree:** Number of edges going out of a vertex

```
    A ---> B ---> D
    |      ^
    v      |
    C ---> E

in-degree(B) = 2 (from A and E)
out-degree(B) = 1 (to D)

in-degree(E) = 1 (from C)
out-degree(E) = 1 (to B)
```

```python
# Degree Calculation Implementation
class DegreeAnalysis:
    def __init__(self, graph, directed=False):
        self.graph = graph
        self.directed = directed
    
    def degree(self, vertex):
        """Calculate degree for undirected graph"""
        if not self.directed:
            return len(self.graph.get(vertex, []))
        else:
            return self.in_degree(vertex) + self.out_degree(vertex)
    
    def in_degree(self, vertex):
        """Calculate in-degree for directed graph"""
        if not self.directed:
            return self.degree(vertex)
        
        count = 0
        for v in self.graph:
            if vertex in self.graph[v]:
                count += 1
        return count
    
    def out_degree(self, vertex):
        """Calculate out-degree for directed graph"""
        if not self.directed:
            return self.degree(vertex)
        
        return len(self.graph.get(vertex, []))
    
    def all_degrees(self):
        """Calculate degrees for all vertices"""
        degrees = {}
        for vertex in self.graph:
            if self.directed:
                degrees[vertex] = {
                    'in': self.in_degree(vertex),
                    'out': self.out_degree(vertex),
                    'total': self.in_degree(vertex) + self.out_degree(vertex)
                }
            else:
                degrees[vertex] = self.degree(vertex)
        return degrees
    
    def verify_handshaking_lemma(self):
        """Verify handshaking lemma for undirected graph"""
        if self.directed:
            return "Handshaking lemma applies only to undirected graphs"
        
        sum_degrees = sum(self.degree(v) for v in self.graph)
        edge_count = sum(len(neighbors) for neighbors in self.graph.values()) // 2
        
        return {
            'sum_of_degrees': sum_degrees,
            'twice_edges': 2 * edge_count,
            'verified': sum_degrees == 2 * edge_count
        }

# Example: Undirected Graph
print("=== Undirected Graph Analysis ===")
undirected = {
    'A': ['B', 'C'],
    'B': ['A', 'D', 'E'],
    'C': ['A'],
    'D': ['B'],
    'E': ['B']
}

analyzer = DegreeAnalysis(undirected, directed=False)
print("Degrees:", analyzer.all_degrees())
print("Handshaking Lemma:", analyzer.verify_handshaking_lemma())

# Example: Directed Graph (Social Media Follows)
print("\n=== Directed Graph Analysis (Twitter-like) ===")
directed = {
    'Alice': ['Bob', 'Charlie'],      # Alice follows Bob and Charlie
    'Bob': ['Alice', 'David'],        # Bob follows Alice and David
    'Charlie': ['David'],             # Charlie follows David
    'David': []                       # David follows nobody
}

analyzer = DegreeAnalysis(directed, directed=True)
print("Degree Analysis:")
for user, degrees in analyzer.all_degrees().items():
    print(f"{user}: in={degrees['in']}, out={degrees['out']}, total={degrees['total']}")
    print(f"  -> {user} follows {degrees['out']} people")
    print(f"  -> {user} has {degrees['in']} followers")

# Find most influential user (highest in-degree)
degrees = analyzer.all_degrees()
most_followed = max(degrees.items(), key=lambda x: x[1]['in'])
print(f"\nMost followed user: {most_followed[0]} with {most_followed[1]['in']} followers")
```

---

## Complete Example: Building a Graph System

```python
class CompleteGraph:
    """Complete graph implementation with all features"""
    
    def __init__(self, directed=False, weighted=False):
        self.graph = {}
        self.directed = directed
        self.weighted = weighted
    
    def add_edge(self, u, v, weight=1):
        """Add edge with optional weight"""
        if u not in self.graph:
            self.graph[u] = {}
        if v not in self.graph:
            self.graph[v] = {}
        
        if self.weighted:
            self.graph[u][v] = weight
            if not self.directed:
                self.graph[v][u] = weight
        else:
            self.graph[u][v] = 1
            if not self.directed:
                self.graph[v][u] = 1
    
    def get_properties(self):
        """Get all graph properties"""
        num_vertices = len(self.graph)
        num_edges = sum(len(neighbors) for neighbors in self.graph.values())
        if not self.directed:
            num_edges //= 2
        
        max_edges = num_vertices * (num_vertices - 1)
        if not self.directed:
            max_edges //= 2
        
        density = num_edges / max_edges if max_edges > 0 else 0
        
        return {
            'vertices': num_vertices,
            'edges': num_edges,
            'density': density,
            'type': 'Directed' if self.directed else 'Undirected',
            'weighted': self.weighted,
            'classification': 'Dense' if density > 0.7 else 'Sparse' if density < 0.3 else 'Medium'
        }
    
    def visualize(self):
        """Simple text visualization"""
        print(f"\nGraph Visualization ({'Directed' if self.directed else 'Undirected'}):")
        for vertex in sorted(self.graph.keys()):
            if self.weighted:
                edges = [f"{v}({w})" for v, w in self.graph[vertex].items()]
            else:
                edges = list(self.graph[vertex].keys())
            
            arrow = '->' if self.directed else '--'
            print(f"{vertex} {arrow} {', '.join(map(str, edges))}")

# Create and analyze different types of graphs
print("=" * 60)
print("UNDIRECTED WEIGHTED GRAPH - Road Network")
print("=" * 60)
road_network = CompleteGraph(directed=False, weighted=True)
road_network.add_edge('Mumbai', 'Pune', 150)
road_network.add_edge('Mumbai', 'Surat', 280)
road_network.add_edge('Pune', 'Bangalore', 850)
road_network.visualize()
print("\nProperties:", road_network.get_properties())

print("\n" + "=" * 60)
print("DIRECTED UNWEIGHTED GRAPH - Web Pages")
print("=" * 60)
web_graph = CompleteGraph(directed=True, weighted=False)
web_graph.add_edge('HomePage', 'AboutUs')
web_graph.add_edge('HomePage', 'Products')
web_graph.add_edge('Products', 'Product1')
web_graph.add_edge('Products', 'Product2')
web_graph.add_edge('Product1', 'HomePage')
web_graph.visualize()
print("\nProperties:", web_graph.get_properties())
```

---

## Summary

| Concept | Key Points |
|---------|------------|
| **Graph** | Data structure with vertices and edges |
| **Applications** | Social networks, maps, web, recommendations |
| **Directed** | Edges have direction (A→B ≠ B→A) |
| **Undirected** | Edges bidirectional (A-B = B-A) |
| **Weighted** | Edges have associated values |
| **Unweighted** | All edges are equal |
| **Sparse** | Few edges (E << V²) |
| **Dense** | Many edges (E ≈ V²) |
| **Degree** | Number of edges at a vertex |
| **In-degree** | Incoming edges (directed) |
| **Out-degree** | Outgoing edges (directed) |

**Key Formula:** Sum of all degrees = 2 × Number of edges (Handshaking Lemma)

This foundation will help you understand more advanced graph algorithms like DFS, BFS, shortest paths, and minimum spanning trees!