package com.example.backend.models;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Session {
    @Id
    @GeneratedValue(strategy = jakarta.persistence.GenerationType.IDENTITY)
    private Long id;

    private String title;
    private String description;
    private Date date;
    private String debutHour;
    private String endHour;

    private  String Link;

    @ManyToMany(mappedBy = "sessions" )
    private List<Users> authors;

    @ManyToOne
    @JoinColumn(name ="element_id")
    private Element element;

}
