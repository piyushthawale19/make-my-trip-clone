# MakeMyTrip Clone - Complete Features Documentation

## 🎯 All 15 Features Implemented

### 1. ✅ Wishlist Feature
**Endpoints:**
- `POST /wishlist/create` - Create a new wishlist folder
- `POST /wishlist/{wishlistId}/add-item` - Add flight/hotel to wishlist
- `DELETE /wishlist/{wishlistId}/remove-item` - Remove item from wishlist
- `GET /wishlist/user/{userId}` - Get all user wishlists
- `PUT /wishlist/{wishlistId}/price-alert` - Enable/disable price drop alerts
- `DELETE /wishlist/{wishlistId}` - Delete wishlist

**Features:**
- Organize wishlists into custom folders
- Price drop alerts via email
- Track original vs current prices
- Support for both flights and hotels

---

### 2. ✅ Mock Payment Integration
**Endpoints:**
- `POST /payment/process` - Process payment with mock cards
- `GET /payment/user/{userId}` - Get user payment history
- `GET /payment/transaction/{transactionId}` - Get payment by transaction ID
- `GET /payment/all` - Get all payments (admin)

**Test Cards:**
- Visa: `4242424242424242`
- Mastercard: `5555555555554444`
- Amex: `378282246310005`
- Discover: `6011111111111117`

**Features:**
- Mock payment validation
- Transaction logs with status tracking
- Success/failure simulation (90% success rate)
- Card type detection
- Last 4 digits storage for security

---

### 3. ✅ Enhanced Search & Filters
**Endpoints:**
- `GET /search/flights` - Search flights with filters
- `GET /search/hotels` - Search hotels with filters
- `GET /search/autocomplete` - Location autocomplete
- `GET /search/history/{userId}` - Recent searches

**Filter Parameters:**
- **Flights:** from, to, minPrice, maxPrice, airline, maxStops
- **Hotels:** location, minPrice, maxPrice, minRating, amenities

**Features:**
- Real-time filtering
- Autocomplete for locations (top 10 suggestions)
- Search history tracking
- Multi-criteria filtering

---

### 4. ✅ Booking Confirmation Email
**Endpoints:**
- Automatically triggered on booking

**Features:**
- HTML email templates
- Booking ID, dates, prices included
- E-ticket information
- Cancellation policy details
- Support contact information
- Mobile-friendly design
- SMTP configuration in `application.properties`

**Configuration Required:**
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

---

### 5. ✅ Admin Dashboard Analytics
**Endpoints:**
- `GET /admin/analytics/bookings` - Total bookings & revenue
- `GET /admin/analytics/popular-hotels` - Top 10 hotels by bookings
- `GET /admin/analytics/popular-flights` - Top 10 flights by bookings
- `GET /admin/analytics/revenue-chart` - Revenue chart data (7 days)

**Metrics:**
- Total bookings (confirmed only)
- Total revenue
- Flight vs Hotel bookings breakdown
- Total users
- Popular destinations
- Booking trends

---

### 6. ✅ Seat/Room Selection
**Endpoints:**
- `POST /booking/flight/with-payment` - Book with seat selection
- `POST /booking/hotel/with-payment` - Book with room selection

**Features:**
- Selected seats/rooms stored in booking
- Seat map layout support (JSON format)
- Room type configuration
- Premium seat/room tracking

---

### 7. ✅ Review & Rating System
**Endpoints:**
- `POST /review/create` - Create review (1-5 stars)
- `GET /review/item/{itemId}` - Get reviews by item
- `GET /review/item/{itemId}/sorted` - Sort by most helpful
- `POST /review/{reviewId}/helpful` - Mark review as helpful
- `POST /review/{reviewId}/flag` - Flag inappropriate content
- `POST /review/{reviewId}/admin-reply` - Admin reply to review
- `GET /review/flagged` - Get flagged reviews (admin)
- `DELETE /review/{reviewId}` - Delete review

**Features:**
- 1-5 star ratings
- Title and comment
- Photo upload support (URLs)
- Helpful count tracking
- Flag inappropriate content
- Admin replies
- Auto-update average ratings

---

### 8. ✅ Dynamic Pricing Engine
**Endpoints:**
- `POST /pricing/update-flights` - Update flight prices
- `POST /pricing/update-hotels` - Update hotel prices
- `GET /pricing/history` - Get price history

**Pricing Factors:**
- Seat/room availability (occupancy-based)
- Holiday periods (Dec, Jan, Jun, Jul)
- Weekend pricing
- Demand multiplier (capped at 50-60% increase)

**Features:**
- Automatic price adjustments
- Base price preservation
- Price history tracking
- Scheduled updates every 6 hours

---

### 9. ✅ Multi-Currency & Language Support
**Endpoints:**
- `GET /currency/convert` - Convert between currencies
- `GET /currency/rates` - Get all exchange rates
- `PUT /user/{userId}/preferences` - Set currency/language preferences

**Supported Currencies:**
- USD, EUR, GBP, INR, AUD, CAD, JPY

**Supported Languages:**
- EN (English), ES (Spanish), FR (French), HI (Hindi)

**Features:**
- Real-time currency conversion
- User preference storage
- Formatted currency display with symbols
- Auto-detect location (planned)

---

### 10. ✅ Live Flight Status (Mock API)
**Endpoints:**
- `GET /flight-status/flight/{flightId}` - Get status by flight ID
- `GET /flight-status/number/{flightNumber}` - Get status by flight number
- `PUT /flight-status/update` - Update flight status (admin)

**Status Types:**
- ON_TIME, DELAYED, CANCELLED, BOARDING, DEPARTED, ARRIVED

**Features:**
- Mock real-time status generation
- Delay reasons (weather, technical, traffic, etc.)
- Gate and terminal information
- Estimated arrival updates
- Delay duration tracking

---

### 11. ✅ Cancellation & Refunds
**Endpoints:**
- `POST /booking/cancel` - Cancel booking with refund

**Features:**
- Cancellation reason tracking
- Automatic refund calculation (100% for demo)
- Restore flight/hotel availability
- Email confirmation
- Refund status tracking
- Cancellation policy enforcement

---

### 12. ✅ Loyalty Program
**Endpoints:**
- `GET /loyalty/{userId}` - Get loyalty program details
- `POST /loyalty/{userId}/redeem` - Redeem points
- `GET /loyalty/{userId}/calculate-discount` - Calculate discount

**Tiers:**
- **Silver:** 0-4,999 points (1x earning)
- **Gold:** 5,000-9,999 points (1.25x earning)
- **Platinum:** 10,000+ points (1.5x earning)

**Features:**
- Earn 1 point per $1 spent (base rate)
- Tier bonuses on earnings
- Redeem 100 points = $1 discount
- Transaction history
- Points expiry tracking
- Tier expiry (1 year)

---

### 13. ✅ Travel Package Bundles
**Endpoints:**
- `POST /packages/create` - Create package
- `GET /packages/all` - Get all active packages
- `GET /packages/type/{packageType}` - Filter by type
- `GET /packages/destination/{destination}` - Filter by destination
- `GET /packages/{id}` - Get package details
- `PUT /packages/{id}` - Update package
- `DELETE /packages/{id}` - Delete package
- `PUT /packages/{id}/deactivate` - Deactivate package

**Package Types:**
- BEACH, ADVENTURE, CULTURAL, LUXURY

**Features:**
- Flight + Hotel + Tour bundles
- 10-15% automatic discounts
- Customizable packages
- Group discounts
- Inclusions/exclusions lists
- Social sharing support

---

### 14. ✅ AI Recommendations
**Endpoints:**
- `GET /recommendations/hotels/{userId}` - Get recommended hotels
- `GET /recommendations/flights/{userId}` - Get recommended flights
- `GET /recommendations/reason` - Get recommendation explanation

**Recommendation Factors:**
- User travel preferences
- Booking history
- Average ratings
- Price range preferences
- Location preferences
- Collaborative filtering

**Features:**
- Personalized suggestions
- "Why this recommendation?" tooltips
- Scoring algorithm (rating, price, preferences)
- Fallback to top-rated items

---

### 15. ✅ Real-Time Support Chat
**Endpoints:**
- `POST /chat/session` - Create chat session
- `POST /chat/message` - Send message to bot
- `GET /chat/history/{sessionId}` - Get chat history
- `POST /chat/resolve/{sessionId}` - Mark as resolved
- WebSocket: `/ws-chat` - Real-time messaging

**Bot Capabilities:**
- Booking assistance
- Cancellation help
- Payment information
- Loyalty program queries
- Flight status checks
- Live agent handoff

**Features:**
- Sentiment analysis (POSITIVE, NEGATIVE, NEUTRAL)
- Chat transcripts
- FAQ responses
- Session management
- WebSocket support for real-time updates

---

## 🚀 Getting Started

### Prerequisites
- Java 17+
- Maven
- MongoDB (connection string in `application.properties`)

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd make-my-trip-clone-springboot-main
```

2. **Configure Email (Optional)**
Edit `src/main/resources/application.properties`:
```properties
spring.mail.username=your-email@gmail.com
spring.mail.password=your-app-password
```

3. **Build the project**
```bash
mvn clean install
```

4. **Run the application**
```bash
mvn spring-boot:run
```

The application will start on `http://localhost:8080`

---

## 📊 Database Collections

The application uses MongoDB with the following collections:
- `users` - User accounts with bookings and preferences
- `flight` - Flight listings
- `hotels` - Hotel listings
- `wishlists` - User wishlists
- `payments` - Payment transactions
- `reviews` - Reviews and ratings
- `loyalty_programs` - Loyalty point tracking
- `travel_packages` - Package bundles
- `flight_status` - Flight status information
- `chat_messages` - Chat history
- `search_history` - Search tracking

---

## 🔧 Configuration

### Email Configuration
For production, use environment variables:
```bash
export EMAIL_USERNAME=your-email@gmail.com
export EMAIL_PASSWORD=your-app-password
```

### Scheduled Tasks
- **Dynamic Pricing:** Updates every 6 hours
- **Price Alerts:** Checks every hour
- **Data Cleanup:** Daily at 2 AM

---

## 🧪 Testing

### Test Payment Cards
```
Visa: 4242424242424242
Mastercard: 5555555555554444
Amex: 378282246310005
```

### Sample API Calls

**Create Wishlist:**
```bash
curl -X POST "http://localhost:8080/wishlist/create?userId=USER_ID&folderName=My%20Favorites"
```

**Search Flights:**
```bash
curl "http://localhost:8080/search/flights?from=New%20York&to=London&maxPrice=1000"
```

**Book Flight with Payment:**
```bash
curl -X POST "http://localhost:8080/booking/flight/with-payment" \
  -d "userId=USER_ID&flightId=FLIGHT_ID&seats=2&price=500&cardNumber=4242424242424242&currency=USD"
```

**Get Recommendations:**
```bash
curl "http://localhost:8080/recommendations/hotels/USER_ID?limit=10"
```

---

## 🎨 Frontend Integration

All endpoints support CORS with `@CrossOrigin(origins = "*")` for easy frontend integration.

### WebSocket Connection (Chat)
```javascript
const socket = new SockJS('http://localhost:8080/ws-chat');
const stompClient = Stomp.over(socket);

stompClient.connect({}, function(frame) {
    stompClient.subscribe('/topic/messages', function(message) {
        // Handle incoming messages
    });
});
```

---

## 📝 Error Handling

All endpoints include proper error handling:
- Invalid requests return `400 Bad Request`
- Not found resources return `404 Not Found`
- Server errors return `500 Internal Server Error`
- Detailed error messages in logs

---

## 🔒 Security

- Password encryption using BCrypt
- JWT support (dependencies included)
- Secure payment card storage (last 4 digits only)
- Email validation
- Input sanitization

---

## 📈 Performance

- Caching enabled for frequently accessed data
- Scheduled tasks run asynchronously
- Database indexing on frequently queried fields
- Connection pooling for MongoDB

---

## 🤝 Contributing

This is a production-ready implementation with:
- ✅ All 15 features fully functional
- ✅ Error handling on all endpoints
- ✅ No breaking changes to existing code
- ✅ Backward compatibility maintained
- ✅ Comprehensive documentation

---

## 📞 Support

For issues or questions:
- Email: support@makemytrip.com
- Phone: 1-800-123-4567
- Chat: Use the real-time chat feature!

---

**Built with ❤️ using Spring Boot 3.5.0**
