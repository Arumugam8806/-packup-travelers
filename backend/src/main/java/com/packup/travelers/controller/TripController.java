package com.packup.travelers.controller;

import com.packup.travelers.model.TravelMode;
import com.packup.travelers.model.Trip;
import com.packup.travelers.service.TripService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;

@RestController
@RequestMapping("/api/trips")
public class TripController {

    private final TripService tripService;

    @Autowired
    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/search")
    public List<Trip> search(@RequestParam TravelMode mode,
                              @RequestParam(required = false) String source,
                              @RequestParam(required = false) String destination) {
        return tripService.search(mode, source, destination);
    }

    @GetMapping
    public List<Trip> byMode(@RequestParam TravelMode mode) {
        return tripService.findByMode(mode);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Trip> byId(@PathVariable Long id) {
        return tripService.findById(id)
                .map(ResponseEntity::ok)
                .orElseThrow(() -> new NoSuchElementException("Trip not found with id " + id));
    }

    @GetMapping("/locations")
    public Map<String, List<String>> locations() {
        return Map.of(
                "sources", tripService.allSources(),
                "destinations", tripService.allDestinations()
        );
    }
}
