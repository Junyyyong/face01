document.getElementById('file-input').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        // UI 전환
        document.getElementById('upload-section').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');
        
        // 이미지 미리보기 설정
        const preview = document.getElementById('image-preview');
        preview.src = event.target.result;
        
        // 스캔 애니메이션 시작
        startAnalysis();
    };
    reader.readAsDataURL(file);
});

function startAnalysis() {
    const scanLine = document.getElementById('scan-line');
    const loadingText = document.getElementById('loading-text');
    scanLine.style.display = 'block';

    const phases = [
        "이목구비의 정렬을 살피는 중...",
        "오행의 기운을 분석하는 중...",
        "상정, 중정, 하정의 조화를 보는 중...",
        "천기를 읽어내는 중..."
    ];

    let phaseIdx = 0;
    const interval = setInterval(() => {
        if (phaseIdx < phases.length) {
            loadingText.innerText = phases[phaseIdx];
            phaseIdx++;
        } else {
            clearInterval(interval);
            showResult();
        }
    }, 1500);
}

function showResult() {
    document.getElementById('scan-line').style.display = 'none';
    document.getElementById('loading').classList.add('hidden');
    document.getElementById('analysis-result').classList.remove('hidden');

    const report = generateReport();
    const reportElement = document.getElementById('physiognomy-report');
    
    // 타자 치는 효과
    let i = 0;
    reportElement.innerText = "";
    function typeWriter() {
        if (i < report.length) {
            reportElement.innerText += report.charAt(i);
            i++;
            setTimeout(typeWriter, 30);
        }
    }
    typeWriter();
}

function generateReport() {
    const intros = [
        "허허, 참으로 묘한 기운이 느껴지는 상이로군요.",
        "전체적으로 이목구비의 조화가 예사롭지 않습니다.",
        "관상을 보니 대기만성형의 기운이 강하게 서려 있소이다.",
        "오랜만에 보기 드문 귀한 상을 마주하게 되었구려."
    ];

    const eyes = [
        "\n\n[눈] 눈매가 깊고 광채가 서려 있으니, 이는 총명함과 통찰력을 의미하오. 사람을 꿰뚫어 보는 눈을 가졌으니 리더의 자질이 충분합니다.",
        "\n\n[눈] 부드러운 눈곡선은 타인에게 신뢰를 주는 상이니, 인복이 많아 주변에 항상 사람이 끊이지 않을 것이오.",
        "\n\n[눈] 눈동자가 맑고 정갈하니 의지가 굳건하고 대의를 품을 상입니다. 한 번 마음먹은 일은 끝내 이루고야 말겠구려."
    ];

    const nose = [
        "\n\n[코] 콧망울이 단단하고 콧대가 곧게 뻗어 있으니 재물복이 마르지 않는 상이오. 중년 이후에는 큰 부를 이룰 기운이 보입니다.",
        "\n\n[코] 코의 형상이 수려하니 자기 주관이 뚜렷하고 명예를 소중히 여기는 상이오. 관직이나 큰 조직에서 이름을 떨칠 운명이구려.",
        "\n\n[코] 콧날이 부드러우며 끝이 둥그니 성품이 원만하고 식복(食福)이 타고났소이다. 평생 먹고 살 걱정은 없을 상입니다."
    ];

    const fortune = [
        "\n\n[종합] 특히 하정(턱 부분)의 기운이 좋아 말년 운이 매우 길하오. 지금은 비록 구름에 가린 달처럼 보일지라도 머지않아 밝은 빛을 보게 될 것이니 정진하시게.",
        "\n\n[종합] 초년보다는 중년, 중년보다는 말년으로 갈수록 기운이 상승하는 상이오. 인내심을 가지고 뜻을 펼친다면 반드시 큰 성취를 거둘 것이오.",
        "\n\n[종합] 타고난 재능도 뛰어나지만, 주변 사람들의 도움으로 큰 화를 면하고 복을 누릴 상이니 평소 인간관계에 힘쓰면 천하를 얻을 것이오."
    ];

    const random = (arr) => arr[Math.floor(Math.random() * arr.length)];

    return random(intros) + random(eyes) + random(nose) + random(fortune) + "\n\n- AI 관상가 拜上 -";
}
