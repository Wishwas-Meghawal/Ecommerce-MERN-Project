import React, { useContext, useState } from "react";
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

import { Link } from "react-router-dom";

import Drawer from "@mui/material/Drawer";
import { MyContext } from "../../App";
import CartPanel from "../CartPanel";
import { ShoppingCart } from "lucide-react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { IoCloseSharp } from "react-icons/io5";
import ProductZoom from "../ProductZoom";
import ProductDetailsComponent from "../ProductDetails";
import { MdHome } from "react-icons/md";

const Footer = () => {
  const context = useContext(MyContext);
  const [fullWidth, setFullWidth] = useState(true);
  const [maxWidth, setMaxWidth] = useState("lg");
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
              <IoChatboxOutline className="text-[40px] text-primary" />
              <span className="text-[16px] font-[600]">
                Online Chat
                <br />
                Get Expert Help
              </span>
            </div>
          </div>

          {/* PRODUCTS */}
          <div className="border-l border-gray-200 pl-8">
            <h3 className="text-[18px] font-semibold mb-4">Products</h3>
            <ul className="space-y-2 text-sm text-gray-600 list">
              <li className="list-none">
                <Link to="/" className="link">
                  Prices drop
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link">
                  New products
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link">
                  Best sales
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link">
                  Contact us
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link">
                  Sitemap
                </Link>
              </li>
              <li className="list-none">
                <Link to="/" className="link">
                  Stores
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-[18px] font-semibold mb-4">Our company</h3>
            <ul className="space-y-2 text-sm text-gray-600 list">
              <li>
                <Link to="/" className="link">
                  Delivery
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  Legal Notice
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  Terms and conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  About us
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  Secure payment
                </Link>
              </li>
              <li>
                <Link to="/" className="link">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h3 className="text-[18px] font-semibold mb-4">
              Subscribe to newsletter
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Subscribe to our latest newsletter to get news about special
              discounts.
            </p>
            <input
              type="email"
              placeholder="Your Email Address"
              className="w-full border px-3 py-2 mb-4 outline-none"
            />
            <Button className="btn-org">SUBSCRIBE</Button>
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
              ),
            )}
          </div>

          <p className="text-sm text-gray-500">© 2024 - Ecommerce Template</p>

          <div className="flex gap-3 bg-white/70 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-200/50 p-3 px-5 border border-gray-100/80">
            <img
              src="/visa.png"
              alt="visa"
              className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
            />
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent my-auto"></div>
            <img
              src="/mastercard.png"
              alt="mc"
              className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
            />
            <div className="w-px h-6 bg-gradient-to-b from-transparent via-gray-300 to-transparent my-auto"></div>
            <img
              src="/paypal.png"
              alt="paypal"
              className="h-7 w-auto object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100 hover:scale-105"
            />
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
          <h1>Shopping Cart ({context?.cartData?.length})</h1>
          <IoCloseSharp
            className="text-[20px] cursor-pointer"
            onClick={context.toggleCartpanel(false)}
          />
        </div>

        {context?.cartData?.length !== 0 ? (
          <CartPanel data={context?.cartData} />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-50">
            <div className="flex flex-col items-center text-center p-6 max-w-sm">
              {/* Icon Container */}
              <div className="w-40 h-40 flex items-center justify-center rounded-full  mb-4">
                <img src="/empty-cart.png" alt="" />
              </div>

              {/* Title */}
              <h2 className="flex gap-3 items-center justify-center text-lg font-semibold text-gray-800">
                Your cart feels lonely
                <ShoppingCart className="w-5 h-5 text-gray-400" />
              </h2>

              {/* Subtitle */}
              <p className="text-sm text-gray-500 mt-2">
                Looks like you haven’t added anything yet. Start exploring and
                fill it up!
              </p>

              <Link to="/">
                <Button
                  variant="contained"
                  startIcon={<MdHome />}
                  sx={{
                    mt: 3,
                    px: 4,
                    py: 1.2,
                    borderRadius: "999px",
                    textTransform: "none",
                    fontWeight: 600,
                    background: "linear-gradient(135deg, #ff4d4d, #ff6a6a)",
                    color: "#fff",
                    boxShadow: "0 4px 14px rgba(255, 77, 77, 0.4)",
                    transition: "all 0.3s ease",

                    "&:hover": {
                      background: "linear-gradient(135deg, #e04343, #ff5252)",
                      boxShadow: "0 6px 18px rgba(255, 77, 77, 0.6)",
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
        )}
      </Drawer>

      <Dialog
        open={context?.openProductDetailsModal.open}
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        onClose={context?.handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailslModal"
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              className="w-10! h-10! min-w-10! rounded-full! text-black! absolute! top-0 right-0 bg-[#f1f1f1]!"
              onClick={context?.handleCloseProductDetailsModal}
            >
              <IoCloseSharp className="text-[20px] " />
            </Button>

            {context?.openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[40%]">
                  <ProductZoom
                    images={context?.openProductDetailsModal?.item?.images}
                  />
                </div>

                <div className="col2 w-[60%] py-8 px-8">
                  <ProductDetailsComponent
                    item={context?.openProductDetailsModal?.item}
                  />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </footer>
  );
};

export default Footer;
