# Quick Start Guide - MakeMyTrip Clone

## 🚀 Get Started in 5 Minutes

### Prerequisites
- ✅ Java 17 or higher
- ✅ Maven 3.6+
- ✅ MongoDB (connection string in application.properties)
- ✅ IDE (IntelliJ IDEA, Eclipse, or VS Code)

---

## Step 1: Clone & Navigate
```bash
cd make-my-trip-clone-springboot-main
```

---

## Step 2: Configure (Optional)

### Email Configuration (Optional - for booking confirmations)
Edit `src/main/resources/application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

**To get Gmail app password:**
1. Go to Google Account settings
2. Security → 2-Step Verification
3. App passwords → Generate new password
4. Use generated password in application.properties

**Note:** Email features will work without this, but emails won't be sent.

---

## Step 3: Build & Run
```bash
# Build the project
mvn clean install

# Run the application
mvn spring-boot:run
```

**Alternative:** Run from IDE
- Open project in your IDE
- Run `MakemytripApplication.java`

---

## Step 4: Verify It's Running

### Check Console Output
You should see:
```
=================================================================
  MakeMyTrip Clone - All 15 Features Implemented Successfully!
=================================================================
  Server running on: http://localhost:8080
  ...
  ✅ Wishlist Feature
  ✅ Mock Payment Integration
  ... (all 15 features listed)
=================================================================
```

### Test Basic Endpoint
Open browser or use curl:
```bash
curl http://localhost:8080/
```

Expected response: `✅ It's running on port 8080!`

---

## Step 5: Test Key Features

### 1. Create a User
```bash
curl -X POST http://localhost:8080/user/signup \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "password": "password123",
    "phoneNumber": "+1234567890"
  }'
```

**Save the returned `_id` - you'll need it!**

### 2. Search Flights
```bash
curl "http://localhost:8080/search/flights?from=New%20York&to=London&maxPrice=1000"
```

### 3. Book Flight with Payment
```bash
curl -X POST "http://localhost:8080/booking/flight/with-payment" \
  -d "userId=YOUR_USER_ID" \
  -d "flightId=FLIGHT_ID_FROM_SEARCH" \
  -d "seats=2" \
  -d "price=500" \
  -d "cardNumber=4242424242424242" \
  -d "currency=USD"
```

**Test Card:** `4242424242424242` (always succeeds)

### 4. Check Loyalty Points
```bash
curl http://localhost:8080/loyalty/YOUR_USER_ID
```

### 5. Try the Chat Bot
```bash
# Create session
curl -X POST http://localhost:8080/chat/session

# Send message
curl -X POST "http://localhost:8080/chat/message" \
  -d "sessionId=RETURNED_SESSION_ID" \
  -d "userId=YOUR_USER_ID" \
  -d "userName=John" \
  -d "message=How do I cancel my booking?"
```

---

## 📚 Next Steps

### Explore All Features
1. **Wishlist** - Save favorite flights/hotels
2. **Reviews** - Rate and review bookings
3. **Packages** - Browse travel bundles
4. **Recommendations** - Get personalized suggestions
5. **Admin Dashboard** - View analytics

### Full Documentation
- **Features Guide:** `FEATURES_DOCUMENTATION.md`
- **API Reference:** `API_TESTING_GUIDE.md`
- **Implementation Details:** `IMPLEMENTATION_SUMMARY.md`

---

## 🧪 Testing with Postman

### Import Collection
1. Open Postman
2. Create new collection: "MakeMyTrip API"
3. Add environment variable: `baseUrl = http://localhost:8080`
4. Import requests from `API_TESTING_GUIDE.md`

### Sample Workflow
1. Sign up user
2. Login
3. Search flights/hotels
4. Add to wishlist
5. Book with payment
6. Leave review
7. Check loyalty points
8. Get recommendations

---

## 🎯 Feature Highlights

### 1. Wishlist (Feature #1)
```bash
# Create wishlist
POST /wishlist/create?userId={id}&folderName=Summer%20Trips

# Add item with price alert
POST /wishlist/{wishlistId}/add-item?itemId={id}&itemType=FLIGHT&priceDropAlert=true
```

### 2. Mock Payment (Feature #2)
**Test Cards:**
- Visa: `4242424242424242`
- Mastercard: `5555555555554444`
- Amex: `378282246310005`

### 3. Enhanced Search (Feature #3)
```bash
# Search with filters
GET /search/flights?from=NYC&to=LAX&minPrice=100&maxPrice=500&airline=Delta&maxStops=1

# Autocomplete
GET /search/autocomplete?query=New&type=FLIGHT
```

### 4. Admin Analytics (Feature #5)
```bash
# Get booking stats
GET /admin/analytics/bookings

# Popular hotels
GET /admin/analytics/popular-hotels

# Revenue chart
GET /admin/analytics/revenue-chart
```

### 5. Loyalty Program (Feature #12)
```bash
# Check points
GET /loyalty/{userId}

# Redeem points
POST /loyalty/{userId}/redeem?points=500&description=Discount

# Calculate discount
GET /loyalty/{userId}/calculate-discount?points=1000
```

---

## 🔧 Troubleshooting

### Issue: Port 8080 already in use
**Solution:** Change port in `application.properties`:
```properties
server.port=8081
```

### Issue: MongoDB connection failed
**Solution:** Check MongoDB URI in `application.properties`:
```properties
spring.data.mongodb.uri=mongodb+srv://username:password@cluster.mongodb.net/
```

### Issue: Email not sending
**Solution:** 
- Configure Gmail app password (see Step 2)
- Or ignore - bookings still work without email

### Issue: Build fails
**Solution:**
```bash
# Clean and rebuild
mvn clean install -U

# Skip tests if needed
mvn clean install -DskipTests
```

---

## 📊 Database Setup

### MongoDB Collections (Auto-created)
The application will automatically create these collections:
- `users` - User accounts
- `flight` - Flight listings
- `hotels` - Hotel listings
- `wishlists` - User wishlists
- `payments` - Payment transactions
- `reviews` - Reviews and ratings
- `loyalty_programs` - Loyalty tracking
- `travel_packages` - Package bundles
- `flight_status` - Flight status
- `chat_messages` - Chat history
- `search_history` - Search tracking

**No manual setup required!**

---

## 🎨 Frontend Integration

### CORS Enabled
All endpoints support CORS with `*` origin - ready for any frontend!

### WebSocket for Chat
```javascript
// Connect to chat
const socket = new SockJS('http://localhost:8080/ws-chat');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    stompClient.subscribe('/topic/messages', function(message) {
        console.log('New message:', message.body);
    });
});
```

### Sample React Integration
```javascript
// Search flights
const searchFlights = async () => {
  const response = await fetch(
    'http://localhost:8080/search/flights?from=NYC&to=LAX'
  );
  const flights = await response.json();
  return flights;
};

// Book with payment
const bookFlight = async (userId, flightId, seats, price) => {
  const response = await fetch(
    'http://localhost:8080/booking/flight/with-payment',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        userId,
        flightId,
        seats,
        price,
        cardNumber: '4242424242424242',
        currency: 'USD'
      })
    }
  );
  return response.json();
};
```

---

## 📈 Performance Tips

### Scheduled Tasks
The application runs these automatically:
- **Every 6 hours:** Update flight/hotel prices
- **Every hour:** Check wishlist price drops
- **Daily at 2 AM:** Data cleanup

### Caching
Caching is enabled for better performance. Clear cache if needed:
```bash
# Restart application to clear cache
mvn spring-boot:run
```

---

## 🎓 Learning the Codebase

### Start Here
1. `MakemytripApplication.java` - Main entry point
2. `controllers/` - REST endpoints
3. `services/` - Business logic
4. `models/` - Data models
5. `repositories/` - Database access

### Key Files
- **Booking Flow:** `BookingService.java`, `BookingController.java`
- **Payment:** `PaymentService.java`
- **Search:** `SearchService.java`
- **Recommendations:** `RecommendationService.java`
- **Chat:** `ChatService.java`, `WebSocketConfig.java`

---

## ✅ Success Checklist

After following this guide, you should have:
- ✅ Application running on port 8080
- ✅ Created a test user
- ✅ Searched for flights/hotels
- ✅ Made a test booking with payment
- ✅ Checked loyalty points
- ✅ Tested chat bot

---

## 🎉 You're All Set!

**All 15 features are now running and ready to use!**

### What's Next?
1. Explore all features using `API_TESTING_GUIDE.md`
2. Read feature details in `FEATURES_DOCUMENTATION.md`
3. Build your frontend
4. Customize for your needs

### Need Help?
- Check documentation files
- Review code comments
- Test with provided examples

---

**Happy Coding! 🚀**

Built with Spring Boot 3.5.0 | MongoDB | Java 17
