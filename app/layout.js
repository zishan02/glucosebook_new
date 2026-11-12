import "./globals.css";
import "@/styles/_user.scss";
import { ThemeProvider } from "@/widgets/theme-provider";
import { TooltipProvider } from "@/widgets/ui/tooltip";

export const metadata = {
  title: "Glucosebook Clinical Dashboard",
  description: "A focused workspace for proactive glucose care.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
