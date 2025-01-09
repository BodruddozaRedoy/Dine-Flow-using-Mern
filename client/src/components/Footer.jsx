import React from 'react';

const Footer = () => {
    return (
      <div className="mt-20 ">
        <footer className="footer bg-white text-base-content rounded-t-[40px] p-10 dark:bg-slate-400">
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
          <form>
            <h6 className="footer-title">Newsletter</h6>
            <fieldset className="form-control w-80">
              <label className="label">
                <span className="label-text">Enter your email address</span>
              </label>
              <div className="md:join space-y-3 md:space-y-0">
                <input
                  type="text"
                  placeholder="username@site.com"
                  className="input input-bordered join-item"
                />
                <button className="btn btn-primary text-white join-item">Subscribe</button>
              </div>
            </fieldset>
          </form>
        </footer>
        <footer className="footer footer-center bg-primary text-white p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved Dine Flow
            </p>
          </aside>
        </footer>
      </div>
    );
};

export default Footer;