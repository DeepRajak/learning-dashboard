"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  BookOpen,
  BarChart2,
  Trophy,
  Settings,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
  Bell,
  X,
  Menu,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Courses",   icon: BookOpen },
  { label: "Analytics", icon: BarChart2 },
  { label: "Achievements", icon: Trophy },
  { label: "Notifications", icon: Bell },
  { label: "Settings",  icon: Settings },
];

const EXPANDED  = 220;
const COLLAPSED = 64;

// (48px collapsed - 17px icon) / 2 = 15.5 → 15 left, 16 right to hit true center
const BTN_PAD_COLLAPSED = { paddingLeft: 15, paddingRight: 16 };
const BTN_PAD_EXPANDED  = { paddingLeft: 12, paddingRight: 12 };

const SPRING = { type: "spring" as const, stiffness: 260, damping: 28 };

export default function Sidebar() {
  const [collapsed, setCollapsed]   = useState(false);
  const [activeItem, setActiveItem] = useState("Dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 1023px)");
    const handle = (e: MediaQueryListEvent | MediaQueryList) => setCollapsed(e.matches);
    handle(mq);
    mq.addEventListener("change", handle);
    return () => mq.removeEventListener("change", handle);
  }, []);

  return (
    <>
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed left-4 top-4 z-50 flex h-9 w-9 items-center justify-center rounded-xl border border-white/8 bg-[#0d1117] text-slate-400 md:hidden"
        aria-label="Open navigation"
      >
        <Menu size={16} />
      </button>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }}
            transition={{ type: "spring", stiffness: 320, damping: 32 }}
            className="fixed left-0 top-0 z-50 flex h-full w-60 flex-col border-r border-white/7 bg-[#0a0e14] md:hidden"
            aria-label="Mobile navigation"
          >
            <div className="flex h-14 items-center justify-between border-b border-white/5 px-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
                  <GraduationCap size={14} className="text-white" />
                </div>
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-100">
                  LearnOS
                </span>
              </div>
              <button onClick={() => setMobileOpen(false)} className="text-slate-500 hover:text-slate-300" aria-label="Close">
                <X size={16} />
              </button>
            </div>
            <NavList items={NAV_ITEMS} activeItem={activeItem} collapsed={false}
              setActiveItem={(l) => { setActiveItem(l); setMobileOpen(false); }} />
          </motion.nav>
        )}
      </AnimatePresence>

      <motion.nav
        animate={{ width: collapsed ? COLLAPSED : EXPANDED }}
        transition={SPRING}
        className="relative hidden shrink-0 flex-col border-r border-white/7 bg-[#0a0e14] md:flex"
        style={{ willChange: "width", overflow: "hidden" }}
        aria-label="Main navigation"
      >
        <div className="flex h-14 shrink-0 items-center gap-3 overflow-hidden border-b border-white/5 px-4">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-indigo-600">
            <GraduationCap size={14} className="text-white" />
          </div>
          <motion.span
            animate={{ opacity: collapsed ? 0 : 1 }}
            transition={{ duration: 0.1, delay: collapsed ? 0 : 0.12 }}
            className="whitespace-nowrap text-sm font-semibold tracking-tight text-slate-100"
          >
            LearnOS
          </motion.span>
        </div>

        <NavList
          items={NAV_ITEMS}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          collapsed={collapsed}
        />

        <div className="shrink-0 overflow-hidden border-t border-white/5 p-2">
          <motion.button
            onClick={() => setCollapsed((c) => !c)}
            animate={collapsed ? BTN_PAD_COLLAPSED : BTN_PAD_EXPANDED}
            transition={SPRING}
            className="relative flex w-full items-center rounded-lg py-2 text-slate-500 transition-colors hover:bg-white/5 hover:text-slate-300"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <span className="shrink-0">
              {collapsed ? <ChevronRight size={15} /> : <ChevronLeft size={15} />}
            </span>
            <motion.span
              initial={{ opacity: 1, marginLeft: 8, maxWidth: 120 }}
              animate={{
                opacity:   collapsed ? 0 : 1,
                marginLeft: collapsed ? 0 : 8,
                maxWidth:  collapsed ? 0 : 120,
              }}
              transition={{ duration: 0.1, delay: collapsed ? 0 : 0.12 }}
              className="overflow-hidden whitespace-nowrap text-xs"
            >
              Collapse
            </motion.span>
          </motion.button>
        </div>
      </motion.nav>

      <nav
        className="fixed bottom-0 left-0 right-0 z-40 flex items-center justify-around border-t border-white/7 bg-[#0a0e14]/95 px-1 py-2 backdrop-blur-xl md:hidden"
        aria-label="Bottom navigation"
      >
        {NAV_ITEMS.slice(0, 5).map(({ label, icon: Icon }) => {
          const isActive = activeItem === label;
          return (
            <button
              key={label}
              onClick={() => setActiveItem(label)}
              className="relative flex flex-col items-center gap-0.5 px-3 py-1"
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
            >
              {isActive && (
                <motion.span
                  layoutId="bottom-highlight"
                  className="absolute inset-0 rounded-xl bg-indigo-500/12"
                  transition={SPRING}
                />
              )}
              <Icon size={17} className={`relative ${isActive ? "text-indigo-400" : "text-slate-500"}`} />
              <span className={`relative text-[9px] font-medium ${isActive ? "text-indigo-400" : "text-slate-600"}`}>
                {label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}

function NavList({
  items, activeItem, setActiveItem, collapsed,
}: {
  items: typeof NAV_ITEMS;
  activeItem: string;
  setActiveItem: (label: string) => void;
  collapsed: boolean;
}) {
  return (
    <ul className="flex flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden px-2 py-3">
      {items.map(({ label, icon: Icon }) => {
        const isActive = activeItem === label;
        return (
          <li key={label}>
            {/* padding animates with the same spring as the sidebar width so the icon stays centered during collapse */}
            <motion.button
              onClick={() => setActiveItem(label)}
              animate={collapsed ? BTN_PAD_COLLAPSED : BTN_PAD_EXPANDED}
              transition={SPRING}
              aria-current={isActive ? "page" : undefined}
              className="relative flex w-full items-center rounded-lg py-2.5 text-left"
            >
              {isActive && (
                <motion.span
                  layoutId="sidebar-highlight"
                  className="absolute inset-0 rounded-lg bg-indigo-500/12 ring-1 ring-indigo-500/20"
                  transition={SPRING}
                />
              )}

              <Icon
                size={17}
                className={`relative shrink-0 transition-colors duration-150 ${
                  isActive ? "text-indigo-400" : "text-slate-500"
                }`}
              />

              {/* opacity/marginLeft/maxWidth keep the icon position stable — no layout recalc on the icon during spring */}
              <motion.span
                initial={{ opacity: 1, marginLeft: 12, maxWidth: 180 }}
                animate={{
                  opacity:    collapsed ? 0 : 1,
                  marginLeft: collapsed ? 0 : 12,
                  maxWidth:   collapsed ? 0 : 180,
                }}
                transition={{ duration: 0.1, delay: collapsed ? 0 : 0.12 }}
                className={`relative overflow-hidden whitespace-nowrap text-sm ${
                  isActive ? "font-medium text-slate-100" : "text-slate-400"
                }`}
              >
                {label}
              </motion.span>
            </motion.button>
          </li>
        );
      })}
    </ul>
  );
}
