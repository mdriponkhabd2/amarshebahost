
"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/sections/Footer";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query } from "firebase/firestore";

export default function RefundPolicy() {
  const db = useFirestore();
  const contentQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "websiteContentBlocks"));
  }, [db]);

  const { data: blocks } = useCollection(contentQuery);
  const content = blocks?.find(b => b.id === "refund_policy_content")?.value || "Refund Policy content coming soon...";

  return (
    <main className="min-h-screen">
      <Navbar />
      <div className="pt-32 pb-20 px-6 max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gradient">Refund Policy</h1>
        <div className="prose prose-blue max-w-none bg-white p-8 rounded-[2rem] shadow-sm border whitespace-pre-line">
          {content}
        </div>
      </div>
      <Footer />
    </main>
  );
}
