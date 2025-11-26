import { useState, useEffect, useRef, createContext, useContext } from 'react';

// ============= HOC PATTERN DEMO =============
function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
      );
    }
    return <Component {...props} />;
  };
}

function UserList({ users }) {
  return (
    <ul className="space-y-2">
      {users.map(user => (
        <li key={user.id} className="p-2 bg-gray-50 rounded">
          {user.name} - {user.email}
        </li>
      ))}
    </ul>
  );
}

const UserListWithLoading = withLoading(UserList);

function HOCDemo() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setTimeout(() => {
      setUsers([
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Carol', email: 'carol@example.com' }
      ]);
      setIsLoading(false);
    }, 2000);
  }, []);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Higher-Order Components (HOC)</h4>
        
        <div className="p-4 bg-white rounded border mb-4">
          <p className="text-sm font-semibold mb-3">UserList enhanced with loading HOC:</p>
          <UserListWithLoading users={users} isLoading={isLoading} />
        </div>
        
        <button 
          onClick={() => {
            setIsLoading(true);
            setTimeout(() => setIsLoading(false), 2000);
          }}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Reload
        </button>
        
        <div className="mt-4 p-3 bg-blue-100 rounded text-xs">
          <p className="font-semibold mb-1">HOC Pattern:</p>
          <pre className="overflow-x-auto">
{`function withLoading(Component) {
  return function WithLoadingComponent({ isLoading, ...props }) {
    if (isLoading) return <Loading />;
    return <Component {...props} />;
  };
}

const Enhanced = withLoading(UserList);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= RENDER PROPS PATTERN DEMO =============
function MouseTracker({ render }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    });
  };
  
  return (
    <div 
      onMouseMove={handleMouseMove}
      className="relative h-48 border-2 border-purple-300 rounded bg-purple-50"
    >
      {render(position)}
    </div>
  );
}

function RenderPropsDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Render Props Pattern</h4>
        
        <MouseTracker 
          render={({ x, y }) => (
            <div>
              <div className="absolute top-2 left-2 text-sm bg-white px-2 py-1 rounded shadow">
                Position: ({x}, {y})
              </div>
              <div 
                className="absolute w-4 h-4 bg-purple-500 rounded-full transform -translate-x-1/2 -translate-y-1/2"
                style={{ left: x, top: y }}
              />
            </div>
          )}
        />
        
        <div className="mt-4 p-3 bg-purple-100 rounded text-xs">
          <p className="font-semibold mb-1">Render Props Pattern:</p>
          <pre className="overflow-x-auto">
{`<MouseTracker 
  render={({ x, y }) => (
    <div>Position: ({x}, {y})</div>
  )}
/>`}
          </pre>
          <p className="mt-2">Move your mouse over the box above!</p>
        </div>
      </div>
    </div>
  );
}

// ============= COMPOUND COMPONENTS PATTERN DEMO =============
const TabsContext = createContext();

function Tabs({ children, defaultTab = 0 }) {
  const [activeTab, setActiveTab] = useState(defaultTab);
  
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className="tabs">{children}</div>
    </TabsContext.Provider>
  );
}

function TabList({ children }) {
  return (
    <div className="flex gap-2 border-b border-gray-300 mb-4">
      {children}
    </div>
  );
}

function Tab({ index, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === index;
  
  return (
    <button
      onClick={() => setActiveTab(index)}
      className={`px-4 py-2 font-medium transition ${
        isActive 
          ? 'border-b-2 border-green-500 text-green-600' 
          : 'text-gray-600 hover:text-gray-800'
      }`}
    >
      {children}
    </button>
  );
}

function TabPanels({ children }) {
  return <div>{children}</div>;
}

function TabPanel({ index, children }) {
  const { activeTab } = useContext(TabsContext);
  
  if (activeTab !== index) return null;
  
  return <div className="p-4 bg-white rounded border">{children}</div>;
}

Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

function CompoundComponentsDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">Compound Components Pattern</h4>
        
        <Tabs defaultTab={0}>
          <Tabs.List>
            <Tabs.Tab index={0}>Profile</Tabs.Tab>
            <Tabs.Tab index={1}>Settings</Tabs.Tab>
            <Tabs.Tab index={2}>Notifications</Tabs.Tab>
          </Tabs.List>
          
          <Tabs.Panels>
            <Tabs.Panel index={0}>
              <h3 className="font-semibold mb-2">Profile Information</h3>
              <p className="text-sm text-gray-600">Your profile details and bio.</p>
            </Tabs.Panel>
            <Tabs.Panel index={1}>
              <h3 className="font-semibold mb-2">Settings</h3>
              <p className="text-sm text-gray-600">Configure your account settings.</p>
            </Tabs.Panel>
            <Tabs.Panel index={2}>
              <h3 className="font-semibold mb-2">Notifications</h3>
              <p className="text-sm text-gray-600">Manage your notification preferences.</p>
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
        
        <div className="mt-4 p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-1">Compound Components:</p>
          <pre className="overflow-x-auto">
{`<Tabs>
  <Tabs.List>
    <Tabs.Tab index={0}>Tab 1</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panels>
    <Tabs.Panel index={0}>Content 1</Tabs.Panel>
  </Tabs.Panels>
</Tabs>`}
          </pre>
          <p className="mt-2">Components work together via Context!</p>
        </div>
      </div>
    </div>
  );
}

// ============= CONTROLLED VS UNCONTROLLED DEMO =============
function ControlledVsUncontrolledDemo() {
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledRef = useRef(null);
  const [uncontrolledDisplay, setUncontrolledDisplay] = useState('');
  
  const getUncontrolledValue = () => {
    setUncontrolledDisplay(uncontrolledRef.current.value);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Controlled vs Uncontrolled Components</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* Controlled */}
          <div className="p-4 bg-white rounded border">
            <p className="text-sm font-semibold mb-2 text-green-600">
              ✅ Controlled Component
            </p>
            <input 
              type="text"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              placeholder="Controlled input..."
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="text-xs space-y-1 p-2 bg-green-50 rounded">
              <p><strong>Value:</strong> {controlledValue}</p>
              <p><strong>Length:</strong> {controlledValue.length}</p>
              <p><strong>Uppercase:</strong> {controlledValue.toUpperCase()}</p>
            </div>
            <button 
              onClick={() => setControlledValue('')}
              className="mt-2 w-full px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Clear (via setState)
            </button>
          </div>
          
          {/* Uncontrolled */}
          <div className="p-4 bg-white rounded border">
            <p className="text-sm font-semibold mb-2 text-blue-600">
              🔵 Uncontrolled Component
            </p>
            <input 
              ref={uncontrolledRef}
              type="text"
              defaultValue=""
              placeholder="Uncontrolled input..."
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="text-xs space-y-1 p-2 bg-blue-50 rounded">
              <p><strong>Value:</strong> {uncontrolledDisplay || '(click Get Value)'}</p>
              <p className="text-gray-600">Access via ref.current.value</p>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-2">
              <button 
                onClick={getUncontrolledValue}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Get Value
              </button>
              <button 
                onClick={() => {
                  uncontrolledRef.current.value = '';
                  setUncontrolledDisplay('');
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Clear
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-1">Key Differences:</p>
          <p>• <strong>Controlled:</strong> React state manages value (real-time updates)</p>
          <p>• <strong>Uncontrolled:</strong> DOM manages value (access via ref)</p>
          <p>• Use controlled for most forms (validation, real-time feedback)</p>
        </div>
      </div>
    </div>
  );
}

// ============= CONTAINER/PRESENTATIONAL PATTERN DEMO =============
function TodoListContainer() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Patterns', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ]);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: input,
        completed: false
      }]);
      setInput('');
    }
  };
  
  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };
  
  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };
  
  return (
    <TodoListPresentation 
      todos={todos}
      input={input}
      onInputChange={setInput}
      onAdd={addTodo}
      onToggle={toggleTodo}
      onDelete={deleteTodo}
    />
  );
}

function TodoListPresentation({ 
  todos, 
  input, 
  onInputChange, 
  onAdd, 
  onToggle, 
  onDelete 
}) {
  return (
    <div className="p-4 bg-white rounded border">
      <div className="flex gap-2 mb-4">
        <input 
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && onAdd()}
          placeholder="Add new todo..."
          className="flex-1 px-3 py-2 border rounded"
        />
        <button 
          onClick={onAdd}
          className="px-4 py-2 bg-pink-500 text-white rounded"
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-2">
        {todos.map(todo => (
          <li key={todo.id} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
            <input 
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
            />
            <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
              {todo.text}
            </span>
            <button 
              onClick={() => onDelete(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-xs"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ContainerPresentationalDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Container/Presentational Pattern</h4>
        
        <TodoListContainer />
        
        <div className="mt-4 p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">Pattern Structure:</p>
          <p>• <strong>Container:</strong> Logic, state, effects (TodoListContainer)</p>
          <p>• <strong>Presentational:</strong> Pure UI, props only (TodoListPresentation)</p>
          <p className="mt-2">Benefits: Separation of concerns, reusability, testability</p>
        </div>
      </div>
    </div>
  );
}

// ============= COMPONENT COMPOSITION DEMO =============
function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

function CardHeader({ children }) {
  return (
    <div className="px-4 py-3 bg-indigo-500 text-white font-semibold">
      {children}
    </div>
  );
}

function CardBody({ children }) {
  return (
    <div className="p-4">
      {children}
    </div>
  );
}

function CardFooter({ children }) {
  return (
    <div className="px-4 py-3 bg-gray-50 border-t">
      {children}
    </div>
  );
}

function CompositionDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Component Composition Pattern</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <Card>
            <CardHeader>User Profile</CardHeader>
            <CardBody>
              <p className="text-sm mb-2"><strong>Name:</strong> John Doe</p>
              <p className="text-sm mb-2"><strong>Email:</strong> john@example.com</p>
              <p className="text-sm"><strong>Role:</strong> Developer</p>
            </CardBody>
            <CardFooter>
              <button className="px-3 py-1 bg-indigo-500 text-white rounded text-sm">
                Edit Profile
              </button>
            </CardFooter>
          </Card>
          
          <Card>
            <CardHeader>Statistics</CardHeader>
            <CardBody>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Posts:</span>
                  <span className="font-bold">142</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Followers:</span>
                  <span className="font-bold">1,234</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Following:</span>
                  <span className="font-bold">567</span>
                </div>
              </div>
            </CardBody>
            <CardFooter>
              <button className="px-3 py-1 bg-indigo-500 text-white rounded text-sm">
                View Details
              </button>
            </CardFooter>
          </Card>
        </div>
        
        <div className="p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-1">Composition Pattern:</p>
          <pre className="overflow-x-auto">
{`<Card>
  <CardHeader>Title</CardHeader>
  <CardBody>Content</CardBody>
  <CardFooter>Actions</CardFooter>
</Card>`}
          </pre>
          <p className="mt-2">Build complex UIs from simple, composable pieces!</p>
        </div>
      </div>
    </div>
  );
}

// ============= COMPARISON DEMO =============
function ComparisonDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-teal-50 rounded-lg">
        <h4 className="font-semibold mb-3">Pattern Comparison</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="p-2 text-left border">Pattern</th>
                <th className="p-2 text-left border">Use Case</th>
                <th className="p-2 text-left border">Modern Alternative</th>
                <th className="p-2 text-left border">Status</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr>
                <td className="p-2 border font-semibold">HOC</td>
                <td className="p-2 border">Add behavior to components</td>
                <td className="p-2 border">Custom Hooks</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-200 rounded text-xs">Legacy</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Render Props</td>
                <td className="p-2 border">Share stateful logic</td>
                <td className="p-2 border">Custom Hooks</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-200 rounded text-xs">Legacy</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Compound Components</td>
                <td className="p-2 border">Complex UI widgets</td>
                <td className="p-2 border">-</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded text-xs">Modern</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Controlled</td>
                <td className="p-2 border">Form inputs with validation</td>
                <td className="p-2 border">-</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded text-xs">Modern</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Container/Presentational</td>
                <td className="p-2 border">Separate logic from UI</td>
                <td className="p-2 border">Custom Hooks</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-200 rounded text-xs">Replaced</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Composition</td>
                <td className="p-2 border">Build complex UIs</td>
                <td className="p-2 border">-</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded text-xs">Core</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-teal-100 rounded text-xs space-y-2">
          <p><strong className="text-green-700">✅ Still Relevant:</strong> Compound Components, Composition, Controlled Components</p>
          <p><strong className="text-yellow-700">⚠️ Legacy (but in interviews):</strong> HOC, Render Props, Container/Presentational</p>
          <p><strong className="text-blue-700">💡 Modern Approach:</strong> Custom Hooks + Composition</p>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('hoc');
  
  const tabs = [
    { id: 'hoc', label: 'HOC', component: HOCDemo },
    { id: 'renderProps', label: 'Render Props', component: RenderPropsDemo },
    { id: 'compound', label: 'Compound', component: CompoundComponentsDemo },
    { id: 'controlled', label: 'Controlled vs Uncontrolled', component: ControlledVsUncontrolledDemo },
    { id: 'container', label: 'Container/Presentational', component: ContainerPresentationalDemo },
    { id: 'composition', label: 'Composition', component: CompositionDemo },
    { id: 'comparison', label: 'Pattern Comparison', component: ComparisonDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 7: Component Patterns</h1>
            <p className="text-blue-100">Design Patterns for React Components</p>
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
              🎯 Modern React favors Hooks + Composition, but knowing patterns helps in interviews!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}