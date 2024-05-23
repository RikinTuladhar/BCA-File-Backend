package com.example.bca.service;

import com.example.bca.dto.FileResponse;
import com.example.bca.model.FileModel;
import com.example.bca.repository.FileRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FileService {
    private final FileRepo fileRepo;

    @Autowired
    public FileService(FileRepo fileRepo) {
        this.fileRepo = fileRepo;
    }

    public List<FileResponse> getfile() {
        List<FileModel> fileModel = fileRepo.findAll();
        List<FileResponse> fileResponseList = new ArrayList<>();

        if (fileModel != null && !fileModel.isEmpty()) {
            for (FileModel file : fileModel) {
                FileResponse fileResponse = new FileResponse();
                fileResponse.setId(file.getId());
                fileResponse.setName(file.getName());
                fileResponse.setFilePath(file.getFilePath());
                fileResponseList.add(fileResponse);
            }
        }
        return fileResponseList; // Returning the list, which may be empty if no records were found
    }


    public String postfile(FileModel fileModel) {
        fileRepo.save(fileModel);
        return "File Uploaded";

    }
}
