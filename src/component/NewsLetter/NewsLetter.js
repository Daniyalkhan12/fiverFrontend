import React from 'react'

const NewsLetter = () => {
  return (
    <div>
         <div id="shopify-section-newsletter" className="shopify-section shopify-section--newsletter">
      <script type="application/json" data-section-type="newsletter" data-section-id="newsletter">
      </script>

      <div className="section-wrapper--login is-width-wide">
        <style data-shopify="">
          {/* You can include the styles here */}
        </style>

        <section className="section is-width-wide has-no-side-gutter">
          <div className="newsletter_section newsletter-both-names--false text-align--center blur-up lazyloaded">
            <div className="">
              <div className="offset-by-three five-eighths columns medium-down--one-whole is-hidden-offset-mobile-only section_form">
                <h2 className="title">Sign up for our Newsletter</h2>
                <div className="newsletter-text">
                  <p>Get a sneak peek on upcoming promos and get 10% off your first order!</p>
                </div>
                <div className="newsletter">
                  <span className="message"></span>
                  <form method="post" action="/contact#contact_form" id="contact_form" acceptCharset="UTF-8" className="contact-form">
                    <input type="hidden" name="form_type" value="customer" />
                    <input type="hidden" name="utf8" value="✓" />
                    <input type="hidden" name="contact[tags]" value="prospect,newsletter" />
                    <div className="input-row"></div>
                    <div className="input-row">
                      <input type="hidden" name="challenge" value="false" />
                      <input type="email" className="contact_email" name="contact[email]" required="" placeholder="Enter your email address..." />
                      <input type="submit" className="global-button global-button--primary newsletter-form__sign-up" value="Sign Up" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
    </div>
  )
}

export default NewsLetter