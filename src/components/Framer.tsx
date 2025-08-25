import { PropsWithChildren } from "react";
import { motion } from "framer-motion";

const page = {
    initial: { opacity: 0 },   // fade content in on mount if you like
    animate: { opacity: 1 },
    exit: { opacity: 1 },   // keep content visible; black overlay handles the fade
};

const overlay = {
    initial: { opacity: 0 },
    animate: { opacity: 0 },   // invisible during normal life
    exit: { opacity: 1 },   // fade to black on exit
};

export function Page({ children }: PropsWithChildren) {
    return (
        <motion.main
            className="relative min-h-screen"   // relative so overlay can be absolute
            variants={page}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 0.35, ease: "easeInOut" }}
        >
            {children}

            {/* Black overlay that fades in only on exit */}
            <motion.div
                variants={overlay}
                className="pointer-events-none absolute inset-0 bg-black"
                transition={{ duration: 0.35, ease: "easeInOut" }}
            />
        </motion.main>
    );
}
