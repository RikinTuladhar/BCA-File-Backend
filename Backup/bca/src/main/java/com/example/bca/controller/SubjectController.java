package com.example.bca.controller;

import com.example.bca.model.Subject;
import com.example.bca.repository.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/subject")
public class SubjectController {

    @Autowired
    public SubjectRepo subjectRepo;

    @GetMapping
    public List<Subject> getSubject(){
        List<Subject> subjectList =  subjectRepo.findAll();
        if(subjectList != null && !subjectList.isEmpty()){
            return subjectList;
        }
        else {
            return null;
        }
    }

    @PostMapping
    public ResponseEntity<Subject> postSubject(@RequestBody Subject subject){
        return ResponseEntity.ok(subjectRepo.save(subject));
    }
}
