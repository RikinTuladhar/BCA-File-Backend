package com.example.bca.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class FileModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_id")
    private Integer id;

    @Column(name = "file_name")
    private String name;

    @Column(name = "filePath")
    private String filePath;

    //uploader user
    @JsonIgnore
    @ManyToMany(mappedBy = "file")
    private Set<User> users = new HashSet<>();

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "subjectid")
    private Subject subject;

    //bookmark user
    @JsonIgnore
    @ManyToMany(mappedBy = "fileBooks")
    Set<User> userBooks = new HashSet<>();



}
