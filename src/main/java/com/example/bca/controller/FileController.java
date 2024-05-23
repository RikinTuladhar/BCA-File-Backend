package com.example.bca.controller;

import com.example.bca.dto.ErrorMessage;
import com.example.bca.dto.FileResponse;
import com.example.bca.model.FileModel;
import com.example.bca.model.Subject;
import com.example.bca.model.User;
import com.example.bca.repository.FileRepo;
import com.example.bca.repository.SubjectRepo;
import com.example.bca.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/file")
@CrossOrigin(origins = "*")
public class FileController {
    @Autowired
    public FileRepo fileRepo;
    @Autowired
    public SubjectRepo subjectRepo;
    @Autowired
    public UserRepository userRepository;

    @GetMapping
    public ResponseEntity<?> getFile() {
        List<FileModel> fileModels = fileRepo.findAll();

        if (fileModels != null && !fileModels.isEmpty()) {
            List<FileResponse> fileResponseList = new ArrayList<>();
            for (FileModel file : fileModels) {
                FileResponse fileResponse = new FileResponse();
                fileResponse.setId(file.getId());
                fileResponse.setName(file.getName());
                fileResponse.setFilePath(file.getFilePath());
                Subject subject = file.getSubject();
                fileResponse.setSubjectName(subject.getName());
                fileResponseList.add(fileResponse);
            }


            return ResponseEntity.ok(fileResponseList);
        }
        ErrorMessage errorMessage = new ErrorMessage("No files");
        return ResponseEntity.badRequest().body(errorMessage);
    }

    //    @PostMapping
//    public ResponseEntity<FileModel> postFile(@RequestBody FileModel fileModel){
//        return ResponseEntity.ok(fileRepo.save(fileModel));
//    }
    @PostMapping("/{subjectid}/{userid}")
    public ResponseEntity<FileModel> postFile(
            @RequestBody FileModel fileModel,
            @PathVariable(name = "subjectid") Integer subjectid,
            @PathVariable(name = "userid") Integer userid
    ) {
        Subject subject = subjectRepo.findById(subjectid).orElseThrow(() -> new RuntimeException("Subject not found"));
        User user = userRepository.findById(userid).orElseThrow(() -> new RuntimeException("User not found"));
        fileModel.setSubject(subject);
        user.file(fileModel);
        fileRepo.save(fileModel);
        userRepository.save(user);

        return ResponseEntity.ok(fileModel);
    }

}