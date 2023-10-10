const { Room , Booking} = require("./index.js");

describe('Test for Room class', () => {
    test("isOccupied es true cuando la habitacion esta ocupada en una fecha dada", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-16",
          "2023-10-22",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-23",
          "2023-10-31",
          10,
          room_A
        );
        const bookings = [booking1, booking2];
        const room1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const isOccupied = room1.isOccupied("2023-10-31");
        expect(isOccupied).toBe(true);
      });
      test("isOccupied es false cuando la habitacion no esta ocupada en una fecha dada", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-01",
          "2023-10-06",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-07",
          "2023-10-15",
          10,
          room_A
        );
        const bookings = [booking1, booking2];
        const room1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const isOccupied = room1.isOccupied("2023-10-16");
        expect(isOccupied).toBe(false);
      });
      test("isOccupied es boolean dado una entrada", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-01",
          "2023-10-06",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-07",
          "2023-10-15",
          10,
          room_A
        );
        const bookings = [booking1, booking2];
        const room1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const isOccupied = room1.isOccupied();
        const isOccupied2 = room1.isOccupied(3);
        const isOccupied3 = room1.isOccupied('string');
        expect(typeof isOccupied).toBe('boolean');
        expect(typeof isOccupied2).toBe('boolean');
        expect(typeof isOccupied3).toBe('boolean');
      });
      test("isOccupied es false cuando la habitacion no esta ocupada en una fecha dada", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-16",
          "2023-10-22",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-23",
          "2023-10-31",
          10,
          room_A
        );
        const bookings = [booking1, booking2];
        const room1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const isOccupied = room1.isOccupied("2023-10-15");
        expect(isOccupied).toBe(false);
      });
      test("occupancyPercentage entrega un resultado esperado para ciertos bookings ", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-01",
          "2023-10-06",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-07",
          "2023-10-15",
          10,
          room_A
        );
        const bookings = [booking1, booking2];
        const room1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const occupancyPercentage1 = room1.occupancyPercentage('2023-10-01','2023-10-06');
        const occupancyPercentage2 = room1.occupancyPercentage('2023-10-06', '2023-10-01');
        const occupancyPercentage3 = room1.occupancyPercentage('2023-10-07','2023-10-20');
        expect(occupancyPercentage1).toBe(100);
        expect(occupancyPercentage2).toBe(0);
        expect(occupancyPercentage3).toBe(64.3);
      
      });
      test("totalOccupancyPercentage debe entregar el porcentage total de ocupación esperado", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-01",
          "2023-10-06",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-07",
          "2023-10-15",
          10,
          room_A
        );
        const room_B = {
          name: "Room2",
          rate: 150,
          discount: 10,
        };
        const booking3 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-04",
          "2023-10-09",
          10,
          room_B
        );
        const booking4 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-11",
          "2023-10-15",
          10,
          room_B
        );
        const bookings = [booking1, booking2];
        const bookings2 = [booking3, booking4];
        const room_1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const room_2 = new Room(room_B.name, bookings2, room_B.rate, room_B.discount);
        const totalOccupPer = Room.totalOccupancyPercentage([room_1,room_2],'2023-10-01','2023-10-06');
        expect(totalOccupPer).toBe(75);
      
      });
      test("totalOccupancyPercentage debe entregar 100% si durante todo el rango entre fechas los rooms estuvieran ocupados", () => {
        const room_A = {
          name: "Room1",
          rate: 150,
          discount: 10,
        };
        const booking1 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-01",
          "2023-10-06",
          10,
          room_A
        );
        const booking2 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-07",
          "2023-10-31",
          10,
          room_A
        );
        const room_B = {
          name: "Room2",
          rate: 150,
          discount: 10,
        };
        const booking3 = new Booking(
          "booking 1",
          "bok@bok.es",
          "2023-10-01",
          "2023-10-10",
          10,
          room_B
        );
        const booking4 = new Booking(
          "booking 2",
          "bok2@bok.es",
          "2023-10-11",
          "2023-10-31",
          10,
          room_B
        );
        const bookings = [booking1, booking2];
        const bookings2 = [booking3, booking4];
        const room_1 = new Room(room_A.name, bookings, room_A.rate, room_A.discount);
        const room_2 = new Room(room_B.name, bookings2, room_B.rate, room_B.discount);
        const totalOccupPer = Room.totalOccupancyPercentage([room_1,room_2],'2023-10-01','2023-10-06');
        expect(totalOccupPer).toBe(100);
      
      });
      test("totalOccupancyPercentage entrega 0 para valores incorrectos o no deseados", () => {
        const fakedata = ['Oxygen', 'Rules'];
        const totalOccupPer = Room.totalOccupancyPercentage(['room_1','room_2'],'2023-10-01','2023-10-06');
        const totalOccupPer1 = Room.totalOccupancyPercentage(fakedata,'2023-10-01',2023);
        const totalOccupPer2 = Room.totalOccupancyPercentage({},'2023-10-01','2023-10-06');
        const totalOccupPer3 = Room.totalOccupancyPercentage( 'casa','2023-10-01',fakedata);
        const totalOccupPer4 = Room.totalOccupancyPercentage( [],'2023-10-01','2023-10-02');
        expect(totalOccupPer).toBe(0);
        expect(totalOccupPer1).toBe(0);
        expect(totalOccupPer2).toBe(0);
        expect(totalOccupPer3).toBe(0);
        expect(totalOccupPer4).toBe(0);
      });
      test("totalOccupancyPercentage tiene que devolver 0 si las fechas pasadas al metodo están fuera del rango", () => {
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
          "2023-10-09",
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
        const percentage = Room.totalOccupancyPercentage(roomArray, "2023-11-01", "2023-11-15");
        expect(percentage).toBe(0);
      });
      test("availablRooms tiene que devolver la lista de las habitaciones disponibles para una rango de fechas consultado", () => {
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
        const availables = Room.availableRooms(roomArray, "2023-10-16", "2023-10-20");
        expect(availables).toEqual([room1]);
      });
      test("availablRooms tiene que devolver vacio para una rango de fechas consultado donde no hay habitaciones libres", () => {
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
        const availables = Room.availableRooms(roomArray, "2023-10-08", "2023-10-15");
        expect(availables).toEqual([]);
      });
      test("availablRooms tiene que devolver vacio para valores erroneos", () => {
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
        const fakedata = ['Oxygen', 'Rules'];
        const availables = Room.availableRooms(['room_1','room_2'],'2023-10-01','2023-10-06');
        const availables1 = Room.availableRooms(fakedata,'2023-10-01',2023);
        const availables2 = Room.availableRooms({},'2023-10-01','2023-10-06');
        const availables3 = Room.availableRooms( roomArray,15,'2023-10-01');
        const availables4 = Room.availableRooms( [],'2023-10-01','2023-10-02');
        expect(availables).toEqual([]);
        expect(availables1).toEqual([]);
        expect(availables2).toEqual([]);
        expect(availables3).toEqual([]);
        expect(availables4).toEqual([]);
      });
        test("availablRooms tiene que devolver vacio para valores erroneos", () => {
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
        const fakedata = ['Oxygen', 'Rules'];
        const availables = Room.availableRooms(['room_1','room_2'],'2023-10-01','2023-10-06');
        const availables1 = Room.availableRooms(fakedata,'2023-10-01',2023);
        const availables2 = Room.availableRooms({},'2023-10-01','2023-10-06');
        const availables3 = Room.availableRooms( roomArray,15,'2023-10-01');
        const availables4 = Room.availableRooms( [],'2023-10-01','2023-10-02');
        expect(availables).toEqual([]);
        expect(availables1).toEqual([]);
        expect(availables2).toEqual([]);
        expect(availables3).toEqual([]);
        expect(availables4).toEqual([]);
      });
});

describe('Test for Booking class', () => {
  test("getFee debe dar el precio de una habitacion con los descuentos aplicados", () => {
      const room_A = {
        name: "Room1",
        rate: 150,
        discount: 10,
      };
      const booking1 = new Booking(
        "booking 1",
        "bok@bok.es",
        "2023-10-16",
        "2023-10-22",
        10,
        room_A
      );

      const fee = booking1.getFee(room_A);
      expect(fee).toEqual(121.5);
    }); 
    test("getFee debe dar el precio de una habitacion con los descuentos aplicados", () => {
      const room_A = {
        name: "Room1",
        rate: 150,
        discount: 0,
      };
      const booking1 = new Booking(
        "booking 1",
        "bok@bok.es",
        "2023-10-16",
        "2023-10-22",
        10,
        room_A
      );

      const fee = booking1.getFee(room_A);
      expect(fee).toEqual(135);
    });
    test("getFee debe dar el precio de una habitacion con los descuentos aplicados", () => {
      const room_A = {
        name: "Room1",
        rate: 150,
        discount: 10,
      };
      const booking1 = new Booking(
        "booking 1",
        "bok@bok.es",
        "2023-10-16",
        "2023-10-22",
        0,
        room_A
      );

      const fee = booking1.getFee(room_A);
      expect(fee).toEqual(135);
    });
    test("getFee debe dar el precio de una habitacion si no tiene descuentos", () => {
      const room_A = {
        name: "Room1",
        rate: 150,
        discount: 0,
      };
      const booking1 = new Booking(
        "booking 1",
        "bok@bok.es",
        "2023-10-16",
        "2023-10-22",
        0,
        room_A
      );

      const fee = booking1.getFee(room_A);
      expect(fee).toEqual(150);
    });
  });