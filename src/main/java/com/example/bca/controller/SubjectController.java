package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.dto.SubjectResponse;
import com.example.bca.model.SemesterModel;
import com.example.bca.model.Subject;
import com.example.bca.repository.SemesterRepository;
import com.example.bca.repository.SubjectRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/subject")
public class SubjectController {
    @Autowired
    public SubjectRepo subjectRepo;

    @Autowired
    public SemesterRepository semesterRepository;

    //    /subject many to one mapping
    @GetMapping
    public ResponseEntity<?> getSubject() {
        ErrorMessage errorMessage = new ErrorMessage("No Subjects found");
        List<Subject> subjectList = subjectRepo.findAll();
        List<SubjectResponse> subjectResponsesList = new ArrayList<>();
        for (Subject subject : subjectList) {
            SubjectResponse subjectResponse = new SubjectResponse();
            subjectResponse.setId(subject.getId());
            subjectResponse.setName(subject.getName());
            SemesterModel semesterModel = subject.getSemesterModel();
            subjectResponse.setSemesterId(semesterModel.getId());
            subjectResponsesList.add(subjectResponse);
        }
        if (subjectList != null && !subjectList.isEmpty()) {
            return ResponseEntity.ok(subjectResponsesList);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
        }
    }

    //    /subject/semester_id
    @GetMapping("/{semester_id}")
    public ResponseEntity<?> getSubjectBySemesterId(@PathVariable("semester_id") Integer semester_id) {
//        Optional<SemesterModel> = semesterRepository.findById(semester_id);
        List<Subject> subjectList = subjectRepo.findSubjectBySemesterId(semester_id);
        return ResponseEntity.ok(subjectList);
    }


    //    /subject/semester_id    many to one posting data
    @PostMapping("/{semester_id}")
    public ResponseEntity<?> postSubject(
            @RequestBody Subject subject,
            @PathVariable("semester_id") Integer semester_id
    ) {
        if (validSubject(subject)) {
            SemesterModel semesterModel = semesterRepository.findById(semester_id).orElseThrow(() -> new RuntimeException("Not Found"));
            ErrorMessage errorMessage1 = new ErrorMessage("Subject not found");
            if (semesterModel == null) return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage1);
            subject.setSemesterModel(semesterModel);
            return ResponseEntity.ok(subjectRepo.save(subject));
        }
        ErrorMessage errorMessage2 = new ErrorMessage("Not all fileds filled");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage2);

    }

    private boolean validSubject(Subject subject) {
        return subject.getName() != null && !subject.getName().isEmpty();
    }
}
