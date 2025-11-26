import { useState, useEffect, useRef, Component } from 'react';

// ============= CLASS COMPONENT LIFECYCLE DEMO =============
class ClassLifecycleDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      data: null,
      logs: ['1. Constructor called']
    };
    this.addLog('2. State initialized in constructor');
  }
  
  addLog = (message) => {
    this.setState(prev => ({
      logs: [...prev.logs, `${new Date().toLocaleTimeString()}: ${message}`]
    }));
  }
  
  componentDidMount() {
    this.addLog('3. componentDidMount - Component mounted!');
    
    // Simulate API call
    setTimeout(() => {
      this.setState({ data: 'Data from API' });
      this.addLog('4. Data fetched in componentDidMount');
    }, 1000);
  }
  
  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      this.addLog(`5. componentDidUpdate - Count changed from ${prevState.count} to ${this.state.count}`);
    }
  }
  
  componentWillUnmount() {
    console.log('6. componentWillUnmount - Cleaning up...');
  }
  
  render() {
    const { count, data, logs } = this.state;
    
    return (
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Class Component Lifecycle</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">State</p>
            <p className="text-xs">Count: {count}</p>
            <p className="text-xs">Data: {data || 'Loading...'}</p>
            <button 
              onClick={() => this.setState({ count: count + 1 })}
              className="mt-2 px-3 py-1 bg-blue-500 text-white rounded text-sm"
            >
              Increment (triggers componentDidUpdate)
            </button>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Lifecycle Logs</p>
            <div className="max-h-40 overflow-y-auto space-y-1">
              {logs.slice(-8).map((log, i) => (
                <div key={i} className="text-xs bg-gray-50 px-2 py-1 rounded">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-blue-100 rounded text-xs">
          <p className="font-semibold mb-1">Lifecycle Order:</p>
          <p>1. constructor → 2. render → 3. componentDidMount</p>
          <p>On update: render → componentDidUpdate</p>
          <p>On unmount: componentWillUnmount</p>
        </div>
      </div>
    );
  }
}

// ============= useEffect DEPENDENCY DEMO =============
function UseEffectDependencyDemo() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');
  const [logs, setLogs] = useState([]);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  // Empty deps - runs once on mount
  useEffect(() => {
    addLog('Effect 1: [] - Runs once on mount');
    
    return () => {
      console.log('Effect 1: Cleanup on unmount');
    };
  }, []);
  
  // With count dependency
  useEffect(() => {
    addLog(`Effect 2: [count] - Count changed to ${count}`);
  }, [count]);
  
  // With name dependency
  useEffect(() => {
    if (name) {
      addLog(`Effect 3: [name] - Name changed to "${name}"`);
    }
  }, [name]);
  
  // No dependency array - runs after every render
  useEffect(() => {
    addLog('Effect 4: (no deps) - Runs after EVERY render');
  });
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">useEffect Dependency Arrays</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-semibold mb-2">Controls</p>
              <div className="space-y-2">
                <div>
                  <label className="text-xs">Count: {count}</label>
                  <button 
                    onClick={() => setCount(count + 1)}
                    className="ml-2 px-2 py-1 bg-purple-500 text-white rounded text-xs"
                  >
                    +1
                  </button>
                </div>
                <div>
                  <input 
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Type name..."
                    className="w-full px-2 py-1 border rounded text-xs"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Effect Logs</p>
              <button 
                onClick={() => setLogs([])}
                className="text-xs px-2 py-1 bg-gray-400 text-white rounded"
              >
                Clear
              </button>
            </div>
            <div className="max-h-48 overflow-y-auto space-y-1">
              {logs.slice(-10).map((log, i) => (
                <div key={i} className="text-xs bg-purple-50 px-2 py-1 rounded">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-2 text-xs">
          <div className="p-2 bg-green-100 rounded">
            <p className="font-semibold">useEffect(() => {}, [])</p>
            <p>Runs once on mount</p>
          </div>
          <div className="p-2 bg-blue-100 rounded">
            <p className="font-semibold">useEffect(() => {}, [dep])</p>
            <p>Runs when dep changes</p>
          </div>
          <div className="p-2 bg-yellow-100 rounded">
            <p className="font-semibold">useEffect(() => {})</p>
            <p>Runs after every render</p>
          </div>
          <div className="p-2 bg-red-100 rounded">
            <p className="font-semibold">return () => {}</p>
            <p>Cleanup function</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= CLEANUP DEMO =============
function CleanupDemo() {
  const [showTimer, setShowTimer] = useState(false);
  const [showListener, setShowListener] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">Cleanup Functions</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold mb-2">Timer Example</p>
            <button 
              onClick={() => setShowTimer(!showTimer)}
              className="mb-2 px-3 py-2 bg-green-500 text-white rounded"
            >
              {showTimer ? 'Hide Timer' : 'Show Timer'}
            </button>
            {showTimer && <TimerComponent />}
            <p className="text-xs text-gray-600 mt-2">
              Toggle to see cleanup in console
            </p>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">Mouse Tracker</p>
            <button 
              onClick={() => setShowListener(!showListener)}
              className="mb-2 px-3 py-2 bg-green-500 text-white rounded"
            >
              {showListener ? 'Stop Tracking' : 'Start Tracking'}
            </button>
            {showListener && <MouseTracker />}
            <p className="text-xs text-gray-600 mt-2">
              Toggle to see listener cleanup
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function TimerComponent() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log('Timer: Setting up interval');
    
    const intervalId = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    
    return () => {
      console.log('Timer: Cleaning up interval');
      clearInterval(intervalId);
    };
  }, []);
  
  return (
    <div className="p-3 bg-white rounded border">
      <p className="text-2xl font-bold text-green-600">{seconds}s</p>
    </div>
  );
}

function MouseTracker() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    console.log('Mouse Tracker: Adding event listener');
    
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      console.log('Mouse Tracker: Removing event listener');
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  return (
    <div className="p-3 bg-white rounded border">
      <p className="text-sm">X: {position.x}</p>
      <p className="text-sm">Y: {position.y}</p>
    </div>
  );
}

// ============= DATA FETCHING DEMO =============
function DataFetchingDemo() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    setLoading(true);
    setError(null);
    
    // Simulate API call
    const timer = setTimeout(() => {
      const users = [
        { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer' },
        { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer' },
        { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager' }
      ];
      
      const foundUser = users.find(u => u.id === userId);
      
      if (foundUser) {
        setUser(foundUser);
        setLoading(false);
      } else {
        setError(new Error('User not found'));
        setLoading(false);
      }
    }, 800);
    
    return () => {
      clearTimeout(timer);
    };
  }, [userId]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Data Fetching Pattern</h4>
        
        <div className="mb-4">
          <label className="text-sm font-medium mr-2">Select User ID:</label>
          <select 
            value={userId}
            onChange={(e) => setUserId(Number(e.target.value))}
            className="px-3 py-1 border rounded"
          >
            <option value={1}>User 1</option>
            <option value={2}>User 2</option>
            <option value={3}>User 3</option>
            <option value={4}>User 4 (Not Found)</option>
          </select>
        </div>
        
        <div className="p-4 bg-white rounded border min-h-32">
          {loading && (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-700 font-semibold">Error</p>
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}
          
          {!loading && !error && user && (
            <div className="space-y-2">
              <h3 className="text-lg font-bold text-orange-700">{user.name}</h3>
              <p className="text-sm"><strong>Email:</strong> {user.email}</p>
              <p className="text-sm"><strong>Role:</strong> {user.role}</p>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-orange-100 rounded text-xs">
          <pre className="overflow-x-auto">
{`useEffect(() => {
  setLoading(true);
  
  fetch(\`/api/users/\${userId}\`)
    .then(res => res.json())
    .then(data => {
      setUser(data);
      setLoading(false);
    })
    .catch(err => {
      setError(err);
      setLoading(false);
    });
}, [userId]);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= DEBOUNCE DEMO =============
function DebounceDemo() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');
  const [searchCount, setSearchCount] = useState(0);
  
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
      if (searchTerm) {
        setSearchCount(prev => prev + 1);
      }
    }, 500);
    
    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Debouncing with useEffect</h4>
        
        <div className="mb-4">
          <input 
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Type to search (500ms delay)..."
            className="w-full px-3 py-2 border rounded focus:ring-2 focus:ring-pink-500 focus:outline-none"
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-xs font-semibold mb-1">Immediate Value</p>
            <p className="text-sm text-gray-700">{searchTerm || '(empty)'}</p>
            <p className="text-xs text-gray-500 mt-1">Updates instantly</p>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-xs font-semibold mb-1">Debounced Value</p>
            <p className="text-sm text-pink-600">{debouncedTerm || '(empty)'}</p>
            <p className="text-xs text-gray-500 mt-1">Updates after 500ms</p>
          </div>
        </div>
        
        <div className="mt-3 p-3 bg-pink-100 rounded">
          <p className="text-sm">
            <strong>API Calls Made:</strong> {searchCount}
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Without debouncing, this would be {searchTerm.length} calls!
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-white rounded text-xs">
          <pre className="overflow-x-auto">
{`useEffect(() => {
  const timerId = setTimeout(() => {
    setDebouncedTerm(searchTerm);
    // Make API call here
  }, 500);
  
  return () => clearTimeout(timerId);
}, [searchTerm]);`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= ERROR BOUNDARY DEMO =============
class ErrorBoundary extends Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-700 font-semibold mb-2">⚠️ Something went wrong</h3>
          <p className="text-sm text-red-600 mb-3">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null })}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Try Again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

function BuggyComponent({ shouldError }) {
  if (shouldError) {
    throw new Error('Oops! This component crashed!');
  }
  
  return (
    <div className="p-3 bg-green-100 rounded">
      <p className="text-green-700">✓ Component is working fine!</p>
    </div>
  );
}

function ErrorBoundaryDemo() {
  const [triggerError, setTriggerError] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg">
        <h4 className="font-semibold mb-3">Error Boundary</h4>
        
        <div className="mb-4">
          <button 
            onClick={() => setTriggerError(!triggerError)}
            className={`px-4 py-2 rounded font-medium ${
              triggerError 
                ? 'bg-green-500 hover:bg-green-600' 
                : 'bg-red-500 hover:bg-red-600'
            } text-white`}
          >
            {triggerError ? 'Fix Component' : 'Break Component'}
          </button>
        </div>
        
        <ErrorBoundary>
          <BuggyComponent shouldError={triggerError} />
        </ErrorBoundary>
        
        <div className="mt-4 p-3 bg-white rounded text-xs">
          <p className="font-semibold mb-2">Error Boundary Code:</p>
          <pre className="overflow-x-auto">
{`class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    logError(error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= COMPARISON DEMO =============
function ComparisonDemo() {
  const [showClass, setShowClass] = useState(true);
  const [showFunctional, setShowFunctional] = useState(true);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Class vs Functional Comparison</h4>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Class Component</p>
              <button 
                onClick={() => setShowClass(!showClass)}
                className="text-xs px-2 py-1 bg-indigo-500 text-white rounded"
              >
                {showClass ? 'Unmount' : 'Mount'}
              </button>
            </div>
            {showClass && <ClassLifecycleDemo />}
          </div>
          
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-semibold">Functional Component</p>
              <button 
                onClick={() => setShowFunctional(!showFunctional)}
                className="text-xs px-2 py-1 bg-indigo-500 text-white rounded"
              >
                {showFunctional ? 'Unmount' : 'Mount'}
              </button>
            </div>
            {showFunctional && <FunctionalEquivalent />}
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-indigo-100 rounded text-xs">
          <table className="w-full">
            <thead>
              <tr className="border-b border-indigo-300">
                <th className="text-left p-2">Class Component</th>
                <th className="text-left p-2">Functional + Hooks</th>
              </tr>
            </thead>
            <tbody className="text-xs">
              <tr className="border-b border-indigo-200">
                <td className="p-2">componentDidMount</td>
                <td className="p-2">useEffect(() => {}, [])</td>
              </tr>
              <tr className="border-b border-indigo-200">
                <td className="p-2">componentDidUpdate</td>
                <td className="p-2">useEffect(() => {}, [deps])</td>
              </tr>
              <tr className="border-b border-indigo-200">
                <td className="p-2">componentWillUnmount</td>
                <td className="p-2">useEffect(() => () => {}, [])</td>
              </tr>
              <tr>
                <td className="p-2">this.state, this.setState</td>
                <td className="p-2">useState</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function FunctionalEquivalent() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(null);
  const [logs, setLogs] = useState(['1. Component function called']);
  
  const addLog = (message) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  useEffect(() => {
    addLog('2. useEffect (mount) - Component mounted!');
    
    setTimeout(() => {
      setData('Data from API');
      addLog('3. Data fetched');
    }, 1000);
    
    return () => {
      console.log('4. Cleanup - Component unmounting');
    };
  }, []);
  
  useEffect(() => {
    if (count > 0) {
      addLog(`5. useEffect (update) - Count changed to ${count}`);
    }
  }, [count]);
  
  return (
    <div className="p-4 bg-purple-50 rounded-lg">
      <h4 className="font-semibold mb-3">Functional Component</h4>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="p-3 bg-white rounded border">
          <p className="text-sm font-semibold mb-2">State</p>
          <p className="text-xs">Count: {count}</p>
          <p className="text-xs">Data: {data || 'Loading...'}</p>
          <button 
            onClick={() => setCount(count + 1)}
            className="mt-2 px-3 py-1 bg-purple-500 text-white rounded text-sm"
          >
            Increment
          </button>
        </div>
        
        <div className="p-3 bg-white rounded border">
          <p className="text-sm font-semibold mb-2">Effect Logs</p>
          <div className="max-h-40 overflow-y-auto space-y-1">
            {logs.slice(-8).map((log, i) => (
              <div key={i} className="text-xs bg-gray-50 px-2 py-1 rounded">
                {log}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('useEffect');
  
  const tabs = [
    { id: 'useEffect', label: 'useEffect Deps', component: UseEffectDependencyDemo },
    { id: 'cleanup', label: 'Cleanup', component: CleanupDemo },
    { id: 'fetching', label: 'Data Fetching', component: DataFetchingDemo },
    { id: 'debounce', label: 'Debouncing', component: DebounceDemo },
    { id: 'error', label: 'Error Boundary', component: ErrorBoundaryDemo },
    { id: 'comparison', label: 'Class vs Functional', component: ComparisonDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-blue-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 4: Component Lifecycle</h1>
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
              🎯 Open browser console to see cleanup logs and lifecycle methods!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}