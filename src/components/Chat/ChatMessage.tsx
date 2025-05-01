import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ChatCardTask } from "./ChatCardTask";
import { ChatCardArtefact } from "./ChatCardArtefact";


const tools = {
    task: ChatCardTask,
    artefact: ChatCardArtefact,
}


interface ChatMessage {
    id: string;
    role: "user" | "assistant";
    content: string;
    createdAt: string;
    type: "text" | "image" | "file" | "code" | "tool-invocation" | "artifact";
    data: { tool: string; [key: string]: any };
    
    // taskId?: number;
    // artefact?: string;
  }

interface ChatMessageProps {
  message: ChatMessage;
  currentUser?: {
    name?: string;
    avatar?: string;
  };
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, currentUser }) => {
  const isCurrentUser = message.role === "user";
  const userName = isCurrentUser
    ? currentUser?.name || "You"
    : "AI Assistant";
  const userAvatar = isCurrentUser
    ? currentUser?.avatar || "/placeholder-user.jpg"
    : "/placeholder.svg?height=40&width=40";


switch (message.type) {
  case "text":
    return (
      <div
        key={message.id}
        className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
      >
        <Avatar className={!isCurrentUser ? "ai-border" : ""}>
          <AvatarImage src={userAvatar} alt={userName} />
          <AvatarFallback>
            {userName.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className={`grid gap-1.5 ${isCurrentUser ? "text-right" : ""}`}>
          <div className="flex items-center gap-2">
            <span className="font-medium">{userName}</span>
          </div>
          
          <div
            className={`rounded-lg p-3 text-sm ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
            style={{ whiteSpace: "pre-line" }}
          >
            {message.content}
          </div>
        </div>
      </div>
    );
    case "image":
        return (
            <div
            key={message.id}
            className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
            >
            <Avatar className={!isCurrentUser ? "ai-border" : ""}>
                <AvatarImage src={userAvatar} alt={userName} />
                <AvatarFallback>
                {userName.substring(0, 2).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <div className={`grid gap-1.5 ${isCurrentUser ? "text-right" : ""}`}>
                <div className="flex items-center gap-2">
                <span className="font-medium">{userName}</span>
                </div>
                
                <img
                src={message.content}
                alt="User uploaded content"
                className={`rounded-lg p-3 text-sm ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                style={{ maxWidth: "100%", height: "auto" }}
                />
            </div>
            </div>
        );
        case "tool-invocation":
            const ToolComponent = tools[message.data.tool as keyof typeof tools];
            if (ToolComponent) {
                return (
                    <div className="mt-2">
                        <ToolComponent data={message.data} />
                    </div>
                );
            } else {
                console.warn(`Tool ${message.data.tool} is not defined.`);
                return (
                    <div className="mt-2">......</div>
                )
            }
        }


            

//   return (
//     <div
//       key={message.id}
//       className={`flex items-start gap-3 ${isCurrentUser ? "flex-row-reverse" : ""}`}
//     >
//       <Avatar className={!isCurrentUser ? "ai-border" : ""}>
//         <AvatarImage src={userAvatar} alt={userName} />
//         <AvatarFallback>
//           {userName.substring(0, 2).toUpperCase()}
//         </AvatarFallback>
//       </Avatar>
//       <div className={`grid gap-1.5 ${isCurrentUser ? "text-right" : ""}`}>
//         <div className="flex items-center gap-2">
//           <span className="font-medium">{userName}</span>
//         </div>
        
//         <div
//           className={`rounded-lg p-3 text-sm ${isCurrentUser ? "bg-primary text-primary-foreground" : "bg-muted"}`}
//           style={{ whiteSpace: "pre-line" }}
//         >
//           {message.content}
//         </div>

//         {message.taskId && !message.artefact && (
//           <div className="mt-2">
//             <ChatCardTask id={message.taskId} fetchLatest={true} />
//           </div>
//         )}
//         {message.taskId && message.artefact && (
//           <div className="mt-2">
//             <ChatCardArtefact artefact={message.artefact} taskId={message.taskId} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
};

export default ChatMessage;