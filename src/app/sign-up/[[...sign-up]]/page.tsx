"use client";

import { SignUp } from "@clerk/nextjs";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: 0,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="mt-[10rem] flex h-full w-full items-center justify-center"
    >
      <SignUp
        appearance={{
          elements: {
            rootBox: "shadow-md order border-neutral-950/50",
          },
        }}
        signInUrl="/sign-in"
      />
    </motion.div>
  );
}
