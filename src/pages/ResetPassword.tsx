import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Lock, Loader2, Eye, EyeOff } from "lucide-react";
import logo from "@/assets/logo.png";

const PASSWORD_RULE = /^(?=.*[A-Za-z])(?=.*\d)(?=.*@).{8,}$/;
const PASSWORD_HINT = "Min 8 characters with a letter, number and @ symbol";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [ready, setReady] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!PASSWORD_RULE.test(password)) {
      toast({ title: "Weak password", description: PASSWORD_HINT + ".", variant: "destructive" });
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      toast({ title: "Password updated", description: "You can now sign in." });
      await supabase.auth.signOut();
      navigate("/login", { replace: true });
    } catch (err: any) {
      toast({ title: "Failed", description: err?.message, variant: "destructive" });
    } finally {
      setBusy(false);
    }
  };

  const valid = PASSWORD_RULE.test(password);

  return (
    <div className="min-h-screen flex items-center justify-center px-5 py-10 bg-gradient-to-br from-primary/10 via-background to-primary-glow/10">
      <div className="w-full max-w-md glass-strong rounded-[28px] p-7 shadow-float animate-fade-in-up">
        <div className="flex flex-col items-center mb-5">
          <img src={logo} alt="MediScan logo" width={64} height={64} className="w-16 h-16 mb-3 drop-shadow-[0_8px_24px_rgba(13,148,136,0.35)]" />
          <h1 className="text-2xl font-extrabold tracking-tight">Set new password</h1>
          <p className="text-sm text-muted-foreground mt-1 text-center">
            {ready ? "Enter your new password below." : "Verifying reset link..."}
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="glass rounded-2xl px-4 py-3 flex items-center gap-2">
            <Lock className="w-4 h-4 text-primary" strokeWidth={2.4} />
            <input
              type={showPassword ? "text" : "password"}
              required
              minLength={8}
              pattern="(?=.*[A-Za-z])(?=.*\d)(?=.*@).{8,}"
              title={PASSWORD_HINT}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="flex-1 bg-transparent outline-none text-sm font-medium"
            />
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className="w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:text-primary"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          <p className={`text-[11px] font-medium px-1 ${valid ? "text-success" : "text-muted-foreground"}`}>
            {valid ? "✓ Strong password" : PASSWORD_HINT}
          </p>
          <button
            type="submit"
            disabled={busy || !ready}
            className="glossy w-full rounded-full py-3.5 font-bold text-white shadow-glow active:scale-[0.97] transition disabled:opacity-60 flex items-center justify-center gap-2"
            style={{ background: "var(--gradient-primary)" }}
          >
            {busy && <Loader2 className="w-4 h-4 animate-spin" />}
            Update password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
