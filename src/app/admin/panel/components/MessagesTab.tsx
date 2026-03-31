// 'use client';

// import React, { useState } from 'react';
// import { Message } from './AdminTypes';
// import Modal from './Modal';

// interface MessagesTabProps {
//   messages: Message[];
//   onMarkRead: (id: string) => void;
//   onDeleteMessage: (id: string) => void;
// }

// export default function MessagesTab({ messages, onMarkRead, onDeleteMessage }: MessagesTabProps) {
//   const [selectedMsg, setSelectedMsg] = useState<Message | null>(null);
//   const [replyMsg, setReplyMsg] = useState<Message | null>(null);
//   const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
//   const [replyText, setReplyText] = useState('');
//   const [replySent, setReplySent] = useState(false);

//   const openMessage = (msg: Message) => {
//     setSelectedMsg(msg);
//     if (!msg.read) onMarkRead(msg.id);
//   };

//   const openReply = (msg: Message) => {
//     setReplyMsg(msg);
//     setReplyText('');
//     setReplySent(false);
//   };

//   const handleSendReply = () => {
//     setReplySent(true);
//     setTimeout(() => { setReplyMsg(null); setReplySent(false); }, 1500);
//   };

//   return (
//     <div className="space-y-3">
//       {messages.map((msg) => (
//         <div
//           key={msg.id}
//           className={`bg-cream rounded-2xl border p-5 transition-all ${!msg.read ? 'border-accent/30 bg-accent/3' : 'border-primary/8'}`}
//         >
//           <div className="flex items-start gap-4">
//             <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
//               {msg.name.charAt(0)}
//             </div>
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center justify-between gap-2 flex-wrap">
//                 <div className="flex items-center gap-2">
//                   <p className="font-semibold text-primary">{msg.name}</p>
//                   {!msg.read && (
//                     <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/15 text-accent">New</span>
//                   )}
//                 </div>
//                 <span className="text-xs text-primary/30 font-medium">{msg.date}</span>
//               </div>
//               <p className="text-xs text-primary/50 font-medium mt-0.5">{msg.email}</p>
//               <p className="text-sm font-semibold text-primary mt-2">{msg.subject}</p>
//               <p className="text-sm text-primary/60 mt-1 leading-relaxed line-clamp-2">{msg.message}</p>
//               <div className="flex items-center gap-3 mt-3 flex-wrap">
//                 <button
//                   onClick={() => openMessage(msg)}
//                   className="text-xs font-semibold text-accent hover:text-accent-light transition-colors"
//                 >
//                   Read full message
//                 </button>
//                 <button
//                   onClick={() => openReply(msg)}
//                   className="text-xs font-semibold text-primary/50 hover:text-primary transition-colors"
//                 >
//                   Reply
//                 </button>
//                 {!msg.read && (
//                   <button
//                     onClick={() => onMarkRead(msg.id)}
//                     className="text-xs font-semibold text-primary/40 hover:text-primary transition-colors"
//                   >
//                     Mark as read
//                   </button>
//                 )}
//                 <button
//                   onClick={() => setDeleteTarget(msg)}
//                   className="text-xs font-semibold text-red-400 hover:text-red-600 transition-colors ml-auto"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {messages.length === 0 && (
//         <div className="text-center py-16 text-primary/30 text-sm font-medium">No messages yet.</div>
//       )}

//       {/* Read Message Modal */}
//       <Modal isOpen={!!selectedMsg} onClose={() => setSelectedMsg(null)} title="Message" size="md">
//         {selectedMsg && (
//           <div className="space-y-4">
//             <div className="flex items-start gap-3">
//               <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary">
//                 {selectedMsg.name.charAt(0)}
//               </div>
//               <div>
//                 <p className="font-semibold text-primary">{selectedMsg.name}</p>
//                 <p className="text-xs text-primary/50">{selectedMsg.email}</p>
//                 <p className="text-xs text-primary/30 mt-0.5">{selectedMsg.date}</p>
//               </div>
//             </div>
//             <div className="bg-primary/4 rounded-xl p-4">
//               <p className="text-sm font-semibold text-primary mb-2">{selectedMsg.subject}</p>
//               <p className="text-sm text-primary/70 leading-relaxed">{selectedMsg.message}</p>
//             </div>
//             <button
//               onClick={() => { setSelectedMsg(null); openReply(selectedMsg); }}
//               className="w-full py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all"
//             >
//               Reply to this message
//             </button>
//           </div>
//         )}
//       </Modal>

//       {/* Reply Modal */}
//       <Modal isOpen={!!replyMsg} onClose={() => setReplyMsg(null)} title="Reply to Message" size="md">
//         {replyMsg && (
//           <div className="space-y-4">
//             <div className="bg-primary/4 rounded-xl p-3">
//               <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-1">To</p>
//               <p className="text-sm font-semibold text-primary">{replyMsg.name} — {replyMsg.email}</p>
//             </div>
//             <div className="bg-primary/4 rounded-xl p-3">
//               <p className="text-xs text-primary/40 font-semibold uppercase tracking-wider mb-1">Re</p>
//               <p className="text-sm text-primary/70">{replyMsg.subject}</p>
//             </div>
//             <div>
//               <label className="form-label">Your Reply</label>
//               <textarea
//                 rows={5}
//                 value={replyText}
//                 onChange={(e) => setReplyText(e.target.value)}
//                 placeholder="Type your reply here..."
//                 className="form-input resize-none"
//               />
//             </div>
//             {replySent ? (
//               <div className="py-3 text-center text-sm font-semibold text-sage">✓ Reply sent successfully!</div>
//             ) : (
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleSendReply}
//                   disabled={!replyText.trim()}
//                   className="flex-1 py-2.5 px-4 bg-primary text-cream text-sm font-semibold rounded-xl hover:bg-primary/85 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
//                 >
//                   Send Reply
//                 </button>
//                 <button onClick={() => setReplyMsg(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
//                   Cancel
//                 </button>
//               </div>
//             )}
//           </div>
//         )}
//       </Modal>

//       {/* Delete Confirm Modal */}
//       <Modal isOpen={!!deleteTarget} onClose={() => setDeleteTarget(null)} title="Delete Message" size="sm">
//         {deleteTarget && (
//           <div className="space-y-4">
//             <p className="text-sm text-primary/70 leading-relaxed">
//               Delete the message from <span className="font-semibold text-primary">{deleteTarget.name}</span>? This cannot be undone.
//             </p>
//             <div className="flex gap-2">
//               <button onClick={() => { onDeleteMessage(deleteTarget.id); setDeleteTarget(null); }} className="flex-1 py-2.5 px-4 bg-red-500 text-white text-sm font-semibold rounded-xl hover:bg-red-600 transition-all">
//                 Delete
//               </button>
//               <button onClick={() => setDeleteTarget(null)} className="flex-1 py-2.5 px-4 border border-primary/15 text-primary/60 text-sm font-semibold rounded-xl hover:border-primary/30 transition-all">
//                 Keep
//               </button>
//             </div>
//           </div>
//         )}
//       </Modal>
//     </div>
//   );
// }


//2nd
'use client';

import React, { useState } from 'react';
import Modal from './Modal';
import { useAppDispatch } from '@/src/lib/store/hooks/hooks';
import { deleteMessage, fetchMessages, markMessageAsRead } from '@/src/lib/store/message/message-slice';
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

  const openMessage = (msg: IMessageData) => {
  setSelectedMsg(msg);

  // If the message is currently unread, trigger the thunk
  if (!msg.read && msg.id) {
    dispatch(markMessageAsRead(msg.id));
  }
};

  const handleSendReply = () => {
    if (!replyMsg) return;
    setIsSubmitting(true);
    
    // External link to mail client
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
    // Using your specific deleteMessage thunk
    const res = await dispatch(deleteMessage(id));
    if (res?.success) {
      setDeleteTarget(null);
      // Your thunk already calls fetchMessages(), so the UI will auto-update
    }
  };

  return (
    <div className="space-y-4 pb-10">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className="bg-cream rounded-2xl border border-primary/8 p-4 md:p-5 transition-all shadow-sm hover:border-primary/20"
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 font-bold text-primary text-sm uppercase">
              {msg.name?.charAt(0)}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <div className="flex items-center gap-2">
                  <p className="font-bold text-primary text-sm">{msg.name}</p>
                </div>
                <span className="text-[10px] text-primary/30 font-bold uppercase tracking-tighter">
                   {msg.createdAt ? new Date(msg.createdAt).toLocaleDateString() : 'Recent'}
                </span>
              </div>
              
              <p className="text-xs text-primary/50 font-medium truncate">{msg.email}</p>
              <p className="text-sm font-bold text-primary mt-2 mb-1">{msg.subject || 'No Subject'}</p>
              <p className="text-sm text-primary/60 line-clamp-2 leading-relaxed">{msg.message}</p>
              
              <div className="flex items-center gap-4 mt-4 pt-3 border-t border-primary/5">
                <button onClick={() => openMessage(msg)} className="text-xs font-bold text-accent hover:opacity-70">
                  View Full
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