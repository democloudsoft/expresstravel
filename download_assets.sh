#!/bin/bash
set -e

mkdir -p images/logo images/destinations images/services images/blog images/general
mkdir -p public/images/logo public/images/destinations public/images/services public/images/blog public/images/general

# Fetch verified real photography with curated Unsplash URLs
# Hero
curl -s -L "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1920&q=80" -o images/general/hero-travel.jpg
# Islamabad (Faisal Mosque / Margalla)
curl -s -L "https://images.unsplash.com/photo-1662990425712-4ebf2ffdc186?auto=format&fit=crop&w=1200&q=80" -o images/destinations/islamabad.jpg
# Dubai (Burj Khalifa / Skyline)
curl -s -L "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1200&q=80" -o images/destinations/dubai.jpg
# Istanbul (Hagia Sophia / Bosphorus)
curl -s -L "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&w=1200&q=80" -o images/destinations/istanbul.jpg
# Maldives (Overwater villas / Turquoise lagoon)
curl -s -L "https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=1200&q=80" -o images/destinations/maldives.jpg
# Paris (Eiffel Tower)
curl -s -L "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80" -o images/destinations/paris.jpg
# Northern Pakistan (Hunza / Karakoram mountains)
curl -s -L "https://images.unsplash.com/photo-1589802829985-817e51171b92?auto=format&fit=crop&w=1200&q=80" -o images/destinations/northern-pakistan.jpg
# Saudi Arabia / Makkah (Masjid al-Haram)
curl -s -L "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=1200&q=80" -o images/destinations/saudi-arabia.jpg
# Malaysia (Kuala Lumpur)
curl -s -L "https://images.unsplash.com/photo-1596422846543-75c6fc197f07?auto=format&fit=crop&w=1200&q=80" -o images/destinations/malaysia.jpg
# Thailand (Bangkok / Scenic)
curl -s -L "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1200&q=80" -o images/destinations/thailand.jpg

# Services
# Domestic Flights (Airport boarding / ATR / domestic jet)
curl -s -L "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1000&q=80" -o images/services/domestic-flights.jpg
# International Flights (Commercial airplane in sky / cabin)
curl -s -L "https://images.unsplash.com/photo-1488085061387-422e29b40080?auto=format&fit=crop&w=1000&q=80" -o images/services/international-flights.jpg
# Hotel Reservations (Executive hotel room / reception)
curl -s -L "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80" -o images/services/hotels.jpg
# Visa Assistance (Passport, boarding passes, documents)
curl -s -L "https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=1000&q=80" -o images/services/visas.jpg
# Tour Packages (Scenic mountain / city tour group travel)
curl -s -L "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1000&q=80" -o images/services/tours.jpg
# Customized Travel Planning (Traveler notebook, map, planning)
curl -s -L "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1000&q=80" -o images/services/custom-planning.jpg

# Blog articles
curl -s -L "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&q=80" -o images/blog/planning-international-trip.jpg
curl -s -L "https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=1000&q=80" -o images/blog/flight-booking-guide.jpg
curl -s -L "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1000&q=80" -o images/blog/hotel-selection-tips.jpg
curl -s -L "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&w=1000&q=80" -o images/blog/pakistan-travel-checklist.jpg

# About & Office Context
curl -s -L "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80" -o images/general/office-consultation.jpg
curl -s -L "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80" -o images/general/travel-journey.jpg

# Copy all to public directory as well for Vite dev server compatibility
cp -r images/* public/images/

echo "All images downloaded and copied successfully!"
