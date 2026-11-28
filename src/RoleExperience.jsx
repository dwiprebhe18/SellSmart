import { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, ArrowRight, Bookmark, Check, ChevronDown, Compass, Heart, Home,
  LogOut, MapPin, MessageCircle, Search, Settings, ShieldCheck, Store, UserRound,
  UsersRound, X, Zap
} from 'lucide-react'
import './role-experience.css'

const demoBusinesses = [
  {
    id: 'bloom', name: 'Bloom & Basket', category: 'Handmade Products', location: 'Pune, Maharashtra',
    description: 'Thoughtful everyday finds and gift boxes, made by hand with care.',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85',
    ownerName: 'Mira Shah', email: 'hello@bloomandbasket.in', phone: '+919876543210',
    products: [{ name: 'Seasonal flower bunch', description: 'A hand-tied bunch of seasonal blooms.', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=600&q=80' }],
    posts: [
      { id: 'bloom-1', caption: 'A little colour for your everyday. Our hand-tied seasonal bunches are ready to brighten someone’s week. 🌼 #madeinPune #smallbusiness', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=1000&q=85', likes: 42, comments: [{ name: 'Aarav', text: 'These are gorgeous!' }] },
      { id: 'bloom-2', caption: 'Slow mornings, fresh flowers, and a thoughtful gift. What’s your favourite way to make someone’s day?', image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?auto=format&fit=crop&w=1000&q=85', likes: 28, comments: [] }
    ]
  },
  {
    id: 'loom', name: 'The Loom Room', category: 'Clothing & Fashion', location: 'Jaipur, Rajasthan',
    description: 'Small-batch clothing in natural fabrics, cut and stitched in Jaipur.',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85',
    ownerName: 'Anika Verma', email: 'hello@theloomroom.in', phone: '+919812345678',
    products: [{ name: 'Everyday linen shirt', description: 'Breathable handwoven cotton, made to last.', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=600&q=80' }],
    posts: [{ id: 'loom-1', caption: 'Meet your new everyday favourite: breathable handwoven cotton, made slowly and made to last. #slowfashion #madeinJaipur', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=1000&q=85', likes: 67, comments: [{ name: 'Nisha', text: 'Love the fabric!' }, { name: 'Dev', text: 'Beautiful work.' }] }]
  },
  {
    id: 'crumb', name: 'Little Crumb Bakery', category: 'Food and Bakery', location: 'Bengaluru, Karnataka',
    description: 'Small-batch bakes, naturally leavened breads, and a little bit of joy.',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85',
    ownerName: 'Kabir Rao', email: 'hello@littlecrumb.in', phone: '+919811223344',
    products: [{ name: 'Fresh sourdough loaf', description: 'Naturally leavened and baked fresh each morning.', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80' }],
    posts: [{ id: 'crumb-1', caption: 'The sourdough is out of the oven! Slow-fermented overnight and baked fresh this morning. #localbakery #bengaluru', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=85', likes: 53, comments: [] }]
  },
  {
    id: 'clay', name: 'Clay & Kind', category: 'Home Decor', location: 'Mumbai, Maharashtra',
    description: 'Useful, lovely ceramic pieces shaped and glazed by hand.',
    image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1000&q=85',
    ownerName: 'Rhea Nair', email: 'studio@clayandkind.in', phone: '+919800112233',
    products: [{ name: 'Hand-shaped ceramic cup', description: 'A one-of-a-kind cup, shaped and glazed by hand.', image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=600&q=80' }],
    posts: [{ id: 'clay-1', caption: 'Little imperfections, lots of character. Each cup is shaped by hand in our Mumbai studio. #ceramics #handmade', image: 'https://images.unsplash.com/photo-1493106641515-6b5631de4bb9?auto=format&fit=crop&w=1000&q=85', likes: 31, comments: [] }]
  },
  {
    id: 'glow', name: 'Root & Glow', category: 'Beauty and Personal Care', location: 'Kochi, Kerala',
    description: 'Gentle, plant-forward personal care inspired by Kerala botanicals.',
    image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85',
    ownerName: 'Tara Menon', email: 'hello@rootandglow.in', phone: '+919877665544',
    products: [{ name: 'Botanical soap bars', description: 'Gentle daily care with plant-forward ingredients.', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=600&q=80' }],
    posts: [{ id: 'glow-1', caption: 'A small daily ritual, made with ingredients we can pronounce. Meet our new botanical soap bars. #selfcare #madeinKerala', image: 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=85', likes: 46, comments: [] }]
  },
  {
    id: 'spark', name: 'Spark Studio', category: 'Electronics and Accessories', location: 'Hyderabad, Telangana',
    description: 'Useful little accessories designed to make workdays smoother.',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
    ownerName: 'Arjun Reddy', email: 'hello@sparkstudio.in', phone: '+919822334455',
    products: [{ name: 'Everyday desk companion', description: 'A thoughtful accessory for your daily workspace.', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80' }],
    posts: [{ id: 'spark-1', caption: 'Meet the desk companion that keeps your everyday essentials close. Designed in Hyderabad. #smallbusiness #workspace', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85', likes: 19, comments: [] }]
  }
]

const categories = ['All categories', 'Clothing & Fashion', 'Food and Bakery', 'Handmade Products', 'Beauty and Personal Care', 'Home Decor', 'Electronics and Accessories', 'Art and Craft', 'Other Small Businesses']
const demoState = { likes: [], follows: [], saved: [], comments: {} }
const readCommunityState = () => {
  try {
    const stored = JSON.parse(localStorage.getItem('sellsmart-community') || 'null')
    return stored && typeof stored === 'object' ? { ...demoState, ...stored } : demoState
  } catch (error) {
    console.error('SellSmart community data could not be read.', error)
    return demoState
  }
}

function Brand({ onClick }) {
  return <button className="role-brand" onClick={onClick}><span className="role-brand-mark"><Zap size={18} fill="currentColor" /></span><span>sellsmart<span className="role-brand-dot">.</span></span></button>
}

export function AuthExperience({ onAuthenticated, onBack }) {
  const [mode, setMode] = useState('login')
  const [accountType, setAccountType] = useState('business')
  const [values, setValues] = useState({})
  const [image, setImage] = useState('')
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)

  const update = (key, value) => setValues(current => ({ ...current, [key]: value }))
  const handleImage = event => {
    const file = event.target.files?.[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setError('Choose an image file.')
      return
    }
    if (file.size > 600000) {
      setError('Please choose an image smaller than 600 KB for this local demo.')
      return
    }
    const reader = new FileReader()
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setImage(reader.result)
        setError('')
      } else {
        setError('The selected image could not be read. Please try another file.')
      }
    }
    reader.onerror = () => setError('The selected image could not be read. Please try another file.')
    reader.readAsDataURL(file)
  }

  const finish = (account) => {
    try {
      onAuthenticated(account)
    } catch (saveError) {
      setError(saveError.message || 'We could not save your account. Please try again.')
    }
  }

  const signIn = event => {
    event.preventDefault()
    setError('')
    const email = (values.email || '').trim().toLowerCase()
    const password = values.password || ''
    try {
      const accounts = JSON.parse(localStorage.getItem('sellsmart-accounts') || '[]')
      const account = accounts.find(item => item.email.toLowerCase() === email && item.password === password)
      if (account) {
        finish(account)
        return
      }
      if (email === 'business@sellsmart.demo' && password === 'demo123') {
        finish({ id: 'demo-business', role: 'business', name: 'Bloom & Basket', businessName: 'Bloom & Basket', email, category: 'Handmade Products', location: 'Pune, Maharashtra', description: 'Thoughtful everyday products, made with care.', phone: '+91 98765 43210' })
        return
      }
      if (email === 'user@sellsmart.demo' && password === 'demo123') {
        finish({ id: 'demo-user', role: 'user', name: 'Aarav Mehta', email, location: 'Pune, Maharashtra' })
        return
      }
      if (email === 'admin@sellsmart.demo' && password === 'admin123') {
        finish({ id: 'demo-admin', role: 'admin', name: 'SellSmart Admin', email })
        return
      }
      setError('That email and password combination was not found. Try a demo account below.')
    } catch (readError) {
      console.error('SellSmart account data could not be read.', readError)
      setError('Saved account data could not be read. Please clear this site’s SellSmart demo data and try again.')
    }
  }

  const register = event => {
    event.preventDefault()
    setError('')
    const email = (values.email || '').trim().toLowerCase()
    const name = accountType === 'business' ? values.businessName?.trim() : values.fullName?.trim()
    const ownerName = accountType === 'business' ? values.ownerName?.trim() : name
    if (!name || !ownerName || !email || !values.password) {
      setError('Please complete all required fields.')
      return
    }
    if (values.password.length < 6) {
      setError('Choose a password with at least 6 characters.')
      return
    }
    if (accountType === 'business' && (!values.category || !values.location?.trim() || !values.description?.trim() || !values.phone?.trim())) {
      setError('Complete the business category, location, description, and contact number.')
      return
    }
    setBusy(true)
    try {
      const accounts = JSON.parse(localStorage.getItem('sellsmart-accounts') || '[]')
      if (accounts.some(item => item.email.toLowerCase() === email)) {
        setError('An account with this email already exists. Please sign in instead.')
        setBusy(false)
        return
      }
      const account = {
        id: `account-${Date.now()}`, role: accountType, name, ownerName, email,
        password: values.password, location: values.location?.trim() || '',
        image, createdAt: new Date().toISOString(),
        ...(accountType === 'business' ? {
          businessName: name, category: values.category, description: values.description.trim(),
          phone: values.phone.trim(), status: 'Review'
        } : {})
      }
      localStorage.setItem('sellsmart-accounts', JSON.stringify([...accounts, account]))
      finish(account)
    } catch (saveError) {
      console.error('SellSmart registration could not be saved.', saveError)
      setError('We could not save your registration in this browser. Check available storage and try again.')
    } finally {
      setBusy(false)
    }
  }

  const demoLogin = role => {
    const demoAccounts = {
      business: { id: 'demo-business', role, name: 'Bloom & Basket', businessName: 'Bloom & Basket', email: 'business@sellsmart.demo', category: 'Handmade Products', location: 'Pune, Maharashtra', description: 'Thoughtful everyday products, made with care.', phone: '+91 98765 43210' },
      user: { id: 'demo-user', role, name: 'Aarav Mehta', email: 'user@sellsmart.demo', location: 'Pune, Maharashtra' },
      admin: { id: 'demo-admin', role, name: 'SellSmart Admin', email: 'admin@sellsmart.demo' }
    }
    finish(demoAccounts[role])
  }

  return <main className="auth-page">
    <header className="auth-topbar"><Brand onClick={onBack} /><button className="auth-back" onClick={onBack}><ArrowLeft size={16} /> Back to SellSmart</button></header>
    <div className="auth-layout">
      <section className="auth-intro">
        <span className="auth-eyebrow"><Zap size={14} /> A FRIENDLY PLACE TO GROW</span>
        <h1>{mode === 'login' ? <>Good to see<br />you <em>again.</em></> : <>Your next chapter<br />starts <em>here.</em></>}</h1>
        <p>{mode === 'login' ? 'Sign in to pick up where you left off — whether you’re growing a business or finding your next favourite.' : 'Join a community that helps small businesses get seen and brings good local finds closer to everyone.'}</p>
        <div className="auth-perks"><span><Check size={15} /> Made for small businesses</span><span><Check size={15} /> Discover makers near you</span><span><Check size={15} /> Simple, friendly insights</span></div>
        <div className="auth-art"><span>✳</span><div><Store size={22} /><b>Made for people<br />who make things.</b></div></div>
      </section>
      <section className="auth-card">
        <div className="auth-tabs"><button className={mode === 'login' ? 'selected' : ''} onClick={() => { setMode('login'); setError('') }}>Log in</button><button className={mode === 'register' ? 'selected' : ''} onClick={() => { setMode('register'); setError('') }}>Create an account</button></div>
        <div className="auth-card-intro"><h2>{mode === 'login' ? 'Welcome back' : 'Let’s get you started'}</h2><p>{mode === 'login' ? 'Your SellSmart space is right where you left it.' : 'First, tell us how you’ll use SellSmart.'}</p></div>
        {mode === 'register' && <div className="account-type-select" role="group" aria-label="Choose account type">
          <button type="button" className={accountType === 'business' ? 'selected' : ''} onClick={() => { setAccountType('business'); setError('') }}><Store size={17} /><span><b>Business</b><small>Grow your business</small></span>{accountType === 'business' && <Check size={15} />}</button>
          <button type="button" className={accountType === 'user' ? 'selected' : ''} onClick={() => { setAccountType('user'); setError('') }}><UserRound size={17} /><span><b>Normal User</b><small>Discover local finds</small></span>{accountType === 'user' && <Check size={15} />}</button>
        </div>}
        <form className="auth-form" onSubmit={mode === 'login' ? signIn : register}>
          {mode === 'register' && accountType === 'business' && <>
            <label>Business name<input required value={values.businessName || ''} onChange={event => update('businessName', event.target.value)} placeholder="e.g. Bloom & Basket" /></label>
            <label>Owner name<input required value={values.ownerName || ''} onChange={event => update('ownerName', event.target.value)} placeholder="Your full name" /></label>
          </>}
          {mode === 'register' && accountType === 'user' && <label>Full name<input required value={values.fullName || ''} onChange={event => update('fullName', event.target.value)} placeholder="Your full name" /></label>}
          <label>Email address<input required type="email" autoComplete="email" value={values.email || ''} onChange={event => update('email', event.target.value)} placeholder="you@example.com" /></label>
          <label>Password<input required type="password" minLength={mode === 'register' ? 6 : undefined} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} value={values.password || ''} onChange={event => update('password', event.target.value)} placeholder={mode === 'register' ? 'At least 6 characters' : 'Enter your password'} /></label>
          {mode === 'register' && accountType === 'business' && <>
            <label>Business category<select required value={values.category || ''} onChange={event => update('category', event.target.value)}><option value="">Choose a category</option>{categories.slice(1).map(category => <option key={category}>{category}</option>)}</select></label>
            <label>Business location<input required value={values.location || ''} onChange={event => update('location', event.target.value)} placeholder="City, State" /></label>
            <label>Business description<textarea required value={values.description || ''} onChange={event => update('description', event.target.value)} placeholder="What makes your business special?" rows="3" /></label>
            <label>Contact number<input required type="tel" value={values.phone || ''} onChange={event => update('phone', event.target.value)} placeholder="+91 98765 43210" /></label>
          </>}
          {mode === 'register' && accountType === 'user' && <label>Location <span className="optional-label">Optional</span><input value={values.location || ''} onChange={event => update('location', event.target.value)} placeholder="City, State" /></label>}
          {mode === 'register' && <label className="auth-image-label">{accountType === 'business' ? 'Business logo or profile image' : 'Profile image'} <span className="optional-label">Optional</span><input type="file" accept="image/*" onChange={handleImage} />{image && <img className="auth-image-preview" src={image} alt="Selected profile" />}</label>}
          {error && <p className="auth-error" role="alert">{error}</p>}
          <button className="auth-submit" type="submit" disabled={busy}>{mode === 'login' ? 'Log in' : busy ? 'Creating account…' : accountType === 'business' ? 'Create business account' : 'Create user account'} <ArrowRight size={17} /></button>
        </form>
        {mode === 'login' && <div className="demo-logins"><span>QUICK DEMO ACCESS</span><button onClick={() => demoLogin('business')}><Store size={15} /> Business demo <ArrowRight size={13} /></button><button onClick={() => demoLogin('user')}><UserRound size={15} /> User demo <ArrowRight size={13} /></button><button onClick={() => demoLogin('admin')}><ShieldCheck size={15} /> Admin demo <ArrowRight size={13} /></button></div>}
        {mode === 'login' && <p className="auth-note">New to SellSmart? <button onClick={() => { setMode('register'); setError('') }}>Create an account</button></p>}
      </section>
    </div>
    <footer className="auth-footer">© 2026 SellSmart <span>·</span> A friendly place for the doers, dreamers, and makers.</footer>
  </main>
}

export function UserExperience({ account, onLogout }) {
  const [page, setPage] = useState('Home')
  const pageHistory = useRef([])
  const [community, setCommunity] = useState(readCommunityState)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All categories')
  const [location, setLocation] = useState('')
  const [commentInputs, setCommentInputs] = useState({})
  const [profile, setProfile] = useState(null)
  const [toast, setToast] = useState('')

  const navigateTo = (nextPage, nextProfile = null) => {
    if (nextPage !== page || nextProfile?.id !== profile?.id) {
      pageHistory.current.push({ page, profile })
    }
    setPage(nextPage)
    setProfile(nextProfile)
  }
  const goBack = () => {
    const previous = pageHistory.current.pop()
    setPage(previous?.page || 'Home')
    setProfile(previous?.profile || null)
  }

  const businesses = useMemo(() => {
    const registered = (() => {
      try {
        return JSON.parse(localStorage.getItem('sellsmart-accounts') || '[]')
          .filter(item => item.role === 'business')
          .map(item => ({
            ...item, id: item.id, name: item.businessName || item.name,
            category: item.category || 'Other Small Businesses',
            description: item.description || 'A local business on SellSmart.',
            image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85',
            ownerName: item.ownerName || item.name, posts: [],
            products: [{
              name: `${item.businessName || item.name} featured find`,
              description: 'A featured product from this local SellSmart business.',
              image: item.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80'
            }]
          }))
      } catch (error) {
        console.error('SellSmart business accounts could not be read.', error)
        return []
      }
    })()
    return [...registered, ...demoBusinesses]
  }, [])

  const persist = next => {
    setCommunity(next)
    try {
      localStorage.setItem('sellsmart-community', JSON.stringify(next))
    } catch (error) {
      console.error('SellSmart interaction could not be saved.', error)
      setToast('Could not save this change in local storage.')
      return
    }
    setToast('Saved')
    window.setTimeout(() => setToast(''), 1800)
  }
  const posts = businesses.flatMap(business => business.posts.map(post => ({ ...post, business })))
  const visibleBusinesses = businesses.filter(business =>
    (category === 'All categories' || business.category === category) &&
    (!location || business.location?.toLowerCase().includes(location.toLowerCase())) &&
    (!search || `${business.name} ${business.category} ${business.description} ${business.location}`.toLowerCase().includes(search.toLowerCase()))
  )
  const visiblePosts = posts.filter(post =>
    (page !== 'Following' || community.follows.includes(post.business.id)) &&
    (page !== 'Saved Posts' || community.saved.includes(post.id)) &&
    (page !== 'Explore' || visibleBusinesses.some(business => business.id === post.business.id)) &&
    (page !== 'Home' || (!search && category === 'All categories' && !location) || visibleBusinesses.some(business => business.id === post.business.id))
  )
  const toggle = (field, id) => {
    const items = community[field]
    persist({ ...community, [field]: items.includes(id) ? items.filter(item => item !== id) : [...items, id] })
  }
  const addComment = (postId, businessId) => {
    const text = (commentInputs[postId] || '').trim()
    if (!text) return
    const comments = { ...community.comments, [postId]: [...(community.comments[postId] || []), { name: account.name, text }] }
    persist({ ...community, comments })
    setCommentInputs(current => ({ ...current, [postId]: '' }))
    const targetPost = posts.find(post => post.id === postId)
    if (targetPost && targetPost.business.id === businessId) setToast('Comment added')
  }
  const filteredPosts = page === 'Following' || page === 'Saved Posts' ? visiblePosts : visiblePosts
  const showPublicProfile = business => navigateTo('Business profile', business)
  const nav = [
    ['Home', Home], ['Explore', Compass], ['Following', UsersRound],
    ['Saved Posts', Bookmark], ['My Profile', UserRound], ['Settings', Settings]
  ]
  const navButton = ([name, Icon]) => <button key={name} className={`user-nav-item ${page === name ? 'active' : ''}`} onClick={() => navigateTo(name)}><Icon size={18} /><span>{name}</span>{name === 'Following' && <small>{community.follows.length}</small>}</button>

  const businessCard = business => <article className="discover-card" key={business.id}>
    <button className="discover-image" onClick={() => showPublicProfile(business)}><img src={business.image} alt="" /><span>{business.category}</span></button>
    <div className="discover-card-body"><button className="business-name-link" onClick={() => showPublicProfile(business)}>{business.name}</button><p><MapPin size={14} />{business.location || 'Location not set'}</p><p className="discover-description">{business.description}</p><div className="discover-card-actions"><button className={`user-action-button ${community.follows.includes(business.id) ? 'following' : ''}`} onClick={() => toggle('follows', business.id)}>{community.follows.includes(business.id) ? <Check size={15} /> : <UsersRound size={15} />}{community.follows.includes(business.id) ? 'Following' : 'Follow'}</button><a className="user-action-button contact" href={`mailto:${business.email || ''}`}><MessageCircle size={15} />Contact</a></div></div>
  </article>

  const postCard = post => {
    const comments = [...(post.comments || []), ...(community.comments[post.id] || [])]
    return <article className="social-post" key={post.id}>
      <header className="social-post-header"><button className="social-business-avatar" onClick={() => showPublicProfile(post.business)}>{post.business.image ? <img src={post.business.image} alt="" /> : <Store size={18} />}</button><div className="social-post-author"><button onClick={() => showPublicProfile(post.business)}>{post.business.name}</button><span>{post.business.category} <i>·</i> {post.business.location}</span></div><button className={`follow-inline ${community.follows.includes(post.business.id) ? 'following' : ''}`} onClick={() => toggle('follows', post.business.id)}>{community.follows.includes(post.business.id) ? 'Following' : '+ Follow'}</button></header>
      <button className="social-post-image" onClick={() => showPublicProfile(post.business)} aria-label={`View ${post.business.name} profile`}><img src={post.image} alt={`${post.business.name} post`} /></button>
      <div className="social-post-content"><div className="social-post-actions"><button className={community.likes.includes(post.id) ? 'liked' : ''} onClick={() => toggle('likes', post.id)} aria-label={community.likes.includes(post.id) ? 'Unlike post' : 'Like post'}><Heart size={20} fill={community.likes.includes(post.id) ? 'currentColor' : 'none'} /></button><a href={`mailto:${post.business.email || ''}`} aria-label="Contact business"><MessageCircle size={20} /></a><button className={`save-post ${community.saved.includes(post.id) ? 'saved' : ''}`} onClick={() => toggle('saved', post.id)} aria-label={community.saved.includes(post.id) ? 'Unsave post' : 'Save post'}><Bookmark size={19} fill={community.saved.includes(post.id) ? 'currentColor' : 'none'} /></button></div>
        <b className="social-likes">{post.likes + (community.likes.includes(post.id) ? 1 : 0)} likes</b><p className="social-caption"><b>{post.business.name}</b> {post.caption}</p>
        {comments.length > 0 && <div className="social-comments">{comments.map((comment, index) => <p key={`${post.id}-${index}`}><b>{comment.name}</b> {comment.text}</p>)}</div>}
        <form className="comment-form" onSubmit={event => { event.preventDefault(); addComment(post.id, post.business.id) }}><input aria-label="Write a comment" placeholder="Add a comment…" value={commentInputs[post.id] || ''} onChange={event => setCommentInputs(current => ({ ...current, [post.id]: event.target.value }))} /><button type="submit" disabled={!(commentInputs[post.id] || '').trim()}>Post</button></form>
      </div>
    </article>
  }

  const exploreFilters = <div className="explore-filters"><label className="user-search"><Search size={16} /><input placeholder="Search businesses, products, or ideas" value={search} onChange={event => setSearch(event.target.value)} /></label><label className="user-select"><Compass size={15} /><select value={category} onChange={event => setCategory(event.target.value)}>{categories.map(item => <option key={item}>{item}</option>)}</select><ChevronDown size={14} /></label><label className="user-search location-filter"><MapPin size={15} /><input placeholder="Filter by location" value={location} onChange={event => setLocation(event.target.value)} /></label></div>

  let content
  if (page === 'My Profile') {
    content = <section className="user-profile-panel"><div className="user-profile-avatar">{account.image ? <img src={account.image} alt="" /> : <UserRound size={30} />}</div><span className="user-eyebrow">YOUR SELL SMART SPACE</span><h2>{account.name}</h2><p>{account.email}</p><p><MapPin size={15} /> {account.location || 'Add your location in settings'}</p><div className="profile-counts"><div><b>{community.follows.length}</b><span>Following</span></div><div><b>{community.saved.length}</b><span>Saved posts</span></div></div><button className="user-action-button" onClick={() => navigateTo('Settings')}><Settings size={15} />Edit profile</button></section>
  } else if (page === 'Settings') {
    content = <section className="user-settings-panel"><div><span className="user-eyebrow">YOUR ACCOUNT</span><h2>Settings</h2><p>Keep your profile up to date.</p></div><form onSubmit={event => { event.preventDefault(); const updated = { ...account, name: event.currentTarget.elements.name.value, location: event.currentTarget.elements.location.value }; try { localStorage.setItem('sellsmart-session', JSON.stringify(updated)); setToast('Profile saved. Sign in again to refresh your session details.') } catch (error) { console.error('Profile settings could not be saved.', error); setToast('Could not save profile settings.') } }}><label>Full name<input name="name" defaultValue={account.name} required /></label><label>Location<input name="location" defaultValue={account.location || ''} placeholder="City, State" /></label><button className="user-action-button following" type="submit"><Check size={15} />Save changes</button></form></section>
  } else if (page === 'Business profile' && profile) {
    content = <section className="public-business-profile"><div className="public-profile-hero"><img src={profile.image} alt="" /><div><span className="user-eyebrow">{profile.category}</span><h2>{profile.name}</h2><p><MapPin size={15} />{profile.location}</p><p>{profile.description}</p><div className="discover-card-actions"><button className={`user-action-button ${community.follows.includes(profile.id) ? 'following' : ''}`} onClick={() => toggle('follows', profile.id)}>{community.follows.includes(profile.id) ? <Check size={15} /> : <UsersRound size={15} />}{community.follows.includes(profile.id) ? 'Following' : 'Follow business'}</button><a className="user-action-button contact" href={`mailto:${profile.email || ''}`}><MessageCircle size={15} />Contact business</a></div></div></div><div className="public-profile-products"><span className="user-eyebrow">WHAT THEY MAKE</span><h3>Products & services</h3>{profile.products?.length ? <div className="public-product-grid">{profile.products.map((product, index) => <article className="public-product-card" key={`${profile.id}-product-${index}`}><img src={product.image || profile.image} alt={product.name} /><div><b>{product.name}</b><p>{product.description || profile.description}</p></div></article>)}</div> : <div className="empty-feed">Products and services will appear here as this business adds them.</div>}</div><div className="public-profile-posts"><div><span className="user-eyebrow">FROM THE BUSINESS</span><h3>Promotional posts</h3></div>{profile.posts?.length ? profile.posts.map(post => postCard({ ...post, business: profile })) : <div className="empty-feed">This business is just getting started. Check back for updates.</div>}</div></section>
  } else if (page === 'Explore') {
    content = <><div className="explore-title-row"><div><span className="user-eyebrow">GOOD THINGS, CLOSE BY</span><h2>Explore businesses</h2><p>Meet the makers and small businesses behind your next favourite find.</p></div></div>{exploreFilters}<div className="discover-grid">{visibleBusinesses.map(businessCard)}{!visibleBusinesses.length && <div className="empty-feed">No businesses match these filters. Try another category or location.</div>}</div></>
  } else if (page === 'Following' || page === 'Saved Posts') {
    content = <div className="user-feed-list">{filteredPosts.length ? filteredPosts.map(postCard) : <div className="empty-feed"><div><UsersRound size={22} /><h3>{page === 'Following' ? 'Your feed starts with a follow' : 'Save a post to keep it close'}</h3><p>{page === 'Following' ? 'Explore local businesses and follow the ones you love.' : 'Tap the bookmark on a post to find it here later.'}</p><button className="user-action-button following" onClick={() => navigateTo('Explore')}>Explore businesses <ArrowRight size={15} /></button></div></div>}</div>
  } else {
    content = <><section className="feed-welcome"><div><span className="user-eyebrow">YOUR LITTLE-BUSINESS DISCOVERY FEED</span><h2>Good finds, good people.</h2><p>Stories, products, and ideas from small businesses worth knowing.</p></div><div className="feed-welcome-icon"><Compass size={26} /></div></section>{exploreFilters}<div className="user-feed-layout"><div className="user-feed-list">{filteredPosts.length ? filteredPosts.map(postCard) : <div className="empty-feed">No posts match your filters. Try a broader search.</div>}</div><aside className="feed-aside"><div className="feed-aside-card"><span className="user-eyebrow">FIND YOUR NEXT FAVOURITE</span><h3>Local businesses, lovely ideas.</h3><p>Explore makers and small businesses in your neighbourhood.</p><button className="user-action-button following" onClick={() => navigateTo('Explore')}>Explore all <ArrowRight size={15} /></button></div><div className="feed-aside-card soft"><span className="user-eyebrow">YOUR COMMUNITY</span><div className="community-stat"><UsersRound size={18} /><b>{community.follows.length}</b><span>businesses followed</span></div><button className="text-button" onClick={() => navigateTo('Following')}>See your following feed</button></div></aside></div></>
  }

  return <div className="user-app-shell">
    <aside className="user-sidebar"><Brand onClick={() => navigateTo('Home')} /><div className="user-sidebar-label">YOUR COMMUNITY</div><nav>{nav.map(navButton)}</nav><div className="user-sidebar-bottom"><div className="user-account-mini"><div className="mini-avatar">{account.image ? <img src={account.image} alt="" /> : account.name.slice(0, 1).toUpperCase()}</div><span><b>{account.name}</b><small>SellSmart member</small></span></div><button className="user-nav-item logout" onClick={onLogout}><LogOut size={17} /><span>Log out</span></button></div></aside>
    <main className="user-main"><header className="user-topbar"><div className="user-top-mobile"><Brand onClick={() => navigateTo('Home')} /><button onClick={onLogout} aria-label="Log out"><LogOut size={17} /></button></div><div className="user-mobile-nav">{nav.slice(0, 5).map(navButton)}</div><div className="user-topline"><span>For the doers, dreamers, and makers.</span><button className="user-mini-profile" onClick={() => navigateTo('My Profile')}><div className="mini-avatar">{account.image ? <img src={account.image} alt="" /> : account.name.slice(0, 1).toUpperCase()}</div>{account.name}<ChevronDown size={15} /></button></div></header>
      <div className="user-page-content"><button className="user-back-button" onClick={goBack}><ArrowLeft size={16} />Back</button>{page !== 'Home' && page !== 'Explore' && page !== 'Business profile' && page !== 'My Profile' && page !== 'Settings' && <div className="user-page-heading"><span className="user-eyebrow">YOUR SELL SMART SPACE</span><h1>{page}</h1></div>}{content}<footer className="user-footer">© 2026 SellSmart <span>·</span> Made for the makers.</footer></div>
    </main>
    {toast && <div className="user-toast"><Check size={15} />{toast}</div>}
  </div>
}
