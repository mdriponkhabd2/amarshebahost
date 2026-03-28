
"use client";

import { useState, useEffect, useRef } from "react";
import { useFirestore, useCollection, useMemoFirebase } from "@/firebase";
import { collection, query, orderBy, doc, serverTimestamp, setDoc, addDoc } from "firebase/firestore";
import { MessageSquare, X, Send, User, Mail, MessageCircle, Phone, Image as ImageIcon, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const db = useFirestore();

  useEffect(() => {
    const savedId = localStorage.getItem("chat_session_id");
    const savedName = localStorage.getItem("chat_user_name");
    if (savedId && savedName) {
      setSessionId(savedId);
      setName(savedName);
      setIsJoined(true);
    }
  }, []);

  const messagesQuery = useMemoFirebase(() => {
    if (!db || !sessionId) return null;
    return query(collection(db, "chatSessions", sessionId, "messages"), orderBy("timestamp", "asc"));
  }, [db, sessionId]);

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

  const handleJoin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone || (!message && !selectedImage) || !db) return;

    const newSessionId = `session_${Date.now()}`;
    const sessionRef = doc(db, "chatSessions", newSessionId);
    
    await setDoc(sessionRef, {
      id: newSessionId,
      userName: name,
      userEmail: email,
      userPhone: phone,
      status: "open",
      lastMessage: selectedImage ? "Sent an image" : message,
      lastTimestamp: serverTimestamp(),
      unreadCount: 0
    });

    const messagesRef = collection(db, "chatSessions", newSessionId, "messages");
    await addDoc(messagesRef, {
      text: message,
      imageUrl: selectedImage,
      sender: "user",
      timestamp: serverTimestamp()
    });

    setSessionId(newSessionId);
    setIsJoined(true);
    localStorage.setItem("chat_session_id", newSessionId);
    localStorage.setItem("chat_user_name", name);
    setMessage("");
    setSelectedImage(null);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if ((!inputMessage.trim() && !selectedImage) || !sessionId || !db) return;

    const messagesRef = collection(db, "chatSessions", sessionId, "messages");
    const sessionRef = doc(db, "chatSessions", sessionId);

    const messageData = {
      text: inputMessage,
      imageUrl: selectedImage,
      sender: "user",
      timestamp: serverTimestamp()
    };

    await addDoc(messagesRef, messageData);

    await setDoc(sessionRef, {
      lastMessage: selectedImage ? "Sent an image" : inputMessage,
      lastTimestamp: serverTimestamp()
    }, { merge: true });

    setInputMessage("");
    setSelectedImage(null);
  };

  return (
    <div className="fixed bottom-6 left-6 z-[60]">
      {!isOpen ? (
        <Button
          onClick={() => setIsOpen(true)}
          className="w-16 h-16 rounded-full gradient-blue shadow-2xl hover:scale-110 active:scale-95 transition-all group"
        >
          <MessageCircle className="w-8 h-8 text-white" />
          <span className="absolute left-full ml-4 px-4 py-2 bg-white text-black text-sm font-bold rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none border">
            Live Support
          </span>
        </Button>
      ) : (
        <Card className="w-[350px] sm:w-[400px] h-[600px] rounded-[2.5rem] shadow-2xl border-none flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          <CardHeader className="gradient-blue text-white p-6 flex flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Live Support</CardTitle>
                <p className="text-[10px] opacity-70 uppercase tracking-widest">Online (10AM - 9PM)</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="text-white hover:bg-white/20 rounded-full">
              <X className="w-5 h-5" />
            </Button>
          </CardHeader>

          <CardContent className="flex-1 overflow-hidden p-0 flex flex-col bg-[#F8FAFC]">
            {!isJoined ? (
              <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
                <form onSubmit={handleJoin} className="p-8 space-y-4 mt-4">
                  <div className="text-center mb-6">
                    <p className="text-lg font-bold">Start a Live Chat</p>
                    <p className="text-xs text-muted-foreground">Fill in the details to connect with us</p>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <User className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                    </div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                    </div>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input placeholder="WhatsApp Number" value={phone} onChange={e => setPhone(e.target.value)} className="pl-10 h-12 rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Textarea placeholder="How can we help you?" value={message} onChange={e => setMessage(e.target.value)} className="rounded-xl min-h-[100px] p-4" />
                    </div>
                    {/* Initial Image Option */}
                    <div className="flex items-center gap-2">
                      <input 
                        type="file" 
                        accept="image/*" 
                        className="hidden" 
                        ref={fileInputRef} 
                        onChange={handleImageSelect}
                      />
                      <Button 
                        type="button" 
                        variant="outline" 
                        className="rounded-xl flex-1 h-12 gap-2 border-dashed"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <ImageIcon className="w-4 h-4" /> 
                        {selectedImage ? "Image Selected" : "Attach Image"}
                      </Button>
                      {selectedImage && (
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="h-12 w-12 rounded-xl text-destructive"
                          onClick={() => setSelectedImage(null)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                  <Button type="submit" className="w-full gradient-blue h-14 rounded-xl font-bold mt-4 shadow-lg shadow-primary/20 text-lg">
                    Start Chatting
                  </Button>
                </form>
              </div>
            ) : (
              <>
                <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-4 custom-scrollbar">
                  {messages?.map((msg, idx) => (
                    <div key={idx} className={cn("flex flex-col", msg.sender === "user" ? "items-end" : "items-start")}>
                      <div className={cn("max-w-[80%] p-4 rounded-2xl text-sm shadow-sm", 
                        msg.sender === "user" ? "bg-primary text-white rounded-tr-none" : "bg-white text-foreground rounded-tl-none border")}>
                        {msg.imageUrl && (
                          <img src={msg.imageUrl} alt="Chat content" className="max-w-full rounded-lg mb-2 shadow-sm" />
                        )}
                        {msg.text && <p>{msg.text}</p>}
                      </div>
                      <span className="text-[10px] text-muted-foreground mt-1 px-1">
                        {msg.timestamp?.toDate() ? new Date(msg.timestamp.toDate()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Sending...'}
                      </span>
                    </div>
                  ))}
                  {messages?.length === 0 && (
                    <div className="text-center py-20 text-muted-foreground">
                      <p>Connected. Please wait for an agent...</p>
                    </div>
                  )}
                </div>

                {/* Image Preview before sending */}
                {selectedImage && (
                  <div className="px-4 py-2 bg-muted/20 border-t flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img src={selectedImage} alt="Preview" className="w-12 h-12 rounded-lg object-cover border" />
                      <span className="text-xs text-muted-foreground">Ready to send</span>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => setSelectedImage(null)} className="h-8 w-8 rounded-full text-destructive">
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}

                <div className="p-4 bg-white border-t">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
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
                      className="h-12 w-12 rounded-xl bg-muted/50 text-muted-foreground"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <ImageIcon className="w-5 h-5" />
                    </Button>
                    <Input 
                      placeholder="Type a message..." 
                      value={inputMessage} 
                      onChange={e => setInputMessage(e.target.value)}
                      className="rounded-xl border-none bg-muted/50 h-12"
                    />
                    <Button type="submit" size="icon" className="h-12 w-12 rounded-xl gradient-blue shadow-lg shadow-primary/20 shrink-0">
                      <Send className="w-5 h-5" />
                    </Button>
                  </form>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
