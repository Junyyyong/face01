// 한글 획수 데이터 (일반적인 이름 궁합 기준)
const strokeCounts = {
    'ㄱ': 2, 'ㄴ': 2, 'ㄷ': 3, 'ㄹ': 5, 'ㅁ': 4, 'ㅂ': 4, 'ㅅ': 2, 'ㅇ': 1, 'ㅈ': 3, 'ㅊ': 4, 'ㅋ': 3, 'ㅌ': 4, 'ㅍ': 4, 'ㅎ': 3,
    'ㅏ': 2, 'ㅐ': 3, 'ㅑ': 3, 'ㅒ': 4, 'ㅓ': 2, 'ㅔ': 3, 'ㅕ': 3, 'ㅖ': 4, 'ㅗ': 2, 'ㅘ': 4, 'ㅙ': 5, 'ㅚ': 3, 'ㅛ': 3, 'ㅜ': 2, 'ㅝ': 4, 'ㅞ': 5, 'ㅟ': 3, 'ㅠ': 3, 'ㅡ': 1, 'ㅢ': 2, 'ㅣ': 1,
    'ㄲ': 4, 'ㄸ': 6, 'ㅃ': 8, 'ㅆ': 4, 'ㅉ': 6
};

// 한글 분리 로직 (유니코드 기반)
function getStrokes(char) {
    const code = char.charCodeAt(0) - 44032;
    if (code < 0 || code > 11171) return 2; // 한글이 아니면 기본값

    const choIdx = Math.floor(code / 588);
    const jungIdx = Math.floor((code - (choIdx * 588)) / 28);
    const jongIdx = code % 28;

    const cho = ['ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];
    const jung = ['ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'];
    const jong = ['', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄴㅈ', 'ㄴㅎ', 'ㄷ', 'ㄹ', 'ㄹㄱ', 'ㄹㅁ', 'ㄹㅂ', 'ㄹㅅ', 'ㄹㅌ', 'ㄹㅍ', 'ㄹㅎ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'];

    let count = strokeCounts[cho[choIdx]] || 2;
    count += strokeCounts[jung[jungIdx]] || 2;
    if (jongIdx > 0) {
        // 종성 처리 (복합 자음은 단순화)
        const jongChar = jong[jongIdx];
        if (jongChar.length > 1) {
            count += (strokeCounts[jongChar[0]] || 2) + (strokeCounts[jongChar[1]] || 2);
        } else {
            count += strokeCounts[jongChar] || 2;
        }
    }
    return count;
}

function calculateCompatibility() {
    const name1 = document.getElementById('name1').value;
    const name2 = document.getElementById('name2').value;

    if (name1.length < 2 || name2.length < 2) {
        alert("이름을 두 글자 이상 입력해주세요!");
        return;
    }

    document.getElementById('input-section').classList.add('hidden');
    document.getElementById('result-section').classList.remove('hidden');

    // 1. 초기 숫자 배열 생성 (이름을 번갈아가며 배치)
    let numbers = [];
    const maxLength = Math.max(name1.length, name2.length);
    for (let i = 0; i < maxLength; i++) {
        if (name1[i]) numbers.push(getStrokes(name1[i]));
        if (name2[i]) numbers.push(getStrokes(name2[i]));
    }

    displayCalculation(numbers);
}

async function displayCalculation(initialNumbers) {
    const visual = document.getElementById('calc-visual');
    visual.innerHTML = "";
    
    let current = [...initialNumbers];
    
    // 시각적 단계 표시
    while (current.length > 2) {
        const row = document.createElement('div');
        row.className = 'calc-row';
        row.innerText = current.join(' ');
        visual.appendChild(row);
        
        let next = [];
        for (let i = 0; i < current.length - 1; i++) {
            next.push((current[i] + current[i + 1]) % 10);
        }
        current = next;
        await new Promise(r => setTimeout(r, 500)); // 단계별 애니메이션
    }

    const finalScore = current.join('') + "%";
    document.getElementById('score-number').innerText = finalScore;
    document.getElementById('analysis-text').innerText = generateAnalysis(parseInt(finalScore));
}

function generateAnalysis(score) {
    if (score >= 90) {
        return `헉! ${score}%라니... 이건 거의 전생에 나라를 구한 수준이네요! 
말하지 않아도 눈빛만 보면 통하는 사이, 짜장면 시킬 때 동시에 짬뽕 외치는 사이! 
지금 당장 손잡고 떡볶이라도 먹으러 가야 하는 거 아닌가요? 
앞으로의 미래는 핑크빛 탄탄대로! 두 분의 사랑을 전교생이 응원합니다 (부끄)`;
    } else if (score >= 70) {
        return `${score}%! 아주 설레는 사이군요? 
복도에서 마주치면 가슴이 콩닥콩닥, 매점 갈 때 은근히 마주치길 기대하는 그런 사이! 
조금만 더 용기를 내서 "우유 하나 먹을래?"라고 말을 건네보세요. 
작은 계기만 있다면 오늘부터 1일이 될 가능성이 매우 농후합니다!`;
    } else if (score >= 50) {
        return `음, ${score}%... 딱 적당한 밀당의 온도네요! 
가끔은 친하고 가끔은 어색한, 알 수 없는 묘한 기운이 흐르는 사이입니다. 
서로 눈치만 보다가 시간 다 갈 수 있으니 조심하세요! 
오늘 급식 반찬이 맛있다면 슬쩍 말을 걸어보는 건 어떨까요? 노력 여하에 따라 급상승할 수 있는 운명입니다.`;
    } else if (score >= 20) {
        return `${score}%라... 아직은 갈 길이 조금 머네요 (ㅠㅠ) 
상대방이 당신의 존재를 알긴 하지만, 아직 특별한 인상을 받지는 못한 것 같아요. 
하지만 이름 궁합은 숫자에 불과할 뿐! 
밝게 웃으며 인사하는 습관부터 시작해봅시다. 진심은 언제나 숫자를 뛰어넘는 법이니까요!`;
    } else {
        return `어머나... ${score}%라니... 이건 로또 당첨보다 어려운 확률 아닌가요? 
오히려 이렇게 낮은 점수가 나오기가 더 힘들다는 사실! 
어쩌면 너무 반대되는 성격이라 서로를 이해하기 힘들 수도 있겠어요. 
하지만 원래 반대끼리 끌리는 법! 예상치 못한 반전 드라마를 써보는 건 어떨까요? 포기하지 마세요!`;
    }
}
