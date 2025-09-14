package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor

public class AcademicPeriod {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String semester;
    private Long period_order;
    private Date startDate;
    private Date endDate;
    private String label;

    @OneToMany(mappedBy="academicPeriod", cascade= CascadeType.ALL, orphanRemoval = true)
    private List<Module> modules;

}
