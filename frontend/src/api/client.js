const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'
export const getToken = () => localStorage.getItem('ss_token')
export const setToken = (t) => localStorage.setItem('ss_token', t || '')
async function req(path, opts={}){
  const headers = {'Content-Type':'application/json', ...(opts.headers||{})}
  const token = getToken()
  if(token) headers['Authorization'] = `Bearer ${token}`
  const res = await fetch(API_URL+path, {...opts, headers})
  if(!res.ok){ const msg = await res.text(); throw new Error(msg || 'Erro') }
  const ct = res.headers.get('content-type')||''
  return ct.includes('application/json') ? res.json() : res.text()
}
export const api = {
  register: (data)=>req('/api/auth/register',{method:'POST', body:JSON.stringify(data)}),
  login: async (email,password)=>{ const r = await req('/api/auth/login',{method:'POST', body:JSON.stringify({email,password})}); setToken(r.token); return r; },
  me: ()=>req('/api/auth/me'),
  products: ({category, sort, page, size})=>req(`/api/products?${new URLSearchParams({category:category||'', sort:sort||'relevance', page:page||0, size:size||8})}`),
  categories: ()=>req('/api/products/categories'),
  product: (id)=>req('/api/products/'+id),
  favList: ()=>req('/api/favorites'),
  favToggle: (id)=>req('/api/favorites/'+id,{method:'POST'}),
  cartList: ()=>req('/api/cart'),
  cartAdd: (id)=>req('/api/cart/add/'+id,{method:'POST'}),
  cartQty: (id,q)=>req('/api/cart/qty/'+id+'?q='+q,{method:'POST'}),
  cartRemove: (id)=>req('/api/cart/'+id,{method:'DELETE'}),
  couponValidate: (code)=>req('/api/coupons/validate?code='+encodeURIComponent(code)),
  checkout: (payload)=>req('/api/cart/checkout',{method:'POST', body:JSON.stringify(payload)}),
}
