import { useState, useRef, useEffect } from 'react';

// ============= BASIC EVENTS DEMO =============
function BasicEventsDemo() {
  const [clickCount, setClickCount] = useState(0);
  const [lastEvent, setLastEvent] = useState('None');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = (e) => {
    setClickCount(prev => prev + 1);
    setLastEvent(`Click (${e.clientX}, ${e.clientY})`);
  };
  
  const handleDoubleClick = () => {
    setLastEvent('Double Click');
  };
  
  const handleRightClick = (e) => {
    e.preventDefault();
    setLastEvent('Right Click (prevented context menu)');
  };
  
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: Math.round(e.clientX - rect.left),
      y: Math.round(e.clientY - rect.top)
    });
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">Mouse Events</h4>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          <button 
            onClick={handleClick}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Click Me
          </button>
          
          <button 
            onDoubleClick={handleDoubleClick}
            className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
          >
            Double Click
          </button>
          
          <button 
            onContextMenu={handleRightClick}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Right Click
          </button>
        </div>
        
        <div className="p-3 bg-white rounded border mb-4">
          <p className="text-sm"><strong>Click Count:</strong> {clickCount}</p>
          <p className="text-sm"><strong>Last Event:</strong> {lastEvent}</p>
        </div>
        
        <div 
          className={`relative h-40 border-2 rounded transition-colors ${
            isHovered ? 'bg-blue-100 border-blue-500' : 'bg-white border-gray-300'
          }`}
          onMouseMove={handleMouseMove}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div className="absolute top-2 left-2 text-sm text-gray-700">
            <p>Mouse Position: ({mousePos.x}, {mousePos.y})</p>
            <p>{isHovered ? '🎯 Mouse Inside' : '❌ Mouse Outside'}</p>
          </div>
          <div 
            className="absolute w-3 h-3 bg-red-500 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{ left: mousePos.x, top: mousePos.y }}
          />
        </div>
      </div>
      
      <div className="p-3 bg-blue-50 rounded text-xs">
        <pre className="bg-white p-2 rounded overflow-x-auto">
{`<button onClick={handleClick}>Click Me</button>
<button onDoubleClick={handleDoubleClick}>Double Click</button>
<div onMouseMove={handleMouseMove}>Track mouse</div>`}
        </pre>
      </div>
    </div>
  );
}

// ============= KEYBOARD EVENTS DEMO =============
function KeyboardEventsDemo() {
  const [pressedKey, setPressedKey] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [keyInfo, setKeyInfo] = useState({});
  const [shortcuts, setShortcuts] = useState([]);
  
  const handleKeyDown = (e) => {
    setPressedKey(e.key);
    setKeyInfo({
      key: e.key,
      code: e.code,
      ctrl: e.ctrlKey,
      shift: e.shiftKey,
      alt: e.altKey,
      meta: e.metaKey
    });
    
    // Keyboard shortcuts
    if (e.ctrlKey && e.key === 's') {
      e.preventDefault();
      setShortcuts(prev => [...prev, 'Ctrl+S (Save)']);
    } else if (e.ctrlKey && e.key === 'z') {
      e.preventDefault();
      setShortcuts(prev => [...prev, 'Ctrl+Z (Undo)']);
    } else if (e.key === 'Escape') {
      setInputValue('');
      setShortcuts(prev => [...prev, 'Esc (Clear)']);
    }
  };
  
  const handleKeyUp = () => {
    setPressedKey('');
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Keyboard Events</h4>
        
        <input 
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
          placeholder="Type here or try Ctrl+S, Ctrl+Z, Esc..."
          className="w-full px-3 py-2 border rounded mb-3 focus:ring-2 focus:ring-purple-500 focus:outline-none"
        />
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Current Key</p>
            <div className="text-3xl text-center py-4 bg-gray-50 rounded">
              {pressedKey || '—'}
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Key Info</p>
            <div className="text-xs space-y-1">
              <p><strong>Key:</strong> {keyInfo.key || 'N/A'}</p>
              <p><strong>Code:</strong> {keyInfo.code || 'N/A'}</p>
              <p><strong>Modifiers:</strong></p>
              <div className="pl-2">
                <p>Ctrl: {keyInfo.ctrl ? '✓' : '✗'}</p>
                <p>Shift: {keyInfo.shift ? '✓' : '✗'}</p>
                <p>Alt: {keyInfo.alt ? '✓' : '✗'}</p>
              </div>
            </div>
          </div>
        </div>
        
        {shortcuts.length > 0 && (
          <div className="mt-3 p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm font-semibold mb-2">Shortcuts Triggered:</p>
            <div className="space-y-1">
              {shortcuts.slice(-5).map((shortcut, i) => (
                <div key={i} className="text-xs bg-white px-2 py-1 rounded">
                  {shortcut}
                </div>
              ))}
            </div>
            <button 
              onClick={() => setShortcuts([])}
              className="mt-2 text-xs px-2 py-1 bg-red-500 text-white rounded"
            >
              Clear
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ============= EVENT PROPAGATION DEMO =============
function EventPropagationDemo() {
  const [events, setEvents] = useState([]);
  
  const addEvent = (elementName) => {
    setEvents(prev => [...prev, `${elementName} clicked`]);
  };
  
  const handleGrandparentClick = () => {
    addEvent('Grandparent (outer)');
  };
  
  const handleParentClick = () => {
    addEvent('Parent (middle)');
  };
  
  const handleChildClick = () => {
    addEvent('Child (inner)');
  };
  
  const handleChildClickStop = (e) => {
    e.stopPropagation();
    addEvent('Child (stopped propagation)');
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Event Propagation (Bubbling)</h4>
        
        <div className="mb-4">
          <button 
            onClick={() => setEvents([])}
            className="px-3 py-1 bg-gray-500 text-white rounded text-sm"
          >
            Clear Events
          </button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm font-semibold mb-2">With Bubbling:</p>
            <div 
              onClick={handleGrandparentClick}
              className="p-6 bg-red-100 border-2 border-red-300 rounded cursor-pointer"
            >
              <div className="text-xs mb-2">Grandparent</div>
              <div 
                onClick={handleParentClick}
                className="p-4 bg-yellow-100 border-2 border-yellow-300 rounded"
              >
                <div className="text-xs mb-2">Parent</div>
                <div 
                  onClick={handleChildClick}
                  className="p-3 bg-green-100 border-2 border-green-300 rounded"
                >
                  <div className="text-xs">Child - Click Here</div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-semibold mb-2">Stopped Propagation:</p>
            <div 
              onClick={handleGrandparentClick}
              className="p-6 bg-red-100 border-2 border-red-300 rounded cursor-pointer"
            >
              <div className="text-xs mb-2">Grandparent</div>
              <div 
                onClick={handleParentClick}
                className="p-4 bg-yellow-100 border-2 border-yellow-300 rounded"
              >
                <div className="text-xs mb-2">Parent</div>
                <div 
                  onClick={handleChildClickStop}
                  className="p-3 bg-blue-100 border-2 border-blue-300 rounded"
                >
                  <div className="text-xs">Child - Click Here</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {events.length > 0 && (
          <div className="mt-4 p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Event Order (newest first):</p>
            <div className="space-y-1">
              {events.slice().reverse().map((event, i) => (
                <div key={i} className="text-xs bg-gray-50 px-2 py-1 rounded">
                  {events.length - i}. {event}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="p-3 bg-orange-50 rounded text-xs">
        <pre className="bg-white p-2 rounded overflow-x-auto">
{`// Allow bubbling
<div onClick={handleParent}>
  <button onClick={handleChild}>Click</button>
</div>

// Stop bubbling
const handleChild = (e) => {
  e.stopPropagation(); // Stops event from reaching parent
};`}
        </pre>
      </div>
    </div>
  );
}

// ============= CONTROLLED VS UNCONTROLLED DEMO =============
function ControlledVsUncontrolledDemo() {
  const [controlledValue, setControlledValue] = useState('');
  const uncontrolledRef = useRef(null);
  const [uncontrolledValue, setUncontrolledValue] = useState('');
  
  const getUncontrolledValue = () => {
    setUncontrolledValue(uncontrolledRef.current.value);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">Controlled vs Uncontrolled Components</h4>
        
        <div className="grid grid-cols-2 gap-4">
          {/* Controlled */}
          <div className="p-3 bg-white rounded border-2 border-green-500">
            <p className="text-sm font-semibold mb-2 text-green-700">
              ✅ Controlled Component
            </p>
            <input 
              type="text"
              value={controlledValue}
              onChange={(e) => setControlledValue(e.target.value)}
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="text-xs space-y-1 bg-green-50 p-2 rounded">
              <p><strong>Value in state:</strong> {controlledValue}</p>
              <p><strong>Length:</strong> {controlledValue.length}</p>
              <p><strong>Uppercase:</strong> {controlledValue.toUpperCase()}</p>
            </div>
            <button 
              onClick={() => setControlledValue('')}
              className="mt-2 w-full px-3 py-1 bg-green-500 text-white rounded text-sm"
            >
              Clear (via setState)
            </button>
            <pre className="text-xs mt-2 bg-gray-50 p-2 rounded">
{`value={state}
onChange={e => setState(e.target.value)}`}
            </pre>
          </div>
          
          {/* Uncontrolled */}
          <div className="p-3 bg-white rounded border-2 border-blue-500">
            <p className="text-sm font-semibold mb-2 text-blue-700">
              🔵 Uncontrolled Component
            </p>
            <input 
              ref={uncontrolledRef}
              type="text"
              defaultValue=""
              placeholder="Type here..."
              className="w-full px-3 py-2 border rounded mb-2"
            />
            <div className="text-xs space-y-1 bg-blue-50 p-2 rounded">
              <p><strong>Value (on click):</strong> {uncontrolledValue}</p>
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
                  setUncontrolledValue('');
                }}
                className="px-3 py-1 bg-blue-500 text-white rounded text-sm"
              >
                Clear (via ref)
              </button>
            </div>
            <pre className="text-xs mt-2 bg-gray-50 p-2 rounded">
{`ref={inputRef}
defaultValue=""
// Access: ref.current.value`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= FORM VALIDATION DEMO =============
function FormValidationDemo() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  
  const validate = (name, value) => {
    switch (name) {
      case 'email':
        if (!value) return 'Email is required';
        if (!/\S+@\S+\.\S+/.test(value)) return 'Email is invalid';
        return '';
      
      case 'password':
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        if (!/[A-Z]/.test(value)) return 'Must contain uppercase letter';
        if (!/[0-9]/.test(value)) return 'Must contain number';
        return '';
      
      case 'confirmPassword':
        if (!value) return 'Please confirm password';
        if (value !== formData.password) return 'Passwords do not match';
        return '';
      
      default:
        return '';
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change if already touched
    if (touched[name]) {
      const error = validate(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    const error = validate(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
    
    // Validate all fields
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      const error = validate(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      alert('Form submitted successfully! ✓');
      setFormData({ email: '', password: '', confirmPassword: '' });
      setTouched({});
      setSubmitted(false);
    }
  };
  
  const getInputClass = (name) => {
    const base = "w-full px-3 py-2 border rounded focus:outline-none focus:ring-2";
    if (touched[name] && errors[name]) {
      return `${base} border-red-500 focus:ring-red-500`;
    }
    if (touched[name] && !errors[name]) {
      return `${base} border-green-500 focus:ring-green-500`;
    }
    return `${base} border-gray-300 focus:ring-blue-500`;
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Form Validation</h4>
        
        <div className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Email *
            </label>
            <input 
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('email')}
              placeholder="user@example.com"
            />
            {touched.email && errors.email && (
              <p className="text-xs text-red-600 mt-1">❌ {errors.email}</p>
            )}
            {touched.email && !errors.email && formData.email && (
              <p className="text-xs text-green-600 mt-1">✓ Looks good!</p>
            )}
          </div>
          
          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Password *
            </label>
            <input 
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('password')}
              placeholder="Min 6 chars, 1 uppercase, 1 number"
            />
            {touched.password && errors.password && (
              <p className="text-xs text-red-600 mt-1">❌ {errors.password}</p>
            )}
            {touched.password && !errors.password && formData.password && (
              <p className="text-xs text-green-600 mt-1">✓ Strong password!</p>
            )}
          </div>
          
          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Confirm Password *
            </label>
            <input 
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              onBlur={handleBlur}
              className={getInputClass('confirmPassword')}
              placeholder="Repeat password"
            />
            {touched.confirmPassword && errors.confirmPassword && (
              <p className="text-xs text-red-600 mt-1">❌ {errors.confirmPassword}</p>
            )}
            {touched.confirmPassword && !errors.confirmPassword && formData.confirmPassword && (
              <p className="text-xs text-green-600 mt-1">✓ Passwords match!</p>
            )}
          </div>
          
          <button 
            onClick={handleSubmit}
            className="w-full px-4 py-2 bg-indigo-600 text-white rounded font-medium hover:bg-indigo-700 transition"
          >
            Submit
          </button>
        </div>
        
        {submitted && Object.keys(errors).length > 0 && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
            <p className="text-sm font-semibold text-red-700 mb-2">
              Please fix the following errors:
            </p>
            <ul className="text-xs text-red-600 space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <li key={field}>• {field}: {error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// ============= PASSING ARGUMENTS DEMO =============
function PassingArgumentsDemo() {
  const [deletedItems, setDeletedItems] = useState([]);
  
  const items = [
    { id: 1, name: 'Item 1', color: 'bg-red-100' },
    { id: 2, name: 'Item 2', color: 'bg-blue-100' },
    { id: 3, name: 'Item 3', color: 'bg-green-100' }
  ];
  
  // Method 1: Arrow function wrapper
  const handleDeleteWrapper = (id, name) => {
    setDeletedItems(prev => [...prev, `${name} (Method 1: Arrow wrapper)`]);
  };
  
  // Method 2: Currying
  const handleDeleteCurry = (id, name) => (event) => {
    console.log('Event:', event.type);
    setDeletedItems(prev => [...prev, `${name} (Method 2: Currying)`]);
  };
  
  // Method 3: Data attributes
  const handleDeleteData = (event) => {
    const id = event.target.dataset.id;
    const name = event.target.dataset.name;
    setDeletedItems(prev => [...prev, `${name} (Method 3: Data attributes)`]);
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Passing Arguments to Event Handlers</h4>
        
        <div className="space-y-6">
          {/* Method 1 */}
          <div>
            <p className="text-sm font-semibold mb-2">Method 1: Arrow Function Wrapper</p>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className={`flex items-center justify-between p-2 ${item.color} rounded`}>
                  <span className="text-sm">{item.name}</span>
                  <button 
                    onClick={() => handleDeleteWrapper(item.id, item.name)}
                    className="px-3 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <pre className="text-xs mt-2 bg-white p-2 rounded">
{`onClick={() => handleDelete(id, name)}`}
            </pre>
          </div>
          
          {/* Method 2 */}
          <div>
            <p className="text-sm font-semibold mb-2">Method 2: Currying (Returns Function)</p>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className={`flex items-center justify-between p-2 ${item.color} rounded`}>
                  <span className="text-sm">{item.name}</span>
                  <button 
                    onClick={handleDeleteCurry(item.id, item.name)}
                    className="px-3 py-1 bg-purple-500 text-white rounded text-xs hover:bg-purple-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <pre className="text-xs mt-2 bg-white p-2 rounded">
{`const handleDelete = (id) => (event) => {
  console.log(id, event);
};
onClick={handleDelete(id)}`}
            </pre>
          </div>
          
          {/* Method 3 */}
          <div>
            <p className="text-sm font-semibold mb-2">Method 3: Data Attributes</p>
            <div className="space-y-2">
              {items.map(item => (
                <div key={item.id} className={`flex items-center justify-between p-2 ${item.color} rounded`}>
                  <span className="text-sm">{item.name}</span>
                  <button 
                    onClick={handleDeleteData}
                    data-id={item.id}
                    data-name={item.name}
                    className="px-3 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <pre className="text-xs mt-2 bg-white p-2 rounded">
{`<button 
  onClick={handleDelete}
  data-id={id}
>
const handleDelete = (e) => {
  const id = e.target.dataset.id;
}`}
            </pre>
          </div>
        </div>
        
        {deletedItems.length > 0 && (
          <div className="mt-4 p-3 bg-white rounded border">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm font-semibold">Deletion Log:</p>
              <button 
                onClick={() => setDeletedItems([])}
                className="text-xs px-2 py-1 bg-gray-500 text-white rounded"
              >
                Clear
              </button>
            </div>
            <div className="space-y-1">
              {deletedItems.slice(-5).map((item, i) => (
                <div key={i} className="text-xs bg-gray-50 px-2 py-1 rounded">
                  {item}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============= MAIN APP =============
export default function App() {
  const [activeTab, setActiveTab] = useState('basic');
  
  const tabs = [
    { id: 'basic', label: 'Basic Events', component: BasicEventsDemo },
    { id: 'keyboard', label: 'Keyboard', component: KeyboardEventsDemo },
    { id: 'propagation', label: 'Propagation', component: EventPropagationDemo },
    { id: 'controlled', label: 'Controlled vs Uncontrolled', component: ControlledVsUncontrolledDemo },
    { id: 'validation', label: 'Form Validation', component: FormValidationDemo },
    { id: 'arguments', label: 'Passing Arguments', component: PassingArgumentsDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 3: Event Handling</h1>
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
              🎯 Try all the interactive examples to master event handling!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}