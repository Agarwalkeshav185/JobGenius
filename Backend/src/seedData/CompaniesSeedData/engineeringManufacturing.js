import path from "path";

const basePath = path.resolve("Logos", "engineering");
console.log("Base path for company logos:", basePath);
console.log(basePath);


const companiesData = [
  {
    name: "Siemens",
    description: "Global leader in electronics, industrial automation, and software-driven engineering solutions.",
    website: "https://www.siemens.com",
    location: "Munich, Germany",
    logo: { path: `${basePath}/siemens.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Bosch",
    description: "German multinational known for electronics, software solutions, and advanced manufacturing technologies.",
    website: "https://www.bosch.com",
    location: "Stuttgart, Germany",
    logo: { path: `${basePath}/Bosch.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "General Electric (GE Digital)",
    description: "Provides software and digital platforms for industrial engineering and manufacturing automation.",
    website: "https://www.ge.com/digital",
    location: "Boston, USA",
    logo: { path: `${basePath}/GE.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Honeywell",
    description: "Specializes in electronics, automation, and software solutions for engineering and manufacturing.",
    website: "https://www.honeywell.com",
    location: "Charlotte, USA",
    logo: { path: `${basePath}/honeywell.svg` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Schneider Electric",
    description: "French multinational providing energy management, industrial automation, and software solutions.",
    website: "https://www.se.com",
    location: "Paris, France",
    logo: { path: `${basePath}/Schneider.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "ABB",
    description: "Swiss-Swedish company leading in robotics, electronics, and industrial automation software.",
    website: "https://new.abb.com",
    location: "Zurich, Switzerland",
    logo: { path: `${basePath}/abb.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Intel",
    description: "Semiconductor and electronics manufacturing leader powering software-driven engineering systems.",
    website: "https://www.intel.com",
    location: "California, USA",
    logo: { path: `${basePath}/Intel.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Texas Instruments",
    description: "Specializes in semiconductors, embedded systems, and electronics manufacturing.",
    website: "https://www.ti.com",
    location: "Dallas, USA",
    logo: { path: `${basePath}/Texas.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Samsung Electronics",
    description: "Global electronics giant manufacturing semiconductors, displays, and industrial software solutions.",
    website: "https://www.samsung.com",
    location: "Seoul, South Korea",
    logo: { path: `${basePath}/samsung.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Sony",
    description: "Japanese electronics and software company engaged in advanced electronics manufacturing.",
    website: "https://www.sony.com",
    location: "Tokyo, Japan",
    logo: { path: `${basePath}/sony.webp` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Apple",
    description: "Global leader in consumer electronics manufacturing, design, and advanced supply chain engineering.",
    website: "https://www.apple.com",
    location: "California, USA",
    logo: { path: `${basePath}/apple.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Google (Alphabet - Google Cloud IoT)",
    description: "Offers industrial IoT, cloud-based automation, and AI for smart manufacturing.",
    website: "https://cloud.google.com/solutions/iot",
    location: "California, USA",
    logo: { path: `${basePath}/google.jpg` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Microsoft (Azure IoT & Manufacturing)",
    description: "Provides cloud, IoT, and software-driven platforms for digital manufacturing and engineering.",
    website: "https://azure.microsoft.com/en-us/solutions/manufacturing/",
    location: "Washington, USA",
    logo: { path: `${basePath}/Microsoft.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Amazon Web Services (AWS Industrial)",
    description: "Cloud-based industrial IoT and AI solutions for manufacturing automation.",
    website: "https://aws.amazon.com/industrial/",
    location: "Seattle, USA",
    logo: { path: `${basePath}/AWS.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Dassault Systèmes",
    description: "French software company providing 3D design, digital twin, and engineering manufacturing platforms.",
    website: "https://www.3ds.com",
    location: "Vélizy-Villacoublay, France",
    logo: { path: `${basePath}/DSY.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Autodesk",
    description: "Provides software for engineering, 3D design, and advanced manufacturing processes.",
    website: "https://www.autodesk.com",
    location: "California, USA",
    logo: { path: `${basePath}/AutoDesk.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Larsen & Toubro (L&T Technology Services)",
    description: "Indian multinational delivering electronics and digital engineering R&D services.",
    website: "https://www.ltts.com",
    location: "Vadodara, India",
    logo: { path: `${basePath}/LT.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Tata Elxsi",
    description: "Indian company offering electronics design, embedded software, and manufacturing engineering solutions.",
    website: "https://www.tataelxsi.com",
    location: "Bangalore, India",
    logo: { path: `${basePath}/TATA.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Hitachi",
    description: "Japanese multinational specializing in electronics, automation systems, and industrial engineering software.",
    website: "https://www.hitachi.com",
    location: "Tokyo, Japan",
    logo: { path: `${basePath}/Hitachi.png` },
    categoryName: "Engineering & Manufacturing"
  },
  {
    name: "Foxconn (Hon Hai Precision Industry)",
    description: "World’s largest electronics contract manufacturer, producing devices for Apple and other tech giants.",
    website: "https://www.foxconn.com",
    location: "New Taipei, Taiwan",
    logo: { path: `${basePath}/foxconn.png` },
    categoryName: "Engineering & Manufacturing"
  }
];

export default companiesData;