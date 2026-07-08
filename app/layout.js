import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";
import { Mail } from "lucide-react";

import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MargAI",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }}>
      <html
        lang="en"
        suppressHydrationWarning
        className={inter.className}
      >
        <body className="min-h-full flex flex-col">
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            <main className="min-h-screen">{children}</main>

            <Toaster richColors />

         <footer className="mt-auto border-t border-zinc-800 bg-zinc-950/90 backdrop-blur">
  <div className="container mx-auto px-6 py-14">
    <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
      {/* Left */}
      <div className="space-y-4">
        <h3 className="bg-gradient-to-r from-white via-zinc-100 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent">
          MargAI
        </h3>

        <p className="max-w-md text-sm leading-7 text-zinc-400">
          Your AI Career Coach built to help students and professionals prepare
          for interviews, optimize resumes, gain industry insights, and grow
          their careers with personalized AI-powered guidance.
        </p>
      </div>

      {/* Center */}
      <div className="flex flex-col items-center justify-center">
        <h4 className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-zinc-500">
          Quick Links
        </h4>

        <div className="flex flex-col items-center gap-4 text-sm font-medium">
          <a
            href="/dashboard"
            className="transition-colors text-zinc-400 hover:text-white"
          >
            Dashboard
          </a>

          <a
            href="/resume"
            className="transition-colors text-zinc-400 hover:text-white"
          >
            Resume Builder
          </a>

          <a
            href="/interview"
            className="transition-colors text-zinc-400 hover:text-white"
          >
            Mock Interview
          </a>

          <a
            href="/dashboard"
            className="transition-colors text-zinc-400 hover:text-white"
          >
            Industry Insights
          </a>
        </div>
      </div>

      {/* Right */}
      <div className="flex flex-col items-end justify-center">
        <p className="text-xs font-medium uppercase tracking-[0.3em] text-zinc-500">
          DESIGNED • DEVELOPED • DEPLOYED BY
        </p>

        <h3 className="mt-3 bg-gradient-to-r from-white via-zinc-100 to-blue-400 bg-clip-text text-3xl font-extrabold text-transparent">
          Vishal Srivastava
        </h3>

        <p className="mt-2 text-sm text-zinc-400">
          Full Stack Developer • AI Enthusiast
        </p>

        <div className="mt-4 inline-flex items-center rounded-full border border-zinc-800 bg-zinc-900 px-4 py-2">
          <span className="mr-2 h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400"></span>
          <span className="text-xs font-medium text-zinc-300">
            Open to Software Engineering Opportunities
          </span>
        </div>

        {/* Social Links */}
        <div className="mt-6 flex items-center gap-4">
          <a
            href="https://github.com/vishal290704"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-white transition-all duration-200 hover:-translate-y-1 hover:border-white hover:bg-zinc-800"
          >
            <FaGithub className="h-5 w-5" />
          </a>

          <a
            href="https://www.linkedin.com/in/vishal290704/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-[#0A66C2] transition-all duration-200 hover:-translate-y-1 hover:border-[#0A66C2] hover:bg-zinc-800"
          >
            <FaLinkedin className="h-5 w-5" />
          </a>

          <a
            href="mailto:vsjee2002@gmail.com"
            aria-label="Email"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-red-400 transition-all duration-200 hover:-translate-y-1 hover:border-red-400 hover:bg-zinc-800"
          >
            <Mail className="h-5 w-5" />
          </a>

          <a
            href="https://wa.me/919621281471"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-[#25D366] transition-all duration-200 hover:-translate-y-1 hover:border-[#25D366] hover:bg-zinc-800"
          >
            <FaWhatsapp className="h-5 w-5" />
          </a>
        </div>
      </div>
    </div>

    <div className="mt-12 border-t border-zinc-800 pt-6">
      <div className="flex flex-col items-center justify-between gap-3 text-sm text-zinc-500 md:flex-row">
        <p>© {new Date().getFullYear()} MargAI. All rights reserved.</p>

        <p className="text-center md:text-right">
          Built with ❤️ using{" "}
          <span className="font-medium text-zinc-300">Next.js</span>,
          <span className="font-medium text-zinc-300"> Clerk</span>,
          <span className="font-medium text-zinc-300"> Prisma</span> &
          <span className="font-medium text-zinc-300"> Gemini AI</span>.
        </p>
      </div>
    </div>
  </div>
</footer>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}