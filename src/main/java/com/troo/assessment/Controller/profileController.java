package com.troo.assessment.Controller;
import com.troo.assessment.Entity.Profile;
import com.troo.assessment.ProfRepo.ProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class profileController {

    @Autowired
    private ProfileRepository profileRepository;

    @GetMapping(value = "/api/findProfiles")
    public List<Profile> getProfiles() {
        return profileRepository.findAll();
    }

    @PostMapping(value="/api/addProfile")
    public void postProf (@RequestBody Profile profile){
        profileRepository.save(profile);
    }

    @PutMapping(value="/api/updateProfile/{id}")
    public void updateProf(@PathVariable long id, @RequestBody Profile profile) {
        Profile updateProf = profileRepository.findById(id).get();
        updateProf.setFirstName(profile.getFirstName());
        updateProf.setLastName(profile.getLastName());
        updateProf.setMiddleName(profile.getMiddleName());
        updateProf.setEmail(profile.getEmail());
        updateProf.setMobileNumber(profile.getMobileNumber());
        profileRepository.save(updateProf);
    }

    @DeleteMapping(value="/api/deleteProfile/{id}")
    public void deleteProf(@PathVariable long id){
        Profile deleteProf = profileRepository.findById(id).get();
        profileRepository.delete(deleteProf);
    }
}
