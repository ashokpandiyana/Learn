import { useState } from 'react';

// ============= PROPS DEMO =============
function PropsDemo() {
  // Parent component with state
  const [username, setUsername] = useState('Alice');
  const [theme, setTheme] = useState('light');
  
  // Callback prop example
  const handleGreet = (name) => {
    alert(`Hello from ${name}!`);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Props Flow: Parent → Child</h4>
        
        {/* Parent controls */}
        <div className="mb-4 space-y-2">
          <div>
            <label className="text-sm font-medium">Username (Parent State): </label>
            <input 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="ml-2 px-2 py-1 border rounded"
            />
          </div>
          <div>
            <label className="text-sm font-medium">Theme: </label>
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="ml-2 px-2 py-1 border rounded"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
        
        {/* Child receives props */}
        <div className="border-l-4 border-blue-500 pl-4">
          <p className="text-xs text-gray-600 mb-2">Child Component receives props ↓</p>
          <UserCard 
            name={username} 
            theme={theme}
            onGreet={handleGreet}
          />
        </div>
      </div>
      
      {/* Props Destructuring Example */}
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-2">Props Destructuring</h4>
        <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`// Without destructuring
function UserCard(props) {
  return <div>{props.name}</div>;
}

// With destructuring (recommended)
function UserCard({ name, theme, onGreet }) {
  return <div>{name}</div>;
}`}
        </pre>
      </div>
    </div>
  );
}

// Child component receiving props
function UserCard({ name, theme, onGreet }) {
  const isDark = theme === 'dark';
  
  return (
    <div className={`p-4 rounded-lg ${isDark ? 'bg-gray-800 text-white' : 'bg-white border'}`}>
      <h3 className="font-semibold text-lg">👤 {name}</h3>
      <p className="text-sm opacity-75">Theme: {theme}</p>
      <button 
        onClick={() => onGreet(name)}
        className={`mt-2 px-3 py-1 rounded text-sm ${
          isDark ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-500 hover:bg-blue-600'
        } text-white`}
      >
        Greet (Callback Prop)
      </button>
    </div>
  );
}

// ============= CHILDREN PROP DEMO =============
function ChildrenPropDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">Children Prop</h4>
        
        <Card title="Example Card">
          <p className="text-sm">This content is passed as children prop!</p>
          <p className="text-sm">You can pass multiple elements.</p>
          <button className="mt-2 px-3 py-1 bg-green-500 text-white rounded text-sm">
            Even buttons!
          </button>
        </Card>
      </div>
      
      <div className="p-4 bg-green-50 rounded-lg">
        <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div>{children}</div>
    </div>
  );
}

// Usage:
<Card title="Example">
  <p>Children content here</p>
</Card>`}
        </pre>
      </div>
    </div>
  );
}

function Card({ title, children }) {
  return (
    <div className="border-2 border-green-300 rounded-lg p-4 bg-white">
      <h3 className="font-bold text-lg mb-2 text-green-700">{title}</h3>
      <div className="border-t pt-2">
        {children}
      </div>
    </div>
  );
}

// ============= STATE DEMO =============
function StateDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [isOn, setIsOn] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-3">useState Hook</h4>
        
        {/* Counter */}
        <div className="mb-4 p-3 bg-white rounded border">
          <p className="text-sm font-medium mb-2">Counter (Number State)</p>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setCount(count - 1)}
              className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              -1
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button 
              onClick={() => setCount(count + 1)}
              className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
            >
              +1
            </button>
            <button 
              onClick={() => setCount(0)}
              className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
            >
              Reset
            </button>
          </div>
        </div>
        
        {/* Text Input */}
        <div className="mb-4 p-3 bg-white rounded border">
          <p className="text-sm font-medium mb-2">Text Input (String State)</p>
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Type your name..."
            className="w-full px-3 py-2 border rounded"
          />
          {name && <p className="mt-2 text-sm">Hello, <strong>{name}</strong>!</p>}
        </div>
        
        {/* Toggle */}
        <div className="p-3 bg-white rounded border">
          <p className="text-sm font-medium mb-2">Toggle (Boolean State)</p>
          <button 
            onClick={() => setIsOn(!isOn)}
            className={`px-4 py-2 rounded font-semibold transition ${
              isOn 
                ? 'bg-green-500 text-white hover:bg-green-600' 
                : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
            }`}
          >
            {isOn ? '🟢 ON' : '⚫ OFF'}
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-2">useState Syntax</h4>
        <pre className="text-xs bg-white p-3 rounded overflow-x-auto">
{`const [state, setState] = useState(initialValue);

// Examples:
const [count, setCount] = useState(0);
const [name, setName] = useState('');
const [isOn, setIsOn] = useState(false);
const [items, setItems] = useState([]);
const [user, setUser] = useState({ name: '', age: 0 });`}
        </pre>
      </div>
    </div>
  );
}

// ============= FUNCTIONAL UPDATES DEMO =============
function FunctionalUpdatesDemo() {
  const [count, setCount] = useState(0);
  
  // Wrong way - uses stale state
  const incrementWrong = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    // Only increments by 1!
  };
  
  // Correct way - uses functional update
  const incrementCorrect = () => {
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    // Increments by 3!
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Functional Updates</h4>
        <p className="text-sm text-gray-700 mb-4">
          When new state depends on previous state, use functional updates!
        </p>
        
        <div className="p-4 bg-white rounded border">
          <div className="text-center mb-4">
            <div className="text-4xl font-bold text-orange-600">{count}</div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-xs font-semibold mb-2 text-red-600">❌ Wrong Way</p>
              <button 
                onClick={incrementWrong}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                +3 (Wrong)
              </button>
              <pre className="text-xs mt-2 bg-red-50 p-2 rounded">
{`setCount(count + 1);
setCount(count + 1);
setCount(count + 1);
// Uses stale 'count'
// Result: count + 1`}
              </pre>
            </div>
            
            <div>
              <p className="text-xs font-semibold mb-2 text-green-600">✅ Correct Way</p>
              <button 
                onClick={incrementCorrect}
                className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                +3 (Correct)
              </button>
              <pre className="text-xs mt-2 bg-green-50 p-2 rounded">
{`setCount(prev => prev + 1);
setCount(prev => prev + 1);
setCount(prev => prev + 1);
// Uses current value
// Result: count + 3`}
              </pre>
            </div>
          </div>
          
          <button 
            onClick={() => setCount(0)}
            className="w-full mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= CONDITIONAL RENDERING DEMO =============
function ConditionalRenderingDemo() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('guest');
  const [notifications, setNotifications] = useState(3);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Conditional Rendering Patterns</h4>
        
        {/* Controls */}
        <div className="mb-4 p-3 bg-white rounded border space-y-2">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsLoggedIn(!isLoggedIn)}
              className={`px-4 py-2 rounded font-medium ${
                isLoggedIn ? 'bg-green-500 text-white' : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isLoggedIn ? 'Logged In' : 'Logged Out'}
            </button>
            
            <select 
              value={userRole}
              onChange={(e) => setUserRole(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="guest">Guest</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            
            <button 
              onClick={() => setNotifications(notifications > 0 ? 0 : 3)}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Notifications: {notifications}
            </button>
          </div>
        </div>
        
        {/* Pattern 1: Ternary */}
        <div className="mb-3 p-3 bg-white rounded border">
          <p className="text-xs font-semibold mb-2">Pattern 1: Ternary (if-else)</p>
          {isLoggedIn ? (
            <div className="text-green-700">✓ Welcome back, user!</div>
          ) : (
            <div className="text-orange-700">⚠ Please log in to continue</div>
          )}
          <pre className="text-xs mt-2 bg-gray-50 p-2 rounded">
{`{isLoggedIn ? (
  <div>Welcome!</div>
) : (
  <div>Please log in</div>
)}`}
          </pre>
        </div>
        
        {/* Pattern 2: Logical AND */}
        <div className="mb-3 p-3 bg-white rounded border">
          <p className="text-xs font-semibold mb-2">Pattern 2: Logical AND (if-only)</p>
          {notifications > 0 && (
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-500 text-white rounded-full text-sm">
              <span>🔔</span>
              <span>{notifications} notifications</span>
            </div>
          )}
          {notifications === 0 && (
            <div className="text-gray-500 text-sm">No notifications</div>
          )}
          <pre className="text-xs mt-2 bg-gray-50 p-2 rounded">
{`{notifications > 0 && (
  <div>{notifications} notifications</div>
)}`}
          </pre>
        </div>
        
        {/* Pattern 3: Multiple Conditions */}
        <div className="p-3 bg-white rounded border">
          <p className="text-xs font-semibold mb-2">Pattern 3: Multiple Conditions</p>
          {userRole === 'admin' ? (
            <div className="p-2 bg-purple-100 text-purple-800 rounded">
              👑 Admin Dashboard Access
            </div>
          ) : userRole === 'user' ? (
            <div className="p-2 bg-blue-100 text-blue-800 rounded">
              👤 User Dashboard Access
            </div>
          ) : (
            <div className="p-2 bg-gray-100 text-gray-800 rounded">
              🔒 Limited Access (Guest)
            </div>
          )}
        </div>
      </div>
      
      {/* Gotcha Warning */}
      <div className="p-4 bg-red-50 rounded-lg border-2 border-red-200">
        <h4 className="font-semibold mb-2 text-red-700">⚠️ Common Gotcha</h4>
        <div className="space-y-2 text-sm">
          <div>
            <code className="bg-red-100 px-2 py-1 rounded">
              {'{'}count && &lt;div&gt;{'{'}count{'}'}&lt;/div&gt;{'}'}
            </code>
            <span className="ml-2 text-red-700">← Renders "0" when count is 0!</span>
          </div>
          <div>
            <code className="bg-green-100 px-2 py-1 rounded">
              {'{'}count &gt; 0 && &lt;div&gt;{'{'}count{'}'}&lt;/div&gt;{'}'}
            </code>
            <span className="ml-2 text-green-700">← Correct! Renders nothing when 0</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= LISTS AND KEYS DEMO =============
function ListsAndKeysDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'Learn React', done: false },
    { id: 2, text: 'Build Projects', done: false },
    { id: 3, text: 'Get Job', done: false }
  ]);
  const [nextId, setNextId] = useState(4);
  const [newItemText, setNewItemText] = useState('');
  const [showBadExample, setShowBadExample] = useState(false);
  
  const addItem = () => {
    if (newItemText.trim()) {
      setItems([...items, { id: nextId, text: newItemText, done: false }]);
      setNextId(nextId + 1);
      setNewItemText('');
    }
  };
  
  const toggleItem = (id) => {
    setItems(items.map(item =>
      item.id === id ? { ...item, done: !item.done } : item
    ));
  };
  
  const deleteItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Lists and Keys</h4>
        
        {/* Add Item */}
        <div className="mb-4 flex gap-2">
          <input 
            type="text"
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addItem()}
            placeholder="Add new item..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button 
            onClick={addItem}
            className="px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
          >
            Add
          </button>
        </div>
        
        {/* Toggle Bad Example */}
        <div className="mb-3">
          <label className="flex items-center gap-2 text-sm">
            <input 
              type="checkbox"
              checked={showBadExample}
              onChange={(e) => setShowBadExample(e.target.checked)}
            />
            <span>Show bad example (index as key)</span>
          </label>
        </div>
        
        {/* Good Example: ID as Key */}
        <div className="mb-4 p-3 bg-white rounded border">
          <p className="text-xs font-semibold mb-2 text-green-600">
            ✅ Correct: Using stable IDs as keys
          </p>
          <ul className="space-y-2">
            {items.map(item => (
              <li 
                key={item.id}
                className="flex items-center gap-2 p-2 bg-gray-50 rounded"
              >
                <input 
                  type="checkbox"
                  checked={item.done}
                  onChange={() => toggleItem(item.id)}
                />
                <span className={`flex-1 ${item.done ? 'line-through text-gray-500' : ''}`}>
                  {item.text}
                </span>
                <span className="text-xs text-gray-500">ID: {item.id}</span>
                <button 
                  onClick={() => deleteItem(item.id)}
                  className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
          <pre className="text-xs mt-2 bg-green-50 p-2 rounded">
{`{items.map(item => (
  <li key={item.id}>  // ✅ Stable, unique ID
    {item.text}
  </li>
))}`}
          </pre>
        </div>
        
        {/* Bad Example: Index as Key */}
        {showBadExample && (
          <div className="p-3 bg-white rounded border border-red-300">
            <p className="text-xs font-semibold mb-2 text-red-600">
              ❌ Bad: Using index as key (don't do this!)
            </p>
            <ul className="space-y-2">
              {items.map((item, index) => (
                <li 
                  key={index}
                  className="flex items-center gap-2 p-2 bg-red-50 rounded"
                >
                  <input 
                    type="checkbox"
                    checked={item.done}
                    onChange={() => toggleItem(item.id)}
                  />
                  <span className={`flex-1 ${item.done ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                  </span>
                  <span className="text-xs text-red-600">Index: {index}</span>
                  <button 
                    onClick={() => deleteItem(item.id)}
                    className="px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
            <pre className="text-xs mt-2 bg-red-50 p-2 rounded border border-red-200">
{`{items.map((item, index) => (
  <li key={index}>  // ❌ Index changes when items move!
    {item.text}
  </li>
))}`}
            </pre>
            <p className="text-xs text-red-700 mt-2">
              Try deleting the first item - notice how indices shift!
            </p>
          </div>
        )}
      </div>
      
      {/* Key Requirements */}
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-2">Key Requirements</h4>
        <ul className="text-sm space-y-1">
          <li>✅ <strong>Unique</strong> among siblings</li>
          <li>✅ <strong>Stable</strong> - don't change between renders</li>
          <li>✅ <strong>Predictable</strong> - same item = same key</li>
          <li>❌ Avoid using array index for dynamic lists</li>
          <li>❌ Don't use Math.random() (changes every render)</li>
        </ul>
      </div>
    </div>
  );
}

// ============= STATE IMMUTABILITY DEMO =============
function ImmutabilityDemo() {
  const [user, setUser] = useState({
    name: 'John',
    age: 25,
    hobbies: ['Reading', 'Gaming']
  });
  
  // Wrong way (mutation)
  const updateAgeWrong = () => {
    user.age = 26; // ❌ Mutates state directly
    setUser(user); // React won't detect change!
    alert('Age updated (wrong way) - React may not re-render!');
  };
  
  // Correct way (immutable update)
  const updateAgeCorrect = () => {
    setUser({ ...user, age: user.age + 1 }); // ✅ Creates new object
  };
  
  const addHobby = () => {
    const newHobby = prompt('Enter new hobby:');
    if (newHobby) {
      setUser({
        ...user,
        hobbies: [...user.hobbies, newHobby] // ✅ New array
      });
    }
  };
  
  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <h4 className="font-semibold mb-3">State Immutability</h4>
      
      <div className="p-4 bg-white rounded border mb-4">
        <p className="text-sm mb-2"><strong>Name:</strong> {user.name}</p>
        <p className="text-sm mb-2"><strong>Age:</strong> {user.age}</p>
        <p className="text-sm mb-2"><strong>Hobbies:</strong> {user.hobbies.join(', ')}</p>
        
        <div className="flex gap-2 mt-3">
          <button 
            onClick={updateAgeCorrect}
            className="px-3 py-2 bg-green-500 text-white rounded text-sm hover:bg-green-600"
          >
            ✅ Update Age (Correct)
          </button>
          <button 
            onClick={updateAgeWrong}
            className="px-3 py-2 bg-red-500 text-white rounded text-sm hover:bg-red-600"
          >
            ❌ Update Age (Wrong)
          </button>
          <button 
            onClick={addHobby}
            className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600"
          >
            Add Hobby
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-xs">
        <div className="p-3 bg-red-50 rounded border border-red-200">
          <p className="font-semibold text-red-700 mb-2">❌ Wrong (Mutation)</p>
          <pre className="text-xs">
{`// Mutates directly
user.age = 26;
setUser(user);

// Array mutation
user.hobbies.push('new');
setUser(user);`}
          </pre>
        </div>
        
        <div className="p-3 bg-green-50 rounded border border-green-200">
          <p className="font-semibold text-green-700 mb-2">✅ Correct (Immutable)</p>
          <pre className="text-xs">
{`// Creates new object
setUser({ ...user, age: 26 });

// Creates new array
setUser({
  ...user,
  hobbies: [...user.hobbies, 'new']
});`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('props');
  
  const tabs = [
    { id: 'props', label: 'Props', component: PropsDemo },
    { id: 'children', label: 'Children', component: ChildrenPropDemo },
    { id: 'state', label: 'State', component: StateDemo },
    { id: 'functional', label: 'Functional Updates', component: FunctionalUpdatesDemo },
    { id: 'conditional', label: 'Conditional', component: ConditionalRenderingDemo },
    { id: 'lists', label: 'Lists & Keys', component: ListsAndKeysDemo },
    { id: 'immutability', label: 'Immutability', component: ImmutabilityDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 2: Props & State</h1>
            <p className="text-purple-100">Interactive Demonstrations</p>
          </div>
          
          {/* Tabs */}
          <div className="flex overflow-x-auto bg-gray-100 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-white text-purple-600 border-b-2 border-purple-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          {/* Content */}
          <div className="p-6">
            {ActiveComponent && <ActiveComponent />}
          </div>
          
          {/* Footer */}
          <div className="bg-gray-50 border-t p-4 text-center">
            <p className="text-sm text-gray-600">
              🎯 Interact with the demos to understand how props and state work!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}