import icons from "./icons";
import images from "./images";
import { deviceStatusObject } from "../types/device.type";

export const rooms = [
  {
    id: 1,
    name: "Phòng khách",
    img: images.home1,
    device: 6,
    light: 4,
    light_on: 1,
    fan: 2,
    fan_on: 1,
    sensor: 2,
    sensor_on: 1
  },
  {
    id: 2,
    name: "Phòng ngủ",
    img: images.home2,
    device: 3,
    light: 1,
    light_on: 0,
    fan: 1,
    fan_on: 1,
    sensor: 1,
    sensor_on: 1
  },
  {
    id: 3,
    name: "Phòng bếp",
    img: images.home3,
    device: 4,
    light: 2,
    light_on: 0,
    fan: 2,
    fan_on: 1,
    sensor: 0,
    sensor_on: 0
  }
]

export const room = {
    "id": "R123",
    "name": "Phòng khách",
    "img": images.home1,
    "devices": []
}

export const data: deviceStatusObject[] = [
        { "feedId": 101, "feedKey": "fan_1", "title": "fan", "name": "Fan 1", "status": true },
        { "feedId": 102, "feedKey": "fan_2", "title": "fan", "name": "Fan 2", "status": false },
        { "feedId": 103, "feedKey": "fan_3", "title": "fan", "name": "Fan 3", "status": true },

        { "feedId": 201, "feedKey": "light_1", "title": "light", "name": "Light 1", "status": true },
        { "feedId": 202, "feedKey": "light_2", "title": "light", "name": "Light 2", "status": false },
        { "feedId": 203, "feedKey": "light_3", "title": "light", "name": "Light 3", "status": true },

        { "feedId": 301, "feedKey": "sensor_1", "title": "sensor", "name": "Sensor 1", "status": true },
        { "feedId": 302, "feedKey": "sensor_2", "title": "sensor", "name": "Sensor 2", "status": false },
        { "feedId": 303, "feedKey": "sensor_3", "title": "sensor", "name": "Sensor 3", "status": true }
    ]

export const deviceData: deviceStatusObject = { "feedId": 201, "feedKey": "light_1", "title": "light", "name": "Light 1", "status": true };


export const cards = [
  {
    title: "Card 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    category: "house",
    image: images.newYork,
  },
  {
    title: "Card 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    category: "house",
    image: images.japan,
  },
  {
    title: "Card 3",
    location: "Location 3",
    price: "$300",
    rating: 2,
    category: "flat",
    image: images.newYork,
  },
  {
    title: "Card 4",
    location: "Location 4",
    price: "$400",
    rating: 5,
    category: "villa",
    image: images.japan,
  },
];

export const featuredCards = [
  {
    title: "Featured 1",
    location: "Location 1",
    price: "$100",
    rating: 4.8,
    image: images.newYork,
    category: "house",
  },
  {
    title: "Featured 2",
    location: "Location 2",
    price: "$200",
    rating: 3,
    image: images.japan,
    category: "flat",
  },
];

export const categories = [
  { title: "All", category: "All" },
  { title: "Houses", category: "House" },
  { title: "Condos", category: "Condos" },
  { title: "Duplexes", category: "Duplexes" },
  { title: "Studios", category: "Studios" },
  { title: "Villas", category: "Villa" },
  { title: "Apartments", category: "Apartments" },
  { title: "Townhomes", category: "Townhomes" },
  { title: "Others", category: "Others" },
];

export const settings = [
  {
    title: "My Bookings",
    icon: icons.calendar,
  },
  {
    title: "Payments",
    icon: icons.wallet,
  },
  {
    title: "Profile",
    icon: icons.person,
  },
  {
    title: "Notifications",
    icon: icons.bell,
  },
  {
    title: "Security",
    icon: icons.shield,
  },
  {
    title: "Language",
    icon: icons.language,
  },
  {
    title: "Help Center",
    icon: icons.info,
  },
  {
    title: "Invite Friends",
    icon: icons.people,
  },
];

export const facilities = [
  {
    title: "Laundry",
    icon: icons.laundry,
  },
  {
    title: "Car Parking",
    icon: icons.carPark,
  },
  {
    title: "Sports Center",
    icon: icons.run,
  },
  {
    title: "Cutlery",
    icon: icons.cutlery,
  },
  {
    title: "Gym",
    icon: icons.dumbell,
  },
  {
    title: "Swimming pool",
    icon: icons.swim,
  },
  {
    title: "Wifi",
    icon: icons.wifi,
  },
  {
    title: "Pet Center",
    icon: icons.dog,
  },
];

export const gallery = [
  {
    id: 1,
    image: images.newYork,
  },
  {
    id: 2,
    image: images.japan,
  },
  {
    id: 3,
    image: images.newYork,
  },
  {
    id: 4,
    image: images.japan,
  },
  {
    id: 5,
    image: images.newYork,
  },
  {
    id: 6,
    image: images.japan,
  },
];
