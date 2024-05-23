package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.model.Subject;
import com.example.bca.repository.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<?> getSubject(){
        ErrorMessage errorMessage = new ErrorMessage("No Subjects found");
        List<Subject> subjectList =  subjectRepo.findAll();
        if(subjectList != null && !subjectList.isEmpty()){
            return  ResponseEntity.ok(subjectList);
        }
        else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    @PostMapping
    public ResponseEntity<?> postSubject(@RequestBody Subject subject){
        if(validSubject(subject)){
            return ResponseEntity.ok(subjectRepo.save(subject));
        }
        ErrorMessage errorMessage = new ErrorMessage("Not all fileds filled");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);

    }

    private boolean validSubject(Subject subject) {
        return subject.getName()!= null && !subject.getName().isEmpty();
    }
}
