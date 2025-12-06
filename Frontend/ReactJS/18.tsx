import { useState, useEffect, Component } from 'react';

// ============= ERROR BOUNDARY IMPLEMENTATION =============
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({ error, errorInfo });
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-50 border border-red-200 rounded">
          <h3 className="text-red-700 font-semibold mb-2">⚠️ Component Error Caught</h3>
          <p className="text-sm text-red-600 mb-3">{this.state.error?.message}</p>
          <button 
            onClick={() => this.setState({ hasError: false, error: null, errorInfo: null })}
            className="px-3 py-1 bg-red-500 text-white rounded text-sm"
          >
            Reset Error Boundary
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Buggy component for demonstration
function BuggyComponent({ shouldError }) {
  if (shouldError) {
    throw new Error('Intentional error in component rendering!');
  }
  
  return (
    <div className="p-3 bg-green-100 rounded text-green-700">
      ✓ Component is working fine
    </div>
  );
}

function ErrorBoundaryDemo() {
  const [triggerError, setTriggerError] = useState(false);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Error Boundaries</h4>
        
        <div className="mb-4">
          <button 
            onClick={() => setTriggerError(!triggerError)}
            className={`px-4 py-2 rounded font-semibold ${
              triggerError ? 'bg-green-500' : 'bg-red-500'
            } text-white`}
          >
            {triggerError ? 'Fix Component' : 'Break Component'}
          </button>
        </div>
        
        <ErrorBoundary>
          <BuggyComponent shouldError={triggerError} />
        </ErrorBoundary>
        
        <div className="mt-4 p-3 bg-blue-100 rounded text-xs">
          <p className="font-semibold mb-2">Error Boundaries catch:</p>
          <p className="text-green-700">✅ Errors during rendering</p>
          <p className="text-green-700">✅ Errors in lifecycle methods</p>
          <p className="text-green-700">✅ Errors in constructors</p>
          
          <p className="font-semibold mt-2 mb-1">Error Boundaries DON'T catch:</p>
          <p className="text-red-700">❌ Event handlers (use try-catch)</p>
          <p className="text-red-700">❌ Async code (use try-catch)</p>
          <p className="text-red-700">❌ Server-side rendering</p>
        </div>
      </div>
    </div>
  );
}

// ============= ERROR TYPES DEMO =============
function ErrorTypesDemo() {
  const [eventHandlerError, setEventHandlerError] = useState(null);
  const [asyncError, setAsyncError] = useState(null);
  const [networkError, setNetworkError] = useState(null);
  
  const handleEventError = () => {
    try {
      throw new Error('Error in event handler!');
    } catch (error) {
      setEventHandlerError(error.message);
      console.error('Event handler error:', error);
    }
  };
  
  const handleAsyncError = async () => {
    try {
      await new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Async operation failed!')), 1000)
      );
    } catch (error) {
      setAsyncError(error.message);
      console.error('Async error:', error);
    }
  };
  
  const handleNetworkError = async () => {
    try {
      const response = await fetch('https://invalid-url-that-will-fail.com/api');
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
    } catch (error) {
      setNetworkError('Network request failed');
      console.error('Network error:', error);
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Different Error Types</h4>
        
        <div className="grid grid-cols-3 gap-3 mb-4">
          <button 
            onClick={handleEventError}
            className="px-4 py-2 bg-purple-500 text-white rounded"
          >
            Event Error
          </button>
          <button 
            onClick={handleAsyncError}
            className="px-4 py-2 bg-purple-600 text-white rounded"
          >
            Async Error
          </button>
          <button 
            onClick={handleNetworkError}
            className="px-4 py-2 bg-purple-700 text-white rounded"
          >
            Network Error
          </button>
        </div>
        
        <div className="space-y-2">
          {eventHandlerError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-red-700">Event Handler Error</p>
                  <p className="text-xs text-red-600">{eventHandlerError}</p>
                </div>
                <button 
                  onClick={() => setEventHandlerError(null)}
                  className="text-red-700 hover:text-red-900"
                >
                  ×
                </button>
              </div>
            </div>
          )}
          
          {asyncError && (
            <div className="p-3 bg-orange-50 border border-orange-200 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-orange-700">Async Error</p>
                  <p className="text-xs text-orange-600">{asyncError}</p>
                </div>
                <button 
                  onClick={() => setAsyncError(null)}
                  className="text-orange-700 hover:text-orange-900"
                >
                  ×
                </button>
              </div>
            </div>
          )}
          
          {networkError && (
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-semibold text-yellow-700">Network Error</p>
                  <p className="text-xs text-yellow-600">{networkError}</p>
                </div>
                <button 
                  onClick={() => setNetworkError(null)}
                  className="text-yellow-700 hover:text-yellow-900"
                >
                  ×
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-purple-100 rounded text-xs">
          <p className="font-semibold mb-2">Handling Different Errors:</p>
          <pre className="bg-white p-2 rounded overflow-x-auto">
{`// Event handlers - try-catch
const handleClick = () => {
  try {
    riskyOperation();
  } catch (error) {
    setError(error);
  }
};

// Async - try-catch with await
const fetchData = async () => {
  try {
    await fetch('/api/data');
  } catch (error) {
    setError(error);
  }
};`}
          </pre>
        </div>
      </div>
    </div>
  );
}

// ============= TOAST NOTIFICATIONS DEMO =============
function ToastDemo() {
  const [toasts, setToasts] = useState([]);
  
  const addToast = (message, type) => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      removeToast(id);
    }, 5000);
  };
  
  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };
  
  const toastStyles = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-white',
    info: 'bg-blue-500 text-white'
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">Toast Notifications (User Feedback)</h4>
        
        <div className="grid grid-cols-2 gap-2 mb-4">
          <button 
            onClick={() => addToast('Operation successful!', 'success')}
            className="px-4 py-2 bg-green-500 text-white rounded"
          >
            Success Toast
          </button>
          <button 
            onClick={() => addToast('An error occurred!', 'error')}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            Error Toast
          </button>
          <button 
            onClick={() => addToast('Warning: Check this!', 'warning')}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Warning Toast
          </button>
          <button 
            onClick={() => addToast('Information message', 'info')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Info Toast
          </button>
        </div>
        
        <div className="fixed top-4 right-4 space-y-2 z-50">
          {toasts.map(toast => (
            <div 
              key={toast.id}
              className={`${toastStyles[toast.type]} px-4 py-3 rounded shadow-lg flex items-center justify-between gap-3 min-w-64 animate-slide-in`}
            >
              <span className="text-sm">{toast.message}</span>
              <button 
                onClick={() => removeToast(toast.id)}
                className="text-white hover:text-gray-200 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        
        <div className="p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-1">Toast Notifications:</p>
          <p>• Auto-dismiss after 5 seconds</p>
          <p>• Different colors for different types</p>
          <p>• Manual dismiss with × button</p>
          <p>• Fixed position (top-right)</p>
          <p className="mt-2">Libraries: react-hot-toast, react-toastify</p>
        </div>
      </div>
    </div>
  );
}

// ============= RETRY LOGIC DEMO =============
function RetryLogicDemo() {
  const [status, setStatus] = useState('idle');
  const [retryCount, setRetryCount] = useState(0);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  
  const simulateApiCall = async () => {
    setStatus('loading');
    setError(null);
    
    const maxRetries = 3;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        setRetryCount(attempt);
        
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // 60% chance of failure to demonstrate retries
        if (Math.random() < 0.6) {
          throw new Error('Simulated API failure');
        }
        
        // Success
        setData({ message: 'Data loaded successfully!', attempt });
        setStatus('success');
        setRetryCount(0);
        return;
      } catch (err) {
        if (attempt === maxRetries) {
          setError(err);
          setStatus('error');
          return;
        }
        
        // Exponential backoff
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Retry Logic with Exponential Backoff</h4>
        
        <button 
          onClick={simulateApiCall}
          disabled={status === 'loading'}
          className="mb-4 px-4 py-2 bg-orange-600 text-white rounded font-semibold disabled:opacity-50"
        >
          {status === 'loading' ? 'Attempting...' : 'Simulate API Call (60% fail rate)'}
        </button>
        
        <div className="p-4 bg-white rounded border min-h-32">
          {status === 'loading' && (
            <div className="flex items-center gap-3">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500"></div>
              <div>
                <p className="text-sm font-semibold">Attempting request...</p>
                <p className="text-xs text-gray-600">Retry attempt: {retryCount} of 3</p>
              </div>
            </div>
          )}
          
          {status === 'success' && data && (
            <div className="p-3 bg-green-100 rounded border border-green-300">
              <p className="text-green-700 font-semibold mb-1">✓ Success!</p>
              <p className="text-sm">{data.message}</p>
              <p className="text-xs text-gray-600 mt-1">
                Succeeded on attempt {data.attempt + 1}
              </p>
            </div>
          )}
          
          {status === 'error' && error && (
            <div className="p-3 bg-red-100 rounded border border-red-300">
              <p className="text-red-700 font-semibold mb-1">✗ Failed after 3 retries</p>
              <p className="text-sm text-red-600">{error.message}</p>
              <button 
                onClick={simulateApiCall}
                className="mt-2 px-3 py-1 bg-red-500 text-white rounded text-sm"
              >
                Try Again
              </button>
            </div>
          )}
          
          {status === 'idle' && (
            <div className="text-center text-gray-400 py-8">
              Click button to simulate API call
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-1">Exponential Backoff:</p>
          <p>• Attempt 1: Immediate</p>
          <p>• Attempt 2: Wait 1 second</p>
          <p>• Attempt 3: Wait 2 seconds</p>
          <p>• Attempt 4: Wait 4 seconds</p>
          <p className="mt-2">Prevents overwhelming the server with rapid retries!</p>
        </div>
      </div>
    </div>
  );
}

// ============= ERROR MESSAGE PATTERNS =============
function ErrorMessagePatternsDemo() {
  const [errorType, setErrorType] = useState(null);
  
  const triggerError = (type) => {
    setErrorType(type);
  };
  
  const errorMessages = {
    404: {
      icon: '🔍',
      title: 'Not Found',
      message: 'The resource you\'re looking for doesn\'t exist.',
      actions: ['Go Home', 'Search'],
      color: 'orange'
    },
    403: {
      icon: '🔒',
      title: 'Access Denied',
      message: 'You don\'t have permission to access this resource.',
      actions: ['Contact Support', 'Go Back'],
      color: 'red'
    },
    500: {
      icon: '⚠️',
      title: 'Server Error',
      message: 'Something went wrong on our end. Please try again later.',
      actions: ['Retry', 'Report Issue'],
      color: 'red'
    },
    network: {
      icon: '📡',
      title: 'Network Error',
      message: 'Unable to connect. Please check your internet connection.',
      actions: ['Retry', 'Offline Mode'],
      color: 'gray'
    },
    validation: {
      icon: '📝',
      title: 'Validation Error',
      message: 'Please check the form and fix the errors.',
      actions: ['Review Form'],
      color: 'yellow'
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Error Message Patterns</h4>
        
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
            Network
          </button>
          <button onClick={() => triggerError('validation')} className="px-3 py-2 bg-yellow-500 text-white rounded text-sm">
            Validation
          </button>
          <button onClick={() => setErrorType(null)} className="px-3 py-2 bg-green-500 text-white rounded text-sm">
            Clear
          </button>
        </div>
        
        <div className="min-h-40 p-4 bg-white rounded border">
          {errorType && errorMessages[errorType] ? (
            <div className={`p-4 bg-${errorMessages[errorType].color}-50 border border-${errorMessages[errorType].color}-200 rounded`}>
              <div className="flex items-start gap-3 mb-3">
                <div className="text-3xl">{errorMessages[errorType].icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{errorMessages[errorType].title}</h3>
                  <p className="text-sm text-gray-700">{errorMessages[errorType].message}</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                {errorMessages[errorType].actions.map(action => (
                  <button 
                    key={action}
                    className={`px-3 py-1 bg-${errorMessages[errorType].color}-500 text-white rounded text-sm`}
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-32 text-gray-400">
              Click a button to see error message pattern
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">Error Message Best Practices:</p>
          <p>✅ Use clear, non-technical language</p>
          <p>✅ Explain what happened</p>
          <p>✅ Provide actionable next steps</p>
          <p>✅ Different errors = different UI</p>
          <p>✅ Include helpful icons/imagery</p>
          <p>❌ Never show stack traces to users in production</p>
        </div>
      </div>
    </div>
  );
}

// ============= ERROR RECOVERY DEMO =============
function ErrorRecoveryDemo() {
  const [attempts, setAttempts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const attemptOperation = async () => {
    setIsLoading(true);
    const timestamp = new Date().toLocaleTimeString();
    
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // 50% success rate
    const success = Math.random() > 0.5;
    
    setAttempts(prev => [...prev, {
      timestamp,
      success,
      message: success ? 'Operation succeeded ✓' : 'Operation failed ✗'
    }]);
    
    setIsLoading(false);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Error Recovery Strategies</h4>
        
        <button 
          onClick={attemptOperation}
          disabled={isLoading}
          className="mb-4 px-4 py-2 bg-indigo-600 text-white rounded font-semibold disabled:opacity-50"
        >
          {isLoading ? 'Attempting...' : 'Attempt Operation (50% success)'}
        </button>
        
        <div className="p-4 bg-white rounded border">
          <div className="flex justify-between items-center mb-3">
            <p className="text-sm font-semibold">Attempt Log:</p>
            <button 
              onClick={() => setAttempts([])}
              className="text-xs px-2 py-1 bg-gray-400 text-white rounded"
            >
              Clear
            </button>
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {attempts.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No attempts yet</p>
            ) : (
              attempts.slice().reverse().map((attempt, i) => (
                <div 
                  key={i}
                  className={`p-2 rounded text-sm ${
                    attempt.success 
                      ? 'bg-green-50 border border-green-200' 
                      : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className={attempt.success ? 'text-green-700' : 'text-red-700'}>
                    {attempt.message}
                  </p>
                  <p className="text-xs text-gray-600">{attempt.timestamp}</p>
                </div>
              ))
            )}
          </div>
          
          <div className="mt-3 pt-3 border-t">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-600">Success Rate:</p>
                <p className="font-semibold text-green-600">
                  {attempts.length > 0 
                    ? Math.round((attempts.filter(a => a.success).length / attempts.length) * 100)
                    : 0}%
                </p>
              </div>
              <div>
                <p className="text-xs text-gray-600">Total Attempts:</p>
                <p className="font-semibold">{attempts.length}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-1">Recovery Strategies:</p>
          <p>• <strong>Retry:</strong> Try the operation again</p>
          <p>• <strong>Fallback:</strong> Use cached/default data</p>
          <p>• <strong>Graceful Degradation:</strong> Show partial UI</p>
          <p>• <strong>User Action:</strong> Let user decide what to do</p>
        </div>
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('boundary');
  
  const tabs = [
    { id: 'boundary', label: 'Error Boundaries', component: ErrorBoundaryDemo },
    { id: 'types', label: 'Error Types', component: ErrorTypesDemo },
    { id: 'messages', label: 'Error Messages', component: ErrorMessagePatternsDemo },
    { id: 'toasts', label: 'Toast Notifications', component: ToastDemo },
    { id: 'retry', label: 'Retry Logic', component: RetryLogicDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 18: Error Handling & Logging</h1>
            <p className="text-red-100">Build Resilient Applications</p>
          </div>
          
          <div className="flex overflow-x-auto bg-gray-100 border-b">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 font-medium whitespace-nowrap transition ${
                  activeTab === tab.id
                    ? 'bg-white text-red-600 border-b-2 border-red-600'
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
              🛡️ Good error handling = professional, reliable applications!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}