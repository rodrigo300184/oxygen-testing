class Room {
    constructor(name, bookings, rate, discount) {
      this.name = name;
      this.bookings = bookings;
      this.rate = rate;
      this.discount = discount;
    }
  
    isOccupied(date) {
      const myDate = new Date(date);
  
      for (let i = 0; i < this.bookings.length; i++) {
        const startDate = new Date(this.bookings[i].checkin);
        const endDate = new Date(this.bookings[i].checkout);
  
        if (myDate >= startDate && myDate <= endDate) {
          return true;
        }
      }
  
      return false;
    }
  
    occupancyPercentage(startingDate, endingDate) {
      const startDate = new Date(startingDate);
      const endDate = new Date(endingDate);
  
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);
  
      let totalDaysInRange = 0;
      let occupiedDays = 0;
  
      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
  
        totalDaysInRange++;
  
        let isOccupied = false;
  
        for (const booking of this.bookings) {
          const bookingStartDate = new Date(booking.checkin);
          const bookingEndDate = new Date(booking.checkout);
          bookingStartDate.setHours(0, 0, 0, 0);
          bookingEndDate.setHours(23, 59, 59, 999);
  
          if (currentDate >= bookingStartDate && currentDate <= bookingEndDate) {
            isOccupied = true;
            break;
          }
        }
  
        if (isOccupied) {
          occupiedDays++;
        }
      }
  
      if (totalDaysInRange === 0) {
        return 0;
      }
  
      const percentage = (occupiedDays / totalDaysInRange) * 100;
  
      return parseFloat(percentage.toFixed(1));
    }
  
    static totalOccupancyPercentage(rooms, startDate, endDate) {
  
      if (!Array.isArray(rooms) || rooms.every((room) => !(room instanceof Room))) {
        return 0;
      }
  
      function countDays(startDate, endDate) {
        const oneDay = 24 * 60 * 60 * 1000;
        return Math.round(Math.abs((startDate - endDate) / oneDay)) + 1;
      }
  
      let totalOccupiedDays = 0;
      let totalDaysInRange = countDays(new Date(startDate), new Date(endDate));
  
      if (totalDaysInRange === 0) {
        return 0;
      }
  
      rooms.forEach((room) => {
        totalOccupiedDays += room.occupancyPercentage(startDate, endDate);
      });
  
      const percentage = (totalOccupiedDays / rooms.length).toFixed(1);
  
      return parseFloat(percentage);
    }
    static availableRooms(rooms, startingDate, endingDate) {
      
      if (!Array.isArray(rooms) || rooms.every((room) => !(room instanceof Room))) {
        return [];
      }
  
      let availableRooms = [];

      for(const room of rooms){

          if(!room.isOccupied(startingDate) && !room.isOccupied(endingDate)){
            availableRooms.push(room);
          }
        }
       
  
      
      console.log(availableRooms)
      return availableRooms;
    }
  }
  class Booking {
    constructor(name, email, checkin, checkout, discount, room) {
      this.name = name;
      this.email = email;
      this.checkin = checkin;
      this.checkout = checkout;
      this.discount = discount;
      this.room = room;
    }
  }
  
  const roomA = {
    name: "roomA",
    rate: 150,
    discount: 10,
  };

  const booking1 = new Booking(
    "booking 1",
    "bok@bok.es",
    "2023-10-01",
    "2023-10-06",
    10,
    roomA
  );

  const booking2 = new Booking(
    "booking 2",
    "bok2@bok.es",
    "2023-10-07",
    "2023-10-15",
    10,
    roomA
  );

  const bookingsA = [booking1, booking2];

  const roomB = {
    name: "roomB",
    rate: 150,
    discount: 10,
  };

  const booking3 = new Booking(
    "booking 3",
    "bok@bok.es",
    "2023-10-04",
    "2023-10-19",
    10,
    roomB
  );

  const booking4 = new Booking(
    "booking 4",
    "bok2@bok.es",
    "2023-10-23",
    "2023-10-25",
    10,
    roomB
  );
  const bookingsB = [booking3, booking4];
  const room1 = new Room(roomA.name, bookingsA, roomA.rate, roomA.discount);
  const room2 = new Room(roomB.name, bookingsB, roomB.rate, roomB.discount);
  const roomArray = [room1, room2];
  const availableRooms = Room.availableRooms(['room_1','room_2'],'2023-10-01','2023-10-06');