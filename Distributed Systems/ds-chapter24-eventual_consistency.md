# Chapter 24: Eventual Consistency Patterns

## 1. CRDTs (Conflict-Free Replicated Data Types)

### Overview
CRDTs are data structures that can be replicated across multiple nodes and updated independently without coordination. They mathematically guarantee that all replicas eventually converge to the same state, regardless of the order in which updates are applied.

### Types of CRDTs

#### State-based CRDTs (CvRDTs)
Replicas send their entire state to each other and merge states using a commutative, associative, and idempotent merge function.

#### Operation-based CRDTs (CmRDTs)
Replicas send operations to each other, which must be commutative (order-independent).

### Common CRDT Types

#### 1. G-Counter (Grow-only Counter)
```python
class GCounter:
    def __init__(self, node_id):
        self.node_id = node_id
        self.counts = {}  # {node_id: count}
    
    def increment(self, amount=1):
        """Increment the counter on this node"""
        if self.node_id not in self.counts:
            self.counts[self.node_id] = 0
        self.counts[self.node_id] += amount
    
    def value(self):
        """Get the total count across all nodes"""
        return sum(self.counts.values())
    
    def merge(self, other):
        """Merge with another G-Counter"""
        merged = GCounter(self.node_id)
        all_nodes = set(self.counts.keys()) | set(other.counts.keys())
        
        for node in all_nodes:
            merged.counts[node] = max(
                self.counts.get(node, 0),
                other.counts.get(node, 0)
            )
        return merged

# Usage
counter1 = GCounter("node1")
counter2 = GCounter("node2")

counter1.increment(5)
counter2.increment(3)

merged = counter1.merge(counter2)
print(f"Total: {merged.value()}")  # Output: 8
```

#### 2. PN-Counter (Positive-Negative Counter)
```python
class PNCounter:
    def __init__(self, node_id):
        self.node_id = node_id
        self.positive = {}  # Increments
        self.negative = {}  # Decrements
    
    def increment(self, amount=1):
        if self.node_id not in self.positive:
            self.positive[self.node_id] = 0
        self.positive[self.node_id] += amount
    
    def decrement(self, amount=1):
        if self.node_id not in self.negative:
            self.negative[self.node_id] = 0
        self.negative[self.node_id] += amount
    
    def value(self):
        total_positive = sum(self.positive.values())
        total_negative = sum(self.negative.values())
        return total_positive - total_negative
    
    def merge(self, other):
        merged = PNCounter(self.node_id)
        
        # Merge positive counts
        all_pos_nodes = set(self.positive.keys()) | set(other.positive.keys())
        for node in all_pos_nodes:
            merged.positive[node] = max(
                self.positive.get(node, 0),
                other.positive.get(node, 0)
            )
        
        # Merge negative counts
        all_neg_nodes = set(self.negative.keys()) | set(other.negative.keys())
        for node in all_neg_nodes:
            merged.negative[node] = max(
                self.negative.get(node, 0),
                other.negative.get(node, 0)
            )
        
        return merged
```

#### 3. LWW-Element-Set (Last-Write-Wins Element Set)
```python
import time

class LWWElementSet:
    def __init__(self):
        self.add_set = {}  # {element: timestamp}
        self.remove_set = {}  # {element: timestamp}
    
    def add(self, element, timestamp=None):
        if timestamp is None:
            timestamp = time.time()
        
        # Only add if this is a newer timestamp
        if element not in self.add_set or timestamp > self.add_set[element]:
            self.add_set[element] = timestamp
    
    def remove(self, element, timestamp=None):
        if timestamp is None:
            timestamp = time.time()
        
        if element not in self.remove_set or timestamp > self.remove_set[element]:
            self.remove_set[element] = timestamp
    
    def contains(self, element):
        """Element is in set if:
        - It's in add_set AND
        - Either not in remove_set OR add timestamp > remove timestamp
        """
        if element not in self.add_set:
            return False
        
        if element not in self.remove_set:
            return True
        
        # Bias towards additions in case of tie
        return self.add_set[element] >= self.remove_set[element]
    
    def elements(self):
        return {elem for elem in self.add_set if self.contains(elem)}
    
    def merge(self, other):
        merged = LWWElementSet()
        
        # Merge add sets - keep max timestamp
        all_add_elems = set(self.add_set.keys()) | set(other.add_set.keys())
        for elem in all_add_elems:
            merged.add_set[elem] = max(
                self.add_set.get(elem, 0),
                other.add_set.get(elem, 0)
            )
        
        # Merge remove sets - keep max timestamp
        all_remove_elems = set(self.remove_set.keys()) | set(other.remove_set.keys())
        for elem in all_remove_elems:
            merged.remove_set[elem] = max(
                self.remove_set.get(elem, 0),
                other.remove_set.get(elem, 0)
            )
        
        return merged

# Usage
set1 = LWWElementSet()
set2 = LWWElementSet()

set1.add("apple", 1000)
set2.add("banana", 1001)
set2.remove("apple", 1002)  # Later removal

merged = set1.merge(set2)
print(merged.elements())  # {"banana"}
```

#### 4. OR-Set (Observed-Remove Set)
```python
import uuid

class ORSet:
    def __init__(self):
        self.elements = {}  # {element: set of unique tags}
        self.tombstones = {}  # {element: set of removed tags}
    
    def add(self, element):
        """Add element with a unique tag"""
        tag = str(uuid.uuid4())
        
        if element not in self.elements:
            self.elements[element] = set()
        self.elements[element].add(tag)
        
        return tag
    
    def remove(self, element):
        """Remove all observed tags for this element"""
        if element in self.elements:
            if element not in self.tombstones:
                self.tombstones[element] = set()
            
            # Move all current tags to tombstones
            self.tombstones[element].update(self.elements[element])
            del self.elements[element]
    
    def contains(self, element):
        if element not in self.elements:
            return False
        
        # Element exists if it has tags not in tombstones
        if element not in self.tombstones:
            return len(self.elements[element]) > 0
        
        alive_tags = self.elements[element] - self.tombstones[element]
        return len(alive_tags) > 0
    
    def get_elements(self):
        result = set()
        for elem in self.elements:
            if self.contains(elem):
                result.add(elem)
        return result
    
    def merge(self, other):
        merged = ORSet()
        
        # Merge elements (union of tags)
        all_elems = set(self.elements.keys()) | set(other.elements.keys())
        for elem in all_elems:
            merged.elements[elem] = (
                self.elements.get(elem, set()) | 
                other.elements.get(elem, set())
            )
        
        # Merge tombstones (union of removed tags)
        all_tomb_elems = set(self.tombstones.keys()) | set(other.tombstones.keys())
        for elem in all_tomb_elems:
            merged.tombstones[elem] = (
                self.tombstones.get(elem, set()) | 
                other.tombstones.get(elem, set())
            )
        
        return merged
```

---

## 2. Operational Transformation (OT)

### Overview
Operational Transformation is a technique for maintaining consistency in collaborative editing systems. It transforms operations based on concurrent operations to ensure all replicas converge to the same state.

### Key Properties
1. **Convergence**: All replicas eventually reach the same state
2. **Causality Preservation**: Operations are applied in causal order
3. **Intention Preservation**: The effect of operations matches user intention

### Basic OT Implementation

```python
class Operation:
    def __init__(self, op_type, position, char=None):
        self.type = op_type  # 'insert' or 'delete'
        self.position = position
        self.char = char
    
    def __repr__(self):
        if self.type == 'insert':
            return f"Insert('{self.char}' at {self.position})"
        return f"Delete(at {self.position})"

class OTDocument:
    def __init__(self, content=""):
        self.content = list(content)
        self.history = []
    
    def apply(self, operation):
        """Apply an operation to the document"""
        if operation.type == 'insert':
            self.content.insert(operation.position, operation.char)
        elif operation.type == 'delete':
            if operation.position < len(self.content):
                self.content.pop(operation.position)
        
        self.history.append(operation)
    
    def transform(self, op1, op2):
        """
        Transform op1 against op2. Returns transformed op1.
        This is the core OT algorithm.
        """
        if op1.type == 'insert' and op2.type == 'insert':
            if op1.position < op2.position:
                return op1  # No change needed
            elif op1.position > op2.position:
                # Shift op1 position forward
                return Operation('insert', op1.position + 1, op1.char)
            else:
                # Same position - use site ID or other tie-breaker in real systems
                return Operation('insert', op1.position + 1, op1.char)
        
        elif op1.type == 'insert' and op2.type == 'delete':
            if op1.position <= op2.position:
                return op1  # No change
            else:
                # Shift backward
                return Operation('insert', op1.position - 1, op1.char)
        
        elif op1.type == 'delete' and op2.type == 'insert':
            if op1.position < op2.position:
                return op1
            else:
                # Shift forward
                return Operation('delete', op1.position + 1)
        
        elif op1.type == 'delete' and op2.type == 'delete':
            if op1.position < op2.position:
                return op1
            elif op1.position > op2.position:
                return Operation('delete', op1.position - 1)
            else:
                # Same position - op already deleted
                return None  # Operation cancelled
        
        return op1
    
    def __str__(self):
        return ''.join(self.content)

# Simulation of collaborative editing
doc1 = OTDocument("Hello")
doc2 = OTDocument("Hello")

# User 1 inserts 'X' at position 5: "HelloX"
op1 = Operation('insert', 5, 'X')
doc1.apply(op1)

# User 2 inserts 'Y' at position 2: "HeYllo"
op2 = Operation('insert', 2, 'Y')
doc2.apply(op2)

# Now we need to synchronize
# Transform op2 for doc1 (which has already applied op1)
op2_transformed = doc1.transform(op2, op1)
doc1.apply(op2_transformed)

# Transform op1 for doc2 (which has already applied op2)
op1_transformed = doc2.transform(op1, op2)
doc2.apply(op1_transformed)

print(f"Doc1: {doc1}")  # Should converge
print(f"Doc2: {doc2}")  # Should converge
```

### Advanced OT: Text Editor Example

```python
class TextOTEngine:
    def __init__(self):
        self.version = 0
        self.operations = []
    
    def generate_operation(self, op_type, position, content=None, base_version=None):
        """Generate a new operation"""
        op = {
            'type': op_type,
            'position': position,
            'content': content,
            'version': base_version or self.version
        }
        return op
    
    def transform_operation(self, incoming_op, against_op):
        """Transform incoming operation against another operation"""
        new_op = incoming_op.copy()
        
        if against_op['type'] == 'insert':
            # If insertion happened before our position, shift forward
            if against_op['position'] <= incoming_op['position']:
                new_op['position'] += len(against_op['content'])
        
        elif against_op['type'] == 'delete':
            # If deletion happened before our position, shift backward
            if against_op['position'] < incoming_op['position']:
                new_op['position'] -= against_op['length']
            elif against_op['position'] == incoming_op['position']:
                # Handle conflict based on operation type
                if incoming_op['type'] == 'delete':
                    return None  # Cancel operation
        
        return new_op
    
    def apply_operation(self, operation):
        """Apply operation and transform against concurrent operations"""
        # Transform against all operations since base version
        transformed_op = operation
        
        for i in range(operation['version'], len(self.operations)):
            transformed_op = self.transform_operation(transformed_op, self.operations[i])
            if transformed_op is None:
                return None
        
        self.operations.append(transformed_op)
        self.version += 1
        return transformed_op
```

---

## 3. Anti-Entropy Protocols

### Overview
Anti-entropy protocols ensure replicas eventually converge by periodically comparing and synchronizing their states. They're the "gossip protocols" of distributed systems.

### Types of Anti-Entropy

#### 1. Merkle Trees for Efficient Synchronization

```python
import hashlib

class MerkleNode:
    def __init__(self, hash_value, left=None, right=None, data=None):
        self.hash = hash_value
        self.left = left
        self.right = right
        self.data = data

class MerkleTree:
    def __init__(self, data_blocks):
        self.leaves = []
        self.root = self.build_tree(data_blocks)
    
    def hash_data(self, data):
        """Create hash of data"""
        return hashlib.sha256(str(data).encode()).hexdigest()
    
    def build_tree(self, data_blocks):
        """Build Merkle tree from data blocks"""
        if not data_blocks:
            return None
        
        # Create leaf nodes
        nodes = [MerkleNode(self.hash_data(data), data=data) 
                 for data in data_blocks]
        self.leaves = nodes.copy()
        
        # Build tree bottom-up
        while len(nodes) > 1:
            next_level = []
            
            for i in range(0, len(nodes), 2):
                left = nodes[i]
                right = nodes[i + 1] if i + 1 < len(nodes) else left
                
                # Combine hashes
                combined = left.hash + right.hash
                parent_hash = self.hash_data(combined)
                parent = MerkleNode(parent_hash, left, right)
                next_level.append(parent)
            
            nodes = next_level
        
        return nodes[0] if nodes else None
    
    def get_root_hash(self):
        return self.root.hash if self.root else None
    
    def find_differences(self, other_tree):
        """Find data blocks that differ between trees"""
        if not self.root or not other_tree.root:
            return []
        
        differences = []
        self._compare_nodes(self.root, other_tree.root, differences)
        return differences
    
    def _compare_nodes(self, node1, node2, differences):
        """Recursively compare nodes"""
        if not node1 or not node2:
            return
        
        # If hashes match, subtrees are identical
        if node1.hash == node2.hash:
            return
        
        # If leaf nodes, record difference
        if node1.data is not None:
            differences.append({
                'local': node1.data,
                'remote': node2.data
            })
            return
        
        # Recurse on children
        if node1.left and node2.left:
            self._compare_nodes(node1.left, node2.left, differences)
        if node1.right and node2.right:
            self._compare_nodes(node1.right, node2.right, differences)

# Usage
replica1_data = ["block1", "block2", "block3", "block4"]
replica2_data = ["block1", "block2_modified", "block3", "block4"]

tree1 = MerkleTree(replica1_data)
tree2 = MerkleTree(replica2_data)

print(f"Tree1 root: {tree1.get_root_hash()[:16]}...")
print(f"Tree2 root: {tree2.get_root_hash()[:16]}...")

differences = tree1.find_differences(tree2)
print(f"Differences found: {len(differences)}")
```

#### 2. Gossip Protocol Implementation

```python
import random
import time
from dataclasses import dataclass
from typing import Dict, Set

@dataclass
class GossipMessage:
    key: str
    value: any
    version: int
    timestamp: float

class GossipNode:
    def __init__(self, node_id, gossip_fanout=3):
        self.node_id = node_id
        self.gossip_fanout = gossip_fanout
        self.data = {}  # {key: GossipMessage}
        self.peers = set()
        self.version_vectors = {}  # {peer_id: {key: version}}
    
    def add_peer(self, peer):
        """Add a peer to gossip with"""
        self.peers.add(peer)
    
    def update(self, key, value):
        """Update local data"""
        current = self.data.get(key)
        new_version = (current.version + 1) if current else 1
        
        self.data[key] = GossipMessage(
            key=key,
            value=value,
            version=new_version,
            timestamp=time.time()
        )
    
    def gossip_round(self):
        """Perform one round of gossip"""
        if not self.peers:
            return
        
        # Select random peers
        targets = random.sample(
            list(self.peers), 
            min(self.gossip_fanout, len(self.peers))
        )
        
        for peer in targets:
            self.sync_with_peer(peer)
    
    def sync_with_peer(self, peer):
        """Synchronize data with a peer"""
        # Send our data
        for key, message in self.data.items():
            peer_version = peer.data.get(key)
            
            if not peer_version or message.version > peer_version.version:
                peer.receive_update(message, self.node_id)
        
        # Receive peer's data
        for key, message in peer.data.items():
            local_version = self.data.get(key)
            
            if not local_version or message.version > local_version.version:
                self.receive_update(message, peer.node_id)
    
    def receive_update(self, message, from_node):
        """Receive an update from a peer"""
        current = self.data.get(message.key)
        
        # Apply update if newer
        if not current or message.version > current.version:
            self.data[message.key] = message
        elif message.version == current.version:
            # Conflict resolution: use timestamp
            if message.timestamp > current.timestamp:
                self.data[message.key] = message
    
    def get(self, key):
        """Get value for key"""
        message = self.data.get(key)
        return message.value if message else None

# Simulation
node1 = GossipNode("node1")
node2 = GossipNode("node2")
node3 = GossipNode("node3")

# Connect nodes
node1.add_peer(node2)
node1.add_peer(node3)
node2.add_peer(node1)
node2.add_peer(node3)
node3.add_peer(node1)
node3.add_peer(node2)

# Update data
node1.update("key1", "value1")
node2.update("key2", "value2")

# Gossip rounds
for _ in range(3):
    node1.gossip_round()
    node2.gossip_round()
    node3.gossip_round()

print(f"Node1 data: {[(k, v.value) for k, v in node1.data.items()]}")
print(f"Node2 data: {[(k, v.value) for k, v in node2.data.items()]}")
print(f"Node3 data: {[(k, v.value) for k, v in node3.data.items()]}")
```

---

## 4. Read Repair and Hinted Handoff

### Read Repair

Read repair ensures consistency by detecting and fixing inconsistencies during read operations.

```python
from collections import Counter
import time

class ReadRepairStorage:
    def __init__(self, node_id, replication_factor=3, read_quorum=2, write_quorum=2):
        self.node_id = node_id
        self.data = {}  # {key: {'value': value, 'version': int, 'timestamp': float}}
        self.replicas = []  # List of replica nodes
        self.replication_factor = replication_factor
        self.read_quorum = read_quorum
        self.write_quorum = write_quorum
    
    def add_replica(self, replica):
        """Add a replica node"""
        if len(self.replicas) < self.replication_factor:
            self.replicas.append(replica)
    
    def write(self, key, value):
        """Write with quorum"""
        version = int(time.time() * 1000)
        data = {
            'value': value,
            'version': version,
            'timestamp': time.time()
        }
        
        # Write locally
        self.data[key] = data
        
        # Write to replicas
        successful_writes = 1
        for replica in self.replicas:
            if replica.local_write(key, data):
                successful_writes += 1
        
        return successful_writes >= self.write_quorum
    
    def local_write(self, key, data):
        """Write to local storage"""
        current = self.data.get(key)
        
        # Only accept if newer
        if not current or data['version'] > current['version']:
            self.data[key] = data
            return True
        return False
    
    def read(self, key, perform_read_repair=True):
        """Read with quorum and optional read repair"""
        # Collect responses from replicas
        responses = []
        
        # Read locally
        if key in self.data:
            responses.append((self.node_id, self.data[key]))
        
        # Read from replicas
        for replica in self.replicas:
            data = replica.local_read(key)
            if data:
                responses.append((replica.node_id, data))
        
        if len(responses) < self.read_quorum:
            return None  # Not enough responses
        
        # Find the most recent version
        latest_version = max(responses, key=lambda x: x[1]['version'])
        
        if perform_read_repair:
            self.perform_read_repair(key, responses, latest_version[1])
        
        return latest_version[1]['value']
    
    def local_read(self, key):
        """Read from local storage"""
        return self.data.get(key)
    
    def perform_read_repair(self, key, responses, latest_data):
        """Repair stale replicas"""
        for node_id, data in responses:
            if data['version'] < latest_data['version']:
                # Find the node and update it
                if node_id == self.node_id:
                    self.data[key] = latest_data
                else:
                    for replica in self.replicas:
                        if replica.node_id == node_id:
                            replica.local_write(key, latest_data)
                            print(f"Read repair: Updated {node_id} with latest version")

# Example usage
node1 = ReadRepairStorage("node1")
node2 = ReadRepairStorage("node2")
node3 = ReadRepairStorage("node3")

node1.add_replica(node2)
node1.add_replica(node3)
node2.add_replica(node1)
node2.add_replica(node3)

# Write data
node1.write("user:123", {"name": "Alice", "age": 30})

# Simulate stale data on node3
node3.data["user:123"] = {
    'value': {"name": "Alice", "age": 25},
    'version': 1,
    'timestamp': time.time() - 3600
}

# Read will trigger read repair
value = node1.read("user:123", perform_read_repair=True)
print(f"Read value: {value}")
```

### Hinted Handoff

Hinted handoff handles temporary node failures by storing writes intended for unavailable nodes.

```python
class HintedHandoffStorage:
    def __init__(self, node_id):
        self.node_id = node_id
        self.data = {}
        self.hints = {}  # {target_node: [(key, value, version)]}
        self.available = True
    
    def write(self, key, value, version):
        """Write to local storage"""
        if self.available:
            self.data[key] = {'value': value, 'version': version}
            return True
        return False
    
    def store_hint(self, target_node, key, value, version):
        """Store a hint for an unavailable node"""
        if target_node not in self.hints:
            self.hints[target_node] = []
        
        self.hints[target_node].append({
            'key': key,
            'value': value,
            'version': version,
            'timestamp': time.time()
        })
        print(f"{self.node_id}: Stored hint for {target_node}")
    
    def replay_hints(self, target_node):
        """Replay hints when target node becomes available"""
        if target_node not in self.hints:
            return
        
        hints = self.hints[target_node]
        successful = 0
        
        for hint in hints:
            # Try to send hint to target
            if target_node.write(hint['key'], hint['value'], hint['version']):
                successful += 1
        
        # Clear hints after replay
        del self.hints[target_node]
        print(f"{self.node_id}: Replayed {successful} hints to {target_node.node_id}")
    
    def set_availability(self, available):
        """Simulate node going up/down"""
        self.available = available
        print(f"{self.node_id}: {'Available' if available else 'Unavailable'}")

class HintedHandoffCoordinator:
    def __init__(self, nodes):
        self.nodes = nodes
    
    def write_with_handoff(self, key, value, primary_nodes):
        """Write with hinted handoff"""
        version = int(time.time() * 1000)
        successful_writes = 0
        
        available_nodes = []
        unavailable_nodes = []
        
        # Categorize nodes
        for node in primary_nodes:
            if node.available:
                available_nodes.append(node)
            else:
                unavailable_nodes.append(node)
        
        # Write to available nodes
        for node in available_nodes:
            if node.write(key, value, version):
                successful_writes += 1
        
        # Store hints for unavailable nodes
        if unavailable_nodes and available_nodes:
            for unavail_node in unavailable_nodes:
                # Store hint on first available node
                available_nodes[0].store_hint(unavail_node, key, value, version)
        
        return successful_writes
    
    def handle_node_recovery(self, recovered_node):
        """Handle hints when a node recovers"""
        print(f"\nNode {recovered_node.node_id} recovered")
        
        # Replay hints from all nodes
        for node in self.nodes:
            if node != recovered_node:
                node.replay_hints(recovered_node)

# Example
node1 = HintedHandoffStorage("node1")
node2 = HintedHandoffStorage("node2")
node3 = HintedHandoffStorage("node3")

coordinator = HintedHandoffCoordinator([node1, node2, node3])

# Node 3 goes down
node3.set_availability(False)

# Write data (node3 is unavailable)
print("\nWriting with node3 unavailable:")
coordinator.write_with_handoff("key1", "value1", [node1, node2, node3])

# Node 3 recovers
node3.set_availability(True)
coordinator.handle_node_recovery(node3)

print(f"\nNode3 data after recovery: {node3.data}")
```

---

## 5. Vector Clocks in Practice

### Overview
Vector clocks track causality between events in distributed systems, allowing detection of concurrent updates.

```python
class VectorClock:
    def __init__(self, node_id):
        self.node_id = node_id
        self.clock = {}  # {node_id: counter}
    
    def increment(self):
        """Increment this node's counter"""
        if self.node_id not in self.clock:
            self.clock[self.node_id] = 0
        self.clock[self.node_id] += 1
    
    def update(self, other_clock):
        """Update this clock with another clock (on message receive)"""
        # Take max of each node's counter
        all_nodes = set(self.clock.keys()) | set(other_clock.clock.keys())
        
        for node in all_nodes:
            self.clock[node] = max(
                self.clock.get(node, 0),
                other_clock.clock.get(node, 0)
            )
        
        # Increment own counter
        self.increment()
    
    def happens_before(self, other):
        """Check if this clock happens before another"""
        # self <= other AND self != other
        all_nodes = set(self.clock.keys()) | set(other.clock.keys())
        
        less_than_or_equal = True
        strictly_less = False
        
        for node in all_nodes:
            self_val = self.clock.get(node, 0)
            other_val = other.clock.get(node, 0)
            
            if self_val > other_val:
                less_than_or_equal = False
                break
            if self_val < other_val:
                strictly_less = True
        
        return less_than_or_equal and strictly_less
    
    def concurrent_with(self, other):
        """Check if this clock is concurrent with another"""
        return not self.happens_before(other) and not other.happens_before(self)
    
    def copy(self):
        """Create a copy of this clock"""
        new_clock = VectorClock(self.node_id)
        new_clock.clock = self.clock.copy()
        return new_clock
    
    def __repr__(self):
        return f"VC({self.clock})"

class VersionedData:
    def __init__(self, key, value, vector_clock):
        self.key = key
        self.value = value
        self.vector_clock = vector_clock
    
    def __repr__(self):
        return f"Data(key={self.key}, value={self.value}, vc={self.vector_clock})"

class VectorClockStore:
    def __init__(self, node_id):
        self.node_id = node_id
        self.clock = VectorClock(node_id)
        self.data = {}  # {key: [VersionedData]} - list for concurrent versions
    
    def put(self, key, value):
        """Put a value with vector clock"""
        # Increment clock
        self.clock.increment()
        
        # Create versioned data
        versioned = VersionedData(key, value, self.clock.copy())
        
        # Check for conflicts with existing versions
        if key in self.data:
            new_versions = []
            has_conflict = False
            
            for existing in self.data[key]:
                if versioned.vector_clock.happens_before(existing.vector_clock):
                    # New version is older, keep existing
                    new_versions.append(existing)
                elif existing.vector_clock.happens_before(versioned.vector_clock):
                    # Existing version is older, replace with new
                    continue
                else:
                    # Concurrent versions - keep both
                    new_versions.append(existing)
                    has_conflict = True
            
            new_versions.append(versioned)
            self.data[key] = new_versions
            
            if has_conflict:
                print(f"{self.node_id}: Conflict detected for key '{key}'")
        else:
            self.data[key] = [versioned]
    
    def get(self, key):
        """Get value(s) for key"""
        if key not in self.data:
            return None
        
        versions = self.data[key]
        
        if len(versions) == 1:
            return versions[0].value
        else:
            # Multiple concurrent versions
            return [v.value for v in versions]
    
    def resolve_conflict(self, key, resolved_value):
        """Manually resolve conflict by providing resolved value"""
        if key not in self.data:
            return
        
        # Merge vector clocks from all versions
        merged_clock = VectorClock(self.node_id)
        for version in self.data[key]:
            merged_clock.update(version.vector_clock)
        
        # Create new version with merged clock
        self.data[key] = [VersionedData(key, resolved_value, merged_clock)]
        print(f"{self.node_id}: Conflict resolved for key '{key}'")
    
    def sync_with(self, other_store, key):
        """Synchronize a key with another store"""
        # Update clock
        self.clock.update(other_store.clock)
        
        if key in other_store.data:
            for other_version in other_store.data[key]:
                # Check if we should accept this version
                should_accept = True
                
                if key in self.data:
                    for local_version in self.data[key]:
                        if other_version.vector_clock.happens_before(local_version.vector_clock):
                            should_accept = False
                            break
                
                if should_accept:
                    if key not in self.data:
                        self.data[key] = []
                    
                    # Check if already have this version
                    has_version = any(
                        v.vector_clock.clock == other_version.vector_clock.clock 
                        for v in self.data[key]
                    )
                    
                    if not has_version:
                        self.data[key].append(other_version)

# Example usage
store1 = VectorClockStore("node1")
store2 = VectorClockStore("node2")
store3 = VectorClockStore("node3")

# Node 1 writes
store1.put("item:1", {"name": "Widget", "price": 10})
print(f"Store1 after write: {store1.get('item:1')}")

# Node 2 writes concurrently (simulating network partition)
store2.put("item:1", {"name": "Widget", "price": 12})
print(f"Store2 after write: {store2.get('item:1')}")

# Sync stores (conflict will be detected)
print("\n--- Syncing stores ---")
store1.sync_with(store2, "item:1")
print(f"Store1 after sync: {store1.get('item:1')}")

# Resolve conflict
store1.resolve_conflict("item:1", {"name": "Widget", "price": 11})
print(f"Store1 after resolution: {store1.get('item:1')}")
```

### Dotted Version Vectors (Advanced)

```python
class DottedVersionVector:
    """
    More precise version of vector clocks that tracks individual events
    """
    def __init__(self):
        self.base = {}  # {node_id: counter}
        self.dots = set()  # Set of (node_id, counter) tuples
    
    def add_dot(self, node_id, counter):
        """Add a specific event"""
        self.dots.add((node_id, counter))
        
        # Update base if this advances it
        if node_id not in self.base or counter > self.base[node_id]:
            self.base[node_id] = counter
    
    def next_dot(self, node_id):
        """Get the next dot for a node"""
        counter = self.base.get(node_id, 0) + 1
        return (node_id, counter)
    
    def has_dot(self, node_id, counter):
        """Check if a specific dot is present"""
        return (node_id, counter) in self.dots
    
    def merge(self, other):
        """Merge with another DVV"""
        merged = DottedVersionVector()
        
        # Merge bases
        all_nodes = set(self.base.keys()) | set(other.base.keys())
        for node in all_nodes:
            merged.base[node] = max(
                self.base.get(node, 0),
                other.base.get(node, 0)
            )
        
        # Merge dots
        merged.dots = self.dots | other.dots
        
        # Remove obsolete dots
        merged.compact()
        
        return merged
    
    def compact(self):
        """Remove dots that are covered by base"""
        self.dots = {
            (node, counter) for node, counter in self.dots
            if counter > self.base.get(node, 0)
        }
    
    def __repr__(self):
        return f"DVV(base={self.base}, dots={self.dots})"
```

---

## 6. Real-World Eventual Consistency

### Shopping Cart with CRDTs

```python
class ShoppingCartItem:
    def __init__(self, product_id, quantity, added_by, timestamp):
        self.product_id = product_id
        self.quantity = quantity
        self.added_by = added_by  # node/user who added
        self.timestamp = timestamp

class ShoppingCart:
    """
    Shopping cart using OR-Set CRDT
    Handles concurrent adds/removes correctly
    """
    def __init__(self, cart_id):
        self.cart_id = cart_id
        self.items = {}  # {product_id: {unique_id: ShoppingCartItem}}
        self.removed = set()  # Set of removed unique_ids
    
    def add_item(self, product_id, quantity, node_id):
        """Add item to cart"""
        unique_id = f"{product_id}:{node_id}:{time.time()}"
        
        if product_id not in self.items:
            self.items[product_id] = {}
        
        self.items[product_id][unique_id] = ShoppingCartItem(
            product_id, quantity, node_id, time.time()
        )
        
        return unique_id
    
    def remove_item(self, product_id):
        """Remove all instances of a product"""
        if product_id in self.items:
            # Mark all current instances as removed
            for unique_id in self.items[product_id].keys():
                self.removed.add(unique_id)
            
            del self.items[product_id]
    
    def get_quantity(self, product_id):
        """Get total quantity for a product"""
        if product_id not in self.items:
            return 0
        
        total = 0
        for unique_id, item in self.items[product_id].items():
            if unique_id not in self.removed:
                total += item.quantity
        
        return total
    
    def get_items(self):
        """Get all items in cart"""
        result = {}
        
        for product_id, instances in self.items.items():
            quantity = 0
            for unique_id, item in instances.items():
                if unique_id not in self.removed:
                    quantity += item.quantity
            
            if quantity > 0:
                result[product_id] = quantity
        
        return result
    
    def merge(self, other):
        """Merge with another shopping cart"""
        merged = ShoppingCart(self.cart_id)
        
        # Merge items
        all_products = set(self.items.keys()) | set(other.items.keys())
        
        for product_id in all_products:
            merged.items[product_id] = {}
            
            # Add from self
            if product_id in self.items:
                merged.items[product_id].update(self.items[product_id])
            
            # Add from other
            if product_id in other.items:
                merged.items[product_id].update(other.items[product_id])
        
        # Merge removed set
        merged.removed = self.removed | other.removed
        
        return merged

# Example: User adds items from multiple devices
cart_mobile = ShoppingCart("user123")
cart_web = ShoppingCart("user123")

# Add items on mobile
cart_mobile.add_item("product_A", 2, "mobile")
cart_mobile.add_item("product_B", 1, "mobile")

# Concurrently add items on web
cart_web.add_item("product_A", 1, "web")  # Same product
cart_web.add_item("product_C", 3, "web")

# User removes product_B on mobile
cart_mobile.remove_item("product_B")

# Merge carts
final_cart = cart_mobile.merge(cart_web)
print(f"Final cart items: {final_cart.get_items()}")
# Output: {'product_A': 3, 'product_C': 3}
```

### Collaborative Document Editing

```python
class CollaborativeDocument:
    """
    Real-time collaborative document using OT
    """
    def __init__(self, doc_id):
        self.doc_id = doc_id
        self.content = []
        self.version = 0
        self.pending_operations = []
    
    def insert(self, position, text, user_id):
        """Insert text at position"""
        op = {
            'type': 'insert',
            'position': position,
            'text': text,
            'user_id': user_id,
            'version': self.version
        }
        
        self.apply_operation(op)
        return op
    
    def delete(self, position, length, user_id):
        """Delete text at position"""
        op = {
            'type': 'delete',
            'position': position,
            'length': length,
            'user_id': user_id,
            'version': self.version
        }
        
        self.apply_operation(op)
        return op
    
    def apply_operation(self, operation):
        """Apply operation to document"""
        if operation['type'] == 'insert':
            self.content.insert(operation['position'], operation['text'])
        elif operation['type'] == 'delete':
            for _ in range(operation['length']):
                if operation['position'] < len(self.content):
                    self.content.pop(operation['position'])
        
        self.version += 1
    
    def transform_operation(self, op, against):
        """Transform operation against another"""
        transformed = op.copy()
        
        if against['type'] == 'insert':
            if op['position'] >= against['position']:
                transformed['position'] += len(against['text'])
        
        elif against['type'] == 'delete':
            if op['position'] >= against['position']:
                transformed['position'] -= min(
                    against['length'],
                    op['position'] - against['position']
                )
        
        return transformed
    
    def get_content(self):
        """Get document content as string"""
        return ''.join(self.content)
    
    def __repr__(self):
        return f"Doc(v{self.version}): '{self.get_content()}'"

# Example: Two users editing simultaneously
doc1 = CollaborativeDocument("doc_123")
doc2 = CollaborativeDocument("doc_123")

# Initialize with same content
for doc in [doc1, doc2]:
    doc.content = list("Hello World")
    doc.version = 1

# User 1 inserts
op1 = doc1.insert(6, "Beautiful ", "user1")
print(f"Doc1: {doc1}")

# User 2 deletes simultaneously
op2 = doc2.delete(5, 6, "user2")
print(f"Doc2: {doc2}")

# Transform and apply operations
op1_transformed = doc2.transform_operation(op1, op2)
doc2.apply_operation(op1_transformed)

op2_transformed = doc1.transform_operation(op2, op1)
doc1.apply_operation(op2_transformed)

print(f"Doc1 (converged): {doc1}")
print(f"Doc2 (converged): {doc2}")
```

### Key Takeaways

1. **CRDTs**: Use when you need automatic conflict resolution without coordination
2. **Operational Transformation**: Best for real-time collaborative editing
3. **Anti-Entropy**: Essential for eventually repairing inconsistencies
4. **Read Repair**: Fixes inconsistencies lazily during reads
5. **Hinted Handoff**: Ensures durability during temporary failures
6. **Vector Clocks**: Track causality and detect conflicts

Each pattern has tradeoffs in complexity, consistency guarantees, and performance. Choose based on your specific requirements for availability, latency, and consistency.