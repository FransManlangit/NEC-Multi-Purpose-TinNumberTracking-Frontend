
import { Menu, MenuButton, MenuItem, MenuItems, Transition } from "@headlessui/react";
// import { ArrowLeftOnRectangleIcon, ChevronDownIcon } from '@heroicons/react/24/solid';
import { UploadOutlined } from "@ant-design/icons";
import { IoIosPeople } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { Button, AutoComplete, Avatar, Input, message, Badge } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { Logout } from "../../actions/userActions";
import {
  ArrowLeftStartOnRectangleIcon,
  ChevronDownIcon,
  UserIcon,
} from "@heroicons/react/16/solid";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, loading, isLogout } = useSelector((state) => state.auth);


  useEffect(() => {
    if (isLogout) {
      message.success("Logout Successfully");
    }
  }, [dispatch, isLogout]);

  const logoutHandler = () => {
    dispatch(Logout());
    navigate("/home");
  };
  return (
    <nav className="flex items-center justify-between flex-wrap py-3 container mx-auto">
      <a className="flex flex-col" href="/">
        <div className="flex flex-row items-center flex-shrink-0 gap-2">
          <img src="/images/NecLogo.jpg" alt="Nec Logo" className="h-24 w-24" />
          <div className="flex flex-col">
            <span className="font-extrabold text-3xl tracking-normal">
              <p>
                <span className="text-[#9E2C6A]">Nec Multi-Purpose</span>
              </p>
            </span>
            <span className="text-sm font-medium">
              “Strengthening Resilience for a Brighter Future”
            </span>
          </div>
        </div>
      </a>

      <div className="flex flex-row space-x-8 items-center">
        <div>
          <a className="" href="/">
            Home
          </a>
        </div>
        <div>
          <a className="" href="">
           Products & Services
          </a>
        </div>
        <div>
          <a className="" href="/client-list">
            FAQs
          </a>
        </div>
        <div>
          <a className="" href="/about-us">
            About Us
          </a>
        </div>

        <div className="flex flex-row space-x-4 items-center">
        {/* <a className="bg-green-100 rounded-full p-3 flex justify-center hover:scale-110 ease-in-out duration-300 ">
          <FaCartShopping size={14} color="#22c55e" />
        </a> */}

        <a
          className="relative inline-block  hover:scale-110 ease-in-out duration-300"
          href="/cart"
        >
          {/* <a className="bg-green-100 rounded-full p-3 flex justify-center">
            <FaCartShopping size={14} color="#22c55e" />
          </a> */}

        </a>
        {/* 
        <Badge count={1}>
          <Avatar
            size="large"
            shape="square"
            icon={<FaCartShopping size={14} color="#22c55e" />}
            style={{ backgroundColor: "#dcfce7", color: "#fff" }}
          />
        </Badge> */}
        <div>
          {/* <Button
            size="large"
            style={{ backgroundColor: "#38a169", color: "#fff" }}
          >
            Login
          </Button> */}

          {user ? (
            <Menu>
              <MenuButton className="inline-flex items-center gap-2 rounded-full bg-[#1E4BCA] py-1.5 px-3 text-sm font-semibold text-white shadow-inner shadow-white/10 focus:outline-none hover:bg-[#1E4BCA] open:bg--500/90 focus:outline-white">
                {user?.avatar?.url ? (
                  <img
                    src={user?.avatar?.url}
                    alt="SariSariCart Logo"
                    className="h-8 w-8 rounded-full"
                  />
                ) : (
                  <UserIcon className="w-8 h-8 p-1" />
                )}

                <span>{user.name}</span>
                <ChevronDownIcon className="w-4 h-4 fill-white/60" />
              </MenuButton>
              <Transition
                enter="transition ease-out duration-75"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <MenuItems
                  anchor="bottom end"
                  className="w-52 origin-top-right rounded-xl bg-[#1E4BCA]/90 p-1 text-sm text-white focus:outline-none mt-1 space-y-1"
                >
                  <MenuItem>
                    <a
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10"
                      href="/profile"
                    >
                      <UserIcon className="w-6 h-6 fill-white/60" />
                      Profile
                    </a>
                  </MenuItem>
                  <MenuItem>
                    <button className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10">
                      <IoIosPeople className="w-6 h-6 fill-white/60" />
                     Member List
                    </button>
                  </MenuItem>
                  <div className="my-1 h-px bg-white/5" />
                  <MenuItem>
                    <button
                      className="group flex w-full items-center gap-2 rounded-lg py-1.5 px-3 focus:bg-white/10"
                      onClick={() => logoutHandler()}
                    >
                      <ArrowLeftStartOnRectangleIcon className="w-6 h-6 fill-white/60" />
                      Logout
                    </button>
                  </MenuItem>
                </MenuItems>
              </Transition>
            </Menu>
          ) : (
            <Button size="large" type="primary" href="/login" shape="round">
              Login
            </Button>
          )}
        </div>
        </div>
      </div>
    </nav>
  );
}
