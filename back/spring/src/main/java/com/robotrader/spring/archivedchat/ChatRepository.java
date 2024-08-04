//package com.robotrader.spring.repository;
//
//import com.robotrader.spring.model.Chat;
//import com.robotrader.spring.model.User;
//import org.springframework.data.jpa.repository.JpaRepository;
//import org.springframework.data.jpa.repository.Query;
//import org.springframework.data.repository.query.Param;
//import org.springframework.stereotype.Repository;
//
//import java.util.List;
//import java.util.Optional;
//
//@Repository
//public interface ChatRepository extends JpaRepository<Chat, Long> {
//
//    @Query("SELECT c FROM Chat c WHERE (c.user1.username = :username OR c.user2.username = :username) AND c.isResolved = false")
//    List<Chat> findConversationsByUsername(@Param("username") String username);
//
//    List<Chat> findByIsResolvedFalseOrderByLastMessageTimeDesc();
//
//    @Query("SELECT c FROM Chat c WHERE (c.user1 = :user1 AND c.user2 = :user2) OR (c.user1 = :user2 AND c.user2 = :user1) AND c.isResolved = false")
//    Optional<Chat> findActiveChatBetweenUsers(@Param("user1") User user1, @Param("user2") User user2);
//
//    List<Chat> findByIsResolvedTrueOrderByLastMessageTimeDesc();
//}
//
