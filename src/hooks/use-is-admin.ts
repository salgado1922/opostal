import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

/** true só quando a sessão atual tem o papel admin (verificado no servidor). */
export function useIsAdmin(): boolean {
  const [admin, setAdmin] = useState(false);
  useEffect(() => {
    let alive = true;
    const check = async (uid?: string) => {
      if (!uid) return alive && setAdmin(false);
      const { data } = await supabase.rpc("has_role", { _user_id: uid, _role: "admin" });
      if (alive) setAdmin(!!data);
    };
    supabase.auth.getSession().then(({ data }) => check(data.session?.user.id));
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => { check(s?.user.id); });
    return () => { alive = false; sub.subscription.unsubscribe(); };
  }, []);
  return admin;
}
