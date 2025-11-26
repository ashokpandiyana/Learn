import { useState, useEffect, useContext, useReducer, useCallback, useMemo, useRef, createContext, memo } from 'react';

// ============= useState DEMO =============
function UseStateDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  
  const incrementThreeWrong = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
  };
  
  const incrementThreeCorrect = () => {
    setCount(c => c + 1);
    setCount(c => c + 1);
    setCount(c => c + 1);
  };
  
  const addItem = () => {
    setItems(prev => [...prev, `Item ${prev.length + 1}`]);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">useState - State Management</h4>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          {/* Counter */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Counter: {count}</p>
            <div className="space-y-2">
              <button 
                onClick={() => setCount(count + 1)}
                className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm"
              >
                +1
              </button>
              <button 
                onClick={incrementThreeWrong}
                className="w-full px-2 py-1 bg-red-500 text-white rounded text-sm"
              >
                +3 (Wrong)
              </button>
              <button 
                onClick={incrementThreeCorrect}
                className="w-full px-2 py-1 bg-green-500 text-white rounded text-sm"
              >
                +3 (Correct)
              </button>
            </div>
          </div>
          
          {/* Input */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Text Input</p>
            <input 
              type="text"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Type name..."
              className="w-full px-2 py-1 border rounded text-sm mb-2"
            />
            <p className="text-xs text-gray-600">
              {name ? `Hello, ${name}!` : 'Enter your name'}
            </p>
          </div>
          
          {/* Array */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Array State</p>
            <button 
              onClick={addItem}
              className="w-full px-2 py-1 bg-purple-500 text-white rounded text-sm mb-2"
            >
              Add Item
            </button>
            <div className="max-h-20 overflow-y-auto text-xs space-y-1">
              {items.map((item, i) => (
                <div key={i} className="bg-gray-50 px-2 py-1 rounded">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-blue-100 rounded text-xs">
          <p className="font-semibold mb-1">Functional Updates:</p>
          <p>❌ <code>setCount(count + 1)</code> - Uses stale value</p>
          <p>✅ <code>setCount(c =&gt; c + 1)</code> - Always current</p>
        </div>
      </div>
    </div>
  );
}

// ============= useContext DEMO =============
const ThemeContext = createContext();

function UseContextDemo() {
  const [theme, setTheme] = useState('light');
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">useContext - Avoid Prop Drilling</h4>
        
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <div className="p-3 bg-white rounded border">
            <GrandParent />
          </div>
        </ThemeContext.Provider>
        
        <div className="mt-3 p-3 bg-purple-100 rounded text-xs">
          <p className="font-semibold mb-1">Context Benefits:</p>
          <p>✅ No prop drilling through intermediate components</p>
          <p>✅ Global state accessible anywhere in tree</p>
          <p>✅ Cleaner component APIs</p>
        </div>
      </div>
    </div>
  );
}

function GrandParent() {
  return (
    <div className="p-3 bg-gray-50 rounded">
      <p className="text-xs mb-2">GrandParent (no theme prop needed)</p>
      <Parent />
    </div>
  );
}

function Parent() {
  return (
    <div className="p-3 bg-gray-100 rounded">
      <p className="text-xs mb-2">Parent (no theme prop needed)</p>
      <Child />
    </div>
  );
}

function Child() {
  const { theme, setTheme } = useContext(ThemeContext);
  
  return (
    <div className={`p-3 rounded ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white'}`}>
      <p className="text-xs mb-2">Child (accesses context directly)</p>
      <p className="text-sm mb-2">Current theme: <strong>{theme}</strong></p>
      <button 
        onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
        className="px-3 py-1 bg-purple-500 text-white rounded text-sm"
      >
        Toggle Theme
      </button>
    </div>
  );
}

// ============= useReducer DEMO =============
function UseReducerDemo() {
  const initialState = {
    todos: [],
    filter: 'all'
  };
  
  function todoReducer(state, action) {
    switch (action.type) {
      case 'ADD_TODO':
        return {
          ...state,
          todos: [...state.todos, { id: Date.now(), text: action.payload, done: false }]
        };
      case 'TOGGLE_TODO':
        return {
          ...state,
          todos: state.todos.map(todo =>
            todo.id === action.payload ? { ...todo, done: !todo.done } : todo
          )
        };
      case 'DELETE_TODO':
        return {
          ...state,
          todos: state.todos.filter(todo => todo.id !== action.payload)
        };
      case 'SET_FILTER':
        return { ...state, filter: action.payload };
      default:
        return state;
    }
  }
  
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [input, setInput] = useState('');
  
  const addTodo = () => {
    if (input.trim()) {
      dispatch({ type: 'ADD_TODO', payload: input });
      setInput('');
    }
  };
  
  const filteredTodos = state.todos.filter(todo => {
    if (state.filter === 'active') return !todo.done;
    if (state.filter === 'completed') return todo.done;
    return true;
  });
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">useReducer - Complex State Logic</h4>
        
        <div className="mb-3 flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={e => e.key === 'Enter' && addTodo()}
            placeholder="Add todo..."
            className="flex-1 px-3 py-2 border rounded"
          />
          <button 
            onClick={addTodo}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Add
          </button>
        </div>
        
        <div className="mb-3 flex gap-2">
          {['all', 'active', 'completed'].map(filter => (
            <button 
              key={filter}
              onClick={() => dispatch({ type: 'SET_FILTER', payload: filter })}
              className={`px-3 py-1 rounded text-sm ${
                state.filter === filter 
                  ? 'bg-green-600 text-white' 
                  : 'bg-white border'
              }`}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </button>
          ))}
        </div>
        
        <div className="space-y-2 mb-3">
          {filteredTodos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-2 bg-white rounded">
              <input 
                type="checkbox"
                checked={todo.done}
                onChange={() => dispatch({ type: 'TOGGLE_TODO', payload: todo.id })}
              />
              <span className={`flex-1 text-sm ${todo.done ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <button 
                onClick={() => dispatch({ type: 'DELETE_TODO', payload: todo.id })}
                className="px-2 py-1 bg-red-500 text-white rounded text-xs"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-1">useReducer vs useState:</p>
          <p>✅ Use for complex state with multiple sub-values</p>
          <p>✅ Use when next state depends on previous</p>
          <p>✅ Better for testing (pure reducer function)</p>
        </div>
      </div>
    </div>
  );
}

// ============= useCallback/useMemo DEMO =============
const ExpensiveChild = memo(({ onClick, computedValue }) => {
  console.log('ExpensiveChild rendered');
  
  return (
    <div className="p-3 bg-white rounded border">
      <p className="text-sm mb-2">Expensive Child Component</p>
      <p className="text-xs text-gray-600 mb-2">Check console for render count</p>
      <p className="text-sm mb-2">Computed: {computedValue}</p>
      <button 
        onClick={onClick}
        className="px-3 py-1 bg-orange-500 text-white rounded text-sm"
      >
        Click Me
      </button>
    </div>
  );
});

function UseCallbackMemoDemo() {
  const [count, setCount] = useState(0);
  const [items, setItems] = useState([1, 2, 3, 4, 5]);
  const [multiplier, setMultiplier] = useState(1);
  
  // Without useCallback - new function every render
  const handleClickBad = () => {
    console.log('Clicked!');
  };
  
  // With useCallback - same function reference
  const handleClickGood = useCallback(() => {
    console.log('Clicked!');
  }, []);
  
  // Without useMemo - recalculates every render
  const expensiveCalculationBad = items.reduce((acc, item) => acc + item, 0) * multiplier;
  
  // With useMemo - only recalculates when dependencies change
  const expensiveCalculationGood = useMemo(() => {
    console.log('Calculating...');
    return items.reduce((acc, item) => acc + item, 0) * multiplier;
  }, [items, multiplier]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">useCallback & useMemo</h4>
        
        <div className="mb-4 p-3 bg-white rounded border">
          <p className="text-sm font-semibold mb-2">Controls</p>
          <div className="flex gap-2">
            <button 
              onClick={() => setCount(count + 1)}
              className="px-3 py-2 bg-orange-500 text-white rounded"
            >
              Count: {count}
            </button>
            <button 
              onClick={() => setMultiplier(multiplier + 1)}
              className="px-3 py-2 bg-purple-500 text-white rounded"
            >
              Multiplier: {multiplier}
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs font-semibold mb-2">Without Optimization</p>
            <ExpensiveChild 
              onClick={handleClickBad}
              computedValue={expensiveCalculationBad}
            />
            <p className="text-xs text-red-600 mt-1">Re-renders when count changes</p>
          </div>
          
          <div>
            <p className="text-xs font-semibold mb-2">With useCallback & useMemo</p>
            <ExpensiveChild 
              onClick={handleClickGood}
              computedValue={expensiveCalculationGood}
            />
            <p className="text-xs text-green-600 mt-1">Only re-renders when multiplier changes</p>
          </div>
        </div>
        
        <div className="p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-1">Key Differences:</p>
          <p>• <strong>useCallback</strong>: Memoizes functions</p>
          <p>• <strong>useMemo</strong>: Memoizes computed values</p>
          <p>• Both prevent unnecessary re-renders of child components</p>
        </div>
      </div>
    </div>
  );
}

// ============= useRef DEMO =============
function UseRefDemo() {
  const [count, setCount] = useState(0);
  const inputRef = useRef(null);
  const countRef = useRef(0);
  const renderCount = useRef(0);
  
  renderCount.current += 1;
  
  const focusInput = () => {
    inputRef.current.focus();
  };
  
  const selectInput = () => {
    inputRef.current.select();
  };
  
  const incrementRef = () => {
    countRef.current += 1;
    alert(`Ref count: ${countRef.current} (no re-render!)`);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">useRef - DOM & Mutable Values</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* DOM Reference */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">DOM Reference</p>
            <input 
              ref={inputRef}
              type="text"
              placeholder="Focus me..."
              className="w-full px-2 py-1 border rounded mb-2"
            />
            <div className="flex gap-2">
              <button 
                onClick={focusInput}
                className="flex-1 px-2 py-1 bg-pink-500 text-white rounded text-sm"
              >
                Focus
              </button>
              <button 
                onClick={selectInput}
                className="flex-1 px-2 py-1 bg-pink-500 text-white rounded text-sm"
              >
                Select
              </button>
            </div>
          </div>
          
          {/* Mutable Value */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Mutable Value</p>
            <p className="text-xs text-gray-600 mb-2">
              Render count: {renderCount.current}
            </p>
            <p className="text-xs text-gray-600 mb-2">
              State count: {count}
            </p>
            <div className="space-y-2">
              <button 
                onClick={() => setCount(count + 1)}
                className="w-full px-2 py-1 bg-green-500 text-white rounded text-sm"
              >
                Increment State (re-renders)
              </button>
              <button 
                onClick={incrementRef}
                className="w-full px-2 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Increment Ref (no re-render)
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">useRef vs useState:</p>
          <p>• <strong>useState</strong>: Triggers re-render when changed</p>
          <p>• <strong>useRef</strong>: Persists without triggering re-render</p>
          <p>• Perfect for: DOM refs, timers, previous values</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOKS DEMO =============
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
}

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  
  return { count, increment, decrement, reset };
}

function CustomHooksDemo() {
  const [isOn, toggleIsOn] = useToggle(false);
  const counter = useCounter(0);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Custom Hooks - Reusable Logic</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          {/* useToggle */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">useToggle</p>
            <button 
              onClick={toggleIsOn}
              className={`w-full px-4 py-2 rounded font-semibold ${
                isOn 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isOn ? '🟢 ON' : '⚫ OFF'}
            </button>
          </div>
          
          {/* useCounter */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">useCounter</p>
            <p className="text-2xl text-center font-bold mb-2">{counter.count}</p>
            <div className="grid grid-cols-3 gap-2">
              <button 
                onClick={counter.decrement}
                className="px-2 py-1 bg-red-500 text-white rounded text-sm"
              >
                -
              </button>
              <button 
                onClick={counter.reset}
                className="px-2 py-1 bg-gray-500 text-white rounded text-sm"
              >
                Reset
              </button>
              <button 
                onClick={counter.increment}
                className="px-2 py-1 bg-green-500 text-white rounded text-sm"
              >
                +
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-2">Custom Hook Benefits:</p>
          <p>✅ Reusable logic across components</p>
          <p>✅ Better code organization</p>
          <p>✅ Easier testing</p>
          <p>✅ Must start with "use" prefix</p>
        </div>
        
        <div className="mt-3 p-3 bg-white rounded border text-xs">
          <p className="font-semibold mb-2">Example: useToggle Implementation</p>
          <pre className="overflow-x-auto">
{`function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => {
    setValue(v => !v);
  }, []);
  
  return [value, toggle];
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= HOOKS RULES DEMO =============
function HooksRulesDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg">
        <h4 className="font-semibold mb-3">⚠️ Rules of Hooks</h4>
        
        <div className="space-y-4">
          {/* Rule 1 */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2 text-red-700">
              Rule 1: Only call at TOP LEVEL
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-2 bg-red-50 rounded">
                <p className="font-semibold mb-1">❌ Wrong:</p>
                <pre>
{`if (condition) {
  useState(0); // Don't!
}

for (let i = 0; i < 5; i++) {
  useEffect(() => {}); // Don't!
}`}
                </pre>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <p className="font-semibold mb-1">✅ Correct:</p>
                <pre>
{`const [count, setCount] = useState(0);

if (condition) {
  setCount(1); // This is fine
}

useEffect(() => {
  // Effect logic here
}, []);`}
                </pre>
              </div>
            </div>
          </div>
          
          {/* Rule 2 */}
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2 text-red-700">
              Rule 2: Only call from REACT FUNCTIONS
            </p>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="p-2 bg-red-50 rounded">
                <p className="font-semibold mb-1">❌ Wrong:</p>
                <pre>
{`function regularFunction() {
  useState(0); // Don't!
}

class MyClass {
  method() {
    useEffect(() => {}); // Don't!
  }
}`}
                </pre>
              </div>
              <div className="p-2 bg-green-50 rounded">
                <p className="font-semibold mb-1">✅ Correct:</p>
                <pre>
{`function MyComponent() {
  useState(0); // React component
}

function useCustomHook() {
  useState(0); // Custom hook
}`}
                </pre>
              </div>
            </div>
          </div>
          
          {/* Why? */}
          <div className="p-3 bg-yellow-50 rounded border border-yellow-300">
            <p className="text-sm font-semibold mb-2">Why These Rules?</p>
            <p className="text-xs mb-1">
              • React relies on hook call order to track state
            </p>
            <p className="text-xs mb-1">
              • Conditional hooks break the order
            </p>
            <p className="text-xs">
              • Always call hooks in the same order every render
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('useState');
  
  const tabs = [
    { id: 'useState', label: 'useState', component: UseStateDemo },
    { id: 'useContext', label: 'useContext', component: UseContextDemo },
    { id: 'useReducer', label: 'useReducer', component: UseReducerDemo },
    { id: 'optimization', label: 'useCallback/useMemo', component: UseCallbackMemoDemo },
    { id: 'useRef', label: 'useRef', component: UseRefDemo },
    { id: 'custom', label: 'Custom Hooks', component: CustomHooksDemo },
    { id: 'rules', label: 'Rules of Hooks', component: HooksRulesDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 5: Hooks Deep Dive</h1>
            <p className="text-blue-100">Interactive Demonstrations</p>
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
              🎯 Open console to see optimization effects and render counts!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}