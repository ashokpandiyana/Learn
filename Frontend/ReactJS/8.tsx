import { useState, useReducer, createContext, useContext, useMemo, useCallback } from 'react';

// ============= LOCAL STATE DEMO =============
function LocalStateDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState(['Item 1', 'Item 2']);
  const [input, setInput] = useState('');
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Component Local State (useState)</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Simple Counter</p>
            <div className="text-center mb-3">
              <span className="text-4xl font-bold text-blue-600">{count}</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => setCount(count - 1)}
                className="px-3 py-2 bg-red-500 text-white rounded"
              >
                -
              </button>
              <button 
                onClick={() => setCount(count + 1)}
                className="px-3 py-2 bg-green-500 text-white rounded"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">List Management</p>
            <div className="flex gap-2 mb-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Add item..."
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <button 
                onClick={() => {
                  if (input.trim()) {
                    setItems([...items, input]);
                    setInput('');
                  }
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Add
              </button>
            </div>
            <ul className="text-sm space-y-1">
              {items.map((item, i) => (
                <li key={i} className="flex justify-between items-center p-1 bg-gray-50 rounded">
                  <span>{item}</span>
                  <button 
                    onClick={() => setItems(items.filter((_, index) => index !== i))}
                    className="px-2 py-0.5 bg-red-500 text-white rounded text-xs"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-3 bg-blue-100 rounded text-xs">
          <p className="font-semibold mb-1">When to use local state:</p>
          <p>✅ State only needed in this component</p>
          <p>✅ Simple data (counters, toggles, form inputs)</p>
          <p>✅ No sharing needed with other components</p>
        </div>
      </div>
    </div>
  );
}

// ============= LIFTED STATE DEMO =============
function LiftedStateDemo() {
  const [sharedValue, setSharedValue] = useState('');
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Lifted State Pattern</h4>
        
        <div className="p-3 bg-white rounded border mb-4">
          <p className="text-xs text-gray-600 mb-2">Parent Component (manages state)</p>
          <p className="text-sm mb-2">Shared Value: <strong>{sharedValue || '(empty)'}</strong></p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-purple-100 rounded border border-purple-300">
            <p className="text-xs font-semibold mb-2">Child A (can write)</p>
            <input 
              type="text"
              value={sharedValue}
              onChange={(e) => setSharedValue(e.target.value)}
              placeholder="Type here..."
              className="w-full px-2 py-1 border rounded text-sm"
            />
          </div>
          
          <div className="p-3 bg-purple-100 rounded border border-purple-300">
            <p className="text-xs font-semibold mb-2">Child B (can read)</p>
            <div className="p-2 bg-white rounded border text-sm">
              {sharedValue || '(waiting for input...)'}
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-purple-200 rounded text-xs">
          <p className="font-semibold mb-1">Lifted State Pattern:</p>
          <pre className="overflow-x-auto">
{`function Parent() {
  const [shared, setShared] = useState('');
  
  return (
    <>
      <ChildA data={shared} setData={setShared} />
      <ChildB data={shared} />
    </>
  );
}`}
          </pre>
          <p className="mt-2">Use when siblings need to share state</p>
        </div>
      </div>
    </div>
  );
}

// ============= CONTEXT API DEMO =============
const ThemeContext = createContext();
const UserContext = createContext();

function ContextAPIDemo() {
  const [theme, setTheme] = useState('light');
  const [user, setUser] = useState({ name: 'Guest', role: 'visitor' });
  
  const themeValue = useMemo(() => ({
    theme,
    toggleTheme: () => setTheme(t => t === 'light' ? 'dark' : 'light')
  }), [theme]);
  
  const userValue = useMemo(() => ({
    user,
    updateUser: (newUser) => setUser(newUser)
  }), [user]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">Context API - Global State</h4>
        
        <ThemeContext.Provider value={themeValue}>
          <UserContext.Provider value={userValue}>
            <div className="space-y-3">
              <ContextConsumer1 />
              <ContextConsumer2 />
              <ContextConsumer3 />
            </div>
          </UserContext.Provider>
        </ThemeContext.Provider>
        
        <div className="mt-4 p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-1">Context API Benefits:</p>
          <p>✅ No prop drilling through intermediate components</p>
          <p>✅ Built into React (no external library)</p>
          <p>⚠️ All consumers re-render on context change</p>
          <p className="mt-2"><strong>Best for:</strong> Theme, auth, language (infrequent updates)</p>
        </div>
      </div>
    </div>
  );
}

function ContextConsumer1() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  return (
    <div className={`p-3 rounded border ${
      theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'
    }`}>
      <p className="text-sm mb-2">Component 1 - Theme Consumer</p>
      <button 
        onClick={toggleTheme}
        className="px-3 py-1 bg-green-500 text-white rounded text-sm"
      >
        Current: {theme} (Click to toggle)
      </button>
    </div>
  );
}

function ContextConsumer2() {
  const { user, updateUser } = useContext(UserContext);
  
  return (
    <div className="p-3 bg-white rounded border">
      <p className="text-sm mb-2">Component 2 - User Consumer</p>
      <p className="text-xs mb-2">Name: <strong>{user.name}</strong></p>
      <button 
        onClick={() => updateUser({ name: 'John Doe', role: 'admin' })}
        className="px-3 py-1 bg-blue-500 text-white rounded text-sm mr-2"
      >
        Set Admin
      </button>
      <button 
        onClick={() => updateUser({ name: 'Guest', role: 'visitor' })}
        className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
      >
        Reset
      </button>
    </div>
  );
}

function ContextConsumer3() {
  const { theme } = useContext(ThemeContext);
  const { user } = useContext(UserContext);
  
  return (
    <div className={`p-3 rounded border ${
      theme === 'dark' ? 'bg-gray-800 text-white border-gray-600' : 'bg-white border-gray-300'
    }`}>
      <p className="text-sm">Component 3 - Both Contexts</p>
      <p className="text-xs">Welcome <strong>{user.name}</strong> ({user.role})</p>
      <p className="text-xs">Theme: <strong>{theme}</strong></p>
    </div>
  );
}

// ============= REDUX-LIKE PATTERN DEMO =============
function ReduxLikeDemo() {
  const initialState = {
    count: 0,
    todos: [],
    filter: 'all'
  };
  
  function reducer(state, action) {
    switch (action.type) {
      case 'INCREMENT':
        return { ...state, count: state.count + 1 };
      case 'DECREMENT':
        return { ...state, count: state.count - 1 };
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }]
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(t => 
            t.id === action.payload ? { ...t, done: !t.done } : t
          )
        };
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
      default:
        return state;
    }
  }
  
  const [state, dispatch] = useReducer(reducer, initialState);
  const [input, setInput] = useState('');
  
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.done;
    if (state.filter === 'completed') return todo.done;
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Redux-like Pattern (useReducer)</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Counter (Redux actions)</p>
            <div className="text-center mb-3">
              <span className="text-4xl font-bold text-orange-600">{state.count}</span>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => dispatch({ type: 'DECREMENT' })}
                className="flex-1 px-3 py-2 bg-red-500 text-white rounded"
              >
                -
              </button>
              <button 
                onClick={() => dispatch({ type: 'INCREMENT' })}
                className="flex-1 px-3 py-2 bg-green-500 text-white rounded"
              >
                +
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Todo List</p>
            <div className="flex gap-2 mb-2">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && input.trim()) {
                    dispatch({ type: 'ADD_TODO', payload: input });
                    setInput('');
                  }
                }}
                placeholder="Add todo..."
                className="flex-1 px-2 py-1 border rounded text-sm"
              />
              <button 
                onClick={() => {
                  if (input.trim()) {
                    dispatch({ type: 'ADD_TODO', payload: input });
                    setInput('');
                  }
                }}
                className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
              >
                Add
              </button>
            </div>
            
            <div className="flex gap-2 mb-2">
              {['all', 'active', 'completed'].map(filter => (
                <button 
                  key={filter}
                  onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
                  className={`px-2 py-1 rounded text-xs ${
                    state.filter === filter 
                      ? 'bg-orange-600 text-white' 
                      : 'bg-gray-200'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
            
            <ul className="space-y-1 max-h-32 overflow-y-auto">
              {filteredTodos.map(todo => (
                <li key={todo.id} className="flex items-center gap-2 text-sm p-1 bg-gray-50 rounded">
                  <input 
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
                  />
                  <span className={todo.done ? 'line-through text-gray-500' : ''}>
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-1">Redux Pattern with useReducer:</p>
          <pre className="overflow-x-auto">
{`const [state, dispatch] = useReducer(reducer, initialState);

// Dispatch actions
dispatch({ type: 'INCREMENT' });
dispatch({ type: 'ADD_TODO', payload: text });`}
          </pre>
          <p className="mt-2">Good for: Complex state with multiple related actions</p>
        </div>
      </div>
    </div>
  );
}

// ============= ZUSTAND-LIKE DEMO =============
function createStore(initializer) {
  let state;
  const listeners = new Set();
  
  const setState = (partial) => {
    const newState = typeof partial === 'function' ? partial(state) : partial;
    state = { ...state, ...newState };
    listeners.forEach(listener => listener());
  };
  
  const getState = () => state;
  
  const subscribe = (listener) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  };
  
  state = initializer(setState, getState);
  
  return { getState, setState, subscribe };
}

function useStore(store, selector) {
  const [, forceUpdate] = useState({});
  
  const selectedState = selector(store.getState());
  
  useState(() => {
    return store.subscribe(() => {
      forceUpdate({});
    });
  });
  
  return selectedState;
}

// Create store (Zustand-like)
const counterStore = createStore((set, get) => ({
  count: 0,
  increment: () => set({ count: get().count + 1 }),
  decrement: () => set({ count: get().count - 1 }),
  reset: () => set({ count: 0 })
}));

function ZustandLikeDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Zustand-like Pattern (Simple Global State)</h4>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <ZustandCounter title="Counter 1" />
          <ZustandCounter title="Counter 2" />
          <ZustandCounter title="Counter 3" />
        </div>
        
        <div className="p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">All counters share the same state!</p>
          <p className="mt-2">Zustand Benefits:</p>
          <p>✅ No Provider needed</p>
          <p>✅ Minimal boilerplate</p>
          <p>✅ Simple API</p>
          <p>✅ Great performance</p>
        </div>
      </div>
    </div>
  );
}

function ZustandCounter({ title }) {
  const count = useStore(counterStore, state => state.count);
  const increment = useStore(counterStore, state => state.increment);
  const decrement = useStore(counterStore, state => state.decrement);
  const reset = useStore(counterStore, state => state.reset);
  
  return (
    <div className="p-3 bg-white rounded border">
      <p className="text-xs font-semibold mb-2">{title}</p>
      <p className="text-2xl text-center font-bold mb-2">{count}</p>
      <div className="grid grid-cols-3 gap-1">
        <button onClick={decrement} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
          -
        </button>
        <button onClick={reset} className="px-2 py-1 bg-gray-500 text-white rounded text-xs">
          0
        </button>
        <button onClick={increment} className="px-2 py-1 bg-green-500 text-white rounded text-xs">
          +
        </button>
      </div>
    </div>
  );
}

// ============= COMPARISON DEMO =============
function ComparisonDemo() {
  const scenarios = [
    {
      scenario: 'Button click counter',
      solution: 'useState',
      reason: 'Local state, no sharing needed',
      color: 'blue'
    },
    {
      scenario: 'User authentication',
      solution: 'Context API',
      reason: 'Global, infrequent updates',
      color: 'green'
    },
    {
      scenario: 'Shopping cart',
      solution: 'Zustand / Redux',
      reason: 'Global, frequent updates, complex logic',
      color: 'purple'
    },
    {
      scenario: 'Form input values',
      solution: 'useState',
      reason: 'Local to form component',
      color: 'blue'
    },
    {
      scenario: 'Theme (dark/light)',
      solution: 'Context API',
      reason: 'Global, infrequent changes',
      color: 'green'
    },
    {
      scenario: 'API data (users list)',
      solution: 'React Query / SWR',
      reason: 'Server state, caching needed',
      color: 'orange'
    },
    {
      scenario: 'Dashboard filters',
      solution: 'useState or Zustand',
      reason: 'Could be local or global depending on scope',
      color: 'pink'
    },
    {
      scenario: 'Complex e-commerce app',
      solution: 'Redux Toolkit',
      reason: 'Large app, time-travel debugging, middleware',
      color: 'red'
    }
  ];
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">State Management Decision Guide</h4>
        
        <div className="space-y-2">
          {scenarios.map((item, i) => (
            <div key={i} className="p-3 bg-white rounded border">
              <div className="flex justify-between items-start mb-1">
                <p className="text-sm font-semibold">{item.scenario}</p>
                <span className={`px-2 py-0.5 bg-${item.color}-500 text-white rounded text-xs font-semibold`}>
                  {item.solution}
                </span>
              </div>
              <p className="text-xs text-gray-600">{item.reason}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-2">Decision Flow:</p>
          <div className="space-y-1 pl-2">
            <p>1. Is it local to one component? → <strong>useState</strong></p>
            <p>2. Is it server data? → <strong>React Query / SWR</strong></p>
            <p>3. Is it global with rare updates? → <strong>Context API</strong></p>
            <p>4. Is it global with frequent updates? → <strong>Zustand</strong></p>
            <p>5. Is it a large complex app? → <strong>Redux Toolkit</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= FEATURE COMPARISON =============
function FeatureComparisonDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-teal-50 rounded-lg">
        <h4 className="font-semibold mb-3">State Management Solutions Comparison</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse bg-white">
            <thead>
              <tr className="bg-teal-600 text-white">
                <th className="p-2 text-left border">Solution</th>
                <th className="p-2 text-left border">Boilerplate</th>
                <th className="p-2 text-left border">Learning Curve</th>
                <th className="p-2 text-left border">Bundle Size</th>
                <th className="p-2 text-left border">DevTools</th>
                <th className="p-2 text-left border">Best For</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 border font-semibold">useState</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">None</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
                </td>
                <td className="p-2 border">0 KB</td>
                <td className="p-2 border">✅ React DevTools</td>
                <td className="p-2 border">Local state</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border font-semibold">Context API</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Low</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
                </td>
                <td className="p-2 border">0 KB</td>
                <td className="p-2 border">❌</td>
                <td className="p-2 border">Simple global state</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border font-semibold">Redux Toolkit</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Moderate</span>
                </td>
                <td className="p-2 border">~12 KB</td>
                <td className="p-2 border">✅ Excellent</td>
                <td className="p-2 border">Large apps</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border font-semibold">Zustand</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Very Low</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
                </td>
                <td className="p-2 border">~1 KB</td>
                <td className="p-2 border">❌</td>
                <td className="p-2 border">Most apps</td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border font-semibold">Recoil</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Medium</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">Moderate</span>
                </td>
                <td className="p-2 border">~21 KB</td>
                <td className="p-2 border">❌</td>
                <td className="p-2 border">Facebook-style apps</td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Jotai</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Very Low</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Easy</span>
                </td>
                <td className="p-2 border">~3 KB</td>
                <td className="p-2 border">❌</td>
                <td className="p-2 border">Atomic state</td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-teal-100 rounded text-xs space-y-2">
          <p className="font-semibold">Recommendations:</p>
          <p><strong>Small Projects:</strong> useState + Context API</p>
          <p><strong>Medium Projects:</strong> Zustand (my top pick!)</p>
          <p><strong>Large Projects:</strong> Redux Toolkit (if you need DevTools)</p>
          <p><strong>Server Data:</strong> Always use React Query or SWR</p>
        </div>
      </div>
    </div>
  );
}

// ============= DECISION TREE VISUAL =============
function DecisionTreeDemo() {
  const [answers, setAnswers] = useState({
    q1: null,
    q2: null,
    q3: null,
    q4: null
  });
  
  const resetQuiz = () => {
    setAnswers({ q1: null, q2: null, q3: null, q4: null });
  };
  
  const getRecommendation = () => {
    if (answers.q1 === 'yes') return 'useState or useReducer';
    if (answers.q2 === 'yes') return 'React Query or SWR';
    if (answers.q3 === 'yes') return 'Context API';
    if (answers.q4 === 'large') return 'Redux Toolkit';
    if (answers.q4 === 'medium') return 'Zustand or Jotai';
    if (answers.q4 === 'small') return 'Context API';
    return null;
  };
  
  const recommendation = getRecommendation();
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-cyan-50 rounded-lg">
        <h4 className="font-semibold mb-3">State Management Decision Tree</h4>
        
        <div className="space-y-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Q1: Is state local to one component?</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setAnswers({ ...answers, q1: 'yes' })}
                className={`flex-1 px-3 py-2 rounded ${
                  answers.q1 === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button 
                onClick={() => setAnswers({ ...answers, q1: 'no', q2: null, q3: null, q4: null })}
                className={`flex-1 px-3 py-2 rounded ${
                  answers.q1 === 'no' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>
          
          {answers.q1 === 'no' && (
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-semibold mb-2">Q2: Is it server data (from API)?</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setAnswers({ ...answers, q2: 'yes' })}
                  className={`flex-1 px-3 py-2 rounded ${
                    answers.q2 === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setAnswers({ ...answers, q2: 'no', q3: null, q4: null })}
                  className={`flex-1 px-3 py-2 rounded ${
                    answers.q2 === 'no' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          )}
          
          {answers.q1 === 'no' && answers.q2 === 'no' && (
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-semibold mb-2">Q3: Does state update infrequently?</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setAnswers({ ...answers, q3: 'yes' })}
                  className={`flex-1 px-3 py-2 rounded ${
                    answers.q3 === 'yes' ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Yes (theme, auth)
                </button>
                <button 
                  onClick={() => setAnswers({ ...answers, q3: 'no', q4: null })}
                  className={`flex-1 px-3 py-2 rounded ${
                    answers.q3 === 'no' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  No (frequent)
                </button>
              </div>
            </div>
          )}
          
          {answers.q1 === 'no' && answers.q2 === 'no' && answers.q3 === 'no' && (
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-semibold mb-2">Q4: What's your app size?</p>
              <div className="grid grid-cols-3 gap-2">
                <button 
                  onClick={() => setAnswers({ ...answers, q4: 'small' })}
                  className={`px-3 py-2 rounded ${
                    answers.q4 === 'small' ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Small
                </button>
                <button 
                  onClick={() => setAnswers({ ...answers, q4: 'medium' })}
                  className={`px-3 py-2 rounded ${
                    answers.q4 === 'medium' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Medium
                </button>
                <button 
                  onClick={() => setAnswers({ ...answers, q4: 'large' })}
                  className={`px-3 py-2 rounded ${
                    answers.q4 === 'large' ? 'bg-purple-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Large
                </button>
              </div>
            </div>
          )}
        </div>
        
        {recommendation && (
          <div className="mt-4 p-4 bg-cyan-500 text-white rounded-lg">
            <p className="text-sm font-semibold mb-1">✨ Recommendation:</p>
            <p className="text-2xl font-bold">{recommendation}</p>
            <button 
              onClick={resetQuiz}
              className="mt-3 px-4 py-2 bg-white text-cyan-600 rounded font-semibold"
            >
              Start Over
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('local');
  
  const tabs = [
    { id: 'local', label: 'Local State', component: LocalStateDemo },
    { id: 'lifted', label: 'Lifted State', component: LiftedStateDemo },
    { id: 'context', label: 'Context API', component: ContextAPIDemo },
    { id: 'redux', label: 'Redux-like', component: ReduxLikeDemo },
    { id: 'zustand', label: 'Zustand-like', component: ZustandLikeDemo },
    { id: 'comparison', label: 'Scenarios', component: ComparisonDemo },
    { id: 'features', label: 'Feature Comparison', component: FeatureComparisonDemo },
    { id: 'decision', label: 'Decision Tree', component: DecisionTreeDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 8: State Management</h1>
            <p className="text-blue-100">Choosing the Right Solution</p>
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
              🎯 Start simple with useState, scale up only when needed!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}