import { useEffect, useState, useCallback } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useServerFn } from "@tanstack/react-start";
import { getMyAccess } from "@/lib/entitlements.functions";

export type AccessState =
  | { signedIn: false }
  | {
      signedIn: true;
      userId: string;
      email: string | null;
      slugs: string[];
      credits: number;
      displayName: string | null;
    };

export function useSession() {
  const [sessionLoaded, setSessionLoaded] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const qc = useQueryClient();

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      setHasSession(!!data.session);
      setSessionLoaded(true);
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
      setHasSession(!!session);
      qc.invalidateQueries({ queryKey: ["my-access"] });
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, [qc]);

  return { sessionLoaded, hasSession };
}

export function useMyAccess() {
  const { sessionLoaded, hasSession } = useSession();
  const fetchAccess = useServerFn(getMyAccess);
  const query = useQuery({
    queryKey: ["my-access", hasSession],
    queryFn: async (): Promise<AccessState> => {
      const r = await fetchAccess();
      return r as AccessState;
    },
    enabled: sessionLoaded,
    staleTime: 30_000,
  });
  return { ...query, sessionLoaded };
}

export function useSignOut() {
  const qc = useQueryClient();
  return useCallback(async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
  }, [qc]);
}

export function useHasGuideAccess(slug: string) {
  const { data, isLoading, sessionLoaded } = useMyAccess();
  const ready = sessionLoaded && !isLoading;
  const hasAccess = !!(data && data.signedIn && data.slugs.includes(slug));
  return { ready, hasAccess, data };
}