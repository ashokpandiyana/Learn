import { useState, useEffect, useCallback } from 'react';

// ============= BASIC FETCH DEMO =============
function BasicFetchDemo() {
  const [userId, setUserId] = useState(1);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const users = [
    { id: 1, name: 'Alice Johnson', email: 'alice@example.com', role: 'Developer', avatar: '👩‍💻' },
    { id: 2, name: 'Bob Smith', email: 'bob@example.com', role: 'Designer', avatar: '👨‍🎨' },
    { id: 3, name: 'Carol White', email: 'carol@example.com', role: 'Manager', avatar: '👩‍💼' }
  ];
  
  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const foundUser = users.find(u => u.id === userId);
        
        if (!foundUser) {
          throw new Error('User not found');
        }
        
        setUser(foundUser);
        setLoading(false);
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError(error);
          setLoading(false);
        }
      }
    };
    
    fetchUser();
    
    return () => {
      abortController.abort();
    };
  }, [userId]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Basic Fetch with useEffect</h4>
        
        <div className="mb-4 flex gap-2">
          {[1, 2, 3].map(id => (
            <button 
              key={id}
              onClick={() => setUserId(id)}
              className={`px-4 py-2 rounded ${
                userId === id ? 'bg-blue-600 text-white' : 'bg-white border'
              }`}
            >
              User {id}
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-white rounded border min-h-40">
          {loading && (
            <div className="flex flex-col items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mb-2"></div>
              <p className="text-sm text-gray-600">Loading...</p>
            </div>
          )}
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <p className="text-red-700 font-semibold">Error!</p>
              <p className="text-sm text-red-600">{error.message}</p>
            </div>
          )}
          
          {!loading && !error && user && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="text-4xl">{user.avatar}</div>
                <div>
                  <h3 className="text-lg font-bold">{user.name}</h3>
                  <p className="text-sm text-gray-600">{user.role}</p>
                </div>
              </div>
              <div className="text-sm">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-blue-100 rounded text-xs">
          <p className="font-semibold mb-1">Three States Pattern:</p>
          <pre className="overflow-x-auto">
{`const [data, setData] = useState(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

// Always handle: loading, error, success`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= LOADING STATES DEMO =============
function LoadingStatesDemo() {
  const [loadingType, setLoadingType] = useState('spinner');
  const [isLoading, setIsLoading] = useState(false);
  
  const startLoading = () => {
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 3000);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Loading States & Skeletons</h4>
        
        <div className="mb-4 flex gap-2">
          {['spinner', 'skeleton', 'progressive'].map(type => (
            <button 
              key={type}
              onClick={() => setLoadingType(type)}
              className={`px-3 py-2 rounded capitalize ${
                loadingType === type ? 'bg-purple-600 text-white' : 'bg-white border'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
        
        <button 
          onClick={startLoading}
          disabled={isLoading}
          className="mb-4 px-4 py-2 bg-purple-500 text-white rounded disabled:opacity-50"
        >
          {isLoading ? 'Loading...' : 'Start Loading (3s)'}
        </button>
        
        <div className="p-4 bg-white rounded border min-h-48">
          {loadingType === 'spinner' && isLoading && (
            <div className="flex flex-col items-center justify-center h-40">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mb-3"></div>
              <p className="text-sm text-gray-600">Loading data...</p>
            </div>
          )}
          
          {loadingType === 'skeleton' && isLoading && (
            <div className="space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          )}
          
          {loadingType === 'progressive' && isLoading && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center text-2xl">
                  ✓
                </div>
                <div>
                  <h3 className="font-bold">User Loaded</h3>
                  <p className="text-sm text-gray-600">Loading posts...</p>
                </div>
              </div>
              <div className="animate-pulse space-y-2">
                <div className="h-3 bg-gray-200 rounded"></div>
                <div className="h-3 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          )}
          
          {!isLoading && (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center text-2xl">
                  👤
                </div>
                <div>
                  <h3 className="text-lg font-bold">John Doe</h3>
                  <p className="text-sm text-gray-600">Software Engineer</p>
                </div>
              </div>
              <p className="text-sm">
                This is the loaded content that appears after the loading state completes.
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-purple-100 rounded text-xs">
          <p className="font-semibold mb-1">Loading State Patterns:</p>
          <p>• <strong>Spinner:</strong> Simple, universal</p>
          <p>• <strong>Skeleton:</strong> Better UX, shows layout</p>
          <p>• <strong>Progressive:</strong> Load parts sequentially</p>
        </div>
      </div>
    </div>
  );
}

// ============= ERROR HANDLING DEMO =============
function ErrorHandlingDemo() {
  const [errorType, setErrorType] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const triggerError = async (type) => {
    setLoading(true);
    setError(null);
    setData(null);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setLoading(false);
    
    switch (type) {
      case '404':
        setError({ status: 404, message: 'User not found' });
        break;
      case '403':
        setError({ status: 403, message: 'Access denied' });
        break;
      case '500':
        setError({ status: 500, message: 'Server error. Please try again later.' });
        break;
      case 'network':
        setError({ status: 0, message: 'Network error. Check your connection.' });
        break;
      case 'success':
        setData({ name: 'John Doe', email: 'john@example.com' });
        break;
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-red-50 rounded-lg">
        <h4 className="font-semibold mb-3">Error Handling Patterns</h4>
        
        <div className="mb-4 grid grid-cols-3 gap-2">
          <button onClick={() => triggerError('404')} className="px-3 py-2 bg-orange-500 text-white rounded text-sm">
            404 Error
          </button>
          <button onClick={() => triggerError('403')} className="px-3 py-2 bg-red-500 text-white rounded text-sm">
            403 Error
          </button>
          <button onClick={() => triggerError('500')} className="px-3 py-2 bg-red-700 text-white rounded text-sm">
            500 Error
          </button>
          <button onClick={() => triggerError('network')} className="px-3 py-2 bg-gray-500 text-white rounded text-sm">
            Network Error
          </button>
          <button onClick={() => triggerError('success')} className="px-3 py-2 bg-green-500 text-white rounded text-sm">
            Success
          </button>
        </div>
        
        <div className="p-4 bg-white rounded border min-h-40">
          {loading && (
            <div className="flex items-center justify-center h-32">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
            </div>
          )}
          
          {error && (
            <div className={`p-4 rounded border ${
              error.status === 404 ? 'bg-orange-50 border-orange-200' :
              error.status === 403 ? 'bg-red-50 border-red-200' :
              error.status === 500 ? 'bg-red-100 border-red-300' :
              'bg-gray-50 border-gray-200'
            }`}>
              <div className="flex items-start gap-3">
                <div className="text-3xl">
                  {error.status === 404 ? '🔍' : 
                   error.status === 403 ? '🔒' : 
                   error.status === 500 ? '⚠️' : '📡'}
                </div>
                <div>
                  <p className="font-semibold text-red-700">
                    {error.status > 0 ? `Error ${error.status}` : 'Network Error'}
                  </p>
                  <p className="text-sm text-red-600">{error.message}</p>
                  <button 
                    onClick={() => triggerError('success')}
                    className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
                  >
                    Retry
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {data && (
            <div className="p-4 bg-green-50 border border-green-200 rounded">
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">✅</div>
                <div>
                  <p className="font-semibold text-green-700">Success!</p>
                  <p className="text-sm text-green-600">Data loaded successfully</p>
                </div>
              </div>
              <div className="text-sm">
                <p><strong>Name:</strong> {data.name}</p>
                <p><strong>Email:</strong> {data.email}</p>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-red-100 rounded text-xs">
          <p className="font-semibold mb-1">Error Handling Best Practices:</p>
          <p>✅ Check HTTP status codes (response.ok)</p>
          <p>✅ Show different UI for different errors</p>
          <p>✅ Provide retry functionality</p>
          <p>✅ Log errors for debugging</p>
        </div>
      </div>
    </div>
  );
}

// ============= CRUD OPERATIONS DEMO =============
function CRUDDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React Query', completed: false },
    { id: 2, text: 'Build a project', completed: false }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [lastAction, setLastAction] = useState(null);
  
  // CREATE
  const handleCreate = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    setLastAction('Creating...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTodo = {
      id: Date.now(),
      text: input,
      completed: false
    };
    
    setTodos([...todos, newTodo]);
    setInput('');
    setLoading(false);
    setLastAction('Created ✓');
  };
  
  // UPDATE
  const handleToggle = async (id) => {
    setLoading(true);
    setLastAction('Updating...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
    
    setLoading(false);
    setLastAction('Updated ✓');
  };
  
  // DELETE
  const handleDelete = async (id) => {
    setLoading(true);
    setLastAction('Deleting...');
    
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTodos(todos.filter(todo => todo.id !== id));
    
    setLoading(false);
    setLastAction('Deleted ✓');
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">CRUD Operations (Create, Read, Update, Delete)</h4>
        
        {lastAction && (
          <div className="mb-3 p-2 bg-green-100 border border-green-300 rounded text-sm text-green-700">
            {lastAction}
          </div>
        )}
        
        <div className="mb-4 flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleCreate()}
            placeholder="Add new todo..."
            className="flex-1 px-3 py-2 border rounded"
            disabled={loading}
          />
          <button 
            onClick={handleCreate}
            disabled={loading || !input.trim()}
            className="px-4 py-2 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Create
          </button>
        </div>
        
        <div className="space-y-2 mb-4">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-3 bg-white rounded border">
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
                disabled={loading}
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
              <button 
                onClick={() => handleDelete(todo.id)}
                disabled={loading}
                className="px-3 py-1 bg-red-500 text-white rounded text-sm disabled:opacity-50"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-1">HTTP Methods:</p>
          <p>• <strong>GET:</strong> Fetch data (read)</p>
          <p>• <strong>POST:</strong> Create new data</p>
          <p>• <strong>PUT/PATCH:</strong> Update existing data</p>
          <p>• <strong>DELETE:</strong> Remove data</p>
        </div>
      </div>
    </div>
  );
}

// ============= OPTIMISTIC UPDATES DEMO =============
function OptimisticUpdatesDemo() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn optimistic updates', completed: false },
    { id: 2, text: 'Build better UX', completed: false }
  ]);
  const [optimistic, setOptimistic] = useState(true);
  const [status, setStatus] = useState('');
  
  const handleToggle = async (id) => {
    const originalTodos = [...todos];
    
    if (optimistic) {
      // Optimistic: Update UI immediately
      setTodos(todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      ));
      setStatus('Updating...');
    } else {
      setStatus('Updating...');
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate 30% failure rate
    const success = Math.random() > 0.3;
    
    if (success) {
      if (!optimistic) {
        // Non-optimistic: Update UI after success
        setTodos(todos.map(todo =>
          todo.id === id ? { ...todo, completed: !todo.completed } : todo
        ));
      }
      setStatus('Updated ✓');
    } else {
      // Rollback on error
      if (optimistic) {
        setTodos(originalTodos);
      }
      setStatus('Failed! Rolled back ✗');
    }
    
    setTimeout(() => setStatus(''), 2000);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Optimistic Updates</h4>
        
        <div className="mb-4 p-3 bg-white rounded border">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={optimistic}
              onChange={(e) => setOptimistic(e.target.checked)}
            />
            <span className="text-sm font-medium">Enable Optimistic Updates</span>
          </label>
          <p className="text-xs text-gray-600 mt-1">
            {optimistic 
              ? 'UI updates immediately, rolls back on error' 
              : 'UI updates after server confirms'}
          </p>
        </div>
        
        {status && (
          <div className={`mb-3 p-2 rounded text-sm ${
            status.includes('✓') ? 'bg-green-100 text-green-700' :
            status.includes('✗') ? 'bg-red-100 text-red-700' :
            'bg-blue-100 text-blue-700'
          }`}>
            {status}
          </div>
        )}
        
        <div className="space-y-2 mb-4">
          {todos.map(todo => (
            <div key={todo.id} className="flex items-center gap-2 p-3 bg-white rounded border">
              <input 
                type="checkbox"
                checked={todo.completed}
                onChange={() => handleToggle(todo.id)}
              />
              <span className={`flex-1 ${todo.completed ? 'line-through text-gray-500' : ''}`}>
                {todo.text}
              </span>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-1">Try toggling todos:</p>
          <p>• <strong>With optimistic ON:</strong> Instant feedback, rolls back on error (30% fail rate)</p>
          <p>• <strong>With optimistic OFF:</strong> Wait for server confirmation</p>
          <p className="mt-2">Optimistic updates = better perceived performance!</p>
        </div>
      </div>
    </div>
  );
}

// ============= CACHING DEMO =============
function CachingDemo() {
  const [userId, setUserId] = useState(1);
  const [cache, setCache] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchCount, setFetchCount] = useState(0);
  
  const users = [
    { id: 1, name: 'Alice', email: 'alice@example.com' },
    { id: 2, name: 'Bob', email: 'bob@example.com' },
    { id: 3, name: 'Carol', email: 'carol@example.com' }
  ];
  
  const fetchUser = async (id) => {
    // Check cache first
    if (cache[id]) {
      console.log('Using cached data for user', id);
      return cache[id];
    }
    
    setLoading(true);
    setFetchCount(prev => prev + 1);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = users.find(u => u.id === id);
    
    // Store in cache
    setCache(prev => ({ ...prev, [id]: user }));
    setLoading(false);
    
    return user;
  };
  
  const [currentUser, setCurrentUser] = useState(null);
  
  useEffect(() => {
    fetchUser(userId).then(setCurrentUser);
  }, [userId]);
  
  const clearCache = () => {
    setCache({});
    setFetchCount(0);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Caching Strategy</h4>
        
        <div className="mb-4 p-3 bg-white rounded border">
          <div className="flex justify-between items-center mb-2">
            <p className="text-sm font-semibold">API Calls Made: {fetchCount}</p>
            <button 
              onClick={clearCache}
              className="px-3 py-1 bg-red-500 text-white rounded text-sm"
            >
              Clear Cache
            </button>
          </div>
          <p className="text-xs text-gray-600">
            Click different users. Cached users load instantly!
          </p>
        </div>
        
        <div className="mb-4 flex gap-2">
          {[1, 2, 3].map(id => (
            <button 
              key={id}
              onClick={() => setUserId(id)}
              className={`flex-1 px-4 py-2 rounded ${
                userId === id ? 'bg-indigo-600 text-white' : 'bg-white border'
              } ${cache[id] ? 'border-2 border-green-500' : ''}`}
            >
              User {id}
              {cache[id] && <span className="text-xs ml-1">✓</span>}
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-white rounded border min-h-32">
          {loading && (
            <div className="flex items-center justify-center h-24">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-500"></div>
            </div>
          )}
          
          {!loading && currentUser && (
            <div>
              <h3 className="text-lg font-bold mb-2">{currentUser.name}</h3>
              <p className="text-sm"><strong>Email:</strong> {currentUser.email}</p>
              <p className="text-sm"><strong>ID:</strong> {currentUser.id}</p>
              {cache[currentUser.id] && (
                <p className="text-xs text-green-600 mt-2">✓ Loaded from cache</p>
              )}
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-1">Caching Benefits:</p>
          <p>✅ Instant loading for cached data</p>
          <p>✅ Reduced server load</p>
          <p>✅ Better offline experience</p>
          <p>✅ React Query handles this automatically!</p>
        </div>
      </div>
    </div>
  );
}

// ============= RACE CONDITION DEMO =============
function RaceConditionDemo() {
  const [userId, setUserId] = useState(1);
  const [withFix, setWithFix] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [requestLog, setRequestLog] = useState([]);
  
  const addLog = (message) => {
    setRequestLog(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };
  
  useEffect(() => {
    let cancelled = false;
    
    const fetchUser = async () => {
      setLoading(true);
      addLog(`Request started for User ${userId}`);
      
      // Random delay 500-2000ms
      const delay = Math.random() * 1500 + 500;
      await new Promise(resolve => setTimeout(resolve, delay));
      
      const users = [
        { id: 1, name: 'Alice', email: 'alice@example.com' },
        { id: 2, name: 'Bob', email: 'bob@example.com' },
        { id: 3, name: 'Carol', email: 'carol@example.com' }
      ];
      
      const foundUser = users.find(u => u.id === userId);
      
      if (withFix && cancelled) {
        addLog(`Request cancelled for User ${userId}`);
        return;
      }
      
      setUser(foundUser);
      setLoading(false);
      addLog(`Request completed for User ${userId}`);
    };
    
    fetchUser();
    
    return () => {
      cancelled = true;
    };
  }, [userId, withFix]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-3">Race Conditions</h4>
        
        <div className="mb-4 p-3 bg-white rounded border">
          <label className="flex items-center gap-2">
            <input 
              type="checkbox"
              checked={withFix}
              onChange={(e) => {
                setWithFix(e.target.checked);
                setRequestLog([]);
              }}
            />
            <span className="text-sm font-medium">Enable Race Condition Fix (Cleanup)</span>
          </label>
        </div>
        
        <div className="mb-4 flex gap-2">
          <p className="text-sm font-semibold">Click multiple users quickly:</p>
        </div>
        
        <div className="mb-4 flex gap-2">
          {[1, 2, 3].map(id => (
            <button 
              key={id}
              onClick={() => setUserId(id)}
              className={`flex-1 px-4 py-2 rounded ${
                userId === id ? 'bg-yellow-600 text-white' : 'bg-white border'
              }`}
            >
              User {id}
            </button>
          ))}
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Current User:</p>
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-2/3"></div>
              </div>
            ) : user ? (
              <div>
                <p className="font-semibold">{user.name}</p>
                <p className="text-xs text-gray-600">{user.email}</p>
              </div>
            ) : (
              <p className="text-gray-500">No user</p>
            )}
          </div>
          
          <div className="p-3 bg-white rounded border">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Request Log:</p>
              <button 
                onClick={() => setRequestLog([])}
                className="text-xs px-2 py-1 bg-gray-400 text-white rounded"
              >
                Clear
              </button>
            </div>
            <div className="max-h-32 overflow-y-auto space-y-1">
              {requestLog.slice(-6).map((log, i) => (
                <div key={i} className="text-xs bg-gray-50 px-2 py-1 rounded">
                  {log}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="p-3 bg-yellow-100 rounded text-xs">
          <p className="font-semibold mb-1">Race Condition Problem:</p>
          <p>• Click User 1, 2, 3 quickly (without fix)</p>
          <p>• Slower request might finish last</p>
          <p>• Wrong user data displayed!</p>
          <p className="mt-2 font-semibold">Solution:</p>
          <p>✅ Use cleanup function to cancel/ignore stale requests</p>
          <p>✅ Use AbortController with fetch</p>
          <p>✅ React Query handles this automatically</p>
        </div>
      </div>
    </div>
  );
}

// ============= REACT QUERY PATTERN DEMO =============
function ReactQueryPatternDemo() {
  const [selectedTab, setSelectedTab] = useState('basic');
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">React Query Patterns</h4>
        
        <div className="mb-4 flex gap-2">
          {['basic', 'mutation', 'optimistic', 'pagination'].map(tab => (
            <button 
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-3 py-2 rounded capitalize text-sm ${
                selectedTab === tab ? 'bg-pink-600 text-white' : 'bg-white border'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-white rounded border">
          {selectedTab === 'basic' && (
            <div>
              <p className="text-sm font-semibold mb-2">Basic Query</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`const { data, isLoading, error } = useQuery({
  queryKey: ['users'],
  queryFn: async () => {
    const res = await fetch('/api/users');
    return res.json();
  }
});

if (isLoading) return <Loading />;
if (error) return <Error />;
return <div>{data.map(...)}</div>;`}
              </pre>
            </div>
          )}
          
          {selectedTab === 'mutation' && (
            <div>
              <p className="text-sm font-semibold mb-2">Mutations (POST/PUT/DELETE)</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`const mutation = useMutation({
  mutationFn: (newUser) => {
    return fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(newUser)
    });
  },
  onSuccess: () => {
    queryClient.invalidateQueries(['users']);
  }
});

<button onClick={() => mutation.mutate(data)}>
  Add User
</button>`}
              </pre>
            </div>
          )}
          
          {selectedTab === 'optimistic' && (
            <div>
              <p className="text-sm font-semibold mb-2">Optimistic Updates</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`const mutation = useMutation({
  mutationFn: updateTodo,
  onMutate: async (newTodo) => {
    // Cancel outgoing queries
    await queryClient.cancelQueries(['todos']);
    
    // Snapshot previous
    const previous = queryClient.getQueryData(['todos']);
    
    // Optimistic update
    queryClient.setQueryData(['todos'], old => 
      [...old, newTodo]
    );
    
    return { previous };
  },
  onError: (err, vars, context) => {
    // Rollback
    queryClient.setQueryData(['todos'], context.previous);
  }
});`}
              </pre>
            </div>
          )}
          
          {selectedTab === 'pagination' && (
            <div>
              <p className="text-sm font-semibold mb-2">Pagination</p>
              <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
{`const [page, setPage] = useState(1);

const { data, isLoading } = useQuery({
  queryKey: ['users', page],
  queryFn: () => fetchUsers(page),
  keepPreviousData: true
});

<button onClick={() => setPage(p => p + 1)}>
  Next Page
</button>`}
              </pre>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">React Query Features:</p>
          <p>✅ Automatic caching and background refetching</p>
          <p>✅ Request deduplication</p>
          <p>✅ Optimistic updates with rollback</p>
          <p>✅ Pagination and infinite scroll support</p>
          <p>✅ Window focus refetching</p>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('fetch');
  
  const tabs = [
    { id: 'fetch', label: 'Basic Fetch', component: BasicFetchDemo },
    { id: 'loading', label: 'Loading States', component: LoadingStatesDemo },
    { id: 'errors', label: 'Error Handling', component: ErrorHandlingDemo },
    { id: 'crud', label: 'CRUD Operations', component: CRUDDemo },
    { id: 'optimistic', label: 'Optimistic Updates', component: OptimisticUpdatesDemo },
    { id: 'caching', label: 'Caching', component: CachingDemo },
    { id: 'race', label: 'Race Conditions', component: RaceConditionDemo },
    { id: 'reactQuery', label: 'React Query Patterns', component: ReactQueryPatternDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 13: API Integration</h1>
            <p className="text-blue-100">Master Data Fetching & State Management</p>
          </div>
          
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
          
          <div className="p-6">
            {ActiveComponent && <ActiveComponent />}
          </div>
          
          <div className="bg-gray-50 border-t p-4 text-center">
            <p className="text-sm text-gray-600">
              🎯 API integration is crucial - master loading, error, and success states!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}