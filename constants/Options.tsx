import { Colors } from "./Colors";
import {
  BankJago,
  BankOfAmerica,
  BCA,
  Chase,
  CitiBank,
  Food,
  Mandiri,
  Paypal,
  Plus,
  Salary,
  Shopping,
  Subscription,
  Transportation,
  Wallet,
} from "./Icons";

export const slides = [
  {
    title: "Gain total control of your money",
    description: "Become your own money manager and make every cent count",
    image: require("@/assets/images/Slide_1.png"),
  },
  {
    title: "Know where your money goes",
    description:
      "Track your transaction easily,\nwith categories and financial report",
    image: require("@/assets/images/Slide_2.png"),
  },
  {
    title: "Planning ahead",
    description: "Setup your budget for each category so you in control",
    image: require("@/assets/images/Slide_3.png"),
  },
];

export const banks = [
  {
    label: "Chase Bank",
    value: "chase",
    icon: <Chase size={24} />,
  },
  {
    label: "Paypal",
    value: "paypal",
    icon: <Paypal size={24} />,
  },
  {
    label: "Citi Bank",
    value: "citi",
    icon: <CitiBank size={24} />,
  },
  {
    label: "Bank of America",
    value: "america",
    icon: <BankOfAmerica size={32} />,
  },
  {
    label: "Jago",
    value: "jago",
    icon: <BankJago size={24} />,
  },
  {
    label: "Mandiri",
    value: "mandiri",
    icon: <Mandiri size={48} />,
  },
  {
    label: "BCA",
    value: "bca",
    icon: <BCA size={32} />,
  },
  {
    label: "Other",
    value: "other",
    icon: <Wallet size={24} colors={Colors.violet100} />,
  },
];

export const categories = [
  {
    label: "Food",
    value: "food",
    icon: (size: number = 30) => <Food size={size} />,
    background: Colors.red20,
    color: Colors.red100,
  },
  {
    label: "Transportation",
    value: "transportation",
    icon: (size: number = 30) => <Transportation size={size} />,
    background: Colors.blue20,
    color: Colors.blue100,
  },
  {
    label: "Shopping",
    value: "shopping",
    icon: (size: number = 30) => <Shopping size={size} />,
    background: Colors.yellow20,
    color: Colors.yellow100,
  },
  {
    label: "Subscription",
    value: "subscription",
    icon: (size: number = 30) => <Subscription size={size} />,
    background: Colors.violet20,
    color: Colors.violet100,
  },
  {
    label: "Salary",
    value: "salary",
    icon: (size: number = 30) => <Salary size={size} />,
    background: Colors.green20,
    color: Colors.green100,
  },
  {
    label: "Other",
    value: "other",
    icon: (size: number = 30) => <Plus size={size} />,
    background: "#E3E5E5",
    color: Colors.dark100,
  },
];

export const filters = [
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
  { label: "Transfer", value: "transfer" },
];

export const sorts = [
  { label: "Highest", value: "highest" },
  { label: "Lowest", value: "lowest" },
  { label: "Newest", value: "newest" },
  { label: "Oldest", value: "oldest" },
];

export const months = [
  { full: "January", short: "Jan", value: 0 },
  { full: "February", short: "Feb", value: 1 },
  { full: "March", short: "Mar", value: 2 },
  { full: "April", short: "Apr", value: 3 },
  { full: "May", short: "May", value: 4 },
  { full: "June", short: "Jun", value: 5 },
  { full: "July", short: "Jul", value: 6 },
  { full: "August", short: "Aug", value: 7 },
  { full: "September", short: "Sep", value: 8 },
  { full: "October", short: "Oct", value: 9 },
  { full: "November", short: "Nov", value: 10 },
  { full: "December", short: "Dec", value: 11 },
];

export const types = [
  { label: "Transaction", value: "transaction" },
  { label: "Category", value: "category" },
];
