import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
export const ChatContext = createContext();


export const ChatProvider = ({ children }) => {

    const [messages, setMessages] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null)
    const [unseenMessages, setUnseenMessages] = useState({})

    const { socket, axios } = useContext(AuthContext);

    // function to get all users for sidebar
    const getUsers = async () => {
        try {
            const res = await axios.get("/api/messages/users", {
                headers: {
                    token: localStorage.getItem("token"), // ✅ Add token here
                },
            });

            setUsers(res.data.users); // or however you're updating context
            setUnseenMessages(res.data.unseenMessages);
        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to get messages for selected user
    const getMessages = async (userId) => {
        try {
            const { data } = await axios.get(`/api/messages/${userId}`);
            if (data.success) {
                setMessages(data.messages)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    // function to send message to selected user
    const sendMessage = async (messageData) => {
        try {
            const { data } = await axios.post(
                `/api/messages/send/${selectedUser._id}`,
                messageData,
                {
                    headers: {
                        token: localStorage.getItem("token"), // ✅ Include token here
                    },
                }
            );
            if (data.success) {
                setMessages((prevMessages) => [...prevMessages, data.message])
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            toast.error(error.message);
        }
    }

    // function to subscribe to messages for selected user
    const subscribeToMessages = async () => {
        if (!socket) return;

        socket.on("newMessage", (newMessage) => {
            if (selectedUser && newMessage.senderId === selectedUser._id) {
                newMessage.seen = true;
                setMessages((prevMessages) => [...prevMessages, newMessage]);
                axios.put(`/api/messages/mark/${newMessage._id}`);
            } else {
                setUnseenMessages((prevUnseenMessages) => ({
                    ...prevUnseenMessages, [newMessage.senderId]:
                        prevUnseenMessages[newMessage.senderId] ? prevUnseenMessages
                        [newMessage.senderId] + 1 : 1
                }))
            }
        })
    }


    // function to unsubscribe from messages
    const unsubscribeFromMessages = () => {
        if (socket) socket.off("newMessage");

    }

    useEffect(() => {
        subscribeToMessages();
        return () => unsubscribeFromMessages();
    }, [socket, selectedUser])


    const value = {
        messages, users, selectedUser, getUsers, getMessages, sendMessage,
        setSelectedUser, unseenMessages, setUnseenMessages

    }


    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>

    )

}