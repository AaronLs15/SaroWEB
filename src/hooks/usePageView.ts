import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export function usePageView() {
    const pathname = usePathname();

    useEffect(() => {
        const trackView = async () => {
            try {
                // Get current user if exists
                const { data: { session } } = await supabase.auth.getSession();

                // Handle anonymous ID
                let anonymousId = localStorage.getItem('saro_anonymous_id');
                if (!anonymousId) {
                    anonymousId = crypto.randomUUID();
                    localStorage.setItem('saro_anonymous_id', anonymousId);
                }

                // Check for existing view in the last 5 minutes to avoid unnecessary inserts
                const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString();

                const { data: existingView, error: selectError } = await supabase
                    .from('page_views')
                    .select('id')
                    .eq('path', pathname)
                    .eq('anonymous_id', anonymousId)
                    .gte('created_at', fiveMinutesAgo)
                    .maybeSingle();

                // Only insert if no recent view exists
                if (!existingView && !selectError) {
                    const { error: insertError } = await supabase.from('page_views').insert({
                        path: pathname,
                        anonymous_id: anonymousId,
                        ua: navigator.userAgent,
                    });

                    // Silently ignore duplicate key violations (23505) from database constraint
                    if (insertError && insertError.code !== '23505') {
                        console.error('Error tracking page view:', insertError);
                    }
                }
            } catch (error) {
                // Silently fail to not disrupt user experience
                console.error('Error tracking page view:', error);
            }
        };

        trackView();
    }, [pathname]);
}
