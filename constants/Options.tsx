import {
  BankJago,
  BankOfAmerica,
  BCA,
  Chase,
  CitiBank,
  Mandiri,
  Paypal,
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
  { label: "Chase Bank", value: "chase", icon: <Chase size={24} /> },
  { label: "Paypal", value: "paypal", icon: <Paypal size={24} /> },
  { label: "Citi Bank", value: "citi", icon: <CitiBank size={24} /> },
  {
    label: "Bank of America",
    value: "america",
    icon: <BankOfAmerica size={32} />,
  },
  { label: "Jago", value: "jago", icon: <BankJago size={24} /> },
  { label: "Mandiri", value: "mandiri", icon: <Mandiri size={48} /> },
  { label: "BCA", value: "bca", icon: <BCA size={32} /> },
  { label: "Other", value: "other", icon: null },
];

export const categories = [
  { label: "Food", value: "food" },
  { label: "Transportation", value: "transportation" },
  { label: "Shopping", value: "shopping" },
  { label: "Subscription", value: "subscription" },
  { label: "Salary", value: "salary" },
  { label: "Other", value: "other" },
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
  { full: "January", short: "Jan", value: 1 },
  { full: "February", short: "Feb", value: 2 },
  { full: "March", short: "Mar", value: 3 },
  { full: "April", short: "Apr", value: 4 },
  { full: "May", short: "May", value: 5 },
  { full: "June", short: "Jun", value: 6 },
  { full: "July", short: "Jul", value: 7 },
  { full: "August", short: "Aug", value: 8 },
  { full: "September", short: "Sep", value: 9 },
  { full: "October", short: "Oct", value: 10 },
  { full: "November", short: "Nov", value: 11 },
  { full: "December", short: "Dec", value: 12 },
];
