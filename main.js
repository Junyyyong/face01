let currentMode = 'single';

function setMode(mode) {
    currentMode = mode;
    document.getElementById('btn-single').classList.toggle('active', mode === 'single');
    document.getElementById('btn-pair').classList.toggle('active', mode === 'pair');
    document.getElementById('upload-box-2').classList.toggle('hidden', mode === 'single');
    document.getElementById('label-1').innerText = mode === 'single' ? '사진 업로드' : '본인 사진';
}

// 파일 업로드 이벤트 리스너 설정
function setupUpload(id) {
    const box = document.getElementById(`upload-box-${id}`);
    const input = document.getElementById(`file-${id}`);
    const preview = document.getElementById(`preview-${id}`);

    preview.onclick = () => input.click();
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                preview.innerHTML = `<img src="${event.target.result}">`;
            };
            reader.readAsDataURL(file);
        }
    };
}

setupUpload(1);
setupUpload(2);

function startAnalysis() {
    // 사진 선택 여부 확인
    if (!document.getElementById('file-1').files[0]) {
        alert("사진을 업로드해주세요.");
        return;
    }
    if (currentMode === 'pair' && !document.getElementById('file-2').files[0]) {
        alert("상대방 사진을 업로드해주세요.");
        return;
    }

    document.getElementById('upload-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    let count = 0;
    const statusText = document.getElementById('status-text');
    const statuses = ["기운을 살피는 중입니다...", "이목구비를 분석하고 있습니다...", "천기를 읽어내고 있습니다...", "조화와 인연을 분석 중입니다..."];
    
    const interval = setInterval(() => {
        statusText.innerText = statuses[count % statuses.length];
        count++;
        if (count > 6) {
            clearInterval(interval);
            showResult();
        }
    }, 800);
}

function showResult() {
    document.getElementById('loading-spinner').classList.add('hidden');
    document.getElementById('status-text').classList.add('hidden');
    document.getElementById('analysis-content').classList.remove('hidden');

    const reportBody = document.getElementById('report-body');
    const hopeMessage = document.getElementById('hope-message');
    
    if (currentMode === 'single') {
        reportBody.innerHTML = generateSingleReport();
        hopeMessage.innerHTML = generateHopeMessage();
    } else {
        reportBody.innerHTML = generatePairReport();
        hopeMessage.innerHTML = generatePairHopeMessage();
    }
}

function generateSingleReport() {
    const data = {
        "이마": [
            "이마가 넓고 시원하여 초년운이 밝고 학문적 성취가 높을 상입니다. 조상의 덕이 있어 위기의 순간마다 귀인의 도움을 받게 될 것입니다.",
            "이마의 선이 고르고 단정하니 명예를 중시하며 정직한 성품을 지녔습니다. 신의를 지키는 삶을 통해 주변의 큰 존경을 받게 될 상입니다."
        ],
        "눈썹": [
            "눈썹이 수려하고 가지런하니 형제간의 우애가 깊고 인복이 타고났습니다. 대인관계에서 신망이 두터워 리더의 자질이 엿보입니다.",
            "눈썹의 끝이 힘 있게 뻗어 있어 강한 의지와 결단력을 상징합니다. 한 번 결심한 일은 끝까지 밀고 나가는 추진력이 큰 성공을 부를 것입니다."
        ],
        "눈": [
            "눈매가 깊고 눈동자가 맑으니 지혜롭고 통찰력이 뛰어납니다. 사물의 본질을 꿰뚫어 보는 안목이 있어 사업이나 전문직에서 두각을 나타낼 것입니다.",
            "부드럽고 긴 눈매는 자애로운 성품과 풍부한 감수성을 의미합니다. 예술적 감각이 뛰어나며 많은 이들에게 감동을 주는 삶을 살게 될 상입니다."
        ],
        "코": [
            "콧대가 곧고 콧망울이 풍성하니 재물복이 마르지 않는 상입니다. 중년 이후에는 안정적인 부를 축적하며 가문을 번창시킬 기운이 서려 있습니다.",
            "코의 균형이 잘 잡혀 있어 자기 주관이 뚜렷하고 자존감이 높습니다. 스스로의 힘으로 인생을 개척해 나가는 대기만성형의 전형이라 할 수 있습니다."
        ],
        "볼과 광대": [
            "광대뼈가 적당히 솟아 있어 사회적 활동력이 왕성하고 명예운이 따릅니다. 조직에서 핵심적인 역할을 수행하며 이름을 널리 알릴 기운입니다.",
            "볼이 풍만하고 윤기가 나니 인심이 후하고 주변에 사람이 모이는 상입니다. 베푼 만큼 복이 돌아와 말년이 매우 풍요로울 것입니다."
        ],
        "입": [
            "입술 선이 분명하고 입꼬리가 위를 향하니 긍정적인 에너지와 언변이 뛰어납니다. 당신의 말 한마디가 사람들의 마음을 움직이는 힘을 가졌습니다.",
            "입의 크기가 조화로워 식복이 좋고 건강한 생명력을 타고났습니다. 가정적으로 화목하며 자손들의 덕을 톡톡히 볼 귀한 상입니다."
        ],
        "얼굴형": [
            "전체적으로 균형 잡힌 얼굴형은 오행의 기운이 조화로움을 의미합니다. 급변하는 환경 속에서도 유연하게 대처하며 평탄하고 안락한 삶을 누릴 것입니다.",
            "턱 선이 단단하고 안정감 있어 말년의 운세가 매우 강력합니다. 기반이 튼튼하니 시간이 흐를수록 권위와 부가 쌓이는 형국입니다."
        ]
    };

    let html = "";
    for (const part in data) {
        html += `<div class="section-title">◈ ${part}</div>`;
        html += `<div class="section-content">${random(data[part])}</div>`;
    }
    return html;
}

function generatePairReport() {
    const compatibility = [
        "두 분의 관상은 서로의 부족한 기운을 채워주는 '상생(相生)'의 조화가 매우 뛰어납니다. 한 분의 강한 결단력을 다른 한 분의 부드러운 포용력이 감싸 안으니, 함께할수록 복이 배가되는 인연입니다.",
        "마치 거울을 보듯 닮은 이목구비의 조화가 인상적입니다. 가치관과 삶을 대하는 태도가 비슷하여 큰 갈등 없이 화합할 수 있는 '천생연분'의 기운이 강하게 느껴집니다.",
        "음양의 조화가 잘 어우러진 관상입니다. 한 분이 태양처럼 앞장선다면 다른 한 분은 달처럼 은은하게 길을 비춰주니, 세상을 함께 헤쳐 나가는 최고의 동반자가 될 것입니다."
    ];
    
    return `<div class="section-title">◈ 인연의 조화</div><div class="section-content">${random(compatibility)}</div>
            <div class="section-title">◈ 함께하면 좋은 점</div><div class="section-content">함께 있을 때 서로의 재물운과 건강운을 상승시키는 기운이 있습니다. 특히 중년 이후 공동의 목표를 가질 때 큰 성취를 이룰 것입니다.</div>`;
}

function generateHopeMessage() {
    return "지금 당신의 얼굴에 서린 기운은 봄날의 햇살처럼 따스하고 희망적입니다. 작은 시련이 올지라도 당신의 타고난 귀한 관상이 방패가 되어줄 것이니, 스스로를 믿고 당당하게 나아가십시오. 하늘은 언제나 스스로 돕는 자를 돕는 법입니다.";
}

function generatePairHopeMessage() {
    return "두 분이 마주 잡은 손은 어떤 풍파도 이겨낼 수 있는 단단한 매듭과 같습니다. 서로의 눈 속에 담긴 진심을 잊지 않는다면, 시간이 흐를수록 더욱 깊고 아름다운 결실을 맺게 될 것입니다. 서로가 서로의 가장 큰 행운임을 기억하십시오.";
}

function random(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
