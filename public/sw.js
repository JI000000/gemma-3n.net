const CACHE_NAME = 'gemma-3n-v1';
const STATIC_CACHE = 'gemma-3n-static-v1';
const DYNAMIC_CACHE = 'gemma-3n-dynamic-v1';

// 核心资源 - 必须缓存
const CORE_ASSETS = [
  '/',
  '/manifest.json',
  '/offline.html'
];

// 静态资源 - 预缓存
const STATIC_ASSETS = [
  '/benchmarks',
  '/toolkit',
  '/blog',
  '/faq'
];

// 安装事件 - 预缓存核心资源
self.addEventListener('install', (event) => {
  console.log('[SW] Installing...');
  
  event.waitUntil(
    Promise.all([
      // 缓存核心资源
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('[SW] Caching core assets');
        return cache.addAll(CORE_ASSETS);
      }),
      // 立即激活新的Service Worker
      self.skipWaiting()
    ])
  );
});

// 激活事件 - 清理旧缓存
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating...');
  
  event.waitUntil(
    Promise.all([
      // 清理旧缓存
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      // 立即控制所有客户端
      self.clients.claim()
    ])
  );
});

// 拦截网络请求
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // 跳过非同源请求
  if (url.origin !== location.origin) {
    return;
  }
  
  // 跳过Chrome扩展请求
  if (url.protocol === 'chrome-extension:') {
    return;
  }
  
  event.respondWith(handleFetch(request));
});

// 统一的请求处理函数
async function handleFetch(request) {
  const url = new URL(request.url);
  
  // 静态资源策略：缓存优先
  if (isStaticAsset(request)) {
    return handleStaticAsset(request);
  }
  
  // 页面请求策略：网络优先，回退到缓存
  if (isPageRequest(request)) {
    return handlePageRequest(request);
  }
  
  // API请求策略：网络优先，失败则返回离线页面
  if (isApiRequest(request)) {
    return handleApiRequest(request);
  }
  
  // 默认策略：网络优先
  return handleNetworkFirst(request);
}

// 静态资源处理 - 缓存优先
async function handleStaticAsset(request) {
  try {
    const cache = await caches.open(STATIC_CACHE);
    let response = await cache.match(request);
    
    if (response) {
      // 后台更新缓存
      fetch(request).then((networkResponse) => {
        if (networkResponse.ok) {
          cache.put(request, networkResponse.clone());
        }
      }).catch(() => {}); // 忽略网络错误
      
      return response;
    }
    
    // 缓存中没有，从网络获取
    response = await fetch(request);
    if (response.ok) {
      cache.put(request, response.clone());
    }
    return response;
    
  } catch (error) {
    console.log('[SW] Static asset fetch failed:', error);
    // 返回离线页面或默认响应
    return new Response('Offline', { status: 503 });
  }
}

// 页面请求处理 - 网络优先
async function handlePageRequest(request) {
  try {
    // 先尝试网络请求
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // 缓存成功的页面响应
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
      return networkResponse;
    }
    
    throw new Error('Network response not ok');
    
  } catch (error) {
    console.log('[SW] Page fetch failed, trying cache:', error);
    
    // 网络失败，尝试从缓存获取
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // 缓存中也没有，返回离线页面
    return caches.match('/offline.html') || 
           new Response('Offline', { status: 503 });
  }
}

// API请求处理
async function handleApiRequest(request) {
  try {
    const response = await fetch(request);
    
    if (response.ok) {
      // 缓存API响应用于离线访问
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, response.clone());
    }
    
    return response;
    
  } catch (error) {
    console.log('[SW] API fetch failed:', error);
    
    // 尝试返回缓存的响应
    const cache = await caches.open(DYNAMIC_CACHE);
    const cachedResponse = await cache.match(request);
    
    return cachedResponse || 
           new Response(
             JSON.stringify({ error: 'Offline', cached: false }), 
             { 
               status: 503,
               headers: { 'Content-Type': 'application/json' }
             }
           );
  }
}

// 默认网络优先策略
async function handleNetworkFirst(request) {
  try {
    const response = await fetch(request);
    return response;
  } catch (error) {
    const cache = await caches.open(DYNAMIC_CACHE);
    return cache.match(request) || 
           new Response('Offline', { status: 503 });
  }
}

// 辅助函数：判断是否为静态资源
function isStaticAsset(request) {
  const url = new URL(request.url);
  return url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf|ico)$/);
}

// 辅助函数：判断是否为页面请求
function isPageRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && 
          request.headers.get('accept').includes('text/html'));
}

// 辅助函数：判断是否为API请求
function isApiRequest(request) {
  const url = new URL(request.url);
  return url.pathname.startsWith('/api/') || 
         request.headers.get('accept').includes('application/json');
}

// 消息处理 - 用于从主线程控制SW
self.addEventListener('message', (event) => {
  const { type, payload } = event.data;
  
  switch (type) {
    case 'SKIP_WAITING':
      self.skipWaiting();
      break;
      
    case 'CACHE_URLS':
      cacheUrls(payload.urls);
      break;
      
    case 'CLEAR_CACHE':
      clearAllCaches();
      break;
      
    default:
      console.log('[SW] Unknown message type:', type);
  }
});

// 缓存指定URLs
async function cacheUrls(urls) {
  try {
    const cache = await caches.open(DYNAMIC_CACHE);
    await cache.addAll(urls);
    console.log('[SW] Cached URLs:', urls);
  } catch (error) {
    console.error('[SW] Failed to cache URLs:', error);
  }
}

// 清理所有缓存
async function clearAllCaches() {
  try {
    const cacheNames = await caches.keys();
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    );
    console.log('[SW] All caches cleared');
  } catch (error) {
    console.error('[SW] Failed to clear caches:', error);
  }
} 