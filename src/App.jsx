import React, { useMemo, useRef, useState } from 'react'
import {
  ArrowLeft, LayoutDashboard, Store, Package, ChartNoAxesCombined, Lightbulb, CalendarDays,
  UsersRound, MessageSquareText, CreditCard, Settings, Search, Bell, ChevronDown,
  Menu, X, ArrowUpRight, ArrowDownRight, Eye, Heart, MessageCircle, Plus,
  Filter, MoreHorizontal, Sparkles, CheckCircle2, Clock, TrendingUp, Target,
  Image as ImageIcon, CircleHelp, LogOut, ShieldCheck, UserRound, ExternalLink,
  Send, Trash2, Pencil, Check, AlertCircle, Download, Zap, Globe, Mail, Phone,
  Video
} from 'lucide-react'
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts'

const initialProducts = [
  { id: 1, name: 'Handwoven Tote Bag', category: 'Accessories', price: 799, views: 1240, likes: 186, status: 'Active', image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=500&q=80' },
  { id: 2, name: 'Everyday Linen Shirt', category: 'Clothing', price: 1299, views: 980, likes: 142, status: 'Active', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=500&q=80' },
  { id: 3, name: 'Minimal Ceramic Mug', category: 'Home', price: 499, views: 760, likes: 98, status: 'Active', image: 'https://images.unsplash.com/photo-1514228742587-6b1558f908d3?auto=format&fit=crop&w=500&q=80' },
  { id: 4, name: 'Floral Gift Box', category: 'Gifts', price: 999, views: 540, likes: 74, status: 'Draft', image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=500&q=80' }
]
const trend = [
  { day: 'Mon', reach: 2100, engagement: 340 }, { day: 'Tue', reach: 2800, engagement: 420 },
  { day: 'Wed', reach: 2400, engagement: 390 }, { day: 'Thu', reach: 3600, engagement: 520 },
  { day: 'Fri', reach: 3200, engagement: 480 }, { day: 'Sat', reach: 4300, engagement: 680 },
  { day: 'Sun', reach: 3900, engagement: 610 }
]
const navGroups = [
  { label: 'Workspace', items: [
    ['Overview', LayoutDashboard], ['Posts', ImageIcon], ['My business', Store], ['Products', Package],
    ['Analytics', ChartNoAxesCombined], ['Growth plan', Lightbulb], ['Content planner', CalendarDays]
  ]},
  { label: 'Manage', items: [['Competitors', UsersRound], ['Enquiries', MessageSquareText], ['Subscription', CreditCard]]}
]
const adminNav = [['Admin overview', LayoutDashboard], ['Users & businesses', UsersRound], ['Reports', ShieldCheck], ['Platform analytics', ChartNoAxesCombined], ['Categories', Package], ['Subscriptions', CreditCard]]
const pageTitles = {
  Overview: ['Good morning, Dwip 👋', 'Share what you’re making and stay connected with your customers.'],
  Posts: ['Your posts', 'Create and manage the content you share with your customers.'],
  'My business': ['My business', 'Manage your business profile and online presence.'],
  Products: ['Products', 'Showcase your products and keep your catalogue fresh.'],
  Analytics: ['Analytics', 'Understand what’s working and where to improve.'],
  'Growth plan': ['Your growth plan', 'Small, focused actions to help your business grow.'],
  'Content planner': ['Content planner', 'Plan content that keeps your audience engaged.'],
  Competitors: ['Competitor insights', 'Compare public business information and learn from the market.'],
  Enquiries: ['Customer enquiries', 'Stay on top of conversations and potential customers.'],
  Subscription: ['Subscription', 'Choose the plan that fits your business.'],
  'Admin overview': ['Platform overview', 'Monitor SellSmart activity and platform health.'],
  'Users & businesses': ['Users & businesses', 'Manage accounts and business profiles.'],
  Reports: ['Reports & moderation', 'Review reported content and take appropriate action.'],
  'Platform analytics': ['Platform analytics', 'Understand adoption and activity across SellSmart.'],
  Categories: ['Categories', 'Manage business and product categories.'],
  Subscriptions: ['Subscriptions', 'Monitor platform subscription activity.'],
  Settings: ['Settings', 'Manage your profile and workspace preferences.']
}
function money(n){ return '₹'+Number(n).toLocaleString('en-IN') }
function Badge({children, tone='neutral'}){ return <span className={`badge ${tone}`}>{children}</span> }
function Button({children, kind='primary', size='', onClick, icon:Icon, disabled=false, submit=false, block=false}){ return <button type={submit?'submit':'button'} className={`btn ${kind} ${size} ${block?'block':''}`} onClick={onClick} disabled={disabled}>{Icon&&<Icon size={16}/>}{children}</button> }
function Metric({label,value,change,icon:Icon,positive=true}){return <div className="metric-card"><div className="metric-top"><span>{label}</span><span className="metric-icon"><Icon size={18}/></span></div><div className="metric-value">{value}</div><div className={`metric-change ${positive?'up':'down'}`}>{positive?<ArrowUpRight size={14}/>:<ArrowDownRight size={14}/>} {change}<span className="muted"> vs last week</span></div></div>}
function App({role='business',onLogout=()=>{},accounts=[],account={}}){
  const [page,setPage]=useState(role==='admin'?'Admin overview':'Overview')
  const pageHistory=useRef([])
  const [mobileOpen,setMobileOpen]=useState(false)
  const [search,setSearch]=useState('')
  const [products,setProducts]=useState(initialProducts)
  const [posts,setPosts]=useState([])
  const [modal,setModal]=useState('')
  const [toast,setToast]=useState('')
  const [newProduct,setNewProduct]=useState({name:'',category:'Accessories',price:''})
  const [business,setBusiness]=useState({
    name:account.businessName||'Bloom & Basket',category:account.category||'Lifestyle & Gifts',
    description:account.description||'Thoughtful everyday products, made with care.',
    email:account.email||'hello@bloomandbasket.in',phone:account.phone||'+91 98765 43210',
    location:account.location||'Pune, Maharashtra',whatsapp:account.whatsapp||'',instagram:account.instagram||''
  })
  const [enquiries,setEnquiries]=useState([
    {id:1,name:'Ananya Sharma',subject:'Custom gift box',message:'Can I customise this for a birthday?',time:'10 min ago',status:'New'},
    {id:2,name:'Rohan Mehta',subject:'Bulk order enquiry',message:'Do you offer pricing for 25 pieces?',time:'1 hour ago',status:'In progress'},
    {id:3,name:'Isha Kulkarni',subject:'Product availability',message:'Is the linen shirt available in M?',time:'Yesterday',status:'Resolved'}
  ])
  const [reports,setReports]=useState([{id:1,type:'Business listing',name:'Urban Finds',reason:'Misleading business information',status:'Pending'},{id:2,type:'Product',name:'Premium Gift Set',reason:'Reported product description',status:'Pending'}])
  const [users,setUsers]=useState(()=>[
    {id:1,name:'Bloom & Basket',email:'hello@bloomandbasket.in',role:'Business owner',status:'Active'},
    {id:2,name:'Urban Finds',email:'urban@example.com',role:'Business owner',status:'Active'},
    {id:3,name:'Craft Corner',email:'craft@example.com',role:'Business owner',status:'Review'},
    ...accounts.filter(account=>account.role==='business'||account.role==='user').map(account=>({
      id:account.id,name:account.businessName||account.name,email:account.email,
      role:account.role==='business'?'Business owner':'Normal user',status:account.status||'Active'
    }))
  ])
  const [tasks,setTasks]=useState([
    {id:1,title:'Add clear prices to your top 3 products',desc:'Help customers make faster decisions.',done:true,tag:'Product visibility'},
    {id:2,title:'Post a short product video',desc:'Your audience responds well to visual content.',done:false,tag:'Engagement'},
    {id:3,title:'Reply to 2 unanswered enquiries',desc:'Responding promptly builds customer trust.',done:false,tag:'Customer care'},
    {id:4,title:'Complete your business story',desc:'Tell customers what makes your brand special.',done:false,tag:'Profile'}
  ])
  const [plans,setPlans]=useState('Growth')
  const [categoryList,setCategoryList]=useState(['Clothing & Fashion','Home & Living','Food & Beverage','Handmade & Crafts','Beauty & Wellness','Gifts & Accessories'])
  const [categoryInput,setCategoryInput]=useState('')
  const [planner,setPlanner]=useState([
    {id:1,date:'2026-11-27',title:'Behind the scenes',type:'Reel',status:'Planned'},
    {id:2,date:'2026-11-29',title:'Customer favourite',type:'Product post',status:'Draft'},
    {id:3,date:'2026-12-01',title:'Gift guide carousel',type:'Carousel',status:'Planned'}
  ])
  const [activeProduct,setActiveProduct]=useState(null)
  const [filter,setFilter]=useState('All')
  const [profileSaved,setProfileSaved]=useState(false)
  const [notice,setNotice]=useState(false)
  const [dateRange,setDateRange]=useState('Last 7 days')
  const [settings,setSettings]=useState({name:account.ownerName||account.name||'Dwip Rebhe',email:account.email||'dwip@example.com',notifications:true})
  const filteredProducts=useMemo(()=>products.filter(p=>(filter==='All'||p.status===filter)&&p.name.toLowerCase().includes(search.toLowerCase())),[products,filter,search])
  const notify=(msg)=>{setToast(msg);window.setTimeout(()=>setToast(''),2600)}
  const navigate=(name)=>{if(name!==page)pageHistory.current.push(page);setPage(name);setMobileOpen(false);setSearch('')}
  const goBack=()=>{setPage(pageHistory.current.pop()||(role==='admin'?'Admin overview':'Overview'));setMobileOpen(false);setSearch('')}
  const addProduct=()=>{if(!newProduct.name.trim()||!newProduct.price){notify('Please enter product name and price');return}setProducts(prev=>[{id:Date.now(),name:newProduct.name,category:newProduct.category,price:Number(newProduct.price),views:0,likes:0,status:'Active',image:'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80'},...prev]);setNewProduct({name:'',category:'Accessories',price:''});setModal('');notify('Product added to your catalogue')}
  const updateTask=(id)=>setTasks(prev=>prev.map(t=>t.id===id?{...t,done:!t.done}:t))
  const toggleUser=(id)=>setUsers(prev=>prev.map(u=>u.id===id?{...u,status:u.status==='Active'?'Suspended':'Active'}:u))
  const resolveReport=(id)=>setReports(prev=>prev.map(r=>r.id===id?{...r,status:'Resolved'}:r))
  const resolveEnquiry=(id)=>setEnquiries(prev=>prev.map(e=>e.id===id?{...e,status:e.status==='Resolved'?'New':'Resolved'}:e))
  const removeProduct=(id)=>{setProducts(prev=>prev.filter(p=>p.id!==id));setActiveProduct(null);notify('Product removed')}
  const addPlanner=()=>{setPlanner(prev=>[...prev,{id:Date.now(),date:'2026-12-03',title:'New content idea',type:'Post',status:'Draft'}]);notify('Content idea added')}
  const sidebar=<aside className={`sidebar ${mobileOpen?'open':''}`}>
    <div className="brand"><div className="brand-mark"><Zap size={21} fill="currentColor"/></div><span>sell<span>smart</span><small>BUSINESS GROWTH</small></span><button className="close-mobile" onClick={()=>setMobileOpen(false)}><X size={18}/></button></div>
    <div className="workspace-switch"><div className="workspace-avatar">{role==='admin'?'A':'B'}</div><div className="workspace-name"><b>{role==='admin'?'SellSmart Admin':business.name}</b><small>{role==='admin'?'Platform workspace':'Business workspace'}</small></div></div>
    {role==='business'?navGroups.map(g=><div className="nav-group" key={g.label}><div className="nav-label">{g.label}</div>{g.items.map(([name,Icon])=><button key={name} className={`nav-item ${page===name?'active':''}`} onClick={()=>navigate(name)}><Icon size={18}/><span>{name}</span>{name==='Enquiries'&&<span className="nav-count">2</span>}</button>)}</div>):<div className="nav-group"><div className="nav-label">Administration</div>{adminNav.map(([name,Icon])=><button key={name} className={`nav-item ${page===name?'active':''}`} onClick={()=>navigate(name)}><Icon size={18}/><span>{name}</span></button>)}</div>}
    <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><b>Need a hand?</b><p>Explore tips to get more from SellSmart.</p><button onClick={()=>notify('Help centre is a demo feature')}>Visit help centre <ArrowUpRight size={14}/></button></div>{role==='business'&&<button className={`nav-item ${page==='Settings'?'active':''}`} onClick={()=>navigate('Settings')}><Settings size={18}/><span>Settings</span></button>}<div className="profile-mini"><div className="avatar">{(account.ownerName||account.name||'DR').slice(0,2).toUpperCase()}</div><div className="profile-info"><b>{role==='admin'?'SellSmart Admin':account.ownerName||account.name||'Dwip Rebhe'}</b><small>{role==='admin'?'Platform administrator':'Business owner'}</small></div><MoreHorizontal size={18}/></div></div>
  </aside>
  const header=<header className="topbar"><button className="mobile-menu" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button><button className="app-back-button" onClick={goBack}><ArrowLeft size={16}/>Back</button><div className="breadcrumb">Workspace <span>/</span> <b>{page}</b></div><div className="top-actions"><div className="global-search"><Search size={16}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search anything..." /><kbd>⌘ K</kbd></div><button className="icon-btn" onClick={()=>{setNotice(!notice);notify('You’re all caught up')}}><Bell size={18}/><i/></button><button className="icon-btn" onClick={onLogout} aria-label="Log out" title="Log out"><LogOut size={17}/></button><div className="top-avatar">{(account.ownerName||account.name||'DR').slice(0,2).toUpperCase()}</div></div></header>
  const pageHead=()=>{let [title,desc]=pageTitles[page]||['SellSmart','Manage your workspace.'];if(page==='Overview'&&role==='business')title=`Good morning, ${account.ownerName||account.name||'Dwip'} 👋`;return <div className="page-heading"><div><h1>{title}</h1><p>{desc}</p></div>{page==='Products'?<Button icon={Plus} onClick={()=>setModal('product')}>Add product</Button>:page==='Posts'?<Button icon={Plus} onClick={()=>document.getElementById('post-caption')?.focus()}>Write a post</Button>:page==='Content planner'?<Button icon={Plus} onClick={addPlanner}>New idea</Button>:page==='Overview'?<Button icon={ImageIcon} onClick={()=>navigate('Posts')}>Create a post</Button>:null}</div>}
  const overview=()=> <><div className="metrics-grid"><Metric label="Profile visits" value="8,420" change="12.8%" icon={Eye}/><Metric label="Product views" value="5,286" change="8.4%" icon={Package}/><Metric label="Engagement rate" value="4.8%" change="1.2%" icon={Heart}/><Metric label="Customer enquiries" value="126" change="16.3%" icon={MessageSquareText}/></div><div className="dashboard-grid"><section className="panel chart-panel"><div className="panel-heading"><div><h3>Performance overview</h3><p>Reach and engagement over time</p></div><select value={dateRange} onChange={e=>setDateRange(e.target.value)}><option>Last 7 days</option><option>Last 30 days</option><option>This month</option></select></div><div className="chart-legend"><span><i className="legend-dot purple"/> Reach</span><span><i className="legend-dot mint"/> Engagement</span></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={trend} margin={{left:-20,right:5,top:8,bottom:0}}><defs><linearGradient id="reachFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#7968E8" stopOpacity={0.2}/><stop offset="100%" stopColor="#7968E8" stopOpacity={0}/></linearGradient></defs><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e9eaf0"/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:'#8990a1',fontSize:12}}/><YAxis axisLine={false} tickLine={false} tick={{fill:'#8990a1',fontSize:11}}/><Tooltip/><Area type="monotone" dataKey="reach" stroke="#7968E8" strokeWidth={2.5} fill="url(#reachFill)"/><Area type="monotone" dataKey="engagement" stroke="#41BFA0" strokeWidth={2.5} fill="transparent"/></AreaChart></ResponsiveContainer></div></section><section className="panel insights-panel"><div className="panel-heading"><div><h3><Sparkles size={16} className="inline-icon"/> Growth insights</h3><p>Ideas based on your activity</p></div><Badge tone="purple">3 new</Badge></div><div className="insight-item"><div className="insight-symbol mint"><TrendingUp size={17}/></div><div><b>Your reach is growing</b><p>Reach is up 12.8% this week. Keep sharing content consistently.</p></div></div><div className="insight-item"><div className="insight-symbol yellow"><Clock size={17}/></div><div><b>Try posting at 7 PM</b><p>Your audience appears more active in the evening. Test this time.</p></div></div><div className="insight-item"><div className="insight-symbol purple"><Target size={17}/></div><div><b>Complete your profile</b><p>Add a business story to build trust with new visitors.</p></div></div><button className="text-link" onClick={()=>navigate('Growth plan')}>View growth plan <ArrowUpRight size={14}/></button></section></div><section className="panel table-panel"><div className="panel-heading"><div><h3>Top performing products</h3><p>Your most viewed products this week</p></div><button className="text-link" onClick={()=>navigate('Products')}>View all <ArrowUpRight size={14}/></button></div><ProductTable products={products.slice(0,3)} onOpen={p=>{setActiveProduct(p);setModal('product-detail')}}/></section><div className="bottom-grid"><section className="panel"><div className="panel-heading"><div><h3>Growth checklist</h3><p>Keep moving towards your goals</p></div><span className="task-progress">{tasks.filter(t=>t.done).length}/{tasks.length}</span></div>{tasks.slice(0,3).map(t=><div className="task-row" key={t.id}><button className={`task-check ${t.done?'checked':''}`} onClick={()=>updateTask(t.id)}>{t.done&&<Check size={13}/>}</button><div className={t.done?'task-done':''}><b>{t.title}</b><small>{t.tag}</small></div></div>)}</section><section className="panel"><div className="panel-heading"><div><h3>Recent enquiries</h3><p>Messages from potential customers</p></div><button className="text-link" onClick={()=>navigate('Enquiries')}>View all</button></div>{enquiries.slice(0,3).map(e=><div className="enquiry-mini" key={e.id}><div className="avatar small">{e.name.split(' ').map(x=>x[0]).join('')}</div><div><b>{e.name}</b><small>{e.subject}</small></div><span className="time">{e.time}</span></div>)}</section></div></>
  const productsPage=()=> <section className="panel table-panel"><div className="filters"><div className="filter-search"><Search size={15}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search products"/></div><div className="filter-right"><select value={filter} onChange={e=>setFilter(e.target.value)}><option>All</option><option>Active</option><option>Draft</option></select><button className="btn soft small" onClick={()=>notify('Filter options applied')}><Filter size={15}/> Filters</button></div></div><ProductTable products={filteredProducts} onOpen={p=>{setActiveProduct(p);setModal('product-detail')}} onDelete={removeProduct}/>{filteredProducts.length===0&&<div className="empty">No products found. Try another search.</div>}</section>
  const analyticsPage=()=> <><div className="metrics-grid"><Metric label="Total reach" value="24.8K" change="12.8%" icon={Eye}/><Metric label="Engagement" value="1,196" change="9.2%" icon={Heart}/><Metric label="Profile visits" value="8,420" change="14.1%" icon={Store}/><Metric label="Enquiries" value="126" change="16.3%" icon={MessageSquareText}/></div><section className="panel chart-panel"><div className="panel-heading"><div><h3>Reach & engagement</h3><p>Weekly performance comparison</p></div><select><option>Last 7 days</option><option>Last 30 days</option></select></div><div className="chart-wrap tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={trend}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="reach" fill="#7968E8" radius={[5,5,0,0]}/><Bar dataKey="engagement" fill="#41BFA0" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></section><div className="two-col"><section className="panel"><div className="panel-heading"><div><h3>Engagement by content</h3><p>Illustrative distribution</p></div></div><div className="chart-wrap pie-wrap"><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={[{name:'Reels',value:42},{name:'Images',value:31},{name:'Stories',value:27}]} dataKey="value" nameKey="name" innerRadius={58} outerRadius={85} paddingAngle={4}><Cell fill="#7968E8"/><Cell fill="#41BFA0"/><Cell fill="#F1B94A"/></Pie><Tooltip/></PieChart></ResponsiveContainer></div><div className="pie-legend"><span><i className="legend-dot purple"/> Reels 42%</span><span><i className="legend-dot mint"/> Images 31%</span><span><i className="legend-dot yellow-dot"/> Stories 27%</span></div></section><section className="panel"><div className="panel-heading"><div><h3>Key observations</h3><p>What the numbers suggest</p></div></div><div className="insight-item"><div className="insight-symbol mint"><TrendingUp size={17}/></div><div><b>Video content leads</b><p>Reels account for the largest share of engagement in this sample.</p></div></div><div className="insight-item"><div className="insight-symbol yellow"><Target size={17}/></div><div><b>Test more content formats</b><p>Compare formats over time before deciding what works best.</p></div></div></section></div></>
  const growthPage=()=> <><div className="growth-banner"><div className="banner-art"><Sparkles size={32}/></div><div><Badge tone="purple">Your weekly focus</Badge><h2>Build momentum, one step at a time.</h2><p>Complete these actions to strengthen your digital presence.</p></div><div className="banner-progress"><b>{Math.round(tasks.filter(t=>t.done).length/tasks.length*100)}%</b><span>completed</span></div></div><section className="panel"><div className="panel-heading"><div><h3>Your improvement roadmap</h3><p>{tasks.filter(t=>t.done).length} of {tasks.length} actions completed</p></div><Badge tone="success">{tasks.filter(t=>t.done).length===tasks.length?'Complete':'In progress'}</Badge></div><div className="roadmap-list">{tasks.map((t,i)=><div className="roadmap-item" key={t.id}><div className={`roadmap-number ${t.done?'done':''}`}>{t.done?<Check size={16}/>:i+1}</div><div className="roadmap-content"><div className="roadmap-meta"><Badge>{t.tag}</Badge><span>{t.done?'Completed':'Suggested action'}</span></div><h3>{t.title}</h3><p>{t.desc}</p></div><button className={`task-check ${t.done?'checked':''}`} onClick={()=>updateTask(t.id)}>{t.done?<Check size={13}/>:null}</button></div>)}</div></section><section className="panel"><div className="panel-heading"><div><h3>How your growth score works</h3><p>A demo score based on selected business indicators</p></div></div><div className="score-row"><div className="score-circle"><strong>72</strong><span>/ 100</span></div><div><Badge tone="success">Good foundation</Badge><h3>Room to grow</h3><p className="muted">Complete your profile and follow the action plan to strengthen your digital presence.</p></div></div></section></>
  const businessPage=()=> <section className="panel form-panel"><div className="panel-heading"><div><h3>Business profile</h3><p>Tell customers what your business is about.</p></div><Badge tone="success">Public profile</Badge></div><div className="business-cover"><div className="cover-logo">B<span>&</span>B</div><button className="btn soft small" onClick={()=>notify('Cover image upload is a demo feature')}><ImageIcon size={15}/> Change cover</button></div><div className="form-grid"><label>Business name<input value={business.name} onChange={e=>setBusiness({...business,name:e.target.value})}/></label><label>Business category<select value={business.category} onChange={e=>setBusiness({...business,category:e.target.value})}><option>Lifestyle & Gifts</option><option>Clothing & Fashion</option><option>Food and Bakery</option><option>Handmade Products</option><option>Beauty and Personal Care</option><option>Home Decor</option><option>Electronics and Accessories</option><option>Art and Craft</option><option>Other Small Businesses</option><option>Home & Living</option><option>Food & Beverage</option><option>Handmade & Crafts</option><option>Beauty & Wellness</option><option>Gifts & Accessories</option></select></label><label className="full">Business description<textarea value={business.description} onChange={e=>setBusiness({...business,description:e.target.value})}/></label><label>Email address<input type="email" value={business.email} onChange={e=>setBusiness({...business,email:e.target.value})}/></label><label>Phone number<input value={business.phone} onChange={e=>setBusiness({...business,phone:e.target.value})}/></label><label className="full">Location<input value={business.location} onChange={e=>setBusiness({...business,location:e.target.value})}/></label><label>WhatsApp number<input value={business.whatsapp} onChange={e=>setBusiness({...business,whatsapp:e.target.value})} placeholder="Include country code"/></label><label>Instagram profile<input value={business.instagram} onChange={e=>setBusiness({...business,instagram:e.target.value})} placeholder="https://instagram.com/yourbusiness"/></label></div><div className="form-actions"><span className="muted">{profileSaved?'Changes saved in this demo.':'Changes are stored locally in this demo.'}</span><Button onClick={()=>{setProfileSaved(true);notify('Business profile saved')}}>Save changes</Button></div></section>
  const plannerPage=()=> <section className="panel table-panel"><div className="panel-heading"><div><h3>Content schedule</h3><p>Plan ahead and stay consistent.</p></div><Button kind="soft" icon={Plus} onClick={addPlanner}>Add idea</Button></div><div className="planner-list">{planner.map(p=><div className="planner-row" key={p.id}><div className="planner-date"><b>{new Date(p.date+'T12:00:00').getDate()}</b><span>{new Date(p.date+'T12:00:00').toLocaleDateString('en-US',{month:'short'})}</span></div><div className="planner-content"><b>{p.title}</b><small>{p.type} · {p.date}</small></div><Badge tone={p.status==='Planned'?'success':'neutral'}>{p.status}</Badge><button className="icon-btn" onClick={()=>setPlanner(prev=>prev.filter(x=>x.id!==p.id))}><Trash2 size={16}/></button></div>)}</div></section>
  const competitorPage=()=> <><section className="panel"><div className="panel-heading"><div><h3>Competitor watchlist</h3><p>Track public information from businesses in your category.</p></div><Button kind="soft" icon={Plus} onClick={()=>notify('Competitor addition is a demo feature')}>Add competitor</Button></div><div className="competitor-list">{[{name:'The Crafted Studio',category:'Handmade & Gifts',followers:'8.2K',activity:'4 posts this week',color:'lavender'},{name:'Everyday Collective',category:'Lifestyle',followers:'5.7K',activity:'2 posts this week',color:'mint'},{name:'Little Things Co.',category:'Accessories',followers:'12.4K',activity:'6 posts this week',color:'peach'}].map((c,i)=><div className="competitor-row" key={c.name}><div className={`competitor-avatar ${c.color}`}>{c.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</div><div className="competitor-info"><b>{c.name}</b><small>{c.category}</small></div><div className="competitor-stat"><b>{c.followers}</b><small>Followers (sample)</small></div><div className="competitor-stat"><b>{c.activity}</b><small>Public activity (sample)</small></div><button className="icon-btn" onClick={()=>notify('Comparison opened (demo)')}><ArrowUpRight size={16}/></button></div>)}</div><p className="footnote">Sample competitor data for demonstration. Use only public or authorised information in a real product.</p></section></>
  const enquiriesPage=()=> <section className="panel table-panel"><div className="panel-heading"><div><h3>All enquiries</h3><p>Manage customer questions and follow-ups.</p></div><Button kind="soft" icon={Download} onClick={()=>notify('Enquiry export is a demo feature')}>Export</Button></div><div className="enquiry-list">{enquiries.map(e=><div className="enquiry-row" key={e.id}><div className="avatar">{e.name.split(' ').map(x=>x[0]).join('')}</div><div className="enquiry-details"><div className="enquiry-title"><b>{e.name}</b><span>{e.time}</span></div><b className="subject">{e.subject}</b><p>{e.message}</p><button className="text-link" onClick={()=>resolveEnquiry(e.id)}>{e.status==='Resolved'?'Reopen enquiry':'Mark as resolved'} <Check size={14}/></button></div><Badge tone={e.status==='New'?'purple':e.status==='Resolved'?'success':'warning'}>{e.status}</Badge></div>)}</div></section>
  const subscriptionPage=()=> <><div className="subscription-intro"><Badge tone="success">Current plan · Growth</Badge><h2>Choose how you grow.</h2><p>Start simple and unlock more insights as your business grows.</p></div><div className="pricing-grid">{[{name:'Free',price:'₹0',desc:'For getting started',features:['Business profile','Product showcase','Basic dashboard','Limited insights']},{name:'Growth',price:'₹299',desc:'For growing businesses',features:['Everything in Free','Advanced analytics','Growth recommendations','Monthly report','Content planning']},{name:'Premium',price:'₹799',desc:'For businesses ready to scale',features:['Everything in Growth','Detailed business reports','Competitor insights','Priority support','Premium growth services']}].map(p=><div className={`price-card ${plans===p.name?'selected':''}`} key={p.name}>{p.name==='Growth'&&<Badge tone="purple">Popular</Badge>}<h3>{p.name}</h3><p>{p.desc}</p><div className="price">{p.price}<small>/ month</small></div><ul>{p.features.map(f=><li key={f}><CheckCircle2 size={15}/>{f}</li>)}</ul><Button kind={plans===p.name?'soft':'primary'} block onClick={()=>{setPlans(p.name);notify(p.name+' plan selected (demo)')}}>{plans===p.name?'Current selection':'Choose '+p.name}</Button></div>)}</div><p className="footnote">Pricing is illustrative. No real payment is processed in this frontend demo.</p></>
  const adminOverview=()=> <><div className="metrics-grid"><Metric label="Registered users" value="1,284" change="8.2%" icon={UsersRound}/><Metric label="Businesses" value="846" change="6.4%" icon={Store}/><Metric label="Active subscriptions" value="214" change="11.7%" icon={CreditCard}/><Metric label="Pending reports" value={reports.filter(r=>r.status==='Pending').length} change="Needs review" icon={ShieldCheck} positive={false}/></div><div className="dashboard-grid"><section className="panel chart-panel"><div className="panel-heading"><div><h3>Platform growth</h3><p>New business registrations (sample)</p></div></div><div className="chart-wrap"><ResponsiveContainer width="100%" height="100%"><AreaChart data={[{day:'Mon',users:40},{day:'Tue',users:55},{day:'Wed',users:48},{day:'Thu',users:78},{day:'Fri',users:65},{day:'Sat',users:95},{day:'Sun',users:110}]}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Area dataKey="users" stroke="#7968E8" fill="#7968E8" fillOpacity={0.13}/></AreaChart></ResponsiveContainer></div></section><section className="panel"><div className="panel-heading"><div><h3>Platform health</h3><p>Administration overview</p></div></div>{[['User accounts','Active','success'],['Business listings','Review needed','warning'],['Reports queue',reports.filter(r=>r.status==='Pending').length+' pending','purple']].map(x=><div className="admin-health" key={x[0]}><span>{x[0]}</span><Badge tone={x[2]}>{x[1]}</Badge></div>)}</section></div><section className="panel"><div className="panel-heading"><div><h3>Recent businesses</h3><p>Review account status</p></div><button className="text-link" onClick={()=>navigate('Users & businesses')}>Manage users</button></div><UserTable users={users.slice(0,3)} onToggle={toggleUser}/></section></>
  const usersPage=()=> <section className="panel table-panel"><div className="panel-heading"><div><h3>Users & businesses</h3><p>Manage platform accounts and business status.</p></div></div><UserTable users={users} onToggle={toggleUser}/></section>
  const reportsPage=()=> <section className="panel table-panel"><div className="panel-heading"><div><h3>Moderation queue</h3><p>Review reports submitted by users.</p></div><Badge tone="warning">{reports.filter(r=>r.status==='Pending').length} pending</Badge></div><div className="report-list">{reports.map(r=><div className="report-row" key={r.id}><div className="report-icon"><AlertCircle size={18}/></div><div className="report-info"><b>{r.name}</b><small>{r.type} · {r.reason}</small></div><Badge tone={r.status==='Pending'?'warning':'success'}>{r.status}</Badge><Button size="small" kind="soft" disabled={r.status==='Resolved'} onClick={()=>resolveReport(r.id)}>Resolve</Button></div>)}</div></section>
  const platformAnalytics=()=> <><div className="metrics-grid"><Metric label="Monthly active users" value="3,420" change="10.4%" icon={UsersRound}/><Metric label="Business profiles" value="846" change="6.4%" icon={Store}/><Metric label="Products listed" value="12.6K" change="14.2%" icon={Package}/><Metric label="Enquiries handled" value="2,190" change="18.6%" icon={MessageSquareText}/></div><section className="panel chart-panel"><div className="panel-heading"><div><h3>Platform activity</h3><p>Sample weekly activity</p></div></div><div className="chart-wrap tall"><ResponsiveContainer width="100%" height="100%"><BarChart data={trend}><CartesianGrid strokeDasharray="3 3" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false}/><YAxis axisLine={false} tickLine={false}/><Tooltip/><Bar dataKey="reach" fill="#7968E8" radius={[5,5,0,0]}/></BarChart></ResponsiveContainer></div></section></>
  const categoriesPage=()=> <section className="panel form-panel"><div className="panel-heading"><div><h3>Business categories</h3><p>Manage categories shown during business registration.</p></div></div><form className="category-add" onSubmit={e=>{e.preventDefault();if(categoryInput.trim()){setCategoryList(prev=>[...prev,categoryInput.trim()]);setCategoryInput('');notify('Category added')}}}><input value={categoryInput} onChange={e=>setCategoryInput(e.target.value)} placeholder="Enter new category"/><Button submit icon={Plus}>Add category</Button></form><div className="category-list">{categoryList.map((c,i)=><div className="category-row" key={c}><span className="category-num">{String(i+1).padStart(2,'0')}</span><b>{c}</b><button className="icon-btn" onClick={()=>setCategoryList(prev=>prev.filter(x=>x!==c))}><Trash2 size={16}/></button></div>)}</div></section>
  const adminSubscriptions=()=> <section className="panel table-panel"><div className="panel-heading"><div><h3>Subscription activity</h3><p>Sample subscription overview</p></div></div><div className="metrics-grid compact"><Metric label="Monthly recurring revenue" value="₹63,986" change="11.7%" icon={CreditCard}/><Metric label="Growth subscribers" value="164" change="9.1%" icon={TrendingUp}/></div><div className="subscription-table"><div className="sub-row head"><span>Business</span><span>Plan</span><span>Status</span><span>Renewal</span></div>{[['Bloom & Basket','Growth','Active','Dec 15, 2026'],['Urban Finds','Premium','Active','Dec 18, 2026'],['Craft Corner','Free','Active','—'],['Little Studio','Growth','Past due','Nov 22, 2026']].map((x,i)=><div className="sub-row" key={i}>{x.map((v,j)=><span key={j}>{j===2?<Badge tone={v==='Active'?'success':'warning'}>{v}</Badge>:v}</span>)}</div>)}</div></section>
  const settingsPage=()=> <section className="panel form-panel"><div className="panel-heading"><div><h3>Profile settings</h3><p>Update your account information.</p></div></div><div className="form-grid"><label>Name<input value={settings.name} onChange={e=>setSettings({...settings,name:e.target.value})}/></label><label>Email<input value={settings.email} onChange={e=>setSettings({...settings,email:e.target.value})}/></label><label className="full toggle-label"><span><b>Email notifications</b><small>Receive updates about your business activity.</small></span><input type="checkbox" checked={settings.notifications} onChange={e=>setSettings({...settings,notifications:e.target.checked})}/></label></div><div className="form-actions"><span className="muted">Demo settings are stored in page state.</span><Button onClick={()=>notify('Settings saved in this demo')}>Save settings</Button></div></section>
  const renderPage=()=>{switch(page){case 'Overview':return <BusinessHome business={business} posts={posts} onCreatePost={()=>navigate('Posts')} onViewProducts={()=>navigate('Products')}/>;case 'Posts':return <PostsPage posts={posts} onPublish={post=>{setPosts(prev=>[{...post,id:Date.now(),createdAt:new Date().toLocaleString()},...prev]);notify('Your post is ready in this demo')}} onDelete={id=>setPosts(prev=>prev.filter(post=>post.id!==id))}/>;case 'My business':return businessPage();case 'Products':return productsPage();case 'Analytics':return analyticsPage();case 'Growth plan':return growthPage();case 'Content planner':return plannerPage();case 'Competitors':return competitorPage();case 'Enquiries':return enquiriesPage();case 'Subscription':return subscriptionPage();case 'Admin overview':return adminOverview();case 'Users & businesses':return usersPage();case 'Reports':return reportsPage();case 'Platform analytics':return platformAnalytics();case 'Categories':return categoriesPage();case 'Subscriptions':return adminSubscriptions();case 'Settings':return settingsPage();default:return overview()}}
  return <div className="app-shell">{sidebar}{mobileOpen&&<div className="mobile-backdrop" onClick={()=>setMobileOpen(false)}/>}<main className="main-area">{header}<div className="page-content">{pageHead()}{renderPage()}<footer className="app-footer"><span>© 2026 SellSmart. Because every business needs visibility.</span><span><span className="online-dot"/> All systems demo-ready</span></footer></div></main>{toast&&<div className="toast"><CheckCircle2 size={17}/>{toast}</div>}{modal==='product'&&<div className="modal-backdrop" onClick={()=>setModal('')}><div className="modal" onClick={e=>e.stopPropagation()}><div className="modal-heading"><div><h2>Add a product</h2><p>Add a new item to your business catalogue.</p></div><button className="icon-btn" onClick={()=>setModal('')}><X size={18}/></button></div><form onSubmit={e=>{e.preventDefault();addProduct()}} className="modal-form"><label>Product name<input autoFocus value={newProduct.name} onChange={e=>setNewProduct({...newProduct,name:e.target.value})} placeholder="e.g. Handcrafted candle" required/></label><label>Category<select value={newProduct.category} onChange={e=>setNewProduct({...newProduct,category:e.target.value})}><option>Accessories</option><option>Clothing</option><option>Home</option><option>Gifts</option><option>Food</option></select></label><label>Price (₹)<input type="number" min="0" value={newProduct.price} onChange={e=>setNewProduct({...newProduct,price:e.target.value})} placeholder="799" required/></label><div className="modal-actions"><Button kind="soft" onClick={()=>setModal('')}>Cancel</Button><Button submit>Add product</Button></div></form></div></div>}{modal==='product-detail'&&activeProduct&&<div className="modal-backdrop" onClick={()=>setModal('')}><div className="modal product-modal" onClick={e=>e.stopPropagation()}><button className="icon-btn modal-close" onClick={()=>setModal('')}><X size={18}/></button><img className="detail-image" src={activeProduct.image} alt={activeProduct.name}/><div className="detail-body"><Badge tone={activeProduct.status==='Active'?'success':'neutral'}>{activeProduct.status}</Badge><h2>{activeProduct.name}</h2><p className="detail-price">{money(activeProduct.price)}</p><div className="detail-stats"><span><Eye size={15}/> {activeProduct.views.toLocaleString()} views</span><span><Heart size={15}/> {activeProduct.likes} likes</span></div><Button kind="soft" onClick={()=>removeProduct(activeProduct.id)} icon={Trash2}>Delete product</Button></div></div></div>}</div>
}
function BusinessHome({business,posts,onCreatePost,onViewProducts}){
  return <div className="business-home">
    <section className="welcome-card">
      <div className="welcome-copy">
        <span className="welcome-eyebrow"><Sparkles size={14}/> YOUR BUSINESS, YOUR VOICE</span>
        <h2>Make something worth sharing.</h2>
        <p>Hi {business.name} — share a product, a behind-the-scenes moment, or a note for your customers.</p>
        <div className="welcome-actions">
          <Button icon={ImageIcon} onClick={onCreatePost}>Create a post</Button>
          <button className="welcome-secondary" onClick={onViewProducts}>View your products <ArrowUpRight size={15}/></button>
        </div>
      </div>
      <div className="welcome-art" aria-hidden="true"><span className="welcome-art-orbit"/><span className="welcome-art-star">✳</span><div className="welcome-art-note"><ImageIcon size={20}/><span>Made by you,<br/>shared with the world.</span></div></div>
    </section>
    <section className="home-posts">
      <div className="home-section-heading"><div><span className="section-eyebrow">YOUR CONTENT</span><h2>Recent posts</h2></div><span className="home-post-count">{posts.length} {posts.length===1?'post':'posts'}</span></div>
      {posts.length===0
        ? <div className="home-empty"><div className="home-empty-icon"><ImageIcon size={21}/></div><div><h3>Your first post starts here</h3><p>Add a photo or video and tell customers what’s new with your business.</p></div><Button kind="soft" icon={Plus} onClick={onCreatePost}>Make a post</Button></div>
        : <div className="home-post-grid">{posts.slice(0,3).map(post=><article className="home-post-card" key={post.id}>{post.media&& (post.mediaType==='video'?<video src={post.media} muted playsInline/>:<img src={post.media} alt="Post preview"/>)}<div className="home-post-copy"><p>{post.caption||'Shared with your customers'}</p><small>{post.createdAt}</small></div></article>)}</div>}
    </section>
  </div>
}

function PostsPage({posts,onPublish,onDelete}){
  const [caption,setCaption]=useState('')
  const [media,setMedia]=useState(null)
  const [preview,setPreview]=useState('')
  const [error,setError]=useState('')
  const [isDragging,setIsDragging]=useState(false)
  React.useEffect(()=>{
    if(!media){setPreview('');return undefined}
    const url=media.source||URL.createObjectURL(media.file)
    setPreview(url)
    return media.file?()=>URL.revokeObjectURL(url):undefined
  },[media])
  const selectLocalFile=(file)=>{
    const type=file.type||(/\.(png|jpe?g|gif|webp|avif|bmp)$/i.test(file.name)?'image/x-local':/\.(mp4|webm|mov|m4v)$/i.test(file.name)?'video/x-local':'')
    if(!type.startsWith('image/')&&!type.startsWith('video/')){
      setError('Choose an image or video file.')
      return
    }
    setError('')
    setMedia({file,source:'',name:file.name,type})
  }
  const chooseMedia=(event)=>{
    const file=event.target.files&&event.target.files[0]
    event.target.value=''
    if(!file)return
    selectLocalFile(file)
  }
  const dropMedia=(event)=>{
    event.preventDefault()
    setIsDragging(false)
    const file=event.dataTransfer.files&&event.dataTransfer.files[0]
    if(file){selectLocalFile(file);return}
    const html=event.dataTransfer.getData('text/html')
    const markup=html?new DOMParser().parseFromString(html,'text/html'):null
    const image=markup&&markup.querySelector('img')
    const video=markup&&markup.querySelector('video')
    const uri=event.dataTransfer.getData('text/uri-list').split(/\r?\n/).find(value=>value.trim()&&!value.trim().startsWith('#'))
    const plain=event.dataTransfer.getData('text/plain').trim()
    const candidate=image?.getAttribute('src')||video?.getAttribute('src')||uri||plain
    try{
      const url=new URL(candidate)
      if(url.protocol!=='http:'&&url.protocol!=='https:')throw new Error('Unsupported media URL')
      const isVideo=Boolean(video)||/\.(mp4|webm|mov)(?:$|[?#])/i.test(url.href)
      const type=isVideo?'video/x-url':'image/x-url'
      setError('')
      setMedia({file:null,source:url.href,name:url.pathname.split('/').filter(Boolean).pop()||url.hostname,type})
    }catch{
      setError('Drop a direct image URL or a photo/video file.')
    }
  }
  const startDrag=(event)=>{event.preventDefault();event.dataTransfer.dropEffect='copy';setIsDragging(true)}
  const endDrag=(event)=>{if(!event.currentTarget.contains(event.relatedTarget))setIsDragging(false)}
  const publish=()=>{
    if(!caption.trim()&&!media){setError('Add a caption or choose a photo or video first.');return}
    setError('')
    if(!media){onPublish({caption:caption.trim(),media:'',mediaType:''});setCaption('');return}
    if(!media.file){
      onPublish({caption:caption.trim(),media:media.source,mediaType:media.type.startsWith('video/')?'video':'image'})
      setCaption('')
      setMedia(null)
      return
    }
    const reader=new FileReader()
    reader.onload=()=>{
      if(typeof reader.result!=='string'){setError('The selected media could not be read. Please try another file.');return}
      onPublish({caption:caption.trim(),media:reader.result,mediaType:media.type.startsWith('video/')?'video':'image'})
      setCaption('')
      setMedia(null)
    }
    reader.onerror=()=>setError('The selected media could not be read. Please try another file.')
    reader.readAsDataURL(media.file)
  }
  return <div className="posts-page">
    <section className="post-composer panel">
      <div className="composer-heading"><span className="composer-icon"><Sparkles size={19}/></span><div><h2>Share something with your customers</h2><p>Write a caption and add a photo or video to bring your post to life.</p></div></div>
      <label className="composer-caption-label" htmlFor="post-caption">Your caption</label>
      <textarea id="post-caption" className="post-caption" value={caption} onChange={event=>setCaption(event.target.value)} placeholder="What would you like people to know?" maxLength={1000}/>
      <div className={`upload-dropzone ${isDragging?'is-dragging':''}`} onDragEnter={startDrag} onDragOver={startDrag} onDragLeave={endDrag} onDrop={dropMedia}>
        <p className="dropzone-prompt"><ImageIcon size={16}/> Drop a photo or video here <span>from your device, or drag an image from a webpage</span></p>
        <div className="composer-footer">
          <div className="upload-actions">
            <label className="upload-choice" htmlFor="post-image"><ImageIcon size={17}/> Add photo</label>
            <input className="post-file-input" id="post-image" type="file" accept="image/*" onChange={chooseMedia}/>
            <label className="upload-choice" htmlFor="post-video"><Video size={17}/> Add video</label>
            <input className="post-file-input" id="post-video" type="file" accept="video/*" onChange={chooseMedia}/>
            {media&&<button className="remove-media" type="button" onClick={()=>setMedia(null)}><X size={15}/> Remove media</button>}
          </div>
          <Button icon={Send} onClick={publish}>Publish post</Button>
        </div>
        {error&&<p className="post-error" role="alert">{error}</p>}
        {media&&<div className="media-preview"><div className="media-preview-heading"><span>{media.name}</span><Badge tone="purple">{media.type.startsWith('video/')?'VIDEO':'PHOTO'}</Badge></div>{media.type.startsWith('video/')?<video src={preview} controls playsInline/>:<img src={preview} alt="Selected post preview"/>}</div>}
      </div>
    </section>
    <section className="published-posts">
      <div className="home-section-heading"><div><span className="section-eyebrow">YOUR BUSINESS CONTENT</span><h2>Published posts</h2></div><span className="home-post-count">{posts.length} {posts.length===1?'post':'posts'}</span></div>
      {posts.length===0?<div className="home-empty"><div className="home-empty-icon"><ImageIcon size={21}/></div><div><h3>No posts yet</h3><p>Your published posts will show up here.</p></div></div>:<div className="published-post-grid">{posts.map(post=><article className="published-post-card panel" key={post.id}>{post.media&&(post.mediaType==='video'?<video src={post.media} controls playsInline/>:<img src={post.media} alt="Post media"/>)}<div className="published-post-body"><p>{post.caption||'Shared with your customers'}</p><small>{post.createdAt}</small><button className="text-link delete-post" onClick={()=>onDelete(post.id)}><Trash2 size={14}/> Delete post</button></div></article>)}</div>}
    </section>
  </div>
}

function ProductTable({products,onOpen,onDelete}){
  return <div className="table-scroll"><table className="data-table"><thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Views</th><th>Likes</th><th>Status</th><th></th></tr></thead><tbody>{products.map(p=><tr key={p.id}><td><button className="product-cell" onClick={()=>onOpen(p)}><img src={p.image} alt=""/><span><b>{p.name}</b><small>Product ID: #{String(p.id).padStart(4,'0')}</small></span></button></td><td>{p.category}</td><td>{money(p.price)}</td><td>{p.views.toLocaleString()}</td><td>{p.likes}</td><td><Badge tone={p.status==='Active'?'success':'neutral'}>{p.status}</Badge></td><td><button className="icon-btn" onClick={()=>onOpen(p)}><MoreHorizontal size={17}/></button></td></tr>)}</tbody></table></div>
}
function UserTable({users,onToggle}){
  return <div className="table-scroll"><table className="data-table"><thead><tr><th>Business / user</th><th>Email</th><th>Role</th><th>Status</th><th>Action</th></tr></thead><tbody>{users.map(u=><tr key={u.id}><td><b>{u.name}</b></td><td>{u.email}</td><td>{u.role}</td><td><Badge tone={u.status==='Active'?'success':u.status==='Review'?'warning':'neutral'}>{u.status}</Badge></td><td><button className="text-link" onClick={()=>onToggle(u.id)}>{u.status==='Active'?'Suspend':u.status==='Suspended'?'Activate':'Activate'}</button></td></tr>)}</tbody></table></div>
}
export default App
