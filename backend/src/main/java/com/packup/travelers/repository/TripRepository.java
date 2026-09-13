package com.packup.travelers.repository;

import com.packup.travelers.model.TravelMode;
import com.packup.travelers.model.Trip;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TripRepository extends JpaRepository<Trip, Long> {

    List<Trip> findByMode(TravelMode mode);

    @Query("SELECT t FROM Trip t WHERE t.mode = :mode " +
           "AND (:source IS NULL OR LOWER(t.source) LIKE LOWER(CONCAT('%', :source, '%'))) " +
           "AND (:destination IS NULL OR LOWER(t.destination) LIKE LOWER(CONCAT('%', :destination, '%')))")
    List<Trip> search(@Param("mode") TravelMode mode,
                       @Param("source") String source,
                       @Param("destination") String destination);

    @Query("SELECT DISTINCT t.source FROM Trip t")
    List<String> findDistinctSources();

    @Query("SELECT DISTINCT t.destination FROM Trip t")
    List<String> findDistinctDestinations();
}
