# 🔧 Troubleshooting Guide - MakeMyTrip Clone

## ✅ FIXED: All 404 Errors

### Problem
Frontend was calling the deployed backend URL that didn't have the new endpoints:
```
https://make-my-trip-clone-springboot-1-wbv2.onrender.com
```

### Solution ✅
Changed API URL to localhost in `makemytour/src/api/index.js`:
```javascript
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
```

---

## 🚀 Quick Start (No Errors)

### 1. Start Backend First
```bash
cd make-my-trip-clone-springboot-main
mvn spring-boot:run
```
**Wait for:** `Started MakemytripApplication` message

### 2. Start Frontend
```bash
cd makemytour
npm install  # Only first time
npm run dev
```
**Access:** http://localhost:3000

---

## ❌ Common Issues & Solutions

### Issue 1: 404 Errors on API Calls
**Symptoms:**
```
GET http://localhost:8080/search/flights 404 (Not Found)
GET http://localhost:8080/packages/all 404 (Not Found)
```

**Solution:**
1. Make sure backend is running on port 8080
2. Check `src/api/index.js` has correct URL:
   ```javascript
   const BACKEND_URL = "http://localhost:8080";
   ```
3. Restart frontend: `npm run dev`

---

### Issue 2: Backend Not Starting
**Symptoms:**
```
Port 8080 already in use
```

**Solution:**
```bash
# Windows
netstat -ano | findstr :8080
taskkill /PID <PID> /F

# Or change port in application.properties
server.port=8081
```

---

### Issue 3: MongoDB Connection Error
**Symptoms:**
```
MongoTimeoutException: Timed out after 30000 ms
```

**Solution:**
1. Check `application.properties`:
   ```properties
   spring.data.mongodb.uri=mongodb+srv://your-connection-string
   ```
2. Verify MongoDB Atlas is accessible
3. Check IP whitelist in MongoDB Atlas

---

### Issue 4: Frontend Build Errors
**Symptoms:**
```
Module not found: Can't resolve '@/components/...'
```

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules .next
npm install
npm run dev
```

---

### Issue 5: Payment Modal Not Opening
**Symptoms:**
- Click "Proceed to Payment" but nothing happens

**Solution:**
1. Check browser console for errors
2. Verify `PaymentModal.tsx` is imported
3. Check user is logged in
4. Verify booking details are passed correctly

---

### Issue 6: Reviews Not Loading
**Symptoms:**
- Reviews section shows "Loading..." forever

**Solution:**
1. Check backend endpoint: `GET /review/item/{itemId}`
2. Verify itemId and itemType are correct
3. Check browser console for API errors
4. Ensure backend ReviewController is running

---

### Issue 7: Seat Selection Not Working
**Symptoms:**
- Clicking seats doesn't select them

**Solution:**
1. Check `booking/[id].tsx` page loads
2. Verify flight/hotel data is loaded
3. Check state management (useState)
4. Look for JavaScript errors in console

---

### Issue 8: Cancellation Not Working
**Symptoms:**
- Cancel button doesn't work
- No refund calculated

**Solution:**
1. Verify `cancelBooking` API function exists
2. Check booking has valid `_id`
3. Ensure user is logged in
4. Check backend `/booking/cancel` endpoint

---

### Issue 9: Currency Not Changing
**Symptoms:**
- Selected currency doesn't persist

**Solution:**
1. Check `updateUserPreferences` API call
2. Verify localStorage is working
3. Check Redux state update
4. Reload page after selection

---

### Issue 10: Chat Support Not Responding
**Symptoms:**
- Messages sent but no response

**Solution:**
1. Check WebSocket connection
2. Verify backend ChatController
3. Check session ID is created
4. Look for WebSocket errors in console

---

## 🧪 Testing Checklist

### Backend Testing
```bash
# Test if backend is running
curl http://localhost:8080

# Test specific endpoint
curl http://localhost:8080/flight

# Test with parameters
curl "http://localhost:8080/search/flights?from=Delhi&to=Mumbai"
```

### Frontend Testing
1. ✅ Open http://localhost:3000
2. ✅ Login/Signup works
3. ✅ Search page loads
4. ✅ Packages page loads
5. ✅ Flight status page loads
6. ✅ Wishlist page loads (after login)
7. ✅ Loyalty page loads (after login)
8. ✅ Profile page loads (after login)
9. ✅ Chat button appears
10. ✅ No console errors

---

## 🔍 Debug Mode

### Enable Detailed Logging

**Backend (application.properties):**
```properties
logging.level.com.makemytrip=DEBUG
logging.level.org.springframework.web=DEBUG
```

**Frontend (api/index.js):**
```javascript
// Add console logs
export const searchFlights = async (...params) => {
  console.log('Calling searchFlights with:', params);
  try {
    const res = await axios.get(...);
    console.log('Response:', res.data);
    return res.data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
```

---

## 📱 Browser Console Errors

### Common Console Errors

**1. CORS Error**
```
Access to XMLHttpRequest blocked by CORS policy
```
**Fix:** Add CORS config in Spring Boot (already done)

**2. Network Error**
```
net::ERR_CONNECTION_REFUSED
```
**Fix:** Backend not running, start it first

**3. 401 Unauthorized**
```
Request failed with status code 401
```
**Fix:** User not logged in or token expired

**4. Type Error**
```
Cannot read property 'map' of undefined
```
**Fix:** Data not loaded yet, add loading state

---

## 🛠️ Development Tools

### Recommended Browser Extensions
- React Developer Tools
- Redux DevTools
- JSON Viewer
- Postman (for API testing)

### VS Code Extensions
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- Auto Rename Tag
- Prettier
- ESLint

---

## 📊 Performance Issues

### Slow Page Load
**Solutions:**
1. Check network tab in browser
2. Optimize images
3. Enable caching
4. Use lazy loading
5. Minimize API calls

### High Memory Usage
**Solutions:**
1. Clear browser cache
2. Close unused tabs
3. Check for memory leaks
4. Restart development server

---

## 🔐 Security Checklist

✅ API keys not in frontend code  
✅ User passwords hashed  
✅ CORS configured properly  
✅ Input validation on backend  
✅ SQL injection prevention (MongoDB)  
✅ XSS protection  
✅ CSRF tokens (if needed)  

---

## 📞 Still Having Issues?

### Check These Files
1. `makemytour/src/api/index.js` - API configuration
2. `application.properties` - Backend configuration
3. `package.json` - Dependencies
4. `pom.xml` - Maven dependencies

### Verify Versions
```bash
# Node version
node --version  # Should be 18+

# Java version
java --version  # Should be 17+

# Maven version
mvn --version   # Should be 3.6+
```

### Clean Install
```bash
# Backend
mvn clean install

# Frontend
rm -rf node_modules .next
npm install
```

---

## ✅ Success Indicators

### Backend Running Successfully
```
Started MakemytripApplication in X seconds
Server running on: http://localhost:8080
All 15 Features Implemented Successfully!
```

### Frontend Running Successfully
```
ready - started server on 0.0.0.0:3000
event - compiled client and server successfully
```

### No Console Errors
- No red errors in browser console
- API calls returning 200 status
- Data loading correctly
- UI rendering properly

---

## 🎯 Quick Fixes

### Reset Everything
```bash
# Stop all servers (Ctrl+C)

# Backend
cd make-my-trip-clone-springboot-main
mvn clean install
mvn spring-boot:run

# Frontend (new terminal)
cd makemytour
rm -rf node_modules .next
npm install
npm run dev
```

### Clear Browser Data
1. Open DevTools (F12)
2. Application tab
3. Clear storage
4. Reload page (Ctrl+R)

---

## 📝 Logging Best Practices

### What to Log
- API request parameters
- API response data
- Error messages
- State changes
- User actions

### Where to Look
- **Backend:** Console where `mvn spring-boot:run` is running
- **Frontend:** Browser console (F12)
- **Network:** Browser Network tab
- **Database:** MongoDB Atlas logs

---

## 🎉 Everything Working?

If all features are working:
1. ✅ Backend running on port 8080
2. ✅ Frontend running on port 3000
3. ✅ No 404 errors
4. ✅ All pages loading
5. ✅ API calls successful
6. ✅ Payment modal working
7. ✅ Seat selection working
8. ✅ Reviews loading
9. ✅ Chat responding
10. ✅ No console errors

**Congratulations! Your MakeMyTrip clone is production-ready! 🚀**

---

**Need More Help?**
- Check `IMPLEMENTATION_COMPLETE.md` for feature details
- Check `FRONTEND_FEATURES.md` for frontend guide
- Check `API_TESTING_GUIDE.md` for API reference
- Check `SETUP_GUIDE.md` for setup instructions
