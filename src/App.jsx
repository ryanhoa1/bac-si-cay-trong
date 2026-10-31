import React, { useState, useEffect } from 'react';
import {
  Camera, Upload, Sprout, Bug, ShieldCheck, FlaskConical,
  Settings, CheckCircle2, AlertTriangle, ChevronRight, RefreshCw,
  Droplets, Sun, HelpCircle, X, Save, Sparkles, BookOpen
} from 'lucide-react';

const SAMPLE_CASES = [
  {
    id: 'dua_rep_sap',
    name: 'Dừa bị rệp sáp & bọ cánh cứng',
    crop: 'Cây Dừa',
    severity: 'Trung bình - Nặng',
    symptom: 'Đọt non bị xoăn, tàu lá có lớp phấn trắng bám dày mặt dưới, cổ hủ có vết đục hình chữ V.',
    cause: 'Rệp sáp phấn trắng chích hút nhựa kết hợp bọ cánh cứng (bọ dừa/kiến vương) tấn công đọt non.',
    organicFix: 'Pha dung dịch Dầu ăn (50ml) + Nước rửa chén (30ml) cho bình 16L, phun ướt đẫm mặt dưới tàu lá và bẹ dừa để làm ngạt rệp sáp. Treo túi muối hạt hoặc nấm xanh Metarhizium trên cổ hủ dừa.',
    prevention: 'Dọn sạch bẹ khô, phát quang bụi rậm, nuôi kiến vàng thiên địch trong vườn dừa.'
  },
  {
    id: 'nhen_do_ray',
    name: 'Nhện đỏ & Rầy chích hút lá',
    crop: 'Cây Có Múi / Rau Màu',
    severity: 'Trung bình',
    symptom: 'Mặt trên lá lấm tấm chấm trắng vàng như bụi cám, lá mất màu xanh bóng, mặt dưới có tơ mỏng và chấm li ti di chuyển.',
    cause: 'Nhện đỏ (Tetranychus) và rầy mềm phát triển mạnh trong thời tiết nắng nóng, khô hạn.',
    organicFix: 'Phun hỗn hợp Nước rửa chén + Dầu thực vật hoặc Dịch chiết Tỏi - Ớt - Gừng ngâm rượu vào sáng sớm hoặc chiều mát. Phun từ dưới tán lá hất lên.',
    prevention: 'Tưới phun mưa giữ ẩm mặt lá vào mùa nắng, không bón thừa đạm.'
  },
  {
    id: 'nam_than_thu',
    name: 'Nấm thán thư đốm lá & thối trái',
    crop: 'Xoài / Ớt / Cây ăn trái',
    severity: 'Nặng khi mưa nhiều',
    symptom: 'Vết bệnh ban đầu là đốm nhỏ sẫm màu, sau lan rộng thành vòng đồng tâm màu nâu đen, làm cháy chóp lá và rụng bông/trái non.',
    cause: 'Nấm Colletotrichum phát tán nhanh trong điều kiện độ ẩm cao, sương muối hoặc mưa dầm.',
    organicFix: 'Cắt tỉa ngay lá/trái bệnh đem tiêu hủy. Phun vôi bột loãng, chế phẩm đồng sinh học hoặc nấm đối kháng Bacillus subtilis + Trichoderma.',
    prevention: 'Tỉa cành tạo tán thông thoáng, thoát nước tốt trong mùa mưa, bón bổ sung Canxi - Kali.'
  },
  {
    id: 'vang_la_thoi_re',
    name: 'Vàng lá thối rễ (Ngộ độc hữu cơ / Nấm)',
    crop: 'Bưởi / Cam / Sầu riêng',
    severity: 'Rất Nặng',
    symptom: 'Gân lá chuyển màu vàng nhạt, lá rụng sớm khi chạm nhẹ, đào rễ tơ lên thấy vỏ rễ tuột khỏi lõi và có mùi hôi thối.',
    cause: 'Nấm Fusarium, Phytophthora kết hợp tuyến trùng tấn công bộ rễ bị ngập úng, nghẹt thở.',
    organicFix: 'Xới nhẹ đất quanh tán, ngưng tưới đẫm. Tưới gốc bằng nấm đối kháng Trichoderma kết hợp Humic kích rễ mới.',
    prevention: 'Lên mô cao, xẻ rãnh thoát nước, bón phân chuồng hoai mục ủ kỹ với Trichoderma.'
  }
];

const CULTIVATION_GUIDES = [
  {
    id: 'dua',
    title: 'Cây Dừa (Dừa Xiêm / Dừa Ta)',
    cycle: 'Thu hoạch ổn định từ năm thứ 2.5 - 3',
    steps: [
      { stage: '1. Chuẩn bị hố & Giống', detail: 'Đào hố 60x60x60cm, bón lót 10-15kg phân chuồng hoai + 0.5kg vôi bột + nấm Trichoderma trước 15 ngày. Chọn trái giống mắt mầm khỏe, rễ trắng.' },
      { stage: '2. Trồng & Giữ ẩm (0 - 12 tháng)', detail: 'Đặt trái giống nghiêng 45 độ, lấp đất ngang 2/3 trái. Tủ rơm hoặc cỏ khô giữ ẩm gốc, tưới 2-3 ngày/lần vào mùa khô.' },
      { stage: '3. Phòng bọ dừa & Đuông (Thường xuyên)', detail: 'Định kỳ vệ sinh bẹ khô trên ngọn. Dùng hỗn hợp dầu ăn + nước rửa chén phun phòng rệp sáp, đặt túi cát trộn muối/thảo mộc ở nách lá đọt.' },
      { stage: '4. Giai đoạn mang buồng', detail: 'Bón bổ sung Kali, phân hữu cơ và tro bếp + muối bọt (0.5kg/gốc/năm) giúp nước dừa ngọt đậm và chống rụng trái non.' }
    ]
  },
  {
    id: 'cay_co_mui',
    title: 'Cây Có Múi (Bưởi, Cam, Chanh)',
    cycle: 'Thu hoạch sau 24 - 30 tháng',
    steps: [
      { stage: '1. Lên mô thoát nước', detail: 'Đắp mô cao 40-60cm, đường kính 80cm để tránh úng rễ mùa mưa. Trộn đất mặt với phân hữu cơ vi sinh và vôi.' },
      { stage: '2. Kiến thiết cơ bản (Cơi đọt)', detail: 'Tỉa tạo khung 3-4 cành cấp 1 cân đối. Mỗi đợt ra đọt non cần phun phòng sâu vẽ bùa và rầy chổng cánh bằng dầu khoáng sinh học hoặc dịch tỏi ớt.' },
      { stage: '3. Xử lý ra hoa & Nuôi trái', detail: 'Xiết nước vừa phải, tỉa cành tăm, cành vượt trong tán. Bổ sung Canxi-Bo khi tượng trái để chống nứt trái.' }
    ]
  },
  {
    id: 'xoai_mit',
    title: 'Xoài, Mít & Cây Ăn Trái Lâu Năm',
    cycle: 'Thu hoạch từ năm thứ 2 - 4',
    steps: [
      { stage: '1. Cắt tỉa sau thu hoạch', detail: 'Cắt bỏ cành sâu bệnh, cành khuất tán, quét vôi gốc cao 0.8m để diệt mầm nấm và sâu đục thân.' },
      { stage: '2. Bảo vệ bông & Trái non', detail: 'Phòng rầy bông xoài và bệnh thán thư khi gặp sương muối hoặc mưa trái mùa. Bao trái sớm để tránh ruồi vàng đục trái.' }
    ]
  }
];

const COMPARISON_TABLE = [
  {
    aspect: 'Dấu hiệu trên lá',
    fungus: 'Vết đốm có vòng đồng tâm, viền nâu vàng rõ rệt, có lớp mốc mịn.',
    bacteria: 'Vết bệnh sũng nước, trong mờ khi soi nắng, có mùi hôi nhẹ.',
    nutrient: 'Vàng đồng đều trên lá già hoặc lá non (không có ổ nấm lan rộng).'
  },
  {
    aspect: 'Tốc độ lây lan',
    fungus: 'Lây lan qua gió và nước mưa từ cây này sang cây khác.',
    bacteria: 'Lây cực nhanh sau mưa giông hoặc qua vết cắt tỉa, vết sâu cắn.',
    nutrient: 'Cả vườn cùng bị một lúc theo vùng đất, không lây truyền.'
  },
  {
    aspect: 'Cách xử lý chuẩn',
    fungus: 'Tỉa lá bệnh, phun Trichoderma, vôi loãng hoặc đồng sinh học.',
    bacteria: 'Ngưng phun phân bón lá, sát khuẩn bằng vôi hoặc tỏi-gừng-ớt.',
    nutrient: 'Cải tạo pH đất, bổ sung phân hữu cơ hoai mục, Humic và vi lượng.'
  }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('diagnose');
  const [selectedImage, setSelectedImage] = useState(null);
  const [imageBase64, setImageBase64] = useState(null);
  const [cropNote, setCropNote] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [diagnosisResult, setDiagnosisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // Calculator state
  const [tankSize, setTankSize] = useState(16);
  const [formulaType, setFormulaType] = useState('soap_oil');

  // Settings modal for API Key / Webhook (persisted in localStorage)
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('bsct_gemini_key') || '');
  const [webhookUrl, setWebhookUrl] = useState(() => localStorage.getItem('bsct_webhook_url') || '');

  const saveSettings = () => {
    localStorage.setItem('bsct_gemini_key', apiKey.trim());
    localStorage.setItem('bsct_webhook_url', webhookUrl.trim());
    setShowSettings(false);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    const reader = new FileReader();
    reader.onloadend = () => {
      setSelectedImage(reader.result);
      const base64Data = reader.result.split(',')[1];
      setImageBase64({ data: base64Data, mimeType: file.type || 'image/jpeg' });
      setDiagnosisResult(null);
    };
    reader.readAsDataURL(file);
  };

  const analyzePlantImage = async () => {
    if (!imageBase64) return;
    setIsAnalyzing(true);
    setErrorMsg('');

    const promptText = `Bạn là Kỹ sư Nông nghiệp và Bác sĩ Cây trồng giàu kinh nghiệm tại Việt Nam. Hãy phân tích hình ảnh cây trồng này${cropNote ? ` (Ghi chú của nông dân: ${cropNote})` : ''}.
Trả về kết quả định dạng JSON thuần túy với các trường:
{
  "name": "Tên bệnh hoặc loại sâu hại chính xác",
  "crop": "Tên loại cây dự đoán",
  "severity": "Mức độ (Nhẹ / Trung bình / Nặng)",
  "symptom": "Mô tả triệu chứng quan sát được trên ảnh",
  "cause": "Nguyên nhân gây bệnh (Do nấm, vi khuẩn, côn trùng chích hút hay thiếu dinh dưỡng)",
  "organicFix": "Cách pha chế phẩm sinh học hoặc hỗn hợp an toàn tại nhà (như dầu ăn + nước rửa chén, tỏi ớt gừng, nấm Trichoderma...) để trị ngay",
  "prevention": "Quy trình chăm sóc và phòng ngừa tái phát"
}`;

    try {
      // 1. If custom Webhook URL (e.g. n8n) is configured
      if (webhookUrl) {
        const res = await fetch(webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            image: imageBase64.data,
            mimeType: imageBase64.mimeType,
            note: cropNote,
            prompt: promptText
          })
        });
        const data = await res.json();
        setDiagnosisResult(data);
        setIsAnalyzing(false);
        return;
      }

      // 2. Direct Gemini API call
      if (!apiKey) {
        setShowSettings(true);
        throw new Error('Vui lòng nhập Gemini API Key hoặc địa chỉ Webhook trong mục Cài đặt (biểu tượng bánh răng góc trên bên phải) để phân tích ảnh chụp thực tế.');
      }

      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{
              parts: [
                { text: promptText },
                { inlineData: { mimeType: imageBase64.mimeType, data: imageBase64.data } }
              ]
            }],
            generationConfig: { responseMimeType: "application/json" }
          })
        }
      );

      if (!response.ok) {
        throw new Error('Không thể kết nối tới máy chủ AI. Hãy kiểm tra lại API Key hoặc kết nối mạng 4G/WiFi.');
      }

      const result = await response.json();
      const rawText = result?.candidates?.[0]?.content?.parts?.[0]?.text || '{}';
      const parsed = JSON.parse(rawText);
      setDiagnosisResult(parsed);
    } catch (err) {
      setErrorMsg(err.message || 'Có lỗi xảy ra khi phân tích ảnh.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Biological spray calculation
  const getSprayRecipe = () => {
    const ratio = tankSize / 16; // Base 16L backpack sprayer
    if (formulaType === 'soap_oil') {
      return {
        title: 'Hỗn hợp Dầu Ăn + Nước Rửa Chén (Trị Rệp Sáp, Nhện Đỏ, Rầy Nâu)',
        items: [
          { name: 'Dầu ăn thực vật', amount: `${Math.round(45 * ratio)} ml (khoảng ${Math.max(1, Math.round(3 * ratio))} muỗng canh)` },
          { name: 'Nước rửa chén (Sunlight/Mỹ Hảo)', amount: `${Math.round(25 * ratio)} ml (khoảng ${Math.max(1, Math.round(1.5 * ratio))} muỗng canh)` },
          { name: 'Nước sạch', amount: `${tankSize} Lít` }
        ],
        instruction: 'Cho nước rửa chén và dầu ăn vào 1 lít nước ấm, khuấy thật mạnh cho tan thành dạng sữa trắng (nhũ tương), sau đó đổ vào bình và thêm đủ nước. Phun kỹ mặt dưới lá vào sáng sớm hoặc chiều mát.'
      };
    }
    if (formulaType === 'garlic_chili') {
      return {
        title: 'Dịch Chiết Tỏi - Ớt - Gừng Ngâm Rượu (Xua Đuổi Sâu Đục Thân, Bọ Cánh Cứng)',
        items: [
          { name: 'Nước cốt Tỏi - Ớt - Gừng ngâm rượu', amount: `${Math.round(100 * ratio)} ml` },
          { name: 'Nước rửa chén (làm chất bám dính)', amount: `${Math.round(10 * ratio)} ml` },
          { name: 'Nước sạch', amount: `${tankSize} Lít` }
        ],
        instruction: 'Ngâm 1kg Tỏi + 1kg Ớt + 1kg Gừng giã nát với 3 lít rượu trắng trong 15 ngày. Lọc lấy nước cốt pha theo tỷ lệ trên để phun đều tán cây.'
      };
    }
    return {
      title: 'Chế Phẩm Nấm Đối Kháng Trichoderma (Phòng Trị Thối Rễ, Nấm Cổ Rễ)',
      items: [
        { name: 'Bột nấm Trichoderma đậm đặc', amount: `${Math.round(50 * ratio)} gram` },
        { name: 'Mật rỉ đường hoặc Humic kích rễ', amount: `${Math.round(30 * ratio)} ml` },
        { name: 'Nước sạch', amount: `${tankSize} Lít` }
      ],
      instruction: 'Hòa đều và tưới đẫm quanh vùng rễ tơ (theo hình chiếu tán cây) khi đất đủ ẩm.'
    };
  };

  const recipe = getSprayRecipe();

  return (
    <div className="min-h-screen bg-stone-100 pb-24 max-w-md mx-auto shadow-xl relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-green-800 to-emerald-700 text-white p-4 sticky top-0 z-20 shadow-md flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="bg-white/20 p-2 rounded-xl">
            <Sprout className="w-6 h-6 text-green-100" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Bác Sĩ Cây Trồng AI</h1>
            <p className="text-xs text-green-100">Chẩn đoán bệnh & Quy trình nhà nông</p>
          </div>
        </div>
        <button
          onClick={() => setShowSettings(true)}
          className="p-2 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 transition"
          title="Cài đặt API Key / Webhook"
        >
          <Settings className="w-5 h-5" />
        </button>
      </header>

      {/* Main Content */}
      <main className="p-3.5 space-y-4">
        {activeTab === 'diagnose' && (
          <div className="space-y-4">
            {/* Camera / Upload Box */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200">
              <h2 className="font-bold text-stone-800 text-base mb-2 flex items-center gap-2">
                <Camera className="w-5 h-5 text-green-700" />
                Chụp hoặc tải ảnh cây bị bệnh
              </h2>
              <p className="text-xs text-stone-500 mb-3">
                Chụp rõ mặt trên, mặt dưới lá, vết đục trên thân hoặc cổ hủ dừa để AI nhận diện chính xác nhất.
              </p>

              <div className="grid grid-cols-2 gap-2.5 mb-3">
                <label className="flex flex-col items-center justify-center gap-1.5 bg-green-700 text-white py-3.5 px-3 rounded-xl font-semibold text-sm cursor-pointer active:scale-95 transition shadow-sm">
                  <Camera className="w-6 h-6" />
                  <span>Mở Camera Chụp</span>
                  <input
                    type="file"
                    accept="image/*"
                    capture="environment"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>

                <label className="flex flex-col items-center justify-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 py-3.5 px-3 rounded-xl font-semibold text-sm cursor-pointer active:scale-95 transition">
                  <Upload className="w-6 h-6" />
                  <span>Chọn Ảnh Từ Máy</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
              </div>

              {selectedImage && (
                <div className="space-y-3 mt-3 pt-3 border-t border-stone-100">
                  <div className="relative rounded-xl overflow-hidden bg-stone-900 max-h-60 flex justify-center">
                    <img src={selectedImage} alt="Ảnh cây trồng" className="object-contain max-h-60" />
                  </div>
                  <input
                    type="text"
                    value={cropNote}
                    onChange={(e) => setCropNote(e.target.value)}
                    placeholder="Ghi chú thêm (VD: Cây dừa 2 năm tuổi, lá bị trắng...)"
                    className="w-full text-sm border border-stone-300 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-green-600"
                  />
                  <button
                    onClick={analyzePlantImage}
                    disabled={isAnalyzing}
                    className="w-full bg-amber-600 hover:bg-amber-700 disabled:bg-stone-400 text-white font-bold py-3 rounded-xl shadow flex items-center justify-center gap-2 transition"
                  >
                    {isAnalyzing ? (
                      <>
                        <RefreshCw className="w-5 h-5 animate-spin" />
                        <span>Đang phân tích mẫu bệnh...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5" />
                        <span>Bắt Đầu Chẩn Đoán Bệnh</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {errorMsg && (
                <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl text-xs text-red-700 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMsg}</span>
                </div>
              )}
            </div>

            {/* Quick Sample Diagnosis Cases */}
            <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200">
              <h3 className="font-bold text-stone-800 text-sm mb-2.5 flex items-center gap-1.5">
                <Bug className="w-4 h-4 text-amber-600" />
                Ca bệnh phổ biến (Bấm để xem nhanh phác đồ):
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {SAMPLE_CASES.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setDiagnosisResult(item)}
                    className="text-left p-2.5 rounded-xl border border-stone-200 hover:border-green-600 hover:bg-green-50/50 transition flex flex-col justify-between"
                  >
                    <span className="text-xs font-bold text-stone-800 line-clamp-2">{item.name}</span>
                    <span className="text-[11px] text-green-700 font-medium mt-1 flex items-center">
                      {item.crop} <ChevronRight className="w-3 h-3 ml-auto" />
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Diagnosis Output Card */}
            {diagnosisResult && (
              <div className="bg-white rounded-2xl p-4 shadow-md border-2 border-green-600 space-y-3">
                <div className="flex items-start justify-between border-b border-stone-100 pb-2.5">
                  <div>
                    <span className="inline-block px-2 py-0.5 bg-green-100 text-green-800 rounded text-[11px] font-semibold mb-1">
                      {diagnosisResult.crop || 'Cây trồng'}
                    </span>
                    <h3 className="font-bold text-base text-stone-900">{diagnosisResult.name}</h3>
                  </div>
                  <span className="px-2.5 py-1 bg-amber-100 text-amber-800 rounded-full text-xs font-bold">
                    {diagnosisResult.severity}
                  </span>
                </div>

                <div className="space-y-2.5 text-sm">
                  <div className="bg-stone-50 p-2.5 rounded-xl">
                    <p className="font-semibold text-stone-700 text-xs uppercase">1. Triệu chứng nhận diện:</p>
                    <p className="text-stone-800 mt-0.5">{diagnosisResult.symptom}</p>
                  </div>

                  <div className="bg-stone-50 p-2.5 rounded-xl">
                    <p className="font-semibold text-stone-700 text-xs uppercase">2. Nguyên nhân gây hại:</p>
                    <p className="text-stone-800 mt-0.5">{diagnosisResult.cause}</p>
                  </div>

                  <div className="bg-green-50 border border-green-200 p-3 rounded-xl">
                    <p className="font-bold text-green-900 text-xs uppercase flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4 text-green-700" />
                      3. Phác đồ xử lý sinh học & An toàn:
                    </p>
                    <p className="text-green-950 mt-1 font-medium">{diagnosisResult.organicFix}</p>
                  </div>

                  <div className="bg-amber-50/70 border border-amber-200 p-2.5 rounded-xl">
                    <p className="font-semibold text-amber-900 text-xs uppercase">4. Phòng ngừa tái phát:</p>
                    <p className="text-stone-800 mt-0.5">{diagnosisResult.prevention}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'process' && (
          <div className="space-y-4">
            {CULTIVATION_GUIDES.map((guide) => (
              <div key={guide.id} className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200">
                <div className="border-b border-stone-100 pb-2 mb-3">
                  <h3 className="font-bold text-green-800 text-base">{guide.title}</h3>
                  <p className="text-xs text-stone-500">{guide.cycle}</p>
                </div>
                <div className="space-y-3">
                  {guide.steps.map((s, idx) => (
                    <div key={idx} className="flex gap-2.5 items-start">
                      <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-1" />
                      <div>
                        <p className="font-bold text-xs text-stone-800">{s.stage}</p>
                        <p className="text-xs text-stone-600 mt-0.5 leading-relaxed">{s.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-3">
            <h2 className="font-bold text-stone-800 text-base">
              Phân Biệt Nhanh: Nấm vs. Vi Khuẩn vs. Thiếu Chất
            </h2>
            <p className="text-xs text-stone-500">
              Giúp bà con tránh mua nhầm thuốc khi thấy lá bị vàng hoặc đốm cháy.
            </p>
            <div className="space-y-3">
              {COMPARISON_TABLE.map((row, idx) => (
                <div key={idx} className="border border-stone-200 rounded-xl overflow-hidden text-xs">
                  <div className="bg-stone-100 font-bold text-stone-800 px-3 py-2">
                    {row.aspect}
                  </div>
                  <div className="p-2.5 space-y-2 divide-y divide-stone-100">
                    <div>
                      <span className="font-bold text-amber-700">Bệnh do Nấm: </span>
                      <span className="text-stone-700">{row.fungus}</span>
                    </div>
                    <div className="pt-1.5">
                      <span className="font-bold text-red-700">Bệnh do Vi Khuẩn: </span>
                      <span className="text-stone-700">{row.bacteria}</span>
                    </div>
                    <div className="pt-1.5">
                      <span className="font-bold text-emerald-700">Thiếu Dinh Dưỡng: </span>
                      <span className="text-stone-700">{row.nutrient}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'calculator' && (
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-stone-200 space-y-4">
            <div>
              <h2 className="font-bold text-stone-800 text-base flex items-center gap-2">
                <FlaskConical className="w-5 h-5 text-green-700" />
                Máy Tính Pha Chế Phẩm Sinh Học
              </h2>
              <p className="text-xs text-stone-500 mt-0.5">
                Tự động tính liều lượng chuẩn theo dung tích bình xịt của bà con.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">1. Chọn loại dung dịch cần pha:</label>
              <select
                value={formulaType}
                onChange={(e) => setFormulaType(e.target.value)}
                className="w-full border border-stone-300 rounded-xl p-2.5 text-sm font-medium bg-stone-50"
              >
                <option value="soap_oil">Dầu ăn + Nước rửa chén (Rệp sáp, Nhện đỏ, Rầy)</option>
                <option value="garlic_chili">Rượu Tỏi - Ớt - Gừng (Sâu ăn lá, Bọ cánh cứng)</option>
                <option value="trichoderma">Nấm đối kháng Trichoderma (Tưới gốc ngừa thối rễ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1.5">2. Chọn dung tích bình phun:</label>
              <div className="grid grid-cols-4 gap-2">
                {[2, 8, 16, 200].map((liters) => (
                  <button
                    key={liters}
                    onClick={() => setTankSize(liters)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      tankSize === liters
                        ? 'bg-green-700 text-white border-green-700 shadow-sm'
                        : 'bg-stone-50 text-stone-700 border-stone-200'
                    }`}
                  >
                    {liters === 200 ? 'Phuy 200L' : `Bình ${liters}L`}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-2xl p-3.5 space-y-2.5">
              <h3 className="font-bold text-green-900 text-sm">{recipe.title}</h3>
              <div className="space-y-1.5">
                {recipe.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between text-xs bg-white p-2 rounded-lg border border-green-100">
                    <span className="text-stone-700 font-medium">{it.name}:</span>
                    <span className="font-bold text-green-800">{it.amount}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-stone-700 leading-relaxed pt-1 border-t border-green-200/60">
                <strong>Cách pha:</strong> {recipe.instruction}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-sm w-full p-4 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-bold text-stone-800 text-sm flex items-center gap-1.5">
                <Settings className="w-4 h-4 text-green-700" />
                Cấu hình Kết nối AI (Gemini / n8n)
              </h3>
              <button onClick={() => setShowSettings(false)} className="p-1 text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Gemini API Key (Chạy trực tiếp trên máy):</label>
                <input
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="AIzaSy..."
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Hoặc URL Webhook (n8n / Server riêng):</label>
                <input
                  type="url"
                  value={webhookUrl}
                  onChange={(e) => setWebhookUrl(e.target.value)}
                  placeholder="https://n8n.domain-cua-ban.com/webhook/..."
                  className="w-full border border-stone-300 rounded-xl px-3 py-2 text-sm"
                />
                <p className="text-[11px] text-stone-500 mt-1">
                  Dữ liệu sẽ được lưu trực tiếp trên bộ nhớ điện thoại, không cần đóng gói lại file APK khi đổi Key.
                </p>
              </div>
            </div>

            <button
              onClick={saveSettings}
              className="w-full bg-green-700 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 text-sm"
            >
              <Save className="w-4 h-4" />
              Lưu Cấu Hình
            </button>
          </div>
        </div>
      )}

      {/* Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-stone-200 grid grid-cols-4 py-1.5 px-2 z-20 shadow-lg">
        <button
          onClick={() => setActiveTab('diagnose')}
          className={`flex flex-col items-center py-1 rounded-xl ${
            activeTab === 'diagnose' ? 'text-green-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Camera className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">Chẩn Đoán</span>
        </button>

        <button
          onClick={() => setActiveTab('process')}
          className={`flex flex-col items-center py-1 rounded-xl ${
            activeTab === 'process' ? 'text-green-700 font-bold' : 'text-stone-500'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">Quy Trình</span>
        </button>

        <button
          onClick={() => setActiveTab('compare')}
          className={`flex flex-col items-center py-1 rounded-xl ${
            activeTab === 'compare' ? 'text-green-700 font-bold' : 'text-stone-500'
          }`}
        >
          <Bug className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">Phân Biệt</span>
        </button>

        <button
          onClick={() => setActiveTab('calculator')}
          className={`flex flex-col items-center py-1 rounded-xl ${
            activeTab === 'calculator' ? 'text-green-700 font-bold' : 'text-stone-500'
          }`}
        >
          <FlaskConical className="w-5 h-5" />
          <span className="text-[11px] mt-0.5">Pha Thuốc</span>
        </button>
      </nav>
    </div>
  );
}
