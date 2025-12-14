package com.makemytrip.makemytrip;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableCaching
@EnableScheduling
public class MakemytripApplication {

	public static void main(String[] args) {
		SpringApplication.run(MakemytripApplication.class, args);
		System.out.println("\n" +
			"=================================================================\n" +
			"  MakeMyTrip Clone - All 15 Features Implemented Successfully!\n" +
			"=================================================================\n" +
			"  Server running on: http://localhost:8080\n" +
			"  API Documentation: /FEATURES_DOCUMENTATION.md\n" +
			"  Testing Guide: /API_TESTING_GUIDE.md\n" +
			"=================================================================\n" +
			"  ✅ Wishlist Feature\n" +
			"  ✅ Mock Payment Integration\n" +
			"  ✅ Enhanced Search & Filters\n" +
			"  ✅ Booking Confirmation Email\n" +
			"  ✅ Admin Dashboard Analytics\n" +
			"  ✅ Seat/Room Selection\n" +
			"  ✅ Review & Rating System\n" +
			"  ✅ Dynamic Pricing Engine\n" +
			"  ✅ Multi-Currency & Language Support\n" +
			"  ✅ Live Flight Status (Mock)\n" +
			"  ✅ Cancellation & Refunds\n" +
			"  ✅ Loyalty Program\n" +
			"  ✅ Travel Package Bundles\n" +
			"  ✅ AI Recommendations\n" +
			"  ✅ Real-Time Support Chat\n" +
			"=================================================================\n");
	}

}