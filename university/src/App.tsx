import { useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Route, useLocation } from 'react-router-dom';
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AnimatedRoutes } from "@/components/AnimatedRoutes";
import { PageTransition } from "@/components/PageTransition";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CommandSearch from "@/components/CommandSearch";
import AskAiWidget from "@/components/AskAiWidget";
import SelectionImageLauncher from "@/components/SelectionImageLauncher";
import { AuthProvider } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import { SubjectProvider } from "@/lib/SubjectContext";
import { LocaleProvider } from "@/i18n/LocaleContext";
import Index from "./pages/Index";
import Courses from "./pages/Courses";
import CourseDetail from "./pages/CourseDetail";
import TopicDetail from "./pages/TopicDetail";
import Problems from "./pages/Problems";
import Formulas from "./pages/Formulas";
import Knowledge from "./pages/Knowledge";
import Tutor from "./pages/Tutor";
import Study from "./pages/Study";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import DevMode from "./pages/DevMode";
import Mistakes from "./pages/Mistakes";
// 论坛功能已关闭：Forum 组件不再挂载路由
// import Forum from "./pages/Forum";
import About from "./pages/About";
import Donate from "./pages/Donate";
import Custom from "./pages/Custom";
import NotFound from "./pages/NotFound";

/** 路由切换后滚动到顶部（或处理带 hash 的定位） */
const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }
    }
    window.scrollTo({ top: 0 });
  }, [pathname, hash]);
  return null;
};

/** 全局布局：导航栏 + 路由 + 页脚 + 命令面板 */
const Layout = () => {
  const [searchOpen, setSearchOpen] = useState(false);

  // ⌘K / Ctrl+K 打开搜索
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onOpenSearch={() => setSearchOpen(true)} />
      <ScrollToTop />
      <main className="flex-1">
        <AnimatedRoutes>
          <Route path="/" data-genie-title="Home Page" data-genie-key="Home" element={<PageTransition transition="slide-up"><Index /></PageTransition>} />
          <Route path="/courses" data-genie-key="Courses" data-genie-title="Courses" element={<PageTransition transition="slide-up"><Courses /></PageTransition>} />
          <Route path="/courses/:courseId" data-genie-key="CourseDetail" data-genie-title="Course Detail" element={<PageTransition transition="fade"><CourseDetail /></PageTransition>} />
          <Route path="/topics/:topicId" data-genie-key="TopicDetail" data-genie-title="Topic Detail" element={<PageTransition transition="fade"><TopicDetail /></PageTransition>} />
          <Route path="/problems" data-genie-key="Problems" data-genie-title="Problems" element={<PageTransition transition="slide-up"><Problems /></PageTransition>} />
          <Route path="/formulas" data-genie-key="Formulas" data-genie-title="Formulas" element={<PageTransition transition="slide-up"><Formulas /></PageTransition>} />
          <Route path="/knowledge" data-genie-key="Knowledge" data-genie-title="Knowledge Base" element={<PageTransition transition="slide-up"><Knowledge /></PageTransition>} />
          <Route path="/tutor" data-genie-key="Tutor" data-genie-title="AI Tutor" element={<PageTransition transition="fade"><Tutor /></PageTransition>} />
          <Route path="/study" data-genie-key="Study" data-genie-title="Study Archive" element={<PageTransition transition="fade"><Study /></PageTransition>} />
          <Route path="/login" data-genie-key="Login" data-genie-title="Login" element={<PageTransition transition="fade"><Login /></PageTransition>} />
          <Route path="/profile" data-genie-key="Profile" data-genie-title="Profile" element={<PageTransition transition="fade"><Profile /></PageTransition>} />
          <Route path="/mistakes" data-genie-key="Mistakes" data-genie-title="Mistake Book" element={<PageTransition transition="fade"><Mistakes /></PageTransition>} />
          {/* 论坛功能已关闭：移除 /forum 路由（页面组件保留，随时可恢复） */}
          <Route path="/dev" data-genie-key="DevMode" data-genie-title="Developer Mode" element={<PageTransition transition="fade"><DevMode /></PageTransition>} />
          <Route path="/about" data-genie-key="About" data-genie-title="About Developer" element={<PageTransition transition="fade"><About /></PageTransition>} />
          <Route path="/donate" data-genie-key="Donate" data-genie-title="Donate" element={<PageTransition transition="fade"><Donate /></PageTransition>} />
          <Route path="/custom" data-genie-key="Custom" data-genie-title="Custom Feature" element={<PageTransition transition="fade"><Custom /></PageTransition>} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" data-genie-key="NotFound" data-genie-title="Not Found" element={<PageTransition transition="fade"><NotFound /></PageTransition>} />
        </AnimatedRoutes>
      </main>
      <Footer />
      <CommandSearch open={searchOpen} onOpenChange={setSearchOpen} />
      <AskAiWidget />
      <SelectionImageLauncher />
    </div>
  );
};

/**
 * Configure TanStack Query client with optimized defaults
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Data considered fresh for 1 minute
      staleTime: 60 * 1000,
      // Cache data for 5 minutes
      gcTime: 5 * 60 * 1000,
      // Retry failed requests once
      retry: 1,
      // Don't refetch on window focus by default
      refetchOnWindowFocus: false,
      // Don't refetch on reconnect by default
      refetchOnReconnect: false,
    },
    mutations: {
      // Retry failed requests once
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          {/* basename 取构建 base：平台部署为 '/'，GitHub Pages 等子路径部署为 '/principia/' */}
          <BrowserRouter basename={import.meta.env.BASE_URL}>
            <AuthProvider>
              <SubjectProvider>
                <LocaleProvider>
                  <Layout />
                </LocaleProvider>
              </SubjectProvider>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App
