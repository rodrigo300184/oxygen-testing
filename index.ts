
interface RoomParameters {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
}

class Room implements RoomParameters {
  name: string;
  bookings: Booking[];
  rate: number;
  discount: number;
  constructor(name: string, bookings: Booking[], rate: number, discount: number  ) {
    this.name = name;
    this.bookings = bookings;
    this.rate = rate;
    this.discount = discount;
  }

  isOccupied(date: string) {
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

  occupancyPercentage(startingDate: string, endingDate:string) {
    const startDate = new Date(startingDate);
    const endDate = new Date(endingDate);

    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    let totalDaysInRange = 0;
    let occupiedDays = 0;

    for (
      let currentDate = startDate;
      currentDate <= endDate;
      currentDate.setDate(currentDate.getDate() + 1)
    ) {
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

  static totalOccupancyPercentage(rooms: Room, startDate:string, endDate: string) {

    if (!Array.isArray(rooms) || rooms.every((room) => !(room instanceof Room))) {
      return 0;
    }

    function countDays(startDate: Date, endDate: Date) {
      const oneDay = 24 * 60 * 60 * 1000;
      return Math.round(Math.abs((startDate.getTime() - endDate.getTime()) / oneDay)) + 1;
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

  static availableRooms(rooms: Room, startingDate: string, endingDate:string) {
    if (!Array.isArray(rooms) || rooms.every((room) => !(room instanceof Room))
      || (typeof startingDate) !== 'string' || (typeof endingDate) !== 'string') {
      return [];
    }
    let availableRooms = [];

    for (const room of rooms) {
      let available = true;
      const startDate = new Date(startingDate);
      const endDate = new Date(endingDate);
      startDate.setHours(0, 0, 0, 0);
      endDate.setHours(23, 59, 59, 999);

      for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {

        if (room.isOccupied(currentDate)) {
          available = false;
          break;
        }
      }
      if (available) {
        availableRooms.push(room);
      }
    }
    return availableRooms;
  }
}

type BookingParams = {
  name: string, 
  email: string, 
  checkin: string, 
  checkout: string, 
  discount: number, 
  room: Room
}

class Booking implements BookingParams {
  name: string;
  email: string;
  checkin: string;
  checkout: string;
  discount: number;
  room: Room;
  constructor({name, email, checkin, checkout, discount, room}:BookingParams) {
    this.name = name;
    this.email = email;
    this.checkin = checkin;
    this.checkout = checkout;
    this.discount = discount;
    this.room = room;
  }
  getFee() {
    const roomDiscountPrice = this.room.rate - this.room.rate * this.room.discount / 100;
    const finalPrice = roomDiscountPrice - roomDiscountPrice * this.discount / 100;
    return finalPrice;
  }
}

module.exports = {
  Room,
  Booking,
};
