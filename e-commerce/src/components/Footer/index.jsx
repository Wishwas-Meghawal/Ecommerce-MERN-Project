import Button from "@mui/material/Button";
import React, { useContext } from "react";
import {
  FaTruck,
  FaUndoAlt,
  FaLock,
  FaGift,
  FaHeadset,
  FaFacebookF,
  FaYoutube,
  FaPinterestP,
  FaInstagram,
} from "react-icons/fa";
import { IoChatboxOutline } from "react-icons/io5";
import { IoCloseSharp } from "react-icons/io5";

import { Link } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import { MyContext } from "../../App";
import CartPanel from "../CartPanel";

const Footer = () => {
  const context = useContext(MyContext);
  return (
    <footer className="bg-[#fff] ">
      <div className="container mx-auto px-4">
        {/* TOP FEATURES */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 py-10 text-center">
          {[
            {
              icon: <FaTruck />,
              title: "Free Shipping",
              desc: "For all Orders Over $100",
            },
            {
              icon: <FaUndoAlt />,
              title: "30 Days Returns",
              desc: "For an Exchange Product",
            },
            {
              icon: <FaLock />,
              title: "Secured Payment",
              desc: "Payment Cards Accepted",
            },
            {
              icon: <FaGift />,
              title: "Special Gifts",
              desc: "Our First Product Order",
            },
            {
              icon: <FaHeadset />,
              title: "Support 24/7",
              desc: "Contact us Anytime",
            },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <span className="w-10 h-10 flex items-center justify-center text-2xl text-gray-700">
                {item.icon}
              </span>
              <h4 className="text-sm font-semibold">{item.title}</h4>
              <p className="text-xs text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-7 py-12 border-t border-gray-200 border-b">
          {/* CONTACT */}
          <div>
            <h3 className="text-[20px] font-semibold mb-4">Contact us</h3>
            <p className="text-[13px] text-gray-600 pb-2">
              Classyshop - Mega Super Store
            </p>
            <p className="text-[12px] text-gray-600 mb-5">
              507-Union Trade Centre France
            </p>
            <Link to="mailto:someone@example.com" className="link text-[13px]">
              <p className="text-sm  mb-2">sales@yourcompany.com</p>
            </Link>
            <p className=" text-[25px] text-red-500 font-semibold mt-3 mb-5">
              (+91) 9876-543-210
            </p>
            <div className="flex items-center gap-2">
                <IoChatboxOutline className="text-[40px] text-primary"/>
                <span className="text-[16px] font-[600]">Online Chat<br/>Get Expert Help</span>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="border-l border-gray-200 pl-8">
            <h3 className="text-[18px] font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-600 list">
              <li className="list-none"><Link to="/" className="link">Prices drop</Link></li>
              <li className="list-none"><Link to="/" className="link">New products</Link></li>
              <li className="list-none"><Link to="/" className="link">Best sales</Link></li>
              <li className="list-none"><Link to="/" className="link">Contact us</Link></li>
              <li className="list-none"><Link to="/" className="link">Sitemap</Link></li>
              <li className="list-none"><Link to="/" className="link">Stores</Link></li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-[18px] font-semibold mb-4">Our company</h3>
            <ul className="space-y-2 text-sm text-gray-600 list">
              <li><Link to="/" className="link">Delivery</Link></li>
              <li><Link to="/" className="link">Legal Notice</Link></li>
              <li><Link to="/" className="link">Terms and conditions</Link></li>
              <li><Link to="/" className="link">About us</Link></li>
              <li><Link to="/" className="link">Secure payment</Link></li>
              <li><Link to="/" className="link">Login</Link></li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-[18px] font-semibold mb-4">Subscribe to newsletter</h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border px-3 py-2 mb-4 outline-none"
            />
            <Button className="btn-org">
              SUBSCRIBE
            </Button>
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <input type="checkbox" />
              <span>
                I agree to the terms and conditions and the privacy policy
              </span>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="flex flex-col md:flex-row items-center justify-between py-6 gap-4">
          <div className="flex gap-3">
            {[FaFacebookF, FaYoutube, FaPinterestP, FaInstagram].map(
              (Icon, i) => (
                <span
                  key={i}
                  className="w-9 h-9  border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-red-500 hover:text-white transition cursor-pointer"
                >
                  <Icon />
                </span>
              )
            )}
          </div>

          <p className="text-sm text-gray-500">© 2024 - Ecommerce Template</p>

          <div className="flex gap-2">
            <img src="/visa.png" alt="visa" className="h-6" />
            <img src="/mastercard.png" alt="mc" className="h-6" />
            <img src="/paypal.png" alt="paypal" className="h-6" />
          </div>
        </div>
      </div>

       {/* cart panel */}
      <Drawer
        open={context.openCartPanel}
        onClose={context.toggleCartpanel(false)}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h1>Shopping Cart (10)</h1>
          <IoCloseSharp className="text-[20px] cursor-pointer" onClick={context.toggleCartpanel(false)}/>
        </div>

        <CartPanel/>
      </Drawer>
    </footer>
  );
};

export default Footer;
