import { useState, useEffect, useCallback, useRef } from 'react';

// ============= CUSTOM HOOK: useToggle =============
function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return [value, toggle, setTrue, setFalse];
}

function UseToggleDemo() {
  const [isOn, toggle, turnOn, turnOff] = useToggle(false);
  const [isModalOpen, toggleModal] = useToggle(false);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">useToggle - Boolean State Management</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Switch Example</p>
            <button 
              onClick={toggle}
              className={`w-full px-4 py-2 rounded font-semibold transition ${
                isOn 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-300 text-gray-700'
              }`}
            >
              {isOn ? '🟢 ON' : '⚫ OFF'}
            </button>
            <div className="flex gap-2 mt-2">
              <button onClick={turnOn} className="flex-1 px-2 py-1 bg-green-500 text-white rounded text-sm">
                Turn ON
              </button>
              <button onClick={turnOff} className="flex-1 px-2 py-1 bg-red-500 text-white rounded text-sm">
                Turn OFF
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Modal Example</p>
            <button 
              onClick={toggleModal}
              className="w-full px-4 py-2 bg-blue-500 text-white rounded"
            >
              {isModalOpen ? 'Close Modal' : 'Open Modal'}
            </button>
            {isModalOpen && (
              <div className="mt-2 p-3 bg-blue-100 rounded border border-blue-300">
                <p className="text-sm">🎉 Modal is open!</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-3 bg-blue-100 rounded text-xs">
          <pre className="overflow-x-auto">
{`function useToggle(initialValue = false) {
  const [value, setValue] = useState(initialValue);
  
  const toggle = useCallback(() => setValue(v => !v), []);
  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  
  return [value, toggle, setTrue, setFalse];
}

// Usage:
const [isOn, toggle, turnOn, turnOff] = useToggle(false);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOK: useCounter =============
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  
  const increment = useCallback(() => setCount(c => c + 1), []);
  const decrement = useCallback(() => setCount(c => c - 1), []);
  const reset = useCallback(() => setCount(initialValue), [initialValue]);
  const set = useCallback((value) => setCount(value), []);
  
  return { count, increment, decrement, reset, set };
}

function UseCounterDemo() {
  const counter1 = useCounter(0);
  const counter2 = useCounter(10);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">useCounter - Advanced Counter Logic</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Counter 1 (starts at 0)</p>
            <p className="text-3xl font-bold text-center mb-3">{counter1.count}</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={counter1.decrement} className="px-3 py-2 bg-red-500 text-white rounded">
                -1
              </button>
              <button onClick={counter1.increment} className="px-3 py-2 bg-green-500 text-white rounded">
                +1
              </button>
              <button onClick={counter1.reset} className="px-3 py-2 bg-gray-500 text-white rounded">
                Reset
              </button>
              <button onClick={() => counter1.set(100)} className="px-3 py-2 bg-blue-500 text-white rounded">
                Set 100
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Counter 2 (starts at 10)</p>
            <p className="text-3xl font-bold text-center mb-3">{counter2.count}</p>
            <div className="grid grid-cols-2 gap-2">
              <button onClick={counter2.decrement} className="px-3 py-2 bg-red-500 text-white rounded">
                -1
              </button>
              <button onClick={counter2.increment} className="px-3 py-2 bg-green-500 text-white rounded">
                +1
              </button>
              <button onClick={counter2.reset} className="px-3 py-2 bg-gray-500 text-white rounded">
                Reset
              </button>
              <button onClick={() => counter2.set(50)} className="px-3 py-2 bg-blue-500 text-white rounded">
                Set 50
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-purple-100 rounded text-xs">
          <p className="font-semibold mb-1">Benefits:</p>
          <p>✅ Reusable counter logic</p>
          <p>✅ Multiple counters with independent state</p>
          <p>✅ Clean API with multiple operations</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOK: useDebounce =============
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debouncedValue;
}

function UseDebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [searchCount, setSearchCount] = useState(0);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      setSearchCount(prev => prev + 1);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">useDebounce - Delay Value Updates</h4>
        
        <div className="mb-4">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search (500ms delay)..."
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-green-500 focus:outline-none"
          />
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-xs font-semibold mb-1">Immediate Value</p>
            <p className="text-sm text-gray-700">{searchTerm || '(empty)'}</p>
            <p className="text-xs text-gray-500 mt-1">Updates instantly</p>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-xs font-semibold mb-1">Debounced Value</p>
            <p className="text-sm text-green-600">{debouncedSearchTerm || '(empty)'}</p>
            <p className="text-xs text-gray-500 mt-1">Updates after 500ms</p>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-xs font-semibold mb-1">API Calls Made</p>
            <p className="text-2xl font-bold text-green-600">{searchCount}</p>
            <p className="text-xs text-gray-500 mt-1">Saved calls!</p>
          </div>
        </div>
        
        <div className="p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-1">Use Cases:</p>
          <p>• Search inputs (avoid API call on every keystroke)</p>
          <p>• Autosave features</p>
          <p>• Window resize handlers</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOK: useInterval =============
function useInterval(callback, delay) {
  const savedCallback = useRef();
  
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);
  
  useEffect(() => {
    if (delay !== null) {
      const id = setInterval(() => savedCallback.current(), delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

function UseIntervalDemo() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [countdown, setCountdown] = useState(10);
  
  useInterval(() => {
    setSeconds(s => s + 1);
  }, isRunning ? 1000 : null);
  
  useInterval(() => {
    if (countdown > 0) {
      setCountdown(c => c - 1);
    }
  }, 1000);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">useInterval - Declarative Intervals</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Stopwatch</p>
            <p className="text-4xl font-bold text-center text-orange-600 mb-3">
              {seconds}s
            </p>
            <div className="flex gap-2">
              <button 
                onClick={() => setIsRunning(!isRunning)}
                className={`flex-1 px-3 py-2 rounded font-semibold ${
                  isRunning ? 'bg-red-500' : 'bg-green-500'
                } text-white`}
              >
                {isRunning ? 'Pause' : 'Start'}
              </button>
              <button 
                onClick={() => { setSeconds(0); setIsRunning(false); }}
                className="flex-1 px-3 py-2 bg-gray-500 text-white rounded"
              >
                Reset
              </button>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Countdown</p>
            <p className="text-4xl font-bold text-center text-orange-600 mb-3">
              {countdown}s
            </p>
            <button 
              onClick={() => setCountdown(10)}
              className="w-full px-3 py-2 bg-orange-500 text-white rounded"
            >
              Reset to 10
            </button>
            {countdown === 0 && (
              <p className="text-center text-sm mt-2 text-green-600 font-semibold">
                ✓ Complete!
              </p>
            )}
          </div>
        </div>
        
        <div className="p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-1">Why useInterval?</p>
          <p>• Prevents stale closures</p>
          <p>• Easy to pause (pass null delay)</p>
          <p>• Automatic cleanup</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOK: useWindowSize =============
function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return windowSize;
}

function UseWindowSizeDemo() {
  const { width, height } = useWindowSize();
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">useWindowSize - Responsive Layouts</h4>
        
        <div className="p-4 bg-white rounded border mb-4">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600 mb-2">Current Window Size:</p>
            <div className="flex justify-center gap-8">
              <div>
                <p className="text-3xl font-bold text-pink-600">{width}px</p>
                <p className="text-xs text-gray-500">Width</p>
              </div>
              <div>
                <p className="text-3xl font-bold text-pink-600">{height}px</p>
                <p className="text-xs text-gray-500">Height</p>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-pink-50 rounded">
            <p className="text-sm font-semibold mb-2">Device Type:</p>
            <p className="text-lg">
              {width < 640 ? '📱 Mobile' : width < 1024 ? '💻 Tablet' : '🖥️ Desktop'}
            </p>
          </div>
        </div>
        
        <div className="p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">Try resizing your browser window!</p>
          <p className="mt-2">Use Cases:</p>
          <p>• Responsive layouts</p>
          <p>• Mobile/Desktop component switching</p>
          <p>• Chart/visualization sizing</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOK: usePrevious =============
function usePrevious(value) {
  const ref = useRef();
  
  useEffect(() => {
    ref.current = value;
  }, [value]);
  
  return ref.current;
}

function UsePreviousDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const prevCount = usePrevious(count);
  const prevName = usePrevious(name);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">usePrevious - Track Previous Values</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Counter</p>
            <div className="space-y-2 mb-3">
              <div className="flex justify-between text-sm">
                <span>Current:</span>
                <span className="font-bold text-indigo-600">{count}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Previous:</span>
                <span className="font-bold text-gray-500">{prevCount ?? 'N/A'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Change:</span>
                <span className={`font-bold ${
                  prevCount !== undefined 
                    ? count > prevCount ? 'text-green-600' : count < prevCount ? 'text-red-600' : 'text-gray-600'
                    : 'text-gray-600'
                }`}>
                  {prevCount !== undefined ? (count - prevCount > 0 ? `+${count - prevCount}` : count - prevCount) : 'N/A'}
                </span>
              </div>
            </div>
            <button 
              onClick={() => setCount(count + 1)}
              className="w-full px-3 py-2 bg-indigo-500 text-white rounded"
            >
              Increment
            </button>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Text Input</p>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Type something..."
              className="w-full px-2 py-1 border rounded mb-2"
            />
            <div className="space-y-1 text-xs">
              <p><strong>Current:</strong> {name || '(empty)'}</p>
              <p><strong>Previous:</strong> {prevName || '(empty)'}</p>
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-1">Use Cases:</p>
          <p>• Compare current vs previous state</p>
          <p>• Animations based on direction of change</p>
          <p>• Undo functionality</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOK: useOnClickOutside =============
function useOnClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
      handler(event);
    };
    
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}

function UseOnClickOutsideDemo() {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  useOnClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-3">useOnClickOutside - Detect Outside Clicks</h4>
        
        <div className="flex justify-center items-start min-h-64">
          <div ref={dropdownRef} className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="px-4 py-2 bg-yellow-500 text-white rounded font-semibold"
            >
              {isOpen ? 'Close Dropdown' : 'Open Dropdown'}
            </button>
            
            {isOpen && (
              <div className="absolute top-full mt-2 w-48 bg-white rounded-lg shadow-lg border overflow-hidden z-10">
                <div className="p-2 border-b bg-yellow-50">
                  <p className="text-xs font-semibold">Click outside to close</p>
                </div>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Option 1</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Option 2</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Option 3</a>
                <a href="#" className="block px-4 py-2 hover:bg-gray-100 text-sm">Option 4</a>
              </div>
            )}
          </div>
        </div>
        
        <div className="p-3 bg-yellow-100 rounded text-xs">
          <p className="font-semibold mb-1">Perfect for:</p>
          <p>• Dropdown menus</p>
          <p>• Modal dialogs</p>
          <p>• Popover menus</p>
          <p>• Context menus</p>
        </div>
      </div>
    </div>
  );
}

// ============= CUSTOM HOOKS COMPOSITION DEMO =============
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });
  
  const setValue = (value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };
  
  return [storedValue, setValue];
}

function CompositionDemo() {
  const [name, setName] = useLocalStorage('userName', '');
  const [theme, setTheme] = useLocalStorage('userTheme', 'light');
  const counter = useCounter(0);
  const [isExpanded, toggleExpanded] = useToggle(false);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-teal-50 rounded-lg">
        <h4 className="font-semibold mb-3">Hook Composition - Combining Multiple Hooks</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">useLocalStorage (Persisted)</p>
            <input 
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full px-2 py-1 border rounded mb-2 text-sm"
            />
            <select 
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full px-2 py-1 border rounded text-sm"
            >
              <option value="light">Light Theme</option>
              <option value="dark">Dark Theme</option>
            </select>
            <p className="text-xs text-gray-500 mt-2">
              Refresh the page - values persist!
            </p>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Multiple Hooks Together</p>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm">Counter:</span>
                <div className="flex gap-1">
                  <button onClick={counter.decrement} className="px-2 py-1 bg-red-500 text-white rounded text-xs">
                    -
                  </button>
                  <span className="px-3 py-1 bg-gray-100 rounded text-sm font-bold">
                    {counter.count}
                  </span>
                  <button onClick={counter.increment} className="px-2 py-1 bg-green-500 text-white rounded text-xs">
                    +
                  </button>
                </div>
              </div>
              
              <button 
                onClick={toggleExpanded}
                className="w-full px-3 py-2 bg-teal-500 text-white rounded text-sm"
              >
                {isExpanded ? 'Collapse' : 'Expand'}
              </button>
              
              {isExpanded && (
                <div className="p-2 bg-teal-50 rounded text-xs">
                  <p>Hello {name || 'Guest'}!</p>
                  <p>Theme: {theme}</p>
                  <p>Count: {counter.count}</p>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-teal-100 rounded text-xs">
          <p className="font-semibold mb-1">This demo combines:</p>
          <p>✅ useLocalStorage (persistence)</p>
          <p>✅ useCounter (counter logic)</p>
          <p>✅ useToggle (show/hide)</p>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('toggle');
  
  const tabs = [
    { id: 'toggle', label: 'useToggle', component: UseToggleDemo },
    { id: 'counter', label: 'useCounter', component: UseCounterDemo },
    { id: 'debounce', label: 'useDebounce', component: UseDebounceDemo },
    { id: 'interval', label: 'useInterval', component: UseIntervalDemo },
    { id: 'windowSize', label: 'useWindowSize', component: UseWindowSizeDemo },
    { id: 'previous', label: 'usePrevious', component: UsePreviousDemo },
    { id: 'clickOutside', label: 'useOnClickOutside', component: UseOnClickOutsideDemo },
    { id: 'composition', label: 'Hook Composition', component: CompositionDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 6: Custom Hooks</h1>
            <p className="text-purple-100">Reusable Logic & Composition</p>
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
              🎯 Custom hooks make logic reusable and components cleaner!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}