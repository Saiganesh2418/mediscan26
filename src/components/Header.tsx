import { Shield } from "lucide-react";
import logo from "@/assets/logo.png";

const Header = () => {
  return (
    <header className="relative flex flex-col items-center pt-12 pb-4 px-6">
      {/* Logo + Title row */}
      <div className="relative flex items-center gap-4 mb-4 animate-fade-in-up">
        <img
          src={logo}
          alt="MediScan logo"
          width={80}
          height={80}
          className="w-20 h-20 drop-shadow-[0_8px_24px_rgba(13,148,136,0.35)]"
        />

        <div>
          <h1 className="text-5xl font-extrabold leading-none tracking-tight">
            <span className="text-gradient">Medi</span>
            <span className="text-foreground">Scan</span>
          </h1>
          <p className="text-[11px] font-semibold text-primary-muted tracking-[0.25em] uppercase mt-1.5">
            AI-Powered Scanner
          </p>
        </div>
      </div>

      {/* Trusted glass pill */}
      <div
        className="glass rounded-full px-4 py-1.5 inline-flex items-center gap-1.5 mb-5 animate-fade-in-up"
        style={{ animationDelay: "100ms" }}
      >
        <Shield className="w-3.5 h-3.5 text-primary" strokeWidth={2.5} />
        <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-primary">Trusted</span>
      </div>

      {/* Tagline glass card */}
      <div
        className="w-full max-w-md glass rounded-3xl py-5 px-6 text-center animate-fade-in-up"
        style={{ animationDelay: "150ms" }}
      >
        <p className="text-foreground/80 text-base leading-relaxed font-medium">
          Instantly identify medicines with<br />AI-powered analysis
        </p>
      </div>
    </header>
  );
};

export default Header;
