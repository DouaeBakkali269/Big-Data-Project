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

public class Module {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @OneToMany(mappedBy="module", cascade= CascadeType.ALL, orphanRemoval = true)
    private List<Element> elements;

    @ManyToOne
    @JoinColumn(name = "academic_period_id") // Foreign key column points to AcademicPeriod.id
    private AcademicPeriod academicPeriod;
}
