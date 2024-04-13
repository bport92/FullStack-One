import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { TripCardComponent } from "../trip-card/trip-card.component";
import { TripDataService } from "../services/trip-data.service";
import { Trip } from "../models/trip";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-trip-listing",
  templateUrl: "./trip-listing.component.html",
  standalone: true,
  imports: [CommonModule, TripCardComponent],
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService], // Moved providers array outside of @Component decorator
})
export class TripListingComponent implements OnInit {
  trips!: Trip[];
  message: string = '';

  constructor(
    private tripDataService: TripDataService,
    private router: Router
  ) {
    console.log('trip-listing constructor');
  }

  addTrip(): void {
    this.router.navigate(["add-trip"]);
  }

  private getTrips(): void {
    console.log("Inside TripListingComponent#getTrips");
    this.message = "Searching for trips";
    this.tripDataService.getTrips().subscribe({
      next: (foundTrips) => {
        this.message = foundTrips.length > 0 ? "" : "No trips found";
        this.trips = foundTrips;
      },
      error: (error) => {
        console.error("Error fetching trips: ", error);
        this.message = "Error fetching trips";
      }
    });
  }

  ngOnInit(): void {
    this.getTrips();
  }
}