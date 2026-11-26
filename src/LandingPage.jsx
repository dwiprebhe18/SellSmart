import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  Check,
  Heart,
  MessageCircle,
  Package,
  Play,
  Sparkles,
  Store,
  Zap
} from 'lucide-react'
import './landing.css'

const products = [
  {
    name: 'Sunday Market Tote',
    category: 'HANDMADE GOODS',
    price: '₹799',
    image: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=440&q=85'
  },
  {
    name: 'Everyday Linen',
    category: 'SLOW FASHION',
    price: '₹1,299',
    image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=440&q=85'
  }
]

function LandingPage({ onExplore }) {
  return (
    <div className="landing-page" id="top">
      <header className="landing-nav">
        <a className="landing-brand" href="#top" aria-label="SellSmart home">
          <span className="landing-brand-mark"><Zap size={19} fill="currentColor" /></span>
          <span>sellsmart<span className="brand-period">.</span></span>
        </a>
        <nav className="landing-links" aria-label="Main navigation">
          <a href="#features">What you get</a>
          <a href="#how-it-works">How it works</a>
          <a href="#about">Our why</a>
        </nav>
        <button className="landing-nav-cta" onClick={onExplore}>
          Explore the demo <ArrowUpRight size={16} />
        </button>
      </header>

      <main>
        <section className="landing-hero">
          <div className="hero-copy">
            <div className="hero-kicker"><span className="kicker-spark"><Sparkles size={14} /></span> BIG IDEAS. SMALL BUSINESS.</div>
            <h1>Your kind of business deserves to <span>be seen.</span></h1>
            <p className="hero-description">
              Meet the little-business sidekick that helps you show up, find your people, and grow with confidence.
            </p>
            <div className="hero-actions">
              <button className="button-lime" onClick={onExplore}>Explore the dashboard <ArrowRight size={17} /></button>
              <a className="button-play" href="#features"><span><Play size={13} fill="currentColor" /></span> Take a quick look</a>
            </div>
            <div className="hero-proof">
              <div className="proof-avatars" aria-hidden="true"><span>B</span><span>M</span><span>A</span><span>+</span></div>
              <p><strong>Made for people who make things.</strong><br />Your next chapter starts here.</p>
            </div>
          </div>

          <div className="hero-art" aria-label="Preview of the SellSmart business dashboard">
            <div className="art-orbit orbit-one" />
            <div className="art-orbit orbit-two" />
            <div className="art-sticker sticker-top"><Sparkles size={15} /> your next big thing</div>
            <div className="art-sticker sticker-bottom"><span className="live-dot" /> Looking good, Bloom!</div>

            <div className="preview-window">
              <div className="preview-topbar">
                <div className="preview-dots"><i /><i /><i /></div>
                <span>YOUR BUSINESS, IN BLOOM</span>
                <div className="preview-avatar">B</div>
              </div>
              <div className="preview-content">
                <div className="preview-welcome">
                  <div><small>MONDAY, NOVEMBER 26</small><h2>Hey, Bloom & Basket <span>✳</span></h2></div>
                  <div className="preview-growth"><ArrowUpRight size={14} /> growing</div>
                </div>
                <div className="preview-stats">
                  <div className="preview-stat"><span>People found you</span><strong>8,420</strong><small><ArrowUpRight size={12} /> 12.8% this week</small></div>
                  <div className="preview-stat"><span>They loved your stuff</span><strong>4.8%</strong><small><Heart size={11} /> engagement</small></div>
                </div>
                <div className="preview-chart">
                  <div className="chart-caption"><span>A little progress, every day</span><b>THIS WEEK <ArrowDownRight size={12} /></b></div>
                  <div className="chart-bars" aria-hidden="true">
                    {[36, 52, 43, 69, 58, 88, 75, 96, 68, 84, 100, 79, 91, 72].map((height, index) => (
                      <i key={index} style={{ '--bar-height': `${height}%`, '--bar-index': index }} />
                    ))}
                  </div>
                  <div className="chart-days"><span>MON</span><span>WED</span><span>FRI</span><span>SUN</span></div>
                </div>
                <div className="preview-products-heading"><span>Little things doing big things</span><a href="#features">SEE ALL <ArrowUpRight size={11} /></a></div>
                <div className="preview-products">
                  {products.map(product => (
                    <div className="preview-product" key={product.name}>
                      <img src={product.image} alt="" />
                      <div><small>{product.category}</small><b>{product.name}</b><span>{product.price} <i>·</i> <Heart size={10} /> 124</span></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="floating-stat"><span className="floating-stat-icon"><MessageCircle size={16} /></span><span><b>New customer note</b><small>“Love the new collection!”</small></span><span className="floating-stat-dot" /></div>
          </div>
        </section>

        <section className="landing-ribbon" aria-label="SellSmart benefits">
          <span><Store size={17} /> YOUR BUSINESS, YOUR WAY</span>
          <i>✳</i><span><BarChart3 size={17} /> GROWTH THAT MAKES SENSE</span>
          <i>✳</i><span><Heart size={17} /> MADE FOR THE MAKERS</span>
          <i>✳</i><span><Package size={17} /> ALL YOUR GOOD STUFF, TOGETHER</span>
        </section>

        <section className="landing-features" id="features">
          <div className="section-heading">
            <span className="section-eyebrow">LESS JUGGLING, MORE GROWING</span>
            <h2>All the good stuff.<br /><span>One happy place.</span></h2>
            <p>Running a business is a lot. SellSmart brings the important bits together, so you can spend more time doing what you love.</p>
          </div>
          <div className="feature-grid">
            <article className="feature-card feature-card-lilac">
              <div className="feature-icon"><Store size={21} /></div>
              <span className="feature-number">01 / YOUR SPACE</span>
              <h3>A home for your business.</h3>
              <p>Make a lovely first impression with a profile that tells your story and puts your products front and centre.</p>
              <span className="feature-doodle doodle-store"><Store size={76} strokeWidth={1} /></span>
            </article>
            <article className="feature-card feature-card-peach">
              <div className="feature-icon"><BarChart3 size={21} /></div>
              <span className="feature-number">02 / YOUR MOMENTUM</span>
              <h3>See what's clicking.</h3>
              <p>Friendly, easy-to-read insights help you understand what's working and where your next opportunity might be.</p>
              <span className="feature-doodle doodle-chart"><BarChart3 size={79} strokeWidth={1} /></span>
            </article>
            <article className="feature-card feature-card-green">
              <div className="feature-icon"><Sparkles size={21} /></div>
              <span className="feature-number">03 / YOUR NEXT STEP</span>
              <h3>Good ideas, made doable.</h3>
              <p>Get practical growth suggestions and a simple plan that turns “someday” into one small step today.</p>
              <span className="feature-doodle doodle-spark"><Sparkles size={76} strokeWidth={1} /></span>
            </article>
          </div>
        </section>

        <section className="landing-how" id="how-it-works">
          <div className="how-copy">
            <span className="section-eyebrow">NO BIG-TECH ENERGY REQUIRED</span>
            <h2>Small steps.<br /><span>Real momentum.</span></h2>
            <p>Whether you're selling handmade finds, family recipes, or a very good idea, getting started should feel simple.</p>
            <button className="button-dark" onClick={onExplore}>See it for yourself <ArrowRight size={17} /></button>
          </div>
          <div className="how-steps">
            <div className="how-step"><span className="step-count">01</span><div><h3>Tell your story</h3><p>Set up your business profile and show the world what makes you, you.</p></div><span className="step-check"><Check size={17} /></span></div>
            <div className="how-step"><span className="step-count">02</span><div><h3>Put your good stuff out there</h3><p>Add your products, keep things fresh, and make it easy to discover you.</p></div><span className="step-check"><Check size={17} /></span></div>
            <div className="how-step"><span className="step-count">03</span><div><h3>Grow at your own pace</h3><p>See what resonates, make a plan, and celebrate every little win.</p></div><span className="step-check"><Check size={17} /></span></div>
          </div>
        </section>

        <section className="landing-about" id="about">
          <div className="about-copy">
            <span className="section-eyebrow">A LITTLE LOVE FOR THE LITTLE GUYS</span>
            <h2>Because big dreams don't need a big team.</h2>
            <p>SellSmart is a project built around a simple belief: every small business deserves the tools and confidence to be seen. Less overwhelm, more “look how far we've come.”</p>
            <button className="about-link" onClick={onExplore}>Come have a look <ArrowUpRight size={16} /></button>
          </div>
          <div className="about-stats">
            <div><strong>One</strong><span>friendly place for your business</span></div>
            <div><strong>Your</strong><span>ideas, your pace, your next step</span></div>
            <div className="about-note"><Sparkles size={19} /><span>Made with makers<br />in mind, always.</span></div>
          </div>
          <span className="about-sun" aria-hidden="true">✳</span>
        </section>

        <section className="landing-cta">
          <div className="cta-spark cta-spark-one">✳</div>
          <div className="cta-spark cta-spark-two">✳</div>
          <span className="section-eyebrow">YOUR NEXT CHAPTER IS CALLING</span>
          <h2>Ready to make a<br />little more <span>noise?</span></h2>
          <p>Take a peek inside SellSmart. Your business will feel right at home.</p>
          <button className="button-lime" onClick={onExplore}>Explore the SellSmart demo <ArrowRight size={17} /></button>
          <span className="cta-footnote">A friendly, interactive project preview. No sign-up needed.</span>
        </section>
      </main>

      <footer className="landing-footer">
        <a className="landing-brand" href="#top">
          <span className="landing-brand-mark"><Zap size={17} fill="currentColor" /></span>
          <span>sellsmart<span className="brand-period">.</span></span>
        </a>
        <span>For the doers, dreamers, and makers. © 2026 SellSmart</span>
        <a href="#top" className="back-to-top">BACK TO TOP <ArrowUpRight size={13} /></a>
      </footer>
    </div>
  )
}

export default LandingPage
