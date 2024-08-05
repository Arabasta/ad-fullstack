//package com.robotrader.spring.service;
//
//import com.robotrader.spring.dto.chat.*;
//import com.robotrader.spring.exception.notFound.ChatNotFoundException;
//import com.robotrader.spring.model.Chat;
//import com.robotrader.spring.model.Message; // Ensure this import is present
//import com.robotrader.spring.model.User;
//import com.robotrader.spring.repository.ChatRepository;
//import com.robotrader.spring.repository.MessageRepository;
//import com.robotrader.spring.service.interfaces.IChatService;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.messaging.simp.SimpMessagingTemplate;
//import org.springframework.stereotype.Service;
//
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class ChatService implements IChatService {
//
//    private final MessageRepository messageRepository;
//    private final ChatRepository chatRepository;
//    private final UserService userService;
//    private final SimpMessagingTemplate messagingTemplate;
//
//    private static int lastAssignedAdminIndex = -1;
//
//    @Autowired
//    public ChatService(MessageRepository messageRepository, ChatRepository chatRepository, UserService userService, SimpMessagingTemplate messagingTemplate) {
//        this.messageRepository = messageRepository;
//        this.chatRepository = chatRepository;
//        this.userService = userService;
//        this.messagingTemplate = messagingTemplate;
//    }
//
//    @Override
//    public Chat findChatById(Long chatId) {
//        return chatRepository.findById(chatId)
//                .orElseThrow(() -> new ChatNotFoundException("Chat not found"));
//    }
//
//    @Override
//    public List<ChatDTO> getConversations(String username) {
//        return chatRepository.findConversationsByUsername(username).stream()
//                .map(this::mapToChatDTO)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public List<MessageDTO> getMessages(Long chatId) {
//        return messageRepository.findMessagesByChatId(chatId).stream()
//                .map(this::mapToMessageDTO)
//                .collect(Collectors.toList());
//    }
//
//    @Transactional
//    @Override
//    public void sendCustomerMessage(String senderUsername, CustomerMessageRequestDTO messageRequest) {
//        User sender = userService.findByUsername(senderUsername);
//
//        // Find an existing active chat
//        Chat chat = chatRepository.findActiveChatBetweenUsers(sender, assignAdminRoundRobin())
//                .orElseGet(() -> {
//                    User receiver = assignAdminRoundRobin();
//                    if (receiver == null) {
//                        throw new IllegalStateException("No admin users available.");
//                    }
//                    return createNewChat(sender, receiver);
//                });
//
//        Message message = addMessageToChat(chat, sender, chat.getUser2(), messageRequest.getMessageText());
//
//        // Notify subscribers about the new message
//        messagingTemplate.convertAndSend("/topic/chats/" + chat.getId(), mapToMessageDTO(message));
//    }
//
//    @Transactional
//    @Override
//    public ChatDTO startNewChat(String customerUsername) {
//        User customer = userService.findByUsername(customerUsername);
//        User assignedAdmin = assignAdminRoundRobin();
//
//        // Check if there's an existing unresolved chat
//        Chat existingChat = chatRepository.findActiveChatBetweenUsers(customer, assignedAdmin)
//                .orElse(null);
//
//        if (existingChat != null) {
//            return mapToChatDTO(existingChat);
//        }
//
//        // Create a new chat with the next admin in the round-robin assignment
//        Chat newChat = createNewChat(customer, assignedAdmin);
//        return mapToChatDTO(newChat);
//    }
//
//    @Transactional
//    @Override
//    public void sendAdminMessage(String senderUsername, AdminMessageRequestDTO messageRequest) {
//        User sender = userService.findByUsername(senderUsername);
//        User receiver = userService.findByUsername(messageRequest.getReceiverUsername());
//
//        Chat chat = chatRepository.findActiveChatBetweenUsers(sender, receiver)
//                .orElseThrow(() -> new ChatNotFoundException("Chat not found"));
//
//        Message message = addMessageToChat(chat, sender, receiver, messageRequest.getMessageText());
//
//        // Notify subscribers about the new message
//        messagingTemplate.convertAndSend("/topic/chats/" + chat.getId(), mapToMessageDTO(message));
//    }
//
//    @Transactional
//    protected Message addMessageToChat(Chat chat, User sender, User receiver, String messageText) {
//        Message message = new Message();
//        message.setChat(chat);
//        message.setSender(sender);
//        message.setReceiver(receiver);
//        message.setMessageText(messageText);
//        message.setTimestamp(LocalDateTime.now());
//        messageRepository.save(message);
//
//        chat.setLastMessageTime(LocalDateTime.now());
//        chatRepository.save(chat);
//
//        return message;
//    }
//
//    @Transactional
//    protected Chat createNewChat(User user1, User user2) {
//        Chat chat = new Chat();
//        chat.setUser1(user1);
//        chat.setUser2(user2);
//        chat.setLastMessageTime(LocalDateTime.now());
//        return chatRepository.save(chat);
//    }
//
//    @Override
//    public List<ChatDTO> getAllOpenChats() {
//        List<Chat> openChats = chatRepository.findByIsResolvedFalseOrderByLastMessageTimeDesc();
//        return openChats.stream()
//                .map(this::mapToChatDTO)
//                .collect(Collectors.toList());
//    }
//
//    @Override
//    public void resolveChat(Long chatId) {
//        Chat chat = findChatById(chatId);
//        chat.setResolved(true);
//        chatRepository.save(chat);
//    }
//
//    @Override
//    public List<ChatDTO> getResolvedChats() {
//        List<Chat> resolvedChats = chatRepository.findByIsResolvedTrueOrderByLastMessageTimeDesc();
//        return resolvedChats.stream()
//                .map(this::mapToChatDTO)
//                .collect(Collectors.toList());
//    }
//
//    private synchronized User assignAdminRoundRobin() {
//        List<User> admins = userService.getAllAdminUsers();
//        if (admins.isEmpty()) {
//            return null;
//        }
//
//        lastAssignedAdminIndex = (lastAssignedAdminIndex + 1) % admins.size();
//        return admins.get(lastAssignedAdminIndex);
//    }
//
//    private ChatDTO mapToChatDTO(Chat chat) {
//        return new ChatDTO(
//                chat.getId(),
//                chat.getUser1().getUsername(),
//                chat.getUser2().getUsername(),
//                chat.getLastMessageTime(),
//                chat.isResolved()
//        );
//    }
//
//    private MessageDTO mapToMessageDTO(Message message) {
//        return new MessageDTO(
//                message.getId(),
//                message.getChat().getId(),
//                message.getSender().getUsername(),
//                message.getReceiver().getUsername(),
//                message.getMessageText(),
//                message.getTimestamp()
//        );
//    }
//}
