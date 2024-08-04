//package com.robotrader.spring.controller.chat;
//
//import com.robotrader.spring.dto.chat.AdminMessageRequestDTO;
//import com.robotrader.spring.dto.chat.ChatDTO;
//import com.robotrader.spring.dto.chat.CustomerMessageRequestDTO;
//import com.robotrader.spring.dto.chat.MessageDTO;
//import com.robotrader.spring.dto.general.ApiResponse;
//import com.robotrader.spring.service.interfaces.IChatService;
//import jakarta.validation.Valid;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.ResponseEntity;
//import org.springframework.security.core.Authentication;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@RequestMapping("/api/v1/chat")
//public class ChatController {
//
//    private final IChatService chatService;
//
//    @Autowired
//    public ChatController(IChatService chatService) {
//        this.chatService = chatService;
//    }
//
//    @GetMapping
//    public ResponseEntity<ApiResponse<List<ChatDTO>>> getChats(Authentication authentication) {
//        String currentUsername = authentication.getName();
//        List<ChatDTO> conversations = chatService.getConversations(currentUsername);
//        return ResponseEntity.ok(new ApiResponse<>("success", "Conversations retrieved successfully", conversations));
//    }
//
//    @PostMapping("/customer/start-new-chat")
//    public ResponseEntity<ApiResponse<ChatDTO>> startNewChat(Authentication authentication) {
//        String customerUsername = authentication.getName();
//        ChatDTO newChat = chatService.startNewChat(customerUsername);
//        return ResponseEntity.ok(new ApiResponse<>("success", "New chat started successfully", newChat));
//    }
//
//    @GetMapping("/{chatId}/messages")
//    public ResponseEntity<ApiResponse<List<MessageDTO>>> getMessages(@PathVariable Long chatId) {
//        List<MessageDTO> messages = chatService.getMessages(chatId);
//        return ResponseEntity.ok(new ApiResponse<>("success", "Messages retrieved successfully", messages));
//    }
//
//    @PostMapping("/customer/send")
//    public ResponseEntity<ApiResponse<Void>> sendCustomerMessage(Authentication authentication,
//                                                                 @Valid @RequestBody CustomerMessageRequestDTO messageRequest) {
//        String senderUsername = authentication.getName();
//        chatService.sendCustomerMessage(senderUsername, messageRequest);
//        return ResponseEntity.ok(new ApiResponse<>("success", "Message sent successfully", null));
//    }
//
//    @PostMapping("/admin/send")
//    public ResponseEntity<ApiResponse<Void>> sendAdminMessage(Authentication authentication,
//                                                              @Valid @RequestBody AdminMessageRequestDTO messageRequest) {
//        String senderUsername = authentication.getName();
//        chatService.sendAdminMessage(senderUsername, messageRequest);
//        return ResponseEntity.ok(new ApiResponse<>("success", "Message sent successfully", null));
//    }
//
//    @PostMapping("/{chatId}/resolve")
//    public ResponseEntity<ApiResponse<Void>> resolveChat(@PathVariable Long chatId) {
//        chatService.resolveChat(chatId);
//        return ResponseEntity.ok(new ApiResponse<>("success", "Chat resolved successfully", null));
//    }
//
//    @GetMapping("/open-chats")
//    public ResponseEntity<ApiResponse<List<ChatDTO>>> getAllOpenChats() {
//        List<ChatDTO> openChats = chatService.getAllOpenChats();
//        return ResponseEntity.ok(new ApiResponse<>("success", "Open chats retrieved successfully", openChats));
//    }
//
//    @GetMapping("/resolved-chats")
//    public ResponseEntity<ApiResponse<List<ChatDTO>>> getResolvedChats() {
//        List<ChatDTO> resolvedChats = chatService.getResolvedChats();
//        return ResponseEntity.ok(new ApiResponse<>("success", "Resolved chats retrieved successfully", resolvedChats));
//    }
//}
