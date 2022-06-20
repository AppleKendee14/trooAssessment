package com.troo.assessment.ProfRepo;

import com.troo.assessment.Entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Profile,Long> {
}
