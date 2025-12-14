import axios from "axios";

// Use localhost for development, deployed URL for production
// Use localhost for development, deployed URL for production
const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
console.log("Current API Config:", {
  envUrl: process.env.NEXT_PUBLIC_API_URL,
  finalUrl: BACKEND_URL
});

export const login = async (email, password) => {
  try {
    const url = `${BACKEND_URL}/user/login?email=${email}&password=${password}`;
    const res = await axios.post(url);
    const data = res.data;
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  firstName,
  lastName,
  email,
  phoneNumber,
  password
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/user/signup`, {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
    });
    const data = res.data;
    // console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const getuserbyemail = async (email) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/user/email?email=${email}`);
    const data = res.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const editprofile = async (
  id,
  firstName,
  lastName,
  email,
  phoneNumber
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/user/edit?id=${id}`, {
      firstName,
      lastName,
      email,
      phoneNumber,
    });
    const data = res.data;
    return data;
  } catch (error) { }
};
export const getflight = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/flight`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error getting flights:", error);
    throw error;
  }
};

export const addflight = async (
  flightName,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  availableSeats
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/flight`, {
      flightName,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      availableSeats,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const editflight = async (
  id,
  flightName,
  from,
  to,
  departureTime,
  arrivalTime,
  price,
  availableSeats
) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/admin/flight/${id}`, {
      flightName,
      from,
      to,
      departureTime,
      arrivalTime,
      price,
      availableSeats,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const gethotel = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/hotel`);
    const data = res.data;
    return data;
  } catch (error) {
    console.log("Error getting hotels:", error);
    throw error;
  }
};

export const addhotel = async (
  hotelName,
  location,
  pricePerNight,
  availableRooms,
  amenities
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/hotel`, {
      hotelName,
      location,
      pricePerNight,
      availableRooms,
      amenities,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const edithotel = async (
  id,
  hotelName,
  location,
  pricePerNight,
  availableRooms,
  amenities
) => {
  try {
    const res = await axios.put(`${BACKEND_URL}/admin/hotel/${id}`, {
      hotelName,
      location,
      pricePerNight,
      availableRooms,
      amenities,
    });
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handleflightbooking = async (userId, flightId, seats, price) => {
  try {
    const url = `${BACKEND_URL}/booking/flight?userId=${userId}&flightId=${flightId}&seats=${seats}&price=${price}`;
    const res = await axios.post(url);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const handlehotelbooking = async (userId, hotelId, rooms, price) => {
  try {
    const url = `${BACKEND_URL}/booking/hotel?userId=${userId}&hotelId=${hotelId}&rooms=${rooms}&price=${price}`;
    const res = await axios.post(url);
    const data = res.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

// ============ WISHLIST APIs ============
export const createWishlist = async (userId, folderName) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/wishlist/create?userId=${userId}&folderName=${encodeURIComponent(
        folderName
      )}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "Wishlist creation error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const addToWishlist = async (
  wishlistId,
  itemId,
  itemType,
  priceDropAlert = false
) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/wishlist/${wishlistId}/add-item`,
      null,
      {
        params: { itemId, itemType, priceDropAlert },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserWishlists = async (userId) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/wishlist/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const removeFromWishlist = async (wishlistId, itemId) => {
  try {
    const res = await axios.delete(
      `${BACKEND_URL}/wishlist/${wishlistId}/remove-item`,
      {
        params: { itemId },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ PAYMENT APIs ============
export const processPayment = async (
  userId,
  bookingId,
  amount,
  currency,
  cardNumber,
  bookingType
) => {
  try {
    const candidates = [
      `${BACKEND_URL}/payment/process`,
      `${BACKEND_URL}/api/payment/process`,
      `/api/payment/process`,
    ];

    let lastError;
    for (const url of candidates) {
      try {
        const res = await axios.post(url, null, {
          params: {
            userId,
            bookingId,
            amount,
            currency,
            cardNumber,
            bookingType,
          },
        });
        return res.data;
      } catch (err) {
        lastError = err;
        if (!(err?.response?.status === 404 || !err?.response)) {
          throw err;
        }
      }
    }
    throw lastError || new Error("Payment API not reachable");
  } catch (error) {
    throw error;
  }
};

export const getUserPayments = async (userId) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/payment/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ BOOKING WITH PAYMENT APIs ============
export const bookFlightWithPayment = async (
  userId,
  flightId,
  seats,
  price,
  cardNumber,
  selectedSeats,
  currency = "USD"
) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/booking/flight/with-payment`,
      null,
      {
        params: {
          userId,
          flightId,
          seats,
          price,
          cardNumber,
          selectedSeats,
          currency,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const bookHotelWithPayment = async (
  userId,
  hotelId,
  rooms,
  price,
  cardNumber,
  selectedRooms,
  currency = "USD"
) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/booking/hotel/with-payment`,
      null,
      {
        params: {
          userId,
          hotelId,
          rooms,
          price,
          cardNumber,
          selectedRooms,
          currency,
        },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const cancelBooking = async (userId, bookingId, cancellationReason) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/booking/cancel`, null, {
      params: { userId, bookingId, cancellationReason },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ SEARCH APIs ============
export const searchFlights = async (
  userId,
  from,
  to,
  minPrice,
  maxPrice,
  airline,
  maxStops
) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/search/flights`, {
      params: { userId, from, to, minPrice, maxPrice, airline, maxStops },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const searchHotels = async (
  userId,
  location,
  minPrice,
  maxPrice,
  minRating,
  amenities
) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/search/hotels`, {
      params: { userId, location, minPrice, maxPrice, minRating, amenities },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAutocomplete = async (query, type) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/search/autocomplete`, {
      params: { query, type },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getSearchHistory = async (userId, limit = 10) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/search/history/${userId}`, {
      params: { limit },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ REVIEW APIs ============
export const createReview = async (
  userId,
  userName,
  itemId,
  itemType,
  rating,
  title,
  comment
) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/review/create`, null, {
      params: { userId, userName, itemId, itemType, rating, title, comment },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getReviews = async (itemId, itemType) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/review/item/${itemId}`, {
      params: { itemType },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const markReviewHelpful = async (reviewId, userId) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/review/${reviewId}/helpful`,
      null,
      {
        params: { userId },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ LOYALTY APIs ============
export const getLoyaltyProgram = async (userId) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/loyalty/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const redeemPoints = async (userId, points, description) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/loyalty/${userId}/redeem`,
      null,
      {
        params: { points, description },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const calculateDiscount = async (userId, points) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/loyalty/${userId}/calculate-discount`,
      {
        params: { points },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ TRAVEL PACKAGES APIs ============
export const getAllPackages = async () => {
  try {
    const candidates = [
      `${BACKEND_URL}/packages/all`,
      `${BACKEND_URL}/api/packages/all`,
      `/api/packages/all`, // Next.js local proxy fallback
    ];

    let lastError;
    for (const url of candidates) {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch (err) {
        lastError = err;
        // try next candidate on 404 or network errors
        if (!(err?.response?.status === 404 || !err?.response)) {
          throw err;
        }
      }
    }
    throw lastError || new Error("Packages API not reachable");
  } catch (error) {
    throw error;
  }
};

export const getPackagesByType = async (packageType) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/packages/type/${packageType}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ FLIGHT STATUS APIs ============
export const getFlightStatus = async (flightId) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/flight-status/flight/${flightId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getFlightStatusByNumber = async (flightNumber) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/flight-status/number/${flightNumber}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ RECOMMENDATIONS APIs ============
export const getRecommendedHotels = async (userId, limit = 10) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/recommendations/hotels/${userId}`,
      {
        params: { limit },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getRecommendedFlights = async (userId, limit = 10) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/recommendations/flights/${userId}`,
      {
        params: { limit },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getRecommendationReason = async (itemId, itemType, userId) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/recommendations/reason`, {
      params: { itemId, itemType, userId },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ CURRENCY APIs ============
export const convertCurrency = async (amount, from, to) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/currency/convert`, {
      params: { amount, from, to },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getCurrencyRates = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/currency/rates`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ CHAT APIs ============
export const createChatSession = async () => {
  try {
    const candidates = [
      `${BACKEND_URL}/chat/session`,
      `${BACKEND_URL}/api/chat/session`,
      `/api/chat/session`,
    ];

    let lastError;
    for (const url of candidates) {
      try {
        const res = await axios.post(url);
        return res.data;
      } catch (err) {
        lastError = err;
        if (!(err?.response?.status === 404 || !err?.response)) {
          throw err;
        }
      }
    }
    throw lastError || new Error("Chat session API not reachable");
  } catch (error) {
    throw error;
  }
};

export const sendChatMessage = async (sessionId, userId, userName, message) => {
  try {
    const candidates = [
      `${BACKEND_URL}/chat/message`,
      `${BACKEND_URL}/api/chat/message`,
      `/api/chat/message`,
    ];

    let lastError;
    for (const url of candidates) {
      try {
        const res = await axios.post(url, null, {
          params: { sessionId, userId, userName, message },
        });
        return res.data;
      } catch (err) {
        lastError = err;
        if (!(err?.response?.status === 404 || !err?.response)) {
          throw err;
        }
      }
    }
    throw lastError || new Error("Chat message API not reachable");
  } catch (error) {
    throw error;
  }
};

export const getChatHistory = async (sessionId) => {
  try {
    const candidates = [
      `${BACKEND_URL}/chat/history/${sessionId}`,
      `${BACKEND_URL}/api/chat/history/${sessionId}`,
      `/api/chat/history/${sessionId}`,
    ];

    let lastError;
    for (const url of candidates) {
      try {
        const res = await axios.get(url);
        return res.data;
      } catch (err) {
        lastError = err;
        if (!(err?.response?.status === 404 || !err?.response)) {
          throw err;
        }
      }
    }
    throw lastError || new Error("Chat history API not reachable");
  } catch (error) {
    throw error;
  }
};

// ============ ADMIN ANALYTICS APIs ============
export const getBookingAnalytics = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/admin/analytics/bookings`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularHotels = async () => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/admin/analytics/popular-hotels`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getPopularFlights = async () => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/admin/analytics/popular-flights`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getRevenueChart = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/admin/analytics/revenue-chart`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ USER PREFERENCES APIs ============
export const updateUserPreferences = async (
  userId,
  currency,
  language,
  preferences
) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  try {
    const res = await axios.put(
      `${BACKEND_URL}/user/${userId}/preferences?currency=${currency}&language=${language}`
    );
    return res.data;
  } catch (error) {
    console.error(
      "Update preferences error:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export const getUserById = async (userId) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/user/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ TRANSACTION LOG APIs ============
export const getTransactionLog = async (userId) => {
  try {
    const res = await axios.get(
      `${BACKEND_URL}/payment/transactions/${userId}`
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getAllTransactions = async () => {
  try {
    const res = await axios.get(`${BACKEND_URL}/admin/transactions`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ EMAIL NOTIFICATION APIs ============
export const sendBookingConfirmationEmail = async (userId, bookingId) => {
  try {
    const res = await axios.post(
      `${BACKEND_URL}/email/booking-confirmation`,
      null,
      {
        params: { userId, bookingId },
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

// ============ USER ACTIVITY APIs ============
export const logUserActivity = async (userId, action, details) => {
  try {
    const res = await axios.post(`${BACKEND_URL}/admin/log-activity`, null, {
      params: { userId, action, details },
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const getUserActivities = async (userId) => {
  try {
    const res = await axios.get(`${BACKEND_URL}/admin/activities/${userId}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};
