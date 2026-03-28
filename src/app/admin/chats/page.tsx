
"use client";

import { useState, useEffect, useRef } from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, addDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Send, User, Clock, CheckCircle2, MoreVertical, Phone, Mail, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AdminChats() {
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [reply, setReply] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const db = useFirestore();

  const sessionsQuery = useMemoFirebase(() => {
    if (!db) return null;
    return query(collection(db, "chatSessions"), orderBy("lastTimestamp", "desc"));
  }, [db]);

  const { data: sessions, isLoading: sessionsLoading } = useCollection(sessionsQuery);

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !selectedSession) return null;
    return query(collection(db, "chatSessions", selectedSession.id, "messages"), orderBy("timestamp", "asc"));
  }, [db, selectedSession]);

  const { data: messages } = useCollection(messagesQuery);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!reply.trim() && !selectedImage) || !selectedSession || !db) return;

    const messagesRef = collection(db, "chatSessions", selectedSession.id, "messages");
    const sessionRef = doc(db, "chatSessions", selectedSession.id);

    await addDoc(messagesRef, {
      text: reply,
      imageUrl: selectedImage,
      sender: "admin",
      timestamp: serverTimestamp()
    });

    await setDoc(sessionRef, {
      lastMessage: selectedImage ? "Sent an image" : reply,
      lastTimestamp: serverTimestamp()
    }, { merge: true });

    setReply("");
    setSelectedImage(null);
  };

  const markAsClosed = async (id: string) => {
    if (!db) return;
    await setDoc(doc(db, "chatSessions", id), { status: "closed" }, { merge: true });
  };

  if (sessionsLoading) return <div className="p-12 text-center">Loading Chats...</div>;

  return (
    <div className="h-[calc(100vh-100px)] p-8 flex gap-8 overflow-hidden">
      {/* Sidebar: Chat Sessions List */}
      <div className="w-96 flex flex-col gap-4 overflow-hidden">
        <div>
          <h1 className="text-3xl font-bold mb-2 text-gradient">Support Center</h1>
          <p className="text-muted-foreground text-sm">Manage real-time customer support sessions.</p>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
          {sessions?.map((session) => (
            <Card 
              key={session.id} 
              className={cn("cursor-pointer hover:shadow-md transition-all rounded-[1.5rem] border-border/50 overflow-hidden", 
                selectedSession?.id === session.id ? "border-primary ring-1 ring-primary/20 bg-primary/[0.02]" : "bg-white")}
              onClick={() => setSelectedSession(session)}
            >
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <span className="font-bold text-sm truncate max-w-[120px]">{session.userName}</span>
                  </div>
                  <Badge variant={session.status === "open" ? "default" : "outline"} className="text-[9px] h-5 rounded-full px-2">
                    {session.status}
                  </Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate mb-2">{session.lastMessage}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {session.lastTimestamp?.toDate() ? new Date(session.lastTimestamp.toDate()).toLocaleTimeString() : '...'}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
          {sessions?.length === 0 && (
            <div className="text-center py-20 bg-muted/20 rounded-[2rem] border-2 border-dashed">
              <p className="text-muted-foreground italic">No active chat sessions.</p>
            </div>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {selectedSession ? (
          <Card className="flex-1 flex flex-col rounded-[2.5rem] border-none shadow-xl overflow-hidden bg-white">
            <CardHeader className="border-b bg-muted/10 p-6 flex flex-row items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <CardTitle>{selectedSession.userName}</CardTitle>
                  <div className="flex flex-col gap-1 mt-1">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Mail className="w-3 h-3" /> {selectedSession.userEmail}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-primary font-bold">
                      <Phone className="w-3 h-3" /> WhatsApp: {selectedSession.userPhone}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="rounded-xl h-10 gap-2" onClick={() => markAsClosed(selectedSession.id)}>
                  <CheckCircle2 className="w-4 h-4" /> Close Session
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl h-10 w-10">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="flex-1 overflow-hidden p-0 flex flex-col bg-[#F8FAFC]">
              <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6 custom-scrollbar">
                {messages?.map((msg, idx) => (
                  <div key={idx} className={cn("flex flex-col", msg.sender === "admin" ? "items-end" : "items-start")}>
                    <div className={cn("max-w-[70%] p-5 rounded-2xl text-sm shadow-sm leading-relaxed", 
                      msg.sender === "admin" ? "bg-primary text-white rounded-tr-none" : "bg-white text-foreground rounded-tl-none border")}>
                      {msg.imageUrl && (
                        <img src={msg.imageUrl} alt="Chat attachment" className="max-w-full rounded-lg mb-2 border shadow-sm" />
                      )}
                      {msg.text && <p>{msg.text}</p>}
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-2 px-1">
                      {msg.sender === "admin" ? "You" : selectedSession.userName} • {msg.timestamp?.toDate() ? new Date(msg.timestamp.toDate()).toLocaleTimeString() : '...'}
                    </span>
                  </div>
                ))}
              </div>
              
              {selectedImage && (
                <div className="px-8 py-4 bg-muted/10 border-t flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <img src={selectedImage} alt="Pending" className="w-16 h-16 rounded-xl object-cover border-2 border-white shadow-md" />
                    <div>
                      <p className="text-sm font-bold">Image selected</p>
                      <p className="text-xs text-muted-foreground">Click send to upload and notify user</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)} className="h-10 w-10 rounded-full text-destructive">
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              )}

              <div className="p-6 bg-white border-t">
                <form onSubmit={handleSendReply} className="flex gap-4">
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    ref={fileInputRef} 
                    onChange={handleImageSelect}
                  />
                  <Button 
                    type="button" 
                    variant="ghost" 
                    size="icon" 
                    className="h-14 w-14 rounded-2xl bg-muted/50 text-muted-foreground"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <ImageIcon className="w-6 h-6" />
                  </Button>
                  <Input 
                    placeholder="Type your reply here..." 
                    value={reply} 
                    onChange={e => setReply(e.target.value)}
                    className="rounded-2xl border-none bg-muted/50 h-14 px-6 text-base"
                  />
                  <Button type="submit" size="lg" className="h-14 px-8 rounded-2xl gradient-blue shadow-lg shadow-primary/20">
                    <Send className="w-5 h-5 mr-2" /> Send Reply
                  </Button>
                </form>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center bg-muted/20 rounded-[3rem] border-2 border-dashed">
            <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center shadow-xl mb-6">
              <MessageSquare className="w-10 h-10 text-primary opacity-20" />
            </div>
            <h3 className="text-xl font-bold">Select a session to start chatting</h3>
            <p className="text-muted-foreground">Real-time messages from your customers will appear here.</p>
          </div>
        )}
      </div>
    </div>
  );
}
