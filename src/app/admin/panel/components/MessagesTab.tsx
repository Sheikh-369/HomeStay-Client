'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { useAppDispatch } from '@/src/lib/store/hooks/hooks';
import { deleteMessage, markMessageAsRead } from '@/src/lib/store/message/message-slice';
import { IMessageData } from '@/src/lib/store/message/message-slice-type';

interface MessagesTabProps {
  messages: IMessageData[];
}

export default function MessagesTab({ messages }: MessagesTabProps) {
  const dispatch = useAppDispatch();
  
  const [selectedMsg, setSelectedMsg] = useState<IMessageData | null>(null);
  const [replyMsg, setReplyMsg] = useState<IMessageData | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<IMessageData | null>(null);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // STEP 1: Handle opening and marking as read
  const openMessage = (msg: IMessageData) => {
    setSelectedMsg(msg);

    // Trigger the thunk if the message is unread
    if (!msg.read && msg.id) {
      dispatch(markMessageAsRead(msg.id));
    }
  };

  const handleSendReply = () => {
    if (!replyMsg) return;
    setIsSubmitting(true);
    
    const safeSubject = encodeURIComponent(`RE: ${replyMsg.subject || 'Inquiry'}`);
    const safeBody = encodeURIComponent(replyText);
    window.location.href = `mailto:${replyMsg.email}?subject=${safeSubject}&body=${safeBody}`;
    
    setTimeout(() => {
      setReplyMsg(null);
      setIsSubmitting(false);
      setReplyText('');
    }, 1000);
  };

  const handleDelete = async (id: string) => {
    const res = await dispatch(deleteMessage(id));
    if (res?.success) {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {messages.map((msg) => (
        <div
          key={msg.id}
          // STEP 2: Conditional styling for the card container
          className={`rounded-2xl border p-4 md:p-5 transition-all shadow-sm hover:border-primary/20 
            ${!msg.read 
              ? 'bg-accent/5 border-accent/30 shadow-md' 
              : 'bg-cream border-primary/8'
            }`}
        >
          <div className="flex items-start gap-4">
            {/* Avatar color changes if unread */}
            <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm uppercase
              ${!msg.read ? 'bg-accent text-white' : 'bg-primary/10 text-primary'}`}>
              {msg.name?.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <div className="flex items-center gap-2">
                  {/* STEP 3: Bold text and "New" badge for unread messages */}
                  <p className={`text-sm ${!msg.read ? 'font-black text-primary' : 'font-bold text-primary'}`}>
                    {msg.name}
                  </p>
                  {!msg.read && (
                    <span className="bg-accent text-white text-[9px] px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider">
                      New
                    </span>
                  )}
                </div>
                <span className="text-[10px] text-primary/30 font-bold uppercase tracking-tighter">
                   {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
              
              <p className="text-xs text-primary/50 font-medium truncate">{msg.email}</p>
              
              {/* Bold subject for unread */}
              <p className={`text-sm mt-2 mb-1 ${!msg.read ? 'font-extrabold text-primary' : 'font-bold text-primary/80'}`}>
                {msg.subject || 'No Subject'}
              </p>
              
              <p className="text-sm text-primary/60 line-clamp-2 leading-relaxed">{msg.message}</p>
              
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-primary/5">
                <button onClick={() => openMessage(msg)} className="text-xs font-bold text-accent hover:opacity-70">
                  {msg.read ? 'View Full' : 'Read Now'}
                </button>
                <button onClick={() => { setReplyMsg(msg); setReplyText(''); }} className="text-xs font-bold text-primary/50 hover:text-primary">
                  Reply
                </button>
                <button 
                  onClick={() => setDeleteTarget(msg)} 
                  className="text-xs font-bold text-red-400 hover:text-red-600 ml-auto"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {messages.length === 0 && (
        <div className="bg-primary/2 border border-dashed border-primary/10 rounded-3xl py-20 text-center">
            <p className="text-primary/30 text-sm font-bold uppercase tracking-widest">No messages found</p>
        </div>
      )}

      {/* --- MODALS --- */}

      {/* View Message */}
      <Modal isOpen={!!selectedMsg} onClose={() => setSelectedMsg(null)} title="Message Content" size="md">
        {selectedMsg && (
          <div className="space-y-5">
            <div className="bg-primary/4 rounded-2xl p-5 border border-primary/5">
              <p className="text-[10px] font-bold text-primary/30 uppercase tracking-widest mb-3">From: {selectedMsg.name}</p>
              <p className="text-sm text-primary/80 leading-relaxed whitespace-pre-wrap">{selectedMsg.message}</p>
            </div>
            <button
              onClick={() => { setSelectedMsg(null); setReplyMsg(selectedMsg); }}
              className="w-full py-4 bg-primary text-cream text-sm font-bold rounded-xl active:scale-95 transition-all"
            >
              Compose Reply
            </button>
          </div>
        )}
      </Modal>

      {/* Reply Message */}
      <Modal isOpen={!!replyMsg} onClose={() => setReplyMsg(null)} title="Quick Reply" size="md">
        {replyMsg && (
          <div className="space-y-4">
            <div className="p-3 bg-primary/4 rounded-xl">
                <p className="text-[9px] font-bold text-primary/40 uppercase">To</p>
                <p className="text-xs font-bold text-primary truncate">{replyMsg.email}</p>
            </div>
            <textarea
              rows={6}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Your reply..."
              className="w-full p-4 rounded-xl bg-cream border border-primary/10 text-sm outline-none focus:border-accent/50 transition-all"
            />
            <div className="flex gap-3">
              <button
                onClick={handleSendReply}
                disabled={!replyText.trim() || isSubmitting}
                className="flex-1 py-4 bg-accent text-cream text-sm font-bold rounded-xl disabled:opacity-30"
              >
                {isSubmitting ? 'Redirecting...' : 'Open Mail Client'}
              </button>
            </div>
          </div>
        )}
      </Modal>

      {/* Delete Confirmation */}
      <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Confirm Delete" size="sm">
        {deleteTarget && (
          <div className="space-y-5 text-center">
            <p className="text-sm text-primary/70">Delete message from <b>{deleteTarget.name}</b>?</p>
            <div className="flex gap-2">
              <button 
                onClick={() => deleteTarget.id && handleDelete(deleteTarget.id)} 
                className="flex-1 py-3 bg-red-500 text-white text-sm font-bold rounded-xl"
              >
                Confirm
              </button>
              <button onClick={() => setDeleteTarget(null)} className="flex-1 py-3 bg-primary/5 text-primary/50 text-sm font-bold rounded-xl">
                Cancel
              </button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}