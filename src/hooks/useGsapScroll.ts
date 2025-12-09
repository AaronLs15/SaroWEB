'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
}

export function useGsapScroll() {
    useEffect(() => {
        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);
}

/**
 * Fade in animation on scroll
 */
export function useFadeIn(selector: string, options = {}) {
    useEffect(() => {
        const elements = gsap.utils.toArray(selector);

        elements.forEach((element: any) => {
            gsap.fromTo(
                element,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: element,
                        start: 'top 80%',
                        end: 'top 50%',
                        toggleActions: 'play none none none',
                        ...options,
                    },
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [selector, options]);
}

/**
 * Stagger animation for multiple elements
 */
export function useStaggerAnimation(selector: string, options = {}) {
    useEffect(() => {
        const elements = gsap.utils.toArray(selector);

        if (elements.length === 0) return;

        gsap.fromTo(
            elements,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: elements[0] as gsap.DOMTarget,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    ...options,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, [selector, options]);
}

/**
 * Counter animation for numbers
 */
export function animateCounter(element: HTMLElement, endValue: number, duration = 2) {
    const obj = { value: 0 };

    gsap.to(obj, {
        value: endValue,
        duration,
        ease: 'power2.out',
        onUpdate: () => {
            element.textContent = Math.round(obj.value).toLocaleString('es-MX');
        },
    });
}
