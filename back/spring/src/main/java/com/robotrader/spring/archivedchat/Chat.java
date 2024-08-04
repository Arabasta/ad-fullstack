//package com.robotrader.spring.model;
//
//import jakarta.persistence.*;
//import lombok.Getter;
//import lombok.Setter;
//
//import java.time.LocalDateTime;
//import java.util.Set;
//
//@Getter
//@Setter
//@Entity
//public class Chat {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private Long id;
//
//    @ManyToOne
//    @JoinColumn(name = "user1_id", nullable = false)
//    private User user1;
//
//    @ManyToOne
//    @JoinColumn(name = "user2_id", nullable = false)
//    private User user2;
//
//    @OneToMany(mappedBy = "chat", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
//    private Set<Message> messages;
//
//    @Column(name = "last_message_time", nullable = false)
//    private LocalDateTime lastMessageTime;
//
//    @Column(name = "is_resolved", nullable = false)
//    private boolean isResolved = false;
//}
