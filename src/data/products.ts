export type LocalizedText = {
  en: string;
  vi: string;
};

export type ProductSpec = {
  label: LocalizedText;
  value: LocalizedText;
};

export type Product = {
  id: string;
  sku: string;
  icon: string;
  category: LocalizedText;
  name: LocalizedText;
  summary: LocalizedText;
  specs: ProductSpec[];
  priceUSD: number;
  priceVND: number;
};

export const products: Product[] = [
  {
    id: "cardiosense-ecg-pro-12",
    sku: "ECG-CP12",
    icon: "❤",
    category: { en: "Cardiology", vi: "Tim mạch" },
    name: {
      en: "CardioSense ECG Pro 12",
      vi: "Máy điện tim CardioSense ECG Pro 12",
    },
    summary: {
      en: "12-lead digital ECG system with cloud-ready reporting for outpatient and emergency workflows.",
      vi: "Hệ thống ECG 12 chuyển đạo số hóa, sẵn sàng kết nối báo cáo đám mây cho phòng khám và cấp cứu.",
    },
    specs: [
      {
        label: { en: "Signal channels", vi: "Số kênh tín hiệu" },
        value: { en: "12 simultaneous leads", vi: "12 chuyển đạo đồng thời" },
      },
      {
        label: { en: "Sampling rate", vi: "Tần số lấy mẫu" },
        value: { en: "Up to 32,000 Hz", vi: "Tối đa 32.000 Hz" },
      },
      {
        label: { en: "Connectivity", vi: "Kết nối" },
        value: { en: "LAN, Wi-Fi, USB", vi: "LAN, Wi-Fi, USB" },
      },
    ],
    priceUSD: 2490,
    priceVND: 63500000,
  },
  {
    id: "oxysure-pulse-x2",
    sku: "POX-X2",
    icon: "🫁",
    category: { en: "Respiratory Care", vi: "Hô hấp" },
    name: {
      en: "OxySure Pulse Oximeter X2",
      vi: "Máy đo SpO2 OxySure X2",
    },
    summary: {
      en: "Clinical-grade handheld oximeter for adult and pediatric monitoring with fast response alerts.",
      vi: "Máy đo SpO2 cầm tay chuẩn lâm sàng cho người lớn và trẻ em với cảnh báo phản hồi nhanh.",
    },
    specs: [
      {
        label: { en: "SpO2 accuracy", vi: "Độ chính xác SpO2" },
        value: { en: "±2% (70% to 100%)", vi: "±2% (70% đến 100%)" },
      },
      {
        label: { en: "Pulse range", vi: "Dải nhịp tim" },
        value: { en: "25 to 250 bpm", vi: "25 đến 250 bpm" },
      },
      {
        label: { en: "Battery life", vi: "Thời lượng pin" },
        value: { en: "30 hours continuous", vi: "30 giờ liên tục" },
      },
    ],
    priceUSD: 590,
    priceVND: 15100000,
  },
  {
    id: "infuflow-smart-pump-s8",
    sku: "IVP-S8",
    icon: "💧",
    category: { en: "Infusion Therapy", vi: "Truyền dịch" },
    name: {
      en: "InfuFlow Smart Pump S8",
      vi: "Bơm tiêm truyền InfuFlow Smart Pump S8",
    },
    summary: {
      en: "Smart infusion pump with drug library safeguards and anti-free-flow design for critical care.",
      vi: "Bơm truyền thông minh với thư viện thuốc an toàn và thiết kế chống chảy tự do cho hồi sức tích cực.",
    },
    specs: [
      {
        label: { en: "Flow accuracy", vi: "Độ chính xác lưu lượng" },
        value: { en: "±3% with calibrated sets", vi: "±3% với dây truyền hiệu chuẩn" },
      },
      {
        label: { en: "Flow range", vi: "Dải lưu lượng" },
        value: { en: "0.1 to 1200 mL/h", vi: "0,1 đến 1200 mL/giờ" },
      },
      {
        label: { en: "Safety mode", vi: "Chế độ an toàn" },
        value: { en: "Drug library + occlusion alarm", vi: "Thư viện thuốc + báo tắc nghẽn" },
      },
    ],
    priceUSD: 1490,
    priceVND: 38100000,
  },
  {
    id: "vitawatch-bedside-m7",
    sku: "PM-M7",
    icon: "📈",
    category: { en: "Patient Monitoring", vi: "Theo dõi bệnh nhân" },
    name: {
      en: "VitaWatch Bedside Monitor M7",
      vi: "Monitor theo dõi bệnh nhân VitaWatch M7",
    },
    summary: {
      en: "Multi-parameter bedside monitor for ICU and ward use with configurable alarm profiles.",
      vi: "Monitor đa thông số cho ICU và buồng bệnh, hỗ trợ cấu hình ngưỡng cảnh báo linh hoạt.",
    },
    specs: [
      {
        label: { en: "Parameters", vi: "Thông số" },
        value: { en: "ECG, SpO2, NIBP, RESP, TEMP", vi: "ECG, SpO2, NIBP, RESP, TEMP" },
      },
      {
        label: { en: "Display", vi: "Màn hình" },
        value: { en: "15.6-inch IPS touchscreen", vi: "Cảm ứng IPS 15,6 inch" },
      },
      {
        label: { en: "Data export", vi: "Xuất dữ liệu" },
        value: { en: "HL7-ready over Ethernet", vi: "Sẵn sàng HL7 qua Ethernet" },
      },
    ],
    priceUSD: 3190,
    priceVND: 81200000,
  },
  {
    id: "stericore-autoclave-45l",
    sku: "AUTO-45L",
    icon: "🧪",
    category: { en: "Sterilization", vi: "Tiệt khuẩn" },
    name: {
      en: "SteriCore Steam Autoclave 45L",
      vi: "Nồi hấp tiệt khuẩn SteriCore 45L",
    },
    summary: {
      en: "Class B tabletop autoclave with vacuum drying, cycle traceability, and low-maintenance chamber.",
      vi: "Nồi hấp Class B để bàn với sấy chân không, truy vết chu trình và buồng hấp dễ bảo trì.",
    },
    specs: [
      {
        label: { en: "Chamber volume", vi: "Dung tích buồng hấp" },
        value: { en: "45 liters", vi: "45 lít" },
      },
      {
        label: { en: "Program cycles", vi: "Chu trình" },
        value: { en: "Wrapped, unwrapped, textile", vi: "Bọc, không bọc, dụng cụ vải" },
      },
      {
        label: { en: "Traceability", vi: "Truy xuất chu trình" },
        value: { en: "USB + thermal print", vi: "USB + in nhiệt" },
      },
    ],
    priceUSD: 4290,
    priceVND: 109500000,
  },
  {
    id: "sonopocket-h1",
    sku: "US-H1",
    icon: "🔬",
    category: { en: "Imaging", vi: "Chẩn đoán hình ảnh" },
    name: {
      en: "SonoPocket Handheld Ultrasound H1",
      vi: "Máy siêu âm cầm tay SonoPocket H1",
    },
    summary: {
      en: "Portable ultrasound probe pair for point-of-care diagnostics with AI-assisted presets.",
      vi: "Bộ đầu dò siêu âm di động cho chẩn đoán tại giường với preset hỗ trợ AI.",
    },
    specs: [
      {
        label: { en: "Probe types", vi: "Loại đầu dò" },
        value: { en: "Linear + Convex combo", vi: "Combo Linear + Convex" },
      },
      {
        label: { en: "Battery endurance", vi: "Thời lượng pin" },
        value: { en: "3.5 hours scanning", vi: "3,5 giờ quét liên tục" },
      },
      {
        label: { en: "App support", vi: "Ứng dụng hỗ trợ" },
        value: { en: "iOS, Android, Windows", vi: "iOS, Android, Windows" },
      },
    ],
    priceUSD: 2690,
    priceVND: 68600000,
  },
];
