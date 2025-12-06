import { useState, useEffect } from 'react';

// ============= SSR vs CSR COMPARISON DEMO =============
function SSRvsCSRDemo() {
  const [mode, setMode] = useState('csr');
  const [loading, setLoading] = useState(false);
  const [timeline, setTimeline] = useState([]);
  
  const simulateLoad = async (type) => {
    setTimeline([]);
    setLoading(true);
    
    if (type === 'csr') {
      // Client-Side Rendering
      setTimeline(prev => [...prev, '0ms: Browser requests page']);
      await new Promise(r => setTimeout(r, 200));
      
      setTimeline(prev => [...prev, '200ms: Server sends empty HTML']);
      await new Promise(r => setTimeout(r, 300));
      
      setTimeline(prev => [...prev, '500ms: Browser downloads JS bundle (200KB)']);
      await new Promise(r => setTimeout(r, 800));
      
      setTimeline(prev => [...prev, '1300ms: React initializes']);
      await new Promise(r => setTimeout(r, 400));
      
      setTimeline(prev => [...prev, '1700ms: Fetch API data']);
      await new Promise(r => setTimeout(r, 600));
      
      setTimeline(prev => [...prev, '2300ms: User sees content ✓']);
    } else {
      // Server-Side Rendering
      setTimeline(prev => [...prev, '0ms: Browser requests page']);
      await new Promise(r => setTimeout(r, 300));
      
      setTimeline(prev => [...prev, '300ms: Server fetches data']);
      await new Promise(r => setTimeout(r, 400));
      
      setTimeline(prev => [...prev, '700ms: Server renders React to HTML']);
      await new Promise(r => setTimeout(r, 200));
      
      setTimeline(prev => [...prev, '900ms: User sees content ✓']);
      await new Promise(r => setTimeout(r, 300));
      
      setTimeline(prev => [...prev, '1200ms: JavaScript hydrates page']);
    }
    
    setLoading(false);
  };
  
  useEffect(() => {
    simulateLoad(mode);
  }, [mode]);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-blue-50 rounded-lg">
        <h4 className="font-semibold mb-3">SSR vs CSR Comparison</h4>
        
        <div className="mb-4 flex gap-2">
          <button 
            onClick={() => setMode('csr')}
            className={`flex-1 px-4 py-2 rounded font-semibold ${
              mode === 'csr' ? 'bg-red-500 text-white' : 'bg-white border'
            }`}
          >
            Client-Side Rendering (CSR)
          </button>
          <button 
            onClick={() => setMode('ssr')}
            className={`flex-1 px-4 py-2 rounded font-semibold ${
              mode === 'ssr' ? 'bg-green-500 text-white' : 'bg-white border'
            }`}
          >
            Server-Side Rendering (SSR)
          </button>
        </div>
        
        <div className="p-4 bg-white rounded border mb-4 min-h-64">
          <p className="text-sm font-semibold mb-3">Loading Timeline:</p>
          <div className="space-y-2">
            {timeline.map((event, i) => (
              <div 
                key={i}
                className={`p-2 rounded text-sm ${
                  event.includes('✓') ? 'bg-green-100 text-green-700 font-semibold' : 'bg-gray-50'
                }`}
              >
                {event}
              </div>
            ))}
            {loading && (
              <div className="flex items-center gap-2 p-2 bg-blue-50 rounded">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
                <span className="text-sm">Processing...</span>
              </div>
            )}
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-red-50 rounded border border-red-200">
            <p className="text-sm font-semibold text-red-700 mb-2">CSR (Client-Side)</p>
            <p className="text-xs mb-1">⏱️ Time to content: ~2.3s</p>
            <p className="text-xs mb-1">🔍 SEO: Poor (empty HTML)</p>
            <p className="text-xs mb-1">📦 Initial load: Large JS bundle</p>
            <p className="text-xs">💻 Server: Minimal work</p>
          </div>
          
          <div className="p-3 bg-green-50 rounded border border-green-200">
            <p className="text-sm font-semibold text-green-700 mb-2">SSR (Server-Side)</p>
            <p className="text-xs mb-1">⏱️ Time to content: ~0.9s</p>
            <p className="text-xs mb-1">🔍 SEO: Excellent (full HTML)</p>
            <p className="text-xs mb-1">📦 Initial load: HTML + hydration</p>
            <p className="text-xs">💻 Server: More work</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============= RENDERING STRATEGIES DEMO =============
function RenderingStrategiesDemo() {
  const [strategy, setStrategy] = useState('ssg');
  
  const strategies = {
    ssr: {
      name: 'Server-Side Rendering (SSR)',
      method: 'getServerSideProps',
      color: 'orange',
      description: 'Renders on every request',
      pros: ['Always fresh data', 'Dynamic per user', 'Can access request'],
      cons: ['Slower response', 'More server load', 'Can\'t cache on CDN'],
      useCase: 'User dashboards, personalized content',
      code: `export async function getServerSideProps(context) {
  const user = await fetchUser(context.req.cookies.token);
  
  return {
    props: { user }
  };
}

export default function Dashboard({ user }) {
  return <h1>Welcome {user.name}</h1>;
}`
    },
    ssg: {
      name: 'Static Site Generation (SSG)',
      method: 'getStaticProps',
      color: 'green',
      description: 'Builds HTML at build time',
      pros: ['Fastest load time', 'CDN cacheable', 'Low server cost'],
      cons: ['Data can be stale', 'Rebuild for updates', 'Long build time'],
      useCase: 'Marketing pages, blogs, documentation',
      code: `export async function getStaticProps() {
  const posts = await fetchPosts();
  
  return {
    props: { posts }
  };
}

export default function Blog({ posts }) {
  return <ul>{posts.map(post => ...)}</ul>;
}`
    },
    isr: {
      name: 'Incremental Static Regeneration (ISR)',
      method: 'getStaticProps + revalidate',
      color: 'blue',
      description: 'Static with background updates',
      pros: ['Fast like SSG', 'Fresh like SSR', 'Low server load'],
      cons: ['Complex caching', 'First user gets stale data'],
      useCase: 'E-commerce products, news articles',
      code: `export async function getStaticProps() {
  const products = await fetchProducts();
  
  return {
    props: { products },
    revalidate: 60  // Regenerate every 60 seconds
  };
}

export default function Products({ products }) {
  return <div>{products.map(product => ...)}</div>;
}`
    }
  };
  
  const current = strategies[strategy];
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-purple-50 rounded-lg">
        <h4 className="font-semibold mb-3">Rendering Strategies</h4>
        
        <div className="mb-4 grid grid-cols-3 gap-2">
          {Object.keys(strategies).map(key => (
            <button 
              key={key}
              onClick={() => setStrategy(key)}
              className={`px-4 py-2 rounded font-semibold uppercase ${
                strategy === key 
                  ? `bg-${strategies[key].color}-500 text-white` 
                  : 'bg-white border'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        
        <div className={`p-4 bg-${current.color}-100 rounded border border-${current.color}-300 mb-4`}>
          <h3 className="text-lg font-bold mb-2">{current.name}</h3>
          <p className="text-sm mb-3">{current.description}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-3">
            <div>
              <p className="text-xs font-semibold mb-1">Pros:</p>
              <ul className="text-xs space-y-1">
                {current.pros.map((pro, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-green-600">✓</span>
                    <span>{pro}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <p className="text-xs font-semibold mb-1">Cons:</p>
              <ul className="text-xs space-y-1">
                {current.cons.map((con, i) => (
                  <li key={i} className="flex items-start gap-1">
                    <span className="text-red-600">×</span>
                    <span>{con}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <p className="text-xs mb-2">
            <strong>Best for:</strong> {current.useCase}
          </p>
          <p className="text-xs">
            <strong>Method:</strong> <code className="bg-white px-2 py-0.5 rounded">{current.method}</code>
          </p>
        </div>
        
        <div className="p-4 bg-gray-900 text-green-400 rounded text-xs font-mono overflow-x-auto">
          <pre>{current.code}</pre>
        </div>
      </div>
    </div>
  );
}

// ============= ISR SIMULATION DEMO =============
function ISRSimulationDemo() {
  const [data, setData] = useState({ value: 100, timestamp: Date.now() });
  const [lastRevalidate, setLastRevalidate] = useState(Date.now());
  const [requestCount, setRequestCount] = useState(0);
  const [isStale, setIsStale] = useState(false);
  
  useEffect(() => {
    const interval = setInterval(() => {
      const elapsed = Date.now() - lastRevalidate;
      setIsStale(elapsed > 5000); // 5 seconds for demo (normally 60s)
    }, 1000);
    
    return () => clearInterval(interval);
  }, [lastRevalidate]);
  
  const handleRequest = () => {
    setRequestCount(prev => prev + 1);
    
    const elapsed = Date.now() - lastRevalidate;
    
    if (elapsed > 5000) {
      // Stale data, trigger revalidation in background
      setTimeout(() => {
        setData({ value: Math.floor(Math.random() * 1000), timestamp: Date.now() });
        setLastRevalidate(Date.now());
        setIsStale(false);
      }, 1000);
    }
  };
  
  const timeSinceRevalidate = Math.floor((Date.now() - lastRevalidate) / 1000);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-green-50 rounded-lg">
        <h4 className="font-semibold mb-3">ISR (Incremental Static Regeneration)</h4>
        
        <div className="mb-4 p-3 bg-white rounded border">
          <div className="grid grid-cols-3 gap-4 text-center mb-3">
            <div>
              <p className="text-xs text-gray-600">Requests Served</p>
              <p className="text-2xl font-bold text-green-600">{requestCount}</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Time Since Revalidate</p>
              <p className="text-2xl font-bold text-blue-600">{timeSinceRevalidate}s</p>
            </div>
            <div>
              <p className="text-xs text-gray-600">Status</p>
              <p className={`text-lg font-bold ${isStale ? 'text-orange-600' : 'text-green-600'}`}>
                {isStale ? 'STALE' : 'FRESH'}
              </p>
            </div>
          </div>
          
          <div className="p-3 bg-blue-50 rounded border border-blue-200">
            <p className="text-sm font-semibold mb-1">Current Data:</p>
            <p className="text-lg font-bold">Value: {data.value}</p>
            <p className="text-xs text-gray-600">
              Generated: {new Date(data.timestamp).toLocaleTimeString()}
            </p>
          </div>
        </div>
        
        <button 
          onClick={handleRequest}
          className="w-full px-4 py-2 bg-green-600 text-white rounded font-semibold mb-4"
        >
          Simulate User Request
        </button>
        
        <div className="p-3 bg-green-100 rounded text-xs">
          <p className="font-semibold mb-2">How ISR Works:</p>
          <p className="mb-1">1. First request: Serve static HTML (instant)</p>
          <p className="mb-1">2. After revalidate time (5s in demo): Serve stale HTML</p>
          <p className="mb-1">3. Trigger regeneration in background</p>
          <p className="mb-1">4. Next request: Serve fresh HTML</p>
          <p className="mt-2 font-semibold">Try clicking "Simulate User Request" multiple times!</p>
          <p className="mt-1">After 5 seconds, next request triggers background regeneration.</p>
        </div>
      </div>
    </div>
  );
}

// ============= DATA FETCHING METHODS COMPARISON =============
function DataFetchingMethodsDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-orange-50 rounded-lg">
        <h4 className="font-semibold mb-3">Next.js Data Fetching Methods</h4>
        
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse bg-white">
            <thead>
              <tr className="bg-orange-600 text-white">
                <th className="p-2 text-left border">Method</th>
                <th className="p-2 text-left border">When Runs</th>
                <th className="p-2 text-left border">Use Case</th>
                <th className="p-2 text-left border">Performance</th>
                <th className="p-2 text-left border">Data Freshness</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="p-2 border font-semibold">getServerSideProps</td>
                <td className="p-2 border">Every request</td>
                <td className="p-2 border">User-specific data</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-200 rounded">Slower</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded">Always fresh</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border font-semibold">getStaticProps</td>
                <td className="p-2 border">Build time</td>
                <td className="p-2 border">Static content</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded">Fastest</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-red-200 rounded">Stale</span>
                </td>
              </tr>
              <tr className="border-b">
                <td className="p-2 border font-semibold">getStaticProps + revalidate</td>
                <td className="p-2 border">Build + background</td>
                <td className="p-2 border">Dynamic content</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded">Fast</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded">Mostly fresh</span>
                </td>
              </tr>
              <tr>
                <td className="p-2 border font-semibold">Client-side fetch</td>
                <td className="p-2 border">After hydration</td>
                <td className="p-2 border">User interactions</td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-yellow-200 rounded">Varies</span>
                </td>
                <td className="p-2 border">
                  <span className="px-2 py-1 bg-green-200 rounded">Fresh</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div className="mt-4 p-3 bg-orange-100 rounded text-xs">
          <p className="font-semibold mb-2">Quick Decision Guide:</p>
          <p>🔄 <strong>Need real-time user data?</strong> → getServerSideProps</p>
          <p>📄 <strong>Content rarely changes?</strong> → getStaticProps</p>
          <p>⚡ <strong>Want fast + fresh?</strong> → getStaticProps + revalidate (ISR)</p>
          <p>👆 <strong>User interaction data?</strong> → Client-side fetch (SWR/React Query)</p>
        </div>
      </div>
    </div>
  );
}

// ============= SERVER VS CLIENT COMPONENTS =============
function ServerClientComponentsDemo() {
  const [showInteractive, setShowInteractive] = useState(false);
  const [count, setCount] = useState(0);
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-indigo-50 rounded-lg">
        <h4 className="font-semibold mb-3">Server vs Client Components (Next.js 13+)</h4>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="p-4 bg-white rounded border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <p className="font-semibold">Server Component</p>
            </div>
            <div className="text-xs space-y-2 mb-3">
              <p>✅ Fetch data directly</p>
              <p>✅ Access backend resources</p>
              <p>✅ Smaller bundle size</p>
              <p>✅ Better SEO</p>
              <p>❌ No useState/useEffect</p>
              <p>❌ No event handlers</p>
              <p>❌ No browser APIs</p>
            </div>
            <div className="p-2 bg-purple-50 rounded border text-xs">
              <p className="font-semibold mb-1">Default in App Router</p>
              <p>Renders on server only</p>
            </div>
          </div>
          
          <div className="p-4 bg-white rounded border">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="font-semibold">Client Component</p>
            </div>
            <div className="text-xs space-y-2 mb-3">
              <p>✅ useState/useEffect</p>
              <p>✅ Event handlers</p>
              <p>✅ Browser APIs</p>
              <p>✅ Interactive UI</p>
              <p>❌ Larger bundle</p>
              <p>❌ Can't access backend</p>
            </div>
            <div className="p-2 bg-blue-50 rounded border text-xs">
              <p className="font-semibold mb-1">Use 'use client' directive</p>
              <p>Renders on server + client</p>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-white rounded border mb-4">
          <p className="text-sm font-semibold mb-3">Example: Counter (Client Component)</p>
          <div className="flex items-center gap-4 mb-3">
            <button 
              onClick={() => setCount(count - 1)}
              className="px-3 py-2 bg-red-500 text-white rounded"
            >
              -
            </button>
            <span className="text-2xl font-bold">{count}</span>
            <button 
              onClick={() => setCount(count + 1)}
              className="px-3 py-2 bg-green-500 text-white rounded"
            >
              +
            </button>
          </div>
          <p className="text-xs text-gray-600">
            This needs 'use client' because it uses useState and onClick
          </p>
        </div>
        
        <div className="p-3 bg-indigo-100 rounded text-xs">
          <p className="font-semibold mb-2">Code Examples:</p>
          <pre className="overflow-x-auto bg-white p-2 rounded mb-2">
{`// Server Component (default)
async function ServerComponent() {
  const data = await fetch('...');
  return <div>{data}</div>;
}

// Client Component
'use client';
function ClientComponent() {
  const [state, setState] = useState(0);
  return <button onClick={...}>Click</button>;
}`}
          </pre>
          <p className="mt-2 font-semibold">Rule of thumb:</p>
          <p>Server components for data, client components for interactivity</p>
        </div>
      </div>
    </div>
  );
}

// ============= ROUTING PATTERNS DEMO =============
function RoutingPatternsDemo() {
  const [selectedPattern, setSelectedPattern] = useState('static');
  
  const patterns = {
    static: {
      title: 'Static Routes',
      structure: `pages/
├── index.js           → /
├── about.js           → /about
└── contact.js         → /contact`,
      example: `// pages/about.js
export default function About() {
  return <h1>About Page</h1>;
}

// URL: /about`
    },
    dynamic: {
      title: 'Dynamic Routes',
      structure: `pages/
├── posts/
│   └── [id].js        → /posts/:id
└── users/
    └── [username].js  → /users/:username`,
      example: `// pages/posts/[id].js
export default function Post({ params }) {
  const { id } = params;
  return <h1>Post {id}</h1>;
}

// URLs:
// /posts/1 → id = "1"
// /posts/abc → id = "abc"`
    },
    catchAll: {
      title: 'Catch-All Routes',
      structure: `pages/
└── docs/
    └── [...slug].js   → /docs/*`,
      example: `// pages/docs/[...slug].js
export default function Docs({ params }) {
  const { slug } = params;
  
  return <div>Path: {slug.join('/')}</div>;
}

// URLs:
// /docs/a → slug = ["a"]
// /docs/a/b/c → slug = ["a", "b", "c"]`
    },
    nested: {
      title: 'Nested Routes (App Router)',
      structure: `app/
├── dashboard/
│   ├── layout.js
│   ├── page.js        → /dashboard
│   ├── settings/
│   │   └── page.js    → /dashboard/settings
│   └── profile/
│       └── page.js    → /dashboard/profile`,
      example: `// app/dashboard/layout.js
export default function DashboardLayout({ children }) {
  return (
    <div>
      <Sidebar />
      <main>{children}</main>
    </div>
  );
}

// Layout wraps all dashboard pages`
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-pink-50 rounded-lg">
        <h4 className="font-semibold mb-3">Routing Patterns</h4>
        
        <div className="mb-4 grid grid-cols-2 gap-2">
          {Object.keys(patterns).map(key => (
            <button 
              key={key}
              onClick={() => setSelectedPattern(key)}
              className={`px-3 py-2 rounded capitalize ${
                selectedPattern === key 
                  ? 'bg-pink-600 text-white' 
                  : 'bg-white border'
              }`}
            >
              {patterns[key].title}
            </button>
          ))}
        </div>
        
        <div className="p-4 bg-white rounded border mb-4">
          <p className="text-sm font-semibold mb-3">{patterns[selectedPattern].title}</p>
          
          <div className="mb-3">
            <p className="text-xs font-semibold mb-1">File Structure:</p>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded">
              {patterns[selectedPattern].structure}
            </pre>
          </div>
          
          <div>
            <p className="text-xs font-semibold mb-1">Code Example:</p>
            <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto">
              {patterns[selectedPattern].example}
            </pre>
          </div>
        </div>
        
        <div className="p-3 bg-pink-100 rounded text-xs">
          <p className="font-semibold mb-1">Routing Tips:</p>
          <p>• [id].js for single parameter (pages/posts/[id].js)</p>
          <p>• [...slug].js for multiple segments (pages/docs/[...slug].js)</p>
          <p>• [[...slug]].js for optional catch-all</p>
          <p>• layout.js for shared layouts (App Router)</p>
        </div>
      </div>
    </div>
  );
}

// ============= SEO COMPARISON DEMO =============
function SEOComparisonDemo() {
  const [viewSource, setViewSource] = useState('ssr');
  
  const sources = {
    csr: {
      name: 'Client-Side Rendering',
      html: `<!DOCTYPE html>
<html>
  <head>
    <title>My React App</title>
  </head>
  <body>
    <div id="root"></div>
    <script src="/bundle.js"></script>
  </body>
</html>`,
      seo: 'Poor - Search engines see empty div',
      color: 'red'
    },
    ssr: {
      name: 'Server-Side Rendering',
      html: `<!DOCTYPE html>
<html>
  <head>
    <title>Product Name | My Store</title>
    <meta name="description" content="Amazing product..."/>
    <meta property="og:title" content="Product Name"/>
  </head>
  <body>
    <div id="root">
      <h1>Product Name</h1>
      <p>Price: $99.99</p>
      <button>Add to Cart</button>
    </div>
    <script src="/bundle.js"></script>
  </body>
</html>`,
      seo: 'Excellent - Full HTML with content',
      color: 'green'
    }
  };
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-teal-50 rounded-lg">
        <h4 className="font-semibold mb-3">SEO Impact: CSR vs SSR</h4>
        
        <div className="mb-4 flex gap-2">
          {Object.keys(sources).map(key => (
            <button 
              key={key}
              onClick={() => setViewSource(key)}
              className={`flex-1 px-4 py-2 rounded font-semibold uppercase ${
                viewSource === key 
                  ? `bg-${sources[key].color}-500 text-white` 
                  : 'bg-white border'
              }`}
            >
              {key}
            </button>
          ))}
        </div>
        
        <div className="mb-4">
          <p className="text-sm font-semibold mb-2">
            What Search Engines See ({sources[viewSource].name}):
          </p>
          <pre className="text-xs bg-gray-900 text-green-400 p-3 rounded overflow-x-auto max-h-64 overflow-y-auto">
            {sources[viewSource].html}
          </pre>
        </div>
        
        <div className={`p-3 bg-${sources[viewSource].color}-100 border border-${sources[viewSource].color}-300 rounded`}>
          <p className="text-sm">
            <strong>SEO Score:</strong> {sources[viewSource].seo}
          </p>
        </div>
        
        <div className="mt-4 p-3 bg-teal-100 rounded text-xs">
          <p className="font-semibold mb-1">Why SSR is Better for SEO:</p>
          <p>✅ Search engines see full content immediately</p>
          <p>✅ Meta tags are present for social sharing</p>
          <p>✅ Faster indexing</p>
          <p>✅ Better rankings</p>
          <p className="mt-2">CSR requires search engines to execute JavaScript!</p>
        </div>
      </div>
    </div>
  );
}

// ============= PERFORMANCE COMPARISON =============
function PerformanceComparisonDemo() {
  return (
    <div className="space-y-4">
      <div className="p-4 bg-yellow-50 rounded-lg">
        <h4 className="font-semibold mb-3">Performance Metrics Comparison</h4>
        
        <div className="space-y-4">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-3">Time to First Byte (TTFB)</p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>CSR</span>
                  <span>~50ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>SSG</span>
                  <span>~50ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>SSR</span>
                  <span>~300ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-3">Time to Interactive (TTI)</p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>CSR</span>
                  <span>~2500ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>SSG</span>
                  <span>~800ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '32%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>SSR</span>
                  <span>~1200ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '48%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-3">First Contentful Paint (FCP)</p>
            <div className="space-y-2">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>CSR</span>
                  <span>~1800ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>SSG</span>
                  <span>~200ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span>SSR</span>
                  <span>~500ms</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '25%' }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-3 bg-yellow-100 rounded text-xs">
          <p className="font-semibold mb-1">Performance Winner: SSG (Static)</p>
          <p>🥇 SSG - Fastest, best for static content</p>
          <p>🥈 ISR - Fast + fresh, best for most use cases</p>
          <p>🥉 SSR - Good for dynamic data</p>
          <p>❌ CSR - Slowest, but good for SPAs with less SEO concern</p>
        </div>
      </div>
    </div>
  );
}

// ============= DECISION TREE =============
function DecisionTreeDemo() {
  const [answers, setAnswers] = useState({
    needSEO: null,
    dataChanges: null,
    userSpecific: null
  });
  
  const getRecommendation = () => {
    if (answers.needSEO === false) {
      return { method: 'Client-Side Rendering (CSR)', reason: 'SEO not needed, simpler setup', color: 'gray' };
    }
    
    if (answers.userSpecific === true) {
      return { method: 'Server-Side Rendering (SSR)', reason: 'User-specific data requires SSR', color: 'orange' };
    }
    
    if (answers.dataChanges === 'never') {
      return { method: 'Static Site Generation (SSG)', reason: 'Static content = fastest load time', color: 'green' };
    }
    
    if (answers.dataChanges === 'frequently') {
      return { method: 'Incremental Static Regeneration (ISR)', reason: 'Balance of speed and freshness', color: 'blue' };
    }
    
    return null;
  };
  
  const recommendation = getRecommendation();
  
  return (
    <div className="space-y-4">
      <div className="p-4 bg-cyan-50 rounded-lg">
        <h4 className="font-semibold mb-3">Rendering Strategy Decision Tree</h4>
        
        <div className="space-y-3">
          <div className="p-3 bg-white rounded border">
            <p className="text-sm font-semibold mb-2">Q1: Do you need SEO?</p>
            <div className="flex gap-2">
              <button 
                onClick={() => setAnswers({ needSEO: true, dataChanges: null, userSpecific: null })}
                className={`flex-1 px-3 py-2 rounded ${
                  answers.needSEO === true ? 'bg-green-500 text-white' : 'bg-gray-200'
                }`}
              >
                Yes
              </button>
              <button 
                onClick={() => setAnswers({ needSEO: false, dataChanges: null, userSpecific: null })}
                className={`flex-1 px-3 py-2 rounded ${
                  answers.needSEO === false ? 'bg-blue-500 text-white' : 'bg-gray-200'
                }`}
              >
                No
              </button>
            </div>
          </div>
          
          {answers.needSEO === true && (
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-semibold mb-2">Q2: Is data user-specific?</p>
              <div className="flex gap-2">
                <button 
                  onClick={() => setAnswers({ ...answers, userSpecific: true })}
                  className={`flex-1 px-3 py-2 rounded ${
                    answers.userSpecific === true ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Yes
                </button>
                <button 
                  onClick={() => setAnswers({ ...answers, userSpecific: false, dataChanges: null })}
                  className={`flex-1 px-3 py-2 rounded ${
                    answers.userSpecific === false ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  No
                </button>
              </div>
            </div>
          )}
          
          {answers.needSEO === true && answers.userSpecific === false && (
            <div className="p-3 bg-white rounded border">
              <p className="text-sm font-semibold mb-2">Q3: How often does data change?</p>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={() => setAnswers({ ...answers, dataChanges: 'never' })}
                  className={`px-3 py-2 rounded ${
                    answers.dataChanges === 'never' ? 'bg-green-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Rarely/Never
                </button>
                <button 
                  onClick={() => setAnswers({ ...answers, dataChanges: 'frequently' })}
                  className={`px-3 py-2 rounded ${
                    answers.dataChanges === 'frequently' ? 'bg-blue-500 text-white' : 'bg-gray-200'
                  }`}
                >
                  Frequently
                </button>
              </div>
            </div>
          )}
        </div>
        
        {recommendation && (
          <div className={`mt-4 p-4 bg-${recommendation.color}-500 text-white rounded`}>
            <p className="text-sm font-semibold mb-1">✨ Recommendation:</p>
            <p className="text-xl font-bold mb-2">{recommendation.method}</p>
            <p className="text-sm">{recommendation.reason}</p>
            <button 
              onClick={() => setAnswers({ needSEO: null, dataChanges: null, userSpecific: null })}
              className="mt-3 px-4 py-2 bg-white text-gray-800 rounded font-semibold text-sm"
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
  const [activeTab, setActiveTab] = useState('comparison');
  
  const tabs = [
    { id: 'comparison', label: 'SSR vs CSR', component: SSRvsCSRDemo },
    { id: 'strategies', label: 'Rendering Strategies', component: RenderingStrategiesDemo },
    { id: 'methods', label: 'Data Fetching', component: DataFetchingMethodsDemo },
    { id: 'isr', label: 'ISR Simulation', component: ISRSimulationDemo },
    { id: 'components', label: 'Server vs Client', component: ServerClientComponentsDemo },
    { id: 'routing', label: 'Routing Patterns', component: RoutingPatternsDemo },
    { id: 'seo', label: 'SEO Impact', component: SEOComparisonDemo },
    { id: 'decision', label: 'Decision Tree', component: DecisionTreeDemo }
  ];
  
  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">Chapter 15: Server-Side Rendering</h1>
            <p className="text-blue-100">Next.js & Production-Ready SSR</p>
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
              🚀 SSR improves performance, SEO, and user experience!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}