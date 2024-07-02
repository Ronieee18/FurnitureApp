import React, { useEffect, useState } from "react";
import {
  Navbar,
  Collapse,
  Typography,
  Button,
  IconButton,
  List,
  ListItem,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Input,
} from "@material-tailwind/react";
import {
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon
} from "@heroicons/react/24/outline";
import {
  Bars4Icon,
  GlobeAmericasIcon,
  NewspaperIcon,
  PhoneIcon,
  RectangleGroupIcon,
  SquaresPlusIcon,
  SunIcon,
  TagIcon,
  UserGroupIcon,
} from "@heroicons/react/24/solid";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearUser } from './store/authSlice';

const navListMenuItems = [
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: SquaresPlusIcon,
  },
  {
    title: "About Us",
    description: "Meet and learn about our dedication",
    icon: UserGroupIcon,
  },
  {
    title: "Blog",
    description: "Find the perfect solution for your needs.",
    icon: Bars4Icon,
  },
  {
    title: "Services",
    description: "Learn how we can help you achieve your goals.",
    icon: SunIcon,
  },
  {
    title: "Support",
    description: "Reach out to us for assistance or inquiries",
    icon: GlobeAmericasIcon,
  },
  {
    title: "Contact",
    description: "Find the perfect solution for your needs.",
    icon: PhoneIcon,
  },
  {
    title: "News",
    description: "Read insightful articles, tips, and expert opinions.",
    icon: NewspaperIcon,
  },
  {
    title: "Products",
    description: "Find the perfect solution for your needs.",
    icon: RectangleGroupIcon,
  },
  {
    title: "Special Offers",
    description: "Explore limited-time deals and bundles",
    icon: TagIcon,
  },
];

function NavListMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const renderItems = navListMenuItems.map(
    ({ icon, title, description }, key) => (
      <a href="#" key={key}>
        <MenuItem className="flex items-center gap-3 rounded-lg">
          <div className="flex items-center justify-center rounded-lg !bg-blue-gray-50 p-2">
            {React.createElement(icon, {
              strokeWidth: 2,
              className: "h-6 w-6 text-gray-900",
            })}
          </div>
          <div>
            <Typography
              variant="h6"
              color="blue-gray"
              className="flex items-center text-sm font-bold text-black"
            >
              {title}
            </Typography>
            <Typography
              variant="paragraph"
              className="text-xs !font-medium text-blue-gray-500"
            >
              {description}
            </Typography>
          </div>
        </MenuItem>
      </a>
    ),
  );

  return (
    <React.Fragment>
      <Menu
        open={isMenuOpen}
        handler={setIsMenuOpen}
        offset={{ mainAxis: 20 }}
        placement="bottom"
        allowHover={true}
      >
        <MenuHandler>
          <Typography as="div" variant="small" className="font-medium text-black">
            <ListItem
              className="flex items-center gap-2 py-2 pr-4 font-medium text-black"
              selected={isMenuOpen || isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen((cur) => !cur)}
            >
              Resources
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`hidden h-3 w-3 transition-transform lg:block ${
                  isMenuOpen ? "rotate-180" : ""
                }`}
              />
              <ChevronDownIcon
                strokeWidth={2.5}
                className={`block h-3 w-3 transition-transform lg:hidden ${
                  isMobileMenuOpen ? "rotate-180" : ""
                }`}
              />
            </ListItem>
          </Typography>
        </MenuHandler>
        <MenuList className="hidden max-w-screen-xl rounded-xl lg:block">
          <ul className="grid grid-cols-3 gap-y-2 outline-none outline-0">
            {renderItems}
          </ul>
        </MenuList>
      </Menu>
      <div className="block lg:hidden">
        <Collapse open={isMobileMenuOpen}>{renderItems}</Collapse>
      </div>
    </React.Fragment>
  );
}

function NavList() {
  return (
    <List className="mt-4 mb-6 p-0 lg:mt-0 lg:mb-0 lg:flex-row lg:p-1">
      <Typography
        as="a"
        href="#"
        variant="small"
        className="font-medium text-black"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 text-black">Home</ListItem>
      </Typography>
      <NavListMenu />
      <Typography
        as="a"
        href="#"
        variant="small"
        className="font-medium text-black"
      >
        <ListItem className="flex items-center gap-2 py-2 pr-4 text-black">
          Contact Us
        </ListItem>
      </Typography>
    </List>
  );
}

export default function NavbarWithMegaMenu() {
  const [openNav, setOpenNav] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const checkIsAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const handleLogout = async () => {
    try {
      const res = await axios.get("/auth/logout");
      console.log(res);
      dispatch(clearUser());
      localStorage.removeItem('state');
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className="mx-auto w-full px-4 py-4 my-4 bg-white">
      <div className="flex items-center justify-between text-black">
        <Typography
          as="a"
          href="#"
          variant="h6"
          className="mr-4 cursor-pointer py-1.5 lg:ml-2 text-black"
        >
         CozyRentals
        </Typography>
        <div className="hidden lg:block">
          
        </div>
        <div className="relative flex w-full gap-2 md:w-max">
          <Input
            type="search"
            color="black"
            label="Search for Products..."
            className="pr-20"
            containerProps={{
              className: "min-w-[288px]",
            }}
          />
           <Button
            size="sm"
            color="white"
            className="!absolute right-1 top-1 rounded"
          >
            Search
          </Button>
        </div>
        <IconButton variant="text" size="sm" color="blue-gray" className="ml-3">
            <ShoppingCartIcon className="h-6 w-6 text-black" />
          </IconButton>
        <div className="hidden gap-2 lg:flex">
          {!checkIsAuthenticated && (
            <Button variant="text" size="sm" color="blue-gray" onClick={() => navigate('/login')}>
              Log In
            </Button>
          )}
          {checkIsAuthenticated && (
            <>
              <Button variant="gradient" size="sm" onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button variant="gradient" size="sm" onClick={handleLogout}>
                Log Out
              </Button>
            </>
          )}
        </div>
        <IconButton
          variant="text"
          color="blue-gray"
          className="lg:hidden"
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6 text-black" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6 text-black" strokeWidth={2} />
          )}
        </IconButton>
      </div>
     
      <Collapse open={openNav}>
        <NavList />
        <div className="flex w-full flex-nowrap items-center gap-2 lg:hidden">
          {!checkIsAuthenticated && (
            <>
              <Button variant="outlined" size="sm" color="blue-gray" fullWidth onClick={() => navigate('/login')}>
                Log In
              </Button>
              <Button variant="gradient" size="sm" fullWidth onClick={() => navigate('/signin')}>
                Sign In
              </Button>
            </>
          )}
          {checkIsAuthenticated && (
            <>
              <Button variant="outlined" size="sm" color="blue-gray" fullWidth onClick={() => navigate('/profile')}>
                Profile
              </Button>
              <Button variant="gradient" size="sm" fullWidth onClick={handleLogout}>
                Log Out
              </Button>
            </>
          )}
        </div>
      </Collapse>
    </Navbar>
  );
}