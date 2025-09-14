package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class Element {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @ManyToOne
    @JoinColumn(name = "module_id") // Foreign key column points to Module.id
    private Module module;

    @OneToMany(mappedBy="element", cascade= CascadeType.ALL, orphanRemoval = true)
    private List<Session> sessions;
}
