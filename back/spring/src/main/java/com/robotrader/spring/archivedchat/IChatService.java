//package com.robotrader.spring.service.interfaces;
//
//import com.robotrader.spring.dto.chat.*;
//import com.robotrader.spring.model.Chat;
//import jakarta.transaction.Transactional;
//
//import java.util.List;
//
//public interface IChatService {
//    Chat findChatById(Long chatId);
//
//    List<ChatDTO> getConversations(String username);
//
//    List<MessageDTO> getMessages(Long chatId);
//
//
//    List<ChatDTO> getAllOpenChats();
//
//    @Transactional
//    ChatDTO startNewChat(String customerUsername);
//
//    void sendAdminMessage(String senderUsername, AdminMessageRequestDTO messageRequest);
//
//    void sendCustomerMessage(String senderUsername, CustomerMessageRequestDTO messageRequest);
//
//    void resolveChat(Long chatId);
//
//    List<ChatDTO> getResolvedChats();
//}
