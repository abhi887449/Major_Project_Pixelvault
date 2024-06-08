import React, { useEffect, useRef, useState } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarMenuToggle,
  NavbarMenuItem,
  NavbarMenu,
  NavbarContent,
  NavbarItem,
  Link,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  Image,
} from "@nextui-org/react";
import { ConnectWallet, useConnectionStatus } from "@thirdweb-dev/react";
import { usePathname } from "next/navigation";
import { useAddress } from "@thirdweb-dev/react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NFT_CONTRACT_ADDRESS } from "../const/addresses";

const PixelvaultNavbar = () => {
  const pathname = usePathname();
  const address = useAddress();
  const addressref = useRef(false);
  const connectionStatus = useConnectionStatus();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const menuItems = ["NFTs Collections", "Sell NFTs"];
  const [userData,setUserData]= useState(null)
  const fetchuserdataonly = async()=>{
     try {
      const url = `http://localhost:3000/api/fetchUserData`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
        }),
      });
      const json = await response.json();
      if (json.user?.address) {
        setUserData(json.user)
      }
     } catch (error) {
      
     }
  }
  const createUserAndFetchData = async () => {
    try {
      const url = `http://localhost:3000/api/fetchUserData`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          address: address,
        }),
      });
      const json = await response.json();
      if (json.user?.address) {
        setUserData(json.user)
        toast.success(`Welcome ${json.user.Name}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
          transition: Bounce,
        });
      } else {
        const url = `http://localhost:3000/api/updateUserData`;
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            address: address,
            Name: "User",
            Email: "",
            ProfileImage: "",
            Username: "",
            SocialLinks: {Instagram:"",Linkedin:"",Facebook:""},
          }),
        });
        const json = await response.json();
        if(json?.success){
          toast.success("Account created successfully. Welcome!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
        else{
          toast.error("Something went wrong. Please disconnect wallet and connect again", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
          });
        }
      }
    } catch (error) {
      toast.error("Something went wrong. Please disconnect wallet and connect again", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
    }
  };
  useEffect(() => {
    if(connectionStatus === "connected" && pathname ==="/"){
      if (addressref.current === false) {
        createUserAndFetchData();
        return () => {
          addressref.current = true;
        };
      }
    }
    else if(connectionStatus === "connected" && !(pathname ==="/")){
        fetchuserdataonly();
    }
  }, [addressref,connectionStatus]);
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
      <Navbar
        isMenuOpen={isMenuOpen}
        onMenuOpenChange={setIsMenuOpen}
        className="p-2 !bg-transparent"
        maxWidth="full"
      >
        <NavbarContent className="md:hidden" justify="start">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarContent className="md:hidden pr-3" justify="start">
          <NavbarBrand>
          <Link href="/">
            <Image
              width={100}
              src="\images\pixelvaultlogo.png"
              alt="NextUI Album Cover"
              className="m-5"
            />
            </Link>
          </NavbarBrand>
        </NavbarContent>

        <NavbarContent className="hidden md:flex gap-4 " justify="start">
          <NavbarBrand>
            <Link href="/">
              <Image
                width={100}
                src="\images\pixelvaultlogo.png"
                alt="NextUI Album Cover"
                className="m-5"
              />
            </Link>
          </NavbarBrand>
          <NavbarItem isActive={(pathname==="/nftcollections")  ? true : false}>
            <Link
              className={`text-lg hover:text-success ml-0 mr-10 ${pathname === `/nftcollections/${NFT_CONTRACT_ADDRESS}` ? "underline underline-offset-8" : ""}`}
              color={`${pathname === `/nftcollections/${NFT_CONTRACT_ADDRESS}` ? "success" : "foreground"}`}
              href={`/nftcollections/${NFT_CONTRACT_ADDRESS}`}
            >
              NFTS COLLECTION
            </Link>
          </NavbarItem>
          <NavbarItem isActive={(pathname==="/listednfts")  ? true : false}>
            <Link
              className={`text-lg hover:text-success ml-0 mr-10 ${pathname === `/listednfts` ? "underline underline-offset-8" : ""}`}
              color={`${pathname === "/listednfts" ? "success" : "foreground"}`}
              href={`/listednfts`}
            >
              LISTED NFTS
            </Link>
          </NavbarItem>
          <NavbarItem isActive={(pathname==="/nftcollections")  ? true : false}>
            <Link
              className={`text-lg hover:text-success ml-0 mr-10 ${pathname === `/user/nfts` ? "underline underline-offset-8" : ""}`}
              color={`${pathname === "/user/nfts" ? "success" : "foreground"}`}
              href={`/user/nfts`}
            >
              MINT NFTS
            </Link>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          {address ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-transform"
                  color="secondary"
                  name="Jason Hughes"
                  size="md"
                  src={
                    userData && !(userData["ProfileImage"] === "")
                      ? userData["ProfileImage"]
                      : "/images/pixelvaultlogo.png"
                  }
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Signed in as</p>
                  <p className="font-semibold text-secondary text-[10px]">{address}</p>
                </DropdownItem>
                <DropdownItem key="settings"><Link href="/user/profile" className={`${(pathname==="/user/profile")? "text-success":"text-white"}`}>My Profile</Link></DropdownItem>
                <DropdownItem key="team_settings"><Link href="/user/nfts" className={`${(pathname==="/user/nfts")? "text-success":"text-white"}`}>My NFTs</Link></DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <></>
          )}

          <NavbarItem className="lg:flex">
            <ConnectWallet className={`${(address)? "!border-none !bg-transparent":"!h-10"}`}/>
          </NavbarItem>
        </NavbarContent>

        <NavbarMenu>
          {menuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                className="w-full"
                color={
                  index === 2
                    ? "warning"
                    : index === menuItems.length - 1
                    ? "danger"
                    : "foreground"
                }
                href="#"
                size="lg"
              >
                {item}
              </Link>
            </NavbarMenuItem>
          ))}
        </NavbarMenu>
      </Navbar>
    </>
  );
};

export default PixelvaultNavbar;
